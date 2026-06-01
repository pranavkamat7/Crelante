import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Loader2, ArrowRight, RefreshCw } from "lucide-react";

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

const ProjectCard = ({ project, index, visible }) => {
  return (
    <div
      className={`group relative glass-card border border-white/5 bg-neutral-900/40 hover:bg-neutral-800/60 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(255,78,37,0.1)] flex flex-col cursor-pointer transition-all duration-500 ease-out overflow-hidden`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 origin-left scale-x-0 group-hover:scale-x-100 group-hover:bg-orange-500 transition-all duration-300 z-20" />

      {/* Image Area */}
      <div className="relative h-[220px] overflow-hidden bg-neutral-950 border-b border-white/5">
        <img
          src={project.src}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          onError={e => { e.target.style.display = 'none'; }}
        />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-white/10 text-white shadow-lg">
          {project.category}
        </div>
        
        {/* Action icons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-neutral-900/80 backdrop-blur-md text-white border border-white/10 hover:bg-neutral-800 hover:scale-110 transition-all shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-500 text-white border border-orange-400 hover:bg-orange-600 hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,78,37,0.5)]"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-black text-white leading-tight tracking-tight mb-2">{project.title}</h3>
        <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-6 flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t, i) => (
            <span key={i} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md bg-neutral-950 border border-white/5 text-neutral-500 group-hover:border-white/20 group-hover:text-neutral-300 transition-colors">
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        <div className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-orange-500 transition-colors mt-auto">
          View Project
          <ArrowRight size={16} className="text-neutral-500 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};

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
    <section id="projects" className="relative py-32 px-6 overflow-hidden bg-neutral-950 border-t border-white/5" ref={sectionRef}>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-neutral-300">Case Studies</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Projects.</span>
          </h2>
          
          <div className="w-16 h-1.5 bg-orange-500 rounded-full mx-auto mb-6" />

          <p className="text-lg text-neutral-400 font-medium leading-relaxed mb-10">
            A selection of recent work engineered for scale, performance, and conversion.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-full border transition-all ${
                  filter === cat 
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-neutral-900/50 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <span className="text-sm font-bold tracking-widest uppercase text-neutral-500">Loading projects...</span>
          </div>
        ) : (
          <>
            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} visible={visible} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 glass-card border border-white/5">
                <div className="text-5xl mb-4 opacity-50">🔍</div>
                <p className="text-neutral-400 font-medium mb-4">No projects in this category yet.</p>
                <button className="text-orange-500 font-bold hover:underline underline-offset-4" onClick={() => setFilter("All")}>
                  View all projects
                </button>
              </div>
            )}

            {/* Bottom actions */}
            <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4">
              {showToggle && (
                <button className="w-full md:w-auto px-8 py-4 text-sm font-bold tracking-widest uppercase text-white bg-neutral-900 border border-white/10 rounded-xl hover:bg-neutral-800 transition-colors" onClick={() => setShowAll(p => !p)}>
                  {showAll ? 'Show Less' : `View All ${projects.length} Projects`}
                </button>
              )}
              <a
                href="#contact"
                className="group w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors active:scale-95"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-neutral-500 hover:text-white transition-colors"
                onClick={load}
                disabled={loading}
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </>
        )}

        {/* Stats Row */}
        <div className={`mt-24 grid grid-cols-2 lg:grid-cols-4 glass-card border border-white/10 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/10 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { n: `${projects.length}+`, l: 'Projects Delivered' },
            { n: '50+',  l: 'Active Clients'    },
            { n: '99%',  l: 'Satisfaction Rate'  },
            { n: '3+',   l: 'Years Building'   },
          ].map((s, i) => (
            <div
              key={i}
              className="p-8 text-center bg-neutral-900/20 hover:bg-neutral-800/40 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-black text-white leading-none mb-2">{s.n}</div>
              <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-neutral-500">{s.l}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;