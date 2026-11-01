'use client';

import React, { useState } from 'react';
import {
  ParachuteSvg,
  CameraShutterSvg,
  CertificateSvg,
  SafetyShieldSvg
} from '../common/SvgIcons';
import { Check, MessageSquare, FileText, Download } from 'lucide-react';

type PackageTier = 'eco' | 'handycam' | 'vip';

interface PackagesProps {
  onOpenChat: (query?: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onOpenChat }) => {
  const [selectedTier, setSelectedTier] = useState<PackageTier>('handycam');

  return (
    <section id="packages" className="py-16 md:py-24 bg-[#fafaf9] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full bg-stone-200/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-700">
            Tandem Jump Packages & Rates
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
            Choose Your Experience
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Every package includes a 13,000-ft jump strapped securely to a USPA instructor. Click any package below to inspect and select options.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
            <button
              onClick={() => onOpenChat('What is included in the package?')}
              className="inline-flex items-center gap-1.5 font-semibold text-orange-600 hover:text-orange-700 underline"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Ask in Chat: "What is included in the package?"</span>
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={() => onOpenChat('Can you send me a brochure?')}
              className="inline-flex items-center gap-1.5 font-semibold text-stone-700 hover:text-stone-900 underline"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Request Brochure in Chat</span>
            </button>
          </div>
        </div>

        {/* 3 Package Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          
          {/* TIER 1: ECO TANDEM SKYDIVE */}
          <div
            role="button"
            tabIndex={0}
            aria-pressed={selectedTier === 'eco'}
            onClick={() => setSelectedTier('eco')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedTier('eco');
              }
            }}
            className={`relative flex flex-col justify-between rounded-2xl bg-white p-7 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
              selectedTier === 'eco'
                ? 'border-2 border-stone-950 shadow-xl ring-4 ring-stone-950/5 scale-[1.02] lg:-translate-y-2.5 z-10'
                : 'border border-stone-200 shadow-xs hover:border-stone-400 hover:shadow-md'
            }`}
          >
            {/* Top Selection Pill */}
            {selectedTier === 'eco' && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-stone-950 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1.5 transition-all">
                <span>✓</span> Selected Option
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">
                  ESSENTIAL
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {selectedTier === 'eco' ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active
                    </span>
                  ) : (
                    'Jump Only'
                  )}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-stone-900">Eco Tandem Skydive</h3>
              <p className="mt-1 text-xs text-stone-500">
                Pure adrenaline for minimalist thrill-seekers. Focus on the raw feeling of freefall.
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-stone-900">10,500</span>
                <span className="text-sm font-semibold text-stone-500">THB</span>
              </div>
              <div className="text-[11px] text-stone-400">Fixed dropzone fee</div>

              <div className="mt-6 space-y-3 border-t border-stone-100 pt-6 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>13,000-ft tandem jump with USPA instructor</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>20-minute safety orientation & harness fitting</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Full flight gear (jumpsuit, goggles, altimeter)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Personalized Skydiving Certificate</span>
                </div>
                <div className="flex items-start gap-3 text-stone-400">
                  <span className="text-xs mt-0.5">✕</span>
                  <span className="text-xs">No photos or video included</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier('eco');
                  onOpenChat('Tell me more about the Eco Tandem Skydive package (10,500 THB)');
                }}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                  selectedTier === 'eco'
                    ? 'bg-stone-950 text-white shadow-sm hover:bg-stone-800'
                    : 'border border-stone-300 bg-stone-50/50 text-stone-800 hover:bg-stone-100 hover:border-stone-400'
                }`}
              >
                <MessageSquare className={`h-3.5 w-3.5 ${selectedTier === 'eco' ? 'text-white' : 'text-stone-500'}`} />
                <span>Ask Concierge About Eco</span>
              </button>
            </div>
          </div>

          {/* TIER 2: HANDYCAM PRO */}
          <div
            role="button"
            tabIndex={0}
            aria-pressed={selectedTier === 'handycam'}
            onClick={() => setSelectedTier('handycam')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedTier('handycam');
              }
            }}
            className={`relative flex flex-col justify-between rounded-2xl bg-white p-7 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
              selectedTier === 'handycam'
                ? 'border-2 border-stone-950 shadow-xl ring-4 ring-stone-950/5 scale-[1.02] lg:-translate-y-2.5 z-10'
                : 'border border-stone-200 shadow-xs hover:border-stone-400 hover:shadow-md'
            }`}
          >
            {/* Top Pill: Always visible, styled prominently when active */}
            {selectedTier === 'handycam' ? (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-stone-950 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1.5 transition-all">
                <span>★</span> Most Popular
              </div>
            ) : (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-stone-100 border border-stone-300 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600 transition-all">
                ★ Most Popular
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 border border-orange-200">
                  INSTRUCTOR POV
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-stone-600">
                  {selectedTier === 'handycam' ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active
                    </span>
                  ) : (
                    <>
                      <CameraShutterSvg className="h-3.5 w-3.5" />
                      HD Video + Photos
                    </>
                  )}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-stone-900">Handycam Pro</h3>
              <p className="mt-1 text-xs text-stone-500">
                Captures every expression up-close from exit through freefall to canopy landing.
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-stone-900">12,500</span>
                <span className="text-sm font-semibold text-stone-500">THB</span>
              </div>
              <div className="text-[11px] text-stone-500">Best for personal social sharing</div>

              <div className="mt-6 space-y-3 border-t border-stone-100 pt-6 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span className="font-semibold text-stone-900">Everything in Eco Tandem Jump</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Wrist-mounted HD wide-angle camera on instructor</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Captures exit, facial reactions & canopy flight</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>50+ high-resolution digital photos</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Edited 1080p full HD highlight video</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier('handycam');
                  onOpenChat('Can I see more details about the Handycam Pro Package (12,500 THB)?');
                }}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                  selectedTier === 'handycam'
                    ? 'bg-stone-950 text-white shadow-sm hover:bg-stone-800'
                    : 'border border-stone-300 bg-stone-50/50 text-stone-800 hover:bg-stone-100 hover:border-stone-400'
                }`}
              >
                <MessageSquare className={`h-3.5 w-3.5 ${selectedTier === 'handycam' ? 'text-white' : 'text-stone-500'}`} />
                <span>Ask Concierge About Handycam</span>
              </button>
            </div>
          </div>

          {/* TIER 3: VIP SEA VIEW CINE-PACK */}
          <div
            role="button"
            tabIndex={0}
            aria-pressed={selectedTier === 'vip'}
            onClick={() => setSelectedTier('vip')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedTier('vip');
              }
            }}
            className={`relative flex flex-col justify-between rounded-2xl bg-white p-7 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
              selectedTier === 'vip'
                ? 'border-2 border-stone-950 shadow-xl ring-4 ring-stone-950/5 scale-[1.02] lg:-translate-y-2.5 z-10'
                : 'border border-stone-200 shadow-xs hover:border-stone-400 hover:shadow-md'
            }`}
          >
            {/* Top Selection Pill */}
            {selectedTier === 'vip' && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-stone-950 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1.5 transition-all">
                <span>★</span> Selected: VIP Cine-Pack
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700">
                  CINEMATIC 360°
                </span>
                <span className="flex items-center gap-2">
                  {selectedTier === 'vip' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active
                    </span>
                  )}
                  <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                    Save 3,050 THB
                  </span>
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-stone-900">VIP Sea View Cine-Pack</h3>
              <p className="mt-1 text-xs text-stone-500">
                Cinematic outside cameraman flying around you in freefall with 4K footage.
              </p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-orange-600">14,000</span>
                <span className="text-sm font-semibold text-stone-500">THB</span>
                <span className="text-sm text-stone-400 line-through">17,050 THB</span>
              </div>
              <div className="text-[11px] text-stone-500">Promotional package for Pattaya Sea View</div>

              <div className="mt-6 space-y-3 border-t border-stone-100 pt-6 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span className="font-semibold text-stone-900">Everything in Eco + Handycam POV</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span className="font-medium text-stone-900">
                    Dedicated outside cameraman leaps with you
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Cinematic 360° freefall angles & ocean coastline views</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>4K edited highlight reel + 100+ high-res photos</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Greedy Adventures commemorative souvenir</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTier('vip');
                  onOpenChat('What are the full details and savings on the VIP Sea View Cine-Pack?');
                }}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
                  selectedTier === 'vip'
                    ? 'bg-stone-950 text-white shadow-sm hover:bg-stone-800'
                    : 'border border-orange-200 bg-orange-50/40 text-orange-800 hover:bg-orange-100/60'
                }`}
              >
                <MessageSquare className={`h-3.5 w-3.5 ${selectedTier === 'vip' ? 'text-white' : 'text-orange-600'}`} />
                <span>Ask Concierge About VIP Cine-Pack</span>
              </button>
            </div>
          </div>

        </div>

        {/* Clean Brochure Download Box */}
        <div className="mt-12 rounded-xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-stone-100 text-stone-800 border border-stone-200">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-stone-900">Need the Complete Pricing & Specifications Guide?</h4>
              <p className="text-xs text-stone-500">
                Download the official 2026 information brochure directly or ask our chatbot to deliver it in chat.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onOpenChat('Can you send me a brochure?')}
              className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Ask Chatbot for Brochure</span>
            </button>
            <a
              href="/assets/brochure/sea-view-skydiving-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Direct PDF Download</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
