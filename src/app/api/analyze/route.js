import { NextResponse } from 'next/server';
import { analyzeURL } from '@/lib/heuristics';

// Rate limiting: simple in-memory store
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 requests per window

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request) {
  try {
    // Get client IP (approximate)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before scanning again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { url } = body;

    // Input validation
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required and must be a string.' },
        { status: 400 }
      );
    }

    if (url.length > 2048) {
      return NextResponse.json(
        { error: 'URL exceeds maximum length of 2048 characters.' },
        { status: 400 }
      );
    }

    // Sanitize — strip potential XSS
    const sanitizedURL = url.trim().replace(/[<>'"]/g, '');

    // Perform analysis
    const result = analyzeURL(sanitizedURL);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred during analysis.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'PhishGuard URL Analysis API',
    version: '1.0.0',
    endpoints: {
      'POST /api/analyze': 'Analyze a URL for phishing indicators',
    },
    rateLimit: `${RATE_LIMIT_MAX} requests per ${RATE_LIMIT_WINDOW / 1000} seconds`,
  });
}
