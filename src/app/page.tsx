'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Packages } from '@/components/landing/Packages';
import { ExperienceJourney } from '@/components/landing/ExperienceJourney';
import { SafetySection } from '@/components/landing/SafetySection';
import { FaqSection } from '@/components/landing/FaqSection';
import { Footer } from '@/components/landing/Footer';
import { ChatDrawer } from '@/components/chat/ChatDrawer';
import {
  Bot,
  Database,
  Sparkles,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState<string | undefined>(undefined);

  const handleOpenChat = (query?: string) => {
    setInitialChatQuery(query);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setInitialChatQuery(undefined);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      
      {/* Top Reviewer Banner */}
      <div className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-amber-950/40 px-4 py-2 text-center text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-center flex-wrap gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Greedy Adventures Full Stack Assignment Submission
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="text-slate-400">
            AI Assistant with multi-turn memory & dynamic PDF/Video delivery
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1 font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-500/40"
          >
            <Database className="h-3 w-3" />
            <span>Open Knowledge View</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <Navbar onOpenChat={handleOpenChat} />

      {/* Landing Page Content */}
      <main className="flex-1">
        <Hero onOpenChat={handleOpenChat} />
        <Packages onOpenChat={handleOpenChat} />
        <ExperienceJourney />
        <SafetySection />
        <FaqSection onOpenChat={handleOpenChat} />
      </main>

      {/* Footer */}
      <Footer onOpenChat={() => handleOpenChat()} />

      {/* Floating Chat Trigger Button (Fixed bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => handleOpenChat()}
          aria-label="Open AI Skydiving Assistant"
          className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-500 p-3.5 sm:px-5 sm:py-3.5 text-white shadow-2xl shadow-cyan-950 transition duration-300 hover:scale-105 hover:from-cyan-500 hover:to-sky-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
        >
          <div className="relative flex h-7 w-7 items-center justify-center">
            <Bot className="h-6 w-6 transition group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-wide text-white">
              Ask Skydiving AI
            </span>
            <span className="text-[10px] text-cyan-200 font-medium">
              Packages • Brochure • Videos
            </span>
          </div>
        </button>
      </div>

      {/* Assistant-ui Powered Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialQuery={initialChatQuery}
      />

    </div>
  );
}
