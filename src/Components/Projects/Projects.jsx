import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Github,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Globe,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const useInView = (threshold = 0.05) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const PROJECTS = [
  {
    id: 1,
    title: "VectorShift",
    category: "Web App",
    status: "Workflow Engine",
    live: false,
    description:
      "Complex workflow application featuring robust frontend components and backend logic for Directed Acyclic Graph (DAG) cycle detection.",
    highlights: [
      "Interactive node-based pipeline builder with live edge validation",
      "FastAPI backend service performing real-time DAG cycle checks",
      "Modular React component system engineered for extensible nodes",
    ],
    tags: ["React", "FastAPI", "Python"],
    github: "https://github.com/topics/workflow-automation",
    demo: "https://reactflow.dev/",
    relatedLinks: [
      { label: "React Flow DAGs", url: "https://reactflow.dev/", type: "external" },
      { label: "FastAPI Docs", url: "https://fastapi.tiangolo.com/", type: "docs" },
      { label: "GitHub Workflows", url: "https://github.com/topics/workflow-automation", type: "github" },
    ],
    src: "/business.png",
  },
  {
    id: 2,
    title: "The Deal Driven",
    category: "Web App",
    status: "Live Client Project",
    live: true,
    description:
      "High-performance e-commerce deployment featuring seamless DNS propagation, custom environment configurations, and optimized hosting.",
    highlights: [
      "Conversion-focused storefront with blazing-fast page loads",
      "Custom domain DNS configuration, SSL, and production CI/CD",
      "Optimized asset delivery and responsive shopping experience",
    ],
    tags: ["React", "Node.js", "Netlify"],
    github: "https://github.com/topics/ecommerce-platform",
    demo: "https://thedealdriven.com/",
    relatedLinks: [
      { label: "Live Store", url: "https://thedealdriven.com/", type: "live" },
      { label: "Netlify Platform", url: "https://www.netlify.com/", type: "docs" },
      { label: "GitHub E-Commerce", url: "https://github.com/topics/ecommerce-platform", type: "github" },
    ],
    src: "/ecommerce.png",
  },
  {
    id: 3,
    title: "Healthy Mithai Integration",
    category: "SaaS",
    status: "Shopify Integration",
    live: false,
    description:
      "Custom Shopify application integrating internal systems via secure API credentialing for streamlined store management.",
    highlights: [
      "Secure OAuth & Admin API sync between Shopify and internal ERP",
      "Automated inventory, order fulfillment, and SKU catalog updates",
      "Custom merchant dashboard for real-time order diagnostics",
    ],
    tags: ["Shopify API", "Node.js", "React"],
    github: "https://github.com/topics/shopify-app",
    demo: "https://shopify.dev/docs/api",
    relatedLinks: [
      { label: "Shopify API Docs", url: "https://shopify.dev/docs/api", type: "docs" },
      { label: "Node.js Runtime", url: "https://nodejs.org/en/about", type: "docs" },
      { label: "GitHub Shopify Apps", url: "https://github.com/topics/shopify-app", type: "github" },
    ],
    src: "/analytics.png",
  },
  {
    id: 4,
    title: "IoT Fleet Monitor",
    category: "IoT",
    status: "Telemetry Platform",
    live: false,
    description:
      "Real-time dashboard tracking connected sensors with automated alerts, live analytics, and edge data processing.",
    highlights: [
      "Low-latency MQTT telemetry ingestion across distributed sensors",
      "Threshold-based anomaly detection with instant alerting",
      "Live fleet diagnostics and historical time-series visualizations",
    ],
    tags: ["MQTT", "React", "Dashboards"],
    github: "https://github.com/topics/iot-dashboard",
    demo: "https://thingsboard.io/iot-use-cases/fleet-tracking/",
    relatedLinks: [
      { label: "Fleet IoT Guide", url: "https://thingsboard.io/iot-use-cases/fleet-tracking/", type: "external" },
      { label: "MQTT Protocol", url: "https://mqtt.org/", type: "docs" },
      { label: "GitHub IoT", url: "https://github.com/topics/iot-dashboard", type: "github" },
    ],
    src: "/analytics.png",
  },
  {
    id: 5,
    title: "Performance Ad Campaigns",
    category: "Digital Ads",
    status: "Growth Marketing",
    live: false,
    description:
      "Data-driven marketing campaigns focused on high conversion rates, lower CPA, and precision audience retargeting across Meta and Google.",
    highlights: [
      "Full-funnel conversion tracking with Meta Pixel & GA4 events",
      "Iterative creative A/B testing to maximize return on ad spend",
      "Automated lookalike and dynamic retargeting audience segments",
    ],
    tags: ["Meta Ads", "Google Ads", "Analytics"],
    github: null,
    demo: "https://ads.google.com/home/",
    relatedLinks: [
      { label: "Google Ads", url: "https://ads.google.com/home/", type: "external" },
      { label: "Meta Business Ads", url: "https://www.facebook.com/business/ads", type: "external" },
      { label: "GA4 Analytics", url: "https://marketingplatform.google.com/about/analytics/", type: "docs" },
    ],
    src: "/social_media.png",
  },
  {
    id: 6,
    title: "Smart Home Controller",
    category: "IoT",
    status: "Connected Hardware",
    live: false,
    description:
      "Cross-platform app to control smart home devices, custom automations, and energy usage in real time.",
    highlights: [
      "Unified scene automation for lighting, climate, and security",
      "Real-time power consumption monitoring with smart schedules",
      "AWS IoT Core cloud sync paired with reliable local edge control",
    ],
    tags: ["Embedded C", "AWS", "React Native"],
    github: "https://github.com/topics/smart-home",
    demo: "https://www.home-assistant.io/",
    relatedLinks: [
      { label: "Home Assistant", url: "https://www.home-assistant.io/", type: "external" },
      { label: "AWS IoT Core", url: "https://aws.amazon.com/iot-core/", type: "docs" },
      { label: "GitHub Smart Home", url: "https://github.com/topics/smart-home", type: "github" },
    ],
    src: "/fitness.png",
  },
];

