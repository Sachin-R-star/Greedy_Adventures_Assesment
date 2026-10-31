'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/core/react';
import { MediaAsset } from '@/lib/knowledge/data';
import { MediaCards } from './MediaCards';
import { ChatMessageContent } from './ChatMessageContent';
import { ParachuteSvg } from '@/components/common/SvgIcons';
import {
  X,
  Send,
  RotateCcw,
  AlertCircle,
  Loader2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  User
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
      content: `### Welcome to Greedy Adventures 🪂\n\nI am your concierge for the **Sea View Skydiving** experience in Pattaya, Thailand.\n\nYou can ask about our **13,000-ft tandem jumps**, request our **official brochure (PDF)**, watch **video footage**, or check pricing and safety criteria.\n\nHow can I help you today?`,
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
        content: `Conversation restarted. How can I help you plan your Sea View Skydiving jump today?`,
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
        className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs transition-opacity duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Greedy Adventures Assistant"
      >
        {/* Backdrop click to dismiss */}
        <div className="flex-1" onClick={onClose} />

        {/* Clean Drawer Panel */}
        <div className="flex h-full w-full max-w-lg flex-col border-l border-stone-200 bg-white shadow-2xl transition-transform duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-white">
                <ParachuteSvg className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-stone-900">
                    Skydiving Concierge
                  </h3>
                  <span className="rounded bg-emerald-50 px-1.5 py-0.2 text-[10px] font-medium text-emerald-800 border border-emerald-200">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-stone-700" />
                  Grounded on official website facts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Restart conversation"
                className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
                aria-label="Restart chat"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Close chat"
                className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div
            className="flex-1 space-y-4 overflow-y-auto p-4 bg-[#fafaf9]"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-stone-800 mt-0.5">
                    <ParachuteSvg className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`relative max-w-[86%] rounded-xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-white'
                      : 'border border-stone-200 bg-white text-stone-800 shadow-xs'
                  }`}
                >
                  {/* Content */}
                  {msg.role === 'user' ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <ChatMessageContent content={msg.content} />
                  )}

                  {/* Media Deliverables (PDF & Video) */}
                  {msg.media && msg.media.length > 0 && (
                    <MediaCards media={msg.media} />
                  )}

                  {/* Timestamp & Engine footer */}
                  <div className={`mt-2 flex items-center justify-between gap-2 text-[10px] ${
                    msg.role === 'user' ? 'text-stone-300' : 'text-stone-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {msg.engine && (
                      <span className="font-mono text-[9px]">
                        {msg.engine} {msg.isMock ? '(Demo)' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white mt-0.5">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200 text-stone-800">
                  <ParachuteSvg className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-600 shadow-xs">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-stone-700" />
                  <span>Searching knowledge & composing answer...</span>
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

          {/* Quick Prompts */}
          <div className="border-t border-stone-200 bg-white px-4 py-2">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-500 mb-1.5">
              <HelpCircle className="h-3 w-3" />
              <span>Suggested questions:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                  className="rounded-full border border-stone-300 bg-white px-3 py-1 text-xs text-stone-700 transition hover:bg-stone-100 hover:border-stone-400 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input composer */}
          <div className="border-t border-stone-200 bg-white p-3">
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
                className="w-full resize-none rounded-xl border border-stone-300 bg-white py-2.5 pl-3.5 pr-11 text-sm text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white transition hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500">
              <span>Press <kbd className="rounded bg-stone-100 px-1 py-0.5 font-mono text-stone-600 border border-stone-200">Enter</kbd> to send</span>
              <a
                href="/knowledge"
                className="flex items-center gap-1 text-stone-700 hover:text-stone-900 hover:underline"
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
