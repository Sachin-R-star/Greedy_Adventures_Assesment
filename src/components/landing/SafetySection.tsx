'use client';

import React from 'react';
import { ShieldCheck, AlertCircle, HeartPulse, Scale, Clock, Award } from 'lucide-react';

export const SafetySection: React.FC = () => {
  return (
    <section id="safety" className="py-20 border-t border-slate-900 bg-slate-950/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-500/20">
            Safety First & USPA Standards
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Uncompromising Safety & Health Protocols
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed font-light">
            Our dropzone operates with a 100% safety record adhering strictly to the United States Parachute Association (USPA) standards.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">Dual-Parachute & Cypress AAD</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Every tandem rig includes a main parachute, a reserve canopy, and a Cypress 2 Automatic Activation Device (AAD) which deploys the reserve canopy automatically if ever needed.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">USPA Certified Instructors</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              All tandem masters hold active international USPA tandem ratings with a minimum of 1,000+ completed jumps and rigorous annual recurrency training.
            </p>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-slate-900/60 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">24-Hour Scuba Diving Rule</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              <strong className="text-rose-300">Strict Rule:</strong> You must NOT participate in scuba diving within 24 hours prior to skydiving to prevent decompression sickness (the bends).
            </p>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/60 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">Weight & Age Requirements</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Minimum age is 10 (under 18 requires parental waiver). Maximum weight limit is 100 kg. Surcharges apply for 95–100 kg for instructor equipment balancing.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
