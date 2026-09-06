'use client';
import { useState, useRef, useEffect } from 'react';
import { analyzeURL } from '@/lib/heuristics';
import { 
  SearchIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  XCircleIcon, 
  ArrowRightIcon,
  LockIcon,
  GlobeIcon
} from '@/components/Icons';

function MinimalScoreGauge({ score, level, label }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
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

  const circumference = 2 * Math.PI * 72;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getStatusClass = () => {
    if (score <= 25) return { stroke: 'var(--safe)', textClass: 'badge-safe' };
    if (score <= 50) return { stroke: 'var(--warning)', textClass: 'badge-warning' };
    return { stroke: 'var(--danger)', textClass: 'badge-danger' };
  };

  const status = getStatusClass();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ position: 'relative', width: 170, height: 170 }}>
        <svg width="170" height="170" viewBox="0 0 170 170">
          {/* Subtle background track */}
          <circle cx="85" cy="85" r="72" fill="none" stroke="#18181b" strokeWidth="8" />
          {/* Progress ring */}
          <circle
            cx="85" cy="85" r="72"
            fill="none"
            stroke={status.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 85 85)"
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', color: '#ffffff' }}>
            {animatedScore}
          </span>
          <span className="text-mono-meta">
            OUT OF 100
          </span>
        </div>
      </div>

      <span className={`badge-minimal ${status.textClass}`} style={{ fontSize: 12, padding: '4px 12px' }}>
        {label.toUpperCase()} THREAT PROFILE
      </span>
    </div>
  );
}

