import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ══════════════════════════════════════════
   COLORS FROM LOGO
   --pink:    #f020b8  (hot magenta)
   --blue:    #3ab8f5  (electric blue)
   --violet:  #7b2fff  (deep violet)
   --core:    #e91e8c  (glowing core pink)
   --bg:      #08071a  (deep dark)
══════════════════════════════════════════ */

/* ── Animated Counter ── */
const useCounter = (target, duration = 2000, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const n = parseInt(target);
    let s = null;
    const tick = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 4)) * n));
      if (p < 1) requestAnimationFrame(tick); else setVal(n);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
};

const Stat = ({ number, label, delay, active }) => {
  const count = useCounter(parseInt(number), 2200, active);
  const suffix = number.includes('%') ? '%' : number.includes('+') ? '+' : '';
  return (
    <div className="crh-stat on" style={{ transitionDelay: `${delay}ms` }}>
      <div className="crh-stat-n">{count}{suffix}</div>
      <div className="crh-stat-l">{label}</div>
    </div>
  );
};

/* ── Aurora Canvas (pink→blue from logo) ── */
const AuroraCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0, id;
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.003;
      [
        { r:240, g:32,  b:184, amp:0.16, freq:1.1, ph:0,   y:0.35, blur:120, a:0.18 },
        { r:58,  g:184, b:245, amp:0.13, freq:0.75,ph:2.0, y:0.55, blur:130, a:0.15 },
        { r:123, g:47,  b:255, amp:0.11, freq:1.4, ph:4.1, y:0.42, blur:100, a:0.13 },
        { r:233, g:30,  b:140, amp:0.09, freq:1.9, ph:1.3, y:0.62, blur:110, a:0.10 },
      ].forEach(w => {
        ctx.save(); ctx.filter = `blur(${w.blur}px)`;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const y = H * w.y
            + Math.sin(x / W * Math.PI * w.freq + t + w.ph) * H * w.amp
            + Math.sin(x / W * Math.PI * w.freq * 2.1 + t * 1.6 + w.ph) * H * w.amp * 0.35;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        ctx.fillStyle = `rgba(${w.r},${w.g},${w.b},${w.a})`; ctx.fill(); ctx.restore();
      });
      id = requestAnimationFrame(draw);
    };
    resize(); draw();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="crh-aurora" />;
};

