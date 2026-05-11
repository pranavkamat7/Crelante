import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Loader2, ArrowRight, RefreshCw } from "lucide-react";

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

/* ── Projects Data ── */
const FALLBACK = [
  {
    id: 1,
    title: "VectorShift",
    category: "Web App",
    description: "Complex workflow application featuring robust frontend components and backend logic for Directed Acyclic Graph (DAG) cycle detection.",
    tags: ["React", "FastAPI", "Python"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/business.png",
  },
  {
    id: 2,
    title: "The Deal Driven",
    category: "Web App",
    description: "High-performance e-commerce deployment featuring seamless DNS propagation, custom environment configurations, and optimized hosting.",
    tags: ["React", "Node.js", "Netlify"],
    github: "https://github.com",
    demo: "https://thedealdriven.com/",
    src: "/ecommerce.png",
  },
  {
    id: 3,
    title: "Healthy Mithai Integration",
    category: "SaaS",
    description: "Custom Shopify application integrating internal systems via secure API credentialing for streamlined store management.",
    tags: ["Shopify API", "Node.js", "React"],
    github: null,
    demo: "https://example.com",
    src: "/analytics.png",
  },
  {
    id: 4,
    title: "IoT Fleet Monitor",
    category: "IoT",
    description: "Real-time dashboard tracking connected sensors with alerts, analytics, and edge data processing.",
    tags: ["MQTT", "React", "Dashboards"],
    github: "https://github.com",
    demo: "https://example.com",
    src: "/analytics.png",
  },
  {
    id: 5,
    title: "Performance Ad Campaigns",
    category: "Digital Ads",
    description: "Data-driven marketing campaigns focused on high conversion rates and audience retargeting across Meta and Google.",
    tags: ["Meta Ads", "Google Ads", "Analytics"],
    github: null,
    demo: "https://example.com",
    src: "/social_media.png",
  },
  {
    id: 6,
    title: "Smart Home Controller",
    category: "IoT",
    description: "Web application to control smart home devices, automations, and energy usage in real time.",
    tags: ["Embedded C", "AWS", "React Native"],
    github: null,
    demo: "https://example.com",
    src: "/fitness.png",
  },
];

const CATEGORIES = ["All", "Web App", "IoT", "SaaS", "Digital Ads"];
const LIMIT = 6;

/* ── Project Card ── */
const ProjectCard = ({ project, index, visible }) => {
  return (
    <div
      className={`pj-card ${visible ? 'pj-in' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top line accent on hover */}
      <div className="pj-card-line" />

      {/* Image area */}
      <div className="pj-img-wrap">
        <img
          src={project.src}
          alt={project.title}
          className="pj-img"
          onError={e => { e.target.style.display = 'none'; }}
        />
        
        {/* Category badge */}
        <div className="pj-cat-badge">
          {project.category}
        </div>
        
        {/* Action icons */}
        <div className="pj-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="pj-action-btn"
              onClick={e => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="pj-action-btn pj-action-primary"
          >
            <ExternalLink size={16} />
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
            <span key={i} className="pj-tag">
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        <div className="pj-link">
          <span>View Project</span>
          <ArrowRight className="pj-link-arrow" size={16} />
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
    await new Promise(r => setTimeout(r, 600));
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ── Core Theme Colors ── */
        .pj-section {
          --crn-black: #0A0A0A;
          --crn-white: #FFFFFF;
          --crn-bg: #FFFFFF; /* Using pure white to alternate from Services */
          --crn-orange: #FF4E25;
          --crn-gray: #E5E5E5;
          --crn-text-gray: #666666;

          position: relative;
          background: var(--crn-bg);
          padding: 140px 24px;
          overflow: hidden;
          border-top: 1px solid var(--crn-gray);
        }

        /* ── HEADER ── */
        .pj-header {
          position: relative; 
          z-index: 2;
          text-align: center; 
          max-width: 680px;
          margin: 0 auto 56px;
          opacity: 0; 
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .pj-header.pj-in { opacity: 1; transform: translateY(0); }

        .pj-label {
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
        
        .pj-label-dot {
          width: 8px; height: 8px; 
          border-radius: 50%;
          background: var(--crn-orange); 
        }

        .pj-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4rem);
          font-weight: 800; 
          letter-spacing: -0.03em; 
          line-height: 1.05;
          color: var(--crn-black); 
          margin-bottom: 24px;
        }
        
        .pj-h2-accent {
          color: var(--crn-orange);
        }

        .pj-underline {
          width: 60px;
          height: 6px;
          background: var(--crn-black);
          margin: 0 auto 24px;
          border-radius: 4px;
        }

        .pj-sub {
          font-family: 'Manrope', sans-serif;
          font-size: 1.1rem; 
          font-weight: 500; 
          line-height: 1.6;
          color: var(--crn-text-gray);
        }

        /* ── FILTERS ── */
        .pj-filters {
          display: flex; 
          flex-wrap: wrap;
          justify-content: center; 
          gap: 12px;
          margin-top: 32px;
        }

        .pj-filter-btn {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem; 
          font-weight: 800;
          letter-spacing: 0.05em; 
          text-transform: uppercase;
          padding: 10px 24px; 
          border-radius: 8px;
          border: 1px solid var(--crn-gray);
          background: var(--crn-white);
          color: var(--crn-text-gray);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pj-filter-btn:hover {
          border-color: var(--crn-black);
          color: var(--crn-black);
        }
        .pj-filter-btn.active {
          color: var(--crn-white);
          background: var(--crn-black);
          border-color: var(--crn-black);
        }

        /* ── LOADING ── */
        .pj-loading {
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center;
          padding: 80px 0; 
          gap: 16px;
        }
        .pj-spinner {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 3px solid var(--crn-gray);
          border-top-color: var(--crn-orange);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .pj-loading-txt {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem; 
          font-weight: 800;
          text-transform: uppercase; 
          color: var(--crn-text-gray);
        }

        /* ── GRID ── */
        .pj-grid {
          max-width: 1200px; 
          margin: 0 auto;
          display: grid; 
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ── CARD ── */
        .pj-card {
          position: relative; 
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 16px;
          display: flex; 
          flex-direction: column;
          cursor: pointer;
          opacity: 0; 
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.8, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .pj-card.pj-in { opacity: 1; transform: translateY(0); }
        
        .pj-card:hover {
          border-color: var(--crn-black);
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
        }

        /* Top Accent Line */
        .pj-card-line {
          position: absolute;
          top: -1px; left: 24px; right: 24px;
          height: 3px;
          background: var(--crn-black);
          border-radius: 0 0 4px 4px;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(0.8, 0, 0.2, 1), background 0.3s ease;
          z-index: 10;
        }
        .pj-card:hover .pj-card-line {
          transform: scaleX(1);
          background: var(--crn-orange);
        }

        /* Image */
        .pj-img-wrap {
          position: relative; 
          height: 220px; 
          overflow: hidden;
          border-bottom: 1px solid var(--crn-gray);
          border-radius: 16px 16px 0 0;
          background: #F9F8F6;
        }
        .pj-img {
          width: 100%; 
          height: 100%; 
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .pj-card:hover .pj-img { transform: scale(1.05); }

        /* Category badge */
        .pj-cat-badge {
          position: absolute; 
          top: 16px; 
          left: 16px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem; 
          font-weight: 800;
          letter-spacing: 0.05em; 
          text-transform: uppercase;
          padding: 6px 12px; 
          border-radius: 8px;
          background: var(--crn-white);
          color: var(--crn-black);
          border: 1px solid var(--crn-gray);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        /* Action icons */
        .pj-actions {
          position: absolute; 
          top: 16px; 
          right: 16px;
          display: flex; 
          gap: 8px;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .pj-card:hover .pj-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .pj-action-btn {
          width: 36px; height: 36px; 
          border-radius: 8px;
          display: flex; 
          align-items: center; 
          justify-content: center;
          background: var(--crn-white);
          color: var(--crn-black);
          border: 1px solid var(--crn-gray);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.2s cubic-bezier(0.8, 0, 0.2, 1), background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .pj-action-btn:hover { 
          transform: scale(1.1); 
        }
        .pj-action-primary {
          background: var(--crn-black);
          color: var(--crn-white);
          border-color: var(--crn-black);
        }
        .pj-action-primary:hover {
          background: var(--crn-orange);
          border-color: var(--crn-orange);
        }

        /* Content */
        .pj-content { 
          padding: 24px; 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
        }

        .pj-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem; 
          font-weight: 800;
          letter-spacing: -0.02em; 
          color: var(--crn-black);
          margin-bottom: 8px; 
          line-height: 1.2;
        }
        .pj-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500; 
          line-height: 1.6;
          color: var(--crn-text-gray);
          margin-bottom: 20px; 
          flex: 1;
        }

        /* Tags */
        .pj-tags { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 8px; 
          margin-bottom: 24px; 
        }
        .pj-tag {
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem; 
          font-weight: 700;
          letter-spacing: 0.05em; 
          text-transform: uppercase;
          padding: 6px 12px; 
          border-radius: 6px; 
          background: #F9F8F6;
          color: var(--crn-text-gray);
          border: 1px solid var(--crn-gray);
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .pj-card:hover .pj-tag {
          border-color: var(--crn-black);
          color: var(--crn-black);
        }

        /* Link */
        .pj-link {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 800;
          color: var(--crn-black);
          transition: color 0.3s ease;
        }
        .pj-link-arrow {
          color: var(--crn-orange);
          transition: transform 0.3s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .pj-card:hover .pj-link { color: var(--crn-orange); }
        .pj-card:hover .pj-link-arrow { transform: translateX(6px); }

        /* ── BOTTOM ACTIONS ── */
        .pj-bottom {
          max-width: 1200px; 
          margin: 48px auto 0;
          display: flex; 
          flex-wrap: wrap;
          align-items: center; 
          justify-content: center; 
          gap: 16px;
        }

        .pj-toggle-btn {
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 800; 
          letter-spacing: 0.05em;
          color: var(--crn-black);
          background: var(--crn-white);
          border: 2px solid var(--crn-black);
          padding: 14px 28px; 
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pj-toggle-btn:hover {
          background: var(--crn-black);
          color: var(--crn-white);
          transform: translateY(-2px);
        }

        .pj-cta-btn {
          display: inline-flex; 
          align-items: center; 
          gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 800; 
          letter-spacing: 0.05em;
          color: var(--crn-white);
          background: var(--crn-black);
          border: none; 
          cursor: pointer; 
          text-decoration: none;
          padding: 16px 32px; 
          border-radius: 10px;
          transition: transform 0.2s cubic-bezier(0.8, 0, 0.2, 1), background 0.3s ease;
        }
        .pj-cta-btn:hover {
          background: var(--crn-orange);
          transform: translateY(-3px);
        }
        .pj-cta-btn:active { transform: scale(0.98); }

        .pj-refresh-btn {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem; 
          font-weight: 700;
          color: var(--crn-text-gray);
          background: none; 
          border: none;
          padding: 14px 20px; 
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .pj-refresh-btn:hover:not(:disabled) { color: var(--crn-black); }
        .pj-refresh-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Empty state */
        .pj-empty {
          text-align: center; 
          padding: 80px 24px;
        }
        .pj-empty-icon {
          font-size: 3rem; 
          margin-bottom: 16px;
          opacity: 0.5;
        }
        .pj-empty-txt {
          font-family: 'Manrope', sans-serif;
          font-size: 1rem; 
          font-weight: 500;
          color: var(--crn-text-gray); 
          margin-bottom: 16px;
        }
        .pj-empty-btn {
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 800;
          color: var(--crn-orange); 
          background: none; 
          border: none;
          cursor: pointer; 
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        /* ── STATS ROW ── */
        .pj-stats {
          max-width: 1200px; 
          margin: 80px auto 0;
          display: grid; 
          grid-template-columns: repeat(4, 1fr);
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.03);
          overflow: hidden;
        }
        .pj-stat {
          padding: 32px 16px;
          text-align: center;
          border-right: 1px solid var(--crn-gray);
          opacity: 0; 
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease, background 0.3s ease;
        }
        .pj-stat:last-child { border-right: none; }
        .pj-stat.pj-in { opacity: 1; transform: translateY(0); }
        .pj-stat:hover { background: #F9F8F6; }

        .pj-stat-n {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800; 
          letter-spacing: -0.03em;
          line-height: 1; 
          margin-bottom: 8px;
          color: var(--crn-black);
        }
        
        .pj-stat-l {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 800;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          color: var(--crn-text-gray);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) { 
          .pj-grid { grid-template-columns: repeat(2,1fr); } 
        }
        @media (max-width: 768px)  {
          .pj-grid { grid-template-columns: 1fr; }
          .pj-stats { grid-template-columns: repeat(2,1fr); }
          .pj-stat:nth-child(2) { border-right: none; }
          .pj-stat:nth-child(1), .pj-stat:nth-child(2) { border-bottom: 1px solid var(--crn-gray); }
          .pj-section { padding: 100px 20px; }
          .pj-bottom { flex-direction: column; align-items: stretch; }
          .pj-toggle-btn, .pj-cta-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <section id="projects" className="pj-section" ref={sectionRef}>

        {/* Header */}
        <div className={`pj-header ${visible ? 'pj-in' : ''}`}>
          <div className="pj-label">
            <span className="pj-label-dot" />
            04 · Case Studies
          </div>
          <h2 className="pj-h2">
            Featured <span className="pj-h2-accent">Projects.</span>
          </h2>
          <div className="pj-underline" />
          <p className="pj-sub">
            A selection of recent work engineered for scale, performance, and conversion.
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

        {/* Loading / Grid */}
        {loading ? (
          <div className="pj-loading">
            <div className="pj-spinner" />
            <span className="pj-loading-txt">Loading projects...</span>
          </div>
        ) : (
          <>
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
                  {showAll ? 'Show Less' : `View All ${projects.length} Projects`}
                </button>
              )}
              <a
                href="#contact"
                className="pj-cta-btn"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Start Your Project
                <ArrowRight size={18} />
              </a>
              <button
                className="pj-refresh-btn"
                onClick={load}
                disabled={loading}
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </>
        )}

        {/* Stats */}
        <div className="pj-stats">
          {[
            { n: `${projects.length}+`, l: 'Projects Delivered' },
            { n: '50+',  l: 'Active Clients'    },
            { n: '99%',  l: 'Satisfaction Rate'  },
            { n: '3+',   l: 'Years Building'   },
          ].map((s, i) => (
            <div
              key={i}
              className={`pj-stat ${visible ? 'pj-in' : ''}`}
              style={{ transitionDelay: `${(i * 100) + 200}ms` }}
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