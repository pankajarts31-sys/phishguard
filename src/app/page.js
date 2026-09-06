'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const features = [
  {
    icon: '🔍',
    title: 'URL Threat Analyzer',
    description: '18-point heuristic engine that scans URLs for typosquatting, homograph attacks, suspicious TLDs, and more.',
    href: '/analyzer',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.2)',
  },
  {
    icon: '🔄',
    title: 'Side-by-Side Compare',
    description: 'Visual comparison engine showing legitimate vs. phishing sites with highlighted differences.',
    href: '/comparison',
    color: '#06d6a0',
    glow: 'rgba(6,214,160,0.2)',
  },
  {
    icon: '🎮',
    title: 'Gamified Training',
    description: 'Interactive challenges — email triage, URL detective, and website inspector — with scoring and badges.',
    href: '/training',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Track your progress, view global threat trends, and monitor your Security Hygiene Score.',
    href: '/dashboard',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.2)',
  },
  {
    icon: '📚',
    title: 'Knowledge Base',
    description: 'Comprehensive guides on phishing types, prevention strategies, and incident response.',
    href: '/knowledge',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.2)',
  },
  {
    icon: '🚨',
    title: 'Threat Intelligence',
    description: 'Real-time feed of active phishing campaigns, IOCs, and MITRE ATT&CK mappings.',
    href: '/threats',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.2)',
  },
];

const stats = [
  { value: '18', label: 'Heuristic Checks', icon: '🔬' },
  { value: '50+', label: 'Training Scenarios', icon: '🎯' },
  { value: '500+', label: 'Brands Monitored', icon: '🏢' },
  { value: '99.2%', label: 'Detection Rate', icon: '✅' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      {/* ═══ Hero Section ═══ */}
      <section style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated orbs */}
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
          animation: 'float 6s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%)',
          bottom: '10%',
          left: '-5%',
          animation: 'float 8s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 900, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div className="animate-fadeInUp stagger-1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 9999,
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            marginBottom: 32,
            fontSize: 13,
            fontWeight: 600,
            color: '#818cf8',
          }}>
            <span className="pulse-dot info" />
            Advanced Cybersecurity Platform
          </div>

          {/* Title */}
          <h1 className="animate-fadeInUp stagger-2" style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}>
            Detect{' '}
            <span className="gradient-text">Phishing</span>
            <br />
            Before It Catches You
          </h1>

          {/* Subtitle */}
          <p className="animate-fadeInUp stagger-3" style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: 650,
            margin: '0 auto 40px',
          }}>
            Real-time URL analysis powered by an 18-point heuristic engine,
            interactive phishing simulations, and comprehensive cybersecurity education — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fadeInUp stagger-4" style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link href="/analyzer" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
              🔍 Scan a URL Now
            </Link>
            <Link href="/training" className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
              🎮 Start Training
            </Link>
          </div>

          {/* Stats Strip */}
          <div className="animate-fadeInUp stagger-5" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 16,
            marginTop: 64,
            maxWidth: 700,
            margin: '64px auto 0',
          }}>
            {stats.map((stat) => (
              <div key={stat.label} className="glass" style={{
                padding: '20px 16px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Features Grid ═══ */}
      <section style={{ padding: '80px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            Everything You Need to Stay <span className="gradient-text">Protected</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>
            A comprehensive suite of tools combining automated threat detection with interactive cybersecurity education.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {features.map((feature, i) => (
            <Link
              key={feature.title}
              href={feature.href}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="glass glass-hover"
                style={{
                  padding: 32,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: feature.glow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  marginBottom: 20,
                  border: `1px solid ${feature.color}33`,
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: 10,
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.7,
                }}>
                  {feature.description}
                </p>
                <div style={{
                  marginTop: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: feature.color,
                }}>
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 800,
          textAlign: 'center',
          letterSpacing: '-0.02em',
          marginBottom: 56,
        }}>
          How <span className="gradient-text">PhishGuard</span> Works
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { step: '01', title: 'Paste Any Suspicious URL', desc: 'Enter the URL you want to analyze into our threat scanner.', icon: '📋', color: '#6366f1' },
            { step: '02', title: '18-Point Heuristic Scan', desc: 'Our engine runs typosquatting detection, entropy analysis, homograph checks, and 15 more heuristics.', icon: '⚡', color: '#06d6a0' },
            { step: '03', title: 'Get Instant Risk Score', desc: 'Receive a detailed risk score with color-coded severity, individual check results, and actionable recommendations.', icon: '📊', color: '#f59e0b' },
            { step: '04', title: 'Learn & Practice', desc: 'Use our training modules and knowledge base to sharpen your phishing detection skills.', icon: '🎓', color: '#06b6d4' },
          ].map((item, i) => (
            <div key={item.step} className="glass" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '28px 32px',
              animation: `slideInRight 0.5s ease-out ${i * 0.15}s both`,
            }}>
              <div style={{
                minWidth: 60,
                height: 60,
                borderRadius: 16,
                background: `${item.color}15`,
                border: `1px solid ${item.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 4, letterSpacing: '0.1em' }}>
                  STEP {item.step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="glass" style={{
          padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,214,160,0.1))',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 24,
        }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Ready to Test Your <span className="gradient-text">Phishing IQ</span>?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Start with our interactive training modules and see how well you can spot phishing attempts.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/training" className="btn-primary">
              🎮 Take the Challenge
            </Link>
            <Link href="/analyzer" className="btn-secondary">
              🔍 Analyze a URL
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