/* ── Particle Net ── */
const ParticleNet = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, pts = [], mx = -999, my = -999, id;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight;
      pts = Array.from({ length: Math.max(30, Math.floor(W * H / 10000)) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4, a: Math.random() * 0.55 + 0.15,
        hue: Math.random() > 0.5 ? 'pink' : 'blue',
      }));
    };
    const onMove = e => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { p.vx += (dx / d) * 0.07; p.vy += (dy / d) * 0.07; }
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 0.9) { p.vx *= 0.9 / spd; p.vy *= 0.9 / spd; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        for (let j = i + 1; j < pts.length; j++) {
          const ex = pts[j].x - p.x, ey = pts[j].y - p.y, ed = Math.sqrt(ex*ex+ey*ey);
          if (ed < 140) {
            const alpha = 0.25 * (1 - ed / 140);
            const grad = ctx.createLinearGradient(p.x, p.y, pts[j].x, pts[j].y);
            grad.addColorStop(0, `rgba(240,32,184,${alpha})`);
            grad.addColorStop(1, `rgba(58,184,245,${alpha})`);
            ctx.beginPath(); ctx.strokeStyle = grad; ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
        const [r2, g, b] = p.hue === 'pink' ? [240, 32, 184] : [58, 184, 245];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r2},${g},${b},${p.a})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('mousemove', onMove);
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    return () => { cancelAnimationFrame(id); window.removeEventListener('mousemove', onMove); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="crh-particles" />;
};

/* ── Typewriter ── */
const WORDS = ['Software', 'IoT Systems', 'SaaS Products', 'The Future'];
const Typewriter = ({ go }) => {
  const [wi, setWi] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (!go) return;
    const word = WORDS[wi];
    const t = setTimeout(() => {
      if (!del && txt.length < word.length) setTxt(word.slice(0, txt.length + 1));
      else if (!del && txt.length === word.length) setDel(true);
      else if (del && txt.length > 0) setTxt(txt.slice(0, -1));
      else { setDel(false); setWi((wi + 1) % WORDS.length); }
    }, del ? 36 : txt.length === word.length ? 1900 : 68);
    return () => clearTimeout(t);
  }, [txt, del, wi, go]);
  return (
    <span className="crh-tw">
      <span>{txt}</span><span className="crh-cursor">|</span>
    </span>
  );
};

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
const Hero = () => {
  const [on, setOn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Trigger both hero reveal AND stats counter together after mount
    const t = setTimeout(() => setOn(true), 100);
    return () => clearTimeout(t);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const statData = [
    { number: '50+', label: 'Projects' },
    { number: '50+', label: 'Clients'  },
    { number: '3+',  label: 'Years'    },
    { number: '99%', label: 'Uptime'   },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ── TOKENS ── */
        .crh-section {
          --pink:    #f020b8;
          --pink2:   #f06292;
          --blue:    #3ab8f5;
          --blue2:   #2979ff;
          --violet:  #7b2fff;
          --core:    #e91e8c;
          --bg:      #08071a;
          --bg2:     #0d0b2a;
          --text:    #f0eeff;
          --muted:   rgba(210,200,255,0.55);

          position: relative;
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          overflow: hidden;
          background: var(--bg);
          padding: 130px 24px 100px;
          isolation: isolate;
        }

        /* ── BG LAYERS ── */
        .crh-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 110% 60% at 50% -10%, rgba(240,32,184,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 70%  55% at 95%  90%,  rgba(58,184,245,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 50%  40% at 2%   80%,  rgba(123,47,255,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 40%  30% at 50%  50%,  rgba(233,30,140,0.06) 0%, transparent 70%),
            var(--bg);
        }

        /* Scanline effect */
        .crh-scan {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
        }

        /* Grid */
        .crh-grid {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            linear-gradient(rgba(240,32,184,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,184,245,0.06) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 15%, transparent 85%);
        }

        .crh-aurora   { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; pointer-events: none; }
        .crh-particles{ position: absolute; inset: 0; z-index: 3; width: 100%; height: 100%; pointer-events: none; }

        /* Orbs */
        .crh-orb { position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none; z-index: 2; }
        .crh-o1 { width:650px;height:650px;top:-200px;left:-200px;  background:rgba(240,32,184,0.09); animation:o1 13s ease-in-out infinite; }
        .crh-o2 { width:550px;height:550px;bottom:-180px;right:-180px; background:rgba(58,184,245,0.09);  animation:o2 17s ease-in-out infinite; }
        .crh-o3 { width:350px;height:350px;top:45%;right:5%;       background:rgba(123,47,255,0.08); animation:o3 10s ease-in-out infinite; }
        @keyframes o1{0%,100%{transform:translate(0,0);}50%{transform:translate(50px,40px);}}
        @keyframes o2{0%,100%{transform:translate(0,0);}50%{transform:translate(-40px,-30px);}}
        @keyframes o3{0%,100%{transform:translate(0,0);}50%{transform:translate(20px,28px);}}

        /* ── CONTENT ── */
        .crh-body {
          position: relative; z-index: 10;
          max-width: 880px; margin: 0 auto;
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }

        .crh-reveal {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .crh-reveal.on { opacity: 1; transform: translateY(0); }

        /* ── EYEBROW ── */
        .crh-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.67rem; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 7px 20px;
          border-radius: 100px;
          margin-bottom: 32px;
          position: relative;
          background: rgba(240,32,184,0.06);
          border: 1px solid rgba(240,32,184,0.25);
          color: rgba(240,140,220,0.9);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        .crh-eyebrow::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(240,32,184,0.15), transparent);
          animation: eyebrowSheen 3s ease infinite;
        }
        @keyframes eyebrowSheen { 0%{left:-100%;} 100%{left:200%;} }

        .crh-ew-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--pink); flex-shrink: 0;
          box-shadow: 0 0 10px var(--pink);
          animation: dotBeat 1.8s ease-in-out infinite;
        }
        @keyframes dotBeat { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(0.75);opacity:0.6;} }

        /* ── H1 ── */
        .crh-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 8.5vw, 5.8rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.035em;
          margin-bottom: 26px;
        }

        .crh-h1-l1 {
          display: block; color: var(--text);
          text-shadow: 0 0 60px rgba(240,32,184,0.15);
        }

        .crh-brand {
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: brandShift 4s ease infinite;
          position: relative; display: inline-block;
        }
        @keyframes brandShift { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        .crh-h1-l2 {
          display: block;
          font-size: clamp(1.8rem, 5.5vw, 3.8rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: rgba(220,210,255,0.45);
          margin-top: 6px;
        }

        .crh-tw {
          background: linear-gradient(90deg, var(--pink) 0%, var(--blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: twShift 3s ease infinite;
        }
        @keyframes twShift { 0%,100%{background-position:0%;} 50%{background-position:100%;} }

        .crh-cursor {
          display: inline-block;
          -webkit-text-fill-color: var(--pink);
          color: var(--pink);
          font-weight: 200;
          animation: blink 0.9s step-end infinite;
          filter: drop-shadow(0 0 6px var(--pink));
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        /* ── SUBTEXT ── */
        .crh-sub {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(0.98rem, 2.2vw, 1.1rem);
          font-weight: 400;
          line-height: 1.82;
          color: var(--muted);
          max-width: 560px;
          margin: 0 auto 44px;
        }
        .crh-hl-p { color: rgba(240,130,210,0.9); font-weight: 600; }
        .crh-hl-b { color: rgba(80,200,250,0.9);  font-weight: 600; }

        /* ── BUTTONS ── */
        .crh-btns {
          display: flex; flex-wrap: wrap; gap: 14px;
          justify-content: center; margin-bottom: 80px;
        }

        .crh-btn-p {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.87rem; font-weight: 700; letter-spacing: 0.05em;
          color: #fff; padding: 14px 30px; border-radius: 14px;
          border: none; cursor: pointer; text-decoration: none;
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          background-size: 200% 200%;
          animation: btnGrad 4s ease infinite;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
        }
        @keyframes btnGrad { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
        .crh-btn-p::before {
          content: '';
          position: absolute; inset: 1px; border-radius: 13px;
          background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%);
          pointer-events: none;
        }
        .crh-sheen {
          position: absolute; top:0; left:-120%; width:55%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-18deg); transition: left 0.55s ease; pointer-events: none;
        }
        .crh-btn-p:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 14px 45px rgba(240,32,184,0.45), 0 0 0 1px rgba(58,184,245,0.2);
        }
        .crh-btn-p:hover .crh-sheen { left: 150%; }
        .crh-btn-p:active { transform: scale(0.97); }

        .crh-arrow {
          display: inline-flex;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .crh-btn-p:hover .crh-arrow { transform: translateX(5px); }

        .crh-btn-s {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.87rem; font-weight: 700; letter-spacing: 0.05em;
          color: rgba(210,200,255,0.8); padding: 14px 30px; border-radius: 14px;
          border: 1px solid rgba(240,32,184,0.25);
          cursor: pointer; text-decoration: none;
          background: rgba(240,32,184,0.04);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .crh-btn-s::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(240,32,184,0.08), rgba(58,184,245,0.06));
          opacity: 0; transition: opacity 0.3s ease;
        }
        .crh-btn-s:hover {
          color: #f0eeff;
          border-color: rgba(240,32,184,0.55);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(240,32,184,0.18), 0 0 0 1px rgba(240,32,184,0.1);
        }
        .crh-btn-s:hover::before { opacity: 1; }

        /* ── STATS ── */
        .crh-stats {
          width: 100%; max-width: 700px;
        }
        .crh-stats-g {
          display: grid; grid-template-columns: repeat(4,1fr);
          overflow: hidden; border-radius: 20px;
          border: 1px solid rgba(240,32,184,0.12);
          background: rgba(240,32,184,0.02);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          position: relative;
        }
        .crh-stats-g::before {
          content: '';
          position: absolute; top:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent 0%, var(--pink) 30%, var(--blue) 70%, transparent 100%);
        }
        .crh-stats-g::after {
          content: '';
          position: absolute; bottom:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent 0%, rgba(58,184,245,0.4) 40%, rgba(240,32,184,0.4) 80%, transparent 100%);
        }

        .crh-stat {
          padding: 26px 12px; text-align: center;
          position: relative;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease, background 0.3s ease;
        }
        /* Stats always visible — .on is set directly on element */
        .crh-stat.on { opacity: 1; transform: translateY(0); }
        .crh-stat + .crh-stat { border-left: 1px solid rgba(255,255,255,0.05); }
        .crh-stat:hover { background: rgba(240,32,184,0.05); }
        .crh-stat:nth-child(even):hover { background: rgba(58,184,245,0.05); }

        .crh-stat-n {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 800; letter-spacing: -0.03em;
          line-height: 1; margin-bottom: 6px;
        }
        .crh-stat:nth-child(odd)  .crh-stat-n {
          background: linear-gradient(135deg, var(--pink), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 12px rgba(240,32,184,0.4));
        }
        .crh-stat:nth-child(even) .crh-stat-n {
          background: linear-gradient(135deg, var(--blue), var(--violet));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 12px rgba(58,184,245,0.4));
        }
        .crh-stat-l {
          font-family: 'Manrope', sans-serif;
          font-size: 0.67rem; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: rgba(200,190,240,0.5);
        }

        /* ── FLOATING CARDS ── */
        .crh-fc {
          position: absolute; z-index: 8;
          background: rgba(8,7,26,0.75);
          border-radius: 14px; padding: 12px 16px;
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          display: flex; align-items: center; gap: 10px;
          font-family: 'JetBrains Mono', monospace;
          box-shadow: 0 8px 36px rgba(0,0,0,0.4);
          pointer-events: none;
        }
        .crh-fc-iot  {
          top:18%; left:2.5%;
          border: 1px solid rgba(58,184,245,0.22);
          box-shadow: 0 8px 36px rgba(0,0,0,0.4), 0 0 20px rgba(58,184,245,0.08);
          animation: flt1 7s ease-in-out infinite;
        }
        .crh-fc-saas {
          top:22%; right:2.5%;
          border: 1px solid rgba(240,32,184,0.22);
          box-shadow: 0 8px 36px rgba(0,0,0,0.4), 0 0 20px rgba(240,32,184,0.08);
          animation: flt2 9s ease-in-out infinite;
        }
        .crh-fc-up {
          bottom:28%; right:3%;
          border: 1px solid rgba(58,184,245,0.2);
          box-shadow: 0 8px 36px rgba(0,0,0,0.4), 0 0 18px rgba(58,184,245,0.07);
          animation: flt3 8s ease-in-out infinite;
        }
        @keyframes flt1{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
        @keyframes flt2{0%,100%{transform:translateY(0);}50%{transform:translateY(12px);}}
        @keyframes flt3{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}

        .crh-fc-dot {
          width:8px;height:8px;border-radius:50%;flex-shrink:0;
          animation: fcDot 2s ease-in-out infinite;
        }
        @keyframes fcDot{0%,100%{transform:scale(1);}50%{transform:scale(1.3);}}
        .crh-fc-label { font-size:0.63rem;letter-spacing:0.08em;text-transform:uppercase;color:rgba(190,185,230,0.6); }
        .crh-fc-val   { font-size:0.73rem;font-weight:500;color:rgba(230,225,255,0.9); }
        .crh-fc-sep   { width:1px;height:28px;background:rgba(255,255,255,0.07); }

        .crh-bars { display:flex;align-items:flex-end;gap:2px;height:20px; }
        .crh-bar  { width:3px;border-radius:1px;animation:barGrow 2s ease-in-out infinite alternate; }
        @keyframes barGrow{0%{transform:scaleY(0.7);}100%{transform:scaleY(1);}}

        /* Code card */
        .crh-code-card {
          position:absolute; z-index:8; bottom:22%;left:2%;
          background:rgba(8,7,26,0.82);
          border:1px solid rgba(240,32,184,0.18);
          border-radius:14px; padding:14px 18px;
          backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
          font-family:'JetBrains Mono',monospace; font-size:0.61rem; line-height:1.75;
          box-shadow:0 8px 36px rgba(0,0,0,0.45), 0 0 24px rgba(240,32,184,0.06);
          min-width:195px;
          animation:flt4 10s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes flt4{0%,100%{transform:translateY(0);}50%{transform:translateY(10px);}}
        .crh-cc-head { display:flex;align-items:center;gap:5px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07); }
        .crh-dr{width:6px;height:6px;border-radius:50%;background:#ff5f57;}
        .crh-dy{width:6px;height:6px;border-radius:50%;background:#febc2e;}
        .crh-dg{width:6px;height:6px;border-radius:50%;background:#28c840;}
        .crh-kw  { color:var(--pink); }
        .crh-fn  { color:var(--blue); }
        .crh-str { color:#34d399; }
        .crh-cm  { color:rgba(180,175,220,0.45); }
        .crh-ln  { display:block; }

        /* ── SCROLL ── */
        .crh-scroll {
          position:absolute;bottom:34px;left:50%;transform:translateX(-50%);
          display:flex;flex-direction:column;align-items:center;gap:7px;
          cursor:pointer;z-index:10;
          opacity:0;transition:opacity 0.7s ease 1.3s;
        }
        .crh-scroll.on{opacity:1;}
        .crh-scroll-pill {
          width:22px;height:36px;
          border:1.5px solid rgba(240,32,184,0.4);
          border-radius:12px;
          display:flex;justify-content:center;padding-top:5px;
          box-shadow:0 0 12px rgba(240,32,184,0.15);
        }
        .crh-scroll-d {
          width:4px;height:4px;border-radius:50%;
          background:var(--pink);
          box-shadow:0 0 8px var(--pink);
          animation:scrollBob 1.9s ease-in-out infinite;
        }
        @keyframes scrollBob{0%{transform:translateY(0);opacity:1;}60%{transform:translateY(14px);opacity:0;}61%{transform:translateY(0);opacity:0;}100%{transform:translateY(0);opacity:1;}}
        .crh-scroll-txt {
          font-family:'JetBrains Mono',monospace;
          font-size:0.58rem;letter-spacing:0.16em;text-transform:uppercase;
          color:rgba(240,32,184,0.4);
        }

        /* Corner decoration */
        .crh-corner { position:absolute;pointer-events:none;z-index:5;width:70px;height:70px; }
        .crh-corner-tl { top:60px;left:32px; border-top:1.5px solid rgba(240,32,184,0.4); border-left:1.5px solid rgba(240,32,184,0.4); }
        .crh-corner-tr { top:60px;right:32px; border-top:1.5px solid rgba(58,184,245,0.4); border-right:1.5px solid rgba(58,184,245,0.4); }
        .crh-corner-bl { bottom:60px;left:32px; border-bottom:1.5px solid rgba(58,184,245,0.4); border-left:1.5px solid rgba(58,184,245,0.4); }
        .crh-corner-br { bottom:60px;right:32px; border-bottom:1.5px solid rgba(240,32,184,0.4); border-right:1.5px solid rgba(240,32,184,0.4); }

        /* ── RESPONSIVE ── */
        @media(max-width:900px){ .crh-fc,.crh-code-card,.crh-corner{display:none;} }
        @media(max-width:640px){
          .crh-stats-g{grid-template-columns:repeat(2,1fr);}
          .crh-stat+.crh-stat:nth-child(3){border-left:none;border-top:1px solid rgba(255,255,255,0.05);}
          .crh-btns{flex-direction:column;align-items:stretch;}
          .crh-btn-p,.crh-btn-s{justify-content:center;}
          .crh-section{padding:110px 20px 90px;}
        }
      `}</style>

      <section id="home" className="crh-section" ref={ref}>
        {/* BG layers */}
        <div className="crh-bg" />
        <div className="crh-scan" />
        <div className="crh-grid" />
        <AuroraCanvas />
        <ParticleNet />

        {/* Orbs */}
        <div className="crh-orb crh-o1" />
        <div className="crh-orb crh-o2" />
        <div className="crh-orb crh-o3" />

        {/* Corner brackets */}
        <div className="crh-corner crh-corner-tl" />
        <div className="crh-corner crh-corner-tr" />
        <div className="crh-corner crh-corner-bl" />
        <div className="crh-corner crh-corner-br" />

        {/* ── Floating cards ── */}
        {/* IoT card */}
        <div className="crh-fc crh-fc-iot">
          <div className="crh-fc-dot" style={{ background:'#3ab8f5', boxShadow:'0 0 10px #3ab8f5' }} />
          <div className="crh-fc-sep" />
          <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
            <span className="crh-fc-label">IoT Devices</span>
            <span className="crh-fc-val" style={{ color:'rgba(80,200,250,0.95)' }}>1,204 online</span>
          </div>
          <div className="crh-bars">
            {[0.5,0.8,0.6,1,0.7,0.9,0.55,1,0.75].map((h,i)=>(
              <div key={i} className="crh-bar"
                style={{ height:`${h*18}px`, background:`rgba(58,184,245,${h})`, animationDelay:`${i*0.15}s` }} />
            ))}
          </div>
        </div>

        {/* SaaS card */}
        <div className="crh-fc crh-fc-saas">
          <div className="crh-fc-dot" style={{ background:'#f020b8', boxShadow:'0 0 10px #f020b8' }} />
          <div className="crh-fc-sep" />
          <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
            <span className="crh-fc-label">SaaS Growth</span>
            <span className="crh-fc-val" style={{ color:'rgba(240,110,200,0.95)' }}>↑ 24% this month</span>
          </div>
        </div>

        {/* Uptime card */}
        <div className="crh-fc crh-fc-up">
          <div className="crh-fc-dot" style={{ background:'#3ab8f5', boxShadow:'0 0 10px rgba(58,184,245,0.7)' }} />
          <div className="crh-fc-sep" />
          <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
            <span className="crh-fc-label">System Uptime</span>
            <span className="crh-fc-val" style={{ color:'rgba(80,200,250,0.95)' }}>99.97%</span>
          </div>
        </div>

        {/* Code card */}
        <div className="crh-code-card">
          <div className="crh-cc-head">
            <div className="crh-dr"/><div className="crh-dy"/><div className="crh-dg"/>
          </div>
          <span className="crh-ln"><span className="crh-kw">const</span> <span className="crh-fn">crelante</span> = {'{'}</span>
          <span className="crh-ln">  <span className="crh-fn">build</span>: <span className="crh-str">'software'</span>,</span>
          <span className="crh-ln">  <span className="crh-fn">connect</span>: <span className="crh-str">'IoT'</span>,</span>
          <span className="crh-ln">  <span className="crh-fn">scale</span>: <span className="crh-str">'SaaS'</span>,</span>
          <span className="crh-ln">  <span className="crh-cm">// ✓ shipped</span></span>
          <span className="crh-ln">{'}'}</span>
        </div>

        {/* ── Main content ── */}
        <div className="crh-body">

          <div className={`crh-eyebrow crh-reveal ${on?'on':''}`} style={{ transitionDelay:'0ms' }}>
            <span className="crh-ew-dot" />
            Software · IoT · SaaS
          </div>

          <h1 className={`crh-h1 crh-reveal ${on?'on':''}`} style={{ transitionDelay:'100ms' }}>
            <span className="crh-h1-l1">
              <span className="crh-brand">Crelante</span> Builds
            </span>
            <span className="crh-h1-l2">
              <Typewriter go={on} />
            </span>
          </h1>

          <p className={`crh-sub crh-reveal ${on?'on':''}`} style={{ transitionDelay:'210ms' }}>
            We engineer <span className="crh-hl-p">custom software</span>, intelligent{' '}
            <span className="crh-hl-b">IoT systems</span>, and scalable{' '}
            <span className="crh-hl-p">SaaS platforms</span> that turn complex problems
            into elegant digital products.
          </p>

          <div className={`crh-btns crh-reveal ${on?'on':''}`} style={{ transitionDelay:'320ms' }}>
            <a href="#contact" className="crh-btn-p" onClick={e=>{e.preventDefault();go('contact');}}>
              <span className="crh-sheen" />
              Get Started
              <span className="crh-arrow"><ArrowRight size={17}/></span>
            </a>
            <a href="#projects" className="crh-btn-s" onClick={e=>{e.preventDefault();go('projects');}}>
              View Our Work
            </a>
          </div>

          <div className={`crh-stats crh-reveal ${on?'on':''}`} style={{ transitionDelay:'430ms' }}>
            <div className="crh-stats-g">
              {statData.map((s,i)=>(
                <Stat key={i} number={s.number} label={s.label} delay={i*100} active={on} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`crh-scroll ${on?'on':''}`} onClick={()=>go('about')}>
          <div className="crh-scroll-pill">
            <div className="crh-scroll-d"/>
          </div>
          <span className="crh-scroll-txt">Scroll</span>
        </div>
      </section>
    </>
  );
};

export default Hero;
