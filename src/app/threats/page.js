'use client';
import { useState } from 'react';
import { threatFeed } from '@/lib/challenges';
import { 
  AlertTriangleIcon, 
  SearchIcon, 
  ShieldIcon, 
  ArrowRightIcon 
} from '@/components/Icons';

const severityConfig = {
  critical: { label: 'CRITICAL', statusClass: 'badge-danger', dot: 'danger' },
  high: { label: 'HIGH', statusClass: 'badge-danger', dot: 'danger' },
  medium: { label: 'MEDIUM', statusClass: 'badge-warning', dot: 'warning' },
  low: { label: 'LOW', statusClass: 'badge-safe', dot: 'safe' },
};

function ThreatCard({ threat }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityConfig[threat.severity] || severityConfig.medium;

  return (
    <div
      className="card-minimal"
      style={{
        padding: 0,
        overflow: 'hidden',
        background: '#09090b',
        cursor: 'pointer',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top Meta Strip */}
      <div style={{
        padding: '10px 16px',
        background: '#121215',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="status-dot" style={{
            background: threat.severity === 'critical' ? 'var(--critical)' : threat.severity === 'high' ? 'var(--danger)' : threat.severity === 'medium' ? 'var(--warning)' : 'var(--safe)'
          }} />
          <span className="text-mono-meta" style={{ color: '#ffffff', fontWeight: 600 }}>
            {sev.label}
          </span>
          <span style={{ color: 'var(--border)' }}>•</span>
          <span className="text-mono-meta">{threat.targetIndustry || 'Enterprise SaaS'}</span>
        </div>

        <span className="badge-minimal" style={{ fontSize: 10 }}>
          {threat.attackType}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 6 }}>
          {threat.title}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.5 }}>
          {threat.description}
        </p>

        {expanded && (
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
            {/* Indicators of Compromise */}
            <div style={{ marginBottom: 14 }}>
              <div className="text-mono-meta" style={{ marginBottom: 8, color: '#ffffff' }}>
                INDICATORS OF COMPROMISE (IOCS)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {threat.iocs?.map((ioc, i) => (
                  <div key={i} style={{
                    padding: '6px 10px',
                    borderRadius: 4,
                    background: '#121215',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--foreground)',
                  }}>
                    {ioc}
                  </div>
                ))}
              </div>
            </div>

            {/* MITRE ATT&CK Mapping */}
            {threat.mitreAttack && (
              <div>
                <div className="text-mono-meta" style={{ marginBottom: 6, color: '#ffffff' }}>
                  MITRE ATT&CK TECHNIQUE
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span className="badge-minimal" style={{ color: '#ffffff' }}>
                    {threat.mitreAttack.id}: {threat.mitreAttack.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ThreatsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = threatFeed.filter(t => {
    const matchesSev = filter === 'all' || t.severity === filter;
    const matchesSearch = !search || 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '36px 24px 80px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="text-mono-meta">THREAT TELEMETRY</span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-mono-meta">GLOBAL DEPLOYED VECTORS</span>
        </div>
        <h1 className="heading-section" style={{ fontSize: 26, marginBottom: 8 }}>
          Active Threat Intelligence Feed
        </h1>
        <p className="text-subtle" style={{ fontSize: 14 }}>
          Live curated Indicators of Compromise (IOCs), threat actor telemetry, and MITRE ATT&CK alignments.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
      }}>
        {/* Severity Filters */}
        <div style={{ display: 'flex', gap: 4, background: '#09090b', padding: 3, borderRadius: 6, border: '1px solid var(--border)' }}>
          {['all', 'critical', 'high', 'medium'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilter(sev)}
              style={{
                background: filter === sev ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: 'none',
                color: filter === sev ? '#ffffff' : 'var(--foreground-muted)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                padding: '5px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div style={{ position: 'relative', width: 280 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter campaigns or IOCs..."
            className="input-minimal"
            style={{ paddingLeft: 34, fontSize: 13, padding: '8px 12px 8px 34px' }}
          />
          <div style={{ position: 'absolute', left: 10, top: 10, color: 'var(--foreground-subtle)' }}>
            <SearchIcon size={15} />
          </div>
        </div>
      </div>

      {/* Threat List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(threat => (
          <ThreatCard key={threat.id} threat={threat} />
        ))}
      </div>

    </div>
  );
}
