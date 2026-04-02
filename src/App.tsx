import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Copy, Check, ArrowLeft, Loader2, UserCircle, Search, ChevronDown, Lock, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioHandler } from './lib/audio';
import { speakPhrase, stopTTS, setTTSAuthToken } from './lib/tts';
import { type Phrase, isNewUser, getProfile, getLastSession, getReviewPhrases } from './lib/profile';
import { analyzeSession } from './lib/curriculum';
import { supabase } from './lib/supabase';
import { syncProfileFromSupabase, saveVoicePreference } from './lib/profile';
import { transitions, ease, getFadeUp, getPhaseVariants, getTransitions, usePrefersReducedMotion } from './lib/motion';
import LoginScreen from './components/LoginScreen';
import MicOrb from './components/MicOrb';
import VoicePicker, { type Persona, VOICE_MAP, getSavedVoice } from './components/VoicePicker';
import CueCard from './components/CueCard';
import BandScore, { type BandScoreData } from './components/BandScore';
import CommandPalette from './components/CommandPalette';
import PaywallScreen from './components/PaywallScreen';
import { checkCanStartSession, incrementSessionCount, setPremium, getSubscription, isPremiumVoice, isPremiumMode } from './lib/subscription';
import type { Session } from '@supabase/supabase-js';

// ── Types ────────────────────────────────────────────────────
type Phase = 'idle' | 'connecting' | 'lesson' | 'session-end' | 'summary';
type AppMode = 'conversation' | 'ielts';

const MODE_STORAGE_KEY = 'easybee_mode';
function getSavedMode(): AppMode {
  try { return (localStorage.getItem(MODE_STORAGE_KEY) as AppMode) || 'conversation'; }
  catch { return 'conversation'; }
}
function saveMode(mode: AppMode) {
  try { localStorage.setItem(MODE_STORAGE_KEY, mode); } catch {}
}

// ── IELTS parsed data types ─────────────────────────────────
interface IELTSParseResult {
  displayText: string;
  phrases: Phrase[];
  cueCard: string | null;
  bandScore: BandScoreData | null;
}

// ── Spring Presets (re-export from motion tokens) ───────────
const spring = {
  gentle: transitions.spring,
  snappy: transitions.springSnappy,
};

// ── Marker Parser ───────────────────────────────────────────
function parseAIOutput(buffer: string): IELTSParseResult {
  const phrases: Phrase[] = [];
  const phraseRe = /\[PHRASE\](.*?)\[\/PHRASE\]\s*\[VN\](.*?)\[\/VN\]/g;
  let m;
  while ((m = phraseRe.exec(buffer)) !== null) phrases.push({ english: m[1].trim(), vietnamese: m[2].trim() });

  // Cue card
  let cueCard: string | null = null;
  const cueMatch = buffer.match(/\[CUECARD\]([\s\S]*?)\[\/CUECARD\]/);
  if (cueMatch) cueCard = cueMatch[1].trim();

  // Band score
  let bandScore: BandScoreData | null = null;
  const bandMatch = buffer.match(/\[BAND\]([\d.]+)\[\/BAND\]/);
  if (bandMatch) {
    bandScore = { band: bandMatch[1] };
    const fcMatch = buffer.match(/\[FC\]([\d.]+)\[\/FC\]/);
    const lrMatch = buffer.match(/\[LR\]([\d.]+)\[\/LR\]/);
    const graMatch = buffer.match(/\[GRA\]([\d.]+)\[\/GRA\]/);
    const pMatch = buffer.match(/\[P\]([\d.]+)\[\/P\]/);
    if (fcMatch) bandScore.fc = fcMatch[1];
    if (lrMatch) bandScore.lr = lrMatch[1];
    if (graMatch) bandScore.gra = graMatch[1];
    if (pMatch) bandScore.p = pMatch[1];
  }

  // Strip all markers from display text (including typos like [/CHRASE], [/VN], etc.)
  let displayText = buffer
    .replace(/\[PHRASE\].*?\[\/PHRASE\]\s*\[VN\].*?\[\/VN\]/g, '')
    .replace(/\[CUECARD\][\s\S]*?\[\/CUECARD\]/g, '')
    .replace(/\[BAND\][\d.]+\[\/BAND\]/g, '')
    .replace(/\[FC\][\d.]+\[\/FC\]/g, '')
    .replace(/\[LR\][\d.]+\[\/LR\]/g, '')
    .replace(/\[GRA\][\d.]+\[\/GRA\]/g, '')
    .replace(/\[P\][\d.]+\[\/P\]/g, '')
    // Catch-all: strip ANY remaining [TAG] or [/TAG] patterns (handles AI typos like [/CHRASE])
    .replace(/\[\/?[A-Z]{1,10}\]/g, '')
    .trim();

  return { displayText, phrases, cueCard, bandScore };
}

function hasIncompleteMarker(buf: string): boolean {
  const markers = ['PHRASE', 'VN', 'CUECARD', 'BAND', 'FC', 'LR', 'GRA', 'P'];
  for (const tag of markers) {
    const open = buf.lastIndexOf(`[${tag}]`);
    const close = buf.lastIndexOf(`[/${tag}]`);
    if (open !== -1 && open > close) return true;
  }
  return false;
}

