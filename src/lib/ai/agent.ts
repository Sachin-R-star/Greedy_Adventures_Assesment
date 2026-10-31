import { retrieveKnowledge, RetrievalResult } from '../knowledge/service';
import { MediaAsset } from '../knowledge/data';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AgentResponse {
  answer: string;
  media: MediaAsset[];
  sources: {
    title: string;
    url: string;
    sectionsUsed: string[];
  };
  retrieval: RetrievalResult;
  engine: string;
  isMock: boolean;
  latencyMs: number;
}

/**
 * Builds the system prompt for LLM models (Gemini / OpenAI)
 */
function buildSystemPrompt(retrieval: RetrievalResult): string {
  return `You are the official Greedy Adventures AI Skydiving Concierge for the "Sea View Skydiving" experience in Pattaya, Thailand.
Your goal is to assist customers accurately, enthusiastically, and professionally based strictly on the provided knowledge.

KNOWLEDGE BASE:
${retrieval.combinedContext}

OFFICIAL SOURCE URL:
${retrieval.sourceUrl}

RULES & INSTRUCTIONS:
1. Always base your answers ONLY on the factual knowledge provided above. If an answer or requested information is not available in the knowledge base, explicitly and politely state that it is unavailable or outside our offerings—DO NOT make up facts.
2. If the customer asks:
   - "What is included in the package?": Provide a clear, bulleted breakdown of the 3 tiers (Eco, Handycam Pro, and VIP Sea View Cine-Pack) with pricing in THB and exact inclusions.
   - "Can you send me a brochure?": Confirm in a friendly sentence that you have attached the official brochure PDF below with an open/download button.
   - "Can I see a video of the experience?": Confirm enthusiastically that you have shared the video highlight clip below and provide a clear label to watch it.
   - "Send me the brochure and a video.": Acknowledge and share both media items.
3. Keep your tone exciting, welcoming, and reassuring for first-time tandem jumpers.
4. Always end your response by referencing the official source: [Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl}).
5. Note: The UI will automatically render the interactive PDF card and Video player for any selected media.`;
}

/**
 * Deterministic grounded agent generator (Mock / Demo Mode)
 * Ensures 100% reliable behavior even without API keys or during offline reviews.
 */
