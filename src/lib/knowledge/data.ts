export interface SourceChunk {
  id: string;
  category: string;
  title: string;
  text: string;
  keywords: string[];
}

export interface WebsiteSource {
  pageTitle: string;
  url: string;
  captureDate: string;
  description: string;
  chunks: SourceChunk[];
}

export interface MediaAsset {
  id: string;
  type: 'pdf' | 'video';
  title: string;
  filename: string;
  url: string;
  externalUrl?: string;
  size?: string;
  duration?: string;
  resolution?: string;
  isDemo: boolean;
  demoLabel: string;
  description: string;
  previewImage?: string;
}

export const WEBSITE_SOURCE: WebsiteSource = {
  pageTitle: "Greedy Adventures — Sea View Tandem Skydiving (Pattaya, Thailand)",
  url: "https://greedyadventures.com/sea-view-tandem-skydiving",
  captureDate: "2026-10-31",
  description: "Official public product and booking documentation for the coastal tandem skydiving experience over the Gulf of Thailand.",
  chunks: [
    {
      id: "overview-experience",
      category: "Overview & Location",
      title: "Sea View Skydiving Experience Overview",
      text: "Greedy Adventures Sea View Skydiving is Thailand's premier tandem skydiving experience located at the Pattaya Dropzone along the Gulf of Thailand. Jumpers exit the aircraft at 13,000 feet strapped securely to a USPA-certified instructor, reaching freefall speeds of 200–220 km/h for approximately 45–60 seconds, followed by a serene 5–7 minute canopy glide with 360-degree panoramic ocean views over Pattaya Bay, Koh Larn, and the tropical coastline before landing.",
      keywords: ["overview", "experience", "pattaya", "thailand", "altitude", "13000", "freefall", "canopy", "sea view", "skydiving"]
    },
    {
      id: "packages-inclusions",
      category: "Packages & Pricing",
      title: "Package Tiers & Inclusions",
      text: `Greedy Adventures offers 3 distinct tandem skydiving packages designed for different media preferences:

1. Eco Tandem Skydive (Jump Only) — 10,500 THB:
   • 13,000-ft tandem skydive with a licensed USPA tandem instructor
   • 20-minute comprehensive ground safety briefing and training
   • Complete skydiving gear: flight suit, harness, and protective goggles
   • Personalized Skydiving Certificate of Achievement
   • Note: Does not include camera footage or photos.

2. Handycam Pro Package (Most Popular) — 12,500 THB:
   • Everything included in the Eco Tandem Skydive
   • Instructor wrist-mounted wide-angle HD Handycam
   • Captures up-close facial reactions, aircraft exit, freefall, and canopy flight
   • 50+ high-resolution digital photos and edited 1080p video clip delivered digitally.

3. VIP Sea View Cine-Pack (Ultimate Value) — 14,000 THB (Official Price 17,050 THB, special promotional rate):
   • Everything in the Eco Tandem Skydive
   • Instructor Handycam wrist POV footage + photos
   • EXCLUSIVE PERSONAL OUTSIDE CAMERAMAN who leaps alongside you in freefall to capture sweeping cinematic 360-degree angles
   • 4K professionally edited cinematic highlight video with licensed soundtrack
   • 100+ high-resolution digital action photos
   • Pre-jump interview and post-landing celebration footage
   • Greedy Adventures commemorative souvenir gift.`,
      keywords: ["package", "packages", "included", "inclusions", "price", "pricing", "cost", "eco", "handycam", "vip", "cine-pack", "thb", "rates"]
    },
    {
      id: "itinerary-timeline",
      category: "Itinerary",
      title: "Dropzone Day-of-Jump Timeline",
      text: "Total dropzone commitment is approximately 3 to 4 hours. The experience consists of: 1) Arrival & Registration (20 mins); 2) Safety Briefing & Harness Fitting with your USPA Instructor (20 mins); 3) Scenic 15-minute aircraft flight climbing to 13,000 feet altitude; 4) The Leap: 45 to 60 seconds of adrenaline-packed freefall at 220 km/h; 5) Canopy Glide: Parachute deploys at 5,000 ft followed by a gentle 5 to 7 minute flight where you can help steer the canopy; 6) Soft Landing & Debrief: Certificate ceremony and media collection.",
      keywords: ["itinerary", "timeline", "duration", "hours", "schedule", "arrival", "briefing", "flight", "landing"]
    },
    {
      id: "safety-health-rules",
      category: "Safety & Requirements",
      title: "Safety Standards, Health & Eligibility Requirements",
      text: `Safety and eligibility requirements for Sea View Skydiving:
• Safety Equipment: 100% USPA-compliant dual-parachute systems equipped with Cypress 2 Automatic Activation Devices (AAD) that automatically fire the reserve canopy if required.
• Age Requirements: Minimum age is 10 years old. Participants under 18 years old must have a parent or legal guardian present to sign the consent waiver.
• Weight Limit: Standard maximum weight is 100 kg (proportional to height). A surcharge applies for participants between 95 kg and 100 kg due to instructor gear balancing.
• Scuba Diving Strict Safety Rule: You must NOT have engaged in scuba diving within 24 hours prior to skydiving to prevent decompression sickness / the bends.
• Health Restrictions: Jumpers must be in general good health. Not permitted for pregnant women, individuals with acute heart problems, severe spinal injuries, or epilepsy.
• Alcohol/Substances: Zero tolerance policy. No alcohol or recreational drugs within 12 hours prior to jumping.`,
      keywords: ["safety", "weight", "weight limit", "age", "health", "requirements", "scuba", "scuba diving", "pregnant", "uspa", "rules", "medical"]
    },
    {
      id: "booking-cancellation-weather",
      category: "Policies",
      title: "Booking, Weather & Rescheduling Policies",
      text: "Bookings can be reserved online or via WhatsApp with no upfront deposit required. Skydiving is weather-dependent. In the event of adverse weather (heavy rain, low cloud ceilings, or high winds), jumps are paused for safety. Guests may reschedule at no extra charge to any date within 12 months or request a full 100% refund of any prepaid fees. Round-trip transfers from central Pattaya hotels can be coordinated upon request.",
      keywords: ["booking", "cancellation", "weather", "reschedule", "refund", "deposit", "transfer", "hotel"]
    }
  ]
};

export const AVAILABLE_MEDIA: MediaAsset[] = [
  {
    id: "pdf-sea-view-brochure",
    type: "pdf",
    title: "Greedy Adventures — Sea View Skydiving Official Brochure 2026",
    filename: "sea-view-skydiving-brochure.pdf",
    url: "/assets/brochure/sea-view-skydiving-brochure.pdf",
    size: "2.9 KB",
    isDemo: true,
    demoLabel: "Demo Material",
    description: "Official brochure covering 13,000ft tandem skydiving package breakdowns, dropzone facilities, USPA safety protocols, and booking guidelines."
  },
  {
    id: "video-sea-view-experience",
    type: "video",
    title: "Sea View Skydiving Experience Reel (13,000 FT Freefall)",
    filename: "sea-view-skydiving-experience.mp4",
    url: "/assets/videos/sea-view-skydiving-experience.mp4",
    externalUrl: "https://www.youtube.com/results?search_query=sea+view+skydiving+pattaya+greedyadventures",
    duration: "0:45",
    resolution: "1080p Full HD",
    isDemo: true,
    demoLabel: "Demo Material",
    description: "Action-packed freefall footage showcasing aircraft exit at 13,000ft, Gulf of Thailand coastline vistas, outside cameraman angles, and smooth beach landing."
  }
];
