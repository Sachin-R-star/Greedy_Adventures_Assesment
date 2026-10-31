import { WEBSITE_SOURCE, AVAILABLE_MEDIA, SourceChunk, MediaAsset, WebsiteSource } from './data';

export type MediaIntent = 'none' | 'brochure' | 'video' | 'both';

export interface RetrievalResult {
  query: string;
  matchedChunks: SourceChunk[];
  combinedContext: string;
  sourceUrl: string;
  sourceTitle: string;
  mediaIntent: MediaIntent;
  selectedMedia: MediaAsset[];
  isUnavailableTopic: boolean;
}

/**
 * Normalizes input text for keyword and semantic matching
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);
}

/**
 * Detects whether the user is requesting a PDF brochure, video, both, or text only
 */
export function detectMediaIntent(query: string): MediaIntent {
  const q = query.toLowerCase().trim();

  // Explicit 'both' phrases
  const bothPhrases = [
    'send both',
    'share both',
    'give me both',
    'both of them',
    'both brochure and video',
    'brochure and a video',
    'brochure and video',
    'video and brochure',
    'video and a brochure',
    'pdf and video',
    'video and pdf',
    'both please'
  ];

  if (bothPhrases.some(phrase => q.includes(phrase))) {
    return 'both';
  }

  // Standalone 'both'
  if (q === 'both' || q === 'both please' || q === 'both thanks') {
    return 'both';
  }

  const brochureKeywords = ['brochure', 'pdf', 'pamphlet', 'leaflet', 'document', 'catalog', 'catalogue', 'handout', 'download brochure', 'download pdf'];
  const videoKeywords = [
    'video',
    'watch video',
    'watch a video',
    'watch the video',
    'watch the jump',
    'watch footage',
    'watch clip',
    'clip',
    'footage',
    'teaser',
    'film',
    'movie',
    'preview video',
    'see a video',
    'show a video',
    'experience video',
    'reel',
    'video reel'
  ];

  const wantsBrochure = brochureKeywords.some(kw => q.includes(kw));
  // Ensure "watch" in spectator context ("friends come to watch", "family watch") does not trigger video
  const isSpectatorContext = q.includes('come to watch') || q.includes('friends watch') || q.includes('family watch') || q.includes('spectator');
  const wantsVideo = !isSpectatorContext && (videoKeywords.some(kw => q.includes(kw)) || (q.includes('watch') && (q.includes('jump') || q.includes('freefall') || q.includes('it') || q.includes('this'))));

  if (wantsBrochure && wantsVideo) {
    return 'both';
  }
  if (wantsBrochure) {
    return 'brochure';
  }
  if (wantsVideo) {
    return 'video';
  }

  return 'none';
}

/**
 * Checks if the user is asking about topics completely outside our Sea View Skydiving dropzone
 */
export function checkUnavailableTopic(query: string): boolean {
  const q = query.toLowerCase();
  
  // List of out-of-scope topics / locations outside Pattaya dropzone
  const outOfScopeKeywords = [
    'antarctica',
    'everest',
    'mars',
    'moon',
    'bungee',
    'scuba certification',
    'scuba course',
    'scuba diving license',
    'deep sea submarine',
    'space travel',
    'space flight',
    'pilot home address',
    'phone number of the ceo',
    'personal phone number',
    'skiing',
    'snowboard',
    'formula 1',
    'f1',
    'dubai',
    'bali',
    'france',
    'switzerland',
    'hot air balloon',
    'helicopter to space'
  ];

  return outOfScopeKeywords.some(phrase => q.includes(phrase));
}

/**
 * Retrieves relevant source chunks based on the user query
 */
export function retrieveKnowledge(query: string): RetrievalResult {
  const tokens = tokenize(query);
  const mediaIntent = detectMediaIntent(query);
  const isUnavailable = checkUnavailableTopic(query);

  const scoredChunks = WEBSITE_SOURCE.chunks.map(chunk => {
    let score = 0;
    const chunkTokens = tokenize(`${chunk.title} ${chunk.text} ${chunk.keywords.join(' ')}`);

    for (const t of tokens) {
      if (chunk.keywords.includes(t)) {
        score += 4;
      }
      if (chunk.title.toLowerCase().includes(t)) {
        score += 3;
      }
      if (chunkTokens.includes(t)) {
        score += 1;
      }
    }

    return { chunk, score };
  });

  // Sort chunks by relevance
  scoredChunks.sort((a, b) => b.score - a.score);

  // Take top chunks or default to the most essential chunks (overview + packages)
  let matchedChunks = scoredChunks.filter(sc => sc.score > 0).map(sc => sc.chunk);
  if (matchedChunks.length === 0) {
    matchedChunks = [WEBSITE_SOURCE.chunks[0], WEBSITE_SOURCE.chunks[1]];
  }

  // Select media assets according to detected intent
  const selectedMedia: MediaAsset[] = [];
  const brochureAsset = AVAILABLE_MEDIA.find(m => m.type === 'pdf')!;
  const videoAsset = AVAILABLE_MEDIA.find(m => m.type === 'video')!;

  if (mediaIntent === 'both') {
    selectedMedia.push(brochureAsset, videoAsset);
  } else if (mediaIntent === 'brochure') {
    selectedMedia.push(brochureAsset);
  } else if (mediaIntent === 'video') {
    selectedMedia.push(videoAsset);
  }

  const combinedContext = matchedChunks
    .map(c => `[Section: ${c.title}]\n${c.text}`)
    .join('\n\n');

  return {
    query,
    matchedChunks,
    combinedContext,
    sourceUrl: WEBSITE_SOURCE.url,
    sourceTitle: WEBSITE_SOURCE.pageTitle,
    mediaIntent,
    selectedMedia,
    isUnavailableTopic: isUnavailable
  };
}

export function getAllWebsiteSources(): WebsiteSource {
  return WEBSITE_SOURCE;
}

export function getAllAvailableMedia(): MediaAsset[] {
  return AVAILABLE_MEDIA;
}
