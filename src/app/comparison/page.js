'use client';
import { useState } from 'react';
import { comparisonPairs } from '@/lib/challenges';

export default function ComparisonPage() {
  const [selectedPair, setSelectedPair] = useState(0);
  const [revealMode, setRevealMode] = useState(false);
  const [foundDiffs, setFoundDiffs] = useState([]);

  const pair = comparisonPairs[selectedPair];

  const toggleDiff = (idx) => {
    if (foundDiffs.includes(idx)) {
      setFoundDiffs(foundDiffs.filter(i => i !== idx));
    } else {
      setFoundDiffs([...foundDiffs, idx]);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="animate-fadeInUp" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 20px', borderRadius: 9999,
          background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)',
          marginBottom: 20, fontSize: 13, fontWeight: 600, color: '#34d399',
        }}>
          🔄 Visual Comparison Engine
        </div>
        <h1 className="animate-fadeInUp stagger-1" style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12,
        }}>
          Spot the <span className="gradient-text">Difference</span>
        </h1>
        <p className="animate-fadeInUp stagger-2" style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 550, margin: '0 auto',
        }}>
          Compare legitimate websites with their phishing replicas. Learn to identify the subtle differences.
        </p>
      </div>

      {/* Brand Selector */}
      <div className="animate-fadeInUp stagger-3" style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <div className="tab-bar">
          {comparisonPairs.map((p, i) => (
            <button
              key={p.id}
              className={`tab-item ${i === selectedPair ? 'active' : ''}`}
              onClick={() => { setSelectedPair(i); setRevealMode(false); setFoundDiffs([]); }}
            >
              {p.icon} {p.brand}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
        <button
          className={revealMode ? 'btn-secondary' : 'btn-primary'}
          onClick={() => setRevealMode(false)}
          style={{ padding: '10px 24px', fontSize: 13 }}
        >
          🔍 Spot the Difference
        </button>
        <button
          className={revealMode ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setRevealMode(true)}
          style={{ padding: '10px 24px', fontSize: 13 }}
        >
          💡 Reveal All
        </button>
      </div>

      {/* Side by Side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 24,
        marginBottom: 32,
      }}>
        {/* Legitimate */}
        <div className="glass" style={{
          padding: 28,
          borderColor: 'rgba(16,185,129,0.2)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -12, left: 24,
            padding: '4px 16px', borderRadius: 9999,
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
            color: 'var(--safe)', fontSize: 12, fontWeight: 700,
          }}>
            ✅ LEGITIMATE
          </div>
          <div style={{ marginTop: 12 }}>
            {/* Fake browser bar */}
            <div style={{
              padding: '10px 14px', borderRadius: '10px 10px 0 0',
              background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div style={{
                flex: 1, padding: '5px 12px', borderRadius: 6,
                background: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-mono)',
                fontSize: 11, color: 'var(--safe)', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                🔒 {pair.legitimate.url}
              </div>
            </div>
            {/* Features */}
            <div style={{
              padding: 16, background: 'rgba(0,0,0,0.15)',
              borderRadius: '0 0 10px 10px', border: '1px solid rgba(255,255,255,0.05)',
              borderTop: 'none',
            }}>
              {pair.legitimate.features.map((feat, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: i < pair.legitimate.features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{feat.label}</span>
                  <span style={{
                    fontSize: 12, fontFamily: 'var(--font-mono)',
                    color: feat.safe ? 'var(--safe)' : 'var(--danger)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {feat.safe ? '✅' : '❌'} {feat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phishing */}
        <div className="glass" style={{
          padding: 28,
          borderColor: 'rgba(239,68,68,0.2)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -12, left: 24,
            padding: '4px 16px', borderRadius: 9999,
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            color: 'var(--danger)', fontSize: 12, fontWeight: 700,
          }}>
            ❌ PHISHING
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{
              padding: '10px 14px', borderRadius: '10px 10px 0 0',
              background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div style={{
                flex: 1, padding: '5px 12px', borderRadius: 6,
                background: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-mono)',
                fontSize: 11, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                ⚠️ {pair.phishing.url}
              </div>
            </div>
            <div style={{
              padding: 16, background: 'rgba(0,0,0,0.15)',
              borderRadius: '0 0 10px 10px', border: '1px solid rgba(255,255,255,0.05)',
              borderTop: 'none',
            }}>
              {pair.phishing.features.map((feat, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: i < pair.phishing.features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{feat.label}</span>
                  <span style={{
                    fontSize: 12, fontFamily: 'var(--font-mono)',
                    color: feat.safe ? 'var(--safe)' : 'var(--danger)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {feat.safe ? '✅' : '❌'} {feat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Differences */}
      <div className="glass" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          🔍 Key Differences
          {!revealMode && (
            <span style={{
              fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)',
              marginLeft: 'auto',
            }}>
              Click to reveal ({foundDiffs.length}/{pair.differences.length})
            </span>
          )}
        </h3>

        {/* Progress bar for spot mode */}
        {!revealMode && (
          <div className="progress-bar" style={{ marginBottom: 20 }}>
            <div className="progress-bar-fill" style={{
              width: `${(foundDiffs.length / pair.differences.length) * 100}%`,
              background: 'var(--gradient-primary)',
            }} />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pair.differences.map((diff, i) => {
            const isRevealed = revealMode || foundDiffs.includes(i);
            return (
              <div
                key={i}
                onClick={() => !revealMode && toggleDiff(i)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: isRevealed ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isRevealed ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)'}`,
                  cursor: revealMode ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
                onMouseEnter={e => { if (!revealMode) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; }}
                onMouseLeave={e => { if (!revealMode && !isRevealed) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
              >
                <span style={{ fontSize: 18 }}>
                  {isRevealed ? '🔴' : '❓'}
                </span>
                <span style={{
                  fontSize: 14,
                  color: isRevealed ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                  filter: isRevealed ? 'none' : 'blur(4px)',
                  transition: 'all 0.3s ease',
                  userSelect: isRevealed ? 'auto' : 'none',
                }}>
                  {diff}
                </span>
              </div>
            );
          })}
        </div>

        {!revealMode && foundDiffs.length === pair.differences.length && (
          <div style={{
            marginTop: 20, padding: 20, borderRadius: 12,
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--safe)' }}>
              Excellent! You found all differences!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
