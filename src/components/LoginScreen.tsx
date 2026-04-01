import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <h1
          className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-1"
          style={{ fontFamily: "'Comfortaa', sans-serif" }}
        >
          EasyBee
        </h1>
        <p className="text-[12px] text-[#8a8a8a] tracking-[0.15em] uppercase font-semibold mb-12">
          Tiếng Anh cho người Việt
        </p>

        {/* Card */}
        <div
          className="w-full rounded-xl p-6 space-y-3"
          style={{ background: '#fafafa', border: '1px solid #e0e0e0' }}
        >
          {/* Google button */}
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-[14px] font-medium text-[#0a0a0a] bg-white transition-colors hover:bg-[#f8f8f8] disabled:opacity-50"
            style={{ border: '1px solid #e0e0e0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Đăng nhập bằng Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-[#e0e0e0]" />
            <span className="text-[11px] text-[#b0b0b0] uppercase tracking-wider">hoặc</span>
            <div className="flex-1 h-px bg-[#e0e0e0]" />
          </div>

          {/* Guest button */}
          <button
            onClick={signInAsGuest}
            disabled={loading}
            className="flex items-center justify-center w-full py-3.5 rounded-xl text-[14px] font-medium text-[#4b4b4b] bg-[#f2f2f2] transition-colors hover:bg-[#eaeaea] disabled:opacity-50"
            style={{ border: '1px solid #e0e0e0' }}
          >
            Vào thử không cần đăng ký
          </button>
        </div>

        {error && (
          <p className="mt-4 text-[12px] text-red-500 text-center">{error}</p>
        )}

        {loading && (
          <p className="mt-4 text-[12px] text-[#8a8a8a]">Đang xử lý...</p>
        )}
      </div>
    </div>
  );
}
