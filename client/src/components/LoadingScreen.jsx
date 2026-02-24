import React, { useState, useEffect } from 'react';
import Ico from './common/Icons';

const LoadingScreen = () => {
    const steps = ['Analyzing your skill assessment...', 'Identifying skip opportunities...', 'Mapping 60-day competency trajectory...', 'Personalizing module sequencing...'];
    const [done, setDone] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setDone(p => Math.min(p + 1, steps.length)), 600);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="bg-hero" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="orb orb-a" /><div className="orb orb-b" />
            <div style={{ position: 'relative', width: 70, height: 70, marginBottom: 20 }}>
                <div style={{ position: 'absolute', inset: 0, border: '3px solid #e2e8f0', borderRadius: '50%' }} />
                <div className="anim-spin" style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: '#3b5bdb', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="anim-float" style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#3b5bdb,#364fc7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(59,91,219,0.35)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                        </svg>
                    </div>
                </div>
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 4 }} className="text-grad">Crafting Your Roadmap</h2>
            <p style={{ color: '#a0aec0', fontSize: 13, marginBottom: 16 }}>Personalizing your journey based on validated skills…</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, width: '100%' }}>
                {steps.map((s, i) => (
                    <div key={i} className={done > i ? 'anim-pop' : ''} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: done > i ? 1 : 0.3, transition: 'opacity 0.3s' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: done > i ? 'linear-gradient(135deg,#3b5bdb,#4c6ef5)' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: done > i ? '0 2px 8px rgba(59,91,219,0.3)' : 'none' }}>
                            {done > i && <Ico name="check" size={9} color="white" />}
                        </div>
                        <span style={{ fontSize: 12, color: '#718096' }}>{s}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingScreen;
