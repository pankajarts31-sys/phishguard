'use client';
import { useState } from 'react';
import { knowledgeArticles } from '@/lib/challenges';

export default function KnowledgePage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [...new Set(knowledgeArticles.map(a => a.category))];

  const filtered = searchQuery
    ? knowledgeArticles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : knowledgeArticles;

  if (selectedArticle) {
    const article = knowledgeArticles.find(a => a.id === selectedArticle);
    return (
      <div className="page-container" style={{ maxWidth: 800 }}>
        <button
          onClick={() => setSelectedArticle(null)}
          style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
            fontSize: 14, cursor: 'pointer', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          ← Back to Knowledge Base
        </button>

        <div className="glass" style={{ padding: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
            }}>
              {article.icon}
            </div>
            <div>
              <span className="badge badge-info" style={{ marginBottom: 6, display: 'inline-block' }}>
                {article.category}
              </span>
              <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
                {article.title}
              </h1>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                📖 {article.readTime} read
              </div>
            </div>
          </div>

          <div style={{
            fontSize: 15,
            lineHeight: 2,
            color: 'rgba(255,255,255,0.75)',
          }}>
            {article.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={i} style={{
                    fontSize: 18, fontWeight: 700, color: '#fff',
                    marginTop: 28, marginBottom: 12,
                  }}>
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('**')) {
                const parts = paragraph.split('\n');
                return (
                  <div key={i} style={{ marginTop: 20, marginBottom: 12 }}>
                    {parts.map((part, j) => {
                      if (part.startsWith('**')) {
                        const heading = part.match(/\*\*(.+?)\*\*/)?.[1] || part;
                        const rest = part.replace(/\*\*.+?\*\*/, '').trim();
                        return (
                          <div key={j}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#818cf8', marginTop: 16, marginBottom: 4 }}>
                              {heading}
                            </h4>
                            {rest && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{rest}</p>}
                          </div>
                        );
                      }
                      if (part.startsWith('- ')) {
                        return (
                          <div key={j} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            padding: '4px 0 4px 16px',
                          }}>
                            <span style={{ color: 'var(--primary)', marginTop: 2 }}>•</span>
                            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{part.substring(2)}</span>
                          </div>
                        );
                      }
                      if (part.match(/^\d+\./)) {
                        return (
                          <div key={j} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            padding: '6px 0 6px 16px',
                          }}>
                            <span style={{
                              minWidth: 24, height: 24, borderRadius: 8,
                              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 11, fontWeight: 700, color: '#818cf8',
                            }}>
                              {part.match(/^(\d+)/)?.[1]}
                            </span>
                            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                              {part.replace(/^\d+\.\s*/, '')}
                            </span>
                          </div>
                        );
                      }
                      return <p key={j} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>{part}</p>;
                    })}
                  </div>
                );
              }
              return <p key={i} style={{ marginBottom: 12 }}>{paragraph}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="animate-fadeInUp" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 20px', borderRadius: 9999,
          background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
          marginBottom: 20, fontSize: 13, fontWeight: 600, color: '#a78bfa',
        }}>
          📚 Security Knowledge Base
        </div>
        <h1 className="animate-fadeInUp stagger-1" style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12,
        }}>
          Learn About <span className="gradient-text">Phishing</span>
        </h1>
        <p className="animate-fadeInUp stagger-2" style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 550, margin: '0 auto',
        }}>
          Comprehensive guides on phishing attacks, prevention strategies, and incident response procedures.
        </p>
      </div>

      {/* Search */}
      <div className="animate-fadeInUp stagger-3" style={{ marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="🔍 Search articles..."
          className="input-glass"
          style={{ textAlign: 'center' }}
        />
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className="badge badge-info"
            style={{ cursor: 'pointer', padding: '6px 16px', fontSize: 13, border: 'none' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {filtered.map((article, i) => (
          <div
            key={article.id}
            className="glass glass-hover"
            style={{
              padding: 28,
              cursor: 'pointer',
              animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both`,
            }}
            onClick={() => setSelectedArticle(article.id)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, flexShrink: 0,
              }}>
                {article.icon}
              </div>
              <div>
                <span className="badge badge-info" style={{ marginBottom: 8, display: 'inline-block' }}>
                  {article.category}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                  {article.title}
                </h3>
                <p style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {article.content.substring(0, 150)}...
                </p>
                <div style={{
                  marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                    📖 {article.readTime}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#a78bfa' }}>
                    Read →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
