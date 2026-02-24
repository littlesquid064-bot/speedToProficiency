
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleSidebar from './ModuleSidebar';

const GenieAvatarSmall = () => (
    <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0, boxShadow: '0 2px 8px rgba(37,99,235,0.3)'
    }}>🧞</div>
);

const QUESTIONS = [
    {
        id: 'llm1',
        question: 'What is the PRIMARY risk when a RAG system retrieves too much context for a small model window?',
        options: ['Accuracy increases linearly', 'Context dilution and loss of instruction following', 'Model temperature automatically rises', 'Vector database crashes'],
        correct: 1,
        explanation: 'Correct! "Lost in the middle" and context dilution occur when irrelevant info overwhelms the model.',
        wrongExplanation: 'Large context can leading to "context dilution," making the model lose track of core instructions.'
    },
    {
        id: 'llm2',
        question: 'Which chunking strategy is best for legal documents with nested clauses?',
        options: ['Fixed-size character chunking', 'Heuristic-based recursive character splitting', 'Single-word tokenization', 'Random sentence selection'],
        correct: 1,
        explanation: 'Correct! Recursive splitting preserves semantic structure by respecting paragraph and clause boundaries.',
        wrongExplanation: 'Recursive character splitting is ideal for structured text like legal documents.'
    },
    {
        id: 'llm3',
        question: 'A user reports that the AI is "making up" facts despite having retrieval documents. What is the most likely cause?',
        options: ['Retrieval k-value is too low', 'Presence of grounding instructions is weak or conflicting', 'Vector database is not using HNSW', 'The model is too fast'],
        correct: 1,
        explanation: 'Correct! Explicit grounding instructions are required to force the model to rely only on the retrieved context.',
        wrongExplanation: 'Hallucination in RAG is often due to weak grounding instructions in the prompt.'
    },
    {
        id: 'llm4',
        question: 'How do you balance latency vs accuracy in a production AI system?',
        options: ['Always use the largest model available', 'Implement caching and evaluate smaller models for simpler tasks', 'Increase temperature for faster speed', 'Reduce token limits to 10'],
        correct: 1,
        explanation: 'Correct! Caching and routing simpler tasks to smaller models is the standard for high-performance AI apps.',
        wrongExplanation: 'Caching and task-based model routing are key strategies for balancing speed and cost.'
    },
    {
        id: 'llm5',
        question: 'What is the main benefit of semantic ranking after initial vector retrieval?',
        options: ['It makes retrieval faster', 'It improves contextual relevance by re-ordering the top results', 'It changes the embedding dimension', 'It reduces the cost of tokens'],
        correct: 1,
        explanation: 'Correct! Cross-encoders or rankers help ensure the most relevant chunks are at the top for the model.',
        wrongExplanation: 'Semantic rankers improve precision by ensuring the best results are prioritized in the context.'
    }
];

const INTRO_SEQUENCE = [
    'Welcome to the **LLM Foundations & Context** module! 🧠 I\'m your Learning Genie, and I\'ll be your guide through the architecture of AI cognition.',
    'As a Context Engineer, you design the bridges between vast data and model intelligence.',
    'Let\'s explore the mechanics of tokens, retrieval, and grounding to build high-precision systems. Ready? 🚀'
];

const TypingBubble = () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <GenieAvatarSmall />
        <div style={{
            background: '#ffffff', border: '1px solid #e2e8f0',
            borderRadius: '18px 18px 18px 4px', padding: '14px 18px',
            display: 'flex', gap: 5, alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
            {[0, 1, 2].map(i => (
                <div key={i} style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#3b82f6',
                    animation: 'typingBounce 1.2s infinite ease-in-out',
                    animationDelay: `${i * 0.18}s`
                }} />
            ))}
        </div>
        <style>{`
            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-7px); opacity: 1; }
            }
        `}</style>
    </div>
);

const renderBold = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1
            ? <strong key={i} style={{ color: '#3b5bdb' }}>{part}</strong>
            : <span key={i}>{part}</span>
    );
};