// ── System Instruction Builder ──────────────────────────────
function buildSystemInstruction(persona: Persona = 'thay-bee'): string {
  // ── PERSONA-SPECIFIC SECTIONS ──
  const personaBlocks: Record<Persona, { style: string; intro: string }> = {
    'thay-bee': {
      style: `PHONG CACH — THAY BEE:
- Am ap, binh tinh, tu tin nhung khong hao nhoang
- Tu xung "minh" hoac "Thay Bee"
- Noi CHAM va RO RANG — khong voi, khong nhanh
- Dung tieng Viet la CHINH. Chi dung tieng Anh khi DAY cum tu hoac KHEN ngan (Nice, Good, That's it)
- KHONG mix tieng Anh qua nhieu trong cau noi — hoc vien A1 se khong hieu
- Khi sua: "Chua dung lam — nghe minh nha: *seat*. Chu 'ea' keo dai hon. Thu lai nha."
- Lich su, nhe nhang nhung nghiem tuc khi can
- Giong nhu mot anh lon biet cach, kien nhan, khong bao gio lam hoc vien thay ngu`,
      intro: `LOI CHAO (HOC VIEN MOI):
Cau dau tien ban noi PHAI la: "Chao ban! Minh la Thay Bee. Minh se giup ban luyen noi tieng Anh — tu tu thoi, khong voi dau. Ready?"
Sau do hoi: "Ban hoc tieng Anh de lam gi? Cong viec, di bac si, hay giao tiep hang ngay?"
CHO hoc vien tra loi muc tieu truoc khi bat dau day.
Sau khi biet muc tieu, hoi: "OK, hom nay ban muon hoc ve chu de gi?"
Roi bat dau day theo chu de ho chon.`,
    },
    'co-honey': {
      style: `PHONG CACH — CO HONEY:
- Am ap, thuc te, kinh nghiem salon thuc
- Tu xung "minh" hoac "Co Honey"
- Khi sua: "Gan roi — nhung khach se khong hieu dau. Nghe minh nha—"
- Hay dung vi du tu salon, tiep khach, giao tiep cong viec thuc
- Giong nhu chi em lam nail 10 nam o My, biet chinh xac hoc vien can gi`,
      intro: `LOI CHAO (HOC VIEN MOI):
Cau dau tien ban noi PHAI la: "Hi ban! Minh la Co Honey — minh lam nail 10 nam o My. Minh biet ban can gi. Ready?"
Sau do hoi: "Ban dang lam gi o My? Nail, toc, hay gi khac?"
CHO hoc vien tra loi truoc khi bat dau day.
Sau khi biet, hoi: "OK hom nay minh hoc noi gi truoc nha?"
Roi bat dau day theo nhu cau ho.`,
    },
    'anh-max': {
      style: `PHONG CACH — ANH MAX:
- Nang luong cao, hype, game energy
- Tu xung "minh" hoac "Anh Max"
- Khi sua: "Close! Noi lai nhanh hon di — speed round! Go!"
- Hay tao mini challenges, speed rounds, canh tranh vui
- Giong Gen Z, moi thu la game, high five qua man hinh`,
      intro: `LOI CHAO (HOC VIEN MOI):
Cau dau tien ban noi PHAI la: "What's up! Anh Max day. Hom nay minh luyen cho ban noi nghe pro luon. Let's get it!"
Sau do hoi: "Ban muon hoc noi tieng Anh ve gi? Travel, work, hay daily life?"
CHO hoc vien tra loi truoc.
Sau khi biet, noi: "Bet! Let's go!"
Roi bat dau day.`,
    },
    'chi-linh': {
      style: `PHONG CACH — CHI LINH:
- Binh tinh, chinh xac, thanh lich
- Tu xung "minh" hoac "Chi Linh"
- Khi sua: "Chu 'please' — P bat hoi nhe. Dat tay truoc mieng, noi lai."
- Hay giang van hoa, phep lich su, tai sao cum tu nay quan trong
- Giong co giao piano — calm precision, lam nguoi ta muon hoc tot hon`,
      intro: `LOI CHAO (HOC VIEN MOI):
Cau dau tien ban noi PHAI la: "Chao ban, minh la Chi Linh. Minh giup ban noi tieng Anh ro rang, tu nhien. Shall we begin?"
Sau do hoi: "Ban hoc tieng Anh de lam gi nhi?"
CHO hoc vien tra loi.
Hoi tiep: "Hom nay ban muon bat dau voi chu de gi?"
Roi bat dau day theo chu de ho chon.`,
    },
  };

  const { style: personaStyle, intro: personaIntro } = personaBlocks[persona];

  // ── BASE INSTRUCTION (all personas share this) ──
  const base = `Ban la gia su tieng Anh EasyBee — chuyen day nguoi Viet noi tieng Anh tu tin.

NGUYEN TAC CO BAN:
- Noi chuyen bang tieng Viet la chinh
- KHONG BAO GIO noi mot cau tieng Anh dai. Chi day tung cum ngan 2-5 tu moi lan
- Giu cau tra loi RAT NGAN — 1-2 cau thoi
- Dung "minh", "ban" de tao cam giac gan gui

DINH DANG OUTPUT — BAT BUOC:
Chi dung tags [PHRASE] khi GIOI THIEU cum tu MOI LAN DAU. Khong dung tags khi nhac lai, luyen tap, hay noi chung.
[PHRASE]cum tieng Anh[/PHRASE][VN]nghia tieng Viet[/VN]
Chi tag MOT LAN duy nhat khi day lan dau. Khi on lai hay noi cac buoc 2-4, chi viet plain text, KHONG dung tags.

PHUONG PHAP DAY — CHU TRINH MICRO-LESSON (BAT BUOC):
Moi 3 cum tu = 1 chu trinh hoan chinh. Lam theo dung thu tu:

BUOC 1 - DAY (3 cum tu, tung cai mot):
- Noi: "Cum dau tien: [PHRASE]...[/PHRASE][VN]...[/VN]" (chi lan dau day cum nay)
- Demo phat am ro rang, cham
- Bao hoc vien noi lai
- Neu phat am chua dung: sua cu the (mieng tron hon, luoi cong len, bat hoi nhe)
- Toi da 3 lan thu, roi di tiep
- Lam tuong tu cho cum 2 va 3

BUOC 2 - NOI LIEN:
- "OK, gio noi 3 cau lien nha. Minh noi truoc..."
- Demo ca 3 cau lien tiep tu nhien
- Hoc vien noi lai ca 3
- Sua nhip dieu va su tu nhien

BUOC 3 - KICH BAN (ROLE-PLAY):
- "Gio minh dong vai khach nha. Minh buoc vao tiem..."
- Minh (tutor) dong vai khach/nguoi doi dien
- Hoc vien phai dung 3 cum tu da hoc de tra loi
- Co the hoi them cau bat ngo de thu phan ung: "Actually, can I also get..."
- Day la buoc QUAN TRONG NHAT — hoc vien dung trong tinh huong thuc

BUOC 4 - NGHI + GHI CHU:
- "Nice! 3 cum tu moi — minh ghi lai cho ban."
- Hoi: "Muon hoc them 3 cum nua khong? Hay nghi day?"
- Neu hoc tiep: bat dau chu trinh moi voi 3 cum tiep theo

NGON NGU PHAN HOI — QUAN TRONG:

KHONG BAO GIO NOI:
- "Gioi qua!" "Ban lam tot lam!" (generic, gia tao)
- "Nghe lai ne" (tren xuong, khinh thuong)
- "Chu nay hoi kho" (nghe nhu che hoc vien)
- Cung mot cau khen 2 lan lien tiep
- Do loi cho hoc vien. LUON do loi cho TU: "chu nay ai cung bi" khong phai "ban noi sai"

PHAN HOI THEO MUC DO:
- Dung hoan toan: Khen bang tieng Anh nhanh roi di tiep — "That's it! Cau tiep—"
- Tam duoc: "OK — *Welcome* — nghe chu 'wel' hoi nhan manh khong? Nice though."
- Can sua: "Minh cung thu lai nha — *Wel-come* — mieng tron o chu 'come'. One more time."
- Sai nhieu: "Chu nay trick lam — ai moi hoc cung vay. *Water* — Wah-ter. Ban thu?"

POOL KHEN (XOAY VONG, KHONG LAP LAI):
Tieng Anh: "That's it!", "Nice!", "Smooth!", "Better!", "Good!", "Perfect!", "Excellent!", "Almost!"
Tieng Viet: "OK duoc roi", "O nghe duoc", "Dung roi do", "Gan lam roi"

NGUYEN TAC STEALTH TEACHING:
- Dung tieng Viet de giang day, tieng Anh de KHEN
- Hoc vien se vo thuc lien ket tieng Anh = cam xuc tich cuc
- Chen tieng Anh tu nhien: "OK let's try again", "One more time", "Ready?"

PHAT AM — NGHIEM TUC:
- KHONG BAO GIO bo qua loi phat am
- Chia nho am thanh bang cach mo ta vat ly:
  * "Mieng tron hon" / "Luoi cong len" / "Bat hoi nhe" / "Keo dai am..."
- Dung cau noi phonetic Viet lam cau noi: "Water = Wah-ter, khong phai Woh-to"
- Toi da 3 lan thu moi cum. Lan thu 3 neu van chua duoc:
  "OK duoc roi, minh se quay lai chu nay sau. Cau tiep nha!"
- Dung chu "trick" thay cho "kho": "Chu nay trick lam" (reframe kho khan thanh thu vi)

SUA LOI NGU PHAP VA CAU TRUC — RAT QUAN TRONG:
Khi hoc vien noi sai ngu phap, KHONG chi noi lai cau dung. PHAI giai thich NGUYEN NHAN loi sai.
Cach sua:
1. Xac nhan ho gan dung: "Gan dung roi!"
2. Chi ra loi SAI cu the: "Ban noi 'Where is you from?' — chu 'is' chua dung"
3. GIAI THICH QUY TAC ngan gon bang tieng Viet: "Khi dung 'you', 'we', 'they' thi phai dung 'are'. Con 'is' chi dung cho 'he', 'she', 'it' thoi."
4. Noi cau dung: "Where ARE you from?"
5. Cho hoc vien noi lai cau dung

Vi du cach sua:
- "She go to school" → "Gan dung! Nhung 'she' la mot nguoi, nen phai them 's' — She GOES to school. Quy tac: he/she/it + dong tu them s."
- "I am have a car" → "Ah, khong can 'am' o day. 'Have' la dong tu chinh roi. Chi noi: I HAVE a car."
- "Yesterday I go to store" → "Cau nay la hom qua, nen phai dung qua khu: I WENT to the store. 'Go' thanh 'went' khi noi ve qua khu."

NGUYEN TAC: Giai thich ngan, don gian, bang tieng Viet. Cho 1 vi du minh hoa. Khong giang bai dai.

TINH CACH EASYBEE (AP DUNG CHO TAT CA):
- TU TIN — biet minh la cach tot nhat de hoc tieng Anh cho nguoi Viet
- NANG DONG — khong bao gio nham chan, luon di toi
- THONG MINH — quan sat sac ben, day thong minh
- AM AP — that long muon hoc vien thanh cong
- TRENDY — code-switch tu nhien, hien dai, khong sach giao khoa
- KHONG: Gia tao, khinh thuong, chung chung, nham chan, may moc, qua trang trong

${personaStyle}

KHONG BAO GIO:
- Noi mot doan dai bang tieng Anh
- Sua nhieu loi cung luc
- Gia dinh hoc vien hieu tieng Anh
- Quen dung [PHRASE][/PHRASE][VN][/VN] tags`;

  // ── NEW USER vs RETURNING USER ──
  const greetingNote = '\n\nLUU Y: Loi chao ban dau DA DUOC phat qua audio roi. KHONG noi lai loi chao. Di thang vao noi dung chinh.';

  if (isNewUser()) {
    return `${base}\n\n${personaIntro}${greetingNote}`;
  }

  const profile = getProfile();
  const last = getLastSession();
  const review = getReviewPhrases(3);
  let r = `${base}\n\nTHONG TIN HOC VIEN (DA HOC TRUOC):\n- Trinh do: ${profile.cefrLevel}\n- Muc tieu: ${profile.goals || 'chua ro'}\n- So buoi da hoc: ${profile.totalSessions}\n- Tong cum tu da hoc: ${profile.totalPhrases}\n- Chuoi hoc lien tiep: ${profile.streak} ngay`;
  if (last) r += `\n\nBUOI HOC TRUOC:\n- Chu de: ${last.topic}\n- Tom tat: ${last.summary}\n- Ke hoach hom nay: ${last.nextPlan}`;
  if (review.length > 0) {
    r += `\n\nON TAP DAU BUOI:\nBat dau buoi hoc bang cach on lai ${review.length} cum tu cu: ${review.map(p => `"${p.english}" (${p.vietnamese})`).join(', ')}\nHoi hoc vien doc lai tung cum, khen khi ho nho dung.`;
  }
  r += `\n\nLOI CHAO (HOC VIEN CU):\nChao hoc vien va tom tat ngan buoi hoc truoc.\nGoi y chu de hom nay dua tren ke hoach.\nHoi: "Ban muon hoc chu de nay khong, hay ban muon hoc cai gi khac?"`;
  return r + greetingNote;
}

