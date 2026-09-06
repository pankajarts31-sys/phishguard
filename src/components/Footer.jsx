'use client';
import Link from 'next/link';
import { ShieldIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '48px 24px 36px',
      background: '#000000',
      color: 'var(--foreground-muted)',
      fontSize: 13,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        {/* Brand info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 5,
            background: '#ffffff',
            color: '#000000',
          }}>
            <ShieldIcon size={14} />
          </div>
          <span style={{ color: '#ffffff', fontWeight: 600, fontSize: 14, letterSpacing: '-0.02em' }}>
            PhishGuard
          </span>
          <span style={{ color: 'var(--foreground-subtle)', margin: '0 4px' }}>—</span>
          <span style={{ color: 'var(--foreground-subtle)', fontSize: 13 }}>
            Heuristic Phishing Telemetry & Defense
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/analyzer" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }} className="hover:text-white">
            Scanner
          </Link>
          <Link href="/comparison" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }} className="hover:text-white">
            Comparison
          </Link>
          <Link href="/training" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }} className="hover:text-white">
            Academy
          </Link>
          <Link href="/threats" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }} className="hover:text-white">
            Threats
          </Link>
          <Link href="/knowledge" style={{ color: 'var(--foreground-muted)', textDecoration: 'none' }} className="hover:text-white">
            Docs
          </Link>
        </div>
      </div>

      <div style={{
        maxWidth: 1100,
        margin: '28px auto 0',
        paddingTop: 20,
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        color: 'var(--foreground-subtle)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
      }}>
        <div>
          © {new Date().getFullYear()} PhishGuard Open Architecture. Zero static telemetry tracking.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="status-dot safe" />
          <span>ALL HEURISTIC ENGINES OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}
