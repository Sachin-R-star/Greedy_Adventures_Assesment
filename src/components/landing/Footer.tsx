'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Database, Bot, ExternalLink, Heart, Shield } from 'lucide-react';

export const Footer: React.FC<{ onOpenChat: () => void }> = ({ onOpenChat }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-white">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-white text-sm tracking-wide">
                GREEDY ADVENTURES — SEA VIEW SKYDIVING
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Full Stack Developer Assignment submission for Greedy Adventures. Built with Next.js 14, TypeScript, Tailwind CSS, and assistant-ui. Connecting customer inquiry to live AI backend and real-time knowledge retrieval.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="rounded bg-slate-900 px-2.5 py-1 text-[11px] font-mono text-cyan-300 border border-slate-800">
                Pattaya Dropzone, Thailand
              </span>
              <span className="rounded bg-slate-900 px-2.5 py-1 text-[11px] font-mono text-amber-300 border border-slate-800">
                USPA Certified Facility
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              System Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#packages" className="hover:text-cyan-400 transition">
                  Packages & Pricing
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-cyan-400 transition">
                  Experience Journey
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-cyan-400 transition">
                  USPA Safety Standards
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Reviewer Resources
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/knowledge" className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300">
                  <Database className="h-3 w-3" />
                  <span>Knowledge View (Backend)</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300"
                >
                  <Bot className="h-3 w-3" />
                  <span>Open AI Assistant</span>
                </button>
              </li>
              <li>
                <a
                  href="/assets/brochure/sea-view-skydiving-brochure.pdf"
                  target="_blank"
                  className="hover:text-slate-300 transition"
                >
                  Sample Brochure (PDF)
                </a>
              </li>
              <li>
                <a
                  href="https://greedyadventures.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-slate-300 transition"
                >
                  <span>Official Greedy Adventures</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Greedy Adventures — Sea View Skydiving Prototype. All sample assets marked as Demo Material.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with Next.js, assistant-ui & Google Deepmind Pair Programming</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
