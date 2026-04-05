import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Copy, Check, ArrowLeft, Loader2, UserCircle, Menu, ChevronDown, Lock, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioHandler } from './lib/audio';
import { speakPhrase, stopTTS, setTTSAuthToken } from './lib/tts';
import { type Phrase, isNewUser, getProfile, getLastSession, getReviewPhrases, loadPhraseBank } from './lib/profile';
import { analyzeSession } from './lib/curriculum';
import { supabase } from './lib/supabase';
import { syncProfileFromSupabase, saveVoicePreference } from './lib/profile';
import { getMainCurriculum, getActiveSideQuest, getCurrentLesson, getModuleForLesson, getLessonProgress, generateCurriculum, type Curriculum } from './lib/curriculum-path';
import { CAREER_PATHS } from './lib/career-paths';
import { transitions, ease, getFadeUp, getPhaseVariants, getTransitions, usePrefersReducedMotion } from './lib/motion';
import LoginScreen from './components/LoginScreen';
import ProgressScreen from './components/ProgressScreen';
import FeedbackModal from './components/FeedbackModal';
import AdminScreen from './components/AdminScreen';

// ── Account Screen ───────────────────────────────────────────
function AccountScreen({ session, onClose, onUpgrade, onSignOut, onDeleteAccount, remainingSeconds }: {
  session: Session;
  onClose: () => void;
  onUpgrade: () => void;
  onSignOut: () => void;
  onDeleteAccount: () => void;
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
        <button
          onClick={onDeleteAccount}
          className="w-full py-3 text-[13px] text-[#b0b0b0] hover:text-red-500 transition-colors"
        >
          Xóa tài khoản
        </button>
      </div>
    </motion.div>
  );
}
import MicOrb from './components/MicOrb';
import VoicePicker, { type Persona, VOICE_MAP, VOICES, getSavedVoice } from './components/VoicePicker';
import CueCard from './components/CueCard';
import BandScore, { type BandScoreData } from './components/BandScore';
import CommandPalette from './components/CommandPalette';
import PaywallScreen from './components/PaywallScreen';
import PricingScreen from './components/PricingScreen';
import { checkCanStartSession, incrementSessionCount, setPremium, getSubscription, isPremiumVoice, isPremiumMode } from './lib/subscription';
import { initRevenueCat, identifyUser, logOutRevenueCat, purchasePremium, restorePurchases, presentNativePaywall } from './lib/revenuecat';
import { getRemainingSecondsSync, addUsageSeconds, canStartFreeSession, FREE_SECONDS } from './lib/usage';
import PronunciationHint from './components/PronunciationHint';
import UsageBanner from './components/UsageBanner';
import FreeLimitDialog from './components/FreeLimitDialog';
import TutorSpeech from './components/TutorSpeech';
import type { Session } from '@supabase/supabase-js';

