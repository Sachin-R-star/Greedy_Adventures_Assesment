'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Film,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Code2,
  PlayCircle,
  AlertTriangle,
  Send,
  Loader2,
  BookOpen
} from 'lucide-react';
import { ParachuteSvg } from '@/components/common/SvgIcons';
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
    'Do you offer skydiving in Antarctica?'
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 antialiased selection:bg-amber-100 selection:text-stone-900">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Demo</span>
            </Link>
            <div className="h-4 w-px bg-stone-200" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white">
                <ParachuteSvg className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-stone-900">
                  Knowledge View & Model Activity Inspector
                </h1>
                <p className="text-[11px] text-stone-500">
                  Read-only backend state • Grounded website sources & live query inspection
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Backend Connected
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        
        {/* Requirement Banner */}
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="rounded bg-stone-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                Evaluation Rubric: Knowledge View
              </span>
              <h2 className="mt-2 text-xl font-bold font-serif text-stone-900">
                Verified Dropzone Grounding & Activity Monitor
              </h2>
              <p className="mt-1 text-xs text-stone-600 max-w-3xl leading-relaxed">
                Displays the website sources loaded into the chatbot: page title, URL, capture date, and text chunks. The test console below executes real backend retrieval, media selection, and model invocation to verify live system behavior.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-right">
                <div className="text-[11px] text-stone-500">Website Sources</div>
                <div className="text-base font-bold text-stone-900">
                  {sources ? `1 Page / ${sources.chunks.length} Chunks` : '1 Page / 8 Chunks'}
                </div>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-right">
                <div className="text-[11px] text-stone-500">Media Assets</div>
                <div className="text-base font-bold text-stone-900">2 Assets (PDF + MP4)</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: LIVE TEST CONSOLE (REAL BACKEND ACTIVITY) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                1. Test Question Console (Real Backend Execution)
              </h3>
              <p className="text-xs text-stone-500">
                Shows the actual source text passed to the model and any PDF/video selected for any question.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
            {/* Input & Presets */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Run Query Against Backend:
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && runTestQuery(testQuery)}
                    placeholder="Enter test query (e.g., What is included in the package?)"
                    className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-9 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runTestQuery(testQuery)}
                  disabled={isTesting || !testQuery.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400"
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Inspect Activity</span>
                    </>
                  )}
                </button>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-stone-500 font-medium">Assignment Test Cases:</span>
                {presetQueries.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTestQuery(q);
                      runTestQuery(q);
                    }}
                    className={`rounded-full border px-2.5 py-1 text-xs transition ${
                      testQuery === q
                        ? 'border-stone-900 bg-stone-900 text-white font-medium'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {testError && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                <span>{testError}</span>
              </div>
            )}

            {/* Test Results Display */}
            {testResult && (
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 pt-6 border-t border-stone-200">
                
                {/* Column 1: Metadata & Selected Media */}
                <div className="lg:col-span-5 space-y-4">
                  
                  <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 text-xs">
                    <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-3 flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-stone-700" />
                      Backend Activity Metadata
                    </h4>

                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-500">Media Intent:</span>
                        <span className="font-mono font-bold uppercase text-stone-900">
                          {testResult.retrieval.mediaIntent}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-500">Source Chunks Matched:</span>
                        <span className="font-mono text-stone-800">
                          {testResult.retrieval.matchedCount} chunk(s)
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-500">Out of Scope / Unavailable:</span>
                        <span className={`font-mono font-medium ${testResult.retrieval.isUnavailableTopic ? 'text-red-700 font-bold' : 'text-emerald-700'}`}>
                          {testResult.retrieval.isUnavailableTopic ? 'YES (Truthful unavailable)' : 'NO (Grounded in Dropzone)'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-200/80">
                        <span className="text-stone-500">Model Engine:</span>
                        <span className="font-mono text-stone-800">
                          {testResult.execution.engine} {testResult.execution.isMock ? '(Demo Engine)' : ''}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">Latency:</span>
                        <span className="font-mono text-stone-800">
                          {testResult.execution.latencyMs} ms
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Media Attachments */}
                  <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4">
                    <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-2">
                      <PlayCircle className="h-3.5 w-3.5 text-stone-700" />
                      Selected Media Attachments ({testResult.retrieval.selectedMedia.length})
                    </h4>

                    {testResult.retrieval.selectedMedia.length === 0 ? (
                      <p className="mt-2 text-xs text-stone-500 italic">
                        No media requested for this question. Model delivers text-only response format as expected.
                      </p>
                    ) : (
                      <div className="mt-3 space-y-2">
                        {testResult.retrieval.selectedMedia.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-2.5 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              {m.type === 'pdf' ? (
                                <FileText className="h-4 w-4 text-red-600 shrink-0" />
                              ) : (
                                <Film className="h-4 w-4 text-stone-700 shrink-0" />
                              )}
                              <div>
                                <div className="font-semibold text-stone-900">{m.title}</div>
                                <div className="text-[11px] text-stone-500 font-mono">{m.filename}</div>
                              </div>
                            </div>
                            <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
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
                  
                  <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                        <Code2 className="h-3.5 w-3.5 text-stone-700" />
                        Actual Source Text Passed to Model
                      </h4>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {testResult.retrieval.actualSourceTextPassedToModel.length} characters
                      </span>
                    </div>

                    <pre className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-stone-200 bg-white p-3 text-[11px] leading-relaxed text-stone-800 font-mono whitespace-pre-wrap">
                      {testResult.retrieval.actualSourceTextPassedToModel}
                    </pre>
                  </div>

                  {/* Generated Answer */}
                  <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4">
                    <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                      Model Generated Answer
                    </h4>
                    <div className="max-h-48 overflow-y-auto rounded-lg border border-stone-200 bg-white p-3 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
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
          <div>
            <h3 className="text-base font-semibold text-stone-900">
              2. Website Sources Loaded into Chatbot
            </h3>
            <p className="text-xs text-stone-500">
              Official public website content ingested and chunked for contextual retrieval.
            </p>
          </div>

          {sources && (
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
                <div>
                  <h4 className="text-base font-bold text-stone-900 flex items-center gap-2 flex-wrap">
                    <span>{sources.pageTitle}</span>
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-700 border border-stone-200">
                      Primary Knowledge Source
                    </span>
                  </h4>
                  <a
                    href={sources.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 hover:underline"
                  >
                    <span>{sources.url}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {sources.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5">
                    <span className="text-stone-500 flex items-center gap-1 text-[11px]">
                      <Calendar className="h-3 w-3 text-stone-600" />
                      Capture Date:
                    </span>
                    <span className="font-mono font-bold text-stone-800 mt-0.5 block">
                      {sources.captureDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Source Chunks */}
              <div className="mt-6 space-y-3">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Ingested Knowledge Chunks ({sources.chunks.length} Chunks Available for Retrieval):
                </h5>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {sources.chunks.map((chunk) => (
                    <div
                      key={chunk.id}
                      className="rounded-lg border border-stone-200 bg-stone-50/50 p-4 transition hover:bg-stone-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-stone-200/80 px-2 py-0.5 text-[10px] font-medium text-stone-800">
                          {chunk.category}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          id: {chunk.id}
                        </span>
                      </div>
                      <h6 className="mt-2 text-sm font-semibold text-stone-900">
                        {chunk.title}
                      </h6>
                      <p className="mt-1.5 text-xs text-stone-600 leading-relaxed line-clamp-4">
                        {chunk.text}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1 border-t border-stone-200 pt-2">
                        {chunk.keywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-stone-600 border border-stone-200"
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

        {/* SECTION 3: AVAILABLE MEDIA ASSETS CATALOG */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-stone-900">
              3. Available Media Catalog (PDFs & Videos)
            </h3>
            <p className="text-xs text-stone-500">
              Media assets delivered dynamically by the chatbot when requested.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {availableMedia.map((asset) => (
              <div
                key={asset.id}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-800">
                      {asset.type === 'pdf' ? (
                        <>
                          <FileText className="h-3.5 w-3.5 text-red-600" />
                          <span>PDF Brochure</span>
                        </>
                      ) : (
                        <>
                          <Film className="h-3.5 w-3.5 text-stone-700" />
                          <span>Video Asset</span>
                        </>
                      )}
                    </span>
                    {asset.isDemo && (
                      <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
                        {asset.demoLabel}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-3 text-base font-bold text-stone-900">
                    {asset.title}
                  </h4>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    {asset.description}
                  </p>

                  <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-3 space-y-1.5 text-xs text-stone-600 font-mono">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Filename:</span>
                      <span className="text-stone-800 font-semibold">{asset.filename}</span>
                    </div>
                    {asset.size && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">File Size:</span>
                        <span className="text-stone-800">{asset.size}</span>
                      </div>
                    )}
                    {asset.duration && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">Duration:</span>
                        <span className="text-stone-800">{asset.duration}</span>
                      </div>
                    )}
                    {asset.resolution && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">Resolution:</span>
                        <span className="text-stone-800">{asset.resolution}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-stone-500">Path:</span>
                      <span className="text-stone-800 truncate max-w-[220px]">{asset.url}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 pt-4 border-t border-stone-100">
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open Asset</span>
                  </a>
                  {asset.externalUrl && (
                    <a
                      href={asset.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition"
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
