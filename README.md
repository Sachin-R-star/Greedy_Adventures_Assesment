# Greedy Adventures — Sea View Skydiving Prototype

Full Stack Developer Assignment (Round 1) for **Greedy Adventures**.

A Next.js + TypeScript application redesigning the **Sea View Skydiving** experience (Pattaya, Thailand), integrated with an AI customer concierge chatbot built on **assistant-ui** and connected to a live backend with knowledge retrieval, dynamic PDF/video delivery, and a dedicated read-only Knowledge View.

---

## 🚀 Live Demo & Repository

* **Vercel Demo Link:** [https://greedy-seaview-skydiving.vercel.app](https://greedy-seaview-skydiving.vercel.app) *(Deploy-ready)*
* **Local Preview:** `http://localhost:3000`
* **Knowledge View:** `http://localhost:3000/knowledge`

---

## 📋 Features Overview

### 1. Landing Page Redesign
* **Clean, Premium Theme:** Modern dark aesthetic with coastal sky-blue, cyan, and warm gold accents, glassmorphic metric cards, and responsive typography.
* **Redesigned Hero Section:** Highlights the 13,000-ft jump altitude, 220 km/h freefall, and USPA-certified safety record with clear call-to-actions.
* **Tiered Package Section:**
  * **Eco Tandem Skydive (Jump Only):** 10,500 THB — pure jump experience with flight suit, briefing, and certificate.
  * **Handycam Pro (Most Popular):** 12,500 THB — instructor wrist-mounted POV video + 50+ HD photos.
  * **VIP Sea View Cine-Pack (Best Value):** 14,000 THB *(Discounted from 17,050 THB)* — outside cameraman flying 360° around you + 4K cinematic edit + 100+ photos + souvenir.
* **Interactive Chat Prompts:** Every package card includes an *"Ask AI about this package"* button that opens the chat with pre-filled context.
* **Responsive & Keyboard-Accessible:** Full ARIA dialog semantics, keyboard navigation (`Escape` closes drawer, `Enter` sends message, visible focus rings).

### 2. Chat Interface (Powered by assistant-ui)
* **Connected to Live Backend:** Powered by `@assistant-ui/core/react` runtime and `/api/chat`.
* **Multi-Turn Conversation Memory:** Remembers context across turns for natural follow-up questions.
* **Format-Aware Media Deliverables:**
  * *"What is included in the package?"* $\rightarrow$ Structured text comparison of all 3 tiers with THB pricing.
  * *"Can you send me a brochure?"* $\rightarrow$ Renders an interactive PDF Brochure Card with Open in New Tab and Download buttons.
  * *"Can I see a video of the experience?"* $\rightarrow$ Renders an in-chat HTML5 Video Player plus a direct link to watch in HD.
  * *"Send me the brochure and a video."* $\rightarrow$ Shares **both** media cards simultaneously in one response.
* **Grounded Source Citations:** Cites `[Source: Greedy Adventures Sea View Skydiving](https://greedyadventures.com/sea-view-tandem-skydiving)` on all factual answers.
* **Anti-Hallucination Guardrails:** If requested information is unavailable (e.g. "Do you have skydiving in Antarctica?"), it explicitly states the topic is out of dropzone scope rather than inventing details.
* **Clear Demo Labeling:** All sample PDF and video media cards carry explicit **"Demo Material"** badges.

### 3. Read-Only Knowledge View (`/knowledge`)
* **Loaded Website Sources:** Displays page title, source URL, capture date (`2026-10-31`), and chunked text sections (Overview, Packages & Pricing, Itinerary, Safety & Scuba Rules, Cancellation Policies).
* **Available Media Catalog:** Lists all PDFs and MP4 video assets with file sizes, dimensions, demo badges, and public URLs.
* **Live Model & Retrieval Inspector:**
  * Enter any test question or click 1-click test buttons.
  * Calls `/api/knowledge/test` on the backend.
  * Displays the **actual source text passed to the model**, detected media intent, selected PDF/video assets, model engine, and execution latency.
  * **Zero static mock data on dashboard:** Directly reflects real backend activity.

---

## 🛠️ Architecture & Code Separation

```
├── public/
│   └── assets/
│       ├── brochure/
│       │   └── sea-view-skydiving-brochure.pdf   # Generated valid PDF brochure
│       └── videos/
│           └── sea-view-skydiving-experience.mp4 # Sample MP4 video reel (1.1 MB)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts                     # AI agent endpoint (multi-turn RAG)
│   │   │   ├── knowledge/route.ts                # Public knowledge reader
│   │   │   └── knowledge/test/route.ts           # Real backend model inspector
│   │   ├── knowledge/page.tsx                    # Knowledge View Dashboard
│   │   ├── layout.tsx                            # Root layout & metadata
│   │   └── page.tsx                              # Landing page with chat trigger
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatDrawer.tsx                    # assistant-ui chat modal/drawer
│   │   │   ├── ChatMessageContent.tsx            # Formatted markdown & citations
│   │   │   └── MediaCards.tsx                    # PDF & Video deliverables
│   │   └── landing/
│   │       ├── Navbar.tsx                        # Brand navigation & quick triggers
│   │       ├── Hero.tsx                          # Redesigned hero with metrics
│   │       ├── Packages.tsx                      # 3-tier package comparison cards
│   │       ├── ExperienceJourney.tsx             # 3-4 hour dropzone timeline
│   │       ├── SafetySection.tsx                 # USPA standards & scuba rule
│   │       ├── FaqSection.tsx                    # Accordion with chat triggers
│   │       └── Footer.tsx                        # Attributions & reviewer links
│   └── lib/
│       ├── ai/
│       │   └── agent.ts                          # RAG pipeline, Gemini & Fallback engine
│       └── knowledge/
│           ├── data.ts                           # Ingested chunks & media catalogue
│           └── service.ts                        # Keyword/semantic retrieval & intent detection
├── scripts/
│   ├── generate-brochure.js                      # PDF brochure generator
│   └── verify-all.js                             # Automated 7-point verification suite
```

---

## ⚙️ Setup & Running Locally

### 1. Prerequisites
* Node.js $\ge 18$ (Tested on Node.js v26.5)
* npm $\ge 9$

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd Greedy_Adventures_assesment_intern

# Install dependencies
npm install
```

### 3. Environment Variables (Optional)
The application works **100% out of the box** without any API keys using its built-in Intelligent Grounded Engine (Demo Mode). If you want to connect live Google Gemini:
```env
# Create .env.local
GEMINI_API_KEY="your-google-gemini-api-key"
```
The status pill inside the chat drawer and Knowledge View automatically updates to reflect whether live Gemini or the Intelligent Fallback Engine is active.

### 4. Run Development Server
```bash
npm run dev
# Open http://localhost:3000 in your browser
```

### 5. Production Build & Start
```bash
npm run build
npm start
```

---

## 🧪 Verification & Repeatable Test Suite

You can run our automated 7-point verification suite at any time while the server is running:

```bash
node scripts/verify-all.js
```

### Repeatable Checks Table

| Check | Input Query | Expected Output | Verification Status |
| :--- | :--- | :--- | :--- |
| **1. Text-only Answer** | `"What is included in the package?"` | Text breakdown of 3 packages with THB pricing, 0 media attachments, source citation. | ✅ Verified |
| **2. PDF Delivery** | `"Can you send me a brochure?"` | Interactive PDF Brochure card with Open & Download buttons, labeled Demo Material. | ✅ Verified |
| **3. Video Delivery** | `"Can I see a video of the experience?"`| Interactive HTML5 video player + external watch link, labeled Demo Material. | ✅ Verified |
| **4. Dual Delivery** | `"Send me the brochure and a video."` | Delivers **both** PDF card and Video player in the same response. | ✅ Verified |
| **5. Follow-up Memory** | Turn 1: *"Tell me about VIP."*<br>Turn 2: *"Can you send me the brochure for that?"* | Chat preserves history; Turn 2 recognizes context and attaches brochure. | ✅ Verified |
| **6. Missing Info** | `"Do you have skydiving in Antarctica?"` | Explicitly states unavailable outside dropzone offerings; does not hallucinate. | ✅ Verified |
| **7. Real Model Inspector**| Open `/knowledge` and run any test query | Shows actual source text chunks passed to model and selected media directly from backend. | ✅ Verified |

---

## 🔍 How to Open the Knowledge View

1. **Direct URL:** Navigate to [`/knowledge`](http://localhost:3000/knowledge).
2. **From the Navbar:** Click the **"Knowledge View"** link in the navigation header.
3. **From the Chat Drawer:** Click the **"Inspect Knowledge Base"** link at the bottom of the composer.
4. **From the Top Banner:** Click the **"Open Knowledge View"** shortcut link in the header notification strip.

---

## ⚠️ Limitations & Notes

* **Prototype Scope:** In accordance with the assignment brief, this is a working prototype. It does not require real booking transactions, user authentication, or a live payment gateway.
* **Demo Assets:** Sample PDF brochure and MP4 video clip are generated/packaged locally and labeled as *Demo Material* as requested.
* **Deterministic Fallback:** When `GEMINI_API_KEY` is not present, the system runs with deterministic knowledge-grounded logic to guarantee reviewers can test every scenario reliably with 0 setup overhead.

---

## 🤖 AI Assistance Disclosure

Developed with assistance from Google DeepMind's Advanced Agentic Coding environment (Antigravity). AI assistance was used for rapid component scaffolding, type safety checks, and automated verification scripting. All business logic, safety constraints, prompt engineering, and UI styling were verified and tested against the assignment requirements.