// ── Types ────────────────────────────────────────────────────
type Phase = 'idle' | 'connecting' | 'lesson' | 'session-end' | 'summary' | 'progress';
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

  const personaBlocks: Record<Persona, { style: string }> = {
    'thay-bee': {
      style: `PHONG CÁCH — THẦY BEE:
- Ấm áp, bình tĩnh, tự tin nhưng không hào nhoáng
- Xưng "mình" hoặc "Thầy Bee"
- Nói CHẬM và RÕ RÀNG — không vội
- Tiếng Việt là CHÍNH. Chỉ dùng tiếng Anh khi DẠY cụm từ hoặc khen ngắn
- Không mix tiếng Anh quá nhiều — học viên A1 sẽ không hiểu
- Khi sửa: "Chưa đúng lắm — nghe mình nha: [cụm từ]. Chữ [âm] kéo dài hơn. Thử lại nha."
- Kiên nhẫn, không bao giờ làm học viên thấy ngốc`,
    },
    'co-honey': {
      style: `PHONG CÁCH — CÔ HONEY:
- Ấm áp, thực tế, kinh nghiệm salon thực
- Xưng "mình" hoặc "Cô Honey"
- Khi sửa: "Gần rồi — nhưng khách sẽ không hiểu đâu. Nghe mình nha—"
- Hay dùng ví dụ từ salon, tiếp khách, giao tiếp công việc thực
- Giống chị em làm nail 10 năm ở Mỹ, biết chính xác học viên cần gì`,
    },
    'anh-max': {
      style: `PHONG CÁCH — ANH MAX:
- Năng lượng cao, hype, game energy
- Xưng "mình" hoặc "Anh Max"
- Khi sửa: "Close! Nói lại nhanh hơn đi — speed round! Go!"
- Hay tạo mini challenges, speed rounds, cạnh tranh vui
- Giọng Gen Z, mọi thứ là game`,
    },
    'chi-linh': {
      style: `PHONG CÁCH — CHỊ LINH:
- Bình tĩnh, chính xác, thanh lịch
- Xưng "mình" hoặc "Chị Linh"
- Khi sửa: "Chữ 'please' — P bật hơi nhẹ. Đặt tay trước miệng, nói lại."
- Hay giảng văn hóa, phép lịch sự, tại sao cụm từ này quan trọng
- Giọng cô giáo piano — calm precision`,
    },
  };

  const { style: personaStyle } = personaBlocks[persona];

  const base = `Bạn là gia sư tiếng Anh EasyBee — chuyên dạy người Việt nói tiếng Anh tự tin.

NGUYÊN TẮC CƠ BẢN:
- Nói chuyện bằng tiếng Việt là chính
- KHÔNG BAO GIỜ nói một câu tiếng Anh dài. Chỉ dạy từng cụm ngắn 2-5 từ mỗi lần
- Giữ câu trả lời RẤT NGẮN — 1-2 câu thôi
- Dùng "mình", "bạn" để tạo cảm giác gần gũi
- Không dùng dấu hoa thị hay ký tự đặc biệt trong câu nói

ĐỊNH DẠNG OUTPUT — BẮT BUỘC:
Chỉ dùng tags [PHRASE] khi GIỚI THIỆU cụm từ MỚI LẦN ĐẦU:
[PHRASE]cụm tiếng Anh[/PHRASE][VN]nghĩa tiếng Việt[/VN]
Chỉ tag MỘT LẦN duy nhất khi dạy lần đầu. Khi ôn lại hay nói các bước 2-4, chỉ viết plain text, KHÔNG dùng tags.

PHƯƠNG PHÁP DẠY — CHU TRÌNH MICRO-LESSON (BẮT BUỘC):
Mỗi 3 cụm từ = 1 chu trình hoàn chỉnh. Làm theo đúng thứ tự:

BƯỚC 1 - DẠY (3 cụm từ, từng cái một):
- Giới thiệu: "[PHRASE]...[/PHRASE][VN]...[/VN]"
- Demo phát âm rõ ràng, chậm — nói cụm từ MỘT LẦN rõ ràng. Câu tiếp theo phải là lời của học viên, không phải của bạn
- Sau khi nói cụm từ, chờ học viên phản hồi. Không nói thêm gì
- Chỉ phản hồi SAU KHI học viên thử nói
- Tối đa 3 lần thử, rồi đi tiếp
- Làm tương tự cho cụm 2 và 3

BƯỚC 2 - NÓI LIÊN:
- "OK, giờ nói 3 câu liên nha. Mình nói trước..."
- Demo cả 3 câu liên tiếp tự nhiên
- Học viên nói lại cả 3
- Sửa nhịp điệu và sự tự nhiên

BƯỚC 3 - KỊCH BẢN (ROLE-PLAY):
- "Giờ mình đóng vai khách nha. Mình bước vào tiệm..."
- Mình (tutor) đóng vai khách/người đối diện
- Học viên phải dùng 3 cụm từ đã học để trả lời
- Có thể hỏi thêm câu bất ngờ: "Actually, can I also get..."
- Đây là bước QUAN TRỌNG NHẤT — học viên dùng trong tình huống thực

BƯỚC 4 - NGHỈ + GHI CHÚ:
- Hỏi: "Muốn học thêm 3 cụm nữa không? Hay nghỉ đây?"
- Nếu học tiếp: bắt đầu chu trình mới với 3 cụm tiếp theo

PHẢN HỒI KHI HỌC VIÊN THỬ NÓI — QUY TẮC DUY NHẤT:
Không bao giờ khen giả. Học viên biết họ nói sai. Khen giả làm mất tin tưởng.

Đánh giá theo 3 mức:
- ĐÚNG (trên 80% chính xác): Khen ngắn bằng tiếng Anh rồi đi tiếp. CHỈ dùng: "Excellent!", "Good job!", "Well done!", "You did great!" — xoay vòng, không lặp lại
- GẦN ĐÚNG (phát âm gần đúng, chỉ sai nhỏ): "Gần đúng rồi, thử lại nhé!" + gợi ý âm cụ thể nếu cần
- SAI (sai âm chính, không rõ): "Chưa đúng, nghe lại nhé!" + nói lại cụm từ một lần rõ ràng

Theo dõi số lần thử và tăng dần mức độ thẳng thắn:
- Lần 1: Nhẹ nhàng — "Gần đúng rồi, thử lại nhé!"
- Lần 2: Chỉ ra chính xác âm nào sai và cách sửa cụ thể
- Lần 3: Thẳng thắn — "Chữ này hơi khó, mình sẽ quay lại sau. Phát âm đúng là [phát âm chuẩn]. Câu tiếp nha!"

PHÁT ÂM — NGHIÊM TÚC:
- KHÔNG BAO GIỜ bỏ qua lỗi phát âm
- Mô tả âm thanh vật lý: "Miệng tròn hơn", "Lưỡi cong lên", "Bật hơi nhẹ", "Kéo dài âm"
- Dùng cầu nối phonetic Việt: "Water = Woa-tờ, không phải Woh-to"
- Dùng chữ "trick" thay cho "khó": "Chữ này trick lắm" — reframe khó khăn thành thú vị

SỬA LỖI NGỮ PHÁP:
Khi học viên nói sai ngữ pháp, PHẢI giải thích nguyên nhân:
1. Xác nhận gần đúng: "Gần đúng rồi!"
2. Chỉ ra lỗi cụ thể bằng tiếng Việt
3. Giải thích quy tắc ngắn gọn bằng tiếng Việt
4. Nói câu đúng
5. Cho học viên nói lại

Ví dụ: "She go to school" → "Gần đúng! Nhưng 'she' là một người, nên phải thêm 's' — She GOES to school. Quy tắc: he/she/it + động từ thêm s."

TÍNH CÁCH EASYBEE:
Tự tin, năng động, thông minh, ấm áp, trendy. Code-switch tự nhiên, hiện đại, không sách giáo khoa.
KHÔNG: Giả tạo, khinh thường, chung chung, nhàm chán, máy móc, quá trang trọng.

KHÔNG BAO GIỜ:
- Nói một đoạn dài bằng tiếng Anh
- Sửa nhiều lỗi cùng lúc
- Giả định học viên hiểu tiếng Anh
- Quên dùng [PHRASE][/PHRASE][VN][/VN] tags khi giới thiệu cụm mới
- Dùng dấu hoa thị hoặc ký tự đặc biệt

${personaStyle}`;

  const khaiMac = `KHỞI ĐẦU: Đợi học viên chào trước. Khi nghe lời chào, trả lời đúng MỘT LẦN theo phong cách persona rồi hỏi chủ đề. Không nói trước khi học viên nói.`;

  if (isNewUser()) {
    return `${khaiMac}\n\n${base}`;
  }

  const profile = getProfile();
  const last = getLastSession();
  const review = getReviewPhrases(3);
  let r = `${khaiMac}\n\n${base}\n\nTHÔNG TIN HỌC VIÊN:\n- Trình độ: ${profile.cefrLevel}\n- Mục tiêu: ${profile.goals || 'chưa rõ'}\n- Số buổi đã học: ${profile.totalSessions}\n- Tổng cụm từ đã học: ${profile.totalPhrases}\n- Chuỗi học liên tiếp: ${profile.streak} ngày`;
  if (last) r += `\n\nBUỔI HỌC TRƯỚC:\n- Chủ đề: ${last.topic}\n- Tóm tắt: ${last.summary}\n- Kế hoạch hôm nay: ${last.nextPlan}`;
  if (review.length > 0) {
    r += `\n\nÔN TẬP ĐẦU BUỔI:\nBắt đầu bằng cách ôn lại ${review.length} cụm từ cũ: ${review.map(p => `"${p.english}" (${p.vietnamese})`).join(', ')}\nHỏi học viên đọc lại từng cụm, khen khi họ nhớ đúng.`;
  }
  // Curriculum context
  const sideQuest = getActiveSideQuest();
  const mainCurr = getMainCurriculum();
  const activeCurr = sideQuest ?? mainCurr; // prioritize side quest
  if (activeCurr) {
    const lesson = getCurrentLesson(activeCurr);
    const mod = lesson ? getModuleForLesson(activeCurr, lesson.id) : null;
    if (lesson && mod) {
      r += `\n\nBÀI HỌC HÔM NAY (TỪ GIÁO TRÌNH${sideQuest ? ' — NHIỆM VỤ PHỤ' : ''}):`;
      r += `\n- Lộ trình: ${activeCurr.emoji} ${activeCurr.titleEn}`;
      r += `\n- Module: ${mod.titleEn} (${mod.title})`;
      r += `\n- Bài: ${lesson.titleEn} (${lesson.title})`;
      r += `\n- Mục tiêu: ${lesson.objectives}`;
      r += `\nDạy 3 cụm từ liên quan đến bài học này. Nhưng nếu học viên muốn học cái gì khác, LINH HOẠT chuyển theo. Không ép họ học theo giáo trình.`;
    }
  }

  r += `\n\nLỜI CHÀO TRỞ LẠI (BẮT BUỘC):\nKhi học viên chào, PHẢI:\n1. Chào lại bằng tên tutor ("Chào bạn! Thầy Bee đây.")\n2. Nhắc lại buổi học trước nếu có: "Buổi trước mình học về ${last?.topic || 'tiếng Anh cơ bản'} rồi nha."\n3. Gợi ý 2-3 chủ đề cụ thể: "Hôm nay bạn muốn học về làm nail, đi mua sắm, hay chủ đề khác?"\nKhông được chỉ nói "Hôm nay bạn muốn học gì?" — phải gợi ý chủ đề cụ thể.`;
  return r;
}



