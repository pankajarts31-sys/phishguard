'use client';
import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function useChartSetup(canvasRef, config) {
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const chart = new Chart(ctx, config);
    return () => chart.destroy();
  }, []);
}

function StatCard({ icon, value, label, change, color }) {
  return (
    <div className="glass glass-hover" style={{ padding: 24, textAlign: 'center' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `${color}15`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, margin: '0 auto 12px',
      }}>
        {icon}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: 8 }}>{label}</div>
      {change && (
        <div style={{
          fontSize: 12, fontWeight: 600,
          color: change > 0 ? 'var(--safe)' : 'var(--danger)',
        }}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% this week
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ scans: 0, training: {}, score: 72 });
  const threatChartRef = useRef(null);
  const performanceChartRef = useRef(null);
  const categoryChartRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const scanCount = parseInt(localStorage.getItem('phishguard_scan_count') || '0');
    const training = JSON.parse(localStorage.getItem('phishguard_training_progress') || '{}');
    const history = JSON.parse(localStorage.getItem('phishguard_scan_history') || '[]');

    const threatsDetected = history.filter(h => h.score > 40).length;
    const modulesCompleted = Object.keys(training).length;

    setStats({
      scans: scanCount,
      training,
      threatsDet: threatsDetected,
      modulesCompleted,
      score: Math.min(100, 40 + (scanCount * 3) + (modulesCompleted * 15)),
    });
  }, []);

  // Charts
  useEffect(() => {
    if (!mounted) return;

    // Threat distribution chart
    if (threatChartRef.current) {
      const ctx = threatChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Safe', 'Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
          datasets: [{
            data: [45, 20, 18, 12, 5],
            backgroundColor: [
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(249, 115, 22, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(153, 27, 27, 0.8)',
            ],
            borderColor: 'rgba(17, 24, 39, 1)',
            borderWidth: 3,
            hoverOffset: 8,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: 'rgba(255,255,255,0.6)', padding: 16, font: { size: 12 } },
            },
          },
        },
      });
    }

    // Performance trend chart
    if (performanceChartRef.current) {
      const ctx = performanceChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          datasets: [
            {
              label: 'Detection Accuracy',
              data: [55, 62, 71, 78, 85, 92],
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#6366f1',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
            },
            {
              label: 'Training Score',
              data: [40, 50, 58, 65, 75, 88],
              borderColor: '#06d6a0',
              backgroundColor: 'rgba(6, 214, 160, 0.1)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#06d6a0',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { color: 'rgba(255,255,255,0.6)', padding: 16, font: { size: 12 } },
            },
          },
          scales: {
            y: {
              min: 0, max: 100,
              grid: { color: 'rgba(255,255,255,0.05)' },
              ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
            },
            x: {
              grid: { color: 'rgba(255,255,255,0.03)' },
              ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
            },
          },
        },
      });
    }

    // Category chart
    if (categoryChartRef.current) {
      const ctx = categoryChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Typosquatting', 'Brand Impersonation', 'Suspicious TLD', 'No HTTPS', 'URL Shortener', 'IP Address', 'Homograph', 'Keywords'],
          datasets: [{
            label: 'Threats Detected',
            data: [28, 22, 18, 15, 12, 8, 5, 32],
            backgroundColor: [
              'rgba(99, 102, 241, 0.7)',
              'rgba(239, 68, 68, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(6, 214, 160, 0.7)',
              'rgba(6, 182, 212, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(236, 72, 153, 0.7)',
              'rgba(249, 115, 22, 0.7)',
            ],
            borderRadius: 6,
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              grid: { color: 'rgba(255,255,255,0.05)' },
              ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
            },
            x: {
              grid: { display: false },
              ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10 }, maxRotation: 45 },
            },
          },
        },
      });
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="animate-fadeInUp" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 20px', borderRadius: 9999,
          background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
          marginBottom: 20, fontSize: 13, fontWeight: 600, color: '#22d3ee',
        }}>
          📊 Analytics Dashboard
        </div>
        <h1 className="animate-fadeInUp stagger-1" style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12,
        }}>
          Your Security <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="animate-fadeInUp stagger-2" style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 550, margin: '0 auto',
        }}>
          Track your progress, analyze threat patterns, and improve your cybersecurity awareness score.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        <StatCard icon="🔍" value={stats.scans} label="URLs Scanned" change={23} color="#6366f1" />
        <StatCard icon="🎯" value={stats.threatsDet || 0} label="Threats Detected" change={-5} color="#ef4444" />
        <StatCard icon="🎮" value={stats.modulesCompleted || 0} label="Modules Completed" change={15} color="#06d6a0" />
        <StatCard icon="🛡️" value={stats.score} label="Security Score" change={8} color="#06b6d4" />
      </div>

      {/* Security Score Gauge */}
      <div className="glass" style={{
        padding: 32,
        marginBottom: 24,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 32,
      }}>
        <div style={{ flex: '0 0 200px', textAlign: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="75" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
            <circle
              cx="90" cy="90" r="75"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 75}
              strokeDashoffset={2 * Math.PI * 75 * (1 - stats.score / 100)}
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dashoffset 2s ease-out' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06d6a0" />
              </linearGradient>
            </defs>
            <text x="90" y="82" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="800" fontFamily="Inter">
              {stats.score}
            </text>
            <text x="90" y="105" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="500" fontFamily="Inter">
              Security Score
            </text>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Security Hygiene Breakdown</h3>
          {[
            { label: 'URL Analysis Skills', value: Math.min(100, stats.scans * 10), color: '#6366f1' },
            { label: 'Email Detection', value: stats.training?.email ? 85 : 20, color: '#06d6a0' },
            { label: 'Visual Inspection', value: stats.training?.inspector ? 90 : 15, color: '#f59e0b' },
            { label: 'Pattern Recognition', value: stats.training?.url ? 88 : 25, color: '#06b6d4' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.value}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{
                  width: `${item.value}%`,
                  background: item.color,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: 24,
        marginBottom: 24,
      }}>
        {/* Performance Trend */}
        <div className="glass" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            📈 Performance Trend
          </h3>
          <div style={{ height: 280 }}>
            <canvas ref={performanceChartRef} />
          </div>
        </div>

        {/* Threat Distribution */}
        <div className="glass" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            🎯 Threat Distribution
          </h3>
          <div style={{ height: 280 }}>
            <canvas ref={threatChartRef} />
          </div>
        </div>
      </div>

      {/* Category Chart */}
      <div className="glass" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          📊 Threat Categories Detected
        </h3>
        <div style={{ height: 300 }}>
          <canvas ref={categoryChartRef} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass" style={{ padding: 24, marginTop: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          🕐 Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: '🔍', text: 'URL scanned — paypal.com', time: '2 min ago', color: '#6366f1' },
            { icon: '✅', text: 'Email Triage module completed', time: '15 min ago', color: '#10b981' },
            { icon: '🚨', text: 'Phishing URL detected — paypa1.com', time: '1 hour ago', color: '#ef4444' },
            { icon: '📚', text: 'Read "Types of Phishing" article', time: '3 hours ago', color: '#8b5cf6' },
            { icon: '🏆', text: 'Achievement unlocked: First Scan', time: '1 day ago', color: '#f59e0b' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 16px', borderRadius: 10,
              background: 'rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.03)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${item.color}15`, border: `1px solid ${item.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{item.text}</div>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
