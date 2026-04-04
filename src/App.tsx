import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Copy, Check, ArrowLeft, Loader2, UserCircle, Menu, ChevronDown, Lock, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioHandler } from './lib/audio';
import { speakPhrase, stopTTS, setTTSAuthToken } from './lib/tts';
import { type Phrase, isNewUser, getProfile, getLastSession, getReviewPhrases } from './lib/profile';
import { analyzeSession } from './lib/curriculum';
import { supabase } from './lib/supabase';
import { syncProfileFromSupabase, saveVoicePreference } from './lib/profile';
import { transitions, ease, getFadeUp, getPhaseVariants, getTransitions, usePrefersReducedMotion } from './lib/motion';
import LoginScreen from './components/LoginScreen';

// ── Account Screen ───────────────────────────────────────────
function AccountScreen({ session, onClose, onUpgrade, onSignOut, remainingSeconds }: {
  session: Session;
  onClose: () => void;
  onUpgrade: () => void;
  onSignOut: () => void;
  remainingSeconds: number;
}) {
  const isPremium = getSubscription().isPremium;
  const usedSeconds = FREE_SECONDS - remainingSeconds;
  const usedMinutes = Math.round(usedSeconds / 60);
  const totalMinutes = Math.round(FREE_SECONDS / 60);
  const remainingMinutes = Math.round(remainingSeconds / 60);
  const progress = Math.min(1, usedSeconds / FREE_SECONDS);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative pt-14 pb-5 px-6">
        <button
          onClick={onClose}
          className="absolute right-6 top-14 text-text-muted hover:text-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-[22px] font-light text-text" style={{ letterSpacing: '-0.5px' }}>Tài khoản</h1>
      </div>

      <div className="flex-1 px-6 space-y-6 overflow-y-auto">
        <div className="py-4 border-b border-[#e8e8e8]">
          <p className="text-[12px] text-[#8a8a8a] uppercase tracking-wider font-semibold mb-1">Email</p>
          <p className="text-[15px] text-[#0a0a0a]">{session.user.email}</p>
        </div>

        <div className="py-4 border-b border-[#e8e8e8]">
          <p className="text-[12px] text-[#8a8a8a] uppercase tracking-wider font-semibold mb-1">Gói</p>
          {isPremium ? (
            <p className="text-[15px] text-[#0a0a0a] font-semibold">✨ Premium</p>
          ) : (
            <>
              <p className="text-[15px] text-[#0a0a0a]">Free — {remainingMinutes} phút còn lại tháng này</p>
              <div className="mt-3 h-2 rounded-full bg-[#f2f2f2] overflow-hidden border border-[#e8e8e8]">
                <div
                  className="h-full rounded-full bg-[#0a0a0a] transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="text-[12px] text-[#8a8a8a] mt-1.5">{usedMinutes} / {totalMinutes} phút đã dùng</p>
            </>
          )}
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3">
        {!isPremium && (
          <button
            onClick={onUpgrade}
            className="w-full py-4 rounded-xl bg-[#0a0a0a] text-white text-[15px] font-semibold"
            style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
          >
            Nâng cấp lên Premium →
          </button>
        )}
        <button
          onClick={onSignOut}
          className="w-full py-4 rounded-xl text-[#0a0a0a] text-[15px] font-semibold bg-[#f9f9f9] border border-[#e8e8e8]"
        >
          Đăng xuất
        </button>
      </div>
    </motion.div>
  );
}
import MicOrb from './components/MicOrb';
import VoicePicker, { type Persona, VOICE_MAP, getSavedVoice } from './components/VoicePicker';
import CueCard from './components/CueCard';
import BandScore, { type BandScoreData } from './components/BandScore';
import CommandPalette from './components/CommandPalette';
import PaywallScreen from './components/PaywallScreen';
import PricingScreen from './components/PricingScreen';
import { checkCanStartSession, incrementSessionCount, setPremium, getSubscription, isPremiumVoice, isPremiumMode } from './lib/subscription';
import { getRemainingSecondsSync, addUsageSeconds, canStartFreeSession, FREE_SECONDS } from './lib/usage';
import PronunciationHint from './components/PronunciationHint';
import UsageBanner from './components/UsageBanner';
import FreeLimitDialog from './components/FreeLimitDialog';
import TutorSpeech from './components/TutorSpeech';
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