// ── IELTS System Instruction Builder ───────────────────────
function buildIELTSInstruction(persona: Persona = 'thay-bee'): string {
  const ieltsPersona: Record<Persona, string> = {
    'thay-bee': `PHONG CÁCH — THẦY BEE IELTS:
- Thẳng thắn, code-switch Việt-Anh. "Nah, that's Band 5. Here's why—"
- Xưng "mình" hoặc "Thầy Bee"
- Chấm điểm thẳng thắn nhưng không làm học viên nản chí`,
    'co-honey': `PHONG CÁCH — CÔ HONEY IELTS:
- Động viên, cho nhiều ví dụ. "Gần 6 rồi — thử thêm linking words nha"
- Xưng "mình" hoặc "Cô Honey"
- Luôn khuyến khích và chỉ ra cách tăng band cụ thể`,
    'anh-max': `PHONG CÁCH — ANH MAX IELTS:
- Challenge mode, high energy. "OK speed round — Part 1, 4 questions, no stopping!"
- Xưng "mình" hoặc "Anh Max"
- Tạo áp lực thi thật để học viên quen`,
    'chi-linh': `PHONG CÁCH — CHỊ LINH IELTS:
- Precision focus. Phân tích lỗi grammar chi tiết, từ từ.
- Xưng "mình" hoặc "Chị Linh"
- Chia nhỏ từng lỗi và giải thích cẩn thận`,
  };

  const base = `Bạn là IELTS Speaking Examiner-Coach của EasyBee. Bạn vừa là người chấm thi, vừa là người hướng dẫn.

NGUYÊN TẮC TRUNG THỰC:
Không bao giờ khen giả. Chỉ khen "Excellent/Good job/Well done/You did great" khi câu trả lời thực sự tốt (trên 80%). Nếu chỉ tạm được, PHẢI đi kèm sửa lỗi cụ thể.

PHẢN HỒI KHI HỌC VIÊN THỬ NÓI:
- ĐÚNG (trên 80%): Khen ngắn rồi đi tiếp
- GẦN ĐÚNG: "Gần đúng rồi, thử lại nhé!" + gợi ý cụ thể
- SAI: "Chưa đúng, nghe lại nhé!" + nói lại cụm từ một lần rõ ràng
Lần 1 nhẹ nhàng → Lần 2 chỉ ra âm sai cụ thể → Lần 3 thẳng thắn + chuyển tiếp

CÁCH LÀM VIỆC — CHU TRÌNH 4 BƯỚC:

BƯỚC 1 - THI THỬ (SIMULATE):
- Hỏi câu hỏi IELTS thật (Part 1, 2, hoặc 3 tùy theo level)
- KHÔNG gợi ý, KHÔNG giúp — để học viên tự trả lời
- Nghe hết câu trả lời trước khi phản hồi
- Giọng như examiner thật: lịch sự, trung lập, chuyên nghiệp

BƯỚC 2 - CHẤM ĐIỂM (SCORE):
- Đánh giá bằng 4 tiêu chí IELTS: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation
- Cho band tương ứng: "Câu trả lời này khoảng Band 5.5"
- Giải thích CỤ THỂ: "Bạn dùng 'good' 3 lần — Band 7 cần từ đa dạng hơn"
- OUTPUT BAND SCORE: [BAND]5.5[/BAND][FC]5[/FC][LR]6[/LR][GRA]5[/GRA][P]6[/P]

BƯỚC 3 - HƯỚNG DẪN (COACH):
- Dạy KỸ THUẬT trả lời, không chỉ từ vựng
- Part 1: Trả lời 2-3 câu. Ý kiến + lý do + ví dụ
- Part 2: Mở bài + 3 ý chính + kết luận. Dùng linking words
- Part 3: Ý kiến + giải thích + ví dụ cụ thể + so sánh
- Dạy cụm từ nâng band: [PHRASE]It largely depends on...[/PHRASE][VN]Phụ thuộc phần lớn vào...[/VN]
- Khi nói cụm từ mới: nói MỘT LẦN rõ ràng. Câu tiếp theo phải là lời của học viên

BƯỚC 4 - THỬ LẠI (RETRY):
- Hỏi lại CÙNG câu hỏi đó
- So sánh lần 1 và lần 2: "Lần này tốt hơn! Từ Band 5.5 lên khoảng 6.0"
- Sau đó chuyển sang câu hỏi mới

FORMAT BUỔI HỌC:
- Bắt đầu bằng Part 1 (dễ) — 3-4 câu hỏi
- Nếu học viên khá: chuyển sang Part 2 (cue card)
- Part 3 chỉ khi học viên ở mức B1+

PART 2 ĐẶC BIỆT:
- Đọc cue card dùng format:
[CUECARD]
Describe a place you like to visit.
You should say:
- where it is
- how often you go there
- what you do there
and explain why you like it.
[/CUECARD]
- Cho 1 phút suy nghĩ: "Bạn có 1 phút để chuẩn bị. Khi sẵn sàng thì nói nha."

${ieltsPersona[persona]}`;

  const khaiMac = `KHỞI ĐẦU: Đợi học viên chào trước. Khi nghe lời chào, trả lời một lần theo phong cách persona rồi hỏi phần luyện tập. Không nói trước khi học viên nói.`;
  return `${khaiMac}\n\n${base}`;
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
      <AnimatePresence mode="sync">
        {phrases.map((p) => {
          const isCurrent = currentPhrase?.english === p.english;
          return (
            <motion.div
              key={p.english}
              variants={phraseItemVariants}
              initial="hidden"
              animate="show"
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
  phrases, isAnalyzing, nextPlan, onViewNotes, onNewSession, onShowProgress, onChangeVoice, onFeedback, reduced, voiceName,
}: {
  phrases: Phrase[]; isAnalyzing: boolean; nextPlan: string;
  onViewNotes: () => void; onNewSession: () => void; onShowProgress: () => void; onChangeVoice: () => void; onFeedback: () => void; reduced: boolean; voiceName: string;
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

      {/* Session summary lines */}
      {(() => {
        const savedVoice = getSavedVoice() || 'thay-bee';
        const voiceInfo = VOICES.find(v => v.id === savedVoice);
        const mainCurr = getMainCurriculum();
        const sideQuest = getActiveSideQuest();
        const allPhrases = loadPhraseBank();
        const mainCount = mainCurr ? allPhrases.filter(p => p.careerPathId === mainCurr.careerPathId).length : 0;
        const mainTarget = mainCurr?.careerPathId ? (CAREER_PATHS.find(cp => cp.id === mainCurr.careerPathId)?.targetPhraseCount ?? 0) : 0;

        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.2, ease }}
            className="mb-6 space-y-2"
          >
            <p className="text-[14px] text-text">
              Hôm nay bạn học được <span className="font-semibold">{phrases.length} cụm từ</span> mới
            </p>
            <p className="text-[13px] text-text-secondary">
              🔥 {profile.streak || 1} ngày liên tiếp · Trình độ {profile.cefrLevel}
            </p>

            {mainCurr && (
              <p className="text-[13px] text-text-secondary">
                {mainCurr.emoji} {mainCurr.titleEn} — {mainCount}/{mainTarget} cụm từ
              </p>
            )}
            {sideQuest && (
              <p className="text-[13px] text-text-secondary">
                {sideQuest.emoji} Nhiệm vụ phụ: {sideQuest.titleEn}
              </p>
            )}

            <p className="text-[13px] text-text-secondary">
              {voiceInfo ? `${voiceInfo.emoji} Giáo viên: ${voiceInfo.name}` : '🎓 Giáo viên: Thầy Bee'}
            </p>
            <button
              onClick={onFeedback}
              className="text-[13px] text-text-secondary hover:text-text transition-colors"
            >
              💬 Góp ý cho EasyBee
            </button>

            <div className="flex items-center gap-4 pt-2">
              <button onClick={onShowProgress} className="text-[13px] text-text-secondary hover:text-text transition-colors underline">
                Tiến trình
              </button>
              <button onClick={onChangeVoice} className="text-[13px] text-text-secondary hover:text-text transition-colors underline">
                Đổi giáo viên
              </button>
            </div>
          </motion.div>
        );
      })()}

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
  const [curriculum, setCurriculum] = useState<Curriculum | null>(() => getActiveSideQuest() ?? getMainCurriculum());
  const [isGeneratingCurriculum, setIsGeneratingCurriculum] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const isAdmin = session.user.email === 'henrypham0310@gmail.com';

  // Initialize RevenueCat on mount
  useEffect(() => {
    initRevenueCat(session.user.id);
    identifyUser(session.user.id);
  }, [session.user.id]);

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
    if (!buf) return; // Guard against double-fire
    const { displayText } = parseAIOutput(buf);
    if (displayText) {
      setLatestTutorMsg(displayText);
      setAllTutorMessages(prev => [...prev, displayText]);
      // Only flush remaining buffer — don't re-add already-flushed sentences
      const remaining = sentenceBufferRef.current.trim();
      if (remaining) setTranscriptLines(prev => [...prev, remaining]);
    }
    tutorBufferRef.current = '';
    sentenceBufferRef.current = '';
    displayLengthRef.current = 0;
  }, []);

  const runPostSessionAnalysis = useCallback(async (ph: Phrase[], msgs: string[], durationSeconds?: number) => {
    setIsAnalyzing(true);
    const voice = getSavedVoice() || 'thay-bee';
    try {
      const r = await analyzeSession(ph, msgs, sessionTopic, session.access_token, mode, voice, durationSeconds);
      if (r?.nextPlan) setNextPlan(r.nextPlan);
      // Refresh curriculum state (may have advanced lesson or created side quest)
      setCurriculum(getActiveSideQuest() ?? getMainCurriculum());
    }
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
    // Compute duration for all sessions
    const durationSeconds = sessionStartTimeRef.current
      ? Math.round((Date.now() - sessionStartTimeRef.current) / 1000)
      : undefined;
    // Track usage time for free tier
    if (sessionStartTimeRef.current && !getSubscription().isPremium) {
      sessionStartTimeRef.current = null;
      const userId = session.user.id;
      addUsageSeconds(durationSeconds!, userId).then(() => {
        setRemainingSeconds(getRemainingSecondsSync());
      });
    } else {
      sessionStartTimeRef.current = null;
    }
    cleanup();
    setPhase('session-end');
    runPostSessionAnalysis(learnedPhrases, allTutorMessages, durationSeconds);
  };
  const toggleSession = () => {
    setErrorMsg(null);
    if (isRecording) {
      // Confirm before ending to prevent accidental taps
      if (window.confirm('Kết thúc buổi học?')) endSession();
    } else {
      startSession();
    }
  };

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
                onViewNotes={() => setPhase('summary')} onNewSession={() => startSession()}
                onShowProgress={() => setPhase('progress')} onChangeVoice={() => setShowVoicePicker(true)}
                onFeedback={() => setShowFeedback(true)}
                reduced={reduced} voiceName={voiceName} />
            </motion.div>
          ) : phase === 'summary' ? (
            <motion.div key="summary" variants={pv} initial="enter" animate="center" exit="exit" transition={reduced ? { duration: 0 } : transitions.normal} className="flex-1 flex flex-col">
              <SummaryView phrases={learnedPhrases} onBack={() => setPhase('session-end')} voiceName={voiceName} />
            </motion.div>
          ) : phase === 'progress' ? (
            <motion.div key="progress" variants={pv} initial="enter" animate="center" exit="exit" transition={reduced ? { duration: 0 } : transitions.normal} className="flex-1 flex flex-col">
              <ProgressScreen onBack={() => setPhase('idle')} />
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

                        {/* Curriculum: current lesson or path picker */}
                        {curriculum && getCurrentLesson(curriculum) ? (
                          <motion.button
                            onClick={() => setPhase('progress')}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4, ease }}
                            className="w-full text-left rounded-xl p-4 bg-surface border border-accent mb-4"
                          >
                            <p className="text-[11px] text-text-secondary font-semibold tracking-[0.1em] uppercase mb-1">
                              {curriculum.emoji} {curriculum.titleEn} — {getLessonProgress(curriculum).completed}/{getLessonProgress(curriculum).total} bài
                            </p>
                            <p className="text-[14px] text-text font-medium">
                              {getCurrentLesson(curriculum)!.titleEn}
                            </p>
                            <p className="text-[12px] text-text-secondary mt-0.5">
                              {getCurrentLesson(curriculum)!.objectives}
                            </p>
                          </motion.button>
                        ) : curriculum?.completedAt ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center mb-4"
                          >
                            <p className="text-[14px] text-text font-medium mb-1">{curriculum.emoji} Hoàn thành lộ trình!</p>
                            <button
                              onClick={() => { setCurriculum(null); }}
                              className="text-[12px] text-text-secondary underline"
                            >
                              Chọn lộ trình mới
                            </button>
                          </motion.div>
                        ) : !curriculum && !isNewUser() ? (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4, ease }}
                            className="w-full mb-4"
                          >
                            <p className="text-[12px] text-text-secondary font-semibold tracking-[0.1em] uppercase mb-2 text-center">
                              Chọn lộ trình
                            </p>
                            {isGeneratingCurriculum ? (
                              <div className="flex items-center justify-center gap-2 py-4">
                                <Loader2 className="w-4 h-4 animate-spin text-text-secondary" />
                                <span className="text-[13px] text-text-secondary">Đang tạo lộ trình...</span>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-2">
                                {CAREER_PATHS.map(path => (
                                  <button
                                    key={path.id}
                                    onClick={async () => {
                                      setIsGeneratingCurriculum(true);
                                      try {
                                        const c = await generateCurriculum(path.id, session.access_token);
                                        setCurriculum(c);
                                      } catch (e) { console.error('Curriculum generation failed:', e); }
                                      finally { setIsGeneratingCurriculum(false); }
                                    }}
                                    className="text-left rounded-xl p-3 bg-surface border border-border hover:border-accent transition-colors"
                                  >
                                    <span className="text-lg">{path.emoji}</span>
                                    <p className="text-[13px] text-text font-medium mt-1">{path.titleEn}</p>
                                    <p className="text-[11px] text-text-secondary">{path.description}</p>
                                  </button>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <p className="text-center text-[13px] text-text-secondary max-w-[260px] leading-relaxed">
                            {isNewUser()
                              ? 'Nhấn vào micro để bắt đầu'
                              : `Chào mừng bạn quay lại! Bạn đã học ${getProfile().totalPhrases} cụm từ.`}
                          </p>
                        )}

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
        onShowProgress={() => { setPhase('progress'); setShowMenu(false); }}
        onEndSession={() => { endSession(); setShowMenu(false); }}
        onSignOut={() => { logOutRevenueCat(); supabase.auth.signOut(); }}
        onShowAccount={() => { setShowAccount(true); setShowMenu(false); }}
        onFeedback={() => { setShowFeedback(true); setShowMenu(false); }}
        onShowAdmin={isAdmin ? () => { setShowAdmin(true); setShowMenu(false); } : undefined}
        isInLesson={phase === 'lesson'}
        isAdmin={isAdmin}
        headerBottom={headerBottom}
      />

      <AnimatePresence>
        {showPaywall && (
          <PaywallScreen
            onViewPlans={() => setShowPricingScreen(true)}
            onRestore={async () => { const ok = await restorePurchases(); if (ok) { setShowPaywall(false); setRemainingSeconds(getRemainingSecondsSync()); } }}
            onClose={() => setShowPaywall(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPricingScreen && (
          <PricingScreen
            onSubscribe={async (_plan) => { const ok = await purchasePremium(); if (ok) { setShowPricingScreen(false); setShowPaywall(false); setRemainingSeconds(getRemainingSecondsSync()); } }}
            onRestore={async () => { const ok = await restorePurchases(); if (ok) { setShowPricingScreen(false); setShowPaywall(false); setRemainingSeconds(getRemainingSecondsSync()); } }}
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
            onSignOut={() => { logOutRevenueCat(); supabase.auth.signOut(); }}
            onDeleteAccount={async () => {
              if (!confirm('Bạn chắc chắn muốn xóa tài khoản? Tất cả dữ liệu sẽ bị mất.')) return;
              try {
                localStorage.clear();
                await logOutRevenueCat();
                await supabase.auth.signOut();
              } catch (e) { console.error('Delete account failed:', e); }
            }}
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

      <AnimatePresence>
        {showFeedback && (
          <FeedbackModal session={session} onClose={() => setShowFeedback(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdmin && isAdmin && (
          <AdminScreen session={session} onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