function generateDeterministicAnswer(messages: ChatMessage[], retrieval: RetrievalResult): string {
  const latestMessage = messages[messages.length - 1]?.content || '';
  const q = latestMessage.toLowerCase();

  if (retrieval.isUnavailableTopic) {
    return `I apologize, but I do not have information or files regarding that topic. I am specifically trained to assist with **Greedy Adventures Sea View Skydiving** at our Pattaya Dropzone in Thailand.\n\nIf you have any questions regarding our 13,000-ft tandem jumps, packages, safety gear, or video options, I would be thrilled to help!\n\n[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
  }

  const { mediaIntent } = retrieval;
  let text = '';

  // Case 1: Both brochure and video
  if (mediaIntent === 'both') {
    text += `### Here is Your Sea View Skydiving Brochure & Experience Video! 🪂✨\n\n`;
    text += `I have attached both the **Official 2026 Information Brochure (PDF)** and our **13,000-ft Sea View Experience Highlight Reel** below.\n\n`;
    text += `• **Official Brochure (PDF)**: Includes comprehensive pricing charts, dropzone logistics, itinerary, and USPA safety protocols. You can view or download it directly using the buttons below.\n`;
    text += `• **Experience Video**: Features high-speed freefall at 220 km/h, 360° coastline views of the Gulf of Thailand, and external cameraman angles.\n\n`;
    text += `*Note: All sample attachments are marked as demo material for evaluation purposes.*\n\n`;
    text += `Feel free to ask if you'd like more details on package upgrades, weight guidelines, or booking policies!\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 2: Brochure only
  if (mediaIntent === 'brochure') {
    text += `### Official Sea View Skydiving Brochure 📄\n\n`;
    text += `Certainly! I've loaded the **Official Sea View Skydiving Information Brochure (PDF)** for you below.\n\n`;
    text += `Inside you'll find:\n`;
    text += `• Detailed comparison of all 3 tandem packages (Eco, Handycam, VIP Cine-Pack)\n`;
    text += `• Step-by-step dropzone itinerary from briefing to beach landing\n`;
    text += `• USPA dual-parachute safety specifications & Cypress 2 AAD guidelines\n`;
    text += `• Health eligibility & booking terms\n\n`;
    text += `You can click **"Open in New Tab"** or **"Download PDF"** right on the card below.\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 3: Video only
  if (mediaIntent === 'video') {
    text += `### Sea View Skydiving Experience Reel 🎥🌊\n\n`;
    text += `Here is a preview of the breathtaking **13,000-ft Sea View Skydiving Experience** over Pattaya, Thailand!\n\n`;
    text += `Watch below to see the 60-second freefall reaching speeds of 220 km/h over the Gulf of Thailand, followed by the scenic canopy flight over the beaches. You can play it right in this chat or use the full-screen watch link.\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 4: Package inclusions question
  if (q.includes('package') || q.includes('include') || q.includes('tier') || q.includes('price') || q.includes('cost') || q.includes('pricing')) {
    text += `### Greedy Adventures — Sea View Skydiving Packages 🪂\n\n`;
    text += `We offer **3 tiered tandem skydiving packages** tailored to your preferred media experience:\n\n`;
    text += `#### 1. Eco Tandem Skydive (Jump Only) — **10,500 THB**\n`;
    text += `• Full 13,000-ft tandem jump strapped to a licensed USPA-certified instructor\n`;
    text += `• 20-minute safety briefing and personalized harness fitting\n`;
    text += `• All protective gear (jumpsuit, goggles, altimeter)\n`;
    text += `• Commemorative Skydiving Certificate of Achievement\n`;
    text += `*(Does not include photos or video)*\n\n`;
    text += `#### 2. Handycam Pro Package (Most Popular) — **12,500 THB**\n`;
    text += `• Everything included in the Eco Tandem Skydive\n`;
    text += `• Instructor wrist-mounted wide-angle HD Handycam\n`;
    text += `• Captures your facial reactions, the leap, freefall, and canopy flight\n`;
    text += `• Over 50 high-res action photos + edited HD video delivered digitally\n\n`;
    text += `#### 3. VIP Sea View Cine-Pack (Ultimate Value) — **14,000 THB** *(Was 17,050 THB)*\n`;
    text += `• Everything in the Eco Package\n`;
    text += `• Instructor Handycam wrist POV footage + photos\n`;
    text += `• **Dedicated outside cameraman** leaping alongside you to capture full cinematic 360° angles\n`;
    text += `• 4K professionally edited highlight reel with music\n`;
    text += `• 100+ high-resolution digital photos\n`;
    text += `• Pre-jump interview and Greedy Adventures souvenir gift\n\n`;
    text += `Would you like me to send you the **brochure** or show you a **video** of the jump?\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 5: Weight, age, or health questions
  if (q.includes('weight') || q.includes('age') || q.includes('safe') || q.includes('scuba') || q.includes('medical') || q.includes('health') || q.includes('requirement')) {
    text += `### Safety & Eligibility Requirements 🛡️\n\n`;
    text += `Here are the essential requirements for our Sea View Skydiving experience:\n\n`;
    text += `• **Age**: Minimum 10 years old (participants under 18 require signed parental/guardian consent).\n`;
    text += `• **Weight Limit**: Maximum 100 kg. Surcharges apply for weights between 95–100 kg due to instructor gear balance.\n`;
    text += `• **Scuba Rule**: You must **NOT** scuba dive within 24 hours prior to skydiving to prevent decompression sickness.\n`;
    text += `• **Health Restrictions**: Must be in good health. Not permitted for pregnant guests or individuals with severe heart/spinal conditions or epilepsy.\n`;
    text += `• **Safety Gear**: 100% USPA-compliant dual parachute systems with Cypress 2 Automatic Activation Devices (AAD).\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // General fallback grounded response
  text += `### Welcome to Sea View Skydiving Pattaya by Greedy Adventures! 🌊🪂\n\n`;
  text += `Experience an unforgettable 13,000-ft tandem skydive over the Gulf of Thailand featuring a 60-second freefall at 220 km/h and a peaceful 5-7 minute canopy ride with panoramic ocean views.\n\n`;
  text += `Here is how I can assist you right now:\n`;
  text += `• Ask **"What is included in the package?"** for complete tier pricing and details.\n`;
  text += `• Ask **"Can you send me a brochure?"** for an instant downloadable PDF.\n`;
  text += `• Ask **"Can I see a video of the experience?"** to watch full HD freefall footage.\n`;
  text += `• Ask about safety standards, weight limits, or scuba diving rules.\n\n`;
  text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
  return text;
}

/**
 * Executes a call to Google Gemini API if GEMINI_API_KEY is configured
 */
async function callGeminiApi(apiKey: string, messages: ChatMessage[], retrieval: RetrievalResult): Promise<string> {
  const systemInstruction = buildSystemPrompt(retrieval);
  
  // Format conversation for Gemini API
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1000
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidate) throw new Error('No candidate returned by Gemini');

  return candidate;
}

/**
 * Primary Agent Runner
 */
export async function runAgent(messages: ChatMessage[]): Promise<AgentResponse> {
  const startTime = Date.now();
  const latestMessage = messages[messages.length - 1]?.content || '';
  
  // 1. Retrieve knowledge and detect media intents
  const retrieval = retrieveKnowledge(latestMessage);

  let answerText = '';
  let engineName = 'Intelligent Grounded Engine (Demo Mode)';
  let isMock = true;

  // 2. Attempt live LLM if API key is provided
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && !retrieval.isUnavailableTopic) {
    try {
      answerText = await callGeminiApi(geminiKey, messages, retrieval);
      engineName = 'Google Gemini 1.5 Flash';
      isMock = false;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to deterministic engine:', err);
      answerText = generateDeterministicAnswer(messages, retrieval);
      engineName = 'Intelligent Grounded Engine (Fallback Mode)';
      isMock = true;
    }
  } else {
    // Standard intelligent grounded deterministic execution
    answerText = generateDeterministicAnswer(messages, retrieval);
  }

  const latencyMs = Date.now() - startTime;

  return {
    answer: answerText,
    media: retrieval.selectedMedia,
    sources: {
      title: retrieval.sourceTitle,
      url: retrieval.sourceUrl,
      sectionsUsed: retrieval.matchedChunks.map(c => c.title)
    },
    retrieval,
    engine: engineName,
    isMock,
    latencyMs
  };
}
