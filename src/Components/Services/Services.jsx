import React, { useEffect, useRef, useState } from 'react';
import {
  Code, Cpu, Cloud, Smartphone, Megaphone, Search, ArrowRight, Zap
} from 'lucide-react';

/* ── Intersection observer hook ── */
const useInView = (threshold = 0.1) => {
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

/* ── Service data ── */
const SERVICES = [
  {
    icon: Code,
    tag: '01',
    title: 'Custom Software',
    subtitle: 'Development',
    desc: 'Clean, scalable web platforms engineered for performance and real-world impact. From MVP to enterprise scale.',
    pills: ['React', 'Node.js', 'Python', 'APIs'],
    featured: true,
  },
  {
    icon: Cpu,
    tag: '02',
    title: 'IoT Solutions',
    subtitle: 'Hardware + Software',
    desc: 'End-to-end connected systems. We build the firmware, edge computing, and cloud dashboards that make devices intelligent.',
    pills: ['Embedded C', 'MQTT', 'Edge AI', 'Dashboards'],
  },
  {
    icon: Cloud,
    tag: '03',
    title: 'SaaS Platforms',
    subtitle: 'Cloud Products',
    desc: 'Multi-tenant cloud applications built to serve thousands of users with reliability, authentication, and billing baked in.',
    pills: ['Multi-tenant', 'Auth', 'Billing', 'Analytics'],
  },
  {
    icon: Smartphone,
    tag: '04',
    title: 'Native Mobile Apps',
    subtitle: 'iOS & Android',
    desc: 'Fast, intuitive, and engaging mobile experiences designed to put your business directly in your customers\' pockets.',
    pills: ['React Native', 'Swift', 'Kotlin', 'App Store'],
  },
  {
    icon: Megaphone,
    tag: '05',
    title: 'Performance Ads',
    subtitle: 'Growth Marketing',
    desc: 'Data-driven ad campaigns across Meta and Google. We don\'t just drive traffic; we focus on conversions and lowering CPA.',
    pills: ['Meta Ads', 'Google Ads', 'Retargeting', 'Conversion'],
  },
  {
    icon: Search,
    tag: '06',
    title: 'Google Services',
    subtitle: 'Visibility & Setup',
    desc: 'Comprehensive Google Business setup, local SEO, and Workspace integration to establish your brand\'s authority online.',
    pills: ['Google Business', 'Local SEO', 'Analytics', 'Workspace'],
  },
];

/* ── Service Card ── */
const ServiceCard = ({ s, i, visible }) => {
  return (
    <div
      className={`sv-card ${s.featured ? 'sv-featured' : ''} ${visible ? 'sv-in' : ''}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      {/* Top line accent */}
      <div className="sv-card-line" />

      {/* Top row */}
      <div className="sv-card-top">
        <span className="sv-tag">{s.tag}</span>
        <div className="sv-icon-wrap">
          <s.icon size={22} />
        </div>
      </div>

      {/* Title */}
      <div className="sv-card-title">
        <div className="sv-title-main">{s.title}</div>
        <div className="sv-title-sub">{s.subtitle}</div>
      </div>

      {/* Description */}
      <p className="sv-desc">{s.desc}</p>

      {/* Pills */}
      <div className="sv-pills">
        {s.pills.map((p, pi) => (
          <span key={pi} className="sv-pill">{p}</span>
        ))}
      </div>

      {/* Bottom link */}
      <div className="sv-link">
        <span>Learn More</span>
        <span className="sv-link-arrow">
          <ArrowRight size={16} />
        </span>
      </div>
    </div>
  );
};

/* ── Main ── */
const Services = () => {
  const [sectionRef, visible] = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ── Core Theme Colors ── */
        .sv-section {
          --crn-black: #0A0A0A;
          --crn-white: #FFFFFF;
          --crn-bg: #F9F8F6; /* Slightly off-white to contrast with the About section */
          --crn-orange: #FF4E25;
          --crn-gray: #E5E5E5;
          --crn-text-gray: #666666;

          position: relative;
          background: var(--crn-bg);
          padding: 140px 24px;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .sv-header {
          position: relative; 
          z-index: 2;
          text-align: center;
          max-width: 680px; 
          margin: 0 auto 72px;
          opacity: 0; 
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .sv-header.sv-in { opacity: 1; transform: translateY(0); }

        .sv-label {
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
          margin-bottom: 24px;
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          color: var(--crn-black);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .sv-label-dot {
          width: 8px; height: 8px; 
          border-radius: 50%;
          background: var(--crn-orange); 
        }

        .sv-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--crn-black);
          margin-bottom: 24px;
        }
        
        .sv-h2-accent {
          color: var(--crn-orange);
        }

        .sv-underline {
          width: 60px;
          height: 6px;
          background: var(--crn-black);
          margin: 0 auto 24px;
          border-radius: 4px;
        }

        .sv-sub {
          font-family: 'Manrope', sans-serif;
          font-size: 1.1rem; 
          font-weight: 500; 
          line-height: 1.6;
          color: var(--crn-text-gray);
        }

        /* ── GRID ── */
        .sv-grid {
          position: relative; 
          z-index: 2;
          max-width: 1200px; 
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── CARD ── */
        .sv-card {
          position: relative; 
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 16px;
          padding: 32px 24px;
          display: flex; 
          flex-direction: column;
          opacity: 0; 
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.8, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .sv-card.sv-in { opacity: 1; transform: translateY(0); }

        .sv-card:hover {
          border-color: var(--crn-black);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
        }

        /* Top Line Accent */
        .sv-card-line {
          position: absolute;
          top: -1px; left: 24px; right: 24px;
          height: 3px;
          background: var(--crn-black);
          border-radius: 0 0 4px 4px;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.8, 0, 0.2, 1), background 0.3s ease;
        }
        .sv-card:hover .sv-card-line {
          transform: scaleX(1);
          background: var(--crn-orange);
        }

        /* Top row */
        .sv-card-top {
          display: flex; 
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .sv-tag {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; 
          font-weight: 800;
          color: var(--crn-gray);
          transition: color 0.3s ease;
        }
        .sv-card:hover .sv-tag { color: var(--crn-orange); }

        .sv-icon-wrap {
          width: 48px; height: 48px; 
          border-radius: 12px;
          display: flex; 
          align-items: center; 
          justify-content: center;
          background: #F2F2F2;
          color: var(--crn-black);
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .sv-card:hover .sv-icon-wrap {
          background: var(--crn-black);
          color: var(--crn-white);
          transform: rotate(-5deg) scale(1.05);
        }

        /* Title block */
        .sv-card-title { margin-bottom: 16px; }
        .sv-title-main {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem; 
          font-weight: 800;
          letter-spacing: -0.02em; 
          color: var(--crn-black);
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .sv-title-sub {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 800;
          letter-spacing: 0.05em; 
          text-transform: uppercase;
          color: var(--crn-orange);
        }

        /* Desc */
        .sv-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500; 
          line-height: 1.6;
          color: var(--crn-text-gray);
          margin-bottom: 24px; 
          flex: 1;
        }

        /* Pills */
        .sv-pills {
          display: flex; 
          flex-wrap: wrap; 
          gap: 8px;
          margin-bottom: 32px;
        }
        .sv-pill {
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem; 
          font-weight: 700;
          letter-spacing: 0.05em; 
          text-transform: uppercase;
          padding: 6px 12px; 
          border-radius: 6px;
          background: var(--crn-bg);
          color: var(--crn-text-gray);
          border: 1px solid var(--crn-gray);
          transition: all 0.2s ease;
        }
        .sv-card:hover .sv-pill {
          border-color: var(--crn-black);
          color: var(--crn-black);
        }

        /* Link */
        .sv-link {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 800;
          color: var(--crn-black);
          cursor: pointer;
          width: fit-content;
          transition: color 0.3s ease;
        }
        
        .sv-link-arrow {
          display: inline-flex;
          color: var(--crn-orange);
          transition: transform 0.3s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .sv-card:hover .sv-link { color: var(--crn-orange); }
        .sv-card:hover .sv-link-arrow { transform: translateX(6px); }

        /* ── CTA BANNER ── */
        .sv-cta {
          position: relative; 
          z-index: 2;
          max-width: 1200px; 
          margin: 64px auto 0;
          background: var(--crn-black);
          border-radius: 20px;
          padding: 48px;
          display: flex; 
          align-items: center;
          justify-content: space-between; 
          gap: 32px;
          opacity: 0; 
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.4s;
          box-shadow: 0 24px 48px rgba(0,0,0,0.1);
        }
        .sv-cta.sv-in { opacity: 1; transform: translateY(0); }

        .sv-cta-left { position: relative; z-index: 1; }
        
        .sv-cta-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 800;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          color: var(--crn-orange); 
          margin-bottom: 12px;
          display: flex; 
          align-items: center; 
          gap: 8px;
        }

        .sv-cta-h {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 800; 
          letter-spacing: -0.02em;
          color: var(--crn-white); 
          margin-bottom: 12px;
        }
        
        .sv-cta-p {
          font-family: 'Manrope', sans-serif;
          font-size: 1rem; 
          font-weight: 500;
          color: #A0A0A0; 
          line-height: 1.6;
          max-width: 540px;
        }

        .sv-cta-btn {
          position: relative; 
          flex-shrink: 0;
          display: inline-flex; 
          align-items: center; 
          gap: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 800; 
          letter-spacing: 0.05em;
          color: var(--crn-white);
          background: var(--crn-orange);
          border: none; 
          cursor: pointer; 
          text-decoration: none;
          padding: 16px 32px; 
          border-radius: 10px;
          transition: transform 0.2s cubic-bezier(0.8, 0, 0.2, 1), background 0.3s ease;
        }
        
        .sv-cta-btn:hover {
          background: #E03E15;
          transform: translateY(-3px);
        }
        .sv-cta-btn:active { transform: scale(0.98); }
        
        .sv-cta-btn-arrow {
          display: inline-flex;
          transition: transform 0.3s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .sv-cta-btn:hover .sv-cta-btn-arrow { transform: translateX(4px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .sv-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-section { padding: 100px 20px; }
          .sv-cta { flex-direction: column; align-items: flex-start; padding: 32px 24px; }
          .sv-cta-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <section id="services" className="sv-section" ref={sectionRef}>
        
        {/* Header */}
        <div className={`sv-header ${visible ? 'sv-in' : ''}`}>
          <div className="sv-label">
            <span className="sv-label-dot" />
            03 · Capabilities
          </div>
          <h2 className="sv-h2">
            What We <span className="sv-h2-accent">Build.</span>
          </h2>
          <div className="sv-underline" />
          <p className="sv-sub">
            From connected hardware and enterprise software to data-driven growth marketing. We provide everything you need to scale.
          </p>
        </div>

        {/* Cards grid */}
        <div className="sv-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} visible={visible} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className={`sv-cta ${visible ? 'sv-in' : ''}`}>
          <div className="sv-cta-left">
            <div className="sv-cta-tag">
              <Zap size={14} />
              Ready to scale?
            </div>
            <div className="sv-cta-h">Have a project in mind?</div>
            <p className="sv-cta-p">
              Whether you need a full-scale web platform, an IoT integration, or a high-converting ad campaign, we can architect the perfect solution.
            </p>
          </div>
          <a
            href="#contact"
            className="sv-cta-btn"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Let's Talk
            <span className="sv-cta-btn-arrow"><ArrowRight size={18} /></span>
          </a>
        </div>

      </section>
    </>
  );
};

export default Services;