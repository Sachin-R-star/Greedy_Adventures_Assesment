'use client';

import React from 'react';
import {
  AltitudePlaneSvg,
  SpeedometerSvg,
  CoastlineWaveSvg,
  ParachuteSvg,
  CertificateSvg,
  SafetyShieldSvg
} from '@/components/common/SvgIcons';

export const ExperienceJourney: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Arrival & Check-in',
      duration: '20 mins',
      icon: SafetyShieldSvg,
      desc: 'Arrive at the Pattaya coastal dropzone. Complete registration, health waiver, and meet your USPA-certified tandem master.'
    },
    {
      num: '02',
      title: 'Safety Briefing & Jumpsuit',
      duration: '20 mins',
      icon: CertificateSvg,
      desc: 'Master the proper aircraft exit posture, freefall body positioning ("banana arch"), and safe landing flare techniques.'
    },
    {
      num: '03',
      title: 'Ascent to 13,000 Feet',
      duration: '15 mins',
      icon: AltitudePlaneSvg,
      desc: 'Climb above Pattaya Bay, Koh Larn island, and the turquoise Gulf of Thailand in our specially maintained jump aircraft.'
    },
    {
      num: '04',
      title: 'The Leap & 220 km/h Freefall',
      duration: '45–60 sec',
      icon: SpeedometerSvg,
      desc: 'Step into open sky with your tandem master and cameraman, experiencing pure terminal velocity adrenaline over the ocean.'
    },
    {
      num: '05',
      title: 'Canopy Glide Over the Coast',
      duration: '5–7 mins',
      icon: ParachuteSvg,
      desc: 'The parachute deploys smoothly at 5,000 ft. Enjoy a quiet, panoramic glide and take the steering toggles for gentle turns.'
    },
    {
      num: '06',
      title: 'Coastal Touchdown & Certificate',
      duration: '15 mins',
      icon: CoastlineWaveSvg,
      desc: 'Smooth tiptoe landing right by the shore. Receive your personalized USPA Certificate and download your full photo & video reel.'
    }
  ];

  return (
    <section id="journey" className="py-24 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Step-by-Step Experience
          </p>
          <h2 className="mt-2 text-3xl font-serif font-bold text-stone-900 sm:text-4xl">
            From ground briefing to coastal touchdown
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            The full dropzone experience takes approximately 3 to 4 hours. Every phase is managed by licensed tandem masters for maximum comfort and safety.
          </p>
        </div>

        {/* 6-step Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-xl border border-stone-200 bg-stone-50/60 p-6 transition duration-200 hover:border-stone-300 hover:bg-stone-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-stone-400">
                    Step {step.num}
                  </span>
                  <span className="rounded-full bg-stone-200/70 px-2.5 py-0.5 text-[11px] font-medium text-stone-700">
                    {step.duration}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-stone-900">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
