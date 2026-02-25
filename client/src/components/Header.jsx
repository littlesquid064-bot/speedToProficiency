import React, { useState, useEffect, useRef } from 'react';

const Header = ({ user, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: '#1e2a4a',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '8px 20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)'
        }}>
            {/* Left: Project Name */}
            <div className="logo-area" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

                <div>
                    <h1 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#f1f5f9',
                        letterSpacing: '-0.01em',
                        margin: 0
                    }}>
                        Speed to Proficiency
                    </h1>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                        Intelligent Learning Ecosystem
                    </span>
                </div>
            </div>

            {/* Right: Profile & NIIT */}
            <div className="right-area" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {user && (
                    <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight: '8px' }}>
                        {/* User Details */}
                        <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>
                                {user.name}
                            </div>
                            <div style={{ fontSize: '11px', color: '#d7d7d7ff' }}>
                                {user.role} &middot; Day {user.daysIn}
                            </div>
                        </div>
                        {/* Avatar with Dropdown */}
                        <div ref={dropdownRef} style={{ position: 'relative' }}>
                            <div
                                onClick={() => setDropdownOpen(prev => !prev)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #3b5bdb, #364fc7)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    boxShadow: dropdownOpen
                                        ? '0 0 0 3px rgba(59, 91, 219, 0.5), 0 2px 10px rgba(59, 91, 219, 0.3)'
                                        : '0 2px 10px rgba(59, 91, 219, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.2s ease',
                                    userSelect: 'none'
                                }}
                            >
                                {user.initials}
                            </div>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    minWidth: '160px',
                                    background: '#1e293b',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '10px',
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                                    padding: '6px',
                                    zIndex: 2000,
                                    animation: 'fadeIn 0.15s ease'
                                }}>
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            onLogout();
                                        }}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '10px 14px',
                                            background: 'transparent',
                                            border: 'none',
                                            borderRadius: '7px',
                                            color: '#f87171',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s ease'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* NIIT Branding */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    lineHeight: 1,
                    borderLeft: user ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    paddingLeft: user ? '24px' : '0',
                }}>
                    <img
                        src="/NIIT_logo.png"
                        alt="NIIT"
                        style={{ height: '32px', width: 'auto' }}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
