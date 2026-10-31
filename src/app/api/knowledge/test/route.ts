import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '@/lib/ai/agent';
import { retrieveKnowledge } from '@/lib/knowledge/service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = typeof body?.query === 'string' ? body.query.trim() : '';

    if (!query) {
      return NextResponse.json(
        { error: 'Please provide a non-empty test "query".' },
        { status: 400 }
      );
    }

    // Run real backend retrieval and agent pipeline
    const retrieval = retrieveKnowledge(query);
    const agentResponse = await runAgent([{ role: 'user', content: query }]);

    return NextResponse.json({
      query,
      timestamp: new Date().toISOString(),
      retrieval: {
        matchedCount: retrieval.matchedChunks.length,
        mediaIntent: retrieval.mediaIntent,
        isUnavailableTopic: retrieval.isUnavailableTopic,
        actualSourceTextPassedToModel: retrieval.combinedContext,
        matchedChunks: retrieval.matchedChunks.map(c => ({
          id: c.id,
          title: c.title,
          category: c.category,
          text: c.text
        })),
        selectedMedia: retrieval.selectedMedia.map(m => ({
          id: m.id,
          type: m.type,
          title: m.title,
          filename: m.filename,
          url: m.url,
          demoLabel: m.demoLabel
        }))
      },
      execution: {
        engine: agentResponse.engine,
        isMock: agentResponse.isMock,
        latencyMs: agentResponse.latencyMs,
        generatedAnswer: agentResponse.answer
      }
    });
  } catch (error: any) {
    console.error('Error testing knowledge query:', error);
    return NextResponse.json(
      { error: 'Failed to test query', details: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
