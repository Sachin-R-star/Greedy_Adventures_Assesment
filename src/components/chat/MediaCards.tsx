'use client';

import React from 'react';
import { MediaAsset } from '@/lib/knowledge/data';
import { FileText, Download, ExternalLink, Play, Film, CheckCircle2 } from 'lucide-react';

interface MediaCardsProps {
  media: MediaAsset[];
}

export const MediaCards: React.FC<MediaCardsProps> = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-3 flex flex-col gap-3">
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
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700 border border-red-200">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-700">
              PDF Document
            </span>
            {asset.isDemo && (
              <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
                {asset.demoLabel}
              </span>
            )}
          </div>
          <h4 className="mt-1 text-sm font-semibold text-stone-900">
            {asset.title}
          </h4>
          <p className="mt-1 text-xs text-stone-600 leading-relaxed">
            {asset.description}
          </p>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-stone-500">
            <span>File: <code className="font-mono text-stone-700">{asset.filename}</code></span>
            {asset.size && <span>• {asset.size}</span>}
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3">
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Open Brochure (PDF)</span>
        </a>
        <a
          href={asset.url}
          download={asset.filename}
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400"
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
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-700">
            <Film className="h-3 w-3 text-stone-600" />
            Video Reel
          </span>
          {asset.isDemo && (
            <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
              {asset.demoLabel}
            </span>
          )}
        </div>
        <div className="text-[11px] text-stone-500 font-mono">
          {asset.resolution} • {asset.duration}
        </div>
      </div>

      <h4 className="mt-2 text-sm font-semibold text-stone-900">
        {asset.title}
      </h4>
      <p className="mt-1 text-xs text-stone-600 leading-relaxed">
        {asset.description}
      </p>

      {/* Embedded Video Player */}
      <div className="mt-3 overflow-hidden rounded-lg border border-stone-200 bg-stone-900 shadow-inner">
        <video
          controls
          preload="metadata"
          className="aspect-video w-full rounded-md object-cover"
        >
          <source src={asset.url} type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3">
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
        >
          <Play className="h-3.5 w-3.5" />
          <span>Open Fullscreen Player</span>
        </a>
        {asset.externalUrl && (
          <a
            href={asset.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Watch on YouTube</span>
          </a>
        )}
      </div>
    </div>
  );
};
