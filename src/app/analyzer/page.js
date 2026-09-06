'use client';
import { useState, useRef, useEffect } from 'react';
import { analyzeURL } from '@/lib/heuristics';

function RiskMeter({ score, level, label, color }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [score]);

  const circumference = 2 * Math.PI * 85;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        {/* Progress circle */}
        <circle
          cx="100" cy="100" r="85"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 10px ${color}50)` }}
        />
        {/* Score text */}
        <text x="100" y="90" textAnchor="middle" fill={color} fontSize="42" fontWeight="800" fontFamily="Inter">
          {animatedScore}
        </text>
        <text x="100" y="115" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontWeight="500" fontFamily="Inter">
          / 100 Risk Score
        </text>
      </svg>
      <div style={{
        padding: '8px 24px',
        borderRadius: 9999,
        background: `${color}15`,
        border: `1px solid ${color}40`,
        color: color,
        fontWeight: 700,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {label}
      </div>
    </div>
  );
}

function CheckResult({ check, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        padding: '16px 20px',
        borderRadius: 12,
        background: check.passed ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
        border: `1px solid ${check.passed ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18 }}>
            {check.passed ? '✅' : check.score > 0 ? '⚠️' : '✅'}
          </span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{check.name}</div>
            {expanded && (
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                {check.description}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: check.score === 0 ? 'var(--safe)' : check.score <= 3 ? 'var(--warning)' : 'var(--danger)',
          }}>
            {check.score}/{check.weight}
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
            ▼
          </span>
        </div>
      </div>
      {expanded && (
        <div style={{
          marginTop: 12,
          padding: '12px 16px',
          borderRadius: 8,
          background: 'rgba(0,0,0,0.2)',
          fontSize: 13,
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
        }}>
          {check.detail}
        </div>
      )}
    </div>
  );
}

