import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* ── Animated Counter ── */
const useCounter = (target, duration = 2000, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const n = parseInt(target);
    let s = null;
    const tick = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 4)) * n));
      if (p < 1) requestAnimationFrame(tick); else setVal(n);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
};

const Stat = ({ number, label, delay, active, dark }) => {
  const count = useCounter(parseInt(number), 2000, active);
  const suffix = number.includes('%') ? '%' : number.includes('+') ? '+' : '';
  
  return (
    <div className={`crh-stat ${dark ? 'crh-stat-dark' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="crh-stat-n">{count}{suffix}</div>
      <div className="crh-stat-l">{label}</div>
    </div>
  );
};

/* ── Typewriter (Solid Colors) ── */
const WORDS = ['Software.', 'IoT Systems.', 'SaaS Platforms.', 'Digital Ads.', 'Google Services.'];
const Typewriter = ({ go }) => {
  const [wi, setWi] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);
  
  useEffect(() => {
    if (!go) return;
    const word = WORDS[wi];
    const t = setTimeout(() => {
      if (!del && txt.length < word.length) setTxt(word.slice(0, txt.length + 1));
      else if (!del && txt.length === word.length) setDel(true);
      else if (del && txt.length > 0) setTxt(txt.slice(0, -1));
      else { setDel(false); setWi((wi + 1) % WORDS.length); }
    }, del ? 40 : txt.length === word.length ? 2000 : 80);
    return () => clearTimeout(t);
  }, [txt, del, wi, go]);

  return (
    <span className="crh-tw">
      {txt}<span className="crh-cursor" />
    </span>
  );
};

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
const Hero = () => {
  const [on, setOn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 100);
    return () => clearTimeout(t);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const statData = [
    { number: '50+', label: 'Projects Shipped', dark: true },
    { number: '50+', label: 'Active Clients', dark: false },
    { number: '3+',  label: 'Years Building', dark: false },
    { number: '99%', label: 'System Uptime', dark: false },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ── Core Theme Colors ── */
        :root {
          --crn-black: #0A0A0A;
          --crn-white: #FFFFFF;
          --crn-bg: #F9F8F6;
          --crn-orange: #FF4E25;
          --crn-gray: #E5E5E5;
          --crn-text-gray: #666666;
        }

        .crh-section {
          position: relative;
          min-height: 100vh;
          display: flex; 
          align-items: center; 
          justify-content: center;
          background: var(--crn-bg);
          padding: 160px 24px 100px;
          overflow: hidden; /* Prevents mobile horizontal scroll */
        }

        /* ── Layout Grid ── */
        .crh-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 64px;
          align-items: center;
        }

        .crh-reveal {
          opacity: 0; 
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .crh-section.on .crh-reveal { 
          opacity: 1; 
          transform: translateY(0); 
        }

        /* ── LEFT COLUMN ── */
        .crh-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .crh-eyebrow {
          display: inline-flex; 
          align-items: center; 
          gap: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 800;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 50px;
          margin-bottom: 32px;
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          color: var(--crn-black);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .crh-ew-dot {
          width: 8px; height: 8px; 
          border-radius: 50%;
          background: var(--crn-orange); 
          flex-shrink: 0;
        }

        .crh-h1 {
          font-family: 'Syne', sans-serif;
          /* Adjusted clamp for better mobile fit */
          font-size: clamp(2.5rem, 6.5vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
          color: var(--crn-black);
        }

        .crh-h1-l1 { display: block; }
        .crh-h1-l2 { display: block; color: var(--crn-orange); }

        .crh-underline {
          display: block;
          width: 80px;
          height: 6px;
          background: var(--crn-black);
          margin: 16px 0 32px 0; /* Left aligned margin */
          border-radius: 4px;
        }

        .crh-tw { color: var(--crn-orange); position: relative; }

        .crh-cursor {
          display: inline-block;
          width: clamp(4px, 1vw, 8px);
          height: clamp(2.5rem, 6.5vw, 5.5rem);
          background-color: var(--crn-orange);
          vertical-align: text-bottom;
          margin-left: 8px;
          animation: solidBlink 1s step-end infinite;
        }
        @keyframes solidBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .crh-sub {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-weight: 500;
          line-height: 1.6;
          color: var(--crn-text-gray);
          max-width: 600px;
          margin-bottom: 48px;
        }
        
        .crh-hl { color: var(--crn-black); font-weight: 800; }
        .crh-hl-o { color: var(--crn-orange); font-weight: 800; }

        /* ── BUTTONS ── */
        .crh-btns {
          display: flex; 
          flex-wrap: wrap; 
          gap: 16px;
        }

        .crh-btn-p, .crh-btn-s {
          display: inline-flex; 
          align-items: center; 
          justify-content: center;
          gap: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 800; 
          letter-spacing: 0.05em;
          padding: 16px 36px; 
          border-radius: 10px;
          cursor: pointer; 
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease, transform 0.2s cubic-bezier(0.8, 0, 0.2, 1);
        }

        .crh-btn-p {
          color: var(--crn-white); 
          background: var(--crn-black);
          border: 2px solid var(--crn-black);
        }
        .crh-btn-p:hover {
          background: var(--crn-orange);
          border-color: var(--crn-orange);
          transform: translateY(-3px);
        }
        .crh-btn-p:active { transform: scale(0.98); }

        .crh-arrow {
          display: inline-flex;
          transition: transform 0.3s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .crh-btn-p:hover .crh-arrow { transform: translateX(6px) rotate(-45deg); }

        .crh-btn-s {
          color: var(--crn-black); 
          background: transparent;
          border: 2px solid var(--crn-black);
        }
        .crh-btn-s:hover {
          background: var(--crn-black);
          color: var(--crn-white);
          transform: translateY(-3px);
        }

        /* ── RIGHT COLUMN (BENTO STATS) ── */
        .crh-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Background Graphic Contained behind stats */
        .crh-bg-graphic {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          width: 600px;
          height: 600px;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .crh-section.on .crh-bg-graphic {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        
        .crh-circle {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid var(--crn-gray);
        }
        .crh-circle-1 { width: 100%; height: 100%; }
        .crh-circle-2 { width: 70%; height: 70%; border-style: dashed; }
        .crh-circle-dot {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 60px; height: 60px;
          background: radial-gradient(circle, var(--crn-orange) 0%, rgba(255,78,37,0) 70%);
          opacity: 0.3;
        }

        /* Bento Grid */
        .crh-stats-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }

        .crh-stat {
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 16px;
          padding: 40px 24px;
          text-align: center;
          box-shadow: 0 12px 32px rgba(0,0,0,0.03);
          opacity: 0; 
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease;
        }
        .crh-section.on .crh-stat { opacity: 1; transform: translateY(0); }
        .crh-stat:hover { border-color: var(--crn-black); }

        .crh-stat-dark {
          background: var(--crn-black);
          border-color: var(--crn-black);
        }
        .crh-stat-dark .crh-stat-n { color: var(--crn-white); }
        .crh-stat-dark .crh-stat-l { color: #A0A0A0; }
        .crh-stat-dark:hover { border-color: var(--crn-orange); }

        .crh-stat-n {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; 
          letter-spacing: -0.03em;
          line-height: 1; 
          margin-bottom: 12px;
          color: var(--crn-black);
        }
        .crh-stat-l {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem; 
          font-weight: 800;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          color: var(--crn-text-gray);
        }

        /* ── RESPONSIVE ── */
        @media(max-width: 1024px){
          .crh-container { gap: 40px; }
          .crh-stat { padding: 32px 16px; }
        }

        @media(max-width: 900px){
          .crh-section { padding: 140px 24px 80px; }
          .crh-container { grid-template-columns: 1fr; gap: 64px; }
          .crh-bg-graphic { display: none; } /* Hide graphic on mobile to keep it clean */
          
          /* Keep text left-aligned on mobile for a sleek editorial look */
          .crh-underline { margin-left: 0; }
          .crh-btns { flex-direction: column; align-items: stretch; width: 100%; max-width: 400px; }
          .crh-btn-p, .crh-btn-s { width: 100%; justify-content: center; }
        }

        @media(max-width: 480px){
          .crh-stats-grid { grid-template-columns: 1fr; } /* Stack stats on very small screens */
        }
      `}</style>

      <section id="home" className={`crh-section ${on ? 'on' : ''}`} ref={ref}>
        
        <div className="crh-container">
          {/* ── Left Content ── */}
          <div className="crh-left">
            <div className="crh-reveal crh-eyebrow" style={{ transitionDelay: '0ms' }}>
              <span className="crh-ew-dot" />
              01 · Innovation & Growth
            </div>

            <h1 className="crh-h1 crh-reveal" style={{ transitionDelay: '100ms' }}>
              <span className="crh-h1-l1">Crelante builds</span>
              <span className="crh-h1-l2">
                <Typewriter go={on} />
              </span>
            </h1>

            <div className="crh-underline crh-reveal" style={{ transitionDelay: '200ms' }} />

            <p className="crh-sub crh-reveal" style={{ transitionDelay: '300ms' }}>
              We engineer <span className="crh-hl">custom software</span>, intelligent <span className="crh-hl">IoT systems</span>, and scalable platforms. Beyond code, we drive business growth through <span className="crh-hl-o">targeted ad campaigns</span> and comprehensive <span className="crh-hl">Google Business</span> services.
            </p>

            <div className="crh-btns crh-reveal" style={{ transitionDelay: '400ms' }}>
              <a href="#contact" className="crh-btn-p" onClick={e => { e.preventDefault(); go('contact'); }}>
                Start a Project
                <span className="crh-arrow"><ArrowRight size={18} /></span>
              </a>
              <a href="#projects" className="crh-btn-s" onClick={e => { e.preventDefault(); go('projects'); }}>
                View Our Work
              </a>
            </div>
          </div>

          {/* ── Right Content (Bento Stats) ── */}
          <div className="crh-right">
            {/* Subtle Geometric Graphic */}
            <div className="crh-bg-graphic">
              <div className="crh-circle crh-circle-1" />
              <div className="crh-circle crh-circle-2" />
              <div className="crh-circle-dot" />
            </div>

            <div className="crh-stats-grid crh-reveal" style={{ transitionDelay: '500ms' }}>
              {statData.map((s, i) => (
                <Stat key={i} number={s.number} label={s.label} dark={s.dark} delay={(i * 100) + 600} active={on} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;