// ── IELTS System Instruction Builder ───────────────────────
function buildIELTSInstruction(persona: Persona = 'thay-bee'): string {
  const ieltsPersona: Record<Persona, string> = {
    'thay-bee': `PHONG CACH — THAY BEE IELTS:
- Direct scorer, code-switch Viet-Anh. "Nah, that's Band 5. Here's why—"
- Tu xung "minh" hoac "Thay Bee"
- Cham diem thang than nhung khong lam hoc vien nan chi`,
    'co-honey': `PHONG CACH — CO HONEY IELTS:
- Encouraging coach, cho nhieu vi du. "Gan 6 roi — thu them linking words nha"
- Tu xung "minh" hoac "Co Honey"
- Luon khuyen khich va chi ra cach tang band cu the`,
    'anh-max': `PHONG CACH — ANH MAX IELTS:
- Challenge mode, high energy. "OK speed round — Part 1, 4 questions, no stopping!"
- Tu xung "minh" hoac "Anh Max"
- Tao ap luc thi that de hoc vien quen`,
    'chi-linh': `PHONG CACH — CHI LINH IELTS:
- Precision focus. Phan tich loi grammar chi tiet, tu tu.
- Tu xung "minh" hoac "Chi Linh"
- Chia nho tung loi va giai thich can than`,
  };

  const base = `Ban la IELTS Speaking Examiner-Coach cua EasyBee. Ban vua la nguoi cham thi, vua la nguoi huong dan.

CACH LAM VIEC — CHU TRINH 4 BUOC:

BUOC 1 - THI THU (SIMULATE):
- Hoi cau hoi IELTS that (Part 1, 2, hoac 3 tuy theo level)
- KHONG goi y, KHONG giup — de hoc vien tu tra loi
- Nghe het cau tra loi truoc khi phan hoi
- Giong nhu examiner that: lich su, trung lap, chuyen nghiep

BUOC 2 - CHAM DIEM (SCORE):
- Danh gia bang 4 tieu chi IELTS:
  * Fluency & Coherence (FC)
  * Lexical Resource (LR)
  * Grammatical Range & Accuracy (GRA)
  * Pronunciation (P)
- Cho band tuong ung (VD: "Cau tra loi nay khoang Band 5.5")
- Giai thich CU THE tai sao: "Ban dung 'good' 3 lan — Band 7 can tu da dang hon"
- KHONG khen gia — noi that, nhung khong lam hoc vien nan chi
- OUTPUT BAND SCORE DUNG FORMAT:
  [BAND]5.5[/BAND][FC]5[/FC][LR]6[/LR][GRA]5[/GRA][P]6[/P]

BUOC 3 - HUONG DAN (COACH):
- Day KY THUAT tra loi, khong chi tu vung:
  * Part 1: Tra loi 2-3 cau. Y kien + ly do + vi du.
  * Part 2: Mo bai + 3 y chinh + ket luan. Dung linking words.
  * Part 3: Y kien + giai thich + vi du cu the + so sanh.
- Day cum tu nang band:
  [PHRASE]It largely depends on...[/PHRASE][VN]Phu thuoc phan lon vao...[/VN]
  [PHRASE]From my perspective...[/PHRASE][VN]Theo quan diem cua toi...[/VN]
- Chi mot MAU cau tra loi Band 7+ (ngan thoi, khong doc bai van)

BUOC 4 - THU LAI (RETRY):
- Hoi lai CUNG cau hoi do
- Hoc vien tra loi lai voi ky thuat vua hoc
- So sanh lan 1 va lan 2: "Lan nay tot hon! Tu Band 5.5 len khoang 6.0 — ban dung 'bustling' thay 'busy', tot!"
- Sau do chuyen sang cau hoi moi

FORMAT BUOI HOC:
- Bat dau bang Part 1 (de) — 3-4 cau hoi
- Neu hoc vien kha: chuyen sang Part 2 (cue card)
- Part 3 chi khi hoc vien o muc B1+
- Moi Part co simulate → score → coach → retry

PART 2 DAC BIET:
- Doc cue card cho hoc vien, BAT BUOC dung format:
[CUECARD]
Describe a place you like to visit.
You should say:
- where it is
- how often you go there
- what you do there
and explain why you like it.
[/CUECARD]
- Cho 1 phut suy nghi (noi: "Ban co 1 phut de chuan bi. Khi san sang thi noi nha.")
- Hoc vien noi 1-2 phut
- Cham diem va huong dan

NGON NGU:
- Noi TIENG ANH la chinh (day la IELTS — hoc vien can quen nghe tieng Anh)
- Chi dung tieng Viet khi giai thich khai niem kho hoac hoc vien khong hieu
- Khi cham diem: tieng Anh + tieng Viet giai thich

TINH CACH:
- Chuyen nghiep nhung than thien — nhu examiner that nhung co tam
- Khong lam hoc vien so — nhung cung khong nuong chieu
- Noi that ve band score — hon phan nua hoc vien that bai vi khong biet minh dang o dau
- Sau khi cham: LUON cho mot tip cu the de tang band

IELTS TOPIC BANK (dung xoay vong):
Part 1: Hometown, Work/Study, Daily routine, Weather, Food, Hobbies, Family, Transport, Music, Reading
Part 2: Describe a place, a person, an event, an achievement, a book, a trip, a skill, a change
Part 3: Technology impact, Education systems, Environment, Urbanization, Health, Culture, Media

CUM TU NANG BAND (day khi phu hop):
Band 6: "I think", "For example", "On the other hand"
Band 7: "It largely depends on", "From my perspective", "That being said", "By and large"
Band 8+: "It's worth noting that", "One could argue that", "There's a growing tendency to"

DINH DANG OUTPUT — BAT BUOC:
Chi dung tags [PHRASE] khi GIOI THIEU cum tu MOI LAN DAU. Khong dung tags khi nhac lai.
[PHRASE]cum tieng Anh[/PHRASE][VN]nghia tieng Viet[/VN]
Chi tag MOT LAN duy nhat khi day lan dau. Khi on lai hay luyen tap, chi viet plain text.

${ieltsPersona[persona]}

KHONG BAO GIO:
- Quen dung [PHRASE][/PHRASE][VN][/VN] tags
- Quen dung [BAND][/BAND][FC][/FC][LR][/LR][GRA][/GRA][P][/P] khi cham diem
- Quen dung [CUECARD][/CUECARD] khi cho cue card Part 2`;

  // For returning users, inject context
  if (!isNewUser()) {
    const profile = getProfile();
    return `${base}\n\nTHONG TIN HOC VIEN:\n- Trinh do: ${profile.cefrLevel}\n- So buoi da hoc: ${profile.totalSessions}\n- Tong cum tu da hoc: ${profile.totalPhrases}\n\nLOI CHAO:\nChao hoc vien va bat dau Part 1 ngay. Hoi cau hoi IELTS dau tien.`;
  }

  return `${base}\n\nLOI CHAO (HOC VIEN MOI):\nGioi thieu ban la IELTS Speaking examiner-coach cua EasyBee.\nHoi trinh do hien tai cua hoc vien (da thi IELTS chua, muc tieu band bao nhieu).\nSau do bat dau Part 1 voi cau hoi don gian.\n\nLUU Y: Loi chao ban dau DA DUOC phat qua audio roi. KHONG noi lai loi chao. Di thang vao noi dung chinh.`;
}

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════

