import React, { useState, useEffect } from 'react';
import GenieAvatar from './common/GenieAvatar';
import GenieBubble from './common/GenieBubble';

/* ─── Inline styles / tokens ─────────────────────────────────────── */
const T = {
  bg: '#f0f4f8',
  surface: '#ffffff',
  surfaceAlt: '#f7fafc',
  border: '#e2e8f0',
  borderAccent: 'rgba(59, 91, 219, 0.2)',
  accent: '#3b5bdb',
  accentGlow: 'rgba(59, 91, 219, 0.15)',
  accentMid: '#4c6ef5',
  gold: '#3b5bdb',
  textPrimary: '#1a202c',
  textSecondary: '#718096',
  textMuted: '#a0aec0',
  fontDisplay: "'Plus Jakarta Sans', sans-serif",
  fontMono: "'DM Mono', 'Fira Code', monospace",
  fontBody: "'Plus Jakarta Sans', sans-serif",
};

const injectFonts = () => {
  if (document.getElementById('genie-fonts')) return;
  const link = document.createElement('link');
  link.id = 'genie-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1);    opacity: 0.6; }
      50%  { transform: scale(1.35); opacity: 0.1; }
      100% { transform: scale(1);    opacity: 0.6; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; } 50% { opacity: 0; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes scan {
      0%   { top: 0; }
      100% { top: 100%; }
    }
    .genie-fade-up  { animation: fadeUp 0.5s ease forwards; }
    .genie-cursor   { display: inline-block; width: 2px; height: 0.9em;
                      background: ${T.accent}; vertical-align: text-bottom;
                      animation: blink 1s step-end infinite; margin-left: 2px; }
  `;
  document.head.appendChild(style);
};

/* ─── TypingBubble ─────────────────────────────────────────────────── */
const TypingBubble = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.7 }}>
    <div style={{
      width: 26, height: 26, borderRadius: '50%',
      background: `linear-gradient(135deg, ${T.accent}, ${T.accentMid})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, flexShrink: 0,
    }}>✦</div>
    <div style={{
      display: 'flex', gap: 5, padding: '8px 14px',
      background: '#f0edff', borderRadius: 20,
      border: `1px solid ${T.border}`,
    }}>
      {[0, 160, 320].map(d => (
        <span key={d} style={{
          width: 5, height: 5, borderRadius: '50%',
          background: T.accentMid, display: 'block',
          animation: `pulse-ring 1.2s ease-in-out ${d}ms infinite`,
        }} />
      ))}
    </div>
  </div>
);

/* ─── CriteriaList ──────────────────────────────────────────────────── */
const criteria = [
  'Reliability & ownership',
  'Architectural capability',
  'Automation depth',
  'Security-first mindset',
  'Leadership in cross-functional environments',
  'Business alignment (cost, uptime, scalability)',
];