// ── Persona opening greetings ─────────────────────────────────
const PERSONA_GREETINGS: Record<Persona, string> = {
  'thay-bee': 'Thầy Bee đây.',
  'co-honey': 'Cô Honey đây.',
  'anh-max': "Anh Max đây, let's go!",
  'chi-linh': 'Chị Linh đây.',
};

// ── Hint texts shown after mic tap (first turn only) ──────────
const PERSONA_HINTS: Record<Persona, string> = {
  'thay-bee': "Hãy nói 'Xin chào Thầy Bee' để bắt đầu",
  'co-honey': "Hãy nói 'Xin chào Cô Honey' để bắt đầu",
  'anh-max': "Hãy nói 'Hey Anh Max' để bắt đầu",
  'chi-linh': "Hãy nói 'Xin chào Chị Linh' để bắt đầu",
};

// ── System Instruction Builder ──────────────────────────────
function buildSystemInstruction(persona: Persona = 'thay-bee'): string {
  // ── PERSONA-SPECIFIC SECTIONS ──
  const personaBlocks: Record<Persona, { style: string; intro: string }> = {
    'thay-bee': {
      style: `PHONG CACH — THAY BEE:
- Am ap, binh tinh, tu tin nhung khong hao nhoang
- Tu xung "minh" hoac "Thay Bee"
- Noi CHAM va RO RANG — khong voi, khong nhanh
- Dung tieng Viet la CHINH. Chi dung tieng Anh khi DAY cum tu hoac KHEN ngan (Excellent!, Good job!, Well done!, You did great!)
- KHONG mix tieng Anh qua nhieu trong cau noi — hoc vien A1 se khong hieu
- Khi sua: "Chua dung lam — nghe minh nha: *seat*. Chu 'ea' keo dai hon. Thu lai nha."
- Lich su, nhe nhang nhung nghiem tuc khi can
- Giong nhu mot anh lon biet cach, kien nhan, khong bao gio lam hoc vien thay ngu`,
      intro: `KHOI DAU: Doi hoc vien chao truoc. Khi nghe bat ky loi chao, tra loi tu nhien theo phong cach Thay Bee: am ap, nhe nhang. Hoi chu de hoc ngay sau loi chao. Chi chao MOT LAN duy nhat.`,
    },
    'co-honey': {
      style: `PHONG CACH — CO HONEY:
- Am ap, thuc te, kinh nghiem salon thuc
- Tu xung "minh" hoac "Co Honey"
- Khi sua: "Gan roi — nhung khach se khong hieu dau. Nghe minh nha—"
- Hay dung vi du tu salon, tiep khach, giao tiep cong viec thuc
- Giong nhu chi em lam nail 10 nam o My, biet chinh xac hoc vien can gi`,
      intro: `KHOI DAU: Doi hoc vien chao truoc. Khi nghe bat ky loi chao, tra loi tu nhien theo phong cach Co Honey: than thiet, kinh nghiem thuc te. Hoi chu de hoc ngay sau loi chao. Chi chao MOT LAN duy nhat.`,
    },
    'anh-max': {
      style: `PHONG CACH — ANH MAX:
- Nang luong cao, hype, game energy
- Tu xung "minh" hoac "Anh Max"
- Khi sua: "Close! Noi lai nhanh hon di — speed round! Go!"
- Hay tao mini challenges, speed rounds, canh tranh vui
- Giong Gen Z, moi thu la game, high five qua man hinh`,
      intro: `KHOI DAU: Doi hoc vien chao truoc. Khi nghe bat ky loi chao, tra loi tu nhien theo phong cach Anh Max: nang dong, high energy. Hoi chu de hoc ngay sau loi chao. Chi chao MOT LAN duy nhat.`,
    },
    'chi-linh': {
      style: `PHONG CACH — CHI LINH:
- Binh tinh, chinh xac, thanh lich
- Tu xung "minh" hoac "Chi Linh"
- Khi sua: "Chu 'please' — P bat hoi nhe. Dat tay truoc mieng, noi lai."
- Hay giang van hoa, phep lich su, tai sao cum tu nay quan trong
- Giong co giao piano — calm precision, lam nguoi ta muon hoc tot hon`,
      intro: `KHOI DAU: Doi hoc vien chao truoc. Khi nghe bat ky loi chao, tra loi tu nhien theo phong cach Chi Linh: binh tinh, thanh lich. Hoi chu de hoc ngay sau loi chao. Chi chao MOT LAN duy nhat.`,
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

NGUYEN TAC TRUNG THUC — BAT BUOC:
KHONG bao gio khen gia. Neu hoc vien noi sai, ho BIET ho sai. Khen gia lam mat tin tuong. Trung thuc nhe nhang = tot hon khen gia.

DINH DANG OUTPUT — BAT BUOC:
Chi dung tags [PHRASE] khi GIOI THIEU cum tu MOI LAN DAU. Khong dung tags khi nhac lai, luyen tap, hay noi chung.
[PHRASE]cum tieng Anh[/PHRASE][VN]nghia tieng Viet[/VN]
Chi tag MOT LAN duy nhat khi day lan dau. Khi on lai hay noi cac buoc 2-4, chi viet plain text, KHONG dung tags.

PHUONG PHAP DAY — CHU TRINH MICRO-LESSON (BAT BUOC):
Moi 3 cum tu = 1 chu trinh hoan chinh. Lam theo dung thu tu:

BUOC 1 - DAY (3 cum tu, tung cai mot):
- Noi: "Cum dau tien: [PHRASE]...[/PHRASE][VN]...[/VN]" (chi lan dau day cum nay)
- Demo phat am ro rang, cham
- SAU KHI DEMO PHAT AM, NOI CUM TU MOT LAN RO RANG, CHAM. Sau do DUNG HOAN TOAN.
- KHONG noi them bat ky huong dan nao sau cum tu. Su im lang la tin hieu cho hoc vien noi theo.
- Chi phan hoi SAU KHI hoc vien thu noi.
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
- Dung hoan toan (tren 80% chinh xac): Khen bang tieng Anh nhanh roi di tiep — chi dung: "Excellent!", "Good job!", "Well done!", "You did great!"
  CHI DUNG cac cau khen nay khi phat am RO RANG DUNG. Neu chi tam duoc hoac gan dung, KHONG dung cac cau khen nay.
- Tam duoc (gan dung nhung chua chinh xac): PHAI di kem sua loi — "Nghe duoc, nhung [chi ra cu the am nao sai va huong dan sua]."
  KHONG BAOGIO dung tam duoc nhu standalone praise. LUON kem them mot sua loi cu the.
- Can sua: "Minh cung thu lai nha — *Wel-come* — mieng tron o chu 'come'. One more time."
- Sai nhieu: "Chu nay trick lam — ai moi hoc cung vay. *Water* — Wah-ter. Ban thu?"

PHAN HOI THU LAI — TIENG VIET (3 MUC, BAT BUOC):
Khi hoc vien thu noi lai nhung chua dat:
- Gan dung (phat am gan dung, chi sai nho): "Gần đúng rồi, thử lại nhé!"
- Qua nhe / khong ro (giong too small, mic yeu, khong nghe ro): "To hơn một chút, thử lại nhé!"
- Sai nhieu (sai am chinh, sai cau truc): "Chưa đúng, nghe lại nhé!" ROI lap lai cum tu day du mot lan nua.
CHI dung 3 cau nay cho phan hoi thu lai — khong dung cac cau khac.

TANG DAN MUC DO TRUNG THUC THEO SO LAN THU (BAT BUOC):
Tutor phai theo doi so lan thu (1, 2, 3) va tang dan muc do trung thuc:
- Lan 1 (thu lan dau): Nhe nhang — "Gần đúng rồi, thử lại nhé!" hoac giai thich ngan
- Lan 2 (thu lan 2): Trung thuc hon — chi ra chinh xac am nao sai, huong dan cu the cach sua
- Lan 3 (lan cuoi): Thang than — "Chu nay hoi kho, minh se quay lai sau. Nhung phat am dung la: [correct pronunciation]. Cau tiep nha!"
KHONG bao gio khen neu lan 2 hoac lan 3 van chua dat.

POOL KHEN (XOAY VONG, KHONG LAP LAI):
Tieng Anh — CHI DUNG 4 CAU NAY, KHONG DUNG CAU KHAC, VA CHI KHI PHAT AM THUC SU DUNG (TREN 80% CHINH XAC):
"Excellent!", "Good job!", "Well done!", "You did great!"
Tieng Viet — CHI KHI DI KEM SUA LOI CU THE (KHONG DUNG STANDALONE):
"Nghe duoc, nhung [sua loi]", "Gần đúng, nhưng [sua loi]", "Được rồi, chỉ cần [sua loi] thôi"

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
  "Chu nay hoi kho, minh se quay lai sau. Nhung phat am dung la: [phat am chuan]. Cau tiep nha!"
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

  // ── KHAI MAC: tutor greets first on session start ──
  const greeting = PERSONA_GREETINGS[persona];
  const khaiMac = `KHAI MAC BUOI HOC (chi noi 1 lan dau tien):
Khi hoc vien chao ban (bat ky loi chao nao), NGAY LAP TUC tra loi bang loi chao cua persona + hoi chu de. KHONG noi truoc khi hoc vien noi.`;

  // ── NEW USER vs RETURNING USER ──
  if (isNewUser()) {
    return `${khaiMac}\n\n${base}\n\n${personaIntro}`;
  }

  const profile = getProfile();
  const last = getLastSession();
  const review = getReviewPhrases(3);
  let r = `${khaiMac}\n\n${base}\n\nTHONG TIN HOC VIEN (DA HOC TRUOC):\n- Trinh do: ${profile.cefrLevel}\n- Muc tieu: ${profile.goals || 'chua ro'}\n- So buoi da hoc: ${profile.totalSessions}\n- Tong cum tu da hoc: ${profile.totalPhrases}\n- Chuoi hoc lien tiep: ${profile.streak} ngay`;
  if (last) r += `\n\nBUOI HOC TRUOC:\n- Chu de: ${last.topic}\n- Tom tat: ${last.summary}\n- Ke hoach hom nay: ${last.nextPlan}`;
  if (review.length > 0) {
    r += `\n\nON TAP DAU BUOI:\nBat dau buoi hoc bang cach on lai ${review.length} cum tu cu: ${review.map(p => `"${p.english}" (${p.vietnamese})`).join(', ')}\nHoi hoc vien doc lai tung cum, khen khi ho nho dung.`;
  }
  return r;
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

NGUYEN TAC TRUNG THUC — BAT BUOC:
KHONG bao gio khen gia. Neu hoc vien noi sai, ho BIET ho sai. Khen gia lam mat tin tuong. Trung thuc nhe nhang = tot hon khen gia.
CHI khen 'Excellent/Good job/Well done/You did great' khi phat am RO RANG DUNG (tren 80% chinh xac). Neu chi tam duoc hoac gan dung, KHONG dung cac cau khen nay.

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
- Neu phat am or tra loi chi tam duoc: PHAI di kem sua loi cu the, KHONG dung standalone praise
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

QUY TAC NOI CUM TU KHI DAY (BAT BUOC):
Sau khi noi cum tu moi, noi ro rang MOT LAN DUY NHAT, cham va cu the. Sau do IM LANG HOAN TOAN — cho hoc vien thu. KHONG noi them gi. KHONG lap lai lan thu hai.

PHAN HOI THU LAI — TIENG VIET (3 MUC, BAT BUOC):
Khi hoc vien thu noi lai nhung chua dat:
- Gan dung (phat am gan dung, chi sai nho): "Gần đúng rồi, thử lại nhé!"
- Qua nhe / khong ro: "To hơn một chút, thử lại nhé!"
- Sai nhieu: "Chưa đúng, nghe lại nhé!" + noi lai cum tu day du de hoc vien nghe lai
CHI dung 3 cau nay khi phan hoi thu lai.

TANG DAN MUC DO TRUNG THUC THEO SO LAN THU (BAT BUOC):
Tutor phai theo doi so lan thu (1, 2, 3) va tang dan muc do trung thuc:
- Lan 1 (thu lan dau): Nhe nhang — "Gần đúng rồi, thử lại nhé!" hoac giai thich ngan
- Lan 2 (thu lan 2): Trung thuc hon — chi ra chinh xac am nao sai, huong dan cu the cach sua
- Lan 3 (lan cuoi): Thang than — "Chu nay hoi kho, minh se quay lai sau. Nhung phat am dung la: [correct pronunciation]. Cau tiep nha!"
KHONG bao gio khen neu lan 2 hoac lan 3 van chua dat.

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

  // ── KHAI MAC IELTS: tutor greets first on session start ──
  const greeting = PERSONA_GREETINGS[persona];
  const khaiMacIELTS = `KHAI MAC BUOI HOC (chi noi 1 lan dau tien):
Khi buoi hoc bat dau, NGAY LAP TUC chao hoc vien:
"Chào bạn! ${greeting} Hôm nay mình luyện phần nào — Part 1, 2, hay 3? Hay mình bắt đầu từ đầu?"
Sau do doi hoc vien tra loi. KHONG noi gi them truoc khi hoc vien chon phan.`;

  // For returning users, inject context
  if (!isNewUser()) {
    const profile = getProfile();
    return `${khaiMacIELTS}\n\n${base}\n\nTHONG TIN HOC VIEN:\n- Trinh do: ${profile.cefrLevel}\n- So buoi da hoc: ${profile.totalSessions}\n- Tong cum tu da hoc: ${profile.totalPhrases}`;
  }

  return `${khaiMacIELTS}\n\n${base}\n\nKHOI DAU: Doi hoc vien chao truoc. Khi nghe bat ky loi chao, chao lai tu nhien + hoi trinh do/muc tieu IELTS. Chi chao MOT LAN duy nhat.`;
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
      <PronunciationHint text={phrase.english} reduced={reduced} className="text-center" />
      <motion.p
        className="text-[15px] text-text-secondary mt-3 text-center"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, delay: vnDelay, ease }}
      >
        {phrase.vietnamese}
      </motion.p>
    </motion.div>
  );
};

