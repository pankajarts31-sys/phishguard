'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldIcon, 
  SearchIcon, 
  CompareIcon, 
  TerminalIcon, 
  DashboardIcon, 
  AcademicIcon, 
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CpuIcon,
  LockIcon
} from '@/components/Icons';
import { analyzeURL } from '@/lib/heuristics';

const features = [
  {
    Icon: SearchIcon,
    title: '18-Point Heuristic Analyzer',
    description: 'Algorithmic inspection evaluating Levenshtein edit distance, Shannon entropy, homoglyph Unicode traps, and subdomain abuse.',
    href: '/analyzer',
    tag: 'SCANNER',
  },
  {
    Icon: CompareIcon,
    title: 'Side-by-Side Brand Inspector',
    description: 'Direct visual comparison between legitimate web portals and malicious replicas for PayPal, Google, Microsoft, and Amazon.',
    href: '/comparison',
    tag: 'COMPARISON',
  },
  {
    Icon: TerminalIcon,
    title: 'Interactive Simulation Academy',
    description: 'Hands-on training scenarios featuring simulated email triage, tricky lookalike URL puzzles, and login page defect inspection.',
    href: '/training',
    tag: 'SIMULATION',
  },
  {
    Icon: DashboardIcon,
    title: 'Telemetry & Risk Analytics',
    description: 'Real-time performance tracking with Chart.js visualizations, security hygiene score meters, and threat classification trends.',
    href: '/dashboard',
    tag: 'ANALYTICS',
  },
  {
    Icon: AlertTriangleIcon,
    title: 'Live Threat Intelligence',
    description: 'Curated feed of active global phishing campaigns, IOC domain lists, target industries, and MITRE ATT&CK TTP mappings.',
    href: '/threats',
    tag: 'TELEMETRY',
  },
  {
    Icon: AcademicIcon,
    title: 'Security Knowledge Repository',
    description: 'Defensive engineering guides detailing spear phishing vectors, MFA bypass tactics, and incident containment protocols.',
    href: '/knowledge',
    tag: 'DOCUMENTATION',
  },
];

const stats = [
  { value: '18', label: 'Heuristic Checks', tag: 'VECTORS' },
  { value: '500+', label: 'Protected Brands', tag: 'NORMALIZED' },
  { value: '100%', label: 'Client-Side Offline', tag: 'PRIVACY' },
  { value: '< 2ms', label: 'Analysis Latency', tag: 'REAL-TIME' },
];

