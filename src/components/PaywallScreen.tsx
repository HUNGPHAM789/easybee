import { motion } from 'motion/react';
import { X, Infinity, Users, GraduationCap } from 'lucide-react';
import { usePrefersReducedMotion, transitions, ease } from '../lib/motion';

interface PaywallScreenProps {
  onSubscribe: () => void;
  onRestore: () => void;
  onClose: () => void;
}

const benefits = [
  { Icon: Infinity, text: 'Học không giới hạn — bao nhiêu buổi cũng được' },
  { Icon: Users, text: '4 giáo viên AI — chọn giọng phù hợp với bạn' },
  { Icon: GraduationCap, text: 'Luyện IELTS Speaking — thi thử & luyện band' },
];

export default function PaywallScreen({ onSubscribe, onRestore, onClose }: PaywallScreenProps) {
  const reduced = usePrefersReducedMotion();

  const item = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-14 right-6 w-10 h-10 rounded-full flex items-center justify-center text-[#8a8a8a] hover:text-[#0a0a0a] transition-colors"
        aria-label="Đóng"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          className="text-[24px] font-semibold text-[#0a0a0a] mb-10"
          style={{ fontFamily: "'Comfortaa', sans-serif" }}
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, ease }}
        >
          EasyBee Premium
        </motion.h1>

        {/* Benefits */}
        <div className="w-full space-y-5 mb-10">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              variants={item}
              initial="hidden"
              animate="visible"
              transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.1 + i * 0.1, ease }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#f2f2f2] flex items-center justify-center shrink-0">
                <b.Icon className="w-5 h-5 text-[#0a0a0a]" />
              </div>
              <p className="text-[15px] text-[#0a0a0a] leading-relaxed pt-2">{b.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Price */}
        <motion.p
          className="text-[#0a0a0a] text-2xl font-semibold mb-8"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.4, ease }}
        >
          1.500.000đ / tháng
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onSubscribe}
          className="w-full bg-[#0a0a0a] text-white rounded-xl py-4 text-[15px] font-semibold"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.5, ease }}
          whileTap={{ scale: 0.98 }}
          style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
        >
          Dùng thử miễn phí 7 ngày
        </motion.button>

        {/* Restore */}
        <motion.button
          onClick={onRestore}
          className="mt-4 text-[#8a8a8a] text-sm"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.6, ease }}
        >
          Khôi phục giao dịch
        </motion.button>

        {/* Disclaimer */}
        <motion.p
          className="mt-3 text-[#b0b0b0] text-xs text-center leading-relaxed"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.65, ease }}
        >
          Sau 7 ngày sẽ tự động gia hạn. Hủy bất cứ lúc nào.
        </motion.p>
      </div>
    </motion.div>
  );
}
