'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';
import { ParachuteSvg } from '@/components/common/SvgIcons';

interface FaqSectionProps {
  onOpenChat: (query?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenChat }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I need any previous skydiving experience?',
      a: 'No prior experience is necessary. You are harnessed securely to a certified USPA tandem master who guides you through every step: ground preparation, aircraft ascent, freefall positioning, parachute steering, and soft beachside landing.'
    },
    {
      q: 'What is included in the Handycam Pro vs. VIP Cine-Pack?',
      a: 'The Handycam Pro (12,500 THB) uses an instructor wrist camera for close-up selfies and facial reactions. The VIP Cine-Pack (14,000 THB) includes BOTH the wrist camera and an independent cameraman who flies around you in freefall for cinematic wide-angle coastal footage.'
    },
    {
      q: 'What happens if there is adverse coastal weather?',
      a: 'We monitor dropzone winds and cloud ceilings continuously. If weather prevents safe operations, you can reschedule for free within 12 months or receive a 100% full refund immediately.'
    },
    {
      q: 'What clothing should I wear on the jump day?',
      a: 'Wear comfortable activewear suitable for tropical weather (shorts, t-shirt) and secure, lace-up athletic sneakers. Sandals, flip-flops, high heels, and loose necklaces are strictly prohibited.'
    },
    {
      q: 'Why can’t I scuba dive 24 hours prior to skydiving?',
      a: 'Scuba diving dissolves inert nitrogen into your body tissues under high water pressure. Rapidly ascending to 13,000 feet in an unpressurized aircraft causes nitrogen bubbles to expand, causing painful and dangerous decompression sickness.'
    }
  ];

  return (
    <section id="faq" className="py-24 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Common Inquiries
          </p>
          <h2 className="mt-2 text-3xl font-serif font-bold text-stone-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-stone-600 max-w-xl mx-auto">
            Find answers to common questions below, or inquire directly with our AI assistant for instant verified answers from our official website sources.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 bg-stone-50/50 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-stone-900 hover:text-stone-700 transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-200/80 text-[11px] font-mono font-medium text-stone-700">
                      {idx + 1}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-stone-600 border-t border-stone-200/60">
                    <p>{faq.a}</p>
                    <div className="mt-3 pt-2">
                      <button
                        type="button"
                        onClick={() => onOpenChat(faq.q)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-orange-800 hover:underline"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>Ask assistant for full details on this topic</span>
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
