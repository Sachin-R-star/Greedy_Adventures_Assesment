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
  description: "Experience 13,000 feet coastal tandem skydiving over the Gulf of Thailand. Includes AI Assistant powered by assistant-ui and live Knowledge View.",
  keywords: ["skydiving", "sea view skydiving", "greedy adventures", "pattaya skydiving", "tandem skydive", "thailand skydiving"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
