'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ChatMessageContentProps {
  content: string;
}

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ content }) => {
  // Parse paragraphs and lines
  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-bold text-base text-cyan-300 mt-2 mb-1 flex items-center gap-1.5">
              {formatInline(trimmed.replace('### ', ''))}
            </h3>
          );
        }

        // Heading 4
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="font-semibold text-sm text-amber-300 mt-2 mb-0.5">
              {formatInline(trimmed.replace('#### ', ''))}
            </h4>
          );
        }

        // Bullet list item
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-cyan-400 mt-1 select-none text-xs">◆</span>
              <span className="flex-1 text-slate-300">{formatInline(itemText)}</span>
            </div>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s*(.*)$/);
          if (match) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="font-bold text-cyan-400 text-xs mt-0.5">{match[1]}</span>
                <span className="flex-1 text-slate-300">{formatInline(match[2])}</span>
              </div>
            );
          }
        }

        // Source link line: [Source: Title](url)
        if (trimmed.includes('[Source:') && trimmed.includes('](')) {
          const match = trimmed.match(/\[Source:\s*([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            return (
              <div key={idx} className="mt-3 pt-2 border-t border-slate-800/80">
                <a
                  href={match[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/50 transition"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Source: {match[1]}</span>
                </a>
              </div>
            );
          }
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-slate-300">
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

function formatInline(text: string): React.ReactNode {
  // Process bold: **bold**
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="rounded bg-slate-800/80 px-1 py-0.5 text-xs font-mono text-cyan-300">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
