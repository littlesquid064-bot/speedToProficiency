import React, { useState } from 'react';

const ModuleSidebar = ({ results = {}, careerPath = [], modules = [], user = {} }) => {
    const [collapsed, setCollapsed] = useState(false);

    const skillData = [
        { label: 'Product Knowledge', key: 'product', color: '#3b82f6' },
        { label: 'Core Role Skills', key: 'sales', color: '#ef4444' },
        { label: 'CRM & Pipeline Mgmt', key: 'crm', color: '#10b981' },
        { label: 'Communication', key: 'comms', color: '#06b6d4' },
        { label: 'Collaboration', key: 'collab', color: '#f59e0b' },
    ];

    return (
        <div style={{
            width: collapsed ? 48 : 280,
            flexShrink: 0,
            background: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            overflowY: collapsed ? 'hidden' : 'auto',
            overflowX: 'hidden',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'width 0.25s ease',
            position: 'relative'
        }}>
            {/* Hamburger Toggle */}
            <div style={{
                padding: collapsed ? '12px 8px' : '12px 16px',
                display: 'flex',
                alignItems: collapsed ? 'center' : 'flex-start',
                justifyContent: collapsed ? 'center' : 'flex-start',
            }}>
                <button
                    onClick={() => setCollapsed(c => !c)}
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    style={{
                        background: 'transparent',
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'background 0.15s ease',
                        color: '#4a5568'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>

            {/* All sidebar content — hidden when collapsed */}
            {!collapsed && (
                <>
                    {/* User badge */}
                    {user?.name && (
                        <div style={{ padding: '0 16px 0', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 14, color: 'white', fontWeight: 700
                            }}>{user.name.charAt(0)}</div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: '#1a202c' }}>{user.name}</div>
                                <div style={{ fontSize: 10, color: '#718096' }}>{user.role || 'Sales Program Associate'}</div>
                            </div>
                        </div>
                    )}

                    {/* ── COMPETENCY MAP ── */}
                    <div style={{ padding: '16px' }}>
                        <div style={{
                            fontSize: 10, fontWeight: 700, color: '#4a5568',
                            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14
                        }}>Competency Map</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {skillData.map(sk => {
                                const score = results[sk.key] || 50;
                                return (
                                    <div key={sk.key}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                            <span style={{ fontSize: 11, color: '#4a5568', fontWeight: 500 }}>{sk.label}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: sk.color }}>{score}%</span>
                                        </div>
                                        <div style={{ height: 5, background: '#e2e8f0', borderRadius: 3 }}>
                                            <div style={{
                                                height: '100%', borderRadius: 3,
                                                background: sk.color,
                                                width: `${score}%`, transition: 'width 0.6s ease'
                                            }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ height: 1, background: '#e2e8f0', margin: '0 16px' }} />

                    {/* ── CAREER PATH ── */}
                    <div style={{ padding: '16px' }}>
                        <div style={{
                            fontSize: 10, fontWeight: 700, color: '#4a5568',
                            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14
                        }}>Career Path</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {careerPath.map((r, i) => (
                                <div key={r.role} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                    {/* Line + dot */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16, flexShrink: 0 }}>
                                        <div style={{
                                            width: 10, height: 10, borderRadius: '50%',
                                            background: r.current ? '#10b981' : '#f1f5f9',
                                            border: r.current ? '2px solid #10b981' : '2px solid #cbd5e0',
                                            flexShrink: 0
                                        }} />
                                        {i < careerPath.length - 1 && (
                                            <div style={{ width: 2, height: 28, background: '#e2e8f0' }} />
                                        )}
                                    </div>
                                    <div style={{ paddingBottom: i < careerPath.length - 1 ? 12 : 0 }}>
                                        <div style={{
                                            fontSize: 12, fontWeight: r.current ? 700 : 500,
                                            color: r.current ? '#10b981' : '#718096',
                                            display: 'flex', alignItems: 'center', gap: 6
                                        }}>
                                            {r.role}
                                            {r.current && (
                                                <span style={{
                                                    fontSize: 9, background: '#10b981', color: 'white',
                                                    padding: '1px 6px', borderRadius: 4, fontWeight: 700
                                                }}>Now</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ height: 1, background: '#e2e8f0', margin: '0 16px' }} />

                    {/* ── YOUR LEARNING PATH ── */}
                    <div style={{ padding: '16px' }}>
                        <div style={{
                            fontSize: 10, fontWeight: 700, color: '#4a5568',
                            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14
                        }}>Your Learning Path</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {modules.slice(0, 6).map(mod => (
                                <div key={mod.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '8px 10px', borderRadius: 8,
                                    background: mod.status === 'recommended' ? 'rgba(37,99,235,0.06)' : 'transparent',
                                    border: mod.status === 'recommended' ? '1px solid rgba(59,130,246,0.1)' : '1px solid transparent'
                                }}>
                                    <div style={{
                                        width: 26, height: 26, borderRadius: 6,
                                        background: mod.status === 'recommended' ? '#2563eb' : '#f1f5f9',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 12, flexShrink: 0
                                    }}>{mod.icon}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: 11, fontWeight: 600, color: '#1a202c',
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                        }}>{mod.title}</div>
                                        <div style={{ fontSize: 9, color: '#718096' }}>
                                            {mod.status === 'recommended' ? 'Recommended' : mod.cat} · {(mod.tags || []).length} topics
                                        </div>
                                    </div>
                                    {mod.status === 'recommended' && (
                                        <span style={{
                                            fontSize: 8, background: '#dc2626', color: 'white',
                                            padding: '2px 5px', borderRadius: 4, fontWeight: 700, flexShrink: 0
                                        }}>Gap</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModuleSidebar;
