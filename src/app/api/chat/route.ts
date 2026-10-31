import { NextRequest, NextResponse } from 'next/server';
import { runAgent, ChatMessage } from '@/lib/ai/agent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: "messages" array is required and must not be empty.' },
        { status: 400 }
      );
    }

    // Sanitize and validate messages
    const sanitizedMessages: ChatMessage[] = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: typeof m.content === 'string' ? m.content.slice(0, 2000) : ''
    }));

    const response = await runAgent(sanitizedMessages);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        details: error?.message || 'Unknown server error'
      },
      { status: 500 }
    );
  }
}
