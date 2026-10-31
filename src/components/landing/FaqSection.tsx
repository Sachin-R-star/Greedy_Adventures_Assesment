'use client';

import React, { useState } from 'react';
import { ChevronDown, Bot, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  onOpenChat: (query?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenChat }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I need any previous skydiving experience?',
      a: 'No prior experience is necessary! You will be harnessed securely to a USPA-certified tandem master who guides you through the entire jump, handles the aircraft exit, freefall stability, parachute deployment, and smooth landing after a brief 20-minute ground briefing.'
    },
    {
      q: 'What is the difference between the Handycam and VIP Cine-Pack packages?',
      a: 'The Handycam Pro (12,500 THB) uses a wrist-mounted wide-angle camera worn by your instructor for POV close-ups. The VIP Cine-Pack (14,000 THB) includes both the instructor Handycam PLUS an independent outside cameraman who jumps alongside you in freefall, capturing sweeping 360-degree movie-quality angles and coastal panoramas.'
    },
    {
      q: 'What happens if the weather is bad on my booking date?',
      a: 'Skydiving requires safe visibility and wind conditions. If rain or low cloud ceilings occur, jumps are held or rescheduled. You can reschedule to any date within 12 months for free or request a 100% full refund of any prepaid amount.'
    },
    {
      q: 'What should I wear on the jump day?',
      a: 'Wear comfortable athletic attire suitable for warm weather (t-shirt, shorts or sweatpants) and secure, lace-up athletic sneakers. Sandals, flip-flops, high heels, and loose jewelry are not permitted.'
    },
    {
      q: 'Why can’t I scuba dive 24 hours before skydiving?',
      a: 'Scuba diving saturates your body tissues with inert nitrogen gas under high underwater pressure. Ascending rapidly to 13,000 feet in an unpressurized aircraft within 24 hours can cause nitrogen bubbles to expand in your bloodstream, triggering decompression sickness (the bends).'
    }
  ];

  return (
    <section id="faq" className="py-20 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Everything You Need to Know
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Have another question? Our AI concierge is ready to answer with instant verified facts.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-slate-100 hover:text-cyan-300 transition"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-slate-300 border-t border-slate-800/60">
                    <p>{faq.a}</p>
                    <div className="mt-3 pt-2">
                      <button
                        onClick={() => onOpenChat(faq.q)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 hover:underline"
                      >
                        <Bot className="h-3 w-3" />
                        <span>Ask AI assistant for more context on this</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
