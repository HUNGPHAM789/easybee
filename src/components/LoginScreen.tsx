import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { supabase } from '../lib/supabase';

// --- Elegant Shape ---
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-[#0a0a0a]/[0.03]',
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={`absolute ${className ?? ''}`}
      initial={prefersReduced ? { opacity: 0.7 } : { opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={prefersReduced ? { opacity: 0.7 } : { opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        animate={prefersReduced ? {} : { y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} to-transparent border border-[#0a0a0a]/[0.04]`}
          style={{
            transform: `rotate(${rotate}deg)`,
            boxShadow: '0 0 30px rgba(0,0,0,0.02)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// --- Stagger wrapper ---
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
    >
      {children}
    </motion.div>
  );
}

// --- Login Screen ---
export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const signInAsGuest = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden">
      {/* --- Floating shapes --- */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          className="top-[-10%] left-[-5%]"
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
        />
        <ElegantShape
          className="top-[15%] right-[-8%]"
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
        />
        <ElegantShape
          className="bottom-[5%] left-[10%]"
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-[#0a0a0a]/[0.02]"
        />
        <ElegantShape
          className="bottom-[-5%] right-[5%]"
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-[#0a0a0a]/[0.015]"
        />
      </div>

      {/* --- Content --- */}
      <div className="relative z-20 w-full max-w-sm flex flex-col items-center">
        {/* Title */}
        <FadeUp delay={0.3}>
          <h1
            className="text-5xl font-bold tracking-tight text-center text-[#0a0a0a]"
            style={{ fontFamily: "'Comfortaa', sans-serif" }}
          >
            EasyBee
          </h1>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={0.5}>
          <p className="mt-3 text-sm text-[#8a8a8a] font-light tracking-wide text-center">
            Tiếng Anh cho người Việt
          </p>
        </FadeUp>

        {/* Buttons */}
        <FadeUp delay={0.7}>
          <div className="mt-10 w-full space-y-3" style={{ minWidth: 320 }}>
            {/* Google */}
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-sm font-medium text-[#0a0a0a] bg-white border border-[#e0e0e0] transition-all hover:bg-[#fafafa] disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Đăng nhập bằng Google
            </button>

            {/* Guest */}
            <button
              onClick={signInAsGuest}
              disabled={loading}
              className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-medium text-[#6a6a6a] bg-[#f2f2f2] border border-[#e0e0e0] transition-all hover:bg-[#eaeaea] disabled:opacity-50"
            >
              Vào thử không cần đăng ký
            </button>

            <p className="text-xs text-[#b0b0b0] text-center pt-1">
              Dữ liệu sẽ mất khi đăng xuất
            </p>
          </div>
        </FadeUp>

        {error && (
          <p className="mt-4 text-xs text-red-500 text-center">{error}</p>
        )}
        {loading && (
          <p className="mt-4 text-xs text-[#8a8a8a]">Đang xử lý...</p>
        )}
      </div>
    </div>
  );
}
