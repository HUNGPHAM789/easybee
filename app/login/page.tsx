"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ActionButton from "@/components/ActionButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuest = async () => {
    setGuestLoading(true);
    setError(null);
    try {
      // Sign out any existing session first
      const supabase = createClient();
      await supabase.auth.signOut();
      
      // Clear app-specific localStorage (NOT Supabase auth keys)
      const appKeys = ['easybee_name', 'easybee_profile', 'easybee_recommended', 'easybee_admin_edits'];
      appKeys.forEach(k => localStorage.removeItem(k));
      
      // Sign in anonymously (fresh user, no onboarded flag)
      const { error: anonError } = await supabase.auth.signInAnonymously();
      if (anonError) {
        setError(anonError.message);
        setGuestLoading(false);
        return;
      }
      // Auth state change will trigger redirect via AuthProvider
      // Force navigation to ensure page picks up new state
      window.location.href = '/';
    } catch {
      setError("Không thể đăng nhập. Thử lại sau.");
      setGuestLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-8">
      <h1 className="text-3xl font-semibold text-neutral-900 mb-2 font-title">
        EasyBee
      </h1>
      <p className="text-sm text-neutral-400 mb-10">
        Tiếng Anh cho người Việt
      </p>

      {sent ? (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <p className="text-lg font-semibold text-neutral-900 mb-1">
            Kiểm tra email của bạn
          </p>
          <p className="text-sm text-neutral-400">
            Chúng tôi đã gửi link đăng nhập đến <br />
            <span className="font-medium text-neutral-600">{email}</span>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-xs space-y-4">
          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: `${window.location.origin}/` },
              });
            }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-neutral-200 bg-white text-neutral-900 text-base font-medium hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Đăng nhập bằng Google
          </button>

          <button
            onClick={handleGuest}
            disabled={guestLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-600 text-base font-medium hover:bg-neutral-100 active:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <span className="text-xl">👤</span>
            {guestLoading ? "Đang vào..." : "Vào thử không cần đăng ký"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400">hoặc</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-base outline-none focus:border-neutral-400 transition-colors"
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <ActionButton
              type="submit"
              className="w-full py-3 text-base"
            >
              {loading ? "Đang gửi..." : "Gửi link đăng nhập"}
            </ActionButton>
          </form>
        </div>
      )}
    </main>
  );
}
