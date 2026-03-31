"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ActionButton from "@/components/ActionButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
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
      )}
    </main>
  );
}
