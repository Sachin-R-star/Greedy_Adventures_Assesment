'use client';

import React from 'react';
import Link from 'next/link';
import {
  AltitudePlaneSvg,
  SpeedometerSvg,
  CoastlineWaveSvg,
  SafetyShieldSvg,
  ParachuteSvg
} from '../common/SvgIcons';
import { ArrowRight, MessageSquare, Star, FileText, Film, Database } from 'lucide-react';

interface HeroProps {
  onOpenChat: (query?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1 text-xs font-semibold text-stone-700 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Pattaya Dropzone, Thailand</span>
            <span className="text-stone-300">•</span>
            <span>USPA Certified Tandem Facility</span>
          </div>

          <Link
            href="/knowledge"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            <Database className="h-3 w-3 text-stone-500" />
            <span>Open Knowledge View</span>
          </Link>
        </div>

        {/* Main Editorial Headline */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
            Tandem Skydiving Above the{' '}
            <span className="text-orange-600">
              Gulf of Thailand
            </span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Jump from 13,000 feet, experience 60 seconds of 220 km/h freefall, and enjoy a serene 5-minute coastal canopy descent over Pattaya’s turquoise waters.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Ask Skydiving Concierge</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-xs transition hover:bg-stone-50 hover:text-stone-950"
            >
              <span>View Packages & Rates (From 10,500 THB)</span>
            </a>
          </div>

          {/* Prompt Shortcuts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500">
            <span className="font-medium text-stone-400">Quick prompts for the chatbot:</span>
            <button
              onClick={() => onOpenChat('What is included in the package?')}
              className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-stone-700 hover:border-stone-400 hover:bg-white transition"
            >
              "What is included in the package?"
            </button>
            <button
              onClick={() => onOpenChat('Can you send me a brochure?')}
              className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-stone-700 hover:border-stone-400 hover:bg-white transition"
            >
              "Can you send me a brochure?"
            </button>
            <button
              onClick={() => onOpenChat('Can I see a video of the experience?')}
              className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-stone-700 hover:border-stone-400 hover:bg-white transition"
            >
              "Can I see a video?"
            </button>
          </div>
        </div>

        {/* Clean Feature Metric Cards with SVGs */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          
          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <AltitudePlaneSvg className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">13,000 FT</div>
            <div className="mt-1 text-xs font-semibold text-stone-800">Jump Altitude</div>
            <p className="mt-0.5 text-[11px] text-stone-500">Scenic flight over Pattaya Bay</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <SpeedometerSvg className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">220 KM/H</div>
            <div className="mt-1 text-xs font-semibold text-stone-800">Terminal Velocity</div>
            <p className="mt-0.5 text-[11px] text-stone-500">45-60 sec pure freefall</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <CoastlineWaveSvg className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">5-7 MIN</div>
            <div className="mt-1 text-xs font-semibold text-stone-800">Canopy Ride</div>
            <p className="mt-0.5 text-[11px] text-stone-500">Ocean view glide & beach landing</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <SafetyShieldSvg className="h-5 w-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">100%</div>
            <div className="mt-1 text-xs font-semibold text-stone-800">USPA Safety</div>
            <p className="mt-0.5 text-[11px] text-stone-500">Dual parachute + Cypress 2 AAD</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-stone-200 bg-stone-50/60 p-4 shadow-xs">
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">4.9 / 5</div>
            <div className="mt-1 text-xs font-semibold text-stone-800">Customer Rating</div>
            <p className="mt-0.5 text-[11px] text-stone-500">1,200+ verified tandem jumps</p>
          </div>

        </div>

      </div>
    </section>
  );
};
