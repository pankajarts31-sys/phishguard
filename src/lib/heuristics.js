/**
 * PhishGuard — Core Heuristic Analysis Engine
 * 18-point URL analysis for phishing detection
 */

// ─── Top 100 Brand Names for Typosquatting Detection ───────────────────────
const TOP_BRANDS = [
  'google', 'facebook', 'amazon', 'apple', 'microsoft', 'netflix', 'paypal',
  'instagram', 'twitter', 'linkedin', 'whatsapp', 'snapchat', 'tiktok',
  'youtube', 'yahoo', 'outlook', 'hotmail', 'gmail', 'icloud', 'dropbox',
  'chase', 'bankofamerica', 'wellsfargo', 'citibank', 'hsbc', 'barclays',
  'americanexpress', 'visa', 'mastercard', 'stripe', 'square', 'venmo',
  'coinbase', 'binance', 'kraken', 'robinhood', 'fidelity', 'schwab',
  'ebay', 'walmart', 'target', 'bestbuy', 'costco', 'homedepot',
  'adobe', 'salesforce', 'slack', 'zoom', 'teams', 'discord', 'telegram',
  'reddit', 'pinterest', 'tumblr', 'twitch', 'spotify', 'steam',
  'epic', 'origin', 'playstation', 'xbox', 'nintendo', 'roblox',
  'uber', 'lyft', 'airbnb', 'booking', 'expedia', 'tripadvisor',
  'fedex', 'ups', 'usps', 'dhl', 'aliexpress', 'shopify', 'etsy',
  'github', 'gitlab', 'bitbucket', 'stackoverflow', 'heroku', 'vercel',
  'aws', 'azure', 'digitalocean', 'cloudflare', 'godaddy', 'namecheap',
  'wordpress', 'squarespace', 'wix', 'medium', 'substack',
  'nytimes', 'bbc', 'cnn', 'reuters', 'bloomberg',
  'docusign', 'notion', 'figma', 'canva', 'grammarly'
];

// ─── Suspicious TLDs ────────────────────────────────────────────────────────
const SUSPICIOUS_TLDS = [
  '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.work', '.click',
  '.link', '.info', '.buzz', '.surf', '.icu', '.cam', '.rest', '.monster',
  '.sbs', '.cfd', '.cyou', '.fun', '.wang', '.bond', '.ren', '.bid'
];

// ─── Suspicious Keywords ────────────────────────────────────────────────────
const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'sign-in', 'verify', 'verification', 'secure',
  'security', 'account', 'update', 'confirm', 'banking', 'password',
  'credential', 'suspend', 'restrict', 'unauthorized', 'expire',
  'validate', 'authenticate', 'wallet', 'recover', 'unlock',
  'alert', 'warning', 'urgent', 'immediately', 'limited', 'act-now',
  'free', 'winner', 'prize', 'congratulations', 'selected', 'reward',
  'click-here', 'reset-password', 'confirm-identity', 'unusual-activity'
];

// ─── URL Shortener Domains ──────────────────────────────────────────────────
const URL_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly',
  'adf.ly', 'j.mp', 'rb.gy', 'cutt.ly', 's.id', 'shorturl.at', 'tiny.cc',
  'v.gd', 'x.co', 'lnkd.in', 'db.tt', 'qr.ae', 'cli.gs', 'soo.gd'
];

