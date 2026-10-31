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
  description: "Official public product, pricing, dropzone logistics, and safety documentation for coastal tandem skydiving over Pattaya Bay and the Gulf of Thailand.",
  chunks: [
    {
      id: "overview-experience",
      category: "Overview & Location",
      title: "Sea View Skydiving Experience Overview",
      text: "Greedy Adventures Sea View Skydiving is Thailand's premier tandem skydiving experience located at the Pattaya Coastal Dropzone along the Gulf of Thailand. Jumpers exit the jump aircraft at 13,000 feet securely harnessed to a licensed USPA tandem master. Jumpers experience 45 to 60 seconds of adrenaline-filled freefall reaching speeds of 200–220 km/h (125 mph), followed by parachute deployment at 5,000 feet and a serene 5 to 7 minute canopy flight with 360-degree panoramic ocean views over Pattaya Bay, Koh Larn island, and the surrounding coastline before touching down on the beachside landing zone.",
      keywords: ["overview", "experience", "pattaya", "thailand", "altitude", "13000", "freefall", "canopy", "sea view", "skydiving", "gulf of thailand", "ocean view"]
    },
    {
      id: "packages-inclusions",
      category: "Packages & Pricing",
      title: "Package Tiers & Official Pricing",
      text: `Greedy Adventures offers 3 distinct tandem skydiving packages based on media preferences:

1. Eco Tandem Skydive (Jump Only) — 9,500 to 10,500 THB:
   • Full 13,000-ft tandem skydive with a licensed USPA-certified instructor
   • 20-minute safety training and jumpsuit/goggles gear fitting
   • Personalized Skydiving Certificate of Completion
   • Note: Pure jumping experience, does not include photo or video recording.

2. Handycam Pro Package (Most Popular) — 12,500 THB:
   • Everything in the Eco Tandem Skydive
   • Instructor wrist-mounted wide-angle HD camera recording throughout
   • Captures up-close facial expressions, the aircraft exit, freefall, and canopy flight
   • 50+ high-resolution digital photos and edited HD highlight video clip delivered digitally.

3. VIP Sea View Cine-Pack (Ultimate Value) — 14,000 THB (Official Rack Rate: 17,050 THB, promotional discount applied):
   • Everything in the Eco Tandem Skydive
   • Instructor Handycam wrist POV footage + photos
   • EXCLUSIVE DEDICATED OUTSIDE CAMERAMAN who leaps alongside you in freefall, capturing sweeping cinematic 360-degree angles with coastal ocean panoramas
   • 4K professionally edited cinematic video reel with music soundtrack
   • 100+ high-resolution digital action photos
   • Pre-jump interview, inflight reactions, and celebratory post-landing ceremony footage
   • Greedy Adventures commemorative souvenir gift.`,
      keywords: ["package", "packages", "included", "inclusions", "price", "pricing", "cost", "eco", "handycam", "vip", "cine-pack", "thb", "rates", "discount", "10500", "12500", "14000", "17050"]
    },
    {
      id: "itinerary-timeline",
      category: "Itinerary & Logistics",
      title: "Dropzone Day-of-Jump Timeline & Duration",
      text: "Total dropzone commitment is approximately 3 to 4 hours. The experience is organized load-by-load: 1) Arrival & Check-in (20 mins): Registration, identity check, and health waiver; 2) Safety Briefing & Gear Fitting (20 mins): Body posture rehearsal ('banana arch') and harness adjustment with your tandem master; 3) Scenic Ascent Flight (15 mins): Climbing to 13,000 feet in an unpressurized turbine aircraft with coastal views; 4) The Leap: 45 to 60 seconds of terminal velocity freefall at 220 km/h; 5) Canopy Glide: Parachute deploys smoothly at 5,000 ft for a peaceful 5–7 minute descent where you can steer the canopy toggles; 6) Soft Touchdown & Debrief (15 mins): Beachside landing, certificate presentation, and digital media collection.",
      keywords: ["itinerary", "timeline", "duration", "hours", "schedule", "arrival", "briefing", "flight", "landing", "how long", "time commitment"]
    },
    {
      id: "safety-health-rules",
      category: "Safety & Requirements",
      title: "USPA Standards, Weight, Age & Scuba Rules",
      text: `Safety and eligibility rules enforced at the Pattaya Dropzone:
• USPA Certification: 100% USPA-compliant dropzone with dual-parachute rigs equipped with Cypress 2 Automatic Activation Devices (AAD) that automatically deploy the reserve canopy if required.
• Age Requirements: Minimum age is 10 years old. Jumpers under 18 must have a parent or legal guardian present to sign the consent waiver. Valid passport or national photo ID required for all guests.
• Weight Limit: Strict maximum limit is 100 kg (220 lbs), proportional to height for secure harness fitting. Surcharges apply for participants weighing between 95 kg and 100 kg due to instructor equipment balancing.
• 24-Hour Scuba Diving Strict Safety Rule: You must NOT have engaged in scuba diving within 24 hours prior to skydiving to prevent decompression sickness (the bends) during rapid altitude changes.
• Health Restrictions: Must be in general good physical condition. Not permitted for pregnant women, or participants with acute cardiac conditions, severe spinal trauma, or epilepsy.
• Substance Policy: Zero-tolerance rule. No alcohol or recreational substances within 12 hours prior to jumping.`,
      keywords: ["safety", "weight", "weight limit", "age", "health", "requirements", "scuba", "scuba diving", "pregnant", "uspa", "rules", "medical", "aad", "cypress", "100kg"]
    },
    {
      id: "personal-cameras-gopro",
      category: "Media & Camera Policies",
      title: "Personal Cameras, GoPros & Media Equipment Regulations",
      text: "Under strict international USPA and civil aviation safety regulations, personal cameras, selfie sticks, mobile phones, and personal GoPros are STRICTLY PROHIBITED on the aircraft and during the jump. Loose items pose severe safety hazards to jumpers and instructors at 220 km/h freefall speeds. To capture your skydiving experience, guests can book professional media packages: Handycam Pro (instructor wrist-mounted wide-angle camera) or VIP Sea View Cine-Pack (dedicated outside professional cameraman who leaps alongside you in freefall to capture 4K video and high-res photos).",
      keywords: ["camera", "gopro", "phone", "selfie", "selfie stick", "personal camera", "recording", "photos", "footage", "outside cameraman", "handycam", "video policy"]
    },
    {
      id: "spectators-facilities",
      category: "Facilities & Spectators",
      title: "Spectator Viewing Area, Free Lockers & Facilities",
      text: "Family members and friends are welcome to accompany jumpers to the Pattaya Dropzone as spectators! Dropzone facilities include: a designated spectator viewing area where supporters can watch the jump aircraft take off and view beachside parachute landings; an air-conditioned briefing lounge with seating; clean restrooms and refreshments; and free secure lockers provided on site for storing phones, wallets, jewelry, passports, and personal bags while you are gearing up and jumping.",
      keywords: ["spectator", "spectators", "family", "friends", "watch", "viewing area", "lockers", "storage", "facilities", "lounge", "refreshments", "bring friends"]
    },
    {
      id: "transportation-hotel-pickup",
      category: "Transportation",
      title: "Hotel Transfers from Pattaya & Bangkok Transit Options",
      text: "Greedy Adventures provides convenient ground transit options for all skydiving guests: 1) Central Pattaya: Convenient round-trip shared and private hotel transfers can be coordinated from any central Pattaya hotel directly to the dropzone; 2) Bangkok: Bangkok does not have skydiving directly in the city center, so fixed-price private vehicle transfer add-ons from central Bangkok hotels or Suvarnabhumi Airport (BKK) directly to the dropzone can be booked upon request; 3) Self-drive / Taxi: Secure dropzone parking is available for guests arriving via private car or ride-share.",
      keywords: ["transport", "transportation", "hotel", "hotel pickup", "pickup", "transfer", "pattaya hotel", "bangkok", "bangkok pickup", "airport", "taxi", "parking"]
    },
    {
      id: "weather-booking-refund",
      category: "Policies",
      title: "Weather Guarantees, Cancellation & Rescheduling Terms",
      text: "Skydiving operations depend entirely on clear visibility, cloud ceiling, and coastal wind speed, which are evaluated load-by-load. If adverse weather (rain, low clouds, or excessive wind) pauses or halts flight operations on your jump date: 1) Free Rescheduling: You can wait for the next weather window on the same day or reschedule to any future date within 12 months with ZERO change fees; 2) 100% Full Refund: If weather prevents jumping entirely and you cannot reschedule, you receive a full 100% refund of any prepaid amount; 3) No Upfront Deposit: You can reserve your booking date with zero upfront deposit.",
      keywords: ["booking", "cancellation", "weather", "reschedule", "refund", "deposit", "rain", "wind", "policy", "guarantee", "adverse weather"]
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
    description: "Comprehensive 2026 brochure covering 13,000ft tandem package breakdowns (Eco, Handycam, VIP Cine-Pack), dropzone facilities, USPA safety protocols, and booking guidelines."
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
