'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Database, Compass, Menu, X, Sparkles, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenChat: (query?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-amber-400 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/40 group-hover:scale-105 transition duration-300">
            <Compass className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition">
                GREEDY ADVENTURES
              </span>
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.2 text-[9px] font-bold text-cyan-300 ring-1 ring-cyan-500/30">
                PATTAYA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Sea View Skydiving Experience
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#packages" className="transition hover:text-cyan-400">
            Packages & Pricing
          </a>
          <a href="#journey" className="transition hover:text-cyan-400">
            Experience Journey
          </a>
          <a href="#safety" className="transition hover:text-cyan-400">
            Safety & USPA
          </a>
          <a href="#faq" className="transition hover:text-cyan-400">
            FAQ
          </a>
          <Link
            href="/knowledge"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-amber-300 hover:border-amber-500/50 hover:bg-slate-800 hover:text-amber-200 transition"
          >
            <Database className="h-3.5 w-3.5" />
            <span>Knowledge View</span>
          </Link>
        </div>

        {/* Action Button: Open AI Assistant */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenChat()}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-950/40 transition hover:from-cyan-500 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Bot className="h-4 w-4" />
            <span>Ask Skydiving AI</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenChat()}
            className="rounded-lg bg-cyan-600 p-2 text-white"
            aria-label="Open AI Assistant"
          >
            <Bot className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 md:hidden space-y-3">
          <a
            href="#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Packages & Pricing
          </a>
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Experience Journey
          </a>
          <a
            href="#safety"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Safety & USPA
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            FAQ
          </a>
          <Link
            href="/knowledge"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-amber-300"
          >
            <Database className="h-4 w-4" />
            <span>Knowledge View (Backend State)</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenChat();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-600 py-2.5 text-xs font-bold text-white shadow"
          >
            <Bot className="h-4 w-4" />
            <span>Chat with Skydiving Assistant</span>
          </button>
        </div>
      )}
    </nav>
  );
};
