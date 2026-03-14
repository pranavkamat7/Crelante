import React, { useEffect, useRef, useState } from 'react';
import {
  Code2, Cpu, Cloud, Globe, Shield, Layers,
  ArrowRight, Zap,
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
    icon: Code2,
    tag: '01',
    title: 'Custom Software',
    subtitle: 'Development',
    desc: 'Full-stack web and mobile applications engineered for performance, scale, and real-world impact. From MVP to enterprise.',
    pills: ['React', 'Node.js', 'Python', 'APIs'],
    color: 'pink',
    accent: '#f020b8',
    featured: true,
  },
  {
    icon: Cpu,
    tag: '02',
    title: 'IoT Solutions',
    subtitle: 'Hardware + Software',
    desc: 'End-to-end connected systems — firmware, edge computing, dashboards and cloud sync that make devices intelligent.',
    pills: ['Embedded C', 'MQTT', 'Edge AI', 'Dashboards'],
    color: 'blue',
    accent: '#3ab8f5',
  },
  {
    icon: Cloud,
    tag: '03',
    title: 'SaaS Products',
    subtitle: 'Cloud Platforms',
    desc: 'Multi-tenant cloud applications built to serve thousands of users with reliability, auth, billing and analytics baked in.',
    pills: ['Multi-tenant', 'Auth', 'Billing', 'Analytics'],
    color: 'violet',
    accent: '#7b2fff',
  },
  {
    icon: Globe,
    tag: '04',
    title: 'Web Applications',
    subtitle: 'Frontend + Backend',
    desc: 'Blazing-fast, beautiful web apps that users love. From landing pages to complex portals — pixel-perfect and responsive.',
    pills: ['Next.js', 'TypeScript', 'Tailwind', 'CMS'],
    color: 'blue',
    accent: '#3ab8f5',
  },
  {
    icon: Shield,
    tag: '05',
    title: 'Maintenance & DevOps',
    subtitle: 'Infrastructure',
    desc: 'CI/CD pipelines, cloud hosting, monitoring, security patches and 24/7 support so your product never goes dark.',
    pills: ['Docker', 'AWS', 'CI/CD', 'Monitoring'],
    color: 'violet',
    accent: '#7b2fff',
  },
  {
    icon: Layers,
    tag: '06',
    title: 'Digital Consulting',
    subtitle: 'Strategy + Architecture',
    desc: 'From idea to roadmap — we help you make the right technology decisions before writing a single line of code.',
    pills: ['Architecture', 'Audits', 'MVP Planning', 'Tech Stack'],
    color: 'pink',
    accent: '#f020b8',
  },
];

