'use client';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 24px',
      textAlign: 'center',
      background: 'rgba(10, 14, 26, 0.8)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 24 }}>🛡️</span>
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1, #06d6a0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>PhishGuard</span>
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 13,
          lineHeight: 1.6,
          maxWidth: 500,
          margin: '0 auto',
        }}>
          Advanced phishing detection and cybersecurity education platform.
          Protecting users through knowledge and real-time analysis.
        </p>
        <div style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          {['Privacy Policy', 'Terms of Service', 'Security', 'Contact'].map(link => (
            <a
              key={link}
              href="#"
              style={{
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                fontSize: 13,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              {link}
            </a>
          ))}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 20 }}>
          © 2025 PhishGuard. Built for cybersecurity education. Not a replacement for professional security tools.
        </p>
      </div>
    </footer>
  );
}
