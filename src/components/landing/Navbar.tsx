'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ParachuteSvg } from '../common/SvgIcons';
import { MessageSquare, Database, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenChat: (query?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo with Parachute SVG */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm transition group-hover:bg-orange-700">
            <ParachuteSvg className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-stone-900 group-hover:text-orange-600 transition">
                GREEDY ADVENTURES
              </span>
              <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-600 border border-stone-200">
                PATTAYA
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              Sea View Skydiving Experience
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#packages" className="transition hover:text-stone-900">
            Packages & Pricing
          </a>
          <a href="#journey" className="transition hover:text-stone-900">
            Dropzone Itinerary
          </a>
          <a href="#safety" className="transition hover:text-stone-900">
            USPA Safety
          </a>
          <a href="#faq" className="transition hover:text-stone-900">
            FAQ
          </a>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 border border-stone-200 transition hover:bg-stone-200"
          >
            <Database className="h-3.5 w-3.5 text-stone-500" />
            <span>Knowledge View</span>
          </Link>
        </div>

        {/* Action Button: Chat Concierge */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenChat()}
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Ask Chat Concierge</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenChat()}
            className="rounded-lg bg-stone-900 p-2 text-white"
            aria-label="Open chat"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-stone-200 bg-white p-2 text-stone-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-stone-200 bg-white px-4 py-4 md:hidden space-y-3">
          <a
            href="#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-orange-600"
          >
            Packages & Pricing
          </a>
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-orange-600"
          >
            Dropzone Itinerary
          </a>
          <a
            href="#safety"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-orange-600"
          >
            USPA Safety
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-stone-700 hover:text-orange-600"
          >
            FAQ
          </a>
          <Link
            href="/knowledge"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-orange-600"
          >
            <Database className="h-4 w-4 text-stone-500" />
            <span>Knowledge View (Backend State)</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenChat();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-stone-900 py-2.5 text-xs font-semibold text-white shadow"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Ask Chat Concierge</span>
          </button>
        </div>
      )}
    </nav>
  );
};
