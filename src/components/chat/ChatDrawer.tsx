'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/core/react';
import { MediaAsset } from '@/lib/knowledge/data';
import { MediaCards } from './MediaCards';
import { ChatMessageContent } from './ChatMessageContent';
import { DropzoneEmblemSvg, DropzoneSkylineSvg, ParachuteSvg } from '@/components/common/SvgIcons';
import {
  X,
  Send,
  RotateCcw,
  AlertCircle,
  Loader2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  User,
  FileText,
  Film,
  Sparkles,
  Compass,
  ArrowRight
} from 'lucide-react';

export interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  media?: MediaAsset[];
  sources?: {
    title: string;
    url: string;
    sectionsUsed: string[];
  };
  engine?: string;
  isMock?: boolean;
  timestamp: string;
}

const COLORFUL_SUGGESTIONS = [
  {
    label: 'Send Brochure (PDF)',
    query: 'Can you send me a brochure?',
    icon: FileText,
    style: 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100 hover:border-red-300'
  },
  {
    label: 'Watch Video Reel',
    query: 'Can I see a video of the experience?',
    icon: Film,
    style: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100 hover:border-sky-300'
  },
  {
    label: 'Send Both (PDF + Video)',
    query: 'Send me the brochure and a video.',
    icon: Sparkles,
    style: 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
  },
  {
    label: 'Package Rates & Inclusions',
    query: 'What is included in the package?',
    icon: ParachuteSvg,
    style: 'bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100 hover:border-orange-300'
  },
  {
    label: 'Weight, Age & 24h Scuba',
    query: 'What are the weight and age requirements, and what is the scuba rule?',
    icon: ShieldCheck,
    style: 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
  },
  {
    label: 'Can I bring a GoPro?',
    query: 'Can I bring my own GoPro or phone to record the jump?',
    icon: Compass,
    style: 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100 hover:border-purple-300'
  }
];

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery
}) => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### Welcome to Greedy Adventures 🪂🌊\n\nI am your AI Concierge for the **Sea View Skydiving** experience in Pattaya, Thailand.\n\nAsk me anything about our **13,000-ft tandem jumps**, request our **official brochure (PDF)**, watch **4K video footage**, or check pricing and safety criteria.\n\nHow can I help you today?`,
      engine: 'Dropzone Knowledge Engine',
      isMock: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      sendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setErrorMessage(null);
    const userMsgId = 'user-' + Date.now();
    const newUserMsg: MessageItem = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const payload = {
        messages: updatedMessages.map(m => ({
          role: m.role,
          content: m.content
        }))
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: MessageItem = {
        id: 'asst-' + Date.now(),
        role: 'assistant',
        content: data.answer,
        media: data.media,
        sources: data.sources,
        engine: data.engine,
        isMock: data.isMock,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(err?.message || 'Failed to connect to the assistant service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-msg-reset',
        role: 'assistant',
        content: `Conversation refreshed! How can I help you plan your Sea View Skydiving jump today?\n\nTry asking for package pricing, our brochure, or an experience video!`,
        engine: 'Dropzone Knowledge Engine',
        isMock: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMessage(null);
  };

  // assistant-ui ChatModelAdapter
  const adapter = {
    async *run({ messages: auiMessages, abortSignal }: { messages: any[]; abortSignal?: AbortSignal }) {
      const lastUserMsg = auiMessages[auiMessages.length - 1];
      const userText = lastUserMsg?.content?.[0]?.type === 'text' ? lastUserMsg.content[0].text : '';
      if (!userText) return;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userText }]
        }),
        signal: abortSignal
      });

      const data = await res.json();
      yield {
        content: [{ type: 'text', text: data.answer }]
      };
    }
  };

  const localRuntime = useLocalRuntime(adapter as any);

  if (!isOpen) return null;

  return (
    <AssistantRuntimeProvider runtime={localRuntime}>
      <div
        className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs transition-opacity duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Greedy Adventures Concierge"
      >
        {/* Backdrop click to dismiss */}
        <div className="flex-1" onClick={onClose} />

        {/* Clean, Colorful & Modern Drawer Panel */}
        <div className="flex h-full w-full max-w-lg flex-col border-l border-stone-200 bg-white shadow-2xl transition-transform duration-200">
          
          {/* Distinctive Branded Header */}
          <div className="flex items-center justify-between border-b border-stone-800 bg-[#141210] px-5 py-3.5 text-white">
            <div className="flex items-center gap-3">
              
              {/* Vibrant Logo Mark */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 p-0.5 shadow-xs">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#1c1917] text-amber-400">
                  <DropzoneEmblemSvg className="h-5 w-5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold tracking-wide text-white">
                    Skydiving Concierge
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.2 text-[10px] font-mono font-semibold text-emerald-300 border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span>13,000 FT • Pattaya Dropzone Facts</span>
                </p>
              </div>

            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Restart conversation"
                className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-800 hover:text-white"
                aria-label="Restart chat"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Close chat (Esc)"
                className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-800 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages list container */}
          <div
            className="flex-1 space-y-4 overflow-y-auto p-4 bg-[#fafaf9]"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-2xs mt-0.5">
                    <DropzoneEmblemSvg className="h-5 w-5 text-white" />
                  </div>
                )}

                <div
                  className={`relative max-w-[88%] rounded-2xl p-4 shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-[#1c1917] text-white rounded-tr-xs border border-stone-800'
                      : 'border border-stone-200 bg-white text-stone-900 rounded-tl-xs'
                  }`}
                >
                  {/* For Welcome Message: Render Stylized SVG Dropzone Banner */}
                  {index === 0 && msg.role === 'assistant' && (
                    <div className="mb-3.5 overflow-hidden rounded-xl border border-amber-200/80 shadow-2xs">
                      <DropzoneSkylineSvg className="w-full h-20" />
                    </div>
                  )}

                  {/* Message Content */}
                  {msg.role === 'user' ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <ChatMessageContent content={msg.content} />
                  )}

                  {/* For Welcome Message: Colorful 4-Action Quick Shortcuts */}
                  {index === 0 && msg.role === 'assistant' && (
                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                        Quick inquiry shortcuts:
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => sendMessage('Can you send me a brochure?')}
                          className="flex items-center gap-2 rounded-lg bg-red-50 p-2 text-left text-red-900 border border-red-200/80 hover:bg-red-100 transition"
                        >
                          <FileText className="h-3.5 w-3.5 text-red-700 shrink-0" />
                          <span className="font-semibold text-[11px] truncate">Official Brochure (PDF)</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => sendMessage('Can I see a video of the experience?')}
                          className="flex items-center gap-2 rounded-lg bg-sky-50 p-2 text-left text-sky-900 border border-sky-200/80 hover:bg-sky-100 transition"
                        >
                          <Film className="h-3.5 w-3.5 text-sky-700 shrink-0" />
                          <span className="font-semibold text-[11px] truncate">4K Freefall Video</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => sendMessage('What is included in the package?')}
                          className="flex items-center gap-2 rounded-lg bg-orange-50 p-2 text-left text-orange-900 border border-orange-200/80 hover:bg-orange-100 transition"
                        >
                          <ParachuteSvg className="h-3.5 w-3.5 text-orange-700 shrink-0" />
                          <span className="font-semibold text-[11px] truncate">3 Packages & Pricing</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => sendMessage('What are the weight and age requirements, and what is the scuba rule?')}
                          className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 text-left text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100 transition"
                        >
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                          <span className="font-semibold text-[11px] truncate">Safety & 24h Scuba</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Rich Media Deliverables (PDF & Video) */}
                  {msg.media && msg.media.length > 0 && (
                    <MediaCards media={msg.media} />
                  )}

                  {/* Timestamp & Engine footer */}
                  <div className={`mt-2.5 flex items-center justify-between gap-2 text-[10px] ${
                    msg.role === 'user' ? 'text-stone-400' : 'text-stone-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {msg.engine && (
                      <span className="font-mono text-[9px]">
                        {msg.engine} {msg.isMock ? '(Demo)' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* User Avatar */}
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-stone-200 border border-stone-700 mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-2xs">
                  <DropzoneEmblemSvg className="h-5 w-5 animate-pulse text-white" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs text-stone-700 shadow-2xs">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-700" />
                  <span>Searching dropzone facts & composing answer...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Unable to process inquiry</p>
                  <p className="mt-0.5">{errorMessage}</p>
                  <button
                    onClick={() => sendMessage()}
                    className="mt-2 rounded bg-red-700 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-800"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Colorful Quick Prompt Pills */}
          <div className="border-t border-stone-200 bg-white px-4 py-2.5">
            <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 mb-1.5">
              <span className="flex items-center gap-1 font-semibold text-stone-700">
                <Sparkles className="h-3 w-3 text-amber-600" />
                Suggested questions:
              </span>
              <span className="font-mono text-[10px] text-stone-400">1-click triggers</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-thin">
              {COLORFUL_SUGGESTIONS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => sendMessage(item.query)}
                    disabled={isLoading}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition hover:scale-105 active:scale-95 disabled:opacity-50 ${item.style}`}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modern Input Composer */}
          <div className="border-t border-stone-200 bg-white p-3.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="relative flex items-center"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about packages, brochure, video, safety, GoPro..."
                rows={1}
                disabled={isLoading}
                className="w-full resize-none rounded-xl border border-stone-300 bg-stone-50/50 py-3 pl-3.5 pr-12 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 disabled:opacity-50 transition shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1917] text-white transition hover:bg-black hover:scale-105 disabled:bg-stone-200 disabled:text-stone-400 disabled:scale-100 shadow-xs"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500">
              <span>Press <kbd className="rounded bg-stone-100 px-1 py-0.5 font-mono text-stone-600 border border-stone-200">Enter</kbd> to send</span>
              <a
                href="/knowledge"
                className="inline-flex items-center gap-1 font-semibold text-stone-700 hover:text-stone-950 underline underline-offset-2"
              >
                <span>Read-only Knowledge View</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
