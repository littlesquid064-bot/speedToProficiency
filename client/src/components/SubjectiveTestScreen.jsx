import React, { useState, useEffect } from 'react';
import GenieAvatar from './common/GenieAvatar';
import Ico from './common/Icons';
import LoadingScreen from './LoadingScreen';

const SubjectiveTestScreen = ({ user, onComplete }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(true);
    const [evaluating, setEvaluating] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        fetch(`/api/questions/subjective/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch subjective questions:', err);
                setLoading(false);
            });
    }, [user.email]);

    const handleEvaluate = async () => {
        if (!answer.trim()) return;
        setEvaluating(true);
        try {
            const res = await fetch('/api/evaluate-subjective', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    questionId: questions[currentIdx].id,
                    answer: answer
                })
            });
            const data = await res.json();
            setFeedback(data);
            if (onScoreUpdate) onScoreUpdate(questions[currentIdx].id, data.score);
        }
        finally {
            setEvaluating(false);
        }
    };

    const next = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(c => c + 1);
            setAnswer('');
            setFeedback(null);
        } else {
            onComplete();
        }
    };

    if (loading) return <LoadingScreen />;
    if (!questions.length) return <div style={{ padding: 40, textAlign: 'center' }}>No subjective questions found for this profile.</div>;

    const q = questions[currentIdx];
    const pct = ((currentIdx) / questions.length) * 100;

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px', position: 'relative' }}>
            <div className="card anim-fsu" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 24, position: 'relative', zIndex: 1, margin: '0 auto', width: '100%', maxWidth: 1000, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <GenieAvatar size={32} />
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#718096', marginBottom: 4 }}>
                            <span style={{ fontWeight: 600 }}>Subjective Scenario {currentIdx + 1} of {questions.length}</span>
                            <span style={{ color: '#3b5bdb', fontWeight: 700, fontSize: 10 }}>AI ANALYSIS READY</span>
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
                                SKILL {String(currentIdx + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: '#3b5bdb',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em'
                            }}>
                                {q.scenario}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto', paddingRight: 4 }}>
                    {/* Scenario */}
                    <div className="anim-fsu" style={{ background: 'rgba(59, 91, 219, 0.05)', border: '1px solid #e2e8f0', borderRadius: 16, padding: '20px 24px' }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#3b5bdb', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Scenario: {q.scenario}</div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a202c', marginBottom: 8, lineHeight: 1.3 }}>{q.context}</h2>
                        <p style={{ fontSize: 14, color: '#4a5568', lineHeight: 1.6 }}>{q.q}</p>
                    </div>

                    {/* Answer Input */}
                    {!feedback ? (
                        <div className="anim-pop" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#718096', marginBottom: 8 }}>Your Response:</label>
                            <textarea
                                className="inp"
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                placeholder="Type your end-to-end approach here..."
                                style={{ flex: 1, minHeight: 180, padding: 16, fontSize: 14, lineHeight: 1.6, resize: 'none' }}
                                disabled={evaluating}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                                <button
                                    className="btn btn-p"
                                    onClick={handleEvaluate}
                                    disabled={evaluating || !answer.trim()}
                                    style={{ padding: '12px 32px' }}
                                >
                                    {evaluating ? 'Genie is Analysing...' : 'Analyse Response'} <Ico name="sparkles" size={14} color="white" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="anim-pop" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Score Card */}
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                    <div style={{ fontSize: 24, fontWeight: 800 }} className="text-grad">{feedback.score}%</div>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: '#718096', textTransform: 'uppercase', lineHeight: 1.1 }}>Subjective<br />Proficiency</div>
                                </div>
                                <div style={{ flex: 1, minWidth: 200, background: 'rgba(56, 161, 105, 0.05)', border: '1px solid rgba(56, 161, 105, 0.2)', borderRadius: 16, padding: '12px 16px', fontSize: 13, color: '#2f855a', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ flexShrink: 0 }}><Ico name="check" size={18} color="#38a169" /></div>
                                    <span style={{ fontWeight: 500 }}>{feedback.insight}</span>
                                </div>
                            </div>

                            {/* Analysis */}
                            <div style={{ flex: 1, background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20, overflowY: 'auto' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: '#1a202c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Genie Analysis & Feedback</div>
                                <p style={{ fontSize: 13.5, color: '#4a5568', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{feedback.analysis}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                                <button className="btn btn-p" onClick={next} style={{ padding: '12px 32px' }}>
                                    {currentIdx === questions.length - 1 ? 'Go to Global Validation' : 'Next Scenario'} <Ico name="arrow" size={14} color="white" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubjectiveTestScreen;