/** Drum/wheel phrase picker — scrollable iOS-style */
const PhraseWheel = ({ phrases, currentPhrase, reduced = false, voiceName }: { phrases: Phrase[]; currentPhrase: Phrase | null; reduced?: boolean; voiceName: string }) => {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const dragStartY = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const ITEM_HEIGHT = 80;

  // When currentPhrase changes (new phrase taught), auto-scroll to it
  useEffect(() => {
    if (!currentPhrase) return;
    const idx = phrases.findIndex(p => p.english === currentPhrase.english);
    if (idx >= 0) setFocusedIdx(idx);
  }, [currentPhrase, phrases]);

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    isDragging.current = true;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    setDragOffset(e.touches[0].clientY - dragStartY.current);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    const threshold = ITEM_HEIGHT / 3;
    if (dragOffset > threshold) {
      setFocusedIdx(prev => Math.max(0, prev - 1));
    } else if (dragOffset < -threshold) {
      setFocusedIdx(prev => Math.min(phrases.length - 1, prev + 1));
    }
    setDragOffset(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) setFocusedIdx(prev => Math.min(phrases.length - 1, prev + 1));
    else setFocusedIdx(prev => Math.max(0, prev - 1));
  };

  const liveOffset = isDragging.current ? dragOffset : 0;
  const targetY = -focusedIdx * ITEM_HEIGHT + liveOffset;

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ height: ITEM_HEIGHT * 3 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Center highlight slot */}
      <div
        className="absolute inset-x-6 rounded-2xl pointer-events-none z-0"
        style={{ top: ITEM_HEIGHT, height: ITEM_HEIGHT, background: '#f5f5f5', border: '1px solid #ebebeb' }}
      />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{ height: ITEM_HEIGHT, background: 'linear-gradient(to bottom, rgba(255,255,255,1) 40%, transparent)' }} />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{ height: ITEM_HEIGHT, background: 'linear-gradient(to top, rgba(255,255,255,1) 40%, transparent)' }} />

      {/* Items track */}
      <motion.div
        className="absolute w-full"
        style={{ top: ITEM_HEIGHT }}
        animate={{ y: targetY }}
        transition={isDragging.current ? { duration: 0 } : (reduced ? { duration: 0.15 } : { type: 'spring', damping: 32, stiffness: 420 })}
      >
        {phrases.map((p, i) => {
          const isFocused = i === focusedIdx;
          return (
            <div
              key={p.english}
              style={{ height: ITEM_HEIGHT }}
              className="flex flex-col items-center justify-center px-8 cursor-pointer"
              onClick={() => setFocusedIdx(i)}
            >
              <motion.p
                animate={{
                  fontSize: isFocused ? '20px' : '14px',
                  color: isFocused ? '#0a0a0a' : '#c0c0c0',
                  fontWeight: isFocused ? 400 : 300,
                }}
                transition={reduced ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="text-center leading-tight"
              >
                {p.english}
              </motion.p>
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.2 }}
                    className="flex items-center gap-2 mt-1"
                  >
                    <p className="text-[12px] text-text-secondary text-center">{p.vietnamese}</p>
                    <SpeakerButton text={p.english} voiceName={voiceName} playingKey={playingKey} setPlayingKey={setPlayingKey} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </div>
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
const SpeakerButton = ({ text, voiceName, playingKey, setPlayingKey, micActive = false }: {
  text: string; voiceName: string;
  playingKey: string | null; setPlayingKey: (k: string | null) => void;
  micActive?: boolean;
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
      className={`shrink-0 p-1 -m-1 touch-manipulation${micActive ? ' invisible' : ''}`}
    >
      <motion.div animate={isPlaying ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
        transition={isPlaying ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
      >
        <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#0a0a0a]' : 'text-[#b0b0b0]'}`} />
      </motion.div>
    </button>
  );
};

const PhraseList = ({ phrases, currentPhrase, reduced = false, voiceName, micActive = false }: { phrases: Phrase[]; currentPhrase: Phrase | null; reduced?: boolean; voiceName: string; micActive?: boolean }) => {
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
                {isCurrent && <PronunciationHint text={p.english} reduced className="!text-[11px]" />}
                <p className={`mt-0.5 ${isCurrent ? 'text-[14px] text-text-secondary' : 'text-[12px] text-text-muted'}`}>
                  {p.vietnamese}
                </p>
              </div>
              <SpeakerButton text={p.english} voiceName={voiceName} playingKey={playingKey} setPlayingKey={setPlayingKey} micActive={micActive} />
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
                {isCurrent && <PronunciationHint text={p.english} className="!text-[11px]" />}
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
              <SpeakerButton text={p.english} voiceName={voiceName} playingKey={playingKey} setPlayingKey={setPlayingKey} micActive={micActive} />
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
      <p className="text-[13px] text-text-secondary text-center leading-relaxed">
        {text}
      </p>
    );
  }
  return (
    <motion.p variants={blurredContainer} initial="hidden" animate="show" className="text-[13px] text-text-secondary text-center leading-relaxed">
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
                    <PronunciationHint text={p.english} reduced={reduced} className="!text-[10px]" />
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
              <PronunciationHint text={p.english} reduced className="!text-[10px]" />
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

  // Measure header height for dropdown positioning
  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
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
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);
  const [showVoicePicker, setShowVoicePicker] = useState(!getSavedVoice());
  const [showMenu, setShowMenu] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerBottom, setHeaderBottom] = useState(120);
  const [showAccount, setShowAccount] = useState(false);
  const [mode, setMode] = useState<AppMode>(getSavedMode());
  const [currentCueCard, setCurrentCueCard] = useState<string | null>(null);
  const [currentBandScore, setCurrentBandScore] = useState<BandScoreData | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPricingScreen, setShowPricingScreen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showFreeLimit, setShowFreeLimit] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(getRemainingSecondsSync());
  const [showUsageBanner, setShowUsageBanner] = useState(true);
  const sessionStartTimeRef = useRef<number | null>(null);

  // Refresh remaining time every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(getRemainingSecondsSync());
    }, 10_000);
    return () => clearInterval(timer);
  }, []);

  const audioHandlerRef = useRef<AudioHandler | null>(null);
  const sessionRef = useRef<any>(null);
  const greetingAudioRef = useRef<HTMLAudioElement | null>(null);
  const tutorBufferRef = useRef('');
  const sentenceBufferRef = useRef('');
  const displayLengthRef = useRef(0);
  const knownPhrasesRef = useRef<Set<string>>(new Set());

  const voiceName = VOICE_MAP[getSavedVoice() || 'thay-bee'];

  const isRecording = phase === 'lesson';
  const isConnecting = phase === 'connecting';

  const processTutorText = useCallback((newText: string) => {
    tutorBufferRef.current += newText;
    // Hide hint on first tutor speech (means student already spoke)
    setShowHint(false);
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
    if (displayText) {
      setLatestTutorMsg(displayText);
      // Accumulate new display chars into sentence buffer
      const newChunk = displayText.slice(displayLengthRef.current);
      displayLengthRef.current = displayText.length;
      if (newChunk) {
        sentenceBufferRef.current += newChunk;
        // Flush complete sentences
        let buf = sentenceBufferRef.current;
        let flushIdx = -1;
        for (let i = 0; i < buf.length; i++) {
          if (buf[i] === '.' || buf[i] === '!' || buf[i] === '?' || buf[i] === '\n') {
            flushIdx = i;
          }
        }
        if (flushIdx >= 0) {
          const complete = buf.slice(0, flushIdx + 1).trim();
          sentenceBufferRef.current = buf.slice(flushIdx + 1).trimStart();
          if (complete) setTranscriptLines(prev => [...prev, complete]);
        }
      }
    }
  }, []);

  const finalizeTutorTurn = useCallback(() => {
    const buf = tutorBufferRef.current;
    if (buf) {
      const { displayText } = parseAIOutput(buf);
      if (displayText) {
        setLatestTutorMsg(displayText);
        setAllTutorMessages(prev => [...prev, displayText]);
        // Flush any remaining sentence buffer on turn complete
        const remaining = (sentenceBufferRef.current + displayText.slice(displayLengthRef.current)).trim();
        if (remaining) setTranscriptLines(prev => [...prev, remaining]);
      }
    }
    tutorBufferRef.current = '';
    sentenceBufferRef.current = '';
    displayLengthRef.current = 0;
  }, []);

  const runPostSessionAnalysis = useCallback(async (ph: Phrase[], msgs: string[]) => {
    setIsAnalyzing(true);
    try { const r = await analyzeSession(ph, msgs, sessionTopic, session.access_token, mode); if (r?.nextPlan) setNextPlan(r.nextPlan); }
    catch (e) { console.error('Post-session analysis failed:', e); }
    finally { setIsAnalyzing(false); }
  }, [sessionTopic, session.access_token, mode]);

  const startSession = async () => {
    if (phase === 'connecting' || phase === 'lesson') return; // prevent double-click

    // Check subscription first
    if (!checkCanStartSession()) {
      // If they have no subscription, show paywall
      if (!getSubscription().isPremium) {
        // Check if it's a time limit issue
        if (!canStartFreeSession()) {
          setShowFreeLimit(true);
          return;
        }
        setShowPaywall(true);
        return;
      }
      setShowPaywall(true);
      return;
    }
    // Free tier time check
    if (!getSubscription().isPremium && !canStartFreeSession()) {
      setShowFreeLimit(true);
      return;
    }

    // Track session start time
    sessionStartTimeRef.current = Date.now();

    // ── Instant feedback: haptic + visual + greeting audio ──
    navigator.vibrate?.([50]);
    setPhase('connecting'); setErrorMsg(null); setLatestTutorMsg(''); setCurrentPhrase(null); setShowHint(true);

    // No pre-recorded greeting — AI greets after student says hello (KHAI MAC rule)
    greetingAudioRef.current?.pause();
    greetingAudioRef.current = null;

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
      setLearnedPhrases([]); setNextPlan(''); setSessionTopic(''); setAllTutorMessages([]); setTranscriptLines([]);
      setCurrentCueCard(null); setCurrentBandScore(null);
      knownPhrasesRef.current.clear(); tutorBufferRef.current = ''; sentenceBufferRef.current = ''; displayLengthRef.current = 0;

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

  const endSession = () => {
    if (phase !== 'lesson' && phase !== 'connecting') return;
    // Track usage time
    if (sessionStartTimeRef.current && !getSubscription().isPremium) {
      const elapsed = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);
      sessionStartTimeRef.current = null;
      const userId = session.user.id;
      addUsageSeconds(elapsed, userId).then(() => {
        setRemainingSeconds(getRemainingSecondsSync());
      });
    } else {
      sessionStartTimeRef.current = null;
    }
    cleanup();
    setPhase('session-end');
    runPostSessionAnalysis(learnedPhrases, allTutorMessages);
  };
  const toggleSession = () => { setErrorMsg(null); if (isRecording) endSession(); else startSession(); };

  // ── Render ──
  return (
    <div className="min-h-screen bg-bg text-text flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative overflow-hidden bg-bg">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="pt-14 pb-5 px-6 text-center z-10 relative"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >

          <h1 className="text-[20px] font-bold tracking-tight text-text flex items-center justify-center gap-1.5" style={{ fontFamily: "'Comfortaa', sans-serif" }}>
            <button
              onClick={() => setShowMenu(prev => !prev)}
              className="relative w-5 h-5 flex items-center justify-center text-text-muted hover:text-text transition-colors"
              title="Menu"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {showMenu ? (
                  <motion.span
                    key="x"
                    className="absolute"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    className="absolute"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
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
                isLockedVoice={() => false}
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

                        {/* Free tier usage banner */}
                        {!getSubscription().isPremium && showUsageBanner && (
                          <AnimatePresence>
                            <UsageBanner
                              remainingSeconds={remainingSeconds}
                              onUpgrade={() => setShowPaywall(true)}
                              onDismiss={() => setShowUsageBanner(false)}
                              className="mt-4 w-full"
                            />
                          </AnimatePresence>
                        )}
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

                {/* Tutor transcript — shows most recent complete sentence */}
                {phase === 'lesson' && transcriptLines.length > 0 && (
                  <div className="mb-4 max-w-full">
                    <TutorSpeech lines={transcriptLines} />
                  </div>
                )}
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
                  {isRecording && showHint && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-3 text-[13px] text-[#8a8a8a] text-center italic"
                    >
                      {PERSONA_HINTS[getSavedVoice() || 'thay-bee']}
                    </motion.p>
                  )}
                </AnimatePresence>

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
        open={showMenu}
        onClose={() => setShowMenu(false)}
        onChangeVoice={() => { setShowMenu(false); setShowVoicePicker(true); }}
        onSetMode={(m) => { setMode(m); saveMode(m); setShowMenu(false); }}
        onShowProgress={() => { setPhase('summary'); setShowMenu(false); }}
        onEndSession={() => { endSession(); setShowMenu(false); }}
        onSignOut={() => supabase.auth.signOut()}
        onShowAccount={() => { setShowAccount(true); setShowMenu(false); }}
        isInLesson={phase === 'lesson'}
        headerBottom={headerBottom}
      />

      <AnimatePresence>
        {showPaywall && (
          <PaywallScreen
            onViewPlans={() => setShowPricingScreen(true)}
            onRestore={async () => { await setPremium(true); setShowPaywall(false); setRemainingSeconds(getRemainingSecondsSync()); }}
            onClose={() => setShowPaywall(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPricingScreen && (
          <PricingScreen
            onSubscribe={async (_plan) => { await setPremium(true); setShowPricingScreen(false); setShowPaywall(false); setRemainingSeconds(getRemainingSecondsSync()); }}
            onRestore={async () => { await setPremium(true); setShowPricingScreen(false); setShowPaywall(false); setRemainingSeconds(getRemainingSecondsSync()); }}
            onClose={() => setShowPricingScreen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAccount && (
          <AccountScreen
            session={session}
            onClose={() => setShowAccount(false)}
            onUpgrade={() => { setShowPaywall(true); setShowAccount(false); }}
            onSignOut={() => supabase.auth.signOut()}
            remainingSeconds={remainingSeconds}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFreeLimit && (
          <FreeLimitDialog
            onUpgrade={() => { setShowFreeLimit(false); setShowPaywall(true); }}
            onClose={() => setShowFreeLimit(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
