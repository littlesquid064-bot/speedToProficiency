import React from 'react';
import Ico from './Icons';

const RoadmapSidebar = ({ currentStep }) => {
    const steps = [
        { id: 'intro', label: 'Learning Genie', icon: 'sparkles' },
        { id: 'self', label: 'Self-Assessment', icon: 'user' },
        { id: 'test', label: 'Evaluation (Objective)', icon: 'check-square' },
        { id: 'subjective', label: 'Evaluation (Subjective)', icon: 'message-circle' },
        { id: 'validation', label: 'Evaluation Result', icon: 'award' }
    ];

    const currentIdx = steps.findIndex(s => s.id === currentStep);

    return (
        <div style={{
            width: '280px',
            background: '#ffffff',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            height: '100%',
            flexShrink: 0
        }}>
            <h2 style={{
                fontSize: '12px',
                fontWeight: 800,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '32px'
            }}>
                Your Journey to Proficiency
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    left: '18px',
                    top: '19px',
                    bottom: '19px',
                    width: '2px',
                    background: '#e2e8f0',
                    zIndex: 0
                }} />

                {steps.map((step, idx) => {
                    const isCompleted = idx < currentIdx;
                    const isCurrent = idx === currentIdx;
                    const isUpcoming = idx > currentIdx;

                    return (
                        <div key={step.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: idx === steps.length - 1 ? 0 : '32px',
                            position: 'relative',
                            zIndex: 1,
                            opacity: isUpcoming ? 0.5 : 1,
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '12px',
                                background: isCompleted ? '#10b981' : isCurrent ? '#3b5bdb' : '#ffffff',
                                border: isCurrent ? 'none' : '2px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: isCurrent ? '0 4px 12px rgba(59, 91, 219, 0.25)' : 'none',
                                color: isCompleted || isCurrent ? '#ffffff' : '#94a3b8',
                                transition: 'all 0.3s ease'
                            }}>
                                {isCompleted ? (
                                    <Ico name="check" size={20} color="white" />
                                ) : (
                                    <Ico name={step.icon} size={18} color={isCurrent ? "white" : "#94a3b8"} />
                                )}
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    color: isCurrent ? '#3b5bdb' : isCompleted ? '#10b981' : '#4a5568'
                                }}>
                                    {step.label}
                                </div>
                                {isCurrent && (
                                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                        Current Progress
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RoadmapSidebar;
