'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageSquare, HelpCircle, Database, ArrowRight, Sparkles } from 'lucide-react';
import { ParachuteSvg } from '@/components/common/SvgIcons';

interface FaqSectionProps {
  onOpenChat: (query?: string) => void;
}

type FaqCategory = 'all' | 'packages' | 'safety' | 'logistics';

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenChat }) => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const allFaqs = [
    {
      category: 'packages',
      q: 'Do I need any previous skydiving experience to jump?',
      a: 'No prior experience is necessary! Our jumps are 100% tandem skydives where you are strapped securely to a licensed USPA tandem master who guides you through every step: ground preparation, aircraft ascent, freefall posture, parachute steering, and soft beachside landing.',
      prompt: 'Do I need any previous skydiving experience?'
    },
    {
      category: 'packages',
      q: 'What is included in the Handycam Pro vs. VIP Sea View Cine-Pack?',
      a: 'The Handycam Pro (12,500 THB) uses an instructor wrist-mounted wide-angle camera capturing close-up facial reactions and freefall. The VIP Cine-Pack (14,000 THB, save 3,050 THB) includes BOTH the instructor wrist camera AND an outside professional cameraman who leaps alongside you to capture full cinematic 360° wide-angle ocean panoramas and 4K footage.',
      prompt: 'What is the difference between Handycam Pro and VIP Cine-Pack?'
    },
    {
      category: 'packages',
      q: 'Can I bring my personal phone, selfie stick, or GoPro on the jump?',
      a: 'Under strict international USPA and civil aviation regulations, personal cameras, phones, selfie sticks, and GoPros are STRICTLY PROHIBITED on the aircraft and during the jump. Loose objects at 220 km/h freefall speeds pose serious hazards. We offer professional Handycam Pro and VIP Cine-Pack options to record your jump safely.',
      prompt: 'Can I bring my own GoPro or phone to record the jump?'
    },
    {
      category: 'safety',
      q: 'Why can’t I scuba dive within 24 hours prior to skydiving?',
      a: 'Scuba diving dissolves inert nitrogen into your body tissues under elevated underwater pressure. Rapidly ascending to 13,000 feet in an unpressurized aircraft causes nitrogen bubbles to expand in your bloodstream, leading to painful and dangerous decompression sickness (the bends). A strict 24-hour surface interval is mandatory.',
      prompt: 'Why is there a 24-hour scuba diving rule before skydiving?'
    },
    {
      category: 'safety',
      q: 'What are the exact weight limits and age requirements?',
      a: 'Minimum age is 10 years old (parent/guardian consent required under 18 with photo ID). Maximum weight limit is 100 kg (220 lbs). A small surcharge applies between 95 kg and 100 kg for instructor gear balancing. Jumpers must be in general good health with no acute cardiac conditions, severe spine trauma, or pregnancy.',
      prompt: 'What are the weight limits, age criteria, and health requirements?'
    },
    {
      category: 'logistics',
      q: 'What happens if there is adverse coastal weather or rain on jump day?',
      a: 'Dropzone winds and cloud ceilings are evaluated load-by-load. If adverse weather pauses flights, you have two guaranteed options: 1) Reschedule for free to any future date within 12 months with zero change fees; or 2) Claim an immediate 100% full refund of any prepaid amount.',
      prompt: 'What is your weather guarantee and refund policy if it rains?'
    },
    {
      category: 'logistics',
      q: 'How do I get to the dropzone from Pattaya or Bangkok?',
      a: 'Round-trip transfers from any central Pattaya hotel to the dropzone can be coordinated. For guests traveling from Bangkok (since there is no skydiving inside Bangkok city center), fixed-price private vehicle transfers from Bangkok hotels or Suvarnabhumi Airport (BKK) directly to the dropzone are available upon request. Free parking is also available on site.',
      prompt: 'What hotel transfer and transportation options are available from Pattaya and Bangkok?'
    },
    {
      category: 'logistics',
      q: 'Can my friends and family come along to watch as spectators?',
      a: 'Yes, absolutely! Friends and family are warmly welcome at our Pattaya dropzone. We have a shaded spectator viewing area where supporters can watch your aircraft takeoff and view your beachside parachute landing. We also have an air-conditioned briefing lounge, clean restrooms, refreshments, and free secure lockers for your luggage and valuables.',
      prompt: 'Can friends or family come to watch and are there lockers for luggage?'
    }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? allFaqs
    : allFaqs.filter(f => f.category === activeCategory);

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-700">
            <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
            <span>Dropzone Knowledge Base</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            All answers are strictly verified against our official dropzone operations documentation. Click any question to expand or ask our AI concierge.
          </p>
        </div>

        {/* Category Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeCategory === 'all'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Questions ({allFaqs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('packages')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeCategory === 'packages'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Packages & Cameras (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('safety')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeCategory === 'safety'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Safety & Scuba (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('logistics')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeCategory === 'logistics'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Weather & Transfers (3)
          </button>
        </div>

        {/* Accordion Items */}
        <div className="mt-8 space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-stone-900 bg-white shadow-md'
                    : 'border-stone-200 bg-[#fafaf9] hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left text-sm font-bold text-stone-900 transition"
                >
                  <span className="flex items-center gap-3.5 pr-4">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-bold ${
                      isOpen
                        ? 'bg-stone-950 text-white'
                        : 'bg-stone-200/80 text-stone-700'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs leading-relaxed text-stone-600 border-t border-stone-100">
                    <p className="text-stone-700">{faq.a}</p>
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onOpenChat(faq.prompt)}
                        className="inline-flex items-center gap-1.5 font-semibold text-orange-700 hover:text-orange-900 transition underline"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-orange-600" />
                        <span>Ask AI Assistant for Full Details</span>
                      </button>
                      <span className="text-[11px] font-mono text-stone-400 uppercase">
                        Source: Greedy Adventures Docs
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Knowledge Inspector Callout */}
        <div className="mt-12 rounded-2xl border border-stone-200 bg-[#fafaf9] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-800 shrink-0">
              <Database className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Review Full Backend Knowledge Repository</h4>
              <p className="text-xs text-stone-500">Inspect all 8 ingested website source chunks, token scores, and real-time retrieval logs.</p>
            </div>
          </div>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition shadow-xs shrink-0"
          >
            <span>Open Knowledge Inspector</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};