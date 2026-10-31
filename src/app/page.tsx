'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Packages } from '@/components/landing/Packages';
import { ExperienceJourney } from '@/components/landing/ExperienceJourney';
import { SafetySection } from '@/components/landing/SafetySection';
import { FaqSection } from '@/components/landing/FaqSection';
import { Footer } from '@/components/landing/Footer';
import { ChatDrawer } from '@/components/chat/ChatDrawer';
import { DropzoneEmblemSvg } from '@/components/common/SvgIcons';
import { MessageSquare } from 'lucide-react';

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
      
      {/* Modern High-End Architectural Header */}
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
          className="group flex items-center gap-2.5 rounded-full bg-[#1c1917] px-4 py-3 text-white shadow-xl transition duration-200 hover:bg-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-800 text-amber-400 group-hover:scale-110 transition">
            <DropzoneEmblemSvg className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-wide text-white">
              Ask Assistant
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
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