// ─── Homoglyph Map (Cyrillic/Greek characters that look like Latin) ─────────
const HOMOGLYPHS = {
  'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p', 'с': 'c', 'у': 'y',
  'х': 'x', 'ѕ': 's', 'і': 'i', 'ј': 'j', 'ԁ': 'd', 'ɡ': 'g',
  'ɩ': 'l', 'ν': 'v', 'ω': 'w', 'ƅ': 'b', 'ɗ': 'd', 'ƒ': 'f',
  'ɦ': 'h', 'ƙ': 'k', 'ɱ': 'm', 'ɳ': 'n', 'ρ': 'p', 'ʠ': 'q',
  'ʂ': 's', 'ƭ': 't', 'ʋ': 'v', 'ȥ': 'z'
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

/**
 * Calculate Shannon entropy of a string (measure of randomness)
 */
function shannonEntropy(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  let entropy = 0;
  const len = str.length;
  for (const char in freq) {
    const p = freq[char] / len;
    entropy -= p * Math.log2(p);
  }

  return entropy;
}

/**
 * Parse URL into components safely
 */
function parseURL(urlString) {
  try {
    const trimmed = urlString.trim();
    let finalUrl = trimmed;
    const isSpecialScheme = /^(data:|javascript:|file:)/i.test(trimmed);

    if (!isSpecialScheme && !trimmed.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//)) {
      finalUrl = 'http://' + trimmed;
    }

    const url = new URL(finalUrl);
    const hostname = url.hostname || '';
    const hostParts = hostname ? hostname.split('.') : [];
    const tld = hostParts.length > 1 ? '.' + hostParts.slice(-1).join('.') : '';
    const domain = hostParts.length >= 2 ? hostParts.slice(-2).join('.') : hostname;
    const subdomains = hostParts.length > 2 ? hostParts.slice(0, -2) : [];

    return {
      full: url.href,
      protocol: url.protocol,
      hostname: hostname,
      domain,
      tld,
      subdomains,
      path: url.pathname || '',
      query: url.search || '',
      port: url.port || '',
      hash: url.hash || '',
      isIP: Boolean(hostname && /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)),
      valid: true
    };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 18-POINT HEURISTIC CHECKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Check 1: Domain Age Simulation
 * In production, this would query WHOIS. Here we check for suspicious patterns
 * that correlate with newly registered domains.
 */
function checkDomainAge(parsed) {
  const suspiciousPatterns = /\d{4,}|[a-z]{15,}|[0-9a-f]{8,}/i;
  const hasPattern = suspiciousPatterns.test(parsed.domain);

  return {
    id: 'domain_age',
    name: 'Domain Age Analysis',
    description: 'Checks for patterns common in newly registered phishing domains',
    weight: 8,
    passed: !hasPattern,
    score: hasPattern ? 8 : 0,
    detail: hasPattern
      ? 'Domain contains patterns typical of auto-generated phishing domains'
      : 'Domain pattern appears established'
  };
}

/**
 * Check 2: Typosquatting Detection (Levenshtein Distance)
 * Enhanced: normalizes char substitutions, checks hyphen-split parts, substring containment
 */
function checkTyposquatting(parsed) {
  const domainBase = parsed.domain.split('.')[0].toLowerCase();
  const hostname = parsed.hostname.toLowerCase();

  // Whitelist: If domainBase exactly matches a top brand, it is the authentic brand!
  if (TOP_BRANDS.includes(domainBase)) {
    return {
      id: 'typosquatting',
      name: 'Typosquatting Detection',
      description: 'Detects domains that closely mimic well-known brand names',
      weight: 10,
      passed: true,
      score: 0,
      detail: `Domain matches legitimate verified brand: "${domainBase}"`
    };
  }

  let closestBrand = null;
  let minDistance = Infinity;

  // Common character substitutions used in typosquatting
  function normalizeChars(str) {
    return str.replace(/1/g, 'l').replace(/0/g, 'o').replace(/5/g, 's')
              .replace(/3/g, 'e').replace(/7/g, 't').replace(/4/g, 'a')
              .replace(/8/g, 'b').replace(/\$/g, 's');
  }

  // Split domain by hyphens to check each part
  const domainParts = [domainBase, ...domainBase.split('-').filter(p => p.length >= 3)];

  for (const brand of TOP_BRANDS) {
    for (const part of domainParts) {
      // Direct Levenshtein check
      const distance = levenshteinDistance(part, brand);
      const maxDist = brand.length >= 6 ? 3 : 2;
      if (distance > 0 && distance <= maxDist && distance < minDistance) {
        minDistance = distance;
        closestBrand = brand;
      }

      // Normalized chars check (e.g., paypa1 → paypal)
      const normalized = normalizeChars(part);
      if (normalized !== part) {
        const normDist = levenshteinDistance(normalized, brand);
        if (normDist >= 0 && normDist <= 1 && normDist < minDistance) {
          minDistance = normDist === 0 ? 1 : normDist; // Exact match after normalization = typosquat
          closestBrand = brand;
        }
      }
    }

    // Substring containment check across full hostname
    if (!closestBrand) {
      const normalizedHost = normalizeChars(hostname);
      if (normalizedHost.includes(brand) && !parsed.domain.split('.')[0].toLowerCase().includes(brand)) {
        // Brand found after normalization but not literally in domain
        minDistance = 1;
        closestBrand = brand;
      }
    }

    // Also check if brand name appears as a near-match substring in original domain
    if (!closestBrand && domainBase.length > brand.length) {
      for (let i = 0; i <= domainBase.length - brand.length; i++) {
        const substr = domainBase.substring(i, i + brand.length);
        const subDist = levenshteinDistance(substr, brand);
        if (subDist > 0 && subDist <= 1 && subDist < minDistance) {
          minDistance = subDist;
          closestBrand = brand;
        }
      }
    }
  }

  const isTypo = closestBrand !== null;

  return {
    id: 'typosquatting',
    name: 'Typosquatting Detection',
    description: 'Detects domains that closely mimic well-known brand names',
    weight: 10,
    passed: !isTypo,
    score: isTypo ? 10 : 0,
    detail: isTypo
      ? `Domain "${domainBase}" is suspiciously similar to "${closestBrand}" (edit distance: ${minDistance})`
      : 'No typosquatting detected against known brands'
  };
}

/**
 * Check 3: Homograph/Punycode Attack Detection
 */
function checkHomograph(parsed) {
  const hostname = parsed.hostname;
  let homoglyphsFound = [];

  for (const char of hostname) {
    if (HOMOGLYPHS[char]) {
      homoglyphsFound.push({ fake: char, real: HOMOGLYPHS[char] });
    }
  }

  // Also check for punycode (xn--)
  const hasPunycode = hostname.includes('xn--');
  const isAttack = homoglyphsFound.length > 0 || hasPunycode;

  return {
    id: 'homograph',
    name: 'Homograph Attack Detection',
    description: 'Identifies Unicode/Punycode characters used to impersonate domains',
    weight: 10,
    passed: !isAttack,
    score: isAttack ? 10 : 0,
    detail: isAttack
      ? `Found ${homoglyphsFound.length} homoglyph character(s)${hasPunycode ? ' and Punycode encoding' : ''}`
      : 'No homograph attacks detected'
  };
}

/**
 * Check 4: Excessive Subdomain Check
 */
function checkSubdomains(parsed) {
  const count = parsed.subdomains.length;
  const excessive = count > 3;

  return {
    id: 'subdomains',
    name: 'Subdomain Analysis',
    description: 'Phishing sites often use excessive subdomains to appear legitimate',
    weight: 5,
    passed: !excessive,
    score: excessive ? 5 : (count > 2 ? 2 : 0),
    detail: excessive
      ? `URL has ${count} subdomains — phishing sites often use many subdomains (e.g., login.secure.paypal.evil.com)`
      : `URL has ${count} subdomain(s) — within normal range`
  };
}

/**
 * Check 5: IP Address in URL
 */
function checkIPAddress(parsed) {
  const isIP = parsed.isIP;
  // Also check for hex/octal IP representations
  const hexIP = /0x[0-9a-f]+/i.test(parsed.hostname);

  return {
    id: 'ip_address',
    name: 'IP Address Detection',
    description: 'Legitimate sites use domain names, not raw IP addresses',
    weight: 8,
    passed: !isIP && !hexIP,
    score: (isIP || hexIP) ? 8 : 0,
    detail: isIP
      ? 'URL uses a direct IP address instead of a domain name — highly suspicious'
      : hexIP
      ? 'URL contains hexadecimal IP encoding — obfuscation technique'
      : 'URL uses a proper domain name'
  };
}

/**
 * Check 6: URL Length Analysis
 */
function checkURLLength(parsed) {
  const length = parsed.full.length;
  let score = 0;
  let detail = '';

  if (length > 100) {
    score = 6;
    detail = `URL is ${length} characters long — excessively long URLs are used to hide malicious destinations`;
  } else if (length > 75) {
    score = 3;
    detail = `URL is ${length} characters — moderately long, proceed with caution`;
  } else {
    detail = `URL length (${length} chars) is within normal range`;
  }

  return {
    id: 'url_length',
    name: 'URL Length Analysis',
    description: 'Phishing URLs are often abnormally long to hide their true destination',
    weight: 6,
    passed: score === 0,
    score,
    detail
  };
}

/**
 * Check 7: HTTPS Presence
 */
function checkHTTPS(parsed) {
  const isHTTPS = parsed.protocol === 'https:';

  return {
    id: 'https',
    name: 'HTTPS/SSL Check',
    description: 'Legitimate sites use HTTPS encryption',
    weight: 5,
    passed: isHTTPS,
    score: isHTTPS ? 0 : 5,
    detail: isHTTPS
      ? 'Site uses HTTPS encryption (note: phishing sites can also use HTTPS)'
      : 'Site does NOT use HTTPS — data transmitted in plain text'
  };
}

/**
 * Check 8: Suspicious TLD Check
 */
function checkSuspiciousTLD(parsed) {
  const isSuspicious = SUSPICIOUS_TLDS.includes(parsed.tld.toLowerCase());

  return {
    id: 'suspicious_tld',
    name: 'Top-Level Domain Analysis',
    description: 'Certain TLDs are disproportionately used for phishing',
    weight: 5,
    passed: !isSuspicious,
    score: isSuspicious ? 5 : 0,
    detail: isSuspicious
      ? `TLD "${parsed.tld}" is commonly associated with free/disposable domains used in phishing`
      : `TLD "${parsed.tld}" is not flagged as suspicious`
  };
}

/**
 * Check 9: URL Shortener Detection
 */
function checkURLShortener(parsed) {
  const isShortener = URL_SHORTENERS.some(s => parsed.hostname.includes(s));

  return {
    id: 'url_shortener',
    name: 'URL Shortener Detection',
    description: 'Shortened URLs hide the true destination',
    weight: 5,
    passed: !isShortener,
    score: isShortener ? 5 : 0,
    detail: isShortener
      ? 'URL uses a shortening service — the real destination is hidden'
      : 'URL is not shortened'
  };
}

/**
 * Check 10: @ Symbol in URL
 */
function checkAtSymbol(parsed) {
  const hasAt = parsed.full.includes('@');

  return {
    id: 'at_symbol',
    name: '"@" Symbol in URL',
    description: 'The @ symbol in URLs can redirect to a different domain',
    weight: 8,
    passed: !hasAt,
    score: hasAt ? 8 : 0,
    detail: hasAt
      ? 'URL contains "@" symbol — everything before @ is treated as credentials, redirecting to the domain after @'
      : 'No @ symbol found in URL'
  };
}

/**
 * Check 11: Double Slash Redirect
 */
function checkDoubleSlash(parsed) {
  // Check for // in the path (after protocol://)
  const pathHasDoubleSlash = parsed.path.includes('//');

  return {
    id: 'double_slash',
    name: 'Double Slash Redirect',
    description: 'Double slashes in the URL path can redirect to external domains',
    weight: 7,
    passed: !pathHasDoubleSlash,
    score: pathHasDoubleSlash ? 7 : 0,
    detail: pathHasDoubleSlash
      ? 'URL path contains "//" which may redirect to an external domain'
      : 'No suspicious double slashes in URL path'
  };
}

/**
 * Check 12: Hex/Percent Encoding
 */
function checkHexEncoding(parsed) {
  const hexPattern = /%[0-9a-f]{2}/gi;
  const matches = parsed.full.match(hexPattern) || [];
  const excessive = matches.length > 3;

  return {
    id: 'hex_encoding',
    name: 'Hex/Percent Encoding',
    description: 'Excessive URL encoding is used to obfuscate malicious content',
    weight: 7,
    passed: !excessive,
    score: excessive ? 7 : (matches.length > 0 ? 2 : 0),
    detail: excessive
      ? `URL contains ${matches.length} encoded characters — likely obfuscating malicious content`
      : matches.length > 0
      ? `URL has ${matches.length} encoded character(s) — minor but noted`
      : 'No suspicious encoding detected'
  };
}

/**
 * Check 13: Non-Standard Port
 */
function checkPort(parsed) {
  const hasNonStandard = parsed.port && parsed.port !== '80' && parsed.port !== '443';

  return {
    id: 'port',
    name: 'Port Number Analysis',
    description: 'Non-standard ports may indicate a phishing server',
    weight: 5,
    passed: !hasNonStandard,
    score: hasNonStandard ? 5 : 0,
    detail: hasNonStandard
      ? `URL uses non-standard port :${parsed.port} — legitimate sites use ports 80 or 443`
      : 'URL uses a standard port'
  };
}

/**
 * Check 14: Excessive Dashes in Domain
 */
function checkDashes(parsed) {
  const dashCount = (parsed.hostname.match(/-/g) || []).length;
  const excessive = dashCount > 3;

  return {
    id: 'dashes',
    name: 'Dash Count in Domain',
    description: 'Phishing domains often use many dashes to mimic legitimate subdomains',
    weight: 3,
    passed: !excessive,
    score: excessive ? 3 : (dashCount > 1 ? 1 : 0),
    detail: excessive
      ? `Domain contains ${dashCount} dashes — suspiciously high for a legitimate domain`
      : `Domain has ${dashCount} dash(es) — within normal range`
  };
}

/**
 * Check 15: Suspicious Keyword Analysis
 */
function checkKeywords(parsed) {
  const urlLower = parsed.full.toLowerCase();
  const found = SUSPICIOUS_KEYWORDS.filter(kw => urlLower.includes(kw));

  return {
    id: 'keywords',
    name: 'Suspicious Keyword Analysis',
    description: 'Phishing URLs often contain urgency/action keywords',
    weight: 7,
    passed: found.length === 0,
    score: Math.min(found.length * 2, 7),
    detail: found.length > 0
      ? `Found ${found.length} suspicious keyword(s): ${found.slice(0, 5).join(', ')}`
      : 'No suspicious keywords detected'
  };
}

/**
 * Check 16: Brand Impersonation in Subdomain/Path
 */
function checkBrandImpersonation(parsed) {
  const subdomainStr = parsed.subdomains.join('.').toLowerCase();
  const pathStr = parsed.path.toLowerCase();
  const domainBase = parsed.domain.split('.')[0].toLowerCase();

  const brandsInSubdomain = TOP_BRANDS.filter(b =>
    subdomainStr.includes(b) && !domainBase.includes(b)
  );
  const brandsInPath = TOP_BRANDS.filter(b =>
    pathStr.includes(b) && !domainBase.includes(b)
  );

  const found = [...new Set([...brandsInSubdomain, ...brandsInPath])];

  return {
    id: 'brand_impersonation',
    name: 'Brand Impersonation Detection',
    description: 'Detects known brand names used in subdomains or paths to mislead users',
    weight: 9,
    passed: found.length === 0,
    score: found.length > 0 ? 9 : 0,
    detail: found.length > 0
      ? `Brand name(s) "${found.join(', ')}" found in subdomain/path but not the actual domain — impersonation attempt`
      : 'No brand impersonation detected'
  };
}

/**
 * Check 17: Shannon Entropy Analysis
 */
function checkEntropy(parsed) {
  const domainBase = parsed.domain.split('.')[0];
  const entropy = shannonEntropy(domainBase);
  const highEntropy = entropy > 3.5;

  return {
    id: 'entropy',
    name: 'Domain Entropy Analysis',
    description: 'Randomly generated domain names have high Shannon entropy',
    weight: 5,
    passed: !highEntropy,
    score: highEntropy ? 5 : (entropy > 3.0 ? 2 : 0),
    detail: `Domain entropy: ${entropy.toFixed(2)} bits — ${
      highEntropy
        ? 'high randomness suggests auto-generated domain (DGA)'
        : entropy > 3.0
        ? 'moderate randomness — somewhat unusual'
        : 'low randomness — appears human-readable'
    }`
  };
}

/**
 * Check 18: Data URI / JavaScript URI Detection
 */
function checkDataURI(parsed) {
  const urlLower = parsed.full.toLowerCase();
  const hasDataURI = urlLower.startsWith('data:') || urlLower.includes('data:text/html');
  const hasJavascriptURI = urlLower.startsWith('javascript:');

  const isDangerous = hasDataURI || hasJavascriptURI;

  return {
    id: 'data_uri',
    name: 'Data/JavaScript URI Detection',
    description: 'Data URIs and JavaScript URIs can embed malicious content directly in the URL',
    weight: 9,
    passed: !isDangerous,
    score: isDangerous ? 9 : 0,
    detail: isDangerous
      ? `URL uses a ${hasDataURI ? 'data:' : 'javascript:'} URI scheme — can embed arbitrary executable content`
      : 'URL uses a standard HTTP scheme'
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN ANALYSIS FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Analyze a URL with all 18 heuristic checks
 * @param {string} url - The URL to analyze
 * @returns {object} Complete analysis results
 */
export function analyzeURL(url) {
  if (!url || typeof url !== 'string') {
    return {
      error: 'Invalid URL provided',
      url: url,
      valid: false
    };
  }

  // Sanitize input
  const sanitizedURL = url.trim().replace(/[<>'"]/g, '');

  const parsed = parseURL(sanitizedURL);

  if (!parsed.valid) {
    return {
      error: parsed.error || 'Could not parse URL',
      url: sanitizedURL,
      valid: false
    };
  }

  // Run all 18 checks
  const checks = [
    checkDomainAge(parsed),
    checkTyposquatting(parsed),
    checkHomograph(parsed),
    checkSubdomains(parsed),
    checkIPAddress(parsed),
    checkURLLength(parsed),
    checkHTTPS(parsed),
    checkSuspiciousTLD(parsed),
    checkURLShortener(parsed),
    checkAtSymbol(parsed),
    checkDoubleSlash(parsed),
    checkHexEncoding(parsed),
    checkPort(parsed),
    checkDashes(parsed),
    checkKeywords(parsed),
    checkBrandImpersonation(parsed),
    checkEntropy(parsed),
    checkDataURI(parsed)
  ];

  // Calculate total risk score using enhanced algorithm
  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  let riskPercentage = Math.round((totalScore / totalWeight) * 100);

  // Critical check bonus: certain checks alone should push score significantly higher
  const criticalChecks = ['typosquatting', 'homograph', 'brand_impersonation', 'data_uri', 'at_symbol'];
  const failedCritical = checks.filter(c => criticalChecks.includes(c.id) && !c.passed);
  if (failedCritical.length > 0) {
    // Each critical failure adds 25% risk bonus
    riskPercentage = Math.min(100, riskPercentage + failedCritical.length * 25);
  }

  // If multiple non-critical checks fail, compound the risk
  const failedNonCritical = checks.filter(c => !c.passed && !criticalChecks.includes(c.id));
  if (failedNonCritical.length >= 3) {
    riskPercentage = Math.min(100, riskPercentage + 15);
  }

  // Minimum floor: any critical failure = at least 50%
  if (failedCritical.length > 0 && riskPercentage < 50) {
    riskPercentage = 50;
  }

  // Determine risk level
  let riskLevel, riskLabel, riskColor;
  if (riskPercentage <= 20) {
    riskLevel = 'safe';
    riskLabel = 'Safe';
    riskColor = '#10B981';
  } else if (riskPercentage <= 40) {
    riskLevel = 'low';
    riskLabel = 'Low Risk';
    riskColor = '#F59E0B';
  } else if (riskPercentage <= 60) {
    riskLevel = 'medium';
    riskLabel = 'Medium Risk';
    riskColor = '#F97316';
  } else if (riskPercentage <= 80) {
    riskLevel = 'high';
    riskLabel = 'High Risk';
    riskColor = '#EF4444';
  } else {
    riskLevel = 'critical';
    riskLabel = 'Critical Threat';
    riskColor = '#991B1B';
  }

  // Count passed/failed
  const passed = checks.filter(c => c.passed).length;
  const failed = checks.filter(c => !c.passed).length;
  const warnings = checks.filter(c => c.score > 0 && c.passed).length;

  return {
    url: sanitizedURL,
    valid: true,
    timestamp: new Date().toISOString(),
    parsed: {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      domain: parsed.domain,
      subdomains: parsed.subdomains,
      path: parsed.path,
      tld: parsed.tld,
      isIP: parsed.isIP
    },
    risk: {
      score: riskPercentage,
      level: riskLevel,
      label: riskLabel,
      color: riskColor,
      totalPoints: totalScore,
      maxPoints: totalWeight
    },
    summary: {
      totalChecks: checks.length,
      passed,
      failed,
      warnings
    },
    checks,
    recommendations: generateRecommendations(checks, riskLevel)
  };
}

/**
 * Generate actionable recommendations based on analysis results
 */
function generateRecommendations(checks, riskLevel) {
  const recs = [];

  if (riskLevel === 'safe') {
    recs.push({
      type: 'info',
      text: 'This URL appears safe, but always verify the source before entering sensitive information.'
    });
  }

  const failedChecks = checks.filter(c => !c.passed);

  for (const check of failedChecks) {
    switch (check.id) {
      case 'typosquatting':
        recs.push({
          type: 'danger',
          text: 'This domain closely resembles a known brand. Navigate directly to the official website instead of clicking links.'
        });
        break;
      case 'homograph':
        recs.push({
          type: 'danger',
          text: 'This URL contains deceptive characters. Copy-paste the domain carefully and check for Punycode encoding in your browser.'
        });
        break;
      case 'ip_address':
        recs.push({
          type: 'warning',
          text: 'Legitimate websites use domain names, not IP addresses. Do not enter any credentials on this page.'
        });
        break;
      case 'https':
        recs.push({
          type: 'warning',
          text: 'This site lacks HTTPS encryption. Never enter passwords or financial information on non-HTTPS pages.'
        });
        break;
      case 'brand_impersonation':
        recs.push({
          type: 'danger',
          text: 'A brand name appears in the subdomain or path but NOT in the actual domain. This is a classic phishing technique.'
        });
        break;
      case 'at_symbol':
        recs.push({
          type: 'danger',
          text: 'The @ symbol in URLs redirects to a different domain. The actual destination may be malicious.'
        });
        break;
      case 'data_uri':
        recs.push({
          type: 'danger',
          text: 'Data/JavaScript URIs can execute code directly. Never trust URLs that start with "data:" or "javascript:".'
        });
        break;
      default:
        recs.push({
          type: 'warning',
          text: `${check.name}: ${check.detail}`
        });
    }
  }

  if (riskLevel === 'high' || riskLevel === 'critical') {
    recs.push({
      type: 'danger',
      text: 'DO NOT enter any personal information on this website. If you already have, change your passwords immediately and enable 2FA.'
    });
  }

  return recs;
}

/**
 * Quick check — returns just the risk score (for batch processing)
 */
export function quickScore(url) {
  const result = analyzeURL(url);
  if (!result.valid) return { url, score: -1, error: result.error };
  return {
    url,
    score: result.risk.score,
    level: result.risk.level,
    label: result.risk.label
  };
}
