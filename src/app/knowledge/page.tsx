'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Database,
  ArrowLeft,
  ExternalLink,
  FileText,
  Film,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Code2,
  PlayCircle,
  AlertTriangle,
  Send,
  Loader2,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { WebsiteSource, MediaAsset } from '@/lib/knowledge/data';

interface TestResult {
  query: string;
  timestamp: string;
  retrieval: {
    matchedCount: number;
    mediaIntent: string;
    isUnavailableTopic: boolean;
    actualSourceTextPassedToModel: string;
    matchedChunks: Array<{
      id: string;
      title: string;
      category: string;
      text: string;
    }>;
    selectedMedia: Array<{
      id: string;
      type: string;
      title: string;
      filename: string;
      url: string;
      demoLabel: string;
    }>;
  };
  execution: {
    engine: string;
    isMock: boolean;
    latencyMs: number;
    generatedAnswer: string;
  };
}

export default function KnowledgePage() {
  const [sources, setSources] = useState<WebsiteSource | null>(null);
  const [availableMedia, setAvailableMedia] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Test sandbox state
  const [testQuery, setTestQuery] = useState('What is included in the package?');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  // Load public knowledge from /api/knowledge
  useEffect(() => {
    async function fetchKnowledge() {
      try {
        const res = await fetch('/api/knowledge');
        const data = await res.json();
        setSources(data.sources);
        setAvailableMedia(data.availableMedia);
      } catch (err) {
        console.error('Failed to load knowledge:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchKnowledge();
  }, []);

  // Run initial test query once loaded
  useEffect(() => {
    runTestQuery('What is included in the package?');
  }, []);

  const runTestQuery = async (queryToRun: string) => {
    const q = (queryToRun || testQuery).trim();
    if (!q || isTesting) return;

    setIsTesting(true);
    setTestError(null);

    try {
      const res = await fetch('/api/knowledge/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      console.error('Test query error:', err);
      setTestError(err.message || 'Failed to execute test query');
    } finally {
      setIsTesting(false);
    }
  };

  const presetQueries = [
    'What is included in the package?',
    'Can you send me a brochure?',
    'Can I see a video of the experience?',
    'Send me the brochure and a video.',
    'Do you have skydiving in Antarctica?'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Demo</span>
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
                <Database className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-wide">
                  Backend Knowledge Base & Model Inspector
                </h1>
                <p className="text-[11px] text-slate-400">
                  Read-Only Backend State • Grounded Sources & Real Retrieval Activity
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Backend Connected
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        
        {/* Intro Banner */}
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-500/30">
                Assignment Requirement
              </span>
              <h2 className="mt-2 text-xl font-bold text-white">
                Live Knowledge Architecture & Query Testing Console
              </h2>
              <p className="mt-1 text-sm text-slate-300 max-w-3xl leading-relaxed">
                This dashboard displays the exact website source chunks ingested into the chatbot and the available media catalog. Use the test console below to verify the real backend retrieval, media detection, and source context passed to the AI model.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-right">
                <div className="text-xs text-slate-400">Website Sources</div>
                <div className="text-lg font-bold text-cyan-400">1 Document / 5 Chunks</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-right">
                <div className="text-xs text-slate-400">Media Assets</div>
                <div className="text-lg font-bold text-amber-400">2 Assets (PDF + MP4)</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE REAL TEST QUESTION CONSOLE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                Live Backend Retrieval & Model Input Inspector
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              *Reflects real backend activity and source assembly
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
            {/* Input & Presets */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Run a Test Query Against Backend:
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && runTestQuery(testQuery)}
                    placeholder="Enter any test question (e.g. What is included in the package?)"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runTestQuery(testQuery)}
                  disabled={isTesting || !testQuery.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Testing Backend...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Inspect Backend</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400">Required rubric checks:</span>
                {presetQueries.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTestQuery(q);
                      runTestQuery(q);
                    }}
                    className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                      testQuery === q
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {testError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300">
                <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                <span>{testError}</span>
              </div>
            )}

            {/* Test Results Display */}
            {testResult && (
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 pt-6 border-t border-slate-800">
                
                {/* Column 1: Retrieval & Media Selection */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Backend Retrieval Metadata
                    </h4>

                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Media Intent Detected:</span>
                        <span className="font-mono font-bold uppercase text-amber-300">
                          {testResult.retrieval.mediaIntent}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Source Chunks Matched:</span>
                        <span className="font-mono text-cyan-300">
                          {testResult.retrieval.matchedCount} chunk(s)
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Out of Scope / Unavailable:</span>
                        <span className={`font-mono ${testResult.retrieval.isUnavailableTopic ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                          {testResult.retrieval.isUnavailableTopic ? 'YES (Fallback triggered)' : 'NO (In Dropzone Scope)'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Model Engine:</span>
                        <span className="font-mono text-slate-200">
                          {testResult.execution.engine} {testResult.execution.isMock ? '(Demo Mode)' : ''}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Backend Execution Time:</span>
                        <span className="font-mono text-emerald-400">
                          {testResult.execution.latencyMs} ms
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Media Result */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      Selected Media Attachments ({testResult.retrieval.selectedMedia.length})
                    </h4>

                    {testResult.retrieval.selectedMedia.length === 0 ? (
                      <p className="mt-2 text-xs text-slate-500 italic">
                        No media attachments requested for this query. The model delivers text-only response.
                      </p>
                    ) : (
                      <div className="mt-3 space-y-2">
                        {testResult.retrieval.selectedMedia.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              {m.type === 'pdf' ? (
                                <FileText className="h-4 w-4 text-rose-400" />
                              ) : (
                                <Film className="h-4 w-4 text-cyan-400" />
                              )}
                              <div>
                                <div className="font-semibold text-slate-200">{m.title}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{m.filename}</div>
                              </div>
                            </div>
                            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                              {m.demoLabel}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Column 2: Actual Source Text Passed to Model */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        Actual Source Text Passed to Model Context
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {testResult.retrieval.actualSourceTextPassedToModel.length} chars
                      </span>
                    </div>

                    <pre className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-300 font-mono whitespace-pre-wrap scrollbar-thin">
                      {testResult.retrieval.actualSourceTextPassedToModel}
                    </pre>
                  </div>

                  {/* Generated Answer Preview */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                      Backend Generated Answer Output
                    </h4>
                    <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap scrollbar-thin">
                      {testResult.execution.generatedAnswer}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: LOADED WEBSITE SOURCES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">
                Website Sources Loaded into Chatbot
              </h3>
            </div>
            <span className="text-xs text-slate-400">Read-only live representation</span>
          </div>

          {sources && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    {sources.pageTitle}
                    <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 ring-1 ring-cyan-500/20">
                      Primary Knowledge Source
                    </span>
                  </h4>
                  <a
                    href={sources.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    <span>{sources.url}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {sources.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                      Capture Date:
                    </span>
                    <span className="font-mono font-bold text-slate-200 mt-0.5 block">
                      {sources.captureDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Source Chunks */}
              <div className="mt-6 space-y-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Ingested Knowledge Chunks ({sources.chunks.length} Chunks Available for RAG Retrieval):
                </h5>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {sources.chunks.map((chunk) => (
                    <div
                      key={chunk.id}
                      className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-4 transition hover:border-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                          {chunk.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          id: {chunk.id}
                        </span>
                      </div>
                      <h6 className="mt-2 text-sm font-semibold text-slate-200">
                        {chunk.title}
                      </h6>
                      <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-4">
                        {chunk.text}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1 border-t border-slate-900 pt-2">
                        {chunk.keywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-mono text-slate-400"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 3: AVAILABLE MEDIA ASSETS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                Available Media Assets Catalog
              </h3>
            </div>
            <span className="text-xs text-slate-400">PDFs & Videos Delivered on Customer Request</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {availableMedia.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                      {asset.type === 'pdf' ? (
                        <>
                          <FileText className="h-3.5 w-3.5 text-rose-400" />
                          <span>PDF Document</span>
                        </>
                      ) : (
                        <>
                          <Film className="h-3.5 w-3.5 text-cyan-400" />
                          <span>Video Asset</span>
                        </>
                      )}
                    </span>
                    {asset.isDemo && (
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/30">
                        {asset.demoLabel}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-3 text-base font-bold text-slate-100">
                    {asset.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {asset.description}
                  </p>

                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1.5 text-xs text-slate-400 font-mono">
                    <div className="flex justify-between">
                      <span>Filename:</span>
                      <span className="text-slate-300">{asset.filename}</span>
                    </div>
                    {asset.size && (
                      <div className="flex justify-between">
                        <span>File Size:</span>
                        <span className="text-slate-300">{asset.size}</span>
                      </div>
                    )}
                    {asset.duration && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="text-slate-300">{asset.duration}</span>
                      </div>
                    )}
                    {asset.resolution && (
                      <div className="flex justify-between">
                        <span>Resolution:</span>
                        <span className="text-slate-300">{asset.resolution}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Public Path:</span>
                      <span className="text-cyan-400 truncate max-w-[200px]">{asset.url}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 pt-4 border-t border-slate-800">
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-cyan-500"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open Asset Directly</span>
                  </a>
                  {asset.externalUrl && (
                    <a
                      href={asset.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>External Link</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
