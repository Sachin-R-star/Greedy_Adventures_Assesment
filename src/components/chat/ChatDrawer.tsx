'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/core/react';
import { MediaAsset } from '@/lib/knowledge/data';
import { MediaCards } from './MediaCards';
import { ChatMessageContent } from './ChatMessageContent';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  AlertCircle,
  Loader2,
  HelpCircle,
  ExternalLink,
  ShieldCheck
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

const PRESET_PROMPTS = [
  'What is included in the package?',
  'Can you send me a brochure?',
  'Can I see a video of the experience?',
  'Send me the brochure and a video.',
  'What are the weight and age requirements?'
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
      content: `### Welcome to Greedy Adventures! 🪂🌊\n\nI am your AI Concierge for the **Sea View Skydiving** experience in Pattaya, Thailand.\n\nAsk me anything about our **13,000-ft tandem jumps**, request our **official brochure (PDF)**, watch our **video footage**, or check pricing and safety requirements!\n\nWhat would you like to explore today?`,
      engine: 'Greedy Adventures Concierge',
      isMock: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle preloaded initial query from page actions
  useEffect(() => {
    if (initialQuery && isOpen) {
      sendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Core send message handler (with full multi-turn conversation memory)
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

    // Append user message immediately
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation history to backend /api/chat to maintain context
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
      setErrorMessage(err?.message || 'Failed to connect to the assistant server. Please try again.');
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
        content: `Conversation refreshed! How can I help you plan your Sea View Skydiving experience today?\n\nTry asking for package pricing, our brochure, or an experience video!`,
        engine: 'Greedy Adventures Concierge',
        isMock: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMessage(null);
  };

  // assistant-ui ChatModelAdapter definition
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
        className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Greedy Adventures Skydiving AI Assistant"
      >
        {/* Backdrop dismiss */}
        <div className="flex-1" onClick={onClose} />

        {/* Drawer Panel */}
        <div className="flex h-full w-full max-w-lg flex-col border-l border-slate-800 bg-slate-950 shadow-2xl transition-transform duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 text-white shadow-lg shadow-cyan-900/30 ring-1 ring-cyan-400/40">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Sea View Skydiving Assistant
                  </h3>
                  <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300 ring-1 ring-cyan-500/20">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-cyan-400" />
                  Grounded on Official Website Knowledge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Reset conversation"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Restart conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Close assistant (Esc)"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Close assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Engine Banner */}
          <div className="flex items-center justify-between border-b border-slate-900 bg-slate-900/40 px-4 py-1.5 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>Multi-turn Memory Enabled</span>
            </span>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
              assistant-ui v0.15
            </span>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-800"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-cyan-400 ring-1 ring-slate-700">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[88%] rounded-2xl p-4 shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-br-xs'
                      : 'border border-slate-800/80 bg-slate-900/80 text-slate-200 rounded-bl-xs'
                  }`}
                >
                  {/* Message Content */}
                  {msg.role === 'user' ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <ChatMessageContent content={msg.content} />
                  )}

                  {/* Rich Media Deliverables (PDF & Video) */}
                  {msg.media && msg.media.length > 0 && (
                    <MediaCards media={msg.media} />
                  )}

                  {/* Timestamp & Engine footer */}
                  <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-slate-400/80">
                    <span>{msg.timestamp}</span>
                    {msg.engine && (
                      <span className="font-mono text-[9px] text-slate-400">
                        {msg.engine} {msg.isMock ? '(Demo)' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-700 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-cyan-400 ring-1 ring-slate-700 animate-pulse">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-slate-400 shadow-md">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                  <span>Searching dropzone knowledge & preparing response...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Assistant Connection Notice</p>
                  <p className="mt-0.5 text-rose-200/80">{errorMessage}</p>
                  <button
                    onClick={() => sendMessage()}
                    className="mt-2 rounded bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-rose-500"
                  >
                    Retry Request
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Prompts Pills */}
          <div className="border-t border-slate-900 bg-slate-950 px-4 py-2">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-1.5">
              <HelpCircle className="h-3 w-3 text-cyan-400" />
              <span>Suggested questions:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {PRESET_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                  className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Composer Form */}
          <div className="border-t border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur">
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
                placeholder="Ask about packages, brochure, video, safety..."
                rows={1}
                disabled={isLoading}
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 py-3 pl-4 pr-12 text-sm text-slate-100 placeholder-slate-500 shadow-inner focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white shadow-md transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:bg-slate-800 disabled:text-slate-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
              <span>Press <kbd className="rounded bg-slate-800 px-1 py-0.5 font-mono text-slate-400">Enter</kbd> to send</span>
              <a
                href="/knowledge"
                className="flex items-center gap-1 text-cyan-400 hover:underline"
              >
                <span>Inspect Knowledge Base</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
