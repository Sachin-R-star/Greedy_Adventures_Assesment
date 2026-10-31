'use client';

import React from 'react';
import { Plane, Compass, Wind, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export const ExperienceJourney: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Arrival & Check-in',
      duration: '20 Mins',
      desc: 'Arrive at the Pattaya coastal dropzone. Complete safety waiver registration and meet your USPA-certified tandem master.'
    },
    {
      num: '02',
      title: 'Safety Briefing & Gearing Up',
      duration: '20 Mins',
      desc: 'Learn proper aircraft exit postures, freefall body positioning ("banana arch"), and canopy landing techniques in custom fitted jumpsuits.'
    },
    {
      num: '03',
      title: 'Ascent to 13,000 Feet',
      duration: '15 Mins',
      desc: 'Board the jump aircraft for a scenic flight climbing over Pattaya Bay, Koh Larn island, and the glistening turquoise Gulf of Thailand.'
    },
    {
      num: '04',
      title: 'The Leap & 220 km/h Freefall',
      duration: '45-60 Sec',
      desc: 'Exit the aircraft into the sky! Experience the pure euphoria of terminal velocity freefall with your personal cameraman capturing every second.'
    },
    {
      num: '05',
      title: 'Canopy Gliding Over the Coast',
      duration: '5-7 Mins',
      desc: 'Parachute deploys smoothly at 5,000 ft. Enjoy a peaceful glide, take the steering toggles for a spin, and soak in panoramic 360° views.'
    },
    {
      num: '06',
      title: 'Beachside Landing & Celebration',
      duration: '15 Mins',
      desc: 'Smooth tiptoe touchdown on the landing area. Receive your personalized Skydiving Certificate and collect your high-res photos and video reel.'
    }
  ];

  return (
    <section id="journey" className="py-20 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-500/20">
            Dropzone Itinerary
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your 3 to 4 Hour Skydiving Journey
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
            Every step is managed with military precision by licensed USPA instructors to ensure total safety and unforgettable memories.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition duration-300 hover:border-cyan-500/50 hover:bg-slate-900/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-cyan-500/40 group-hover:text-cyan-400 transition">
                  {step.num}
                </span>
                <span className="rounded-md bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-300 transition">
                {step.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
