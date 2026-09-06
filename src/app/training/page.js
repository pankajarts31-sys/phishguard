'use client';
import { useState, useEffect } from 'react';
import { emailChallenges, urlChallenges, inspectorChallenges, achievements } from '@/lib/challenges';
import { 
  TerminalIcon, 
  MailIcon, 
  SearchIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  FlameIcon, 
  ShieldIcon,
  ArrowRightIcon
} from '@/components/Icons';

// ═══════════════════════════════════════════════════════════════════════════
// EMAIL TRIAGE COMPONENT (Minimal Engineered UI)
// ═══════════════════════════════════════════════════════════════════════════
function EmailTriage({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answered, setAnswered] = useState(null); // 'safe' | 'phishing' | null
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [results, setResults] = useState([]);

  const challenge = emailChallenges[currentIdx];
  const isFinished = currentIdx >= emailChallenges.length;

  const handleAnswer = (answer) => {
    const isCorrect = (answer === 'phishing') === challenge.isPhishing;
    setAnswered(answer);
    if (isCorrect) {
      setScore(prev => prev + 10 + (streak >= 3 ? 5 : 0));
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    setResults(prev => [...prev, { id: challenge.id, correct: isCorrect }]);
  };

  const handleNext = () => {
    setAnswered(null);
    if (currentIdx + 1 >= emailChallenges.length) {
      onComplete({ score, total: emailChallenges.length, correct: results.filter(r => r.correct).length + (answered !== null ? 1 : 0) });
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  if (isFinished) {
    return (
      <div className="card-minimal" style={{ textAlign: 'center', padding: 48, background: '#09090b' }}>
        <div className="text-mono-meta" style={{ marginBottom: 8 }}>EVALUATION COMPLETED</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
          Email Triage Session Finalized
        </h3>
        <p className="text-subtle" style={{ marginBottom: 24 }}>
          Total Score: <span style={{ color: '#ffffff', fontWeight: 600 }}>{score} points</span> • Accuracy: {Math.round((results.filter(r => r.correct).length / emailChallenges.length) * 100)}%
        </p>
        <button
          onClick={() => {
            setCurrentIdx(0);
            setResults([]);
            setScore(0);
            setStreak(0);
            setAnswered(null);
          }}
          className="btn-solid-white"
        >
          Restart Scenario
        </button>
      </div>
    );
  }

  const isCorrect = answered ? ((answered === 'phishing') === challenge.isPhishing) : null;

  return (
    <div>
      {/* Session Header Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <span className="text-mono-meta">
          EMAIL INCIDENT {currentIdx + 1} OF {emailChallenges.length}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {streak >= 2 && (
            <span className="badge-minimal badge-warning" style={{ fontSize: 11 }}>
              <FlameIcon size={12} />
              <span>{streak}x STREAK</span>
            </span>
          )}
          <span className="badge-minimal" style={{ color: '#ffffff', fontWeight: 600 }}>
            {score} XP
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div style={{ width: '100%', height: 2, background: '#18181b', borderRadius: 2, marginBottom: 20 }}>
        <div style={{ width: `${((currentIdx) / emailChallenges.length) * 100}%`, height: '100%', background: '#ffffff', transition: 'width 200ms ease' }} />
      </div>

      {/* Email Client Card */}
      <div className="card-minimal" style={{ overflow: 'hidden', background: '#09090b', marginBottom: 20 }}>
        {/* Email Header */}
        <div style={{ padding: '16px 20px', background: '#121215', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, fontSize: 13, marginBottom: 8 }}>
            <span className="text-mono-meta">FROM:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#ffffff' }}>{challenge.sender}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, fontSize: 13, marginBottom: 8 }}>
            <span className="text-mono-meta">SUBJECT:</span>
            <span style={{ fontWeight: 600, color: '#ffffff' }}>{challenge.subject}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, fontSize: 13 }}>
            <span className="text-mono-meta">DATE:</span>
            <span className="text-mono-meta">{challenge.date || 'Today, 09:42 UTC'}</span>
          </div>
        </div>

        {/* Email Body */}
        <div style={{ padding: '24px 20px', fontSize: 14, color: 'var(--foreground)', lineHeight: 1.6 }}>
          <p style={{ marginBottom: 16, whiteSpace: 'pre-line' }}>{challenge.body}</p>

          {/* Suspect Link inside Email */}
          {challenge.link && (
            <div style={{
              marginTop: 16,
              padding: '10px 14px',
              borderRadius: 6,
              background: '#121215',
              border: '1px solid var(--border)',
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--foreground-muted)',
            }}>
              <span className="text-mono-meta" style={{ marginRight: 8 }}>EMBEDDED TARGET:</span>
              <span style={{ color: '#ffffff', textDecoration: 'underline' }}>{challenge.link}</span>
            </div>
          )}
        </div>

        {/* Post-Answer Diagnostic Feedback */}
        {answered !== null && (
          <div style={{
            padding: '16px 20px',
            background: isCorrect ? 'var(--safe-bg)' : 'var(--danger-bg)',
            borderTop: `1px solid ${isCorrect ? 'var(--safe-border)' : 'var(--danger-border)'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              {isCorrect ? <CheckCircleIcon size={16} color="var(--safe)" /> : <AlertTriangleIcon size={16} color="var(--danger)" />}
              <span style={{ fontWeight: 600, fontSize: 13, color: isCorrect ? 'var(--safe-text)' : 'var(--danger-text)' }}>
                {isCorrect ? 'ACCURATE IDENTIFICATION' : 'MISCLASSIFICATION'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.5, marginBottom: 10 }}>
              {challenge.explanation}
            </p>
            {challenge.indicators?.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span className="text-mono-meta" style={{ alignSelf: 'center', marginRight: 4 }}>INDICATORS:</span>
                {challenge.indicators.map((ind, i) => (
                  <span key={i} className="badge-minimal" style={{ fontSize: 11 }}>
                    {ind}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Decision Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        {answered === null ? (
          <>
            <button
              onClick={() => handleAnswer('safe')}
              className="btn-dark"
              style={{ flex: 1, padding: '12px 20px', fontSize: 14 }}
            >
              <CheckCircleIcon size={16} color="var(--safe)" />
              <span>Mark Benign / Safe</span>
            </button>
            <button
              onClick={() => handleAnswer('phishing')}
              className="btn-dark"
              style={{ flex: 1, padding: '12px 20px', fontSize: 14, borderColor: 'var(--danger-border)' }}
            >
              <AlertTriangleIcon size={16} color="var(--danger)" />
              <span style={{ color: 'var(--danger-text)' }}>Report Phishing Attack</span>
            </button>
          </>
        ) : (
          <button
            onClick={handleNext}
            className="btn-solid-white"
            style={{ width: '100%', padding: '12px 20px' }}
          >
            <span>Proceed to Next Scenario</span>
            <ArrowRightIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// URL DETECTIVE COMPONENT (Minimal Engineered UI)
// ═══════════════════════════════════════════════════════════════════════════
function URLDetective({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const challenge = urlChallenges[currentIdx];
  const isFinished = currentIdx >= urlChallenges.length;

  const handleSelect = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === challenge.correctIndex) {
      setScore(prev => prev + 15);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIdx + 1 >= urlChallenges.length) {
      onComplete({ score, total: urlChallenges.length });
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  if (isFinished) {
    return (
      <div className="card-minimal" style={{ textAlign: 'center', padding: 48, background: '#09090b' }}>
        <div className="text-mono-meta" style={{ marginBottom: 8 }}>MODULE FINISHED</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
          URL Detective Complete
        </h3>
        <p className="text-subtle" style={{ marginBottom: 24 }}>Final Score: {score} XP</p>
        <button
          onClick={() => {
            setCurrentIdx(0);
            setSelectedOption(null);
            setScore(0);
          }}
          className="btn-solid-white"
        >
          Restart Module
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span className="text-mono-meta">
          PUZZLE {currentIdx + 1} OF {urlChallenges.length} • TARGET BRAND: {challenge.targetBrand}
        </span>
        <span className="badge-minimal" style={{ color: '#ffffff', fontWeight: 600 }}>{score} XP</span>
      </div>

      <div className="card-minimal" style={{ padding: 20, background: '#09090b', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 6 }}>
          {challenge.prompt}
        </div>
        <p className="text-subtle" style={{ fontSize: 13, marginBottom: 16 }}>
          Analyze the 4 lookalike candidates below and select the authentic legitimate destination.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {challenge.options.map((opt, i) => {
            let itemBorder = 'var(--border-subtle)';
            let itemBg = '#121215';

            if (selectedOption !== null) {
              if (i === challenge.correctIndex) {
                itemBorder = 'var(--safe-border)';
                itemBg = 'var(--safe-bg)';
              } else if (i === selectedOption) {
                itemBorder = 'var(--danger-border)';
                itemBg = 'var(--danger-bg)';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selectedOption !== null}
                style={{
                  padding: '12px 16px',
                  borderRadius: 6,
                  background: itemBg,
                  border: `1px solid ${itemBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: '#ffffff',
                  cursor: selectedOption !== null ? 'default' : 'pointer',
                  textAlign: 'left',
                }}
                className={selectedOption === null ? 'hover:border-zinc-700' : ''}
              >
                <span>{opt}</span>
                {selectedOption !== null && i === challenge.correctIndex && (
                  <CheckCircleIcon size={16} color="var(--safe)" />
                )}
                {selectedOption !== null && i === selectedOption && i !== challenge.correctIndex && (
                  <AlertTriangleIcon size={16} color="var(--danger)" />
                )}
              </button>
            );
          })}
        </div>

        {selectedOption !== null && (
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-subtle)', fontSize: 13, color: 'var(--foreground-muted)' }}>
            <span className="text-mono-meta" style={{ marginRight: 6 }}>RATIONALE:</span>
            {challenge.explanation}
          </div>
        )}
      </div>

      {selectedOption !== null && (
        <button onClick={handleNext} className="btn-solid-white" style={{ width: '100%', padding: '12px' }}>
          <span>Next Target</span>
          <ArrowRightIcon size={15} />
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN TRAINING ACADEMY PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState('email'); // email | url | badges
  const [totalXP, setTotalXP] = useState(120);

  useEffect(() => {
    const saved = localStorage.getItem('phishguard_total_xp');
    if (saved) setTotalXP(parseInt(saved, 10));
  }, []);

  const handleComplete = (data) => {
    const newXP = totalXP + (data.score || 20);
    setTotalXP(newXP);
    localStorage.setItem('phishguard_total_xp', newXP.toString());
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '36px 24px 80px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="text-mono-meta">TRAINING SUITE</span>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span className="text-mono-meta">TACTICAL SIMULATION</span>
          </div>
          <h1 className="heading-section" style={{ fontSize: 26, marginBottom: 8 }}>
            Phishing Simulation Academy
          </h1>
          <p className="text-subtle" style={{ fontSize: 14 }}>
            Train recognition reflexes through simulated social engineering vectors, typosquats, and inbox bait.
          </p>
        </div>

        {/* Global XP Badge */}
        <div className="card-minimal" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12, background: '#09090b' }}>
          <ShieldIcon size={18} color="#ffffff" />
          <div>
            <div className="text-mono-meta" style={{ fontSize: 10 }}>PROFICIENCY LEVEL</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>{totalXP} TOTAL XP</div>
          </div>
        </div>
      </div>

      {/* Module Selector Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
        {[
          { key: 'email', label: 'Email Triage', Icon: MailIcon },
          { key: 'url', label: 'URL Detective', Icon: SearchIcon },
          { key: 'badges', label: 'Achievements', Icon: ShieldIcon },
        ].map(tab => {
          const Icon = tab.Icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#000000' : 'var(--foreground-muted)',
                border: 'none',
                fontWeight: 500,
                fontSize: 13,
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'email' && <EmailTriage onComplete={handleComplete} />}
      {activeTab === 'url' && <URLDetective onComplete={handleComplete} />}
      {activeTab === 'badges' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {achievements.map((ach, idx) => (
            <div key={idx} className="card-minimal" style={{ padding: 18, background: '#09090b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  background: '#121215',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}>
                  <ShieldIcon size={14} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#ffffff' }}>{ach.name}</div>
                  <div className="text-mono-meta" style={{ fontSize: 11 }}>{ach.requirement}</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--foreground-muted)', lineHeight: 1.4 }}>
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
