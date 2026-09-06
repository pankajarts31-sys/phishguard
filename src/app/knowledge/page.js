'use client';
import { useState } from 'react';
import { knowledgeArticles } from '@/lib/challenges';
import { AcademicIcon, SearchIcon, ArrowRightIcon } from '@/components/Icons';

export default function KnowledgePage() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...new Set(knowledgeArticles.map(a => a.category))];

  const filtered = knowledgeArticles.filter(a => {
    const matchesCat = activeCategory === 'all' || a.category === activeCategory;
    const matchesSearch = !searchQuery || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (selectedArticle) {
    const article = knowledgeArticles.find(a => a.id === selectedArticle);
    return (
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '36px 24px 80px' }}>
        <button
          onClick={() => setSelectedArticle(null)}
          className="btn-ghost"
          style={{ marginBottom: 24, padding: '4px 8px', fontSize: 13 }}
        >
          ← Back to Documentation
        </button>

        <article className="card-minimal" style={{ padding: '36px 32px', background: '#09090b' }}>
          <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="badge-minimal">{article.category}</span>
              <span className="text-mono-meta">• {article.readTime?.toUpperCase() || '3 MIN READ'}</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              {article.title}
            </h1>
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--foreground)' }}>
            {article.content.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: 18, whiteSpace: 'pre-line' }}>
                {para}
              </p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '36px 24px 80px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="text-mono-meta">DEFENSIVE DOCUMENTATION</span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-mono-meta">SECURITY REPOSITORY</span>
        </div>
        <h1 className="heading-section" style={{ fontSize: 26, marginBottom: 8 }}>
          Security Knowledge Repository
        </h1>
        <p className="text-subtle" style={{ fontSize: 14 }}>
          Comprehensive defensive guides detailing deceptive methodologies, homoglyphs, and containment protocols.
        </p>
      </div>

      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
      }}>
        {/* Categories */}
        <div style={{ display: 'flex', gap: 4, background: '#09090b', padding: 3, borderRadius: 6, border: '1px solid var(--border)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: 'none',
                color: activeCategory === cat ? '#ffffff' : 'var(--foreground-muted)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                padding: '5px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: 280 }}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="input-minimal"
            style={{ paddingLeft: 34, fontSize: 13, padding: '8px 12px 8px 34px' }}
          />
          <div style={{ position: 'absolute', left: 10, top: 10, color: 'var(--foreground-subtle)' }}>
            <SearchIcon size={15} />
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
      }}>
        {filtered.map(article => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article.id)}
            className="card-minimal"
            style={{
              padding: 20,
              background: '#09090b',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 180,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="badge-minimal">{article.category}</span>
                <span className="text-mono-meta">{article.readTime}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 8, lineHeight: 1.4 }}>
                {article.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {article.content}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 500,
              color: '#ffffff',
              marginTop: 16,
            }}>
              <span>Read Documentation</span>
              <ArrowRightIcon size={12} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
