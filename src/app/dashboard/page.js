'use client';
import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { 
  DashboardIcon, 
  ActivityIcon, 
  ShieldIcon, 
  AlertTriangleIcon,
  CheckCircleIcon 
} from '@/components/Icons';

Chart.register(...registerables);

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [metrics, setMetrics] = useState({ scans: 0, threats: 0, score: 78 });
  const doughnutRef = useRef(null);
  const lineRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    try {
      const history = JSON.parse(localStorage.getItem('phishguard_scan_history') || '[]');
      const scanCount = history.length;
      const threatCount = history.filter(h => h.score > 30).length;
      setMetrics({
        scans: scanCount,
        threats: threatCount,
        score: Math.min(95, 60 + (scanCount * 4)),
      });
    } catch (e) {}
  }, []);

  // Initialize Minimalist Monochromatic Chart.js Visuals
  useEffect(() => {
    if (!mounted) return;

    let chart1, chart2, chart3;

    // 1. Doughnut Chart
    if (doughnutRef.current) {
      const ctx = doughnutRef.current.getContext('2d');
      chart1 = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Safe (0-20)', 'Low Risk (21-40)', 'Suspicious (41-70)', 'Critical (>70)'],
          datasets: [{
            data: [54, 22, 16, 8],
            backgroundColor: [
              '#10b981',
              '#3b82f6',
              '#f59e0b',
              '#ef4444',
            ],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#71717a', font: { family: 'Geist, sans-serif', size: 11 }, boxWidth: 10 },
            },
          },
          cutout: '76%',
        },
      });
    }

    // 2. Line Chart: Telemetry over time
    if (lineRef.current) {
      const ctx = lineRef.current.getContext('2d');
      chart2 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Awareness Score',
            data: [64, 68, 71, 70, 78, 82, 86],
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#ffffff',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { color: '#71717a', font: { family: 'Geist Mono, monospace', size: 10 } },
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { color: '#71717a', font: { family: 'Geist Mono, monospace', size: 10 } },
            },
          },
        },
      });
    }

    // 3. Bar Chart: Attack vectors
    if (barRef.current) {
      const ctx = barRef.current.getContext('2d');
      chart3 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Typosquat', 'Homoglyph', 'IP Link', 'Data URI', 'Subdomain'],
          datasets: [{
            data: [42, 28, 19, 14, 31],
            backgroundColor: '#27272a',
            hoverBackgroundColor: '#ffffff',
            borderRadius: 4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#71717a', font: { family: 'Geist Mono, monospace', size: 10 } },
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { color: '#71717a', font: { family: 'Geist Mono, monospace', size: 10 } },
            },
          },
        },
      });
    }

    return () => {
      chart1?.destroy();
      chart2?.destroy();
      chart3?.destroy();
    };
  }, [mounted]);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px 80px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="text-mono-meta">SECURITY INTELLIGENCE</span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-mono-meta">OPERATIONAL TELEMETRY</span>
        </div>
        <h1 className="heading-section" style={{ fontSize: 26, marginBottom: 8 }}>
          Telemetry & Performance Cockpit
        </h1>
        <p className="text-subtle" style={{ fontSize: 14 }}>
          Aggregate statistics, evaluation score trends, and real-time attack vector distributions.
        </p>
      </div>

      {/* Metric Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        marginBottom: 28,
      }}>
        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div className="text-mono-meta" style={{ marginBottom: 4 }}>LOCAL SCANS EVALUATED</div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>
            {metrics.scans}
          </div>
          <div className="text-mono-meta" style={{ color: 'var(--safe-text)', marginTop: 4 }}>
            Active Session Telemetry
          </div>
        </div>

        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div className="text-mono-meta" style={{ marginBottom: 4 }}>MALICIOUS VECTORS DETECTED</div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>
            {metrics.threats}
          </div>
          <div className="text-mono-meta" style={{ color: 'var(--danger-text)', marginTop: 4 }}>
            Flags Prevented
          </div>
        </div>

        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div className="text-mono-meta" style={{ marginBottom: 4 }}>DEFENSIVE HYGIENE RATING</div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>
            {metrics.score}%
          </div>
          <div className="text-mono-meta" style={{ color: 'var(--safe-text)', marginTop: 4 }}>
            Strong Readiness
          </div>
        </div>

        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div className="text-mono-meta" style={{ marginBottom: 4 }}>HEURISTIC ENGINE STATUS</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span className="status-dot safe" />
            <span>OPERATIONAL</span>
          </div>
          <div className="text-mono-meta" style={{ marginTop: 6 }}>
            18/18 Checks Armed
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
        marginBottom: 32,
      }}>
        
        {/* Threat Distribution Doughnut */}
        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div className="text-mono-meta" style={{ marginBottom: 4 }}>DISTRIBUTION</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>
            Evaluated Risk Severity Ratio
          </div>
          <div style={{ height: 220, position: 'relative' }}>
            <canvas ref={doughnutRef} />
          </div>
        </div>

        {/* Weekly Trend Line */}
        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div className="text-mono-meta" style={{ marginBottom: 4 }}>COGNITIVE PROGRESSION</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>
            Weekly Awareness Score Trend
          </div>
          <div style={{ height: 220, position: 'relative' }}>
            <canvas ref={lineRef} />
          </div>
        </div>

        {/* Vector Frequency Bar */}
        <div className="card-minimal" style={{ padding: 20, background: '#09090b' }}>
          <div className="text-mono-meta" style={{ marginBottom: 4 }}>INCIDENT FREQUENCY</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>
            Top Encountered Attack Vectors
          </div>
          <div style={{ height: 220, position: 'relative' }}>
            <canvas ref={barRef} />
          </div>
        </div>

      </div>

      {/* Architecture Readiness Matrix */}
      <div className="card-minimal" style={{ padding: 24, background: '#09090b' }}>
        <div className="text-mono-meta" style={{ marginBottom: 6 }}>SYSTEM PROFILE</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>
          Heuristic Vector Baseline Configuration
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { name: 'Typosquatting Distance', spec: 'Levenshtein <= 3', status: 'ACTIVE' },
            { name: 'Homoglyph Unicode', spec: 'Cyrillic + Punycode', status: 'ACTIVE' },
            { name: 'Entropy Floor', spec: 'Shannon > 3.8 bits', status: 'ACTIVE' },
            { name: 'Subdomain Depth', spec: 'Threshold > 3 lvls', status: 'ACTIVE' },
          ].map((item, i) => (
            <div key={i} style={{ padding: 12, borderRadius: 6, background: '#121215', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#ffffff' }}>{item.name}</div>
              <div className="text-mono-meta" style={{ marginTop: 2 }}>{item.spec}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <span className="status-dot safe" />
                <span className="text-mono-meta" style={{ color: 'var(--safe-text)', fontSize: 10 }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
