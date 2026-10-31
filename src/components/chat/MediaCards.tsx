'use client';

import React from 'react';
import { MediaAsset } from '@/lib/knowledge/data';
import { FileText, Download, ExternalLink, Play, Film, Sparkles, CheckCircle2 } from 'lucide-react';

interface MediaCardsProps {
  media: MediaAsset[];
}

export const MediaCards: React.FC<MediaCardsProps> = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-3.5 flex flex-col gap-3">
      {media.map((item) => (
        <div key={item.id}>
          {item.type === 'pdf' ? (
            <PdfBrochureCard asset={item} />
          ) : (
            <VideoCard asset={item} />
          )}
        </div>
      ))}
    </div>
  );
};

export const PdfBrochureCard: React.FC<{ asset: MediaAsset }> = ({ asset }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-red-200/90 bg-gradient-to-br from-white via-red-50/30 to-amber-50/20 p-4 shadow-xs transition hover:border-red-300">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-xs">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-red-100/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-800 border border-red-200">
              PDF Document
            </span>
            {asset.isDemo && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-100/90 px-2 py-0.5 text-[10px] font-semibold text-amber-900 border border-amber-300">
                <Sparkles className="h-2.5 w-2.5 text-amber-700" />
                <span>{asset.demoLabel}</span>
              </span>
            )}
          </div>
          
          <h4 className="mt-1.5 text-sm font-bold text-stone-900">
            {asset.title}
          </h4>
          <p className="mt-1 text-xs text-stone-600 leading-relaxed">
            {asset.description}
          </p>
          <div className="mt-2.5 flex items-center gap-3 text-[11px] text-stone-500 font-mono">
            <span>File: <strong className="text-stone-700">{asset.filename}</strong></span>
            {asset.size && <span>• {asset.size}</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-red-100 pt-3">
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Open Brochure (PDF)</span>
        </a>
        <a
          href={asset.url}
          download={asset.filename}
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download</span>
        </a>
      </div>
    </div>
  );
};

export const VideoCard: React.FC<{ asset: MediaAsset }> = ({ asset }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-sky-200/90 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20 p-4 shadow-xs transition hover:border-sky-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-100/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-800 border border-sky-200">
            <Film className="h-3 w-3 text-sky-700" />
            <span>Video Reel</span>
          </span>
          {asset.isDemo && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100/90 px-2 py-0.5 text-[10px] font-semibold text-amber-900 border border-amber-300">
              <Sparkles className="h-2.5 w-2.5 text-amber-700" />
              <span>{asset.demoLabel}</span>
            </span>
          )}
        </div>
        <div className="text-[11px] text-stone-500 font-mono font-medium">
          {asset.resolution} • {asset.duration}
        </div>
      </div>

      <h4 className="mt-2 text-sm font-bold text-stone-900">
        {asset.title}
      </h4>
      <p className="mt-1 text-xs text-stone-600 leading-relaxed">
        {asset.description}
      </p>

      {/* Embedded Video Player */}
      <div className="mt-3 overflow-hidden rounded-lg border border-stone-200 bg-stone-950 shadow-inner">
        <video
          controls
          preload="metadata"
          className="aspect-video w-full rounded-md object-cover"
        >
          <source src={asset.url} type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-sky-100 pt-3">
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#1c1917] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-stone-900"
        >
          <Play className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <span>Open Fullscreen Player</span>
        </a>
        {asset.externalUrl && (
          <a
            href={asset.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            <ExternalLink className="h-3.5 w-3.5 text-red-600" />
            <span>Watch on YouTube</span>
          </a>
        )}
      </div>
    </div>
  );
};
