/**
 * PhishGuard Automated System & Heuristics Test Suite
 */

const { analyzeURL } = require('../src/lib/heuristics.js');
const { 
  emailChallenges, 
  urlChallenges, 
  inspectorChallenges, 
  comparisonPairs, 
  knowledgeArticles, 
  threatFeed 
} = require('../src/lib/challenges.js');

async function runTestSuite() {
  console.log('====================================================');
  console.log('🛡️  PHISHGUARD COMPREHENSIVE AUTOMATED TEST SUITE');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
    }
  }

  // ----------------------------------------------------
  // TEST GROUP 1: Heuristic Engine - Benign URLs
  // ----------------------------------------------------
  console.log('📦 TEST GROUP 1: Heuristic Engine on Legitimate Domains');
  const benignUrls = [
    'https://www.google.com',
    'https://www.paypal.com/signin',
    'https://github.com/login',
    'https://microsoft.com'
  ];

  for (const url of benignUrls) {
    const result = analyzeURL(url);
    assert(result.risk.score <= 25, `Benign URL should have Low/Safe Risk (<=25): ${url} [Score: ${result.risk.score}]`);
    assert(result.risk.level === 'safe' || result.risk.level === 'low', `Risk Level should be safe/low for: ${url} [Level: ${result.risk.level}]`);
    assert(result.checks.length === 18, `All 18 heuristic checks must be present for: ${url}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 2: Heuristic Engine - Phishing / Attack URLs
  // ----------------------------------------------------
  console.log('\n📦 TEST GROUP 2: Heuristic Engine on Known Phishing Patterns');

  // 1. Typosquatting
  const typoResult = analyzeURL('http://paypa1-secure.com/signin');
  const typoCheck = typoResult.checks.find(c => c.id === 'typosquatting');
  assert(!typoCheck.passed, 'Typosquatting check must trigger on paypa1-secure.com');
  assert(typoResult.risk.score >= 50, `Risk score should be elevated (>=50) for typosquatted URL [Score: ${typoResult.risk.score}]`);

  // 2. Homograph Cyrillic attack
  const homographResult = analyzeURL('https://p\u0430ypal.com'); // Cyrillic small 'a'
  const homographCheck = homographResult.checks.find(c => c.id === 'homograph');
  assert(!homographCheck.passed, 'Homograph check must detect Cyrillic Unicode character in domain');
  assert(homographResult.risk.score >= 50, `Homograph attack should flag critical risk (>=50) [Score: ${homographResult.risk.score}]`);

  // 3. Raw IP address URL
  const ipResult = analyzeURL('http://192.168.1.100/secure/login');
  const ipCheck = ipResult.checks.find(c => c.id === 'ip_address');
  assert(!ipCheck.passed, 'IP Address check must flag direct IP address usage');

  // 4. Excessive Subdomains
  const subResult = analyzeURL('https://login.verify.account.security.updates.suspicious.com');
  const subCheck = subResult.checks.find(c => c.id === 'subdomains');
  assert(!subCheck.passed, 'Subdomain check must flag excessive subdomains (>3 levels)');

  // 5. Data URI scheme
  const dataResult = analyzeURL('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==');
  const dataCheck = dataResult.checks.find(c => c.id === 'data_uri');
  assert(!dataCheck.passed, 'Data URI check must flag data: scheme');

  // 6. Suspicious TLD
  const tldResult = analyzeURL('http://paypal-verification.tk/login');
  const tldCheck = tldResult.checks.find(c => c.id === 'suspicious_tld');
  assert(!tldCheck.passed, 'Suspicious TLD check must flag .tk domain');

  // ----------------------------------------------------
  // TEST GROUP 3: Challenge Data & Content Validation
  // ----------------------------------------------------
  console.log('\n📦 TEST GROUP 3: Training Challenges & Content Schemas');
  assert(Array.isArray(emailChallenges) && emailChallenges.length >= 6, `Email challenges dataset loaded (${emailChallenges.length} challenges)`);
  assert(Array.isArray(urlChallenges) && urlChallenges.length >= 6, `URL challenges dataset loaded (${urlChallenges.length} challenges)`);
  assert(Array.isArray(inspectorChallenges) && inspectorChallenges.length >= 3, `Website Inspector dataset loaded (${inspectorChallenges.length} challenges)`);
  assert(Array.isArray(comparisonPairs) && comparisonPairs.length >= 5, `Comparison pairs dataset loaded (${comparisonPairs.length} pairs)`);
  assert(Array.isArray(knowledgeArticles) && knowledgeArticles.length >= 6, `Knowledge base articles loaded (${knowledgeArticles.length} articles)`);
  assert(Array.isArray(threatFeed) && threatFeed.length >= 8, `Threat Intelligence dataset loaded (${threatFeed.length} threats)`);

  // Verify challenge object structures
  const sampleEmail = emailChallenges[0];
  assert(sampleEmail.id && sampleEmail.sender && sampleEmail.indicators && typeof sampleEmail.isPhishing === 'boolean', 'Email challenge structure is valid');

  const samplePair = comparisonPairs[0];
  assert(samplePair.brand && samplePair.legitimate && samplePair.phishing && Array.isArray(samplePair.differences), 'Comparison pair structure is valid');

  // ----------------------------------------------------
  // TEST GROUP 4: Local Server HTTP Routes & API Status
  // ----------------------------------------------------
  console.log('\n📦 TEST GROUP 4: Server Routes & Live API Endpoints');
  const routes = [
    '/',
    '/analyzer',
    '/comparison',
    '/training',
    '/dashboard',
    '/knowledge',
    '/threats'
  ];

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      assert(res.status === 200, `Route ${route} responds with HTTP 200 OK`);
    } catch (err) {
      assert(false, `Route ${route} fetch failed: ${err.message}`);
    }
  }

  // Test POST API /api/analyze
  try {
    const apiRes = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://secure-login-appleid.com/verify' })
    });
    const apiData = await apiRes.json();
    assert(apiRes.status === 200, 'POST /api/analyze responds with HTTP 200 OK');
    assert(typeof apiData.risk?.score === 'number', `POST /api/analyze returns valid risk score: ${apiData.risk?.score}`);
    assert(Array.isArray(apiData.checks) && apiData.checks.length === 18, 'POST /api/analyze returns 18 evaluated checks');
  } catch (err) {
    assert(false, `API test failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // FINAL SUMMARY
  // ----------------------------------------------------
  console.log('\n====================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (${Math.round(passedTests/totalTests*100)}%)`);
  console.log('====================================================\n');

  if (passedTests === totalTests) {
    console.log('🎉 All systems functional and production-ready!\n');
    process.exit(0);
  } else {
    console.error('⚠️ Some tests failed. Please review errors above.\n');
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Test suite runtime exception:', err);
  process.exit(1);
});
