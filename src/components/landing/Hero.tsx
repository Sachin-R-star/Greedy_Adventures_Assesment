'use client';

import React from 'react';
import Link from 'next/link';
import {
  AltitudePlaneSvg,
  SpeedometerSvg,
  CoastlineWaveSvg,
  SafetyShieldSvg,
  CameraShutterSvg
} from '../common/SvgIcons';
import { ArrowRight, MessageSquare, Database, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenChat: (query?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1 text-xs font-semibold text-stone-700 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-600">Pattaya Dropzone, Thailand</span>
            <span className="text-stone-300">•</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-600">USPA Certified Tandem Facility</span>
          </div>

          <Link
            href="/knowledge"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
          >
            <Database className="h-3 w-3 text-stone-500" />
            <span className="font-mono text-[11px]">Knowledge Inspector</span>
          </Link>
        </div>

        {/* Main Modern Editorial Headline */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 mb-3">
            13,000 FT Tandem Coastal Jump
          </p>
          
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
            Skydiving Above the{' '}
            <span className="text-amber-700 underline decoration-amber-300/60 underline-offset-8">
              Gulf of Thailand
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Exit the aircraft at 13,000 feet, experience 60 seconds of 220 km/h freefall adrenaline, and glide smoothly along the Pattaya coastline strapped securely to a USPA tandem master.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#1c1917] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-black hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <MessageSquare className="h-4 w-4 text-amber-400" />
              <span>Ask Dropzone Concierge</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-800 shadow-2xs transition hover:bg-stone-50 hover:text-stone-950"
            >
              <span>View Packages (From 10,500 THB)</span>
            </a>
          </div>

          {/* Conversational Prompt Shortcuts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500">
            <span className="font-mono text-[11px] text-stone-400 uppercase tracking-wider">Try in assistant:</span>
            <button
              onClick={() => onOpenChat('What is included in the package?')}
              className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-stone-700 hover:border-stone-400 hover:bg-white transition"
            >
              "What is included in the package?"
            </button>
            <button
              onClick={() => onOpenChat('Can you send me a brochure?')}
              className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-stone-700 hover:border-stone-400 hover:bg-white transition"
            >
              "Can you send me a brochure?"
            </button>
            <button
              onClick={() => onOpenChat('Can I see a video of the experience?')}
              className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-stone-700 hover:border-stone-400 hover:bg-white transition"
            >
              "Can I see a video?"
            </button>
          </div>
        </div>

        {/* Feature Metric Cards with Clean SVGs */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-800">
              <AltitudePlaneSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">13,000 FT</div>
            <div className="text-xs font-medium text-stone-600">Exit Altitude</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">Scenic aircraft ascent over Pattaya Bay</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-800">
              <SpeedometerSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">220 KM/H</div>
            <div className="text-xs font-medium text-stone-600">Terminal Freefall</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">45–60 sec pure gravity rush</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-800">
              <CoastlineWaveSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">360° SEA</div>
            <div className="text-xs font-medium text-stone-600">Coastal Canopy Glide</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">5–7 min glide over Koh Larn</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-800">
              <SafetyShieldSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">USPA 100%</div>
            <div className="text-xs font-medium text-stone-600">Safety Certified</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">Cypress 2 AAD automatic backup</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-stone-200 bg-stone-50/70 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-800">
              <CameraShutterSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">4K MEDIA</div>
            <div className="text-xs font-medium text-stone-600">Photo & Video</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">Wrist cam & outside cameraman</p>
          </div>

        </div>

      </div>
    </section>
  );
};