/* ── Service Card ── */
const ServiceCard = ({ s, i, visible }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = s.icon;

  return (
    <div
      className={`sv-card sv-card-${s.color} ${s.featured ? 'sv-featured' : ''} ${visible ? 'sv-in' : ''}`}
      style={{ transitionDelay: `${i * 90}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div className="sv-card-top">
        <span className="sv-tag">{s.tag}</span>
        <div className={`sv-icon-wrap sv-icon-${s.color}`}>
          <Icon size={22} />
        </div>
      </div>

      {/* Title */}
      <div className="sv-card-title">
        <div className="sv-title-main">{s.title}</div>
        <div className="sv-title-sub">{s.subtitle}</div>
      </div>

      {/* Divider */}
      <div className={`sv-divider sv-divider-${s.color}`} />

      {/* Description */}
      <p className="sv-desc">{s.desc}</p>

      {/* Pills */}
      <div className="sv-pills">
        {s.pills.map((p, pi) => (
          <span key={pi} className={`sv-pill sv-pill-${s.color}`}>{p}</span>
        ))}
      </div>

      {/* Bottom link */}
      <div className={`sv-link sv-link-${s.color}`}>
        <span>Learn More</span>
        <span className="sv-link-arrow">
          <ArrowRight size={14} />
        </span>
      </div>

      {/* Hover glow corner */}
      <div className="sv-corner-glow" style={{
        background: `radial-gradient(circle at 100% 100%, ${s.accent}22 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
      }} />
    </div>
  );
};

/* ── Main ── */
const Services = () => {
  const [sectionRef, visible] = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .sv-section {
          --pink:   #f020b8;
          --blue:   #3ab8f5;
          --violet: #7b2fff;
          --bg:     #08071a;
          --bg2:    #0e0c28;
          --text:   #f0eeff;
          --muted:  rgba(210,200,255,0.52);

          position: relative;
          background: var(--bg2);
          padding: 120px 24px 130px;
          overflow: hidden;
        }

        /* Top border beam */
        .sv-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent, rgba(58,184,245,0.5) 30%,
            rgba(240,32,184,0.5) 70%, transparent);
        }

        /* BG radials */
        .sv-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 60% 40% at 10% 20%, rgba(240,32,184,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(58,184,245,0.06)  0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(123,47,255,0.04)  0%, transparent 60%);
        }

        /* Grid */
        .sv-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(240,32,184,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,184,245,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 90%);
        }

        /* ── HEADER ── */
        .sv-header {
          position: relative; z-index: 2;
          text-align: center;
          max-width: 680px; margin: 0 auto 72px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .sv-header.sv-in { opacity: 1; transform: translateY(0); }

        .sv-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(240,120,210,0.8);
          margin-bottom: 18px;
        }
        .sv-label-bar {
          width: 28px; height: 1px;
          background: linear-gradient(90deg, var(--pink), transparent);
        }
        .sv-label-bar-r {
          width: 28px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--blue));
        }

        .sv-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--text);
          margin-bottom: 18px;
        }
        .sv-h2-grad {
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 200% 200%;
          animation: hgradFlow 5s ease infinite;
        }
        @keyframes hgradFlow { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        .sv-sub {
          font-family: 'Manrope', sans-serif;
          font-size: 1rem; font-weight: 400; line-height: 1.75;
          color: var(--muted);
        }

        /* ── GRID ── */
        .sv-grid {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── CARD ── */
        .sv-card {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px 24px 24px;
          display: flex; flex-direction: column; gap: 0;
          cursor: default;
          opacity: 0; transform: translateY(24px);
          transition:
            opacity 0.65s cubic-bezier(0.16,1,0.3,1),
            transform 0.65s cubic-bezier(0.16,1,0.3,1),
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }
        .sv-card.sv-in { opacity: 1; transform: translateY(0); }

        /* Featured card (first one) */
        .sv-card.sv-featured {
          background: rgba(240,32,184,0.04);
          border-color: rgba(240,32,184,0.18);
        }

        /* Hover states per color */
        .sv-card.sv-card-pink:hover {
          border-color: rgba(240,32,184,0.38);
          background: rgba(240,32,184,0.04);
          box-shadow: 0 16px 48px rgba(240,32,184,0.1), 0 0 0 1px rgba(240,32,184,0.08);
          transform: translateY(-5px);
        }
        .sv-card.sv-card-blue:hover {
          border-color: rgba(58,184,245,0.38);
          background: rgba(58,184,245,0.04);
          box-shadow: 0 16px 48px rgba(58,184,245,0.1), 0 0 0 1px rgba(58,184,245,0.08);
          transform: translateY(-5px);
        }
        .sv-card.sv-card-violet:hover {
          border-color: rgba(123,47,255,0.38);
          background: rgba(123,47,255,0.04);
          box-shadow: 0 16px 48px rgba(123,47,255,0.1), 0 0 0 1px rgba(123,47,255,0.08);
          transform: translateY(-5px);
        }

        /* Top shine line on hover */
        .sv-card::before {
          content: '';
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          border-radius: 0 0 4px 4px;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .sv-card-pink::before   { background: linear-gradient(90deg, transparent, var(--pink), transparent); }
        .sv-card-blue::before   { background: linear-gradient(90deg, transparent, var(--blue), transparent); }
        .sv-card-violet::before { background: linear-gradient(90deg, transparent, var(--violet), transparent); }
        .sv-card:hover::before  { opacity: 1; }

        /* Corner glow */
        .sv-corner-glow {
          position: absolute; inset: 0; pointer-events: none;
          border-radius: 20px;
          transition: opacity 0.3s ease;
        }

        /* Top row */
        .sv-card-top {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .sv-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.12em;
          color: rgba(180,175,230,0.35); font-weight: 500;
        }

        .sv-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease;
        }
        .sv-card:hover .sv-icon-wrap {
          transform: scale(1.12) rotate(-4deg);
        }
        .sv-icon-pink   { background: rgba(240,32,184,0.12); color: var(--pink);   box-shadow: 0 0 18px rgba(240,32,184,0.18); }
        .sv-icon-blue   { background: rgba(58,184,245,0.12);  color: var(--blue);   box-shadow: 0 0 18px rgba(58,184,245,0.18);  }
        .sv-icon-violet { background: rgba(123,47,255,0.12);  color: #a78bfa;       box-shadow: 0 0 18px rgba(123,47,255,0.18);  }
        .sv-card:hover .sv-icon-pink   { box-shadow: 0 0 28px rgba(240,32,184,0.35); }
        .sv-card:hover .sv-icon-blue   { box-shadow: 0 0 28px rgba(58,184,245,0.35); }
        .sv-card:hover .sv-icon-violet { box-shadow: 0 0 28px rgba(123,47,255,0.35); }

        /* Title block */
        .sv-card-title { margin-bottom: 14px; }
        .sv-title-main {
          font-family: 'Syne', sans-serif;
          font-size: 1.18rem; font-weight: 800;
          letter-spacing: -0.02em; color: var(--text);
          line-height: 1.1;
        }
        .sv-title-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(180,175,230,0.4); margin-top: 3px;
        }

        /* Divider */
        .sv-divider {
          height: 1px; width: 40px; border-radius: 2px;
          margin-bottom: 14px;
          transition: width 0.4s ease;
        }
        .sv-card:hover .sv-divider { width: 70px; }
        .sv-divider-pink   { background: linear-gradient(90deg, var(--pink), transparent); }
        .sv-divider-blue   { background: linear-gradient(90deg, var(--blue), transparent); }
        .sv-divider-violet { background: linear-gradient(90deg, var(--violet), transparent); }

        /* Desc */
        .sv-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.83rem; font-weight: 400; line-height: 1.7;
          color: rgba(190,185,230,0.5);
          margin-bottom: 16px; flex: 1;
        }

        /* Pills */
        .sv-pills {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-bottom: 20px;
        }
        .sv-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 9px; border-radius: 6px;
          border: 1px solid;
          transition: all 0.2s ease;
        }
        .sv-pill-pink   { color: rgba(240,120,210,0.75); background: rgba(240,32,184,0.07); border-color: rgba(240,32,184,0.15); }
        .sv-pill-blue   { color: rgba(100,210,250,0.75); background: rgba(58,184,245,0.07);  border-color: rgba(58,184,245,0.15);  }
        .sv-pill-violet { color: rgba(180,140,255,0.75); background: rgba(123,47,255,0.07);  border-color: rgba(123,47,255,0.15);  }
        .sv-card:hover .sv-pill-pink   { background: rgba(240,32,184,0.12); border-color: rgba(240,32,184,0.28); }
        .sv-card:hover .sv-pill-blue   { background: rgba(58,184,245,0.12);  border-color: rgba(58,184,245,0.28);  }
        .sv-card:hover .sv-pill-violet { background: rgba(123,47,255,0.12);  border-color: rgba(123,47,255,0.28);  }

        /* Link */
        .sv-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.77rem; font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          width: fit-content;
          transition: gap 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .sv-link:hover { gap: 10px; }
        .sv-link-pink   { color: rgba(240,120,210,0.75); }
        .sv-link-blue   { color: rgba(100,210,250,0.75); }
        .sv-link-violet { color: rgba(180,140,255,0.75); }
        .sv-card:hover .sv-link-pink   { color: var(--pink); }
        .sv-card:hover .sv-link-blue   { color: var(--blue); }
        .sv-card:hover .sv-link-violet { color: #a78bfa; }

        .sv-link-arrow {
          display: inline-flex;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .sv-card:hover .sv-link-arrow { transform: translateX(3px); }

        /* ── CTA BANNER ── */
        .sv-cta {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 48px auto 0;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 44px 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.75s ease 0.55s, transform 0.75s ease 0.55s;
        }
        .sv-cta.sv-in { opacity: 1; transform: translateY(0); }

        /* Animated gradient border */
        .sv-cta::before {
          content: '';
          position: absolute; inset: 0; border-radius: 24px; padding: 1px;
          background: linear-gradient(135deg,
            rgba(240,32,184,0.5), rgba(123,47,255,0.5), rgba(58,184,245,0.5));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          background-size: 200% 200%; animation: ctaBorder 5s ease infinite;
        }
        @keyframes ctaBorder { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        /* CTA glow bg */
        .sv-cta::after {
          content: '';
          position: absolute; inset: 0; border-radius: 24px; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 80% at 0%   50%, rgba(240,32,184,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 100% 50%, rgba(58,184,245,0.06)  0%, transparent 60%);
        }

        .sv-cta-left { position: relative; z-index: 1; }
        .sv-cta-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.63rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(240,120,210,0.7); margin-bottom: 8px;
          display: flex; align-items: center; gap: 7px;
        }
        .sv-cta-zap { color: var(--pink); }

        .sv-cta-h {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 800; letter-spacing: -0.025em;
          color: var(--text); margin-bottom: 8px;
        }
        .sv-cta-p {
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; font-weight: 400;
          color: var(--muted); line-height: 1.6;
          max-width: 500px;
        }

        .sv-cta-btn {
          position: relative; overflow: hidden; flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.86rem; font-weight: 700; letter-spacing: 0.05em;
          color: #fff;
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          background-size: 200% 200%; animation: ctaBtnGrad 4s ease infinite;
          border: none; cursor: pointer; text-decoration: none;
          padding: 14px 28px; border-radius: 14px;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          z-index: 1;
        }
        @keyframes ctaBtnGrad { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
        .sv-cta-btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 14px 42px rgba(240,32,184,0.4), 0 0 0 1px rgba(58,184,245,0.2);
        }
        .sv-cta-btn:active { transform: scale(0.97); }
        .sv-cta-btn-sheen {
          position: absolute; top:0; left:-120%; width:55%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-18deg); transition: left 0.5s ease;
          pointer-events: none;
        }
        .sv-cta-btn:hover .sv-cta-btn-sheen { left: 150%; }
        .sv-cta-btn-arrow {
          display: inline-flex;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .sv-cta-btn:hover .sv-cta-btn-arrow { transform: translateX(5px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .sv-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 640px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-section { padding: 80px 20px 90px; }
          .sv-cta { flex-direction: column; align-items: flex-start; padding: 28px 24px; }
          .sv-cta-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <section id="services" className="sv-section" ref={sectionRef}>
        <div className="sv-bg" />
        <div className="sv-grid-bg" />

        {/* Header */}
        <div className={`sv-header ${visible ? 'sv-in' : ''}`}>
          <div className="sv-label">
            <span className="sv-label-bar" />
            What We Do
            <span className="sv-label-bar-r" />
          </div>
          <h2 className="sv-h2">
            Our <span className="sv-h2-grad">Services</span>
          </h2>
          <p className="sv-sub">
            From embedded systems to cloud platforms — we engineer software that solves real problems.
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
              <Zap size={11} className="sv-cta-zap" />
              Custom Solutions
            </div>
            <div className="sv-cta-h">Have something specific in mind?</div>
            <p className="sv-cta-p">
              Every great product starts with a conversation. Tell us what you're building —
              we'll architect the right solution for you.
            </p>
          </div>
          <a
            href="#contact"
            className="sv-cta-btn"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span className="sv-cta-btn-sheen" />
            Let's Talk
            <span className="sv-cta-btn-arrow"><ArrowRight size={17} /></span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