function MinimalCheckItem({ check }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 6,
        background: check.passed ? 'rgba(255, 255, 255, 0.02)' : 'rgba(239, 68, 68, 0.04)',
        border: `1px solid ${check.passed ? 'var(--border-subtle)' : 'var(--danger-border)'}`,
        cursor: 'pointer',
        transition: 'background-color 150ms ease, border-color 150ms ease',
      }}
      onClick={() => setExpanded(!expanded)}
      className="hover:border-zinc-700"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {check.passed ? (
            <CheckCircleIcon size={16} color="var(--safe)" />
          ) : check.score > 0 ? (
            <AlertTriangleIcon size={16} color="var(--danger)" />
          ) : (
            <CheckCircleIcon size={16} color="var(--safe)" />
          )}

          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#ffffff' }}>
              {check.name}
            </div>
            {!expanded && (
              <div className="text-mono-meta" style={{ fontSize: 11, marginTop: 2 }}>
                {check.detail}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="text-mono-meta" style={{ 
            color: check.passed ? 'var(--foreground-subtle)' : 'var(--danger-text)',
            fontWeight: 600
          }}>
            {check.score} / {check.weight} pts
          </span>
          <span style={{ fontSize: 11, color: 'var(--foreground-subtle)', transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 150ms' }}>
            ▼
          </span>
        </div>
      </div>

      {expanded && (
        <div style={{
          marginTop: 10,
          paddingTop: 10,
          borderTop: '1px solid var(--border-subtle)',
          fontSize: 12,
          color: 'var(--foreground-muted)',
          lineHeight: 1.5,
        }}>
          <p style={{ marginBottom: 6 }}>{check.description}</p>
          <div className="text-mono-meta" style={{ color: check.passed ? 'var(--safe-text)' : 'var(--danger-text)' }}>
            Diagnosis: {check.detail}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AnalyzerPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all | failed | passed
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const saved = localStorage.getItem('phishguard_scan_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }

    // Check query params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryUrl = params.get('url');
      if (queryUrl) {
        setUrl(queryUrl);
        executeScan(queryUrl);
      }
    }
  }, []);

  const executeScan = (targetUrl) => {
    const toScan = (targetUrl || url).trim();
    if (!toScan) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeURL(toScan);
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
        const newHistory = [entry, ...history.filter(h => h.url !== entry.url)].slice(0, 15);
        setHistory(newHistory);
        localStorage.setItem('phishguard_scan_history', JSON.stringify(newHistory));
      }
    }, 400);
  };

  const exampleURLs = [
    { url: 'https://www.paypal.com/signin', label: 'paypal.com' },
    { url: 'http://paypa1-secure.com/signin', label: 'paypa1-secure.com' },
    { url: 'https://accounts.google.com.verify-now.xyz/login', label: 'google.verify-now.xyz' },
    { url: 'http://192.168.1.100/chase/login', label: '192.168.1.100' },
    { url: 'https://amaz0n-verify.tk/account', label: 'amaz0n-verify.tk' },
  ];

  const filteredChecks = result?.checks?.filter(c => {
    if (filter === 'failed') return !c.passed;
    if (filter === 'passed') return c.passed;
    return true;
  }) || [];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '36px 24px 80px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="text-mono-meta">TELEMETRY SCANNER</span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-mono-meta">18 VECTOR HEURISTICS</span>
        </div>
        <h1 className="heading-section" style={{ fontSize: 26, marginBottom: 8 }}>
          Heuristic URL Analyzer
        </h1>
        <p className="text-subtle" style={{ fontSize: 14 }}>
          Inspect suspect links, domain structure, homoglyphs, and character substitution matrices in real time.
        </p>
      </div>

      {/* Input Console */}
      <div className="card-minimal" style={{ padding: 20, marginBottom: 28, background: '#09090b' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && executeScan()}
              placeholder="Paste suspect URL to evaluate (e.g. http://paypa1-secure.com/signin)..."
              className="input-minimal"
              style={{ paddingLeft: 38 }}
            />
            <div style={{ position: 'absolute', left: 12, top: 13, color: 'var(--foreground-subtle)' }}>
              <SearchIcon size={16} />
            </div>
          </div>
          <button
            onClick={() => executeScan()}
            disabled={loading || !url.trim()}
            className="btn-solid-white"
            style={{ opacity: loading || !url.trim() ? 0.5 : 1, cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Analyzing...' : 'Scan URL'}
          </button>
        </div>

        {/* Quick Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
          <span className="text-mono-meta">Presets:</span>
          {exampleURLs.map(ex => (
            <button
              key={ex.url}
              onClick={() => {
                setUrl(ex.url);
                executeScan(ex.url);
              }}
              style={{
                padding: '3px 8px',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border)',
                color: 'var(--foreground-muted)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
              }}
              className="hover:border-zinc-500 hover:text-white"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card-minimal" style={{ padding: 48, textAlign: 'center', marginBottom: 28 }}>
          <div className="text-mono-meta" style={{ marginBottom: 8 }}>EVALUATING 18 HEURISTIC VECTORS...</div>
          <div style={{ fontSize: 13, color: 'var(--foreground-muted)' }}>
            Calculating Levenshtein substitution matrix and Shannon domain entropy
          </div>
        </div>
      )}

      {/* Error Output */}
      {result && !result.valid && (
        <div className="card-minimal" style={{ padding: 24, borderColor: 'var(--danger-border)', background: 'var(--danger-bg)', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--danger-text)', fontWeight: 600, fontSize: 14 }}>
            <XCircleIcon size={18} />
            <span>Invalid URL Structure</span>
          </div>
          <p className="text-subtle" style={{ fontSize: 13, marginTop: 4 }}>
            {result.error || 'Please provide a valid URL to analyze.'}
          </p>
        </div>
      )}

      {/* Results Telemetry */}
      {result && result.valid && (
        <div>
          {/* Top Summary Card */}
          <div className="card-minimal" style={{ padding: 28, marginBottom: 24, background: '#09090b' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
            }}>
              {/* Score Gauge */}
              <MinimalScoreGauge
                score={result.risk.score}
                level={result.risk.level}
                label={result.risk.label}
              />

              {/* URL Breakdown Details */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 6,
                  background: '#121215',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: '#ffffff',
                  wordBreak: 'break-all',
                  marginBottom: 16,
                }}>
                  {result.url}
                </div>

                {/* 3 Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  <div style={{ padding: 12, borderRadius: 6, background: '#121215', border: '1px solid var(--border)' }}>
                    <div className="text-mono-meta">PASSED</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--safe)', marginTop: 2 }}>
                      {result.summary.passed}
                    </div>
                  </div>
                  <div style={{ padding: 12, borderRadius: 6, background: '#121215', border: '1px solid var(--border)' }}>
                    <div className="text-mono-meta">FAILED</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: result.summary.failed > 0 ? 'var(--danger)' : 'var(--foreground)', marginTop: 2 }}>
                      {result.summary.failed}
                    </div>
                  </div>
                  <div style={{ padding: 12, borderRadius: 6, background: '#121215', border: '1px solid var(--border)' }}>
                    <div className="text-mono-meta">RISK POINTS</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginTop: 2 }}>
                      {result.risk.totalPoints} / {result.risk.maxPoints}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parsed Structure Grid */}
          <div className="card-minimal" style={{ padding: 20, marginBottom: 24, background: '#09090b' }}>
            <div className="text-mono-meta" style={{ marginBottom: 12 }}>DECOMPOSED URL PARAMETERS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
              {[
                { label: 'Protocol', value: result.parsed.protocol },
                { label: 'Hostname', value: result.parsed.hostname },
                { label: 'Registered Domain', value: result.parsed.domain },
                { label: 'TLD', value: result.parsed.tld || '(none)' },
                { label: 'Subdomains', value: result.parsed.subdomains.join('.') || '(none)' },
                { label: 'Path', value: result.parsed.path || '/' },
              ].map(item => (
                <div key={item.label} style={{ padding: '8px 12px', background: '#121215', borderRadius: 4, border: '1px solid var(--border-subtle)' }}>
                  <div className="text-mono-meta" style={{ fontSize: 10 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ffffff', wordBreak: 'break-all', marginTop: 2 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Checks Accordion with Filter Tabs */}
          <div className="card-minimal" style={{ padding: 20, marginBottom: 24, background: '#09090b' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div className="text-mono-meta">
                VECTOR EVALUATION ({filteredChecks.length} SHOWN)
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: 4, background: '#121215', padding: 3, borderRadius: 6, border: '1px solid var(--border)' }}>
                {[
                  { key: 'all', label: `All (${result.checks.length})` },
                  { key: 'failed', label: `Failed (${result.summary.failed})` },
                  { key: 'passed', label: `Passed (${result.summary.passed})` },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    style={{
                      background: filter === tab.key ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      border: 'none',
                      color: filter === tab.key ? '#ffffff' : 'var(--foreground-muted)',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      padding: '4px 10px',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {filteredChecks.map(check => (
                <MinimalCheckItem key={check.id} check={check} />
              ))}
            </div>
          </div>

          {/* Recommendations Callout */}
          {result.recommendations?.length > 0 && (
            <div className="card-minimal" style={{ padding: 20, background: '#09090b', marginBottom: 24 }}>
              <div className="text-mono-meta" style={{ marginBottom: 12 }}>DEFENSIVE RECOMMENDATIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} style={{
                    padding: '10px 14px',
                    borderRadius: 6,
                    background: rec.type === 'danger' ? 'var(--danger-bg)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${rec.type === 'danger' ? 'var(--danger-border)' : 'var(--border)'}`,
                    fontSize: 13,
                    color: rec.type === 'danger' ? 'var(--danger-text)' : 'var(--foreground-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                    <AlertTriangleIcon size={16} />
                    <span>{rec.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scan History Table */}
      {history.length > 0 && (
        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span className="text-mono-meta">RECENT LOCAL SCANS</span>
            <button
              onClick={() => {
                localStorage.removeItem('phishguard_scan_history');
                setHistory([]);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--foreground-subtle)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
              }}
              className="hover:text-white"
            >
              Clear History
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {history.slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 4,
                  background: '#121215',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={`badge-minimal ${entry.score <= 25 ? 'badge-safe' : 'badge-danger'}`} style={{ padding: '2px 6px', fontSize: 11 }}>
                    {entry.score}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--foreground)', maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {entry.url}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setUrl(entry.url);
                    executeScan(entry.url);
                  }}
                  className="btn-ghost"
                  style={{ padding: '2px 8px', fontSize: 11 }}
                >
                  Rescan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