const LLMFoundationsChat = ({ results = {}, careerPath = [], modules = [], user = {} }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [phase, setPhase] = useState('intro');
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [score, setScore] = useState(0);
    const chatEnd = useRef(null);

    useEffect(() => {
        chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        let cumulativeDelay = 0;
        const timers = [];

        INTRO_SEQUENCE.forEach((text, idx) => {
            const typingDelay = cumulativeDelay;
            const msgDelay = cumulativeDelay + 900;
            cumulativeDelay += 1600;

            timers.push(setTimeout(() => setIsTyping(true), typingDelay));
            timers.push(setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { type: 'genie', text }]);
            }, msgDelay));
        });

        timers.push(setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, buildQuestionMsg(0)]);
                setPhase('question');
            }, 900);
        }, cumulativeDelay + 400));

        return () => timers.forEach(clearTimeout);
    }, []);

    const buildQuestionMsg = (idx) => ({
        type: 'question',
        qIdx: idx,
        text: QUESTIONS[idx].question,
        options: QUESTIONS[idx].options
    });

    const handleAnswer = (optIdx) => {
        if (phase !== 'question' || answered) return;

        const q = QUESTIONS[currentQIdx];
        const correct = optIdx === q.correct;

        setSelectedOpt(optIdx);
        setAnswered(true);
        if (correct) setScore(s => s + 1);

        setMessages(prev => [...prev, { type: 'user', text: q.options[optIdx] }]);

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                type: 'genie',
                text: correct ? q.explanation : q.wrongExplanation,
                result: correct ? 'correct' : 'wrong'
            }]);

            const nextIdx = currentQIdx + 1;
            if (nextIdx < QUESTIONS.length) {
                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, buildQuestionMsg(nextIdx)]);
                        setCurrentQIdx(nextIdx);
                        setAnswered(false);
                        setSelectedOpt(null);
                        setPhase('question');
                    }, 900);
                }, 1600);
            } else {
                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        setIsTyping(false);
                        const finalScore = correct ? score + 1 : score;
                        const pct = Math.round((finalScore / QUESTIONS.length) * 100);
                        const msg = pct >= 80
                            ? `🎉 Outstanding! You've mastered the foundational physics of LLM context. You're ready for the systems track!`
                            : `Good effort! The world of AI systems is complex. Review the mechanics of retrieval and grounding to sharpen your edge!`;
                        setMessages(prev => [...prev, { type: 'genie', text: msg }]);
                        setPhase('complete');
                    }, 900);
                }, 1600);
            }
        }, 1100);
    };

    const progressPct = Math.round(((currentQIdx + (phase === 'complete' ? 1 : 0)) / QUESTIONS.length) * 100);

    return (
        <div style={{
            height: '100%', display: 'flex', flexDirection: 'row',
            background: '#f0f4f8', fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
            <ModuleSidebar results={results} careerPath={careerPath} modules={modules} user={user} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{
                    background: '#ffffff', borderBottom: '1px solid #e2e8f0',
                    padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 14,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', flexShrink: 0
                }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: '#ffffff', border: '1px solid #e2e8f0',
                            borderRadius: 10, padding: '7px 14px', fontSize: 13,
                            color: '#3b5bdb', fontWeight: 600, cursor: 'pointer',
                            fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5,
                            flexShrink: 0
                        }}
                    >
                        ← Back
                    </button>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 15 }}>🧠</span>
                            <span style={{ fontWeight: 700, fontSize: 14, color: '#1a202c' }}>LLM Foundations & Context</span>
                            <span style={{
                                background: 'rgba(59,91,219,0.08)', border: '1px solid rgba(59,91,219,0.15)',
                                borderRadius: 6, padding: '2px 8px',
                                fontSize: 10, color: '#3b5bdb', fontWeight: 700, letterSpacing: 0.4
                            }}>FOUNDATIONAL</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flex: 1, height: 5, background: '#e2e8f0', borderRadius: 3, maxWidth: 220 }}>
                                <div style={{
                                    height: '100%', borderRadius: 3,
                                    background: 'linear-gradient(90deg, #3b5bdb, #4c6ef5)',
                                    width: `${progressPct}%`, transition: 'width 0.6s ease'
                                }} />
                            </div>
                            <span style={{ fontSize: 11, color: '#718096', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                {phase === 'complete' ? '5' : currentQIdx}/5 questions
                            </span>
                        </div>
                    </div>

                    <div style={{
                        textAlign: 'center', background: 'rgba(59,91,219,0.05)',
                        border: '1px solid rgba(59,91,219,0.1)', borderRadius: 12,
                        padding: '6px 14px', flexShrink: 0
                    }}>

                    </div>
                </div>

                <div style={{
                    flex: 1, overflowY: 'auto', padding: '20px 70px',
                    display: 'flex', flexDirection: 'column', gap: 14
                }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {messages.map((msg, i) => {
                            if (msg.type === 'genie') {
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                        <GenieAvatarSmall />
                                        <div style={{
                                            background: '#ffffff', border: '1px solid #e2e8f0',
                                            borderRadius: '18px 18px 18px 4px',
                                            padding: '13px 16px', maxWidth: 500,
                                            fontSize: 13.5, color: '#4a5568', lineHeight: 1.65,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                                        }}>
                                            {renderBold(msg.text)}
                                            {msg.result === 'correct' && (
                                                <div style={{
                                                    marginTop: 9, padding: '5px 11px',
                                                    background: 'rgba(56,161,105,0.08)', borderRadius: 8,
                                                    fontSize: 11.5, color: '#276749', fontWeight: 700,
                                                    display: 'inline-block', border: '1px solid rgba(56,161,105,0.15)'
                                                }}>✅ Correct!</div>
                                            )}
                                            {msg.result === 'wrong' && (
                                                <div style={{
                                                    marginTop: 9, padding: '5px 11px',
                                                    background: 'rgba(214,158,46,0.08)', borderRadius: 8,
                                                    fontSize: 11.5, color: '#975a16', fontWeight: 700,
                                                    display: 'inline-block', border: '1px solid rgba(214,158,46,0.15)'
                                                }}>💡 Learning moment!</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            if (msg.type === 'user') {
                                return (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div style={{
                                            background: 'linear-gradient(135deg, #3b5bdb, #364fc7)',
                                            borderRadius: '18px 18px 4px 18px',
                                            padding: '11px 16px', maxWidth: 420,
                                            fontSize: 13.5, color: 'white', lineHeight: 1.5
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                );
                            }
                            if (msg.type === 'question') {
                                const isActive = msg.qIdx === currentQIdx && !answered && phase === 'question';
                                const isPast = msg.qIdx < currentQIdx || (msg.qIdx === currentQIdx && answered);
                                const q = QUESTIONS[msg.qIdx];
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                        <GenieAvatarSmall />
                                        <div style={{ flex: 1, maxWidth: 580 }}>
                                            <div style={{
                                                background: 'rgba(59,91,219,0.04)',
                                                border: '1px solid rgba(59,91,219,0.15)',
                                                borderRadius: '18px 18px 18px 4px',
                                                padding: '14px 17px', marginBottom: 10
                                            }}>
                                                <div style={{
                                                    fontSize: 10.5, color: '#3b5bdb', fontWeight: 700,
                                                    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6
                                                }}>
                                                    Question {msg.qIdx + 1} of {QUESTIONS.length}
                                                </div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a202c', lineHeight: 1.55 }}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                                {msg.options.map((opt, oi) => {
                                                    let bg = '#ffffff';
                                                    let border = '1.5px solid #e2e8f0';
                                                    let color = '#4a5568';
                                                    let cursor = isActive ? 'pointer' : 'default';
                                                    let icon = null;
                                                    if (isPast || (msg.qIdx === currentQIdx && answered)) {
                                                        if (oi === q.correct) {
                                                            bg = 'rgba(16,185,129,0.08)'; border = '1.5px solid #10b981'; color = '#155724';
                                                            icon = '✓';
                                                        } else if (oi === selectedOpt && msg.qIdx === currentQIdx && oi !== q.correct) {
                                                            bg = 'rgba(229,62,62,0.08)'; border = '1.5px solid #e53e3e'; color = '#721c24';
                                                            icon = '✗';
                                                        } else {
                                                            bg = '#f8fafc'; color = '#94a3b8'; border = '1.5px solid #e2e8f0';
                                                        }
                                                    }
                                                    return (
                                                        <button
                                                            key={oi}
                                                            onClick={() => isActive && handleAnswer(oi)}
                                                            style={{
                                                                background: bg, border, borderRadius: 12,
                                                                padding: '11px 15px', textAlign: 'left',
                                                                fontSize: 13, color, cursor,
                                                                fontFamily: 'inherit', fontWeight: 500,
                                                                lineHeight: 1.45, transition: 'all 0.15s',
                                                                display: 'flex', alignItems: 'center', gap: 10,
                                                                width: '100%'
                                                            }}
                                                            onMouseEnter={e => {
                                                                if (isActive) {
                                                                    e.currentTarget.style.borderColor = '#3b5bdb';
                                                                    e.currentTarget.style.background = 'rgba(59,91,219,0.04)';
                                                                }
                                                            }}
                                                            onMouseLeave={e => {
                                                                if (isActive) {
                                                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                                                    e.currentTarget.style.background = '#ffffff';
                                                                }
                                                            }}
                                                        >
                                                            <span style={{
                                                                width: 24, height: 24, borderRadius: '50%',
                                                                background: 'rgba(59,91,219,0.1)',
                                                                display: 'flex', alignItems: 'center',
                                                                justifyContent: 'center', fontSize: 11,
                                                                fontWeight: 700, color: '#3b5bdb', flexShrink: 0
                                                            }}>
                                                                {icon || String.fromCharCode(65 + oi)}
                                                            </span>
                                                            {opt}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        {isTyping && <TypingBubble />}
                        {phase === 'complete' && (
                            <div style={{
                                background: '#ffffff',
                                border: '1px solid #e2e8f0', borderRadius: 20,
                                padding: '24px', textAlign: 'center', marginTop: 4,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ fontSize: 36, marginBottom: 8 }}>🏆</div>
                                <div style={{ fontWeight: 800, fontSize: 17, color: '#1a202c', marginBottom: 4 }}>
                                    Module Complete!
                                </div>

                                <button
                                    onClick={() => navigate('/')}
                                    style={{
                                        background: 'linear-gradient(135deg, #3b5bdb, #364fc7)',
                                        color: 'white', border: 'none', borderRadius: 12,
                                        padding: '12px 26px', fontSize: 13.5, fontWeight: 700,
                                        cursor: 'pointer', fontFamily: 'inherit',
                                        boxShadow: '0 4px 14px rgba(59, 91, 219, 0.3)'
                                    }}
                                >
                                    Back to Dashboard →
                                </button>
                            </div>
                        )}
                        <div ref={chatEnd} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LLMFoundationsChat;
