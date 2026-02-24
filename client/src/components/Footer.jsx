import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" style={{
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '12px 20px',
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#718096'
        }}>
            <div className="footer-left">
                <p style={{ margin: 0 }}>&copy; NIIT Ltd 2026. ALL RIGHTS RESERVED</p>
            </div>

            <div className="footer-right" style={{ display: 'flex', gap: '20px' }}>
                <a href="#" style={{ textDecoration: 'none', color: '#718096', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#3b5bdb'}
                    onMouseLeave={(e) => e.target.style.color = '#718096'}>
                    Privacy Policy
                </a>
                <a href="#" style={{ textDecoration: 'none', color: '#718096', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#3b5bdb'}
                    onMouseLeave={(e) => e.target.style.color = '#718096'}>
                    Terms & Conditions
                </a>
            </div>
        </footer>
    );
};

export default Footer;
