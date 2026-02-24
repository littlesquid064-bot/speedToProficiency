import React from 'react';

const paths = {
    sparkle: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 1v3M1 5h3M19 13v3M13 19h3',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    check: 'M20 6L9 17l-5-5',
    arrow: 'M5 12h14M12 5l7 7-7 7',
    clock: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4l3 3',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    trending: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 100 8 4 4 0 000-8z',
    lock: 'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4',
    logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
    trophy: 'M8 21h8M12 17v4M3 3h18M3 3l3 9a5 5 0 0010 0l3-9',
    target: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z',
    book: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z',
    x: 'M18 6L6 18M6 6l12 12',
};

const Ico = ({ name, size = 18, color = 'currentColor' }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {(paths[name] || '').split('M').filter(Boolean).map((p, i) => <path key={i} d={'M' + p} />)}
        </svg>
    );
};

export default Ico;
