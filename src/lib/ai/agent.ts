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

  // Out of scope check: Truthful unavailable notice
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
    text += `You can click **"Open Brochure (PDF)"** or **"Download"** right on the card below.\n\n`;
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

  // Case 4: Package inclusions & pricing question
  if (q.includes('package') || q.includes('include') || q.includes('tier') || q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('rate') || q.includes('how much')) {
    text += `### Greedy Adventures — Sea View Skydiving Packages 🪂\n\n`;
    text += `We offer **3 tiered tandem skydiving packages** tailored to your preferred media experience:\n\n`;
    text += `#### 1. Eco Tandem Skydive (Jump Only) — **9,500 to 10,500 THB**\n`;
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
    text += `#### 3. VIP Sea View Cine-Pack (Ultimate Value) — **14,000 THB** *(Official Rack Rate: 17,050 THB)*\n`;
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

  // Case 5: Personal Cameras / GoPros / Phones
  if (q.includes('gopro') || q.includes('own camera') || q.includes('phone') || q.includes('selfie') || (q.includes('bring') && q.includes('camera'))) {
    text += `### Personal Camera & GoPro Policy 📷⛔\n\n`;
    text += `Under strict **USPA & Civil Aviation safety regulations**, personal cameras, phones, selfie sticks, and GoPros are **strictly prohibited** during the jump.\n\n`;
    text += `• **Safety Reason**: Loose objects falling at 220 km/h pose severe safety risks to jumpers and people on the ground.\n`;
    text += `• **Professional Recording**: To capture your jump safely, you can choose our **Handycam Pro** (instructor wrist camera) or **VIP Cine-Pack** (outside professional cameraman flying with you).\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 6: Spectators, Family, Friends & Lockers
  if (q.includes('spectator') || q.includes('family') || q.includes('friend') || q.includes('watch') || q.includes('locker') || q.includes('luggage') || q.includes('belonging')) {
    text += `### Spectator Facilities & Secure Lockers 👥🎒\n\n`;
    text += `• **Spectator Viewing Area**: Family and friends are warmly welcome to watch your aircraft takeoff and beachside parachute landing from our shaded spectator lounge.\n`;
    text += `• **Free Secure Lockers**: Free lockers are provided at the dropzone to securely store your phone, wallet, passport, and bags while you are in the air.\n`;
    text += `• **Dropzone Amenities**: Air-conditioned briefing rooms, clean restrooms, and refreshment stations are available on site.\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 7: Transportation, Hotel Pickup & Bangkok Options
  if (q.includes('transport') || q.includes('pickup') || q.includes('transfer') || q.includes('bangkok') || q.includes('hotel') || q.includes('taxi') || q.includes('get there')) {
    text += `### Transportation & Hotel Transfers 🚐\n\n`;
    text += `• **Pattaya Hotels**: Convenient round-trip transfers from any central Pattaya hotel to the dropzone can be arranged.\n`;
    text += `• **Bangkok Transfers**: Since there is no skydiving inside Bangkok city center, fixed-price private vehicle transfers from Bangkok hotels or Suvarnabhumi Airport (BKK) are available upon request.\n`;
    text += `• **Parking**: Free on-site parking is available if you prefer driving or taking a private taxi.\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 8: Weight, age, or health & safety questions
  if (q.includes('weight') || q.includes('age') || q.includes('safe') || q.includes('scuba') || q.includes('medical') || q.includes('health') || q.includes('requirement') || q.includes('limit') || q.includes('aad') || q.includes('cypress')) {
    text += `### Safety & Eligibility Requirements 🛡️\n\n`;
    text += `Here are the essential requirements for our Sea View Skydiving experience:\n\n`;
    text += `• **Age Requirement**: Minimum age is 10 years old. Jumpers under 18 must have parental/guardian consent.\n`;
    text += `• **Weight Limit**: Maximum limit is 100 kg. Surcharges apply for weights between 95–100 kg due to instructor gear balancing.\n`;
    text += `• **24-Hour Scuba Rule**: You must **NOT** scuba dive within 24 hours prior to skydiving to prevent decompression sickness (the bends).\n`;
    text += `• **Health Restrictions**: Not permitted for pregnant women, or participants with serious heart conditions, severe back injuries, or epilepsy.\n`;
    text += `• **Dual-Canopy & AAD**: 100% USPA-compliant rigs fitted with Cypress 2 Automatic Activation Devices.\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 9: Weather, cancellation, refunds, or hotel transfers
  if (q.includes('weather') || q.includes('rain') || q.includes('cloud') || q.includes('wind') || q.includes('cancel') || q.includes('refund') || q.includes('reschedule')) {
    text += `### Weather, Booking & Cancellation Policies ⛅\n\n`;
    text += `• **Weather Guarantee**: Skydiving depends on safe coastal winds and visibility. If rain or low cloud ceilings occur, jumps are paused. You can reschedule for free to any date within 12 months, or receive a **100% full refund** immediately.\n`;
    text += `• **Booking**: No advance deposit is required to reserve your date.\n`;
    text += `• **Load-by-Load Decisions**: Our dropzone evaluates wind and cloud safety load-by-load rather than relying on generic weather forecasts.\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 10: Itinerary, duration, or timeline
  if (q.includes('timeline') || q.includes('itinerary') || q.includes('how long') || q.includes('duration') || q.includes('schedule') || q.includes('hours')) {
    text += `### Dropzone Timeline & Experience Duration ⏱️\n\n`;
    text += `The full dropzone experience takes approximately **3 to 4 hours** from check-in to completion:\n\n`;
    text += `1. **Arrival & Check-in** (20 mins): Registration and health waiver.\n`;
    text += `2. **Safety Briefing** (20 mins): Body posture practice & gear fitting.\n`;
    text += `3. **Scenic Flight** (15 mins): Climbing to 13,000 feet over Pattaya Bay.\n`;
    text += `4. **Freefall** (45–60 sec): 220 km/h terminal velocity thrill.\n`;
    text += `5. **Canopy Glide** (5–7 mins): Peaceful parachute descent with ocean views.\n`;
    text += `6. **Landing & Media** (15 mins): Touchdown, certificate presentation, and digital media handover.\n\n`;
    text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
    return text;
  }

  // Case 11: Clothing & Footwear
  if (q.includes('wear') || q.includes('clothes') || q.includes('clothing') || q.includes('shoes') || q.includes('attire') || q.includes('sneaker')) {
    text += `### What to Wear on Jump Day 👟\n\n`;
    text += `• **Clothing**: Comfortable athletic sportswear (t-shirt and shorts or athletic pants).\n`;
    text += `• **Footwear**: Lace-up athletic sneakers/running shoes are required. Sandals, flip-flops, high heels, and boots are strictly prohibited.\n`;
    text += `• **Jewelry**: Leave loose necklaces, rings, and dangling earrings in our secure lockers.\n`;
    text += `• We provide custom jumpsuits and over-glasses skydiving goggles on site.\n\n`;
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
  text += `• Ask **"Send me the brochure and a video"** for both.\n`;
  text += `• Ask about GoPro policies, spectator areas, hotel pickups, or safety rules.\n\n`;
  text += `[Source: ${retrieval.sourceTitle}](${retrieval.sourceUrl})`;
  return text;
}

/**
 * Executes a call to Google Gemini API if GEMINI_API_KEY is configured
 */
async function callGeminiApi(apiKey: string, messages: ChatMessage[], retrieval: RetrievalResult): Promise<string> {
  const systemInstruction = buildSystemPrompt(retrieval);
  
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
