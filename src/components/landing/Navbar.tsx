'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DropzoneEmblemSvg } from '../common/SvgIcons';
import { Database, Menu, X, ArrowRight, ShieldCheck, Compass, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenChat: (query?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Telemetry & Airfield Status Bar (Refined Editorial Ticker) */}
      <div className="border-b border-stone-800 bg-[#141210] px-4 py-1.5 text-stone-300 text-[11px] font-mono select-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Airfield Status & Coordinates */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-stone-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AIRSPACE OPEN • 13,000 FT</span>
            </span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline text-stone-400">
              PATTAYA BAY DROPZONE (12°55&apos;N, 100°52&apos;E)
            </span>
          </div>

          {/* Quick Grounding & Assignment Link */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-stone-400">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>USPA Safety Certified #TH-204</span>
            </span>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition font-semibold"
            >
              <Database className="h-3 w-3 text-amber-400" />
              <span>Read-Only Knowledge View</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Architectural Navigation Bar */}
      <div className="bg-[#fafaf9]/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Brand Mark with Dropzone Emblem */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1c1917] text-stone-100 shadow-sm transition duration-200 group-hover:bg-black group-hover:scale-105">
              <DropzoneEmblemSvg className="h-6 w-6 text-amber-400" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold tracking-[0.14em] text-sm text-stone-950 uppercase group-hover:text-amber-700 transition">
                  Greedy Adventures
                </span>
                <span className="rounded bg-stone-200/70 px-1.5 py-0.2 text-[9px] font-mono font-semibold uppercase tracking-wider text-stone-700">
                  Pattaya
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase">
                Coastal Tandem Dropzone • 13,000 FT
              </span>
            </div>
          </Link>

          {/* Structured Editorial Nav Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#packages"
              className="group flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stone-600 hover:text-stone-950 transition"
            >
              <span className="font-mono text-[10px] text-stone-400 group-hover:text-amber-700 transition">01.</span>
              <span>Packages & Rates</span>
            </a>
            <a
              href="#journey"
              className="group flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stone-600 hover:text-stone-950 transition"
            >
              <span className="font-mono text-[10px] text-stone-400 group-hover:text-amber-700 transition">02.</span>
              <span>The Experience</span>
            </a>
            <a
              href="#safety"
              className="group flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stone-600 hover:text-stone-950 transition"
            >
              <span className="font-mono text-[10px] text-stone-400 group-hover:text-amber-700 transition">03.</span>
              <span>USPA Standards</span>
            </a>
            <a
              href="#faq"
              className="group flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stone-600 hover:text-stone-950 transition"
            >
              <span className="font-mono text-[10px] text-stone-400 group-hover:text-amber-700 transition">04.</span>
              <span>Dropzone FAQ</span>
            </a>
          </nav>

          {/* Action Group */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 hover:border-stone-300 transition"
            >
              <Database className="h-3.5 w-3.5 text-stone-500" />
              <span>Knowledge Base</span>
            </Link>

            <button
              type="button"
              onClick={() => onOpenChat()}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1c1917] px-4 py-2 text-xs font-semibold text-stone-50 shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition" />
              <span>Ask AI Concierge</span>
              <ArrowRight className="h-3.5 w-3.5 text-stone-400 group-hover:translate-x-0.5 group-hover:text-white transition" />
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="rounded-lg bg-stone-900 p-2 text-white shadow-xs"
              aria-label="Open chat"
            >
              <Compass className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-stone-200 bg-white p-2 text-stone-700"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-3 border-t border-stone-200 pt-4 lg:hidden space-y-3 pb-2">
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              01. Packages & Rates
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              02. The Experience
            </a>
            <a
              href="#safety"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              03. USPA Standards
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              04. Dropzone FAQ
            </a>
            <Link
              href="/knowledge"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-900"
            >
              <Database className="h-4 w-4 text-stone-600" />
              <span>Read-Only Knowledge View</span>
            </Link>
            <a
              href="https://greedyadventuresassesment.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-sm font-semibold text-amber-900"
            >
              <span>Live Vercel Deployment</span>
              <ExternalLink className="h-3.5 w-3.5 text-amber-700" />
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
