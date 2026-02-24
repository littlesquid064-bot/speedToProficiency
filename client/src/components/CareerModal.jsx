import React from 'react';
import Ico from './common/Icons';
import GenieBubble from './common/GenieBubble';

const CareerModal = ({ onClose, onAddToJourney, careerPath, user }) => (
    <div className="modal-bg" onClick={onClose}>
        <div className="card anim-pop" style={{ padding: 32, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800 }} className="text-grad">🏆 Next Role: {careerPath[1].role}</div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0aec0', padding: 4 }} onClick={onClose}><Ico name="x" size={20} /></button>
            </div>

            <GenieBubble delay={0} text={`Based on your trajectory, ${user.name.split(' ')[0]}, you're 4–6 months from readiness. Here's exactly what stands between you and that role 👇`} />

            <div style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                    { skill: 'Strategic Account Planning', pct: 34, priority: 'Critical', color: '#ef4444', bg: '#fff1f0', mod: 'Competency Dev Module' },
                    { skill: 'Revenue Forecasting', pct: 58, priority: 'High', color: '#f59e0b', bg: '#fef3c7', mod: 'Product Knowledge Module' },
                    { skill: 'Multi-Threaded Management', pct: 42, priority: 'High', color: '#f59e0b', bg: '#fef3c7', mod: 'Mastery Module' },
                    { skill: 'Executive Presence', pct: 78, priority: 'Medium', color: '#3b5bdb', bg: 'rgba(59,91,219,0.08)', mod: 'Communication Module' },
                ].map(item => (
                    <div key={item.skill} style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a202c' }}>{item.skill}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: item.color, background: item.bg, padding: '3px 10px', borderRadius: 8 }}>{item.priority}</span>
                        </div>
                        <div className="skill-bar-wrap" style={{ marginBottom: 5 }}><div className="skill-bar" style={{ width: `${item.pct}%`, background: `linear-gradient(90deg,${item.color},${item.color}99)` }} /></div>
                        <div style={{ fontSize: 11, color: '#a0aec0' }}>Covered in: {item.mod}</div>
                    </div>
                ))}
            </div>

            <div style={{ background: 'rgba(59,91,219,0.06)', borderRadius: 12, padding: '12px 16px', marginBottom: 18, fontSize: 13, color: '#3b5bdb', fontWeight: 500 }}>
                ⚡ At your current learning velocity, you'll be ready in <strong>~5 months</strong> — that's 3 months faster than the cohort average!
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-p" style={{ flex: 1, padding: '13px 20px' }} onClick={onAddToJourney}>
                    ✨ Add Track to My Journey
                </button>
                <button className="btn btn-s" style={{ padding: '13px 20px' }} onClick={onClose}>Later</button>
            </div>
        </div>
    </div>
);

export default CareerModal;
