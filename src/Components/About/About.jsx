import React, { useEffect, useRef, useState } from 'react';
import { Target, Code, Zap, BarChart2 } from 'lucide-react';

/* ── Intersection observer hook ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ── Main ── */
const About = () => {
  const [sectionRef, visible] = useInView(0.1);

  // Features pulled directly from your creative layout
  const features = [
    {
      icon: <Target size={24} color="#FF4E25" />,
      title: 'STRATEGY FIRST',
      desc: 'Every project starts with deep research and clear direction.',
    },
    {
      icon: <Code size={24} color="#FF4E25" />,
      title: 'CUSTOM DEVELOPMENT',
      desc: 'Clean, scalable and future ready code. No shortcuts.',
    },
    {
      icon: <Zap size={24} color="#FF4E25" />,
      title: 'PERFORMANCE OBSESSED',
      desc: 'Fast loading seamless and optimized for every device.',
    },
    {
      icon: <BarChart2 size={24} color="#FF4E25" />,
      title: 'BUILT FOR GROWTH',
      desc: 'Designed to convert, engage and scale with your brand.',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ── Core Theme Colors ── */
        .ab-section {
          --crn-black: #0A0A0A;
          --crn-white: #FFFFFF;
          --crn-bg: #FFFFFF; /* Pure white for contrast against Hero */
          --crn-orange: #FF4E25;
          --crn-gray: #E5E5E5;
          --crn-text-gray: #666666;

          position: relative;
          background: var(--crn-bg);
          padding: 140px 24px;
          overflow: hidden;
          border-top: 1px solid var(--crn-gray);
        }

        .ab-inner {
          position: relative; 
          z-index: 2;
          max-width: 1200px; 
          margin: 0 auto;
          display: grid; 
          grid-template-columns: 1fr 1fr;
          gap: 80px; 
          align-items: start;
        }

        /* ── LEFT TEXT SIDE ── */
        .ab-left { 
          display: flex; 
          flex-direction: column; 
        }

        /* Section label */
        .ab-label {
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
          background: var(--crn-bg);
          border: 1px solid var(--crn-gray);
          color: var(--crn-black);
          width: fit-content;
          opacity: 0; 
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .ab-label.on { opacity: 1; transform: translateY(0); }
        
        .ab-label-dot {
          width: 8px; height: 8px; 
          border-radius: 50%;
          background: var(--crn-orange); 
        }

        /* Headings */
        .ab-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--crn-black);
          margin-bottom: 24px;
          opacity: 0; 
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.1s;
        }
        .ab-h2.on { opacity: 1; transform: translateY(0); }

        .ab-h2-accent { color: var(--crn-orange); }

        /* Accent Underline */
        .ab-underline {
          width: 60px;
          height: 6px;
          background: var(--crn-black);
          margin-bottom: 32px;
          border-radius: 4px;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.2s;
        }
        .ab-underline.on { opacity: 1; transform: scaleX(1); }

        /* Body text */
        .ab-p {
          font-family: 'Manrope', sans-serif;
          font-size: 1.1rem; 
          font-weight: 500; 
          line-height: 1.6;
          color: var(--crn-text-gray);
          margin-bottom: 16px;
          opacity: 0; 
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.3s;
        }
        .ab-p.on { opacity: 1; transform: translateY(0); }
        .ab-p:last-of-type { margin-bottom: 48px; }
        
        .ab-hl { color: var(--crn-orange); font-weight: 700; }

        /* Trust badge */
        .ab-trust {
          display: flex; 
          align-items: center; 
          gap: 16px;
          background: #F9F8F6;
          border: 1px solid var(--crn-gray);
          border-radius: 12px; 
          padding: 20px;
          opacity: 0; 
          transform: translateY(14px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.4s;
          max-width: 400px;
        }
        .ab-trust.on { opacity: 1; transform: translateY(0); }

        .ab-trust-icon {
          width: 48px; height: 48px; 
          border-radius: 8px; 
          flex-shrink: 0;
          background: var(--crn-black);
          color: var(--crn-white);
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 1.2rem;
        }

        .ab-trust-title {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem; 
          font-weight: 800; 
          color: var(--crn-black);
          margin-bottom: 6px;
        }

        /* Solid Avatars */
        .ab-avatars { display: flex; }
        .ab-av {
          width: 28px; height: 28px; 
          border-radius: 50%;
          border: 2px solid var(--crn-white);
          margin-left: -8px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 0.6rem; 
          font-weight: 800;
          font-family: 'Manrope', sans-serif;
          color: var(--crn-white);
        }
        .ab-av:first-child { margin-left: 0; }
        .ab-av-1 { background: var(--crn-black); }
        .ab-av-2 { background: var(--crn-text-gray); }
        .ab-av-3 { background: var(--crn-orange); }
        .ab-av-more { background: var(--crn-gray); color: var(--crn-black); border-color: var(--crn-white); }

        /* ── RIGHT GRAPHIC SIDE ── */
        .ab-right {
          display: flex; 
          flex-direction: column;
          gap: 40px;
        }

        .ab-right-h3 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--crn-black);
          opacity: 0; 
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.2s;
        }
        .ab-right-h3.on { opacity: 1; transform: translateY(0); }

        /* Feature List */
        .ab-features {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .ab-feat {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          opacity: 0; 
          transform: translateX(20px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .ab-features.on .ab-feat { opacity: 1; transform: translateX(0); }

        .ab-feat-icon-wrap {
          width: 56px; height: 56px; 
          border-radius: 12px;
          display: flex; 
          align-items: center; 
          justify-content: center;
          background: var(--crn-black);
          flex-shrink: 0;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        
        .ab-feat:hover .ab-feat-icon-wrap {
          transform: scale(1.05) rotate(-5deg);
          background: #1A1A1A;
        }

        .ab-feat-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 4px;
        }

        .ab-feat-title {
          font-family: 'Manrope', sans-serif;
          font-size: 1rem; 
          font-weight: 800;
          letter-spacing: 0.02em; 
          color: var(--crn-black);
        }
        
        .ab-feat-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500; 
          line-height: 1.5;
          color: var(--crn-text-gray);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .ab-inner { grid-template-columns: 1fr; gap: 80px; }
          .ab-right { gap: 32px; }
        }
        @media (max-width: 560px) {
          .ab-section  { padding: 100px 20px; }
          .ab-trust  { max-width: 100%; }
          .ab-feat { gap: 16px; }
          .ab-feat-icon-wrap { width: 48px; height: 48px; }
        }
      `}</style>

      <section id="about" className="ab-section" ref={sectionRef}>
        <div className="ab-inner">
          
          {/* ── LEFT ── */}
          <div className="ab-left">
            <div className={`ab-label ${visible ? 'on' : ''}`}>
              <span className="ab-label-dot" />
              02 · About Us
            </div>

            <h2 className={`ab-h2 ${visible ? 'on' : ''}`}>
              We don't do <br/>
              <span className="ab-h2-accent">generic.</span>
            </h2>

            <div className={`ab-underline ${visible ? 'on' : ''}`} />

            <p className={`ab-p ${visible ? 'on' : ''}`}>
              Your brand is <span className="ab-hl">unique</span>. Your digital presence should be too.
            </p>
            <p className={`ab-p ${visible ? 'on' : ''}`}>
              Based in Goa, we are a team of software engineers and growth strategists. We combine custom code, intelligent IoT systems, and data-driven marketing to build solutions that actually work for your specific business.
            </p>

            <div className={`ab-trust ${visible ? 'on' : ''}`}>
              <div className="ab-trust-icon">✦</div>
              <div>
                <div className="ab-trust-title">Trusted by 50+ partners locally & globally</div>
                <div className="ab-avatars">
                  <div className="ab-av ab-av-1">A</div>
                  <div className="ab-av ab-av-2">B</div>
                  <div className="ab-av ab-av-3">C</div>
                  <div className="ab-av ab-av-more">+45</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="ab-right">
            <h3 className={`ab-right-h3 ${visible ? 'on' : ''}`}>
              We focus on what actually <span className="ab-h2-accent">moves the needle.</span>
            </h3>

            <div className={`ab-features ${visible ? 'on' : ''}`}>
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="ab-feat" 
                  style={{ transitionDelay: visible ? `${0.3 + (i * 0.1)}s` : '0s' }}
                >
                  <div className="ab-feat-icon-wrap">{f.icon}</div>
                  <div className="ab-feat-text">
                    <div className="ab-feat-title">{f.title}</div>
                    <div className="ab-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;