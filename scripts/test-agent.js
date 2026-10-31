const { runAgent } = require('../src/lib/ai/agent');

async function testAgent() {
  const tests = [
    { name: '1. Package question', query: 'What is included in the package?' },
    { name: '2. Brochure request', query: 'Can you send me a brochure?' },
    { name: '3. Video request', query: 'Can I see a video of the experience?' },
    { name: '4. Both brochure and video', query: 'Send me the brochure and a video.' },
    { name: '5. Missing information', query: 'Do you have skydiving in Antarctica?' }
  ];

  console.log('--- RUNNING AGENT VERIFICATION SUITE ---\n');

  for (const t of tests) {
    console.log(`Testing: "${t.name}" -> Query: "${t.query}"`);
    const res = await runAgent([{ role: 'user', content: t.query }]);
    console.log(`Engine: ${res.engine} (isMock: ${res.isMock}) | Latency: ${res.latencyMs}ms`);
    console.log(`Media Intent: ${res.retrieval.mediaIntent}`);
    console.log(`Selected Media Count: ${res.media.length}`);
    res.media.forEach(m => console.log(`  -> [${m.type.toUpperCase()}] ${m.title} (${m.demoLabel})`));
    console.log(`Answer Preview: ${res.answer.substring(0, 100)}...`);
    console.log(`----------------------------------------------------\n`);
  }
}

testAgent().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
