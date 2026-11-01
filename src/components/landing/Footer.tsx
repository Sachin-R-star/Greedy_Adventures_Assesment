'use client';

import React from 'react';
import Link from 'next/link';
import { DropzoneEmblemSvg, ParachuteSvg } from '@/components/common/SvgIcons';
import {
  BookOpen,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  FileText,
  Film,
  Download,
  Terminal,
  Compass
} from 'lucide-react';

interface FooterProps {
  onOpenChat: (query?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChat }) => {
  return (
    <footer className="border-t border-stone-800 bg-[#141210] text-stone-400 text-xs">
      
      {/* Top Airfield Telemetry Strip */}
      <div className="border-b border-stone-800/80 bg-[#0d0c0b] py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-stone-300 uppercase font-semibold">AIRFIELD ACTIVE</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-400">PATTAYA COASTAL DROPZONE, THAILAND</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>COORD: 12°55&apos;N, 100°52&apos;E</span>
            <span className="text-stone-600">•</span>
            <span>ALT: 13,000 FT AGL</span>
            <span className="text-stone-600">•</span>
            <span className="text-emerald-400">USPA CERTIFIED #TH-204</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 border border-stone-800 text-amber-400">
                <DropzoneEmblemSvg className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-stone-100 text-sm tracking-tight block">
                  Greedy Adventures
                </span>
                <span className="text-[10px] text-stone-400 block font-mono">
                  Sea View Skydiving Pattaya
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed">
              Full Stack Developer Assignment Submission. Built with Next.js 14, TypeScript, Tailwind CSS, and assistant-ui. Connects customer queries to a grounded backend with dynamic PDF & video delivery.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="inline-flex items-center gap-1 rounded bg-stone-900 px-2.5 py-1 text-stone-300 border border-stone-800">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                USPA Standard
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-stone-900 px-2.5 py-1 text-stone-300 border border-stone-800">
                13,000 FT Tandem
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider font-mono">
              Dropzone Navigation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#packages" className="hover:text-amber-400 transition">
                  01. Packages & Pricing
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-amber-400 transition">
                  02. Dropzone Flight Path
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-amber-400 transition">
                  03. USPA Safety & Scuba Rule
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition">
                  04. FAQ & Dropzone Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Chatbot & Media Deliverables */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider font-mono">
              Concierge & Deliverables
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenChat('What is included in the package?')}
                  className="hover:text-amber-400 transition text-left inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="h-3 w-3 text-amber-400" />
                  <span>Text: Package Inclusions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenChat('Can you send me a brochure?')}
                  className="hover:text-amber-400 transition text-left inline-flex items-center gap-1.5"
                >
                  <FileText className="h-3 w-3 text-rose-400" />
                  <span>PDF: Official Brochure</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenChat('Can I see a video of the experience?')}
                  className="hover:text-amber-400 transition text-left inline-flex items-center gap-1.5"
                >
                  <Film className="h-3 w-3 text-sky-400" />
                  <span>Video: 45s Freefall Reel</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenChat('Send me the brochure and a video.')}
                  className="hover:text-amber-400 transition text-left inline-flex items-center gap-1.5"
                >
                  <DropzoneEmblemSvg className="h-3 w-3 text-emerald-400" />
                  <span>Dual: PDF + Video Attached</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Evaluator & Architecture Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 text-xs uppercase tracking-wider font-mono">
              Evaluator Tools
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a
                  href="https://greedyadventuresassesment.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                  <span>Live Vercel Deployment</span>
                </a>
              </li>
              <li>
                <Link
                  href="/knowledge"
                  className="inline-flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition"
                >
                  <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                  <span>Knowledge View Inspector</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Sachin-R-star/Greedy_Adventures_Assesment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-200 transition inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="/assets/brochure/sea-view-skydiving-brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-200 transition inline-flex items-center gap-1.5"
                >
                  <Download className="h-3 w-3" />
                  <span>Direct Brochure Download (PDF)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://greedyadventures.com/sea-view-tandem-skydiving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-200 transition inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Official Website Source URL</span>
                </a>
              </li>
              <li>
                <span className="font-mono text-[10px] text-stone-400 block pt-1">
                  Test suite: <code className="text-stone-300 bg-stone-900 px-1 py-0.5 rounded">node scripts/comprehensive-test.js</code>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <div>
            <span>© 2026 Greedy Adventures Thailand. Sea View Tandem Skydiving. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Evaluation Demo Project</span>
            <span>•</span>
            <span className="text-emerald-400">54/54 Automated Tests Passing</span>
          </div>
        </div>

      </div>
    </footer>
  );
};