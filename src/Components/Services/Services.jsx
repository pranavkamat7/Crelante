import React, { useEffect, useRef, useState } from 'react';
import { Code, Cpu, Cloud, Smartphone, Megaphone, Search, ArrowRight, Zap } from 'lucide-react';

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

const ServiceCard = ({ s, i, visible }) => {
  return (
    <div
      className={`relative group flex flex-col p-8 glass-card border border-white/5 bg-neutral-900/40 hover:bg-neutral-800/60 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(255,78,37,0.1)] transition-all duration-500 ease-out`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${i * 100}ms`
      }}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-white/10 rounded-b-md transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100 group-hover:bg-orange-500" />

      {/* Top Row */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-bold text-neutral-600 group-hover:text-orange-500 transition-colors duration-300">{s.tag}</span>
        <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-white border border-white/5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:border-orange-400">
          <s.icon size={22} />
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <h3 className="text-2xl font-black text-white leading-tight tracking-tight mb-1">{s.title}</h3>
        <div className="text-xs font-bold tracking-widest uppercase text-orange-500">{s.subtitle}</div>
      </div>

      {/* Description */}
      <p className="text-neutral-400 font-medium leading-relaxed mb-8 flex-1">{s.desc}</p>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {s.pills.map((p, pi) => (
          <span key={pi} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/5 text-neutral-400 group-hover:border-white/20 transition-colors">
            {p}
          </span>
        ))}
      </div>

      {/* Learn More Link */}
      <div className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-orange-500 transition-colors mt-auto cursor-pointer">
        Learn More
        <ArrowRight size={16} className="text-neutral-500 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

const Services = () => {
  const [sectionRef, visible] = useInView(0.05);

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden bg-neutral-950 border-t border-white/5" ref={sectionRef}>
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN3YtNTMuMjU0aC01My4yNTR2NTMuMjU0aDUzLjI1NHptLTIuMzgxLTIuMzgxdm0tNDguNDkybTAtNDguNDkyaDQ4LjQ5MnY0OC40OTJoLTQ4LjQ5MnYtNDguNDkyeiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-black via-black to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className={`max-w-2xl mx-auto text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-neutral-300">Capabilities</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Build.</span>
          </h2>
          
          <div className="w-16 h-1.5 bg-orange-500 rounded-full mx-auto mb-6" />

          <p className="text-lg text-neutral-400 font-medium leading-relaxed">
            From connected hardware and enterprise software to data-driven growth marketing. We provide everything you need to scale.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} visible={visible} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className={`mt-24 glass-card border border-white/10 bg-neutral-900/60 p-10 md:p-14 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-orange-500 mb-4">
              <Zap size={14} /> Ready to scale?
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Have a project in mind?</h3>
            <p className="text-neutral-400 font-medium leading-relaxed max-w-xl">
              Whether you need a full-scale web platform, an IoT integration, or a high-converting ad campaign, we can architect the perfect solution.
            </p>
          </div>
          <a
            href="#contact"
            className="group shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Let's Talk
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;