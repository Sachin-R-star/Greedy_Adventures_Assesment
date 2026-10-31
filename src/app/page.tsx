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
import { ParachuteSvg } from '@/components/common/SvgIcons';
import { ArrowRight, BookOpen, MessageSquare } from 'lucide-react';

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
    <div className="relative min-h-screen bg-[#fafaf9] text-stone-900 flex flex-col justify-between antialiased selection:bg-amber-100 selection:text-stone-900">
      
      {/* Top Reviewer Notification Strip */}
      <div className="border-b border-stone-200 bg-stone-100 px-4 py-2 text-center text-xs text-stone-600">
        <div className="mx-auto flex max-w-7xl items-center justify-center flex-wrap gap-x-3 gap-y-1">
          <span className="font-semibold text-stone-800">
            Greedy Adventures Developer Assignment
          </span>
          <span className="hidden sm:inline text-stone-400">•</span>
          <span>Sea View Skydiving (Pattaya, Thailand)</span>
          <span className="hidden sm:inline text-stone-400">•</span>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1 font-semibold text-stone-900 hover:text-orange-700 underline underline-offset-2"
          >
            <BookOpen className="h-3.5 w-3.5 text-orange-700" />
            <span>Read-Only Knowledge View</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <Navbar onOpenChat={handleOpenChat} />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <Hero onOpenChat={handleOpenChat} />
        <Packages onOpenChat={handleOpenChat} />
        <ExperienceJourney />
        <SafetySection />
        <FaqSection onOpenChat={handleOpenChat} />
      </main>

      {/* Footer */}
      <Footer onOpenChat={() => handleOpenChat()} />

      {/* Clean Floating Inquire Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => handleOpenChat()}
          aria-label="Open Skydiving Assistant"
          className="group flex items-center gap-2.5 rounded-full bg-stone-900 px-4 py-3 text-white shadow-lg transition duration-200 hover:bg-stone-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-800 text-stone-200 group-hover:text-white">
            <ParachuteSvg className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-tight text-white">
              Ask Assistant
            </span>
            <span className="text-[10px] text-stone-300">
              Rates • Brochure • Video
            </span>
          </div>
        </button>
      </div>

      {/* Interactive Chat Drawer powered by assistant-ui */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialQuery={initialChatQuery}
      />

    </div>
  );
}