/** Word reveal — word-by-word with spring stagger */
const WordReveal = ({ text, className = '', delay = 0, reduced = false }: { text: string; className?: string; delay?: number; reduced?: boolean }) => {
  const words = text.split(' ');
  if (reduced) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            ease,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/** Get total WordReveal duration for sequencing Vietnamese subtitle */
const getWordRevealDuration = (text: string, delay: number) =>
  delay + text.split(' ').length * 0.06 + 0.2;

/** Phrase reveal — clean text, no card */
const Flashcard = ({ phrase, reduced = false }: { phrase: Phrase; reduced?: boolean }) => {
  const vnDelay = getWordRevealDuration(phrase.english, 0);
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(12px)' }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.25 } }}
      transition={reduced ? { duration: 0 } : { ...spring.gentle }}
      className="flex flex-col items-center justify-center px-8 py-10"
    >
      <WordReveal
        text={phrase.english}
        reduced={reduced}
        className="text-[28px] font-light text-text text-center leading-tight tracking-tight"
      />
      <motion.p
        className="text-[15px] text-text-secondary mt-4 text-center"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, delay: vnDelay, ease }}
      >
        {phrase.vietnamese}
      </motion.p>
    </motion.div>
  );
};

/** All learned phrases list — shows all 3 with newest highlighted */
const phraseListVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const phraseItemVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/** Speaker icon with tap-to-speak */
const SpeakerButton = ({ text, voiceName, playingKey, setPlayingKey }: {
  text: string; voiceName: string;
  playingKey: string | null; setPlayingKey: (k: string | null) => void;
}) => {
  const isPlaying = playingKey === text;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (isPlaying) { stopTTS(); setPlayingKey(null); return; }
        setPlayingKey(text);
        speakPhrase(text, voiceName, undefined, () => setPlayingKey(null));
      }}
      className="shrink-0 p-1 -m-1 touch-manipulation"
    >
      <motion.div animate={isPlaying ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
        transition={isPlaying ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
      >
        <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#0a0a0a]' : 'text-[#b0b0b0]'}`} />
      </motion.div>
    </button>
  );
};

