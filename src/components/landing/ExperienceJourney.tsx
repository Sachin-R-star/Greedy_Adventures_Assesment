'use client';

import React, { useState } from 'react';
import {
  AltitudePlaneSvg,
  SpeedometerSvg,
  CoastlineWaveSvg,
  ParachuteSvg,
  CertificateSvg,
  SafetyShieldSvg
} from '@/components/common/SvgIcons';
import {
  Clock,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Compass,
  Wind
} from 'lucide-react';

interface ExperienceJourneyProps {
  onOpenChat?: (query?: string) => void;
}

export const ExperienceJourney: React.FC<ExperienceJourneyProps> = ({ onOpenChat }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      phase: 'Ground Phase',
      altitude: '0 FT (Sea Level)',
      title: 'Arrival & Manifest Check-in',
      duration: '20 mins',
      icon: SafetyShieldSvg,
      desc: 'Arrive at the Pattaya coastal dropzone. Complete manifest check-in, identity verification, and health waiver. Place personal belongings in our free secure lockers.',
      prompt: 'What happens during arrival and check-in at the dropzone?'
    },
    {
      num: '02',
      phase: 'Preparation Phase',
      altitude: '0 FT (Briefing Hangar)',
      title: 'Safety Briefing & Jumpsuit Fitting',
      duration: '20 mins',
      icon: CertificateSvg,
      desc: 'Meet your USPA tandem master. Practice the body posture ("banana arch") for aircraft exit and learn safe landing flare maneuvers. Get fitted with harness, jumpsuit, and skydiving goggles.',
      prompt: 'What safety briefing and gear fitting is required?'
    },
    {
      num: '03',
      phase: 'Ascent Phase',
      altitude: 'Climbing to 13,000 FT',
      title: 'Scenic Coastal Aircraft Ascent',
      duration: '15 mins',
      icon: AltitudePlaneSvg,
      desc: 'Climb aboard our turbine jump aircraft. Enjoy a breathtaking 15-minute flight ascending over Pattaya Bay, Koh Larn island, and the turquoise waters of the Gulf of Thailand.',
      prompt: 'Tell me about the scenic flight ascent to 13,000 feet.'
    },
    {
      num: '04',
      phase: 'Freefall Phase',
      altitude: '13,000 FT → 5,000 FT',
      title: 'The Leap & 220 km/h Freefall',
      duration: '45–60 sec',
      icon: SpeedometerSvg,
      desc: 'Step out into the open sky strapped securely to your instructor. Experience 60 exhilarating seconds of terminal velocity freefall reaching 220 km/h with 360° ocean panoramas.',
      prompt: 'How long is the freefall and what is the speed?'
    },
    {
      num: '05',
      phase: 'Canopy Phase',
      altitude: '5,000 FT → 500 FT',
      title: 'Serene Canopy Coastal Glide',
      duration: '5–7 mins',
      icon: ParachuteSvg,
      desc: 'The oversized tandem parachute deploys smoothly at 5,000 feet. Enjoy a peaceful, silent descent along the Pattaya shoreline. Your instructor will even let you steer the toggles!',
      prompt: 'Can I steer the parachute during canopy flight?'
    },
    {
      num: '06',
      phase: 'Touchdown Phase',
      altitude: '0 FT (Beachside Dropzone)',
      title: 'Beachside Landing & Media Handover',
      duration: '15 mins',
      icon: CoastlineWaveSvg,
      desc: 'Execute a gentle tiptoe touchdown on the coastal landing strip. Celebrate with your instructor, receive your personalized Skydiving Certificate, and collect your 4K media footage.',
      prompt: 'When do I get my photos and video after landing?'
    }
  ];

  return (
    <section id="journey" className="py-20 md:py-28 border-t border-stone-200 bg-white relative overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-700">
              <Compass className="h-3.5 w-3.5 text-amber-600" />
              <span>Flight Path & Dropzone Timeline</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              From Ground Briefing to Coastal Touchdown
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed">
              Total dropzone commitment is approximately <strong>3 to 4 hours</strong>. Every phase is strictly regulated under USPA safety protocols and guided by certified tandem masters.
            </p>
          </div>

          {/* Quick Chatbot Trigger */}
          {onOpenChat && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onOpenChat('What is the complete step-by-step timeline and duration of the skydiving experience?')}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-stone-800 transition hover:bg-stone-100 hover:border-stone-400 shadow-2xs"
              >
                <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
                <span>Ask Chatbot: Full Timeline Details</span>
              </button>
            </div>
          )}
        </div>

        {/* Elevation / Altitude Profile Strip */}
        <div className="mt-12 rounded-2xl border border-stone-200 bg-[#fafaf9] p-4 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <Wind className="h-3.5 w-3.5 text-amber-600" />
              Flight Altitude Profile (Sea Level to 13,000 FT)
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-stone-500">
              Interactive Roadmap: Select any step to inspect
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {steps.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col p-3 rounded-xl text-left transition-all ${
                  activeStep === idx
                    ? 'bg-stone-950 text-white shadow-sm ring-2 ring-stone-950/20'
                    : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={activeStep === idx ? 'text-amber-400 font-bold' : 'text-stone-400'}>
                    STEP {step.num}
                  </span>
                  <span className={activeStep === idx ? 'text-stone-300' : 'text-stone-500'}>
                    {step.duration}
                  </span>
                </div>
                <span className="mt-1 text-xs font-bold truncate">
                  {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                </span>
                <span className={`text-[10px] truncate mt-0.5 ${activeStep === idx ? 'text-stone-400' : 'text-stone-500'}`}>
                  {step.altitude}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 6-step Detailed Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative flex flex-col justify-between rounded-2xl bg-white p-7 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-2 border-stone-950 shadow-lg ring-4 ring-stone-950/5 scale-[1.01]'
                    : 'border border-stone-200 shadow-2xs hover:border-stone-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-stone-400">
                      STEP {step.num}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-stone-100 border border-stone-200 px-2.5 py-0.5 text-[11px] font-semibold text-stone-700">
                        {step.duration}
                      </span>
                      <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                        {step.altitude}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
                      isSelected
                        ? 'bg-stone-950 text-white border-stone-950'
                        : 'bg-stone-50 border-stone-200 text-stone-800'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                        {step.phase}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 leading-snug">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {onOpenChat && (
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenChat(step.prompt);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 hover:text-orange-900 transition underline"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>Ask Concierge About Step {step.num}</span>
                    </button>
                    <ArrowRight className="h-3 w-3 text-stone-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Experience Summary Metric Bar */}
        <div className="mt-12 rounded-2xl border border-stone-200 bg-[#1c1917] p-6 text-white shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-2 md:pt-0">
              <span className="block font-mono text-2xl font-extrabold text-amber-400">13,000 FT</span>
              <span className="text-xs text-stone-400 uppercase tracking-wider mt-1 block">Jump Altitude</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block font-mono text-2xl font-extrabold text-white">220 KM/H</span>
              <span className="text-xs text-stone-400 uppercase tracking-wider mt-1 block">Terminal Velocity Freefall</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block font-mono text-2xl font-extrabold text-amber-400">5–7 MINS</span>
              <span className="text-xs text-stone-400 uppercase tracking-wider mt-1 block">Coastal Canopy Flight</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block font-mono text-2xl font-extrabold text-white">3–4 HOURS</span>
              <span className="text-xs text-stone-400 uppercase tracking-wider mt-1 block">Total Dropzone Commitment</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};