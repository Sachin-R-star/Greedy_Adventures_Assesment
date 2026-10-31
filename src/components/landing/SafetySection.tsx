'use client';

import React from 'react';
import { SafetyShieldSvg, CertificateSvg } from '@/components/common/SvgIcons';
import { Clock, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SafetySection: React.FC = () => {
  return (
    <section id="safety" className="py-24 border-t border-stone-200 bg-[#fafaf9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Certified Standards
          </p>
          <h2 className="mt-2 text-3xl font-serif font-bold text-stone-900 sm:text-4xl">
            Uncompromising safety protocols
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Our dropzone operates with a pristine safety record under strict United States Parachute Association (USPA) guidelines.
          </p>
        </div>

        {/* 4 Protocol Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-800">
              <SafetyShieldSvg className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-stone-900">
              Dual Canopies & Cypress 2 AAD
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Every harness is fitted with a main parachute, a certified reserve parachute, and a Cypress 2 computer that automatically deploys if required.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-800">
              <CertificateSvg className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-stone-900">
              USPA Tandem Masters
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Every instructor holds international USPA ratings, has logged over 1,000 jumps, and completes bi-annual equipment and safety recertifications.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-800">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-stone-900">
              24-Hour Scuba Rule
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              You must not scuba dive within 24 hours prior to skydiving to prevent decompression sickness (the bends) during rapid ascent to 13,000 ft.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-800">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-stone-900">
              Weight & Age Criteria
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Minimum age is 10 (parental consent needed under 18). Maximum weight is 100 kg. Surcharges apply for 95–100 kg for safety rigging balancing.
            </p>
          </div>

        </div>

        {/* Safety checklist box */}
        <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
            <span>Pre-Jump Checklist for Guests</span>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
            <div>
              <strong className="text-stone-800 block mb-0.5">Footwear & Attire</strong>
              Wear lace-up running shoes and comfortable sportswear. No sandals or jewelry.
            </div>
            <div>
              <strong className="text-stone-800 block mb-0.5">Identification</strong>
              Carry a valid physical passport or Thai national ID for manifest registration.
            </div>
            <div>
              <strong className="text-stone-800 block mb-0.5">Weather Guarantee</strong>
              If sea clouds or high winds delay your slot, reschedule anytime or request a full refund.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
