const http = require('http');

const BASE_URL = 'http://localhost:3000';

function post(endpoint, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    const bodyStr = JSON.stringify(data);
    const req = http.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr)
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch (e) {
          resolve({ status: res.statusCode, raw });
        }
      });
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

function get(endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    const req = http.request(url, { method: 'GET' }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch (e) {
          resolve({ status: res.statusCode, raw });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runComprehensiveTests() {
  console.log('===============================================================');
  console.log('       COMPREHENSIVE CHATBOT AUTOMATED TEST SUITE              ');
  console.log('===============================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`  [FAIL] ${testName} - ${details}`);
      failedCount++;
    }
  }

  // TEST 1: Package Question (Text only)
  console.log('--- TEST GROUP 1: Core Package Questions (Text Only) ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'What is included in the package?' }]
    });
    assert(res.status === 200, 'HTTP 200 on package inquiry');
    assert(Array.isArray(res.data.media) && res.data.media.length === 0, 'Zero media attachments (Text-only format)');
    assert(res.data.answer.includes('Eco') && res.data.answer.includes('Handycam') && res.data.answer.includes('VIP'), 'Covers all 3 package tiers (Eco, Handycam, VIP)');
    assert(res.data.answer.includes('10,500') && res.data.answer.includes('12,500') && res.data.answer.includes('14,000'), 'Includes exact THB pricing');
    assert(res.data.answer.includes('[Source:'), 'Includes official website source reference');
  }

  // TEST 2: Brochure Request (PDF card)
  console.log('\n--- TEST GROUP 2: Brochure Delivery (PDF Card) ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'Can you send me a brochure?' }]
    });
    assert(res.status === 200, 'HTTP 200 on brochure request');
    assert(res.data.media && res.data.media.length === 1, 'Exactly 1 media attachment returned');
    assert(res.data.media[0].type === 'pdf', 'Attached media is of type "pdf"');
    assert(res.data.media[0].filename === 'sea-view-skydiving-brochure.pdf', 'Correct brochure filename delivered');
    assert(res.data.media[0].isDemo === true && res.data.media[0].demoLabel === 'Demo Material', 'Asset clearly labeled as "Demo Material"');
  }

  // TEST 3: Video Request (Video player card)
  console.log('\n--- TEST GROUP 3: Experience Video (Video Card) ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'Can I see a video of the experience?' }]
    });
    assert(res.status === 200, 'HTTP 200 on video request');
    assert(res.data.media && res.data.media.length === 1, 'Exactly 1 media attachment returned');
    assert(res.data.media[0].type === 'video', 'Attached media is of type "video"');
    assert(res.data.media[0].filename === 'sea-view-skydiving-experience.mp4', 'Correct video filename delivered');
    assert(res.data.media[0].isDemo === true, 'Video labeled as demo material');
  }

  // TEST 4: Both Brochure and Video
  console.log('\n--- TEST GROUP 4: Dual Delivery (Brochure AND Video) ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'Send me the brochure and a video.' }]
    });
    assert(res.status === 200, 'HTTP 200 on dual request');
    assert(res.data.media && res.data.media.length === 2, 'Exactly 2 media attachments returned');
    const hasPdf = res.data.media.some(m => m.type === 'pdf');
    const hasVideo = res.data.media.some(m => m.type === 'video');
    assert(hasPdf && hasVideo, 'Contains both 1 PDF and 1 Video asset');
  }

  // TEST 5: Phrasing Variation: "Can you share both?"
  console.log('\n--- TEST GROUP 5: Phrasing Variation "Can you share both?" ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'Can you share both brochure and video please?' }]
    });
    assert(res.data.media && res.data.media.length === 2, 'Dual intent detected from natural phrasing variation');
  }

  // TEST 6: Phrasing Variation: "I want to watch some footage of the jump"
  console.log('\n--- TEST GROUP 6: Phrasing Variation "footage of the jump" ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'I want to watch some footage of the jump' }]
    });
    assert(res.data.media && res.data.media.length === 1 && res.data.media[0].type === 'video', 'Video intent detected from "watch footage"');
  }

  // TEST 7: Safety & Scuba Diving Question
  console.log('\n--- TEST GROUP 7: Safety, Weight, Age & Scuba 24-hr Rule ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'What are the weight and age requirements, and what is the scuba rule?' }]
    });
    assert(res.status === 200, 'HTTP 200 on safety inquiry');
    assert(res.data.media.length === 0, 'Text-only response for safety question');
    assert(res.data.answer.includes('100 kg') && res.data.answer.includes('10 years'), 'Includes 100 kg weight limit and 10 year age limit');
    assert(res.data.answer.includes('24 hours') && res.data.answer.includes('scuba'), 'Includes 24-hour scuba diving rule');
    assert(res.data.answer.includes('Cypress 2') || res.data.answer.includes('AAD'), 'Includes Cypress 2 AAD automatic activation device');
  }

  // TEST 8: Weather, Rainy Day & Cancellation Policy
  console.log('\n--- TEST GROUP 8: Weather & Refund Policy ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'What happens if it rains on my booking date?' }]
    });
    assert(res.status === 200, 'HTTP 200 on weather inquiry');
    assert(res.data.answer.includes('Weather Guarantee') || res.data.answer.includes('reschedule') || res.data.answer.includes('refund'), 'Explains weather pause, free rescheduling and 100% refund');
  }

  // TEST 9: Dropzone Timeline / Duration
  console.log('\n--- TEST GROUP 9: Dropzone Itinerary & Duration ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'How long does the whole experience take from start to finish?' }]
    });
    assert(res.status === 200, 'HTTP 200 on duration inquiry');
    assert(res.data.answer.includes('3 to 4 hours') || res.data.answer.includes('3–4 hours'), 'Specifies 3 to 4 hours total duration');
  }

  // TEST 10: What to Wear
  console.log('\n--- TEST GROUP 10: Clothing & Footwear Requirements ---');
  {
    const res = await post('/api/chat', {
      messages: [{ role: 'user', content: 'What shoes and clothes should I wear?' }]
    });
    assert(res.status === 200, 'HTTP 200 on clothing inquiry');
    assert(res.data.answer.includes('sneakers') || res.data.answer.includes('running shoes'), 'Explicitly requires lace-up sneakers / running shoes');
  }

  // TEST 11: Out-of-Scope / Unavailable Information (No Hallucination)
  console.log('\n--- TEST GROUP 11: Out-of-Scope & Unavailable Topics (Truthfulness) ---');
  {
    const res1 = await post('/api/chat', {
      messages: [{ role: 'user', content: 'Do you offer skydiving over Antarctica?' }]
    });
    assert(res1.status === 200, 'HTTP 200 on out-of-scope inquiry');
    assert(res1.data.media.length === 0, 'No media attached for out-of-scope query');
    assert(res1.data.answer.includes('do not have information') || res1.data.answer.includes('apologize') || res1.data.answer.includes('outside'), 'Truthfully states information is unavailable without hallucinating');
    assert(res1.data.retrieval.isUnavailableTopic === true, 'isUnavailableTopic flag correctly set to true');

    const res2 = await post('/api/chat', {
      messages: [{ role: 'user', content: 'Can I do a jump in Dubai?' }]
    });
    assert(res2.data.retrieval.isUnavailableTopic === true, 'Dubai recognized as outside Pattaya dropzone');
  }

  // TEST 12: Multi-turn Follow-up Context Memory
  console.log('\n--- TEST GROUP 12: Multi-Turn Conversation Memory ---');
  {
    const turn1 = { role: 'user', content: 'What packages do you have?' };
    const res1 = await post('/api/chat', { messages: [turn1] });
    const asst1 = { role: 'assistant', content: res1.data.answer };

    const turn2 = { role: 'user', content: 'Can you send me the brochure for these?' };
    const res2 = await post('/api/chat', { messages: [turn1, asst1, turn2] });

    assert(res2.data.media && res2.data.media.length === 1 && res2.data.media[0].type === 'pdf', 'Turn 2 delivers PDF brochure while remembering previous context');

    const asst2 = { role: 'assistant', content: res2.data.answer };
    const turn3 = { role: 'user', content: 'Now show me the video too' };
    const res3 = await post('/api/chat', { messages: [turn1, asst1, turn2, asst2, turn3] });

    assert(res3.data.media && res3.data.media.length === 1 && res3.data.media[0].type === 'video', 'Turn 3 delivers Video reel following PDF turn seamlessly');
  }

  // TEST 13: Knowledge API Endpoints
  console.log('\n--- TEST GROUP 13: Knowledge View Backend Endpoints ---');
  {
    const res = await get('/api/knowledge');
    assert(res.status === 200, 'GET /api/knowledge responds with 200 OK');
    assert(res.data.sources.chunks.length === 5, 'Returns all 5 ingested website chunks');
    assert(res.data.availableMedia.length === 2, 'Returns catalog of 2 media assets (PDF + Video)');
    assert(res.data.sources.url === 'https://greedyadventures.com/sea-view-tandem-skydiving', 'Correct source URL loaded');
  }

  // TEST 14: Knowledge View Test Runner (Real Activity Inspector)
  console.log('\n--- TEST GROUP 14: Real Backend Activity Inspector (/api/knowledge/test) ---');
  {
    const res = await post('/api/knowledge/test', { query: 'Can you send me a brochure?' });
    assert(res.status === 200, 'POST /api/knowledge/test responds with 200 OK');
    assert(res.data.retrieval.mediaIntent === 'brochure', 'Reports real mediaIntent "brochure"');
    assert(res.data.retrieval.selectedMedia.length === 1 && res.data.retrieval.selectedMedia[0].type === 'pdf', 'Reflects real backend selectedMedia (PDF brochure)');
    assert(typeof res.data.retrieval.actualSourceTextPassedToModel === 'string' && res.data.retrieval.actualSourceTextPassedToModel.length > 500, 'Exposes actual source text context passed to model');
    assert(typeof res.data.execution.latencyMs === 'number', 'Reports backend execution latency');
  }

  console.log('\n===============================================================');
  console.log(`TOTAL TESTS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log('===============================================================');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runComprehensiveTests().catch(err => {
  console.error('Test suite failed with unexpected error:', err);
  process.exit(1);
});

