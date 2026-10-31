import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sea View Skydiving Pattaya — Greedy Adventures",
  description: "Experience 13,000-ft coastal tandem skydiving over the Gulf of Thailand with certified USPA instructors. Official booking prototype.",
  keywords: ["skydiving", "sea view skydiving", "greedy adventures", "pattaya", "tandem skydive", "thailand"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#fafaf9] text-slate-900 antialiased selection:bg-orange-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
