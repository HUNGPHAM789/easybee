import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { usePrefersReducedMotion, transitions, ease } from '../lib/motion';

interface PricingScreenProps {
  onSubscribe: (plan: 'monthly' | 'biannual' | 'annual') => void;
  onRestore: () => void;
  onClose: () => void;
}

const plans = [
  {
    id: 'annual' as const,
    label: 'Hàng năm',
    price: '$59.99/năm',
    perMonth: '$5.00/tháng',
    badge: 'Tiết kiệm 50%',
    badgeBg: 'bg-[#f0fdf4]',
    badgeText: 'text-[#16a34a]',
  },
  {
    id: 'biannual' as const,
    label: '6 tháng',
    price: '$34.99/6 tháng',
    perMonth: '$5.83/tháng',
    badge: 'Tiết kiệm 42%',
    badgeBg: 'bg-[#f0fdf4]',
    badgeText: 'text-[#16a34a]',
  },
  {
    id: 'monthly' as const,
    label: 'Hàng tháng',
    price: '$9.99/tháng',
    perMonth: null,
    badge: null,
    badgeBg: null,
    badgeText: null,
  },
];

export default function PricingScreen({ onSubscribe, onRestore, onClose }: PricingScreenProps) {
  const [selected, setSelected] = useState<'monthly' | 'biannual' | 'annual'>('annual');
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
          className="text-[24px] font-semibold text-[#0a0a0a] mb-8"
          style={{ fontFamily: "'Comfortaa', sans-serif" }}
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, ease }}
        >
          Chọn gói của bạn
        </motion.h1>

        {/* Plan cards */}
        <div className="w-full space-y-3 mb-8">
          {plans.map((plan, i) => (
            <motion.button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`w-full rounded-xl p-4 text-left transition-all ${
                selected === plan.id
                  ? 'border-2 border-[#0a0a0a]'
                  : 'border border-[#e0e0e0]'
              }`}
              variants={item}
              initial="hidden"
              animate="visible"
              transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.1 + i * 0.1, ease }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#0a0a0a]">{plan.label}</span>
                    {plan.badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${plan.badgeBg} ${plan.badgeText}`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[15px] font-semibold text-[#0a0a0a]">{plan.price}</p>
                  {plan.perMonth && (
                    <p className="text-xs text-[#8a8a8a]">{plan.perMonth}</p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => onSubscribe(selected)}
          className="w-full bg-[#0a0a0a] text-white rounded-xl py-4 text-[15px] font-semibold"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.4, ease }}
          whileTap={{ scale: 0.98 }}
          style={{ boxShadow: '0 2px 12px rgba(10,10,10,0.15)' }}
        >
          Bắt đầu →
        </motion.button>

        {/* Restore */}
        <motion.button
          onClick={onRestore}
          className="mt-4 text-[#8a8a8a] text-sm"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.5, ease }}
        >
          Khôi phục giao dịch
        </motion.button>

        {/* Disclaimer */}
        <motion.p
          className="mt-3 text-[#b0b0b0] text-xs text-center leading-relaxed"
          variants={item}
          initial="hidden"
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.55, ease }}
        >
          Thanh toán qua App Store. Hủy bất cứ lúc nào.
        </motion.p>
      </div>
    </motion.div>
  );
}
