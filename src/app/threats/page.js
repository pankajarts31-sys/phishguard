'use client';
import { useState } from 'react';
import { threatFeed } from '@/lib/challenges';

const severityConfig = {
  critical: { color: '#991B1B', bg: 'rgba(153,27,27,0.15)', border: 'rgba(153,27,27,0.3)', label: 'CRITICAL', icon: '🔴' },
  high: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', label: 'HIGH', icon: '🟠' },
  medium: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', label: 'MEDIUM', icon: '🟡' },
  low: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', label: 'LOW', icon: '🟢' },
};

function ThreatCard({ threat, index }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityConfig[threat.severity];
  const timeAgo = getTimeAgo(threat.timestamp);

  return (
    <div
      className="glass"
      style={{
        padding: 0,
        overflow: 'hidden',
        borderColor: sev.border,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Header bar */}
      <div style={{
        padding: '12px 20px',
        background: sev.bg,
        borderBottom: `1px solid ${sev.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>{sev.icon}</span>
          <span style={{
            fontSize: 11, fontWeight: 800, color: sev.color,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {sev.label}
          </span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{timeAgo}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="badge badge-cyan" style={{ fontSize: 10, padding: '2px 8px' }}>
            {threat.attackType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
          {threat.title}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          {threat.description}
        </p>

        {expanded && (
          <div style={{ marginTop: 16, animation: 'fadeIn 0.3s ease-out' }}>
            {/* IOCs */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: 'var(--danger)',
                marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Indicators of Compromise (IOCs)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {threat.iocs.map((ioc, i) => (
                  <div key={i} style={{
                    padding: '6px 12px', borderRadius: 6,
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.1)',
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ color: 'var(--danger)' }}>⚠</span>
                    {ioc}
                  </div>
                ))}
              </div>
            </div>

            {/* TTPs */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#818cf8',
                marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                MITRE ATT&CK TTPs
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {threat.ttps.map((ttp, i) => (
                  <span key={i} className="badge badge-info" style={{ fontSize: 10 }}>
                    {ttp}
                  </span>
                ))}
              </div>
            </div>

            {/* Details Row */}
            <div style={{
              display: 'flex', gap: 12, flexWrap: 'wrap',
              padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                padding: '6px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>INDUSTRY</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{threat.industry}</div>
              </div>
              <div style={{
                padding: '6px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>REGION</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{threat.region}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{
          marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {expanded ? '▲ Click to collapse' : '▼ Click for details'}
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return 'Just now';
}

export default function ThreatsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = threatFeed.filter(t => {
    if (filter !== 'all' && t.severity !== filter) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const severityCounts = {
    critical: threatFeed.filter(t => t.severity === 'critical').length,
    high: threatFeed.filter(t => t.severity === 'high').length,
    medium: threatFeed.filter(t => t.severity === 'medium').length,
    low: threatFeed.filter(t => t.severity === 'low').length,
  };

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="animate-fadeInUp" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 20px', borderRadius: 9999,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          marginBottom: 20, fontSize: 13, fontWeight: 600, color: '#f87171',
        }}>
          <span className="pulse-dot danger" /> Live Threat Intelligence
        </div>
        <h1 className="animate-fadeInUp stagger-1" style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12,
        }}>
          Threat <span className="gradient-text-danger">Intelligence</span> Feed
        </h1>
        <p className="animate-fadeInUp stagger-2" style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 550, margin: '0 auto',
        }}>
          Real-time monitoring of active phishing campaigns with IOCs and MITRE ATT&CK mappings.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="animate-fadeInUp stagger-3" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32,
      }}>
        {Object.entries(severityCounts).map(([key, count]) => {
          const sev = severityConfig[key];
          return (
            <div key={key} className="glass" style={{
              padding: '14px 16px', textAlign: 'center',
              borderColor: filter === key ? sev.border : 'rgba(255,255,255,0.08)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => setFilter(filter === key ? 'all' : key)}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: sev.color }}>{count}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase' }}>
                {key}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="🔍 Search threats by keyword..."
          className="input-glass"
        />
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <button
          className={`tab-item ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
          style={{ borderRadius: 9999, padding: '6px 16px' }}
        >
          All ({threatFeed.length})
        </button>
        {Object.entries(severityConfig).map(([key, sev]) => (
          <button
            key={key}
            className={`tab-item ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(filter === key ? 'all' : key)}
            style={{
              borderRadius: 9999, padding: '6px 16px',
              ...(filter === key ? { background: sev.bg, color: sev.color, border: `1px solid ${sev.border}` } : {}),
            }}
          >
            {sev.icon} {sev.label}
          </button>
        ))}
      </div>

      {/* Threat Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map((threat, i) => (
          <ThreatCard key={threat.id} threat={threat} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🔍</div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>
            No threats match your filters
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{
        marginTop: 32, padding: '16px 20px', borderRadius: 12,
        background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)',
        fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
        textAlign: 'center',
      }}>
        ℹ️ This threat feed contains <strong style={{ color: 'rgba(255,255,255,0.6)' }}>simulated data</strong> for educational purposes.
        All IOCs and campaign details are fictional and created to demonstrate threat intelligence concepts.
      </div>
    </div>
  );
}
