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
    <div className="group relative overflow-hidden rounded-xl border border-rose-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-rose-950/20 p-4 shadow-lg backdrop-blur transition-all duration-300 hover:border-rose-500/60 hover:shadow-rose-950/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/30">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300 ring-1 ring-rose-500/30">
                PDF Brochure
              </span>
              {asset.isDemo && (
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/30">
                  {asset.demoLabel}
                </span>
              )}
            </div>
            <h4 className="mt-1 text-sm font-semibold text-slate-100 group-hover:text-rose-200">
              {asset.title}
            </h4>
            <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
              {asset.description}
            </p>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
              <span>File: <code className="text-slate-300">{asset.filename}</code></span>
              {asset.size && <span>• Size: {asset.size}</span>}
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> Verified Asset
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-3">
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open Brochure (PDF)
        </a>
        <a
          href={asset.url}
          download={asset.filename}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
      </div>
    </div>
  );
};

export const VideoCard: React.FC<{ asset: MediaAsset }> = ({ asset }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-cyan-950/20 p-4 shadow-lg backdrop-blur transition-all duration-300 hover:border-cyan-500/60 hover:shadow-cyan-950/20">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-500/30">
            <Film className="h-3 w-3" />
            Video Reel
          </span>
          {asset.isDemo && (
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/30">
              {asset.demoLabel}
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">
          {asset.resolution} • {asset.duration}
        </div>
      </div>

      <h4 className="mt-2 text-sm font-semibold text-slate-100 group-hover:text-cyan-200">
        {asset.title}
      </h4>
      <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
        {asset.description}
      </p>

      {/* Interactive Video Player */}
      <div className="mt-3 overflow-hidden rounded-lg border border-slate-800 bg-black/60 shadow-inner">
        <video
          controls
          preload="metadata"
          className="aspect-video w-full rounded-md object-cover"
          poster="/assets/images/video-poster.jpg"
        >
          <source src={asset.url} type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-3">
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Play className="h-3.5 w-3.5" />
          Open Fullscreen Player
        </a>
        {asset.externalUrl && (
          <a
            href={asset.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
};