const PhraseList = ({ phrases, currentPhrase, reduced = false, voiceName }: { phrases: Phrase[]; currentPhrase: Phrase | null; reduced?: boolean; voiceName: string }) => {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  if (reduced) {
    return (
      <div className="w-full px-8 py-4 space-y-4 overflow-y-auto max-h-[240px]">
        {phrases.map((p) => {
          const isCurrent = currentPhrase?.english === p.english;
          return (
            <div key={p.english} className="flex items-start gap-2">
              <div className="flex-1 flex flex-col">
                <p className={`leading-tight ${isCurrent ? 'text-[22px] font-light text-text tracking-tight' : 'text-[15px] font-light text-text-muted'}`}>
                  {p.english}
                </p>
                <p className={`mt-0.5 ${isCurrent ? 'text-[14px] text-text-secondary' : 'text-[12px] text-text-muted'}`}>
                  {p.vietnamese}
                </p>
              </div>
              <SpeakerButton text={p.english} voiceName={voiceName} playingKey={playingKey} setPlayingKey={setPlayingKey} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      className="w-full px-8 py-4 space-y-4 overflow-y-auto max-h-[240px]"
      variants={phraseListVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence mode="popLayout">
        {phrases.map((p) => {
          const isCurrent = currentPhrase?.english === p.english;
          return (
            <motion.div
              key={p.english}
              layout
              variants={phraseItemVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.2 } }}
              className="flex items-start gap-2"
            >
              <div className="flex-1 flex flex-col">
                <motion.p
                  className="leading-tight font-light"
                  animate={{
                    fontSize: isCurrent ? '22px' : '15px',
                    color: isCurrent ? '#0a0a0a' : '#8a8a8a',
                    letterSpacing: isCurrent ? '-0.025em' : '0em',
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p.english}
                </motion.p>
                <motion.p
                  className="mt-0.5"
                  animate={{
                    fontSize: isCurrent ? '14px' : '12px',
                    color: isCurrent ? '#8a8a8a' : '#b0b0b0',
                    opacity: isCurrent ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p.vietnamese}
                </motion.p>
              </div>
              <SpeakerButton text={p.english} voiceName={voiceName} playingKey={playingKey} setPlayingKey={setPlayingKey} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

/** Pulsing dots */
const PulsingDots = () => (
  <div className="flex items-center gap-1.5">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#ccc]"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

/** Animated number — counts up from 0 */
const AnimatedNumber = ({ value, duration = 0.8, reduced = false }: { value: number; duration?: number; reduced?: boolean }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (reduced) { setDisplay(value); return; }
    const start = Date.now();
    let raf: number;
    const animate = () => {
      const progress = Math.min((Date.now() - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduced]);
  return <span>{display}</span>;
};

// ═══════════════════════════════════════════════════════════
// BLURRED STAGGER TEXT (per-char blur-to-clear reveal)
// ═══════════════════════════════════════════════════════════
const blurredContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.015 } } };
const blurredLetter = { hidden: { opacity: 0, filter: 'blur(10px)' }, show: { opacity: 1, filter: 'blur(0px)' } };

const BlurredStagger = ({ text }: { text: string }) => {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <p className="text-[13px] text-text-secondary text-center leading-relaxed line-clamp-2">
        {text}
      </p>
    );
  }
  return (
    <motion.p variants={blurredContainer} initial="hidden" animate="show" className="text-[13px] text-text-secondary text-center leading-relaxed line-clamp-2">
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={blurredLetter} transition={{ duration: 0.3 }} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.p>
  );
};

/** Accordion section — height animation via scrollHeight */
const AccordionSection = ({
  title, open, onToggle, reduced, children,
}: {
  title: string; open: boolean; onToggle: () => void; reduced: boolean; children: React.ReactNode;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(open ? -1 : 0); // -1 = auto (initial open)

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div className="border-b border-[#e0e0e0]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 px-1 text-left"
      >
        <span className="text-[15px] font-medium text-text">{title}</span>
        <ChevronDown
          className="w-4 h-4 text-text-secondary transition-transform"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transitionDuration: reduced ? '0ms' : '200ms',
          }}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          height: height === -1 ? 'auto' : height,
          overflow: 'hidden',
          transition: reduced ? 'none' : 'height 200ms ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Session end screen — monochrome with accordion */
const SessionEndScreen = ({
  phrases, isAnalyzing, nextPlan, onViewNotes, onNewSession, reduced, voiceName,
}: {
  phrases: Phrase[]; isAnalyzing: boolean; nextPlan: string;
  onViewNotes: () => void; onNewSession: () => void; reduced: boolean; voiceName: string;
}) => {
  const profile = getProfile();
  const t = getTransitions(reduced);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    phrases: true,
    plan: false,
  });

  const toggle = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.5 }}
      className="flex-1 flex flex-col px-6 pt-4 pb-6 overflow-y-auto"
    >
      <motion.h2
        className="text-[22px] font-light text-text text-center mb-8"
        style={{ letterSpacing: '-0.5px' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease }}
      >
        Bài học hôm nay
      </motion.h2>

      {/* Stats — animated counters */}
      <div className="flex gap-3 mb-6">
        {[
          { value: phrases.length, label: 'cụm từ mới' },
          { value: profile.streak || 1, label: 'ngày liên tiếp' },
          { value: profile.totalPhrases + phrases.length, label: 'tổng cụm từ' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ ...t.spring, delay: reduced ? 0 : 0.15 + i * 0.1 }}
            className="flex-1 rounded-xl p-4 text-center"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-[22px] font-semibold text-text">
              <AnimatedNumber value={stat.value} duration={0.8 + i * 0.2} reduced={reduced} />
            </p>
            <p className="text-[12px] text-text-secondary mt-1.5 tracking-wider uppercase font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Accordion sections */}
      <div className="mb-6">
        {/* Section: Phrases */}
        {phrases.length > 0 && (
          <AccordionSection
            title="Cụm từ đã học"
            open={openSections.phrases}
            onToggle={() => toggle('phrases')}
            reduced={reduced}
          >
            <div className="pb-3">
              {phrases.map((p, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ ...t.spring, delay: reduced ? 0 : 0.4 + i * 0.07 }}
                  className="flex gap-3 items-start py-3 border-b border-border last:border-b-0"
                >
                  <span className="text-text-muted font-semibold text-sm min-w-[20px]">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-text font-medium text-[15px]">{p.english}</p>
                    <p className="text-text-secondary text-[13px] mt-0.5">{p.vietnamese}</p>
                  </div>
                  <SpeakerButton text={p.english} voiceName={voiceName} playingKey={playingKey} setPlayingKey={setPlayingKey} />
                </motion.div>
              ))}
            </div>
          </AccordionSection>
        )}

        {/* Section: Next plan */}
        <AccordionSection
          title="Kế hoạch tiếp theo"
          open={openSections.plan}
          onToggle={() => toggle('plan')}
          reduced={reduced}
        >
          <div className="pb-4 px-1">
            {isAnalyzing ? (
              <div className="flex items-center gap-2.5 text-text-secondary text-sm py-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang chuẩn bị buổi học tiếp theo...</span>
              </div>
            ) : nextPlan ? (
              <BlurredStagger text={nextPlan} />
            ) : (
              <p className="text-[13px] text-text-secondary py-2">Chưa có kế hoạch.</p>
            )}
          </div>
        </AccordionSection>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-3 pt-4">
        {phrases.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.gentle, delay: 0.9 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewNotes}
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-white text-[15px] font-semibold"
            style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
          >
            <Copy className="w-4 h-4" /> Copy ghi chú
          </motion.button>
        )}
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.gentle, delay: 1.0 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewSession}
          className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-text text-[15px] font-semibold bg-surface border border-border"
        >
          Học tiếp
        </motion.button>
      </div>
    </motion.div>
  );
};

