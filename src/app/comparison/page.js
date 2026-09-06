'use client';
import { useState } from 'react';
import { comparisonPairs } from '@/lib/challenges';
import { 
  CompareIcon, 
  LockIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon, 
  GlobeIcon 
} from '@/components/Icons';

export default function ComparisonPage() {
  const [selectedPair, setSelectedPair] = useState(0);
  const [revealMode, setRevealMode] = useState(false);
  const [foundDiffs, setFoundDiffs] = useState([]);

  const pair = comparisonPairs[selectedPair] || comparisonPairs[0];

  const toggleDiff = (idx) => {
    if (foundDiffs.includes(idx)) {
      setFoundDiffs(foundDiffs.filter(i => i !== idx));
    } else {
      setFoundDiffs([...foundDiffs, idx]);
    }
  };

  const progress = Math.round((foundDiffs.length / (pair.differences.length || 1)) * 100);

  return (
    <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 80px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="text-mono-meta">VISUAL AUDIT ENGINE</span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-mono-meta">5 HIGH-VALUE TARGETS</span>
        </div>
        <h1 className="heading-section" style={{ fontSize: 26, marginBottom: 8 }}>
          Side-by-Side Brand Comparison
        </h1>
        <p className="text-subtle" style={{ fontSize: 14 }}>
          Analyze subtle discrepancies in browser bars, SSL certificates, layout typography, and form targets.
        </p>
      </div>

      {/* Brand Tabs & Mode Switch */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 28,
        paddingBottom: 20,
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Brand Selector Buttons */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', background: '#09090b', padding: 4, borderRadius: 8, border: '1px solid var(--border)' }}>
          {comparisonPairs.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setSelectedPair(i); setRevealMode(false); setFoundDiffs([]); }}
              style={{
                background: i === selectedPair ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: 'none',
                color: i === selectedPair ? '#ffffff' : 'var(--foreground-muted)',
                fontWeight: 500,
                fontSize: 13,
                padding: '6px 14px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              {p.brand}
            </button>
          ))}
        </div>

        {/* Mode Toggle & Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4, background: '#09090b', padding: 3, borderRadius: 6, border: '1px solid var(--border)' }}>
            <button
              onClick={() => setRevealMode(false)}
              style={{
                background: !revealMode ? '#ffffff' : 'transparent',
                color: !revealMode ? '#000000' : 'var(--foreground-muted)',
                fontWeight: 500,
                fontSize: 12,
                padding: '4px 12px',
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Inspection Mode
            </button>
            <button
              onClick={() => setRevealMode(true)}
              style={{
                background: revealMode ? '#ffffff' : 'transparent',
                color: revealMode ? '#000000' : 'var(--foreground-muted)',
                fontWeight: 500,
                fontSize: 12,
                padding: '4px 12px',
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reveal All
            </button>
          </div>

          <span className="badge-minimal">
            {revealMode ? 'REVEALED' : `${foundDiffs.length}/${pair.differences.length} DISCOVERED`}
          </span>
        </div>
      </div>

      {/* Side by Side Browser Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: 20,
        marginBottom: 32,
      }}>
        
        {/* ═══ Legitimate Version ═══ */}
        <div className="card-minimal" style={{ overflow: 'hidden', background: '#09090b' }}>
          {/* Simulated Browser Bar */}
          <div style={{
            padding: '10px 14px',
            background: '#121215',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27272a' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27272a' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27272a' }} />
            </div>

            {/* URL Input */}
            <div style={{
              flex: 1,
              background: '#09090b',
              border: '1px solid var(--border-subtle)',
              borderRadius: 4,
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
            }}>
              <LockIcon size={12} color="var(--safe)" />
              <span style={{ color: 'var(--safe-text)' }}>https://</span>
              <span style={{ color: '#ffffff' }}>{pair.legitimate.url.replace(/^https?:\/\//, '')}</span>
            </div>

            <span className="badge-minimal badge-safe" style={{ fontSize: 10 }}>VERIFIED</span>
          </div>

          {/* Features Checklist */}
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', marginBottom: 14 }}>
              Legitimate Architectural Indicators
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pair.legitimate.features.map((feat, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 4,
                  background: '#121215',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 12,
                }}>
                  <span className="text-mono-meta" style={{ fontSize: 11 }}>{feat.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ffffff' }}>
                    <CheckCircleIcon size={14} color="var(--safe)" />
                    <span>{feat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Phishing Clone ═══ */}
        <div className="card-minimal" style={{ overflow: 'hidden', background: '#09090b', borderColor: 'var(--danger-border)' }}>
          {/* Simulated Browser Bar */}
          <div style={{
            padding: '10px 14px',
            background: '#121215',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27272a' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27272a' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27272a' }} />
            </div>

            {/* URL Input */}
            <div style={{
              flex: 1,
              background: '#09090b',
              border: '1px solid var(--danger-border)',
              borderRadius: 4,
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
            }}>
              <AlertTriangleIcon size={12} color="var(--danger)" />
              <span style={{ color: 'var(--danger-text)' }}>
                {pair.phishing.url.startsWith('https') ? 'https://' : 'http://'}
              </span>
              <span style={{ color: '#ffffff', textDecoration: 'underline wavy var(--danger)' }}>
                {pair.phishing.url.replace(/^https?:\/\//, '')}
              </span>
            </div>

            <span className="badge-minimal badge-danger" style={{ fontSize: 10 }}>DECEPTIVE</span>
          </div>

          {/* Features Checklist */}
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', marginBottom: 14 }}>
              Phishing Cloned Indicators
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pair.phishing.features.map((feat, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 4,
                  background: '#121215',
                  border: '1px solid rgba(239, 68, 68, 0.15)',
                  fontSize: 12,
                }}>
                  <span className="text-mono-meta" style={{ fontSize: 11 }}>{feat.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--danger-text)' }}>
                    <AlertTriangleIcon size={14} color="var(--danger)" />
                    <span>{feat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Discrepancy Checklist */}
      <div className="card-minimal" style={{ padding: 24, background: '#09090b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div className="text-mono-meta">IDENTIFIED DISCREPANCIES ({pair.differences.length})</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginTop: 2 }}>
              {revealMode ? 'Full Vulnerability Breakdown' : 'Click Discrepancies to Mark as Discovered'}
            </div>
          </div>
          <button
            onClick={() => setRevealMode(!revealMode)}
            className="btn-dark"
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            {revealMode ? 'Hide Details' : 'Reveal All Now'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pair.differences.map((diff, idx) => {
            const isDiscovered = revealMode || foundDiffs.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => !revealMode && toggleDiff(idx)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 6,
                  background: isDiscovered ? 'rgba(255, 255, 255, 0.03)' : '#121215',
                  border: `1px solid ${isDiscovered ? 'var(--border)' : 'var(--border-subtle)'}`,
                  cursor: revealMode ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
                className={!revealMode ? 'hover:border-zinc-700' : ''}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="text-mono-meta" style={{ fontSize: 11 }}>0{idx + 1}</span>
                  <span style={{
                    fontSize: 13,
                    color: isDiscovered ? '#ffffff' : 'var(--foreground-muted)',
                    filter: isDiscovered ? 'none' : 'blur(4px)',
                    userSelect: isDiscovered ? 'auto' : 'none',
                    transition: 'filter 150ms ease',
                  }}>
                    {diff}
                  </span>
                </div>

                <span className="text-mono-meta" style={{ fontSize: 11 }}>
                  {isDiscovered ? 'DISCOVERED' : 'CLICK TO REVEAL'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
