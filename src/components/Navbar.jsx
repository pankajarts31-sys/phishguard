'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/analyzer', label: 'Analyzer', icon: '🔍' },
  { href: '/comparison', label: 'Compare', icon: '🔄' },
  { href: '/training', label: 'Training', icon: '🎮' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/knowledge', label: 'Knowledge', icon: '📚' },
  { href: '/threats', label: 'Threats', icon: '🚨' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        padding: '0 24px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10, 14, 26, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontSize: 28,
          filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.5))',
        }}>🛡️</span>
        <span style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #6366f1, #06d6a0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          PhishGuard
        </span>
      </Link>

      {/* Desktop Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        '@media (maxWidth: 900px)': { display: 'none' },
      }}
      className="desktop-nav"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                background: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: 16 }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 24,
          cursor: 'pointer',
          padding: 8,
        }}
        aria-label="Toggle mobile menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 72,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 14, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 99,
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 20px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: isActive ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid ' + (isActive ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)'),
                }}
              >
                <span style={{ fontSize: 20 }}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