export default function HomePage() {
  const [testInput, setTestInput] = useState('http://paypa1-secure.com/signin');
  const [quickResult, setQuickResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const runQuickScan = (urlToScan) => {
    const target = urlToScan || testInput;
    setIsScanning(true);
    setTimeout(() => {
      const res = analyzeURL(target);
      setQuickResult(res);
      setIsScanning(false);
    }, 200);
  };

  return (
    <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 80px' }}>
      
      {/* ═══ Hero Section ═══ */}
      <section style={{ paddingTop: '72px', paddingBottom: '72px', textAlign: 'center' }}>
        
        {/* Release Pill Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <span className="badge-minimal" style={{ padding: '4px 12px', fontSize: 12 }}>
            <span className="status-dot safe" />
            HEURISTIC ENGINE v1.0 • ZERO-DAY DETECTION
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="heading-display" style={{ maxWidth: 840, margin: '0 auto 20px' }}>
          Algorithmic Phishing Telemetry & Defense.
        </h1>

        {/* Subtitle */}
        <p className="text-subtle" style={{ maxWidth: 620, margin: '0 auto 36px', fontSize: 16 }}>
          Detect deceptive domains, Unicode homoglyphs, and credential harvesters mathematically — without waiting for reactive browser blocklists.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 54 }}>
          <Link href="/analyzer" className="btn-solid-white">
            <span>Launch URL Scanner</span>
            <ArrowRightIcon size={15} />
          </Link>
          <Link href="/training" className="btn-dark">
            <span>Open Academy</span>
          </Link>
          <Link href="/comparison" className="btn-ghost">
            <span>Compare Sites</span>
          </Link>
        </div>

        {/* ═══ Interactive Live Teaser Console ═══ */}
        <div 
          className="card-minimal"
          style={{
            maxWidth: 780,
            margin: '0 auto',
            textAlign: 'left',
            padding: 20,
            background: '#09090b',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27272a' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27272a' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27272a' }} />
              <span className="text-mono-meta" style={{ marginLeft: 8 }}>interactive_evaluator.sh</span>
            </div>
            <span className="badge-minimal">LIVE HEURISTIC ENGINE</span>
          </div>

          {/* Quick Input Bar */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input 
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Enter suspect URL (e.g. http://paypa1-secure.com/signin)..."
              className="input-minimal"
              style={{ fontSize: 13, padding: '10px 14px' }}
            />
            <button
              onClick={() => runQuickScan()}
              className="btn-solid-white"
              style={{ whiteSpace: 'nowrap', padding: '0 18px', fontSize: 13 }}
            >
              {isScanning ? 'Evaluating...' : 'Scan Now'}
            </button>
          </div>

          {/* Quick Test Samples */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: quickResult ? 16 : 0 }}>
            <span className="text-mono-meta">Presets:</span>
            {[
              { label: 'Fake PayPal', url: 'http://paypa1-secure.com/signin' },
              { label: 'Homoglyph Apple', url: 'https://\u0430pple.com/login' },
              { label: 'Legitimate Google', url: 'https://accounts.google.com' },
            ].map(preset => (
              <button
                key={preset.label}
                onClick={() => {
                  setTestInput(preset.url);
                  runQuickScan(preset.url);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground-muted)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                className="hover:border-zinc-500 hover:text-white"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Scan Preview Result */}
          {quickResult && (
            <div 
              style={{
                marginTop: 14,
                padding: '12px 16px',
                borderRadius: 6,
                background: '#121215',
                border: `1px solid ${quickResult.risk.level === 'safe' ? 'var(--safe-border)' : 'var(--danger-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: quickResult.risk.level === 'safe' ? 'var(--safe-bg)' : 'var(--danger-bg)',
                  color: quickResult.risk.level === 'safe' ? 'var(--safe-text)' : 'var(--danger-text)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 14,
                }}>
                  {quickResult.risk.score}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{quickResult.risk.label.toUpperCase()}</span>
                    <span className="text-mono-meta">• {quickResult.summary.failed} Vectors Flagged</span>
                  </div>
                  <div className="text-mono-meta" style={{ color: 'var(--foreground-muted)' }}>
                    {quickResult.parsed.hostname || quickResult.url}
                  </div>
                </div>
              </div>

              <Link
                href={`/analyzer?url=${encodeURIComponent(quickResult.url)}`}
                className="btn-dark"
                style={{ padding: '6px 12px', fontSize: 12 }}
              >
                <span>Full Telemetry Breakdown</span>
                <ArrowRightIcon size={12} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══ Metrics Strip ═══ */}
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '28px 0',
        margin: '20px 0 72px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24,
          textAlign: 'left',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ padding: '0 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span className="text-mono-meta">{stat.tag}</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--foreground-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Modules & Capabilities Grid ═══ */}
      <section style={{ marginBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="text-mono-meta">SYSTEM CAPABILITIES</span>
            <h2 className="heading-section" style={{ marginTop: 4 }}>
              Core Defensive Infrastructure
            </h2>
          </div>
          <p className="text-subtle" style={{ maxWidth: 460, fontSize: 14 }}>
            Six integrated sub-systems combining mathematical threat detection with interactive cognitive training.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}>
          {features.map((feature, idx) => {
            const Icon = feature.Icon;
            return (
              <Link
                key={idx}
                href={feature.href}
                className="card-minimal"
                style={{
                  padding: 24,
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 200,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}>
                      <Icon size={16} />
                    </div>
                    <span className="text-mono-meta">{feature.tag}</span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8, letterSpacing: '-0.01em' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.5 }}>
                    {feature.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#ffffff',
                  marginTop: 20,
                }}>
                  <span>Access Module</span>
                  <ArrowRightIcon size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ Why Proactive Detection Matters ═══ */}
      <section style={{
        background: '#09090b',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '40px 32px',
        marginBottom: 80,
      }}>
        <div style={{ maxWidth: 800 }}>
          <span className="text-mono-meta">SECURITY ARCHITECTURE PHILOSOPHY</span>
          <h2 className="heading-section" style={{ marginTop: 6, marginBottom: 12 }}>
            Why blocklists are fundamentally not enough.
          </h2>
          <p className="text-subtle" style={{ fontSize: 14, marginBottom: 24 }}>
            Traditional threat feeds rely on reports. By the time a zero-day phishing link is submitted, reviewed, and pushed to global DNS blocklists, an average of 4 to 8 hours has elapsed — during which over 70% of credentials have already been compromised.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}>
            <div style={{ borderLeft: '2px solid var(--border-active)', paddingLeft: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>Shannon Entropy</div>
              <div className="text-mono-meta">Calculates randomness in string distributions to detect DGA domains.</div>
            </div>
            <div style={{ borderLeft: '2px solid var(--border-active)', paddingLeft: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>Levenshtein Distance</div>
              <div className="text-mono-meta">Normalized substitution matrix catches brand typosquatting (1 vs l, 0 vs o).</div>
            </div>
            <div style={{ borderLeft: '2px solid var(--border-active)', paddingLeft: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>Homoglyph Mapping</div>
              <div className="text-mono-meta">Unmasks non-ASCII Cyrillic lookalikes embedded inside innocent-looking URLs.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section style={{
        textAlign: 'center',
        padding: '40px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#ffffff', marginBottom: 8, letterSpacing: '-0.02em' }}>
          Evaluate suspicious URLs or test your detection skills.
        </h2>
        <p className="text-subtle" style={{ maxWidth: 500, margin: '0 auto 24px', fontSize: 14 }}>
          No accounts, no external tracking, no dependencies. 100% client-side privacy-first architecture.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Link href="/analyzer" className="btn-solid-white">
            <span>Analyze a URL</span>
          </Link>
          <Link href="/training" className="btn-dark">
            <span>Start Training Challenges</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
