import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Ico from './common/Icons';
import GenieAvatar from './common/GenieAvatar';
import GenieBubble from './common/GenieBubble';
import CareerModal from './CareerModal';

const TypingBubble = () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <GenieAvatar size={30} />
        <div className="gb" style={{ padding: '12px 18px' }}>
            <div className="dots"><span /><span /><span /></div>
        </div>
    </div>
);

// Helper Component for Journey Cards
const JourneyCard = ({ mod, onClick }) => {
    // Show START for all first modules (not just Acme CS Playbook)
    const startableTitles = [
        'Acme CS Playbook',
        'Programming Fundamentals',
        'Company Culture & Foundations',
        'Core Competencies: B2B Sales',
        'Cloud Architecture & Cost',
        'Enterprise Architecture Mastery',
        'LLM Foundations & Context',
        'Life-Stage Financial Advisory'
    ];
    const isClickable = startableTitles.includes(mod.title) && mod.status !== 'locked';

    return (
        <div
            className={`mod-card ${mod.status}`}
            onClick={isClickable ? onClick : undefined}
            style={{
                width: '100%',
                background: '#ffffff',
                borderRadius: 14,
                padding: '14px 16px',
                boxShadow: mod.status === 'recommended' ? '0 4px 14px rgba(59,91,219,0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.03)',
                border: mod.status === 'recommended' ? '1.5px solid rgba(59,91,219,0.35)' : '1px solid #e2e8f0',
                opacity: mod.status === 'locked' ? 0.6 : 1,
                transition: 'all 0.2s',
                cursor: isClickable ? 'pointer' : 'default'
            }}
            onMouseEnter={e => {
                if (isClickable) {
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,91,219,0.2)';
                    e.currentTarget.style.border = '1.5px solid rgba(59,91,219,0.35)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }
            }}
            onMouseLeave={e => {
                if (isClickable) {
                    e.currentTarget.style.boxShadow = mod.status === 'recommended'
                        ? '0 4px 14px rgba(59,91,219,0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.03)';
                    e.currentTarget.style.border = mod.status === 'recommended'
                        ? '1.5px solid rgba(59,91,219,0.35)' : '1px solid #e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                }
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#3b5bdb', textTransform: 'uppercase' }}>{mod.cat}</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {mod.status === 'recommended' && (
                        <span style={{ fontSize: 9, background: '#3b5bdb', color: 'white', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>NEXT UP</span>
                    )}
                    {isClickable && (
                        <span style={{ fontSize: 9, background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '2px 6px', borderRadius: 4, fontWeight: 600, border: '1px solid rgba(16,185,129,0.3)' }}>▶ START</span>
                    )}
                </div>
            </div>

            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', marginBottom: 4, lineHeight: 1.3 }}>{mod.title}</h4>

            {mod.status !== 'locked' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {(mod.tags || []).slice(0, 2).map(t => (
                            <span key={t} style={{ fontSize: 9, background: 'rgba(59,91,219,0.08)', color: '#3b5bdb', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>{t}</span>
                        ))}
                    </div>
                    {mod.progress > 0 && (
                        <div style={{ flex: 1, height: 4, background: '#e2e8f0', borderRadius: 2 }}>
                            <div style={{ width: `${mod.progress}%`, background: '#10b981', height: '100%', borderRadius: 2 }} />
                        </div>
                    )}
                </div>
            )}

            <p style={{ fontSize: 11, color: '#a0aec0', marginTop: 10, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {mod.desc}
            </p>
        </div>
    );
};

const Dashboard = ({ results, onLogout, user, modules, careerPath, replies, dashMsg, dataSources = [], dataSourcesInfo = {} }) => {
    const navigate = useNavigate();
    const [tab, setTab] = useState('journey');
    const [messages, setMessages] = useState([
        { type: 'genie', text: `Welcome to your command center, ${user.name.split(' ')[0]}! 🎯 Your adaptive roadmap is live. You're saving hours on content you already know — that's real business value on Day 1.` },
        { type: 'genie', text: dashMsg },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [showCareer, setShowCareer] = useState(false);
    const chatEnd = useRef(null);

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

    const sourceCount = 5; // Self-Assessment, Teams, Mentor, CRM, AI Scenarios
    const avg = useMemo(() => {
        const v = Object.values(results);
        return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 65;
    }, [results]);

    const send = () => {
        if (!input.trim()) return;
        const txt = input.trim();
        setMessages(p => [...p, { type: 'user', text: txt }]);
        setInput('');
        setTyping(true);
        setTimeout(() => {
            const lower = txt.toLowerCase();
            let reply = `Great question! Based on your validated profile, the highest-ROI action is focusing on your weakest skill gap.`;

            if (lower.includes('skill gap')) reply = replies.intro;
            else if (lower.includes('progress')) reply = replies.progress;
            else if (lower.includes('schedule')) reply = `Tomorrow's adaptive schedule:\n⏰ 9:00 AM — ${modules[1].title} (45 min)\n📚 11:00 AM — Practice Scenarios (30 min)\n🎯 3:00 PM — Executive Presentation prep (20 min)\n\nTotal: 1hr 35min. Efficient learning, maximum ROI.`;
            else if (lower.includes('next role')) reply = `You're 4–6 months from ${careerPath[1].role}! Key gaps:\n• Strategic Account Planning (Critical)\n• Revenue Forecasting (High)\n\nWant me to add the Accelerator track to your journey?`;
            else if (lower.includes('module')) reply = `Your top 3 recommended modules right now:\n1. ⚡ ${modules[1].title}\n2. 🎯 ${modules[2].title}\n3. ✨ ${modules[4] ? modules[4].title : modules[3].title}\n\nShall I start the next module now?`;

            setTyping(false);
            setMessages(p => [...p, { type: 'genie', text: reply }]);
        }, 1400);
    };

    const quickPrompts = ["What's my skill gap?", "My progress?", "Tomorrow's schedule", "Next role?", "Best module now?"];

    const skillData = [
        { label: 'Platform Skills', score: results.crm || 72, sub: 'Technical Basics', icon: '⚡', bar: '#3b82f6' },
        { label: 'Core Role', score: results.sales || 44, sub: 'Day-to-day operations', icon: '🎯', bar: '#ef4444' },
        { label: 'Communication', score: results.comms || 78, sub: 'Pyramid Principle, C-Suite', icon: '🗣️', bar: '#10b981' },
        { label: 'Product/Tech', score: results.collab || 62, sub: 'Product mastery', icon: '⚙️', bar: '#f59e0b' },
        { label: 'Domain Knowledge', score: results.product || 55, sub: 'Industry metrics', icon: '📦', bar: '#60a5fa' },
    ];

    return (
        <div style={{ height: '100%', background: '#f0f4f8', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', zoom: 1.2 }}>

                {/* ─── LEFT PANEL (FIXED) ─── */}
                <div style={{ width: 420, flexShrink: 0, padding: '24px', overflowY: 'auto', borderRight: '1px solid #e2e8f0' }}>

                    {/* Welcome Genie Card */}
                    <div className="anim-fsu" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '16px 20px', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <div className="anim-float" style={{ flexShrink: 0 }}><GenieAvatar size={44} /></div>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a202c', marginBottom: 4 }}>Good morning, {user.name.split(' ')[0]}! 👋</h2>
                                <p style={{ fontSize: 12.5, color: '#718096', lineHeight: 1.5 }}>Day {user.daysIn} update — you're <strong style={{ color: '#3b5bdb' }}>12% ahead</strong> of your peer cohort!</p>
                            </div>
                        </div>
                        {/* Donut */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, padding: '10px 0' }}>
                            <div style={{ textAlign: 'center', flexShrink: 0 }}>
                                <svg width="68" height="68" style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx="34" cy="34" r="28" stroke="#e2e8f0" strokeWidth="6" fill="none" />
                                    <circle cx="34" cy="34" r="28" stroke="url(#dg)" strokeWidth="6" fill="none" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - avg / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
                                    <defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b5bdb" /><stop offset="100%" stopColor="#4c6ef5" /></linearGradient></defs>
                                </svg>
                                <div style={{ marginTop: -60, height: 68, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, position: "relative", top: "-10px" }} className="text-grad">{avg}%</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#a0aec0' }}>Proficiency</div>
                            </div>
                            <div style={{ flex: 1, fontSize: 12.5, color: '#718096', lineHeight: 1.55 }}>
                                💡 <strong>Today:</strong> Focus on <span style={{ color: '#3b5bdb', fontWeight: 700 }}>{modules[2] ? modules[2].title : modules[0].title}</span> — your fastest ROI skill gap.
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="anim-fsu" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, animationDelay: '0.08s' }}>
                        {[
                            { em: '📊', val: `${sourceCount} Sources`, lbl: 'Powering Score', sub: 'Multi-signal assessment', c: '#3b82f6' },
                            { em: '📚', val: `${modules.length} Modules`, lbl: 'In Your Path', sub: '2 available now', c: '#60a5fa' },
                            { em: '👤', val: user.mentor, lbl: 'Your Mentor', sub: 'Available Tue & Thu', c: '#06b6d4' },
                        ].map(s => (
                            <div key={s.lbl} className="card-sm" style={{ padding: '12px 14px', cursor: 'default', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ fontSize: 20 }}>{s.em}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1a202c', lineHeight: 1.2 }}>{s.val}</div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: s.c }}>{s.lbl}</div>
                                </div>
                                <div style={{ fontSize: 10, color: '#a0aec0' }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="anim-fsu" style={{ display: 'flex', gap: 8, animationDelay: '0.12s' }}>
                        {[['journey', '🗺️ Journey'], ['skills', '📊 Skills'], ['career', '🏆 Career']].map(([t, l]) => (
                            <button key={t} className={`pill${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{l}</button>
                        ))}
                    </div>
                </div>

                {/* ─── RIGHT PANEL (SCROLLABLE) ─── */}
                <div className="scroll-y" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>

                    {/* ── JOURNEY TAB ── */}
                    {tab === 'journey' && (
                        <div className="anim-fi">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a202c' }}>Your Learning Map</h3>
                                <span className="eff-badge">📊 {sourceCount} data sources</span>
                            </div>

                            <div style={{ position: 'relative', paddingBottom: 40 }}>
                                <div style={{ position: 'absolute', top: 10, bottom: 0, left: '50%', width: 2, background: 'linear-gradient(to bottom, rgba(59,91,219,0.25) 40%, #e2e8f0)', transform: 'translateX(-50%)', borderRadius: 2 }} />

                                {modules.map((mod, i) => {
                                    const isLeft = i % 2 === 0;
                                    return (
                                        <div key={mod.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, position: 'relative' }}>
                                            <div style={{ width: '42%', display: 'flex', justifyContent: 'flex-end', paddingRight: isLeft ? 16 : 0, opacity: isLeft ? 1 : 0 }}>
                                                {isLeft && (
                                                    <JourneyCard
                                                        mod={mod}
                                                        onClick={() => {
                                                            if (mod.title === 'Acme CS Playbook') navigate('/module/acme-cs-playbook');
                                                            else if (mod.title === 'Programming Fundamentals') navigate('/module/programming-fundamentals');
                                                            else if (mod.title === 'Company Culture & Foundations') navigate('/module/company-culture');
                                                            else if (mod.title === 'Core Competencies: B2B Sales') navigate('/module/core-competencies-b2b');
                                                            else if (mod.title === 'Cloud Architecture & Cost') navigate('/module/cloud-architecture');
                                                            else if (mod.title === 'Enterprise Architecture Mastery') navigate('/module/enterprise-architecture');
                                                            else if (mod.title === 'LLM Foundations & Context') navigate('/module/llm-foundations');
                                                            else if (mod.title === 'Life-Stage Financial Advisory') navigate('/module/lifestage-advisory');
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div style={{
                                                width: 36, height: 36, borderRadius: '50%',
                                                background: mod.status === 'recommended' ? 'linear-gradient(135deg,#3b5bdb,#364fc7)' : '#f7fafc',
                                                border: mod.status === 'recommended' ? 'none' : '2px solid #e2e8f0',
                                                boxShadow: mod.status === 'recommended' ? '0 0 0 4px rgba(59,91,219,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: mod.status === 'recommended' ? 'white' : '#9ca3af',
                                                fontSize: 16, zIndex: 2, flexShrink: 0
                                            }}>
                                                {mod.status === 'locked' ? '🔒' : mod.icon}
                                            </div>

                                            <div style={{ width: '42%', display: 'flex', justifyContent: 'flex-start', paddingLeft: !isLeft ? 16 : 0, opacity: !isLeft ? 1 : 0 }}>
                                                {!isLeft && (
                                                    <JourneyCard
                                                        mod={mod}
                                                        onClick={() => {
                                                            if (mod.title === 'Acme CS Playbook') navigate('/module/acme-cs-playbook');
                                                            else if (mod.title === 'Programming Fundamentals') navigate('/module/programming-fundamentals');
                                                            else if (mod.title === 'Company Culture & Foundations') navigate('/module/company-culture');
                                                            else if (mod.title === 'Core Competencies: B2B Sales') navigate('/module/core-competencies-b2b');
                                                            else if (mod.title === 'Cloud Architecture & Cost') navigate('/module/cloud-architecture');
                                                            else if (mod.title === 'Enterprise Architecture Mastery') navigate('/module/enterprise-architecture');
                                                            else if (mod.title === 'LLM Foundations & Context') navigate('/module/llm-foundations');
                                                            else if (mod.title === 'Life-Stage Financial Advisory') navigate('/module/lifestage-advisory');
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── SKILLS TAB ── */}
                    {tab === 'skills' && (
                        <div className="anim-fi">
                            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a202c', marginBottom: 16 }}>Your Validated Skill Map</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                                {skillData.map(s => (
                                    <div key={s.label} className="card-sm" style={{ padding: '16px 18px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontSize: 18 }}>{s.icon}</span>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: '#1a202c' }}>{s.label}</span>
                                            </div>
                                            <span style={{ fontWeight: 800, fontSize: 18, color: s.bar }}>{s.score}%</span>
                                        </div>
                                        <div className="skill-bar-wrap" style={{ marginBottom: 6 }}><div className="skill-bar" style={{ width: `${s.score}%`, background: `linear-gradient(90deg,${s.bar},${s.bar}aa)` }} /></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: 11, color: '#a0aec0' }}>{s.sub}</span>
                                            <span className="tag" style={{ fontSize: 10 }}>{s.score >= 70 ? 'Proficient' : s.score >= 50 ? 'Developing' : 'Focus Area'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <GenieAvatar size={30} />
                                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1a202c' }}>Genie Velocity Insight</span>
                                </div>
                                <p style={{ fontSize: 13, color: '#718096', lineHeight: 1.65 }}>
                                    Based on your validated skills from {sourceCount} data sources, you're completing your competency framework <strong style={{ color: '#3b5bdb' }}>2.3× faster</strong> than the standard onboarding cohort. Your multi-signal assessment (Self-Assessment, Teams, Mentor Feedback, CRM & AI Scenario Mastery) gives a <strong style={{ color: '#38a169' }}>360° proficiency view</strong> — that's real accuracy for L&D and real productivity for the business, starting Day 1.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── CAREER TAB ── */}
                    {tab === 'career' && (
                        <div className="anim-fi">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a202c' }}>Career Progression Expert</h3>
                                <button className="btn btn-p" style={{ padding: '9px 18px', fontSize: 13 }} onClick={() => setShowCareer(true)}>
                                    🏆 Explore Next Role
                                </button>
                            </div>

                            <GenieBubble delay={0} text="Based on your skill velocity and assessment, I've mapped your optimal career trajectory. You're on track for a significant level jump in under 6 months!" />

                            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {careerPath.map((r, i) => (
                                    <div key={r.role} style={{ background: r.current ? 'rgba(59,91,219,0.06)' : r.cta ? 'rgba(234,179,8,0.06)' : '#ffffff', border: `1.5px solid ${r.current ? 'rgba(59,91,219,0.25)' : r.cta ? 'rgba(234,179,8,0.25)' : '#e2e8f0'}`, borderRadius: 16, padding: '16px 18px' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.current ? 'linear-gradient(135deg,#3b5bdb,#364fc7)' : r.cta ? 'rgba(234,179,8,0.12)' : '#f7fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {r.current ? <Ico name="check" size={16} color="white" /> : r.cta ? <Ico name="trending" size={16} color="#d97706" /> : <Ico name="trophy" size={16} color="#9ca3af" />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                                                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1a202c' }}>{r.role}</span>
                                                    {r.current && <span className="tag" style={{ fontSize: 11 }}>Current</span>}
                                                    {r.cta && <span className="tag-amber" style={{ fontSize: 11, display: 'inline-flex', padding: '3px 10px', borderRadius: 8, fontWeight: 700 }}>🎯 Next Target</span>}
                                                </div>
                                                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{r.time}</div>
                                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                                    {r.skills.map(s => <span key={s} className="tag" style={{ fontSize: 11 }}>{s}</span>)}
                                                </div>
                                                {r.note && <p style={{ fontSize: 12.5, color: '#92400e', marginTop: 8, fontWeight: 500 }}>{r.note}</p>}
                                                {r.cta && (
                                                    <button className="btn btn-ghost" style={{ marginTop: 10, fontSize: 12 }} onClick={() => setShowCareer(true)}>
                                                        View skills required & add to my journey <Ico name="arrow" size={12} color="#3b5bdb" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── FLOATING GENIE AVATAR ─── */}
                <div
                    onClick={() => setChatOpen(c => !c)}
                    style={{
                        position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
                        width: 56, height: 56, borderRadius: '50%',
                        overflow: 'hidden', cursor: 'pointer',
                        boxShadow: chatOpen ? '0 0 0 3px rgba(59,91,219,0.4), 0 4px 20px rgba(59,91,219,0.35)' : '0 4px 20px rgba(0,0,0,0.2)',
                        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
                        transform: chatOpen ? 'scale(0.92)' : 'scale(1)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = chatOpen ? 'scale(0.92)' : 'scale(1)'}
                    title={chatOpen ? 'Close Genie Chat' : 'Open Genie Chat'}
                >
                    <img src="/genie.jpg" alt="Genie" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* ─── FLOATING GENIE CHATBOX ─── */}
                {chatOpen && (
                    <div style={{
                        position: 'fixed', bottom: 90, right: 24, zIndex: 999,
                        width: 370, height: 480,
                        background: '#ffffff', borderRadius: 20,
                        boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
                        display: 'flex', flexDirection: 'column',
                        overflow: 'hidden',
                        animation: 'fadeSlideUp 0.25s ease'
                    }}>
                        {/* Chat Header */}
                        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg, #f7fafc, #edf2f7)' }}>
                            <img src="/genie.jpg" alt="Genie" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(59,91,219,0.2)' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, color: '#1a202c' }}>Learning Genie</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
                                    <span style={{ fontSize: 11, color: '#a0aec0' }}>Always adapting to you</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setChatOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#a0aec0', padding: '4px 8px', borderRadius: 8, lineHeight: 1 }}
                                onMouseEnter={e => e.currentTarget.style.color = '#1a202c'}
                                onMouseLeave={e => e.currentTarget.style.color = '#a0aec0'}
                            >
                                ×
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="scroll-y" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
                            {messages.map((m, i) => (
                                <div key={i} className="anim-pop" style={{ display: 'flex', justifyContent: m.type === 'user' ? 'flex-end' : 'flex-start' }}>
                                    {m.type === 'genie' ? (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                            <img src="/genie.jpg" alt="Genie" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                                            <div className="gb" style={{ fontSize: 12.5, padding: '10px 14px', maxWidth: 240, whiteSpace: 'pre-line' }}>{m.text}</div>
                                        </div>
                                    ) : (
                                        <div className="ub" style={{ fontSize: 12.5, padding: '10px 14px', maxWidth: 220 }}>{m.text}</div>
                                    )}
                                </div>
                            ))}
                            {typing && <TypingBubble />}
                            <div ref={chatEnd} />
                        </div>

                        {/* Quick Prompts & Input */}
                        <div style={{ padding: '10px 14px', borderTop: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: 11, color: '#a0aec0', marginBottom: 7 }}>Quick questions:</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                                {quickPrompts.map(p => (
                                    <button key={p} onClick={() => setInput(p)} style={{ background: 'rgba(59,91,219,0.06)', border: '1px solid rgba(59,91,219,0.15)', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: '#3b5bdb', fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <input className="inp" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} placeholder="Ask your Genie anything…" style={{ fontSize: 12.5, padding: '10px 13px', flex: 1 }} />
                                <button className="btn btn-p" style={{ width: 38, height: 38, padding: 0, flexShrink: 0, borderRadius: 10 }} onClick={send}>
                                    <Ico name="send" size={15} color="white" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showCareer && <CareerModal onClose={() => setShowCareer(false)} onAddToJourney={() => { setShowCareer(false); setTab('journey'); }} careerPath={careerPath} user={user} />}
        </div>
    );
};

export default Dashboard;