/** Notes view */
const SummaryView = ({ phrases, onBack, voiceName }: { phrases: Phrase[]; onBack: () => void; voiceName: string }) => {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copyNotes = useCallback(() => {
    const profile = getProfile();
    const text = phrases.map((p, i) => `${i + 1}. ${p.english} — ${p.vietnamese}`).join('\n');
    navigator.clipboard.writeText(`EasyBee - Bài học hôm nay\nTrình độ: ${profile.cefrLevel} | Tổng: ${profile.totalPhrases} cụm từ\n\n${text}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [phrases]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col px-6 pt-2 pb-6"
    >
      <motion.button
        onClick={onBack} whileTap={{ scale: 0.98 }}
        className="flex items-center gap-1.5 text-text-secondary hover:text-text text-[13px] mb-6 self-start transition-colors duration-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}>
        <h2 className="text-[20px] font-light text-text" style={{ letterSpacing: '-0.5px' }}>Ghi chú hôm nay</h2>
        <p className="text-text-secondary text-[13px] mt-1 mb-6">{phrases.length} cụm từ đã học</p>
      </motion.div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {phrases.map((p, idx) => (
          <motion.div key={idx}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring.gentle, delay: 0.15 + idx * 0.05 }}
            className="flex gap-3 items-start py-3 border-b border-border"
          >
            <span className="text-text-muted font-semibold text-sm min-w-[20px]">{idx + 1}</span>
            <div className="flex-1">
              <p className="text-text font-medium text-[15px]">{p.english}</p>
              <p className="text-text-secondary text-[13px] mt-0.5">{p.vietnamese}</p>
            </div>
            <SpeakerButton text={p.english} voiceName={voiceName} playingKey={playingKey} setPlayingKey={setPlayingKey} />
          </motion.div>
        ))}
      </div>

      {phrases.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + phrases.length * 0.05, ease }}
          whileTap={{ scale: 0.98 }}
          onClick={copyNotes}
          className="mt-6 flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-accent text-white text-[15px] font-semibold"
          style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
        >
          {copied ? <><Check className="w-4 h-4" /> Đã copy!</> : <><Copy className="w-4 h-4" /> Copy ghi chú</>}
        </motion.button>
      )}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════
// AUTH WRAPPER
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
      if (session) syncProfileFromSupabase(session.access_token);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
      if (session) syncProfileFromSupabase(session.access_token);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  return <TutorApp session={session} />;
}

// ═══════════════════════════════════════════════════════════
// MAIN TUTOR APP
// ═══════════════════════════════════════════════════════════
function TutorApp({ session }: { session: Session }) {
  const reduced = usePrefersReducedMotion();
  const pv = getPhaseVariants(reduced);

  // Set TTS auth token whenever session changes
  useEffect(() => { setTTSAuthToken(session.access_token); }, [session.access_token]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [volume, setVolume] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [latestTutorMsg, setLatestTutorMsg] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [learnedPhrases, setLearnedPhrases] = useState<Phrase[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nextPlan, setNextPlan] = useState('');
  const [sessionTopic, setSessionTopic] = useState('');
  const [allTutorMessages, setAllTutorMessages] = useState<string[]>([]);
  const [showVoicePicker, setShowVoicePicker] = useState(!getSavedVoice());
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [mode, setMode] = useState<AppMode>(getSavedMode());
  const [currentCueCard, setCurrentCueCard] = useState<string | null>(null);
  const [currentBandScore, setCurrentBandScore] = useState<BandScoreData | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const audioHandlerRef = useRef<AudioHandler | null>(null);
  const sessionRef = useRef<any>(null);
  const greetingAudioRef = useRef<HTMLAudioElement | null>(null);
  const tutorBufferRef = useRef('');
  const knownPhrasesRef = useRef<Set<string>>(new Set());

  const voiceName = VOICE_MAP[getSavedVoice() || 'thay-bee'];

  const isRecording = phase === 'lesson';
  const isConnecting = phase === 'connecting';

  const processTutorText = useCallback((newText: string) => {
    tutorBufferRef.current += newText;
    if (hasIncompleteMarker(tutorBufferRef.current)) return;
    const { displayText, phrases, cueCard, bandScore } = parseAIOutput(tutorBufferRef.current);
    for (const p of phrases) {
      const k = p.english.toLowerCase();
      if (!knownPhrasesRef.current.has(k)) {
        knownPhrasesRef.current.add(k);
        setCurrentPhrase(p);
        setLearnedPhrases(prev => [...prev, p]);
      }
    }
    if (cueCard) setCurrentCueCard(cueCard);
    if (bandScore) setCurrentBandScore(bandScore);
    if (displayText) setLatestTutorMsg(displayText);
  }, []);

  const finalizeTutorTurn = useCallback(() => {
    const buf = tutorBufferRef.current;
    if (buf) {
      const { displayText } = parseAIOutput(buf);
      if (displayText) {
        setLatestTutorMsg(displayText);
        setAllTutorMessages(prev => [...prev, displayText]);
      }
    }
    tutorBufferRef.current = '';
  }, []);

  const runPostSessionAnalysis = useCallback(async (ph: Phrase[], msgs: string[]) => {
    setIsAnalyzing(true);
    try { const r = await analyzeSession(ph, msgs, sessionTopic, session.access_token, mode); if (r?.nextPlan) setNextPlan(r.nextPlan); }
    catch (e) { console.error('Post-session analysis failed:', e); }
    finally { setIsAnalyzing(false); }
  }, [sessionTopic, session.access_token, mode]);

  const startSession = async () => {
    if (phase === 'connecting' || phase === 'lesson') return; // prevent double-click
    if (!checkCanStartSession()) { setShowPaywall(true); return; }

    // ── Instant feedback: haptic + visual + greeting audio ──
    navigator.vibrate?.([50]);
    setPhase('connecting'); setErrorMsg(null); setLatestTutorMsg(''); setCurrentPhrase(null);

    // Play pre-recorded greeting while WebSocket connects
    const greetingPersona = getSavedVoice() || 'thay-bee';
    const greetingState = isNewUser() ? 'new' : 'return';
    greetingAudioRef.current?.pause();
    const greetingAudio = new Audio(`/greetings/${greetingPersona}-${greetingState}.wav`);
    greetingAudioRef.current = greetingAudio;
    greetingAudio.onended = () => { greetingAudioRef.current = null; };
    greetingAudio.play().catch(() => {});

    try {
      const tokenRes = await fetch('/api/gemini-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!tokenRes.ok) throw new Error('Không thể kết nối server. Vui lòng thử lại.');
      const { apiKey } = await tokenRes.json();
      if (!apiKey) throw new Error('API key is missing.');
      const ai = new GoogleGenAI({ apiKey });
      setLearnedPhrases([]); setNextPlan(''); setSessionTopic(''); setAllTutorMessages([]);
      setCurrentCueCard(null); setCurrentBandScore(null);
      knownPhrasesRef.current.clear(); tutorBufferRef.current = '';

      const persona = (getSavedVoice() || 'thay-bee') as Persona;
      const sysInst = mode === 'ielts' ? buildIELTSInstruction(persona) : buildSystemInstruction(persona);
      const voiceName = VOICE_MAP[persona];
      const handler = new AudioHandler();
      audioHandlerRef.current = handler;
      handler.onVolumeChange = v => setVolume(Math.min(1, v * 5));

      const sp = ai.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
          systemInstruction: sysInst, outputAudioTranscription: {}, inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            incrementSessionCount();
            setPhase('lesson');
            handler.startRecording(b64 => { sp.then(s => s.sendRealtimeInput({ audio: { data: b64, mimeType: 'audio/pcm;rate=16000' } })); });
          },
          onmessage: async (msg: LiveServerMessage) => {
            const parts = msg.serverContent?.modelTurn?.parts;
            if (parts) for (const p of parts) { if (p.inlineData?.data) handler.playAudio(p.inlineData.data); }
            if (msg.serverContent?.outputTranscription?.text) processTutorText(msg.serverContent.outputTranscription.text);
            if (parts) for (const p of parts) { if (p.text) processTutorText(p.text); }
            if (msg.serverContent?.turnComplete) finalizeTutorTurn();
            if (msg.serverContent?.interrupted) { handler.stopPlayback(); finalizeTutorTurn(); }
          },
          onclose: (ev: any) => {
            if (ev?.code !== 1000 && ev?.code !== 1005) setErrorMsg(`Mất kết nối (${ev?.code}): ${ev?.reason || 'Lỗi không xác định'}`);
            cleanup();
            setPhase(prev => prev === 'lesson' || prev === 'connecting' ? 'idle' : prev);
          },
          onerror: (err: any) => { setErrorMsg(err instanceof Error ? err.message : (err.message || String(err))); cleanup(); setPhase('idle'); },
        },
      });
      sessionRef.current = sp;
    } catch (e: any) { setErrorMsg(e.message || String(e)); setPhase('idle'); }
  };

  const cleanup = () => {
    audioHandlerRef.current?.stopRecording(); audioHandlerRef.current = null;
    sessionRef.current?.then((s: any) => { try { s.close(); } catch {} }); sessionRef.current = null;
    if (greetingAudioRef.current) { greetingAudioRef.current.pause(); greetingAudioRef.current = null; }
    setVolume(0);
  };

  const endSession = () => { if (phase !== 'lesson' && phase !== 'connecting') return; cleanup(); setPhase('session-end'); runPostSessionAnalysis(learnedPhrases, allTutorMessages); };
  const toggleSession = () => { setErrorMsg(null); if (isRecording) endSession(); else startSession(); };

  // ── Render ──
  return (
    <div className="min-h-screen bg-bg text-text flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative overflow-hidden bg-bg">

        {/* Header */}
        <motion.div
          className="pt-14 pb-5 px-6 text-center z-10 relative"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="absolute right-6 top-14 flex items-center gap-3">
            <button
              onClick={() => setShowCommandPalette(true)}
              className="text-text-muted hover:text-text transition-colors"
              title="Hành động nhanh"
              aria-label="Hành động nhanh"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowVoicePicker(true)}
              className="text-text-muted hover:text-text transition-colors"
              title="Đổi giáo viên"
              aria-label="Đổi giáo viên"
            >
              <UserCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-[12px] text-text-muted hover:text-text transition-colors"
            >
              Đăng xuất
            </button>
          </div>
          <h1 className="text-[20px] font-bold tracking-tight text-text" style={{ fontFamily: "'Comfortaa', sans-serif" }}>
            EasyBee
          </h1>
          <p className="text-[12px] text-text-secondary mt-1 tracking-[0.15em] uppercase font-semibold">{mode === 'ielts' ? 'IELTS Speaking' : 'Gia sư tiếng Anh'}</p>
        </motion.div>

        {/* ── Phase content ── */}
        <AnimatePresence mode="wait">
          {showVoicePicker ? (
            <motion.div key="voice-picker" variants={pv} initial="enter" animate="center" exit="exit" transition={reduced ? { duration: 0 } : transitions.normal} className="flex-1 flex flex-col">
              <VoicePicker onSelect={(persona) => {
                setShowVoicePicker(false);
                saveVoicePreference(persona, session.access_token);
              }} reduced={reduced}
                isLockedVoice={(id) => isPremiumVoice(id) && !getSubscription().isPremium}
                onLockedTap={() => setShowPaywall(true)}
              />
            </motion.div>
          ) : phase === 'session-end' ? (
            <motion.div key="end" variants={pv} initial="enter" animate="center" exit="exit" transition={reduced ? { duration: 0 } : transitions.normal} className="flex-1 flex flex-col">
              <SessionEndScreen phrases={learnedPhrases} isAnalyzing={isAnalyzing} nextPlan={nextPlan}
                onViewNotes={() => setPhase('summary')} onNewSession={() => startSession()} reduced={reduced} voiceName={voiceName} />
            </motion.div>
          ) : phase === 'summary' ? (
            <motion.div key="summary" variants={pv} initial="enter" animate="center" exit="exit" transition={reduced ? { duration: 0 } : transitions.normal} className="flex-1 flex flex-col">
              <SummaryView phrases={learnedPhrases} onBack={() => setPhase('session-end')} voiceName={voiceName} />
            </motion.div>
          ) : (
            <motion.div key="main" variants={pv} initial="enter" animate="center" exit="exit" transition={reduced ? { duration: 0 } : transitions.normal} className="flex-1 flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center pb-56">

                {/* Flashcard zone */}
                <div className="w-full flex flex-col items-center justify-center min-h-[220px] py-6">
                  <AnimatePresence mode="wait">
                    {currentCueCard ? (
                      <CueCard key="cuecard" text={currentCueCard} />
                    ) : currentBandScore ? (
                      <BandScore key="bandscore" data={currentBandScore} />
                    ) : learnedPhrases.length > 0 && phase === 'lesson' ? (
                      <PhraseList phrases={learnedPhrases} currentPhrase={currentPhrase} reduced={reduced} voiceName={voiceName} />
                    ) : phase === 'idle' ? (
                      <motion.div key="idle" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.25, ease }}
                        className="flex flex-col items-center w-full px-6"
                      >
                        {/* Mode selector */}
                        <div className="w-full space-y-3 mb-6">
                          {[
                            { id: 'conversation' as AppMode, title: 'Học Giao Tiếp', desc: 'Luyện nói tiếng Anh cho công việc hàng ngày' },
                            { id: 'ielts' as AppMode, title: 'Luyện IELTS Speaking', desc: 'Thi thử & luyện band với AI examiner' },
                          ].map((m, i) => {
                            const locked = isPremiumMode(m.id) && !getSubscription().isPremium;
                            return (
                            <motion.button
                              key={m.id}
                              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                              transition={reduced ? { duration: 0 } : { delay: i * 0.1, duration: 0.4, ease }}
                              onClick={() => { if (locked) { setShowPaywall(true); return; } setMode(m.id); saveMode(m.id); }}
                              className={`w-full text-left rounded-xl p-4 transition-all duration-200 bg-surface border border-border ${mode === m.id ? 'ring-2 ring-accent' : ''}`}
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-[15px] font-semibold text-text">{m.title}</p>
                                {locked && <Lock className="w-4 h-4 text-text-muted" />}
                              </div>
                              <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">{m.desc}</p>
                            </motion.button>
                            );
                          })}
                        </div>
                        {/* Change voice button */}
                        <button
                          onClick={() => setShowVoicePicker(true)}
                          className="text-[12px] text-text-secondary hover:text-text transition-colors mb-4 flex items-center gap-1.5"
                        >
                          <UserCircle className="w-3.5 h-3.5" />
                          Đổi giáo viên
                        </button>

                        <p className="text-center text-[13px] text-text-secondary max-w-[260px] leading-relaxed">
                          {isNewUser()
                            ? 'Nhấn vào micro để bắt đầu'
                            : `Chào mừng bạn quay lại! Bạn đã học ${getProfile().totalPhrases} cụm từ.`}
                        </p>
                      </motion.div>
                    ) : phase === 'lesson' && !currentPhrase && !currentCueCard && !currentBandScore ? (
                      <motion.div key="dots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }} className="flex flex-col items-center gap-3"
                      >
                        <PulsingDots />
                        <p className="text-[12px] text-text-secondary">Đang nghe...</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Latest tutor message — single line, not a list */}
                <AnimatePresence mode="wait">
                  {latestTutorMsg && phase === 'lesson' && (
                    <motion.div
                      key={latestTutorMsg.slice(0, 30)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3, ease }}
                      className="px-8 mb-4 max-w-full"
                    >
                      <BlurredStagger key={latestTutorMsg.slice(0, 30)} text={latestTutorMsg} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div
                className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 pt-24"
                style={{ background: 'linear-gradient(to top, white 50%, rgba(255,255,255,0.95) 75%, transparent)' }}
              >
                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring.snappy }}
                    className="mb-4 px-4 py-2.5 rounded-xl text-text text-[12px] text-center max-w-[85%] bg-surface border border-border"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                {learnedPhrases.length > 0 && phase === 'lesson' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={spring.snappy}
                    className="mb-5 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] text-text-secondary font-semibold bg-surface border border-border"
                  >
                    {learnedPhrases.length} cụm từ đã học
                  </motion.div>
                )}

                <MicOrb volume={volume} isActive={isRecording} isConnecting={isConnecting} onClick={toggleSession} reduced={reduced} />

                <AnimatePresence>
                  {isRecording && (
                    <motion.button
                      className="mt-5 px-5 py-2 rounded-full text-[12px] text-text-secondary font-medium bg-surface border border-border hover:bg-surface-hover hover:text-text transition-colors"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      onClick={endSession}
                      aria-label="Kết thúc buổi học"
                    >
                      Kết thúc buổi học
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CommandPalette
        open={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onChangeVoice={() => setShowVoicePicker(true)}
        onSetMode={(m) => { setMode(m); saveMode(m); }}
        onShowProgress={() => setPhase('summary')}
        onEndSession={endSession}
        onSignOut={() => supabase.auth.signOut()}
        isInLesson={phase === 'lesson'}
      />

      <AnimatePresence>
        {showPaywall && (
          <PaywallScreen
            onSubscribe={async () => { await setPremium(true); setShowPaywall(false); }}
            onRestore={async () => { await setPremium(true); setShowPaywall(false); }}
            onClose={() => setShowPaywall(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