const CATEGORIES = ["All", "Web App", "IoT", "SaaS", "Digital Ads"];

const LinkTypeIcon = ({ type, size = 12 }) => {
  if (type === "github") return <Github size={size} />;
  if (type === "live") return <Globe size={size} />;
  if (type === "docs") return <BookOpen size={size} />;
  return <ExternalLink size={size} />;
};

const ProjectCard = ({ project, index, visible, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className="group relative glass-card border border-white/10 bg-neutral-900/45 hover:bg-neutral-900/75 hover:border-orange-500/40 hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)] flex flex-col cursor-pointer transition-all duration-500 ease-out overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 origin-left scale-x-0 group-hover:scale-x-100 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-300 z-20" />

      {/* Image Area */}
      <div className="relative h-[210px] overflow-hidden bg-neutral-950 border-b border-white/5">
        <img
          src={project.src}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

        {/* Category + Live badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="font-mono text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-white/10 text-white shadow-lg">
            {project.category}
          </span>
          {project.live && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1.5 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Action icons — always accessible on touch & desktop */}
        <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-90 group-hover:opacity-100 transition-all duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Related GitHub ecosystem for ${project.title}`}
              title="Related GitHub Resources"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-neutral-950/80 backdrop-blur-md text-white border border-white/15 hover:bg-neutral-800 hover:border-white/30 hover:scale-110 transition-all shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.live ? "Visit live site" : "Open related reference"} for ${project.title}`}
              title={project.live ? "Visit Live Site" : "Open Related Reference"}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-500 text-white border border-orange-400 hover:bg-orange-600 hover:scale-110 transition-all shadow-[0_0_15px_rgba(249,115,22,0.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="font-mono text-[10px] font-medium tracking-widest uppercase text-neutral-500 mb-1.5">
          {project.status}
        </div>
        <h3 className="text-xl font-bold text-white leading-tight tracking-tight mb-2.5 group-hover:text-orange-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((t, i) => (
            <span
              key={i}
              className="font-mono text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-md bg-neutral-950/90 border border-white/10 text-neutral-400 group-hover:border-white/20 group-hover:text-neutral-200 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Direct Related Links Strip */}
        <div className="pt-4 pb-4 mb-4 border-y border-white/5 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mr-1">
            Links
          </span>
          {project.relatedLinks.slice(0, 2).map((link, li) => (
            <a
              key={li}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-neutral-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all"
            >
              <LinkTypeIcon type={link.type} size={11} />
              <span>{link.label}</span>
              <ArrowUpRight size={11} className="opacity-60" />
            </a>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-orange-400 transition-colors"
          >
            <span>{project.live ? "Visit Live Site" : "Explore Reference"}</span>
            <ArrowUpRight
              size={15}
              className="text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
          >
            Details
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </article>
  );
};

const ProjectModal = ({ project, onClose, onInquire }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pj-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-neutral-950/80 border border-white/15 text-neutral-300 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/20 flex items-center justify-center transition-all"
        >
          <X size={18} />
        </button>

        {/* Modal Image */}
        <div className="relative h-56 overflow-hidden border-b border-white/10 bg-neutral-900">
          <img
            src={project.src}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/35 to-transparent" />
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-lg bg-neutral-900/90 border border-white/15 text-white">
              {project.category}
            </span>
            {project.live ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Client Site
              </span>
            ) : (
              <span className="font-mono text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-neutral-200">
                {project.status}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <h3 id="pj-modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key Highlights */}
          <div className="mb-6">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-3">
              Key Highlights
            </div>
            <ul className="space-y-2.5">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-3">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className="mb-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-3">
              Related Links
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {project.relatedLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all hover:-translate-y-0.5 ${
                    link.type === "live"
                      ? "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400/60"
                      : "bg-white/[0.03] border-white/10 hover:border-orange-500/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-orange-400 shrink-0">
                    <LinkTypeIcon type={link.type} size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-white truncate">
                      {link.label}
                    </span>
                    <span className="block font-mono text-[10px] text-neutral-400 truncate">
                      {link.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    </span>
                  </span>
                  <ArrowUpRight size={13} className="text-neutral-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-white/10">
            <button
              type="button"
              onClick={() => onInquire(project)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-[0_0_24px_rgba(249,115,22,0.3)]"
            >
              <Sparkles size={15} />
              Build Something Similar
              <ArrowRight size={15} />
            </button>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm transition-all"
              >
                {project.live ? "Open Live Site" : "Open Reference"}
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [sectionRef, visible] = useInView(0.05);

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] =
      cat === "All"
        ? PROJECTS.length
        : PROJECTS.filter((p) => p.category === cat).length;
    return acc;
  }, {});

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const handleInquire = (project) => {
    setSelectedProject(null);
    window.dispatchEvent(
      new CustomEvent("crelante:prefill-contact", {
        detail: { subject: `Project Inquiry: ${project.title}` },
      })
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className="relative py-32 px-6 overflow-hidden bg-neutral-950 border-t border-white/5"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-neutral-300">
              Case Studies
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Projects.
            </span>
          </h2>

          <div className="w-16 h-1.5 bg-orange-500 rounded-full mx-auto mb-6" />

          <p className="text-lg text-neutral-400 font-medium leading-relaxed mb-10">
            A selection of recent work engineered for scale, performance, and conversion. Click any project to inspect highlights and related links.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Filter projects">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                role="tab"
                aria-selected={filter === cat}
                key={cat}
                className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all ${
                  filter === cat
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "bg-neutral-900/50 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
                onClick={() => setFilter(cat)}
              >
                <span>{cat}</span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                    filter === cat
                      ? "bg-black/10 text-black"
                      : "bg-white/5 text-neutral-500"
                  }`}
                >
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              visible={visible}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all active:scale-95 shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Your Project
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Stats Row */}
        <div
          className={`mt-24 grid grid-cols-2 lg:grid-cols-4 glass-card border border-white/10 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/10 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { n: "50+", l: "Projects Delivered" },
            { n: "50+", l: "Active Clients" },
            { n: "99%", l: "Satisfaction Rate" },
            { n: "3+", l: "Years Building" },
          ].map((s, i) => (
            <div
              key={i}
              className="p-8 text-center bg-neutral-900/20 hover:bg-neutral-800/40 transition-colors"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-white leading-none mb-2">
                {s.n}
              </div>
              <div className="font-mono text-[10px] md:text-xs font-semibold tracking-widest uppercase text-neutral-500">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquire}
      />
    </section>
  );
};

export default Projects;
