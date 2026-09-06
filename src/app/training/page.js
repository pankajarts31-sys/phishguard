'use client';
import { useState, useEffect, useCallback } from 'react';
import { emailChallenges, urlChallenges, inspectorChallenges } from '@/lib/challenges';

// ═══════════════════════════════════════════════════════════════════════════
// EMAIL TRIAGE COMPONENT
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
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Challenge Complete!</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Score: {score} points</p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          Email {currentIdx + 1} of {emailChallenges.length}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {streak >= 3 && <span className="badge badge-warning">🔥 {streak} Streak!</span>}
          <span className="badge badge-info">⭐ {score} pts</span>
        </div>
      </div>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-bar-fill" style={{
          width: `${((currentIdx) / emailChallenges.length) * 100}%`,
          background: 'var(--gradient-primary)',
        }} />
      </div>

      {/* Email Preview */}
      <div className="glass" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        {/* Email Header */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>FROM</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#fff' }}>
                {challenge.sender}
              </div>
            </div>
            <span className={`badge badge-${challenge.difficulty === 'easy' ? 'safe' : challenge.difficulty === 'medium' ? 'warning' : 'danger'}`}>
              {challenge.difficulty}
            </span>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>SUBJECT</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
              {challenge.subject}
            </div>
          </div>
        </div>
        {/* Email Body */}
        <div style={{
          padding: 24,
          fontSize: 14,
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.75)',
          whiteSpace: 'pre-line',
          fontFamily: 'var(--font-sans)',
        }}>
          {challenge.body}
        </div>
      </div>

      {/* Answer Buttons */}
      {!answered ? (
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button
            onClick={() => handleAnswer('safe')}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
              flex: 1, maxWidth: 200, justifyContent: 'center',
            }}
          >
            ✅ Safe Email
          </button>
          <button
            onClick={() => handleAnswer('phishing')}
            className="btn-danger"
            style={{ flex: 1, maxWidth: 200, display: 'flex', justifyContent: 'center' }}
          >
            🎣 Phishing
          </button>
        </div>
      ) : (
        <div>
          {/* Result */}
          <div className="glass" style={{
            padding: 24,
            borderColor: ((answered === 'phishing') === challenge.isPhishing) ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>
                {((answered === 'phishing') === challenge.isPhishing) ? '✅' : '❌'}
              </span>
              <div>
                <div style={{
                  fontSize: 18, fontWeight: 700,
                  color: ((answered === 'phishing') === challenge.isPhishing) ? 'var(--safe)' : 'var(--danger)',
                }}>
                  {((answered === 'phishing') === challenge.isPhishing) ? 'Correct!' : 'Incorrect'}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  This email is {challenge.isPhishing ? 'a PHISHING attempt' : 'LEGITIMATE'}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>
              {challenge.explanation}
            </p>
            {challenge.indicators.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--danger)', marginBottom: 8 }}>
                  🔴 Phishing Indicators:
                </div>
                {challenge.indicators.map((ind, i) => (
                  <div key={i} style={{
                    padding: '6px 12px', fontSize: 12, color: 'rgba(255,255,255,0.6)',
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
                  }}>
                    <span style={{ color: 'var(--danger)' }}>•</span> {ind}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {currentIdx + 1 >= emailChallenges.length ? '🏁 Finish' : '➡️ Next Email'}
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// URL DETECTIVE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function URLDetective({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const challenge = urlChallenges[currentIdx];
  const isFinished = currentIdx >= urlChallenges.length;

  const handleSelect = (optIdx) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    if (challenge.options[optIdx].isReal) {
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
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
        <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>All Done!</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Score: {score} points</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          Question {currentIdx + 1} of {urlChallenges.length}
        </span>
        <span className="badge badge-info">⭐ {score} pts</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-bar-fill" style={{
          width: `${((currentIdx) / urlChallenges.length) * 100}%`,
          background: 'var(--gradient-primary)',
        }} />
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#fff' }}>
        {challenge.question}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {challenge.options.map((opt, i) => {
          let borderColor = 'rgba(255,255,255,0.08)';
          let bg = 'rgba(255,255,255,0.03)';
          let icon = '';

          if (selectedOption !== null) {
            if (opt.isReal) {
              borderColor = 'rgba(16,185,129,0.4)';
              bg = 'rgba(16,185,129,0.08)';
              icon = '✅';
            } else if (i === selectedOption && !opt.isReal) {
              borderColor = 'rgba(239,68,68,0.4)';
              bg = 'rgba(239,68,68,0.08)';
              icon = '❌';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: '14px 20px',
                borderRadius: 12,
                background: bg,
                border: `1px solid ${borderColor}`,
                color: '#fff',
                fontSize: 13,
                fontFamily: 'var(--font-mono)',
                textAlign: 'left',
                cursor: selectedOption !== null ? 'default' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                wordBreak: 'break-all',
              }}
              onMouseEnter={e => { if (selectedOption === null) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; }}
              onMouseLeave={e => { if (selectedOption === null) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <span style={{
                minWidth: 28, height: 28, borderRadius: 8,
                background: selectedOption !== null && (opt.isReal || i === selectedOption)
                  ? (opt.isReal ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)')
                  : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
              }}>
                {icon || String.fromCharCode(65 + i)}
              </span>
              {opt.url}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div>
          <div className="glass" style={{
            padding: 20, marginBottom: 20,
            borderColor: 'rgba(99,102,241,0.2)',
          }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              💡 {challenge.explanation}
            </div>
          </div>
          <button onClick={handleNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {currentIdx + 1 >= urlChallenges.length ? '🏁 Finish' : '➡️ Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// WEBSITE INSPECTOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function WebsiteInspector({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [foundIndicators, setFoundIndicators] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const challenge = inspectorChallenges[currentIdx];

  useEffect(() => {
    if (started && !finished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && started) {
      setFinished(true);
    }
  }, [timeLeft, started, finished]);

  const startChallenge = () => {
    setStarted(true);
    setTimeLeft(challenge.timeLimit);
    setFoundIndicators([]);
    setFinished(false);
  };

  const toggleIndicator = (indId) => {
    if (finished) return;
    if (foundIndicators.includes(indId)) {
      setFoundIndicators(foundIndicators.filter(id => id !== indId));
    } else {
      setFoundIndicators([...foundIndicators, indId]);
    }
  };

  const points = challenge.indicators
    .filter(ind => foundIndicators.includes(ind.id))
    .reduce((sum, ind) => sum + ind.points, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span className={`badge badge-${challenge.difficulty === 'easy' ? 'safe' : challenge.difficulty === 'medium' ? 'warning' : 'danger'}`}>
          {challenge.difficulty}
        </span>
        {started && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="badge badge-info">⭐ {points}/{challenge.maxPoints} pts</span>
            <span style={{
              fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-mono)',
              color: timeLeft < 30 ? 'var(--danger)' : 'var(--safe)',
            }}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#fff' }}>
        {challenge.title}
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        {challenge.description}
      </p>

      {/* Simulated website */}
      <div className="glass" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{
          padding: '10px 14px', background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{
            flex: 1, padding: '5px 12px', borderRadius: 6,
            background: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-mono)',
            fontSize: 11, color: 'var(--danger)',
          }}>
            ⚠️ {challenge.url}
          </div>
        </div>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🌐</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>
            Simulated phishing page — find the indicators below
          </div>
        </div>
      </div>

      {!started ? (
        <button onClick={startChallenge} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          ⏱️ Start Challenge ({challenge.timeLimit}s)
        </button>
      ) : (
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'rgba(255,255,255,0.5)' }}>
            Click the indicators you can identify:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
            {challenge.indicators.map((ind) => {
              const isFound = foundIndicators.includes(ind.id);
              return (
                <button
                  key={ind.id}
                  onClick={() => toggleIndicator(ind.id)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: isFound ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isFound ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    color: '#fff',
                    textAlign: 'left',
                    cursor: finished ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <span style={{
                    minWidth: 24, height: 24, borderRadius: 6,
                    background: isFound ? 'var(--safe)' : 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: isFound ? '#fff' : 'transparent',
                  }}>✓</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{ind.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                      {ind.location} • {ind.points}pts
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {finished && (
            <div style={{
              marginTop: 24, padding: 24, borderRadius: 12,
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>
                {points >= challenge.maxPoints * 0.8 ? '🏆' : points >= challenge.maxPoints * 0.5 ? '👍' : '💪'}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                {points} / {challenge.maxPoints} Points
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                You found {foundIndicators.length} of {challenge.indicators.length} indicators
              </div>
              {currentIdx + 1 < inspectorChallenges.length && (
                <button
                  onClick={() => {
                    setCurrentIdx(prev => prev + 1);
                    setStarted(false);
                    setFinished(false);
                    setFoundIndicators([]);
                  }}
                  className="btn-primary"
                  style={{ marginTop: 16, justifyContent: 'center' }}
                >
                  ➡️ Next Challenge
                </button>
              )}
            </div>
          )}

          {!finished && (
            <button
              onClick={() => setFinished(true)}
              className="btn-secondary"
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
            >
              ✅ Submit ({foundIndicators.length} found)
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN TRAINING PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function TrainingPage() {
  const [activeModule, setActiveModule] = useState(null);
  const [completedModules, setCompletedModules] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('phishguard_training_progress');
    if (saved) setCompletedModules(JSON.parse(saved));
  }, []);

  const handleModuleComplete = (moduleName, result) => {
    const newCompleted = { ...completedModules, [moduleName]: result };
    setCompletedModules(newCompleted);
    localStorage.setItem('phishguard_training_progress', JSON.stringify(newCompleted));
  };

  const modules = [
    {
      id: 'email',
      icon: '📧',
      title: 'Email Triage',
      description: 'Sort incoming emails as Safe or Phishing. Learn to spot the red flags.',
      count: `${emailChallenges.length} scenarios`,
      difficulty: 'Mixed',
      color: '#6366f1',
    },
    {
      id: 'url',
      icon: '🔗',
      title: 'URL Detective',
      description: 'Identify the real URL from a set of look-alikes. Test your eye for detail.',
      count: `${urlChallenges.length} questions`,
      difficulty: 'Progressive',
      color: '#06d6a0',
    },
    {
      id: 'inspector',
      icon: '🕵️',
      title: 'Website Inspector',
      description: 'Find all phishing indicators on simulated websites. Race against the clock.',
      count: `${inspectorChallenges.length} pages`,
      difficulty: 'Timed',
      color: '#f59e0b',
    },
  ];

  if (activeModule) {
    return (
      <div className="page-container" style={{ maxWidth: 800 }}>
        <button
          onClick={() => setActiveModule(null)}
          style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
            fontSize: 14, cursor: 'pointer', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          ← Back to Modules
        </button>

        <div className="glass" style={{ padding: 32 }}>
          {activeModule === 'email' && (
            <EmailTriage onComplete={(r) => { handleModuleComplete('email', r); setActiveModule(null); }} />
          )}
          {activeModule === 'url' && (
            <URLDetective onComplete={(r) => { handleModuleComplete('url', r); setActiveModule(null); }} />
          )}
          {activeModule === 'inspector' && (
            <WebsiteInspector onComplete={(r) => { handleModuleComplete('inspector', r); setActiveModule(null); }} />
          )}
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
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
          marginBottom: 20, fontSize: 13, fontWeight: 600, color: '#fbbf24',
        }}>
          🎮 Gamified Learning
        </div>
        <h1 className="animate-fadeInUp stagger-1" style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12,
        }}>
          Training <span className="gradient-text">Academy</span>
        </h1>
        <p className="animate-fadeInUp stagger-2" style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 550, margin: '0 auto',
        }}>
          Sharpen your phishing detection skills with interactive challenges, earn points, and build your Security IQ.
        </p>
      </div>

      {/* Module Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        marginBottom: 48,
      }}>
        {modules.map((mod, i) => {
          const completed = completedModules[mod.id];
          return (
            <div
              key={mod.id}
              className="glass glass-hover"
              style={{
                padding: 32,
                cursor: 'pointer',
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => setActiveModule(mod.id)}
            >
              {completed && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  padding: '4px 12px', borderRadius: 9999,
                  background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                  color: 'var(--safe)', fontSize: 11, fontWeight: 700,
                }}>✅ Completed</div>
              )}
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: `${mod.color}15`, border: `1px solid ${mod.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, marginBottom: 20,
              }}>
                {mod.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                {mod.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>
                {mod.description}
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-info">{mod.count}</span>
                <span className="badge badge-cyan">{mod.difficulty}</span>
              </div>
              <div style={{
                marginTop: 20, fontSize: 13, fontWeight: 600, color: mod.color,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {completed ? '🔄 Play Again' : '▶️ Start Challenge'} →
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Section */}
      <div className="glass" style={{ padding: 32 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          🏆 Achievements
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
        }}>
          {[
            { icon: '🔍', name: 'First Scan', unlocked: true },
            { icon: '📧', name: 'Email Detective', unlocked: !!completedModules.email },
            { icon: '🔗', name: 'URL Master', unlocked: !!completedModules.url },
            { icon: '🕵️', name: 'Sharp Eye', unlocked: !!completedModules.inspector },
            { icon: '🔥', name: 'Streak Master', unlocked: false },
            { icon: '💯', name: 'Perfect Score', unlocked: false },
            { icon: '📚', name: 'Knowledge Seeker', unlocked: false },
            { icon: '🏆', name: 'Certified', unlocked: Object.keys(completedModules).length >= 3 },
          ].map((ach) => (
            <div key={ach.name} style={{
              padding: '16px 14px',
              borderRadius: 12,
              background: ach.unlocked ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${ach.unlocked ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)'}`,
              textAlign: 'center',
              opacity: ach.unlocked ? 1 : 0.4,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8, filter: ach.unlocked ? 'none' : 'grayscale(1)' }}>
                {ach.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{ach.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
