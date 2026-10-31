'use client';

import React from 'react';
import {
  Check,
  Bot,
  FileText,
  Sparkles,
  Camera,
  Film,
  Award,
  ShieldCheck,
  HelpCircle,
  Download
} from 'lucide-react';

interface PackagesProps {
  onOpenChat: (query?: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onOpenChat }) => {
  return (
    <section id="packages" className="py-20 border-t border-slate-900 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-500/20">
            Tiered Packages & Media Options
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Choose Your Skydiving Experience
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed font-light">
            All options feature the full 13,000-ft tandem jump strapped to a certified USPA instructor. Select the media level that matches how you want to remember your jump.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => onOpenChat('What is included in the package?')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              <Bot className="h-3.5 w-3.5" />
              <span>Ask AI: "What is included in the package?"</span>
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => onOpenChat('Can you send me a brochure?')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Request Brochure in Chat</span>
            </button>
          </div>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* PACKAGE 1: ECO TANDEM SKYDIVE */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-7 shadow-xl backdrop-blur transition hover:border-slate-700">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  ESSENTIAL JUMP
                </span>
                <span className="text-xs text-slate-500 font-mono">No Media</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">Eco Tandem Skydive</h3>
              <p className="mt-1 text-xs text-slate-400">
                Pure thrill for the minimalist adventurer. Focus on the raw feeling of freefall.
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">10,500</span>
                <span className="text-sm font-semibold text-slate-400">THB</span>
              </div>
              <div className="text-[11px] text-slate-500">Official Dropzone Fixed Rate</div>

              <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-6 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>13,000-ft tandem skydive with USPA instructor</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>20-minute safety orientation & harness fitting</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Complete flight suit, protective goggles & altimeter</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Personalized Skydiving Certificate of Achievement</span>
                </div>
                <div className="flex items-start gap-3 text-slate-500">
                  <span className="text-xs mt-0.5">✕</span>
                  <span className="text-xs">No camera footage or photos included</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onOpenChat('Tell me more about the Eco Tandem Skydive package (10,500 THB)')}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 py-3 text-xs font-bold text-slate-200 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <Bot className="h-4 w-4 text-cyan-400" />
                <span>Ask AI About Eco Package</span>
              </button>
            </div>
          </div>

          {/* PACKAGE 2: HANDYCAM PRO (POPULAR) */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-cyan-500 bg-gradient-to-b from-slate-900/95 via-slate-900 to-cyan-950/20 p-7 shadow-2xl shadow-cyan-950/50 backdrop-blur scale-102 lg:-translate-y-2">
            
            {/* Popular Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 shadow-md">
              ★ Most Popular Choice
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300 ring-1 ring-cyan-500/30">
                  INSTRUCTOR POV
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-cyan-400">
                  <Camera className="h-3.5 w-3.5" />
                  HD Video + Photos
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">Handycam Pro Package</h3>
              <p className="mt-1 text-xs text-slate-300">
                Captures every emotion up-close from aircraft exit through freefall to landing.
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-cyan-400">12,500</span>
                <span className="text-sm font-semibold text-slate-400">THB</span>
              </div>
              <div className="text-[11px] text-cyan-300/80">Best for first-time social sharing</div>

              <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-6 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span className="font-semibold text-white">Everything in Eco Tandem Jump</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Wrist-mounted HD wide-angle camera on instructor</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Captures exit, freefall facial reactions & canopy flight</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>50+ high-resolution digital action photos</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Edited 1080p full HD highlight video file</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onOpenChat('Can I see more details about the Handycam Pro Package (12,500 THB)?')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:from-cyan-500 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Bot className="h-4 w-4" />
                <span>Ask AI About Handycam Pro</span>
              </button>
            </div>
          </div>

          {/* PACKAGE 3: VIP SEA VIEW CINE-PACK (BEST VALUE) */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 via-slate-900 to-amber-950/20 p-7 shadow-xl backdrop-blur transition hover:border-amber-500/60">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 ring-1 ring-amber-500/30">
                  CINEMATIC 360°
                </span>
                <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                  Save 3,050 THB
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">VIP Sea View Cine-Pack</h3>
              <p className="mt-1 text-xs text-slate-400">
                The ultimate movie-grade experience with an outside cameraman flying around you.
              </p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-amber-400">14,000</span>
                <span className="text-sm font-semibold text-slate-400">THB</span>
                <span className="text-sm text-slate-500 line-through">17,050 THB</span>
              </div>
              <div className="text-[11px] text-amber-300/80">Special promotional rate for Sea View</div>

              <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-6 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <span className="font-semibold text-white">Everything in Eco + Handycam POV</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <span className="text-amber-200 font-semibold">
                    DEDICATED OUTSIDE CAMERAMAN leaps alongside you
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>Cinematic 360° angles, aerial coastline & Gulf views</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>4K professionally edited highlight video with music</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>100+ high-resolution digital action photos</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>Greedy Adventures commemorative souvenir gift</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onOpenChat('What are the full details and savings on the VIP Sea View Cine-Pack?')}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 py-3 text-xs font-bold text-amber-300 transition hover:bg-amber-500/20 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <Bot className="h-4 w-4 text-amber-400" />
                <span>Ask AI About VIP Cine-Pack</span>
              </button>
            </div>
          </div>

        </div>

        {/* Brochure & Video Callout Banner */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Need the Full Official Pricing & Specs Guide?</h4>
              <p className="text-xs text-slate-400">
                Download the official 2026 information brochure directly or ask our chatbot to send it to you.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onOpenChat('Can you send me a brochure?')}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-500 transition"
            >
              <Bot className="h-4 w-4" />
              <span>Ask Chatbot for Brochure</span>
            </button>
            <a
              href="/assets/brochure/sea-view-skydiving-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white transition"
            >
              <Download className="h-4 w-4" />
              <span>Direct PDF Download</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
