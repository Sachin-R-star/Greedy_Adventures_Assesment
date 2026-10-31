'use client';

import React from 'react';
import Link from 'next/link';
import { ParachuteSvg } from '@/components/common/SvgIcons';
import { BookOpen, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC<{ onOpenChat: () => void }> = ({ onOpenChat }) => {
  return (
    <footer className="border-t border-stone-200 bg-[#fafaf9] py-16 text-stone-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-200">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white">
                <ParachuteSvg className="h-4 w-4" />
              </div>
              <span className="font-semibold text-stone-900 text-sm tracking-tight">
                Greedy Adventures — Sea View Skydiving
              </span>
            </div>
            <p className="text-stone-600 text-xs max-w-md leading-relaxed">
              Full Stack Developer Assignment submission. Built with Next.js 14, TypeScript, Tailwind CSS, and assistant-ui. Connects customer queries to a grounded backend with dynamic PDF & video response formats.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px]">
              <span className="inline-flex items-center gap-1 rounded bg-stone-200/70 px-2.5 py-1 font-medium text-stone-700">
                Pattaya Dropzone, Thailand
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-stone-200/70 px-2.5 py-1 font-medium text-stone-700">
                <ShieldCheck className="h-3 w-3 text-emerald-700" />
                USPA Certified Dropzone
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#packages" className="hover:text-stone-900 transition">
                  Packages & Pricing
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-stone-900 transition">
                  Dropzone Journey
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-stone-900 transition">
                  Safety Protocols
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-stone-900 transition">
                  FAQ & Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Assignment / Reviewer Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Assignment Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/knowledge"
                  className="inline-flex items-center gap-1.5 font-medium text-orange-800 hover:text-orange-900"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Knowledge View (Backend Activity)</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="inline-flex items-center gap-1.5 hover:text-stone-900 transition"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Open AI Assistant</span>
                </button>
              </li>
              <li>
                <a
                  href="/assets/brochure/sea-view-skydiving-brochure.pdf"
                  target="_blank"
                  className="hover:text-stone-900 transition"
                >
                  View Sample Brochure (PDF)
                </a>
              </li>
              <li>
                <a
                  href="https://greedyadventures.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-stone-900 transition"
                >
                  <span>Official Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 Greedy Adventures assignment evaluation. All demo material clearly marked.</p>
          <p>Next.js 14 • TypeScript • Tailwind CSS • assistant-ui</p>
        </div>

      </div>
    </footer>
  );
};
