import React, { useState, useEffect } from 'react';
import GenieAvatar from './GenieAvatar';

const GenieBubble = ({ text, delay = 0, children }) => {
    const [show, setShow] = useState(delay === 0);
    useEffect(() => {
        if (delay > 0) {
            const t = setTimeout(() => setShow(true), delay);
            return () => clearTimeout(t);
        }
    }, [delay]);
    if (!show) return null;
    return (
        <div className="anim-pop" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, animationDelay: `${delay}ms` }}>
            <GenieAvatar size={24} />
            <div className="gb">{text || children}</div>
        </div>
    );
};

export default GenieBubble;
