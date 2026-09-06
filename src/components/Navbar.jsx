'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldIcon, 
  SearchIcon, 
  CompareIcon, 
  TerminalIcon, 
  DashboardIcon, 
  AcademicIcon, 
  AlertTriangleIcon 
} from '@/components/Icons';

const navLinks = [
  { href: '/analyzer', label: 'Analyzer', Icon: SearchIcon },
  { href: '/comparison', label: 'Compare', Icon: CompareIcon },
  { href: '/training', label: 'Training', Icon: TerminalIcon },
  { href: '/dashboard', label: 'Telemetry', Icon: DashboardIcon },
  { href: '/threats', label: 'Threat Feed', Icon: AlertTriangleIcon },
  { href: '/knowledge', label: 'Docs', Icon: AcademicIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background-color 150ms ease, border-color 150ms ease',
      }}
    >
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link 
          href="/" 
          style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10,
            color: '#ffffff'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            borderRadius: 6,
            background: '#ffffff',
            color: '#000000',
          }}>
            <ShieldIcon size={16} />
          </div>
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}>
            PhishGuard
          </span>
          <span style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            padding: '2px 6px',
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border)',
            color: 'var(--foreground-subtle)',
          }}>
            v1.0
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {navLinks.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  color: isActive ? '#ffffff' : 'var(--foreground-muted)',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
                  transition: 'all 120ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--foreground-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={14} color={isActive ? '#ffffff' : 'var(--foreground-subtle)'} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Status indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--foreground-subtle)',
          padding: '4px 10px',
          borderRadius: 6,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border)',
        }}>
          <span className="status-dot safe" />
          <span style={{ fontSize: 11 }}>ENGINE ONLINE</span>
        </div>

        {/* Fast Scanner CTA */}
        <Link
          href="/analyzer"
          className="btn-solid-white"
          style={{ padding: '6px 14px', fontSize: 13 }}
        >
          <span>Scan URL</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 6,
            color: 'var(--foreground)',
            padding: '6px 10px',
            cursor: 'pointer',
            display: 'none',
          }}
          className="visible-mobile"
          aria-label="Toggle Navigation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            background: '#09090b',
            borderBottom: '1px solid var(--border)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {navLinks.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  padding: '10px 12px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : 'var(--foreground-muted)',
                  background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 868px) {
          .hidden-mobile { display: none !important; }
          .visible-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
