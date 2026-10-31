'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AltitudePlaneSvg,
  SpeedometerSvg,
  CoastlineWaveSvg,
  SafetyShieldSvg,
  CameraShutterSvg,
  DropzoneEmblemSvg,
  ParachuteSvg
} from '../common/SvgIcons';
import {
  ArrowRight,
  MessageSquare,
  Database,
  Play,
  FileText,
  Film,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  Car,
  CloudSun,
  Lock,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenChat: (query?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'concierge' | 'rates' | 'guarantees'>('concierge');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20 bg-[#fafaf9] border-b border-stone-200">
      
      {/* Subtle Topographic / Elevation Grid Lines Background (Clean SVG vector) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] select-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="altitude-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="60" cy="60" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#altitude-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Operational Telemetry Capsule */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-3.5 py-1 text-xs font-semibold text-stone-700 shadow-2xs backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="font-mono text-[11px] tracking-wide text-stone-700 uppercase">
              Pattaya Dropzone, Thailand
            </span>
            <span className="text-stone-300">•</span>
            <span className="font-mono text-[11px] text-stone-500 uppercase">
              12°55&apos;N, 100°52&apos;E
            </span>
            <span className="text-stone-300">•</span>
            <span className="font-mono text-[11px] text-emerald-700 font-semibold uppercase">
              USPA Certified #TH-204
            </span>
          </div>

          <Link
            href="/knowledge"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/90 px-3 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 shadow-2xs"
          >
            <Database className="h-3 w-3 text-stone-500" />
            <span className="font-mono text-[11px]">Knowledge Inspector</span>
            <ArrowRight className="h-2.5 w-2.5 text-stone-400" />
          </Link>
        </div>

        {/* Main Editorial Hero Block */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-1 mb-4 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-stone-600 border border-stone-200/80">
            <Compass className="h-3 w-3 text-amber-700" />
            <span>13,000 FT Coastal Tandem Dropzone</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
            Skydiving Above the{' '}
            <span className="text-amber-700 underline decoration-amber-300/60 decoration-4 underline-offset-8">
              Gulf of Thailand
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Exit the aircraft at 13,000 feet, experience 60 seconds of 220 km/h freefall adrenaline, and glide smoothly along the Pattaya coastline strapped securely to a licensed USPA tandem master.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#1c1917] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition duration-200 hover:bg-black hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <MessageSquare className="h-4 w-4 text-amber-400" />
              <span>Ask Dropzone Concierge</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenChat('Can I see a video of the experience?')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-800 shadow-2xs transition hover:bg-stone-50 hover:text-stone-950"
            >
              <Play className="h-3.5 w-3.5 text-amber-600 fill-amber-600" />
              <span>Watch 45s Freefall Reel</span>
            </button>

            <a
              href="#packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100/80 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-700 shadow-2xs transition hover:bg-stone-200"
            >
              <span>View Packages (From 10,500 THB)</span>
            </a>
          </div>

        </div>

        {/* INTERACTIVE FEATURE DECK (Stylish Box with Tabs & Quick Actions) */}
        <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          
          {/* Deck Header & Interactive Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-stone-900">
                  Interactive Dropzone Explorer
                </h3>
              </div>
              <p className="mt-0.5 text-xs text-stone-500">
                Explore packages, test live chatbot responses, or check dropzone guarantees.
              </p>
            </div>

            {/* Tab Pills */}
            <div className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100 p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('concierge')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  activeTab === 'concierge'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Chatbot Quick Prompts
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rates')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  activeTab === 'rates'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Rates Summary
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('guarantees')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  activeTab === 'guarantees'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Dropzone Policies
              </button>
            </div>
          </div>

          {/* TAB 1: Chatbot Quick Prompts Deck */}
          {activeTab === 'concierge' && (
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
                  Click any card to trigger live AI response with dynamic formats:
                </span>
                <span className="hidden md:inline font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Real Grounded Engine
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                
                {/* Prompt 1: Brochure */}
                <button
                  type="button"
                  onClick={() => onOpenChat('Can you send me a brochure?')}
                  className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 text-left transition hover:bg-stone-50 hover:border-stone-400 hover:shadow-2xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700 border border-red-200 group-hover:scale-105 transition">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-900">Official Brochure (PDF)</span>
                      <span className="rounded bg-red-100 px-1.5 py-0.2 text-[9px] font-mono font-medium text-red-800">PDF Card</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                      &quot;Can you send me a brochure?&quot;
                    </p>
                  </div>
                </button>

                {/* Prompt 2: Video Reel */}
                <button
                  type="button"
                  onClick={() => onOpenChat('Can I see a video of the experience?')}
                  className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 text-left transition hover:bg-stone-50 hover:border-stone-400 hover:shadow-2xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-900 text-white group-hover:scale-105 transition">
                    <Film className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-900">4K Freefall Reel</span>
                      <span className="rounded bg-stone-200 px-1.5 py-0.2 text-[9px] font-mono font-medium text-stone-800">Video Card</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                      &quot;Can I see a video of the experience?&quot;
                    </p>
                  </div>
                </button>

                {/* Prompt 3: Both Delivery */}
                <button
                  type="button"
                  onClick={() => onOpenChat('Send me the brochure and a video.')}
                  className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 text-left transition hover:bg-stone-50 hover:border-stone-400 hover:shadow-2xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-200 group-hover:scale-105 transition">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-900">Brochure + Video</span>
                      <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[9px] font-mono font-medium text-amber-900">Both Formats</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                      &quot;Send me the brochure and a video.&quot;
                    </p>
                  </div>
                </button>

                {/* Prompt 4: Package Breakdown */}
                <button
                  type="button"
                  onClick={() => onOpenChat('What is included in the package?')}
                  className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 text-left transition hover:bg-stone-50 hover:border-stone-400 hover:shadow-2xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-200 text-stone-800 group-hover:scale-105 transition">
                    <ParachuteSvg className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-900">Package Inclusions</span>
                      <span className="rounded bg-stone-200 px-1.5 py-0.2 text-[9px] font-mono font-medium text-stone-700">Text Only</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                      &quot;What is included in the package?&quot;
                    </p>
                  </div>
                </button>

                {/* Prompt 5: Scuba & Safety */}
                <button
                  type="button"
                  onClick={() => onOpenChat('What are the weight and age requirements, and what is the scuba rule?')}
                  className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 text-left transition hover:bg-stone-50 hover:border-stone-400 hover:shadow-2xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:scale-105 transition">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-900">Safety & 24h Scuba</span>
                      <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-mono font-medium text-emerald-800">USPA Rules</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                      &quot;Weight, age and scuba rule?&quot;
                    </p>
                  </div>
                </button>

                {/* Prompt 6: GoPro & Spectators */}
                <button
                  type="button"
                  onClick={() => onOpenChat('Can I bring my own GoPro or phone, and can friends watch?')}
                  className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 text-left transition hover:bg-stone-50 hover:border-stone-400 hover:shadow-2xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-200 text-stone-800 group-hover:scale-105 transition">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-900">GoPros & Free Lockers</span>
                      <span className="rounded bg-stone-200 px-1.5 py-0.2 text-[9px] font-mono font-medium text-stone-700">Dropzone Policy</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                      &quot;Can I bring my GoPro & can friends watch?&quot;
                    </p>
                  </div>
                </button>

              </div>
            </div>
          )}

          {/* TAB 2: Rates at a Glance */}
          {activeTab === 'rates' && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500">Tier 01</div>
                <div className="mt-1 text-base font-bold text-stone-900">Eco Tandem Skydive</div>
                <div className="mt-2 text-2xl font-bold font-display text-stone-950">10,500 <span className="text-sm font-normal text-stone-500">THB</span></div>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  13,000 ft jump with USPA tandem master, jumpsuit, goggles, and achievement certificate.
                </p>
                <button
                  onClick={() => onOpenChat('Tell me more about the Eco package')}
                  className="mt-3 text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
                >
                  <span>Ask in Chat</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="rounded-xl border border-amber-300 bg-amber-50/40 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-800">Tier 02</span>
                  <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-semibold text-amber-800">Most Popular</span>
                </div>
                <div className="mt-1 text-base font-bold text-stone-900">Handycam Pro Package</div>
                <div className="mt-2 text-2xl font-bold font-display text-stone-950">12,500 <span className="text-sm font-normal text-stone-500">THB</span></div>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  Everything in Eco + instructor wrist-mounted wide-angle HD camera capturing 50+ photos & edited video.
                </p>
                <button
                  onClick={() => onOpenChat('Tell me more about the Handycam package')}
                  className="mt-3 text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1"
                >
                  <span>Ask in Chat</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500">Tier 03</span>
                  <span className="rounded bg-stone-200 px-1.5 py-0.2 text-[10px] font-semibold text-stone-800">Save 3,050 THB</span>
                </div>
                <div className="mt-1 text-base font-bold text-stone-900">VIP Sea View Cine-Pack</div>
                <div className="mt-2 text-2xl font-bold font-display text-stone-950">14,000 <span className="text-sm font-normal line-through text-stone-400">17,050</span> <span className="text-sm font-normal text-stone-500">THB</span></div>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  Instructor Handycam + dedicated outside cameraman flying with you, 4K cinematic video & 100+ photos.
                </p>
                <button
                  onClick={() => onOpenChat('Tell me more about the VIP Cine-Pack')}
                  className="mt-3 text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
                >
                  <span>Ask in Chat</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: Dropzone Guarantees & Facilities */}
          {activeTab === 'guarantees' && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <CloudSun className="h-4 w-4 text-amber-700" />
                  <span>Weather Guarantee</span>
                </div>
                <p className="mt-2 text-stone-600 leading-relaxed">
                  If adverse wind or cloud ceilings pause jumps, reschedule for free within 12 months or receive an immediate 100% full refund.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Car className="h-4 w-4 text-amber-700" />
                  <span>Hotel & Transit Options</span>
                </div>
                <p className="mt-2 text-stone-600 leading-relaxed">
                  Convenient round-trip transfers from central Pattaya hotels and fixed-price private vehicle transit from Bangkok hotels or BKK Airport.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span>100% USPA Dual Rigs</span>
                </div>
                <p className="mt-2 text-stone-600 leading-relaxed">
                  Every harness is fitted with a main canopy, a reserve canopy, and a Cypress 2 Automatic Activation Device (AAD) for computerized safety.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Lock className="h-4 w-4 text-amber-700" />
                  <span>Viewing Lounge & Lockers</span>
                </div>
                <p className="mt-2 text-stone-600 leading-relaxed">
                  Family/friends are welcome in our shaded spectator area. Free secure lockers provided for wallets, phones, and personal luggage.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* 5 High-Impact Metric Cards with Hand-Crafted SVGs */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-900">
              <AltitudePlaneSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">13,000 FT</div>
            <div className="text-xs font-semibold text-stone-700">Exit Altitude</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">Scenic flight over Pattaya Bay</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-900">
              <SpeedometerSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">220 KM/H</div>
            <div className="text-xs font-semibold text-stone-700">Terminal Freefall</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">45–60 sec pure adrenaline rush</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-900">
              <CoastlineWaveSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">360° SEA</div>
            <div className="text-xs font-semibold text-stone-700">Canopy Glide</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">5–7 min glide over Koh Larn</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-900">
              <SafetyShieldSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">USPA 100%</div>
            <div className="text-xs font-semibold text-stone-700">Safety Certified</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">Cypress 2 AAD automatic backup</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:shadow-xs transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-900">
              <CameraShutterSvg className="h-5 w-5" />
            </div>
            <div className="mt-3 text-2xl font-bold font-display text-stone-950">4K MEDIA</div>
            <div className="text-xs font-semibold text-stone-700">Photo & Video</div>
            <p className="mt-1 text-[11px] text-stone-500 leading-tight">Wrist cam & outside cameraman</p>
          </div>

        </div>

      </div>
    </section>
  );
};
