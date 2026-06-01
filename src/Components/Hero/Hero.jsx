import React, { useEffect, useState } from 'react';
import { ArrowRight, Code, Cpu, LineChart, Terminal, CheckCircle2 } from 'lucide-react';

const WORDS = ['Software.', 'IoT Systems.', 'SaaS Platforms.', 'Digital Growth.'];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && text.length < currentWord.length) {
        setText(currentWord.slice(0, text.length + 1));
      } else if (!isDeleting && text.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    }, isDeleting ? 40 : text.length === currentWord.length ? 2000 : 80);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden selection:bg-orange-500/30">
      
      {/* Background Animated Orbs */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-900/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute -bottom-32 -right-64 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN3YtNTMuMjU0aC01My4yNTR2NTMuMjU0aDUzLjI1NHptLTIuMzgxLTIuMzgxdm0tNDguNDkybTAtNDguNDkyaDQ4LjQ5MnY0OC40OTJoLTQ4LjQ5MnYtNDguNDkyeiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-50" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center relative z-10 w-full">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(255,78,37,0.8)] animate-pulse" />
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-neutral-300">Engineering The Future</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-8 animate-slide-up [animation-delay:200ms]">
            <span className="block text-white mb-2">We Build</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 min-h-[1.2em]">
              {text}<span className="inline-block w-1 md:w-3 h-[0.8em] ml-2 md:ml-4 bg-orange-500 align-middle animate-[pulse_1s_step-end_infinite]" />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 font-medium leading-relaxed max-w-xl mb-12 animate-slide-up [animation-delay:400ms]">
            Crelante engineers <span className="text-white">custom software</span>, intelligent <span className="text-white">IoT systems</span>, and scalable platforms. We turn complex technical challenges into elegant solutions.
          </p>

          <div className="flex flex-wrap items-center gap-6 animate-slide-up [animation-delay:600ms]">
            <a href="#contact" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-lg font-bold rounded-xl overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10">Start a Project</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </a>
            
            <a href="#projects" className="inline-flex items-center justify-center px-8 py-5 text-white text-lg font-bold rounded-xl border-2 border-white/10 hover:bg-white/5 transition-all">
              View Our Work
            </a>
          </div>
        </div>

        {/* Right Content - Visual Heavy Area */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center animate-fade-in [animation-delay:800ms] mt-12 lg:mt-0">
          {/* Decorative glowing orb */}
          <div className="absolute w-[80%] h-[80%] bg-orange-500/20 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />

          {/* Main Floating Terminal Window */}
          <div className="absolute w-full max-w-md glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-20 hover:-translate-y-2 transition-transform duration-500">
            {/* Terminal Header */}
            <div className="bg-neutral-900/80 px-4 py-3 flex items-center gap-2 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs font-mono text-neutral-500 flex items-center justify-center gap-2">
                <Terminal size={12} /> root@crelante:~
              </div>
            </div>
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm md:text-base leading-loose text-neutral-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-orange-500">❯</span> 
                <span className="text-white">npm run build --platform=enterprise</span>
              </div>
              <div className="text-neutral-500 mb-2">Compiling optimized modules...</div>
              <div className="flex items-center gap-2 mb-2 text-green-400">
                <CheckCircle2 size={16} /> <span className="text-neutral-300">Auth module compiled in 1.2s</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-green-400">
                <CheckCircle2 size={16} /> <span className="text-neutral-300">IoT Edge workers bundled in 0.8s</span>
              </div>
              <div className="flex items-center gap-2 mb-4 text-green-400">
                <CheckCircle2 size={16} /> <span className="text-neutral-300">Database shards optimized</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-white">
                <span className="text-orange-500">❯</span> <span>System deployed successfully.</span>
                <span className="w-2 h-4 bg-orange-500 animate-pulse ml-1" />
              </div>
            </div>
          </div>

          {/* Floating Stat Badge 1 (Top Left) */}
          <div className="absolute top-[10%] left-[-5%] md:left-[5%] glass-card p-4 rounded-xl flex items-center gap-4 z-30 animate-float shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 border border-orange-500/30">
              <Code size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none mb-1">50<span className="text-orange-500">+</span></div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Projects Shipped</div>
            </div>
          </div>

          {/* Floating Stat Badge 2 (Bottom Right) */}
          <div className="absolute bottom-[10%] right-[-5%] md:right-[5%] glass-card p-4 rounded-xl flex items-center gap-4 z-30 animate-float-reverse shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <LineChart size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none mb-1">99<span className="text-indigo-400">%</span></div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">System Uptime</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;