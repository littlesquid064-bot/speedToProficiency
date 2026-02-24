import React, { useState } from 'react';
import Ico from './common/Icons';

const LoginScreen = ({ onLogin }) => {
    const [email, setEmail] = useState('aditya.verma@acme.com');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.success) {
                    onLogin(data);
                } else {
                    setError(data.message);
                }
            })
            .catch(err => {
                setLoading(false);
                setError('Connection error');
            });
    };

    const quickFill = (e) => {
        setEmail(e);
        setError('');
    }

    // Hardcoded for quick fill convenience in UI, though validation is on backend
    const DEMO_EMAILS = ['aditya.verma@acme.com'];

    return (
        <div className="bg-hero" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px 12px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
            <div className="orb orb-a" /><div className="orb orb-b" />

            <div style={{ width: '100%', maxWidth: 380, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Logo block */}
                <div className="anim-fsu" style={{ textAlign: 'left', marginBottom: 12, paddingLeft: 4 }}>
                    <h1 style={{ fontSize: '19px', fontWeight: 700, color: '#1a202c', margin: 0 }}>Sign in</h1>
                </div>

                {/* Card */}
                <div className="card anim-fsu" style={{ padding: '20px 20px', animationDelay: '0.1s' }}>
                    <div style={{ marginBottom: 12 }}>
                        <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4a5568', marginBottom: 5 }}>Email Address</label>
                        <input
                            className="inp"
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError('') }}
                            placeholder="your.name@company.com"
                            style={{ marginBottom: 12, padding: '9px 12px', fontSize: '13px' }}
                        />

                        {/* Stacked Roles */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                            {[
                                { name: 'Aditya (Forward Deployment Engineer)', email: 'aditya.verma@acme.com' },
                                { name: 'Sanya (Context Engineer)', email: 'sanya.iyer@acme.com' },
                                { name: 'Shantanu (B2B Frontline Sales)', email: 'shantanu.singh@acme.com' },
                                { name: 'Rahul (Relationship Manager - B2C)', email: 'rahul.nair@acme.com' }
                            ].map((role) => (
                                <button
                                    key={role.email}
                                    onClick={() => quickFill(role.email)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        width: '100%',
                                        background: 'rgba(59, 91, 219, 0.04)',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: 8,
                                        padding: '7px 10px',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.2s',
                                        fontFamily: 'inherit'
                                    }}
                                    className="role-btn"
                                >
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 5, background: '#ffffff', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                        <Ico name="lock" size={11} color="#7c3aed" />
                                    </span>
                                    <span style={{ fontSize: '11.5px', fontWeight: 500, color: '#2563eb' }}>Login as {role.name}</span>
                                </button>
                            ))}
                        </div>

                        <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#4a5568', marginBottom: 5 }}>Password</label>
                        <input className="inp" type="password" placeholder="••••••••" readOnly style={{ padding: '9px 12px', fontSize: '13px', marginBottom: 2 }} />
                        {error && <div style={{ fontSize: '10px', color: '#ef4444', marginTop: 1, marginBottom: 4 }}>{error}</div>}
                    </div>

                    <button className="btn btn-p" style={{ width: '100%', fontSize: '13.5px', padding: '11px 18px', fontWeight: 600, borderRadius: 10, marginTop: 4, fontFamily: 'inherit' }} onClick={handleLogin} disabled={loading}>
                        {loading ? 'Authenticating...' : <>Enter Learning Portal →</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
