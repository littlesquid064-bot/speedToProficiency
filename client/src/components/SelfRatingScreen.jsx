import React from 'react';
import GenieAvatar from './common/GenieAvatar';
import GenieBubble from './common/GenieBubble';

const SelfRatingScreen = ({ ratings, onRate, currentQ, questions, onBack, onNext }) => {
    const q = questions[currentQ];
    const pct = (currentQ / questions.length) * 100;
    const options = [
        { r: 1, label: 'Novice', desc: 'Little to no exposure', emoji: '🌱' },
        { r: 2, label: 'Beginner', desc: 'Basic understanding', emoji: '📖' },
        { r: 3, label: 'Competent', desc: 'Regular use, some guidance', emoji: '💪' },
        { r: 4, label: 'Proficient', desc: 'Independent & effective', emoji: '⭐' },
        { r: 5, label: 'Expert', desc: 'Can teach & lead others', emoji: '🏆' },
    ];

    const isFirst = currentQ === 0;
    const isLast = currentQ === questions.length - 1;
    const hasRating = ratings[q.id] !== undefined;

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px', position: 'relative' }}>
            {/* Card fills almost all available space */}
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, position: 'relative', zIndex: 1, margin: '0 auto', width: '100%', maxWidth: 1000, overflow: 'hidden' }}>
                {/* Progress header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <GenieAvatar size={24} />
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginBottom: 3 }}>
                            <span>Self-Assessment · Question {currentQ + 1} of {questions.length}</span>
                            <span style={{ fontWeight: 600, color: '#3b5bdb' }}>{Math.round(pct)}%</span>
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

                {/* Centered question area */}
                <div key={currentQ} className="anim-fsu" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <span style={{ fontSize: 28 }}>{q.icon}</span>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a202c', lineHeight: 1.3, maxWidth: 600 }}>{q.q}</h3>
                        <p style={{ fontSize: 12, color: '#a0aec0', marginTop: 4 }}>{q.hint}</p>
                    </div>

                    {/* 5 option cards in a horizontal row */}
                    <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 800 }}>
                        {options.map(o => {
                            const selected = ratings[q.id] === o.r;
                            return (
                                <button
                                    key={o.r}
                                    onClick={() => onRate(o.r)}
                                    style={{
                                        flex: 1,
                                        background: selected ? 'linear-gradient(135deg,#3b5bdb,#364fc7)' : '#ffffff',
                                        border: selected ? '2px solid #3b5bdb' : '1.5px solid #e2e8f0',
                                        borderRadius: 14,
                                        padding: '14px 8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 6,
                                        transition: 'all 0.2s',
                                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                                    }}
                                >
                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 16,
                                        background: selected ? 'rgba(255,255,255,0.2)' : 'rgba(59, 91, 219, 0.08)',
                                    }}>
                                        {o.emoji}
                                    </div>
                                    <div style={{
                                        fontWeight: 700, fontSize: 13,
                                        color: selected ? 'white' : '#1a202c',
                                    }}>{o.label}</div>
                                    <div style={{
                                        fontSize: 10, lineHeight: 1.3, textAlign: 'center',
                                        color: selected ? 'rgba(255,255,255,0.8)' : '#a0aec0',
                                    }}>{o.desc}</div>
                                    <div style={{
                                        width: 20, height: 20, borderRadius: '50%',
                                        border: selected ? '2px solid white' : '2px solid #e2e8f0',
                                        background: selected ? 'white' : 'transparent',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginTop: 2,
                                    }}>
                                        {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b5bdb' }} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Back / Next navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, gap: 12 }}>
                    {/* Back button */}
                    <button
                        onClick={onBack}
                        disabled={isFirst}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '10px 22px',
                            borderRadius: 10,
                            border: '1.5px solid #e2e8f0',
                            background: isFirst ? '#f7fafc' : '#ffffff',
                            color: isFirst ? '#a0aec0' : '#3b5bdb',
                            fontWeight: 600, fontSize: 14,
                            cursor: isFirst ? 'not-allowed' : 'pointer',
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            transition: 'all 0.2s',
                        }}
                    >
                        ← Back
                    </button>

                    {/* Step dots */}
                    <div style={{ display: 'flex', gap: 6 }}>
                        {questions.map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: i === currentQ ? 18 : 8,
                                    height: 8,
                                    borderRadius: 4,
                                    background: i === currentQ
                                        ? '#3b82f6'
                                        : ratings[questions[i].id] !== undefined
                                            ? 'rgba(59, 130, 246, 0.4)'
                                            : '#e2e8f0',
                                    transition: 'all 0.2s',
                                }}
                            />
                        ))}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={onNext}
                        disabled={!hasRating}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '10px 22px',
                            borderRadius: 10,
                            border: 'none',
                            background: hasRating
                                ? 'linear-gradient(135deg,#3b5bdb,#364fc7)'
                                : '#edf2f7',
                            color: hasRating ? 'white' : '#a0aec0',
                            fontWeight: 600, fontSize: 14,
                            cursor: hasRating ? 'pointer' : 'not-allowed',
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            transition: 'all 0.2s',
                        }}
                    >
                        {isLast ? 'Finish ✓' : 'Next →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelfRatingScreen;