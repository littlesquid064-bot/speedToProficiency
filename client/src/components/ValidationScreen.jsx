import React, { useMemo } from 'react';
import Ico from './common/Icons';
import GenieBubble from './common/GenieBubble';

const ValidationScreen = ({ results, onLaunch, modules, user, dataSources = [], sourceBreakdown = {} }) => {
    const avg = useMemo(() => {
        const v = Object.values(results);
        return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 65;
    }, [results]);

    const skills = [
        { label: 'Platform/CRM', score: results.crm || 72, icon: '⚡' },
        { label: 'Core Role Skills', score: results.sales || results.consult || 44, icon: '🎯' },
        { label: 'Communication', score: results.comms || results.acumen || 78, icon: '🗣️' },
        { label: 'Technical/Product', score: results.collab || results.stake || 62, icon: '⚙️' },
        { label: 'Domain Knowledge', score: results.product || results.pipeline || 55, icon: '📦' },
    ];

    const sourceIcons = [
        { id: 'self', icon: '📝', name: 'Self-Assessment', color: '#3b82f6' },
        { id: 'teams', icon: '💬', name: 'Microsoft Teams', color: '#5b5fc7' },
        { id: 'mentor', icon: '🧑‍🏫', name: 'Mentor Feedback', color: '#10b981' },
        { id: 'crm', icon: '📊', name: 'CRM Data', color: '#3b82f6' },
        { id: 'scenario', icon: '🧞', name: 'Scenario Analysis', color: '#8b5cf6' },
    ];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px', position: 'relative' }}>
            {/* Card fills almost all available space */}
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, position: 'relative', zIndex: 1, margin: '0 auto', width: '100%', maxWidth: 1000, overflow: 'auto' }}>
                {/* Header with badge */}
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <div className="anim-float" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#3b5bdb,#364fc7)', boxShadow: '0 10px 24px rgba(59,91,219,0.3)', marginBottom: 6 }}>
                        <Ico name="check" size={22} color="white" />
                    </div>
                    <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800 }} className="text-grad">Assessment Complete!</h2>
                    <p style={{ color: '#a0aec0', fontSize: 11, marginTop: 2 }}>Here's what your Learning Genie found</p>
                </div>

                {/* Two-column layout: Genie bubble + Summary left, Skills right */}
                <div style={{ display: 'flex', gap: 20, flex: 1, alignItems: 'flex-start' }}>
                    {/* Left column */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <GenieBubble delay={0} text={`${user.name.split(' ')[0]}, your proficiency score is powered by 5 real data sources — not just a quiz! We've combined your self-assessment, Teams activity, mentor feedback, CRM data, and AI-evaluated scenarios for a 360° view. 🚀`} />

                        {/* Data Sources banner (replaces Time Saved) */}
                        <div style={{ borderRadius: 12, padding: '12px 16px', background: '#f7fafc', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: '#3b5bdb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Data Sources Analyzed</div>
                                    <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1, fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-grad">5 Sources</div>
                                    <div style={{ fontSize: 10, color: '#a0aec0', marginTop: 1 }}>360° proficiency assessment</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 10, color: '#a0aec0' }}>Your Proficiency</div>
                                    <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-grad">{avg}%</div>
                                </div>
                            </div>
                            {/* Source pills */}
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {sourceIcons.map(s => (
                                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 600, color: s.color }}>
                                        <span style={{ fontSize: 13 }}>{s.icon}</span>
                                        {s.name}
                                        <span style={{ color: '#10b981', marginLeft: 2 }}>✓</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column: Skill bars */}
                    <div style={{ width: 380, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {skills.map(sk => (
                            <div key={sk.label} style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '8px 12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <span style={{ fontSize: 13 }}>{sk.icon}</span>
                                        <span style={{ fontSize: 11, fontWeight: 600, color: '#1a202c' }}>{sk.label}</span>
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: sk.score >= 70 ? '#3b5bdb' : sk.score >= 50 ? '#d69e2e' : '#e53e3e' }}>{sk.score}%</span>
                                </div>
                                <div className="skill-bar-wrap"><div className="skill-bar" style={{ width: `${sk.score}%`, background: sk.score >= 70 ? 'linear-gradient(90deg,#3b5bdb,#4c6ef5)' : sk.score >= 50 ? 'linear-gradient(90deg,#d69e2e,#ecc94b)' : 'linear-gradient(90deg,#e53e3e,#fc8181)' }} /></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Launch button at bottom */}
                <button className="btn btn-p" style={{ width: '100%', marginTop: 12, fontSize: 14, padding: '10px 20px' }} onClick={onLaunch}>
                    Launch My Learning Dashboard 🚀
                </button>
            </div>
        </div>
    );
};

export default ValidationScreen;
