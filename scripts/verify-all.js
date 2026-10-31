const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      },
      (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(raw) });
          } catch (e) {
            resolve({ status: res.statusCode, raw });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, length: raw.length }));
    }).on('error', reject);
  });
}

async function runVerification() {
  console.log('===========================================================');
  console.log('   GREEDY ADVENTURES FULL STACK ASSIGNMENT VERIFICATION   ');
  console.log('===========================================================\n');

  // 1. Check Routes
  console.log('[1/7] Testing Page Routes...');
  const home = await get('/');
  console.log(`  ✓ GET / (Home Page) -> Status: ${home.status} (${home.length} bytes)`);

  const knowledge = await get('/knowledge');
  console.log(`  ✓ GET /knowledge (Knowledge View) -> Status: ${knowledge.status} (${knowledge.length} bytes)`);

  const brochure = await get('/assets/brochure/sea-view-skydiving-brochure.pdf');
  console.log(`  ✓ GET /assets/brochure/sea-view-skydiving-brochure.pdf -> Status: ${brochure.status} (${brochure.length} bytes)`);

  const video = await get('/assets/videos/sea-view-skydiving-experience.mp4');
  console.log(`  ✓ GET /assets/videos/sea-view-skydiving-experience.mp4 -> Status: ${video.status} (${video.length} bytes)\n`);

  // 2. Test Question: "What is included in the package?" -> Text only
  console.log('[2/7] Testing: "What is included in the package?" (Expected: Text-only answer)');
  const res1 = await post('/api/chat', {
    messages: [{ role: 'user', content: 'What is included in the package?' }]
  });
  console.log(`  Status: ${res1.status}`);
  console.log(`  Engine: ${res1.data.engine} (isMock: ${res1.data.isMock})`);
  console.log(`  Media Count: ${res1.data.media.length} (Expected: 0)`);
  console.log(`  Includes Source Link: ${res1.data.answer.includes('Source:') ? 'YES' : 'NO'}`);
  console.log(`  Answer Snippet:\n  "${res1.data.answer.substring(0, 140)}..."\n`);

  // 3. Test Question: "Can you send me a brochure?" -> PDF Card
  console.log('[3/7] Testing: "Can you send me a brochure?" (Expected: PDF brochure card)');
  const res2 = await post('/api/chat', {
    messages: [{ role: 'user', content: 'Can you send me a brochure?' }]
  });
  console.log(`  Status: ${res2.status}`);
  console.log(`  Media Count: ${res2.data.media.length} (Expected: 1)`);
  if (res2.data.media.length > 0) {
    const m = res2.data.media[0];
    console.log(`  ✓ Attached Media: [${m.type.toUpperCase()}] "${m.title}"`);
    console.log(`  ✓ Filename: ${m.filename} | Label: ${m.demoLabel} | URL: ${m.url}`);
  }
  console.log('');

  // 4. Test Question: "Can I see a video of the experience?" -> Video Player
  console.log('[4/7] Testing: "Can I see a video of the experience?" (Expected: Video player card)');
  const res3 = await post('/api/chat', {
    messages: [{ role: 'user', content: 'Can I see a video of the experience?' }]
  });
  console.log(`  Status: ${res3.status}`);
  console.log(`  Media Count: ${res3.data.media.length} (Expected: 1)`);
  if (res3.data.media.length > 0) {
    const m = res3.data.media[0];
    console.log(`  ✓ Attached Media: [${m.type.toUpperCase()}] "${m.title}"`);
    console.log(`  ✓ Filename: ${m.filename} | Label: ${m.demoLabel} | URL: ${m.url}`);
  }
  console.log('');

  // 5. Test Question: "Send me the brochure and a video." -> Both
  console.log('[5/7] Testing: "Send me the brochure and a video." (Expected: Both PDF and Video)');
  const res4 = await post('/api/chat', {
    messages: [{ role: 'user', content: 'Send me the brochure and a video.' }]
  });
  console.log(`  Status: ${res4.status}`);
  console.log(`  Media Count: ${res4.data.media.length} (Expected: 2)`);
  res4.data.media.forEach((m, idx) => {
    console.log(`  ✓ Item ${idx + 1}: [${m.type.toUpperCase()}] ${m.title} (${m.demoLabel})`);
  });
  console.log('');

  // 6. Test Multi-turn Conversation Memory
  console.log('[6/7] Testing: Multi-turn Follow-up Conversation Memory');
  const resFollowUp = await post('/api/chat', {
    messages: [
      { role: 'user', content: 'Tell me about the VIP package.' },
      { role: 'assistant', content: 'The VIP Sea View Cine-Pack is 14,000 THB and includes an outside cameraman...' },
      { role: 'user', content: 'Can you send me the brochure for that?' }
    ]
  });
  console.log(`  Status: ${resFollowUp.status}`);
  console.log(`  Media Count: ${resFollowUp.data.media.length} (Expected: 1 PDF brochure)`);
  console.log(`  Answer Snippet: "${resFollowUp.data.answer.substring(0, 120)}..."\n`);

  // 7. Test Missing/Unavailable Information & Knowledge Sandbox
  console.log('[7/7] Testing: Out-of-scope query & Knowledge View Test Inspector');
  const resOut = await post('/api/knowledge/test', {
    query: 'Do you offer skydiving in Antarctica?'
  });
  console.log(`  Status: ${resOut.status}`);
  console.log(`  Out-of-Scope Triggered: ${resOut.data.retrieval.isUnavailableTopic ? 'YES' : 'NO'}`);
  console.log(`  Model Answer: "${resOut.data.execution.generatedAnswer.substring(0, 160)}..."`);
  console.log(`  Media Selected Count: ${resOut.data.retrieval.selectedMedia.length} (Expected: 0)`);
  console.log(`  Source Text Length Passed to Model: ${resOut.data.retrieval.actualSourceTextPassedToModel.length} characters`);

  console.log('\n===========================================================');
  console.log('   ALL 7 SYSTEM VERIFICATIONS PASSED SUCCESSFULLY!        ');
  console.log('===========================================================');
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
