import React, { useEffect, useRef, useState } from 'react';
import { Target, Code, Zap, BarChart2 } from 'lucide-react';

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

const About = () => {
  const [sectionRef, visible] = useInView(0.1);

  const features = [
    {
      icon: <Target size={24} className="text-orange-500" />,
      title: 'STRATEGY FIRST',
      desc: 'Every project starts with deep research and clear direction.',
    },
    {
      icon: <Code size={24} className="text-orange-500" />,
      title: 'CUSTOM DEVELOPMENT',
      desc: 'Clean, scalable and future ready code. No shortcuts.',
    },
    {
      icon: <Zap size={24} className="text-orange-500" />,
      title: 'PERFORMANCE OBSESSED',
      desc: 'Fast loading seamless and optimized for every device.',
    },
    {
      icon: <BarChart2 size={24} className="text-orange-500" />,
      title: 'BUILT FOR GROWTH',
      desc: 'Designed to convert, engage and scale with your brand.',
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden border-t border-white/5 bg-neutral-950" ref={sectionRef}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 relative z-10 items-start">
        
        {/* Left Content */}
        <div className="flex flex-col">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 w-fit transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(255,78,37,0.8)]" />
            <span className="text-xs font-bold tracking-widest uppercase text-neutral-300">About Us</span>
          </div>

          <h2 className={`text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            We don't do <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">generic.</span>
          </h2>

          <div className={`w-16 h-1.5 bg-orange-500 rounded-full mb-8 transition-all duration-700 delay-300 origin-left ${visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />

          <p className={`text-lg md:text-xl text-neutral-400 font-medium leading-relaxed mb-4 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Your brand is <span className="text-white font-bold">unique</span>. Your digital presence should be too.
          </p>
          <p className={`text-lg text-neutral-400 font-medium leading-relaxed mb-12 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Based in Goa, we are a team of software engineers and growth strategists. We combine custom code, intelligent IoT systems, and data-driven marketing to build solutions that actually work for your specific business.
          </p>

          {/* Trust Badge */}
          <div className={`flex items-center gap-4 glass-card p-4 rounded-2xl w-fit transition-all duration-700 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 border border-orange-500/20">
              <span className="text-xl">✦</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">Trusted by 50+ partners locally & globally</div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-white z-30">A</div>
                <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-700 flex items-center justify-center text-[10px] font-bold text-white -ml-2 z-20">B</div>
                <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-orange-600 flex items-center justify-center text-[10px] font-bold text-white -ml-2 z-10">C</div>
                <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-600 flex items-center justify-center text-[10px] font-bold text-white -ml-2 z-0">+45</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-10">
          <h3 className={`text-4xl md:text-5xl font-black leading-tight tracking-tight transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            We focus on what actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">moves the needle.</span>
          </h3>

          <div className="flex flex-col gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className={`flex items-start gap-5 group transition-all duration-700 ease-out`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(20px)',
                  transitionDelay: `${400 + (i * 100)}ms`
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-neutral-900/50 border border-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 group-hover:bg-neutral-800 group-hover:border-orange-500/30">
                  {f.icon}
                </div>
                <div className="flex flex-col pt-1">
                  <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-2">{f.title}</h4>
                  <p className="text-base text-neutral-400 font-medium leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;