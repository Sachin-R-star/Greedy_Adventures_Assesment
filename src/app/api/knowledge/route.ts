import { NextResponse } from 'next/server';
import { getAllWebsiteSources, getAllAvailableMedia } from '@/lib/knowledge/service';

export async function GET() {
  const sources = getAllWebsiteSources();
  const media = getAllAvailableMedia();

  return NextResponse.json({
    status: 'ok',
    sources: {
      pageTitle: sources.pageTitle,
      url: sources.url,
      captureDate: sources.captureDate,
      description: sources.description,
      chunks: sources.chunks.map(chunk => ({
        id: chunk.id,
        category: chunk.category,
        title: chunk.title,
        text: chunk.text,
        keywords: chunk.keywords
      }))
    },
    availableMedia: media.map(m => ({
      id: m.id,
      type: m.type,
      title: m.title,
      filename: m.filename,
      url: m.url,
      externalUrl: m.externalUrl,
      size: m.size,
      duration: m.duration,
      resolution: m.resolution,
      isDemo: m.isDemo,
      demoLabel: m.demoLabel,
      description: m.description
    }))
  });
}
