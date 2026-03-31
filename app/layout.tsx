import type { Metadata } from "next";
import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
});

const comfortaa = Comfortaa({
  subsets: ["latin", "vietnamese"],
  variable: "--font-title",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "EasyBee",
  description: "English for Vietnamese nail salon professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${comfortaa.variable}`}>
      <body style={{ background: "#ffffff", fontFamily: "var(--font-body)" }}>
        <div className="min-h-screen w-full max-w-[390px] mx-auto bg-white relative">
          {children}
        </div>
      </body>
    </html>
  );
}