export default function AnalyzerPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const saved = localStorage.getItem('phishguard_scan_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleScan = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);

    // Simulate network delay for UX
    await new Promise(r => setTimeout(r, 1500));

    const analysis = analyzeURL(url.trim());
    setResult(analysis);
    setLoading(false);

    if (analysis.valid) {
      const entry = {
        url: analysis.url,
        score: analysis.risk.score,
        level: analysis.risk.level,
        label: analysis.risk.label,
        timestamp: analysis.timestamp,
      };
      const newHistory = [entry, ...history].slice(0, 20);
      setHistory(newHistory);
      localStorage.setItem('phishguard_scan_history', JSON.stringify(newHistory));

      // Update scan count
      const count = parseInt(localStorage.getItem('phishguard_scan_count') || '0') + 1;
      localStorage.setItem('phishguard_scan_count', count.toString());
    }
  };

  const exampleURLs = [
    { url: 'https://www.paypal.com/signin', label: 'PayPal (Safe)' },
    { url: 'http://paypa1-secure.com/signin', label: 'Fake PayPal' },
    { url: 'https://accounts.google.com.verify-now.xyz/login', label: 'Fake Google' },
    { url: 'http://192.168.1.100/chase/login', label: 'IP Phishing' },
    { url: 'https://amaz0n-verify.tk/account', label: 'Fake Amazon' },
  ];

  return (
    <div className="page-container" style={{ maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="animate-fadeInUp" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 20px',
          borderRadius: 9999,
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          marginBottom: 20,
          fontSize: 13,
          fontWeight: 600,
          color: '#818cf8',
        }}>
          🔬 18-Point Heuristic Engine
        </div>
        <h1 className="animate-fadeInUp stagger-1" style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 12,
        }}>
          URL Threat <span className="gradient-text">Analyzer</span>
        </h1>
        <p className="animate-fadeInUp stagger-2" style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 16,
          maxWidth: 550,
          margin: '0 auto',
        }}>
          Paste any URL below for instant phishing risk assessment with detailed heuristic analysis.
        </p>
      </div>

      {/* Input Section */}
      <div className="animate-fadeInUp stagger-3 glass" style={{
        padding: 24,
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            ref={inputRef}
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleScan()}
            placeholder="Enter a URL to analyze (e.g., https://example.com)"
            className="input-glass"
            style={{ flex: 1, minWidth: 250, fontFamily: 'var(--font-mono)', fontSize: 14 }}
          />
          <button
            onClick={handleScan}
            disabled={loading || !url.trim()}
            className="btn-primary"
            style={{
              opacity: loading || !url.trim() ? 0.5 : 1,
              cursor: loading || !url.trim() ? 'not-allowed' : 'pointer',
              minWidth: 140,
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚡</span>
                Scanning...
              </span>
            ) : (
              '🔍 Analyze'
            )}
          </button>
        </div>

        {/* Example URLs */}
        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
            Try examples:
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {exampleURLs.map(ex => (
              <button
                key={ex.url}
                onClick={() => { setUrl(ex.url); setResult(null); }}
                style={{
                  padding: '5px 12px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                  e.currentTarget.style.color = '#818cf8';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="glass scan-container scanning" style={{
          padding: 48,
          textAlign: 'center',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16, animation: 'pulse 1s ease-in-out infinite' }}>🔬</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
            Analyzing URL...
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Running 18 heuristic checks against the URL
          </div>
          <div style={{ marginTop: 24, maxWidth: 300, margin: '24px auto 0' }}>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{
                width: '85%',
                background: 'var(--gradient-primary)',
                animation: 'shimmer 1.5s infinite',
                backgroundSize: '200% 100%',
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {result && !result.valid && (
        <div className="glass" style={{
          padding: 32,
          textAlign: 'center',
          borderColor: 'rgba(239,68,68,0.2)',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#ef4444', marginBottom: 8 }}>
            Invalid URL
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
            {result.error || 'Please enter a valid URL to analyze.'}
          </div>
        </div>
      )}

      {/* Results */}
      {result && result.valid && (
        <div style={{ animation: 'fadeInUp 0.6s ease-out' }}>
          {/* Risk Overview */}
          <div className="glass" style={{
            padding: 40,
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: `${result.risk.color}30`,
          }}>
            <RiskMeter
              score={result.risk.score}
              level={result.risk.level}
              label={result.risk.label}
              color={result.risk.color}
            />

            <div style={{ flex: 1, minWidth: 280 }}>
              {/* URL Display */}
              <div style={{
                padding: '12px 16px',
                borderRadius: 10,
                background: 'rgba(0,0,0,0.3)',
                marginBottom: 20,
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.8)',
                wordBreak: 'break-all',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                {result.url}
              </div>

              {/* Summary Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <div style={{
                  padding: 16,
                  borderRadius: 10,
                  background: 'rgba(16,185,129,0.08)',
                  textAlign: 'center',
                  border: '1px solid rgba(16,185,129,0.15)',
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--safe)' }}>{result.summary.passed}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 500 }}>Passed</div>
                </div>
                <div style={{
                  padding: 16,
                  borderRadius: 10,
                  background: 'rgba(245,158,11,0.08)',
                  textAlign: 'center',
                  border: '1px solid rgba(245,158,11,0.15)',
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--warning)' }}>{result.summary.warnings}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 500 }}>Warnings</div>
                </div>
                <div style={{
                  padding: 16,
                  borderRadius: 10,
                  background: 'rgba(239,68,68,0.08)',
                  textAlign: 'center',
                  border: '1px solid rgba(239,68,68,0.15)',
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--danger)' }}>{result.summary.failed}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 500 }}>Failed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Parsed URL Info */}
          <div className="glass" style={{ padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              🔗 URL Breakdown
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { label: 'Protocol', value: result.parsed.protocol },
                { label: 'Hostname', value: result.parsed.hostname },
                { label: 'Domain', value: result.parsed.domain },
                { label: 'TLD', value: result.parsed.tld },
                { label: 'Subdomains', value: result.parsed.subdomains.join('.') || 'None' },
                { label: 'Path', value: result.parsed.path || '/' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.8)', wordBreak: 'break-all' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Checks */}
          <div className="glass" style={{ padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              🔬 Detailed Analysis ({result.checks.length} Checks)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.checks.map((check, i) => (
                <CheckResult key={check.id} check={check} index={i} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="glass" style={{ padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                💡 Recommendations
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.recommendations.map((rec, i) => (
                  <div key={i} style={{
                    padding: '14px 18px',
                    borderRadius: 10,
                    background: rec.type === 'danger' ? 'rgba(239,68,68,0.08)' : rec.type === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(99,102,241,0.08)',
                    border: `1px solid ${rec.type === 'danger' ? 'rgba(239,68,68,0.15)' : rec.type === 'warning' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                  }}>
                    <span style={{ fontSize: 16, marginTop: 1 }}>
                      {rec.type === 'danger' ? '🚫' : rec.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </span>
                    {rec.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scan History */}
      {history.length > 0 && (
        <div className="glass" style={{ padding: 24, marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              📜 Recent Scans
            </h3>
            <button
              onClick={() => { setHistory([]); localStorage.removeItem('phishguard_scan_history'); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.3)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Clear History
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.slice(0, 5).map((entry, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: 'rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => { setUrl(entry.url); }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '60%',
                }}>
                  {entry.url}
                </div>
                <span className={`badge badge-${entry.level === 'safe' ? 'safe' : entry.level === 'low' ? 'warning' : 'danger'}`}>
                  {entry.score}% — {entry.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
