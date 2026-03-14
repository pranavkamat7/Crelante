import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Loader2, ArrowRight, RefreshCw, Zap } from "lucide-react";

/* ── Intersection observer hook ── */
const useInView = (threshold = 0.05) => {
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

/* ── Fallback projects — updated for software/IoT/SaaS ── */
const FALLBACK = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web App",
    description: "Full-featured online store with payment integration, inventory management and live admin dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://thedealdriven.com/",
    src: "/ecommerce.png",
    accent: "pink",
  },
  {
    id: 2,
    title: "IoT Fleet Monitor",
    category: "IoT",
    description: "Real-time dashboard tracking 500+ connected sensors with alerts, analytics and edge data processing.",
    tags: ["MQTT", "React", "Node.js", "Charts"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/analytics.png",
    accent: "blue",
  },
  {
    id: 3,
    title: "SaaS Analytics Dashboard",
    category: "SaaS",
    description: "Multi-tenant analytics platform with custom reports, billing, role-based access and API integrations.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Auth"],
    github: null,
    demo: "https://example.com",
    src: "/business.png",
    accent: "violet",
  },
  {
    id: 4,
    title: "Restaurant Management System",
    category: "Web App",
    description: "End-to-end restaurant platform with online ordering, kitchen display, table management and POS.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/restraurant.jpg",
    accent: "blue",
  },
  {
    id: 5,
    title: "Smart Home Controller",
    category: "IoT",
    description: "Mobile + web app to control smart home devices, automations and energy usage in real time.",
    tags: ["Embedded C", "MQTT", "React Native", "AWS"],
    github: null,
    demo: "https://example.com",
    src: "/fitness.png",
    accent: "pink",
  },
  {
    id: 6,
    title: "CRM SaaS Platform",
    category: "SaaS",
    description: "Customer relationship management tool with pipelines, email automation, and team collaboration.",
    tags: ["Vue.js", "Django", "PostgreSQL", "Redis"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/social_media.png",
    accent: "violet",
  },
  {
    id: 7,
    title: "Fitness Tracking App",
    category: "Web App",
    description: "Fitness app with AI-powered workout plans, progress tracking, nutrition logging and community.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/fitness.png",
    accent: "blue",
  },
  {
    id: 8,
    title: "Industrial IoT Gateway",
    category: "IoT",
    description: "Edge computing gateway that aggregates sensor data from factory floors and streams to the cloud.",
    tags: ["C++", "Python", "MQTT", "Docker"],
    github: null,
    demo: "https://example.com",
    src: "/analytics.png",
    accent: "pink",
  },
  {
    id: 9,
    title: "HR Management SaaS",
    category: "SaaS",
    description: "Complete HR platform — attendance, payroll, leave management, onboarding and performance reviews.",
    tags: ["React", "Node.js", "PostgreSQL", "Auth"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/business.png",
    accent: "violet",
  },
  {
    id: 10,
    title: "Inventory Management System",
    category: "Web App",
    description: "Real-time inventory tracking with barcode scanning, supplier management and automated reordering.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/ecommerce.png",
    accent: "blue",
  },
];

const CATEGORIES = ["All", "Web App", "IoT", "SaaS"];
const LIMIT = 6;

/* ── accent helpers ── */
const ACCENTS = {
  pink:   { border: 'rgba(240,32,184,0.28)',  bg: 'rgba(240,32,184,0.06)',  glow: 'rgba(240,32,184,0.12)', tag: 'rgba(240,32,184,0.12)',  tagText: 'rgba(240,130,210,0.85)', tagBorder: 'rgba(240,32,184,0.2)',  dot: '#f020b8', label: 'rgba(240,120,210,0.75)' },
  blue:   { border: 'rgba(58,184,245,0.28)',   bg: 'rgba(58,184,245,0.06)',   glow: 'rgba(58,184,245,0.12)',  tag: 'rgba(58,184,245,0.1)',   tagText: 'rgba(100,210,250,0.85)', tagBorder: 'rgba(58,184,245,0.2)',   dot: '#3ab8f5', label: 'rgba(100,210,250,0.75)' },
  violet: { border: 'rgba(123,47,255,0.28)',   bg: 'rgba(123,47,255,0.06)',   glow: 'rgba(123,47,255,0.12)',  tag: 'rgba(123,47,255,0.1)',   tagText: 'rgba(180,140,255,0.85)', tagBorder: 'rgba(123,47,255,0.2)',   dot: '#7b2fff', label: 'rgba(180,140,255,0.75)' },
};

/* ── Project Card ── */
const ProjectCard = ({ project, index, visible }) => {
  const [hov, setHov] = useState(false);
  const a = ACCENTS[project.accent];

  return (
    <div
      className="pj-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
        borderColor: hov ? a.border : 'rgba(255,255,255,0.06)',
        background: hov ? a.bg : 'rgba(255,255,255,0.022)',
        boxShadow: hov ? `0 20px 60px ${a.glow}` : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Top line beam on hover */}
      <div className="pj-card-beam" style={{
        background: `linear-gradient(90deg, transparent, ${a.dot}, transparent)`,
        opacity: hov ? 1 : 0,
      }} />

      {/* Image area */}
      <div className="pj-img-wrap" style={{ borderColor: hov ? a.border : 'rgba(255,255,255,0.05)' }}>
        <img
          src={project.src}
          alt={project.title}
          className="pj-img"
          onError={e => { e.target.style.display = 'none'; }}
        />
        {/* Gradient overlay */}
        <div className="pj-img-overlay" style={{
          background: `linear-gradient(to top, rgba(8,7,26,0.85) 0%, rgba(8,7,26,0.2) 60%, transparent 100%)`,
        }} />
        {/* Category badge */}
        <div className="pj-cat-badge" style={{ background: a.tag, borderColor: a.tagBorder, color: a.tagText }}>
          {project.category}
        </div>
        {/* Action icons */}
        <div className="pj-actions" style={{ opacity: hov ? 1 : 0 }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="pj-action-btn"
              onClick={e => e.stopPropagation()}
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <Github size={15} />
            </a>
          )}
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="pj-action-btn"
            style={{ background: a.dot, border: 'none' }}
          >
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="pj-content">
        <h3 className="pj-title">{project.title}</h3>
        <p className="pj-desc">{project.description}</p>

        {/* Tags */}
        <div className="pj-tags">
          {project.tags.map((t, i) => (
            <span key={i} className="pj-tag"
              style={{ background: a.tag, color: a.tagText, borderColor: a.tagBorder }}>
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        <div className="pj-link" style={{ color: a.label }}>
          <span>View Project</span>
          <ArrowRight size={13} style={{
            transform: hov ? 'translateX(5px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }} />
        </div>
      </div>
    </div>
  );
};

/* ── Main ── */
const Projects = () => {
  const [filter, setFilter]   = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showAll, setShowAll]   = useState(false);
  const [sectionRef, visible]   = useInView(0.05);

  const load = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setProjects(FALLBACK);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { setShowAll(false); }, [filter]);

  const filtered = filter === "All"
    ? (showAll ? projects : projects.slice(0, LIMIT))
    : projects.filter(p => p.category === filter);

  const showToggle = filter === "All" && projects.length > LIMIT;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .pj-section {
          --pink:   #f020b8;
          --blue:   #3ab8f5;
          --violet: #7b2fff;
          --bg:     #08071a;
          --text:   #f0eeff;
          --muted:  rgba(210,200,255,0.52);

          position: relative;
          background: var(--bg);
          padding: 120px 24px 130px;
          overflow: hidden;
        }

        /* Top beam */
        .pj-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240,32,184,0.5) 30%, rgba(58,184,245,0.5) 70%, transparent);
        }

        /* BG */
        .pj-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 40% at 5%  30%, rgba(240,32,184,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 95% 70%, rgba(58,184,245,0.06)  0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 50% 50%, rgba(123,47,255,0.04)  0%, transparent 60%);
        }
        .pj-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(240,32,184,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,184,245,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 90%);
        }

        /* ── HEADER ── */
        .pj-header {
          position: relative; z-index: 2;
          text-align: center; max-width: 680px;
          margin: 0 auto 56px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .pj-header.pj-in { opacity: 1; transform: translateY(0); }

        .pj-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(240,120,210,0.8); margin-bottom: 18px;
        }
        .pj-label-bar  { width:28px; height:1px; background: linear-gradient(90deg, var(--pink), transparent); }
        .pj-label-bar-r{ width:28px; height:1px; background: linear-gradient(90deg, transparent, var(--blue)); }

        .pj-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
          color: var(--text); margin-bottom: 16px;
        }
        .pj-h2-grad {
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 200% 200%;
          animation: pgFlow 5s ease infinite;
        }
        @keyframes pgFlow { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        .pj-sub {
          font-family: 'Manrope', sans-serif;
          font-size: 1rem; line-height: 1.7; color: var(--muted);
        }

        /* ── FILTERS ── */
        .pj-filters {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 8px;
          margin-top: 28px;
        }

        .pj-filter-btn {
          position: relative; overflow: hidden;
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 8px 20px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(190,185,240,0.6);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .pj-filter-btn:hover {
          color: rgba(210,205,255,0.9);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
        }
        .pj-filter-btn.active {
          color: #fff;
          background: linear-gradient(135deg, var(--pink), var(--violet), var(--blue));
          background-size: 200% 200%;
          animation: filterGrad 4s ease infinite;
          border-color: transparent;
          box-shadow: 0 6px 24px rgba(240,32,184,0.3);
        }
        @keyframes filterGrad { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        /* ── LOADING ── */
        .pj-loading {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 80px 0; gap: 16px;
          position: relative; z-index: 2;
        }
        .pj-spinner {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(240,32,184,0.15);
          border-top-color: var(--pink);
          border-right-color: var(--blue);
          animation: spin 0.9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .pj-loading-txt {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted);
        }

        /* ── GRID ── */
        .pj-grid {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 16px;
        }

        /* ── CARD ── */
        .pj-card {
          position: relative; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          display: flex; flex-direction: column;
          cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pj-card:hover { transform: translateY(-6px); }

        .pj-card-beam {
          position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
          border-radius: 0 0 4px 4px; pointer-events: none;
          transition: opacity 0.3s ease;
        }

        /* Image */
        .pj-img-wrap {
          position: relative; height: 190px; overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s ease;
        }
        .pj-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .pj-card:hover .pj-img { transform: scale(1.06); }
        .pj-img-overlay {
          position: absolute; inset: 0; pointer-events: none;
        }

        /* Category badge */
        .pj-cat-badge {
          position: absolute; top: 12px; left: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 8px;
          border: 1px solid;
          backdrop-filter: blur(8px);
        }

        /* Action icons */
        .pj-actions {
          position: absolute; top: 12px; right: 12px;
          display: flex; gap: 7px;
          transition: opacity 0.25s ease;
        }
        .pj-action-btn {
          width: 30px; height: 30px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; background: rgba(0,0,0,0.5);
          border: 1px solid;
          backdrop-filter: blur(8px);
          text-decoration: none;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pj-action-btn:hover { transform: scale(1.15); }

        /* Content */
        .pj-content { padding: 20px 20px 18px; flex: 1; display: flex; flex-direction: column; gap: 0; }

        .pj-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem; font-weight: 800;
          letter-spacing: -0.02em; color: var(--text);
          margin-bottom: 8px; line-height: 1.2;
        }
        .pj-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem; font-weight: 400; line-height: 1.65;
          color: rgba(185,180,230,0.55);
          margin-bottom: 14px; flex: 1;
        }

        /* Tags */
        .pj-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 16px; }
        .pj-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.57rem; font-weight: 500;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 6px; border: 1px solid;
        }

        /* Link */
        .pj-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.04em;
          margin-top: auto;
        }

        /* ── BOTTOM ROW ── */
        .pj-bottom {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 40px auto 0;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: center; gap: 12px;
        }

        .pj-toggle-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em;
          color: rgba(200,195,250,0.8);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          padding: 11px 24px; border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pj-toggle-btn:hover {
          border-color: rgba(240,32,184,0.35);
          color: #f0eeff;
          background: rgba(240,32,184,0.06);
          box-shadow: 0 6px 20px rgba(240,32,184,0.1);
        }

        .pj-cta-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 9px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em;
          color: #fff;
          background: linear-gradient(135deg, var(--pink), var(--violet), var(--blue));
          background-size: 200% 200%; animation: pgFlow 4s ease infinite;
          border: none; cursor: pointer; text-decoration: none;
          padding: 12px 26px; border-radius: 12px;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .pj-cta-btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 12px 36px rgba(240,32,184,0.4);
        }
        .pj-cta-btn-sheen {
          position: absolute; top:0; left:-120%; width:55%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-18deg); transition: left 0.5s ease; pointer-events: none;
        }
        .pj-cta-btn:hover .pj-cta-btn-sheen { left: 150%; }

        .pj-refresh-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em;
          color: rgba(180,175,230,0.5);
          background: none; border: 1px solid rgba(255,255,255,0.06);
          padding: 11px 20px; border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .pj-refresh-btn:hover:not(:disabled) {
          color: rgba(200,195,250,0.8);
          border-color: rgba(255,255,255,0.12);
        }
        .pj-refresh-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Empty state */
        .pj-empty {
          position: relative; z-index: 2;
          text-align: center; padding: 80px 24px;
        }
        .pj-empty-icon {
          font-size: 3rem; margin-bottom: 16px;
          filter: grayscale(0.3) drop-shadow(0 0 20px rgba(240,32,184,0.3));
        }
        .pj-empty-txt {
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem; color: var(--muted); margin-bottom: 16px;
        }
        .pj-empty-btn {
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem; font-weight: 700;
          color: var(--pink); background: none; border: none;
          cursor: pointer; text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── STATS ROW ── */
        .pj-stats {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 56px auto 0;
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 12px;
        }
        .pj-stat {
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 24px 16px;
          text-align: center;
          transition: all 0.3s ease;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .pj-stat.pj-in { opacity: 1; transform: translateY(0); }
        .pj-stat:nth-child(1):hover { background: rgba(240,32,184,0.05); border-color: rgba(240,32,184,0.2); }
        .pj-stat:nth-child(2):hover { background: rgba(58,184,245,0.05);  border-color: rgba(58,184,245,0.2);  }
        .pj-stat:nth-child(3):hover { background: rgba(123,47,255,0.05);  border-color: rgba(123,47,255,0.2);  }
        .pj-stat:nth-child(4):hover { background: rgba(240,32,184,0.05); border-color: rgba(240,32,184,0.2); }

        .pj-stat-n {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 800; letter-spacing: -0.03em;
          line-height: 1; margin-bottom: 6px;
        }
        .pj-stat:nth-child(1) .pj-stat-n, .pj-stat:nth-child(4) .pj-stat-n {
          background: linear-gradient(135deg, var(--pink), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 14px rgba(240,32,184,0.4));
        }
        .pj-stat:nth-child(2) .pj-stat-n {
          background: linear-gradient(135deg, var(--blue), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 14px rgba(58,184,245,0.4));
        }
        .pj-stat:nth-child(3) .pj-stat-n {
          background: linear-gradient(135deg, var(--violet), var(--blue));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 14px rgba(123,47,255,0.4));
        }
        .pj-stat-l {
          font-family: 'Manrope', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: rgba(180,175,230,0.45);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) { .pj-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px)  {
          .pj-grid { grid-template-columns: 1fr; }
          .pj-stats { grid-template-columns: repeat(2,1fr); }
          .pj-section { padding: 80px 20px 90px; }
        }
      `}</style>

      <section id="projects" className="pj-section" ref={sectionRef}>
        <div className="pj-bg" />
        <div className="pj-grid-bg" />

        {/* Header */}
        <div className={`pj-header ${visible ? 'pj-in' : ''}`}>
          <div className="pj-label">
            <span className="pj-label-bar" />
            Our Work
            <span className="pj-label-bar-r" />
          </div>
          <h2 className="pj-h2">
            Featured <span className="pj-h2-grad">Projects</span>
          </h2>
          <p className="pj-sub">
            Real solutions we've shipped — from connected hardware to cloud platforms.
          </p>
          {/* Filters */}
          <div className="pj-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`pj-filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="pj-loading">
            <div className="pj-spinner" />
            <span className="pj-loading-txt">Loading projects...</span>
          </div>
        ) : (
          <>
            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="pj-grid">
                {filtered.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} visible={visible} />
                ))}
              </div>
            ) : (
              <div className="pj-empty">
                <div className="pj-empty-icon">🔍</div>
                <p className="pj-empty-txt">No projects in this category yet.</p>
                <button className="pj-empty-btn" onClick={() => setFilter("All")}>
                  View all projects
                </button>
              </div>
            )}

            {/* Bottom actions */}
            <div className="pj-bottom">
              {showToggle && (
                <button className="pj-toggle-btn" onClick={() => setShowAll(p => !p)}>
                  {showAll ? '↑ Show Less' : `View All ${projects.length}+ Projects`}
                </button>
              )}
              <a
                href="#contact"
                className="pj-cta-btn"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <span className="pj-cta-btn-sheen" />
                Start Your Project
                <ArrowRight size={15} />
              </a>
              <button
                className="pj-refresh-btn"
                onClick={load}
                disabled={loading}
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </>
        )}

        {/* Stats */}
        <div className="pj-stats">
          {[
            { n: `${projects.length}+`, l: 'Projects Completed' },
            { n: '50+',  l: 'Happy Clients'     },
            { n: '99%',  l: 'Satisfaction Rate'  },
            { n: '3+',   l: 'Years Experience'   },
          ].map((s, i) => (
            <div
              key={i}
              className={`pj-stat ${visible ? 'pj-in' : ''}`}
              style={{ transitionDelay: `${i * 100 + 400}ms` }}
            >
              <div className="pj-stat-n">{s.n}</div>
              <div className="pj-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