const CriteriaMessage = ({ index }) => (
  <div className="genie-fade-up" style={{
    display: 'flex', alignItems: 'flex-start', gap: 10,
    animationDelay: `${index * 80}ms`, opacity: 0,
  }}>
    <div style={{
      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${T.accent}, ${T.accentMid})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, marginTop: 1,
      boxShadow: `0 0 12px ${T.accentGlow}`,
    }}>✦</div>
    <div style={{
      background: '#f0edff',
      border: `1px solid ${T.borderAccent}`,
      borderRadius: '4px 16px 16px 16px',
      padding: '10px 14px',
      fontSize: 13, lineHeight: 1.6,
      color: T.textPrimary,
      fontFamily: T.fontBody,
      maxWidth: '92%',
    }}>
      <div style={{ marginBottom: 8, fontWeight: 500 }}>
        You will be assessed on the following criteria:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {criteria.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            fontSize: 12, color: T.textSecondary, lineHeight: 1.5,
          }}>
            <span style={{
              display: 'inline-block',
              width: 5, height: 5,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${T.accent}, ${T.accentMid})`,
              flexShrink: 0,
            }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── ChatMessage ───────────────────────────────────────────────────── */
const ChatMessage = ({ text, index }) => (
  <div className="genie-fade-up" style={{
    display: 'flex', alignItems: 'flex-start', gap: 10,
    animationDelay: `${index * 80}ms`, opacity: 0,
  }}>
    <div style={{
      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${T.accent}, ${T.accentMid})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, marginTop: 1,
      boxShadow: `0 0 12px ${T.accentGlow}`,
    }}>✦</div>
    <div style={{
      background: '#f0edff',
      border: `1px solid ${T.borderAccent}`,
      borderRadius: '4px 16px 16px 16px',
      padding: '10px 14px',
      fontSize: 13, lineHeight: 1.6,
      color: T.textPrimary,
      fontFamily: T.fontBody,
      maxWidth: '92%',
    }}>
      {text}
    </div>
  </div>
);

/* ─── ProfileRow ────────────────────────────────────────────────────── */
const ProfileRow = ({ icon, label, value, delay }) => (
  <div className="genie-fade-up" style={{
    animationDelay: `${delay}ms`, opacity: 0,
    padding: '10px 12px',
    borderRadius: 8,
    background: '#f0edff',
    border: `1px solid ${T.border}`,
    position: 'relative', overflow: 'hidden',
  }}>
    {/* left accent bar */}
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
      background: `linear-gradient(to bottom, ${T.accent}, ${T.accentMid})`,
      borderRadius: 2,
    }} />
    <div style={{ paddingLeft: 6 }}>
      <div style={{ fontSize: 9, fontFamily: T.fontMono, color: T.textMuted, letterSpacing: '0.1em', marginBottom: 3 }}>
        {icon}  {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 11, fontWeight: 500, color: T.textPrimary, fontFamily: T.fontBody, lineHeight: 1.3 }}>
        {value}
      </div>
    </div>
  </div>
);

/* ─── StatusDot ─────────────────────────────────────────────────────── */
const StatusDot = ({ label, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
    <div style={{
      width: 6, height: 6, borderRadius: '50%',
      background: active ? '#34d399' : T.textMuted,
      boxShadow: active ? '0 0 6px #34d39988' : 'none',
    }} />
    <span style={{ fontSize: 9, fontFamily: T.fontMono, color: T.textMuted }}>{label}</span>
  </div>
);

/* ─── Main Component ────────────────────────────────────────────────── */
const GenieIntroScreen = ({ onContinue, user }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    injectFonts();
    // Added a 4th timer at 4200ms for the criteria message
    const timers = [600, 1800, 3000, 4200].map((d, i) =>
      setTimeout(() => setStep(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const firstName = user.name.split(' ')[0];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      position: 'relative',
      fontFamily: T.fontBody,
      overflowY: 'auto'
    }}>

      {/* ── Outer card ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
        margin: '0 auto',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 20,
        border: `1px solid ${T.border}`,
        background: T.surface,
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
      }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          borderBottom: `1px solid ${T.border}`,
          background: T.bg,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Logo mark */}
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: `linear-gradient(135deg, ${T.accent}, ${T.accentMid})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, boxShadow: `0 0 16px ${T.accentGlow}`,
            }}>✦</div>
            <div>
              <div style={{
                fontFamily: T.fontDisplay,
                fontSize: 14, fontWeight: 800,
                background: `linear-gradient(90deg, ${T.textPrimary}, ${T.accent})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.01em',
              }}>
                Learning Genie
              </div>
              <div style={{ fontFamily: T.fontMono, fontSize: 9, color: T.textMuted, letterSpacing: '0.08em' }}>
                AI CAREER ACCELERATION
              </div>
            </div>
          </div>
        </div>

        {/* ── Body: 80/20 grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '4fr 1fr',
          gap: 0,
          flex: 1,
          minHeight: 0,
        }}>

          {/* LEFT — Genie chat */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: 18,
            overflow: 'hidden',
            borderRight: `1px solid ${T.border}`,
          }}>
            {/* Section tag */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
            }}>
              <div style={{
                height: 1, flex: 1,
                background: `linear-gradient(to right, ${T.accent}44, transparent)`,
              }} />
              <span style={{ fontFamily: T.fontMono, fontSize: 9, color: T.accent, letterSpacing: '0.12em' }}>
                GENIE ASSESSMENT PROTOCOL
              </span>
              <div style={{
                height: 1, flex: 1,
                background: `linear-gradient(to left, ${T.accentMid}44, transparent)`,
              }} />
            </div>

            {/* Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, overflowY: 'auto' }}>
              {step >= 1 && (
                <ChatMessage index={0} text={`Hi ${firstName} — I'm your Learning Genie. I'll map your skill landscape and build a precision learning path, adapting in real-time as you grow.`} />
              )}
              {step >= 2 && (
                <ChatMessage index={1} text={`You've been with ${user.dept} for ${user.daysIn} days as ${user.role}. I've loaded your profile — your journey starts from exactly where you are.`} />
              )}
              {step >= 3 && (
                <ChatMessage index={2} text={`An 8-minute skill assessment will save you weeks of irrelevant training. Ready when you are. ✦`} />
              )}
              {step >= 4 && (
                <CriteriaMessage index={3} />
              )}
              {step < 4 && <TypingBubble />}
            </div>

            {/* CTA — now shown after step 4 */}
            {step >= 4 && (
              <div className="genie-fade-up" style={{ animationDelay: '300ms', opacity: 0 }}>
                <button
                  onClick={onContinue}
                  style={{
                    width: '100%',
                    padding: '11px 20px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: T.fontBody,
                    letterSpacing: '0.02em',
                    background: `linear-gradient(135deg, ${T.accent}, ${T.accentMid})`,
                    color: '#fff',
                    boxShadow: `0 4px 20px ${T.accentGlow}, 0 0 0 1px ${T.accent}44`,
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = `0 8px 28px ${T.accentGlow}, 0 0 0 1px ${T.accent}66`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${T.accentGlow}, 0 0 0 1px ${T.accent}44`;
                  }}
                >
                  Begin Skill Assessment ✦
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Profile */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 14,
            background: T.bg,
            overflow: 'hidden',
          }}>
            <div style={{
              fontFamily: T.fontMono, fontSize: 9, color: T.textMuted,
              letterSpacing: '0.12em', marginBottom: 12, paddingBottom: 8,
              borderBottom: `1px solid ${T.border}`,
            }}>
              YOUR PROFILE
            </div>

            {step >= 2 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['▸', 'Role', user.role, 0],
                  ['▸', 'Dept', user.dept, 80],
                  ['▸', 'Tenure', `${user.daysIn} days`, 160],
                  ['▸', 'Mentor', user.mentor, 240],
                ].map(([ic, l, v, d]) => (
                  <ProfileRow key={l} icon={ic} label={l} value={v} delay={d} />
                ))}
              </div>
            ) : (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <div style={{
                  width: 28, height: 28,
                  border: `2px solid ${T.borderAccent}`,
                  borderTop: `2px solid ${T.accent}`,
                  borderRadius: '50%',
                  animation: 'pulse-ring 1.2s linear infinite',
                }} />
                <span style={{ fontFamily: T.fontMono, fontSize: 9, color: T.textMuted, letterSpacing: '0.1em' }}>
                  LOADING…
                </span>
              </div>
            )}
          </div>

        </div>

        {/* ── Footer bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 18px',
          borderTop: `1px solid ${T.border}`,
          background: T.bg,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                width: 20, height: 3, borderRadius: 2,
                background: step >= i ? T.accent : T.border,
                transition: 'background 0.4s',
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GenieIntroScreen;