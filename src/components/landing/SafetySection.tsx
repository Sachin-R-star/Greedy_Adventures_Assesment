'use client';

import React, { useState } from 'react';
import { SafetyShieldSvg, CertificateSvg, ParachuteSvg } from '@/components/common/SvgIcons';
import {
  Clock,
  Scale,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';

interface SafetySectionProps {
  onOpenChat?: (query?: string) => void;
}

export const SafetySection: React.FC<SafetySectionProps> = ({ onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'protocols' | 'eligibility' | 'checklist'>('protocols');

  return (
    <section id="safety" className="py-20 md:py-28 border-t border-stone-200 bg-[#fafaf9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-700 shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>USPA Certified Dropzone #TH-204 • 100% Safety Compliance</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              Uncompromising Safety Protocols
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed">
              Our dropzone operates with a pristine safety record under strict United States Parachute Association (USPA) regulations. Every jump is executed with computerized safety devices and dual-canopy parachute systems.
            </p>
          </div>

          {/* Quick Chatbot Trigger */}
          {onOpenChat && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onOpenChat('What are the safety protocols, weight limits, age criteria, and 24-hour scuba diving rules?')}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-800"
              >
                <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
                <span>Ask Chatbot: Safety Criteria</span>
              </button>
            </div>
          )}
        </div>

        {/* Interactive Tab Switcher */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('protocols')}
            className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'protocols'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            01. Safety Gear & Standards
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('eligibility')}
            className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'eligibility'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            02. Weight, Age & Scuba Rules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'checklist'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            03. Pre-Jump Checklist & Weather Guarantee
          </button>
        </div>

        {/* TAB 1: PROTOCOLS */}
        {activeTab === 'protocols' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="rounded-2xl border border-stone-200 bg-white p-7 shadow-xs transition hover:shadow-md hover:border-stone-300 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <SafetyShieldSvg className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-stone-900">
                  Dual Canopies & Cypress 2 AAD
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  Every harness is fitted with a main oversized parachute, an independently packed reserve parachute, and a computerized Cypress 2 Automatic Activation Device (AAD) that automatically deploys if required.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  100% Rig Redundancy
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7 shadow-xs transition hover:shadow-md hover:border-stone-300 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 border border-stone-200 text-stone-800">
                  <CertificateSvg className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-stone-900">
                  USPA Tandem Masters (1,000+ Jumps)
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  Every instructor holds international United States Parachute Association tandem master credentials, has logged over 1,000 jumps, and completes regular equipment recertifications.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <span className="text-[11px] font-mono font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  Bi-Annual Recertified
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7 shadow-xs transition hover:shadow-md hover:border-stone-300 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 border border-orange-200 text-orange-800">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-stone-900">
                  Strict 24-Hour Scuba Rule
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  You must NOT scuba dive within 24 hours prior to skydiving. High-pressure underwater nitrogen requires 24 hours to clear to prevent decompression sickness (the bends) during rapid ascent to 13,000 ft.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <span className="text-[11px] font-mono font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  Strict Health Rule
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-7 shadow-xs transition hover:shadow-md hover:border-stone-300 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-800">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-stone-900">
                  Weight & Rig Balancing
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  Maximum weight limit is 100 kg (220 lbs) proportional to height for safe harness fitting. A minor surcharge applies between 95–100 kg to balance instructor canopy flight dynamics.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <span className="text-[11px] font-mono font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Max 100 KG Limit
                </span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ELIGIBILITY MATRIX */}
        {activeTab === 'eligibility' && (
          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-7 shadow-xs">
            <h3 className="text-xl font-bold text-stone-900">
              Detailed Guest Eligibility Matrix
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Review our dropzone health and physiological criteria before jump day.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-100">
              
              <div className="space-y-3 pt-4 md:pt-0">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-800 block">
                  Age & Documentation
                </span>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Minimum Age:</strong> 10 years old.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Under 18:</strong> Parent or legal guardian must accompany and sign the consent waiver.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>ID Requirement:</strong> Valid physical passport or Thai national ID required at check-in.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-800 block">
                  Weight & Gear Balancing
                </span>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Maximum Weight:</strong> 100 kg (220 lbs).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>95 kg to 100 kg:</strong> Minor surcharge applies for instructor equipment balancing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Harness fit is confirmed by your tandem master during gear rehearsal.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-800 block">
                  Medical Restrictions
                </span>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span><strong>Scuba Diving:</strong> Absolutely no scuba diving within 24 hours prior to jump.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Not permitted for pregnant women, participants with acute cardiac conditions, severe spine trauma, or epilepsy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Zero alcohol or recreational substances within 12 hours prior to jumping.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: CHECKLIST & WEATHER */}
        {activeTab === 'checklist' && (
          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-7 shadow-xs">
            <h3 className="text-xl font-bold text-stone-900">
              Pre-Jump Guest Checklist & Weather Protection
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Everything you need to know for a seamless jump day at the Pattaya dropzone.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2">
                  What to Wear & Bring
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Wear comfortable active sportswear (shorts/t-shirt) and <strong>lace-up running sneakers</strong>. Sandals, flip-flops, high heels, and dangling jewelry are strictly prohibited. We supply custom flight jumpsuits and over-glasses goggles.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2">
                  Spectator Lounge & Lockers
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Friends and family are welcome to watch your aircraft takeoff and beach parachute landing from our shaded spectator lounge. <strong>Free secure lockers</strong> are provided on site for your phones, wallets, and bags.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                  100% Weather Refund Guarantee
                </span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Skydiving operations depend entirely on clear coastal winds and visibility. If adverse weather causes a delay, you can reschedule for free within 12 months or claim an immediate <strong>100% full refund</strong>.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Safety Assurance Strip */}
        <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Have specific health or weight questions?</h4>
              <p className="text-xs text-stone-500">Ask our AI dropzone concierge for instant verified guidance grounded on our official safety policies.</p>
            </div>
          </div>
          {onOpenChat && (
            <button
              type="button"
              onClick={() => onOpenChat('What are the clothing requirements and can I wear glasses while skydiving?')}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition shadow-2xs shrink-0"
            >
              <MessageSquare className="h-3.5 w-3.5 text-stone-600" />
              <span>Ask About Glasses & Clothing</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};