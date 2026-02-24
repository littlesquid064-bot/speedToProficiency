import React from 'react';
import GenieAvatar from './common/GenieAvatar';
import Ico from './common/Icons';

const KnowledgeTestScreen = ({ currentQ, onAnswer, onNext, answers, questions }) => {
    const q = questions[currentQ];
    const pct = (currentQ / questions.length) * 100;
    const answered = answers[currentQ];
    const diffColor = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444' };
    const isLast = currentQ >= questions.length - 1;

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px', position: 'relative' }}>
            {/* Card fills almost all available space */}
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, position: 'relative', zIndex: 1, margin: '0 auto', width: '100%', maxWidth: 1000, overflow: 'hidden' }}>
                {/* Progress header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <GenieAvatar size={24} />
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginBottom: 3 }}>
                            <span>Knowledge Validation · {currentQ + 1} of {questions.length}</span>
                            <span style={{ fontWeight: 700, color: diffColor[q.diff], textTransform: 'uppercase', fontSize: 10 }}>{q.diff}</span>
                        </div>
                        <div className="prog-track"><div className="prog-fill" style={{ width: `${pct}%` }} /></div>
                        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                background: 'rgba(59, 91, 219, 0.08)',
                                color: '#3b5bdb',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.05em'
                            }}>
                                SKILL {String(currentQ + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: '#3b5bdb',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em'
                            }}>
                                {q.cat}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centered question + options below */}
                <div key={currentQ} className="anim-fsu" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Question centered */}
                    <div style={{ textAlign: 'center', marginBottom: 28 }}>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a202c', lineHeight: 1.4, maxWidth: 650 }}>{q.q}</h3>
                    </div>

                    {/* 4 option cards in a 2x2 grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 700 }}>
                        {q.opts.map((opt, i) => {
                            let bgColor = '#ffffff';
                            let borderColor = '#e2e8f0';
                            let textColor = '#4a5568';
                            let badgeBg = 'rgba(59, 91, 219, 0.1)';
                            let badgeColor = '#3b5bdb';

                            if (answered) {
                                if (i === q.a) {
                                    bgColor = 'rgba(56, 161, 105, 0.08)';
                                    borderColor = 'rgba(56, 161, 105, 0.4)';
                                    badgeBg = '#10b981';
                                    badgeColor = 'white';
                                } else if (i === answered.sel && !answered.ok) {
                                    bgColor = 'rgba(229, 62, 62, 0.06)';
                                    borderColor = 'rgba(229, 62, 62, 0.4)';
                                    badgeBg = '#ef4444';
                                    badgeColor = 'white';
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => !answered && onAnswer(i)}
                                    disabled={!!answered}
                                    style={{
                                        background: bgColor,
                                        border: `1.5px solid ${borderColor}`,
                                        borderRadius: 14,
                                        padding: '12px 16px',
                                        cursor: answered ? 'default' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 10,
                                        transition: 'all 0.2s',
                                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                                        textAlign: 'left',
                                    }}
                                >
                                    <span style={{
                                        width: 24, height: 24, borderRadius: '50%',
                                        background: badgeBg, color: badgeColor,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                                    }}>
                                        {['A', 'B', 'C', 'D'][i]}
                                    </span>
                                    <span style={{ fontSize: 13, lineHeight: 1.45, color: textColor }}>{opt}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback + Explanation + Next button */}
                    {answered && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, width: '100%', maxWidth: 700 }}>
                            <div className="anim-pop" style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: 12,
                                background: answered.ok ? 'rgba(56, 161, 105, 0.08)' : 'rgba(229, 62, 62, 0.06)',
                                border: `1px solid ${answered.ok ? 'rgba(56, 161, 105, 0.3)' : 'rgba(229, 62, 62, 0.3)'}`,
                                fontSize: 12.5,
                                color: answered.ok ? '#166534' : '#991b1b',
                                fontWeight: 500,
                                lineHeight: 1.5,
                            }}>
                                {answered.ok
                                    ? '✅ Correct! Great job — you clearly know this area well.'
                                    : `❌ Not quite. The correct answer is "${q.opts[q.a]}". Review this topic in your learning journey.`
                                }
                            </div>
                            <button
                                className="btn btn-p anim-pop"
                                style={{ padding: '10px 24px', fontSize: 13, flexShrink: 0, animationDelay: '0.1s' }}
                                onClick={onNext}
                            >
                                {isLast ? 'View Results' : 'Next Question'} <Ico name="arrow" size={13} color="white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeTestScreen;
