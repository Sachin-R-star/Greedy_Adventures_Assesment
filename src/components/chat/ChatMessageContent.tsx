'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ChatMessageContentProps {
  content: string;
}

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed text-stone-850">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-display font-bold text-base text-stone-950 mt-2.5 mb-1.5 flex items-center gap-1.5">
              {formatInline(trimmed.replace('### ', ''))}
            </h3>
          );
        }

        // Heading 4
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="font-display font-bold text-sm text-amber-850 mt-2 mb-0.5">
              {formatInline(trimmed.replace('#### ', ''))}
            </h4>
          );
        }

        // Bullet list item
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5 my-0.5">
              <span className="text-amber-600 mt-1 select-none text-xs font-black">▪</span>
              <span className="flex-1 text-stone-700">{formatInline(itemText)}</span>
            </div>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s*(.*)$/);
          if (match) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1.5 my-0.5">
                <span className="font-mono font-bold text-amber-700 text-xs mt-0.5">{match[1]}</span>
                <span className="flex-1 text-stone-700">{formatInline(match[2])}</span>
              </div>
            );
          }
        }

        // Source link line: [Source: Title](url)
        if (trimmed.includes('[Source:') && trimmed.includes('](')) {
          const match = trimmed.match(/\[Source:\s*([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            return (
              <div key={idx} className="mt-3.5 pt-2.5 border-t border-stone-200">
                <a
                  href={match[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50/80 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs transition"
                >
                  <ExternalLink className="h-3 w-3 text-amber-700" />
                  <span>Verified Source: {match[1]}</span>
                </a>
              </div>
            );
          }
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-stone-700">
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-stone-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="rounded bg-stone-100 px-1 py-0.5 text-xs font-mono text-stone-850 border border-stone-200">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
