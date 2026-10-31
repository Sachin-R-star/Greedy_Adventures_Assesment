'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Bot,
  ShieldCheck,
  Star,
  Eye,
  FileText,
  PlayCircle,
  Database,
  Wind
} from 'lucide-react';

interface HeroProps {
  onOpenChat: (query?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Gradient & Light Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[550px] w-[550px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute right-10 top-20 h-[350px] w-[350px] rounded-full bg-sky-500/10 blur-[100px]" />
        <div className="absolute left-10 bottom-10 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-md backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Pattaya Dropzone, Thailand</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% USPA Certified Safety Record
            </span>
          </div>
          <Link
            href="/knowledge"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/20 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-950/40"
          >
            <Database className="h-3 w-3" />
            <span>Knowledge Base Live</span>
          </Link>
        </div>

        {/* Headline */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Soar 13,000 Feet Above the{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Gulf of Thailand
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Feel the raw adrenaline of a 60-second freefall at 220 km/h, followed by a breathtaking 5-minute canopy glide over Pattaya Bay. Handcrafted by Greedy Adventures.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-950/60 transition duration-300 hover:from-cyan-500 hover:to-sky-500 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Bot className="h-5 w-5" />
              <span>Ask AI Skydiving Concierge</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-6 py-4 text-sm font-semibold text-slate-200 shadow-md backdrop-blur transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              <Eye className="h-4 w-4 text-cyan-400" />
              <span>Explore Packages (From 10,500 THB)</span>
            </a>
          </div>

          {/* Quick Chat Triggers */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-500">Quick question shortcuts:</span>
            <button
              onClick={() => onOpenChat('What is included in the package?')}
              className="rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition"
            >
              "What is included in the package?"
            </button>
            <button
              onClick={() => onOpenChat('Can you send me a brochure?')}
              className="rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-slate-300 hover:border-rose-500/50 hover:text-rose-300 transition"
            >
              "Can you send me a brochure?"
            </button>
            <button
              onClick={() => onOpenChat('Can I see a video of the experience?')}
              className="rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition"
            >
              "Can I see a video?"
            </button>
          </div>
        </div>

        {/* Feature Stat Cards Bar */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur transition hover:border-slate-700">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">13,000 FT</div>
            <div className="mt-1 text-xs font-semibold text-slate-200">Exit Altitude</div>
            <p className="mt-0.5 text-[11px] text-slate-400">Scenic flight over Gulf of Thailand</p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur transition hover:border-slate-700">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">220 KM/H</div>
            <div className="mt-1 text-xs font-semibold text-slate-200">Freefall Speed</div>
            <p className="mt-0.5 text-[11px] text-slate-400">45-60 seconds of terminal velocity</p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur transition hover:border-slate-700">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">5-7 MIN</div>
            <div className="mt-1 text-xs font-semibold text-slate-200">Canopy Gliding</div>
            <p className="mt-0.5 text-[11px] text-slate-400">Peaceful coastal descent & beach view</p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur transition hover:border-slate-700">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
            <div className="mt-1 text-xs font-semibold text-slate-200">USPA Safety</div>
            <p className="mt-0.5 text-[11px] text-slate-400">Cypress 2 AAD auto-deploy backup</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur transition hover:border-slate-700">
            <div className="flex items-center gap-1 text-2xl sm:text-3xl font-extrabold text-yellow-400">
              4.9 <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 inline" />
            </div>
            <div className="mt-1 text-xs font-semibold text-slate-200">Customer Rating</div>
            <p className="mt-0.5 text-[11px] text-slate-400">Over 1,200+ successful tandem jumps</p>
          </div>
        </div>

      </div>
    </section>
  );
};
