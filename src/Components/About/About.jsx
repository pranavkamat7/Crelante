import React, { useEffect, useRef, useState } from 'react';
import { Users, Target, Award, Cpu, Wifi, Layers } from 'lucide-react';

/* ── Intersection observer hook ── */
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

/* ── Animated ring / circuit graphic ── */
const CircuitGraphic = ({ visible }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const S = 400;
    canvas.width = S; canvas.height = S;
    let t = 0, id;

    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      const cx = S / 2, cy = S / 2;

      /* Rotating outer ring */
      for (let i = 0; i < 3; i++) {
        const r = 155 + i * 14;
        const dash = 18 + i * 8;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.setLineDash([dash, dash * 0.7]);
        ctx.lineDashOffset = -t * (i % 2 === 0 ? 1 : -1) * (0.4 + i * 0.15);
        const alpha = 0.18 - i * 0.04;
        ctx.strokeStyle = i % 2 === 0
          ? `rgba(240,32,184,${alpha})`
          : `rgba(58,184,245,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.setLineDash([]);

      /* Spoke lines */
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + t * 0.008;
        const x1 = cx + Math.cos(angle) * 80;
        const y1 = cy + Math.sin(angle) * 80;
        const x2 = cx + Math.cos(angle) * 148;
        const y2 = cy + Math.sin(angle) * 148;
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(240,32,184,0.5)');
        grad.addColorStop(1, 'rgba(58,184,245,0.05)');
        ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad; ctx.lineWidth = 1; ctx.stroke();

        /* Node dots */
        ctx.beginPath();
        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(240,32,184,0.7)' : 'rgba(58,184,245,0.7)';
        ctx.fill();
      }

      /* Inner spinning ring */
      ctx.beginPath();
      ctx.arc(cx, cy, 72, t * 0.012, t * 0.012 + Math.PI * 1.5);
      ctx.strokeStyle = 'rgba(240,32,184,0.5)';
      ctx.lineWidth = 1.5; ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 72, t * 0.012 + Math.PI, t * 0.012 + Math.PI * 2.2);
      ctx.strokeStyle = 'rgba(58,184,245,0.5)';
      ctx.lineWidth = 1.5; ctx.stroke();

      /* Center glow */
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      glow.addColorStop(0, 'rgba(240,32,184,0.22)');
      glow.addColorStop(0.5, 'rgba(123,47,255,0.12)');
      glow.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      /* Center pixel grid (like logo) */
      const grid = 5, cell = 7, off = cx - (grid * cell) / 2;
      for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
          const dist = Math.sqrt((r - 2) ** 2 + (c - 2) ** 2);
          const a = Math.max(0, 0.7 - dist * 0.18) * (0.6 + 0.4 * Math.sin(t * 0.05 + dist));
          ctx.fillStyle = `rgba(233,30,140,${a})`;
          ctx.fillRect(off + c * cell, cy - (grid * cell) / 2 + r * cell, cell - 1, cell - 1);
        }
      }

      /* Orbiting dots */
      for (let i = 0; i < 4; i++) {
        const angle = t * 0.015 * (i % 2 === 0 ? 1 : -1.3) + (i * Math.PI) / 2;
        const radius = 100 + i * 12;
        const ox = cx + Math.cos(angle) * radius;
        const oy = cy + Math.sin(angle) * radius;
        ctx.beginPath(); ctx.arc(ox, oy, 4 - i * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? `rgba(240,32,184,0.85)` : `rgba(58,184,245,0.85)`;
        ctx.fill();
        /* Trail */
        ctx.beginPath(); ctx.arc(ox, oy, 8 - i, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(240,32,184,0.1)' : 'rgba(58,184,245,0.1)';
        ctx.fill();
      }

      t++; id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%', maxWidth: 400, height: 'auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.88)',
        transition: 'opacity 1s ease 0.3s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.3s',
        display: 'block', margin: '0 auto',
      }}
    />
  );
};

/* ── Main ── */
const About = () => {
  const [sectionRef, visible] = useInView(0.1);

  const features = [
    {
      icon: <Cpu size={22} />,
      title: 'Software Engineering',
      desc: 'Custom applications built for performance, scale, and longevity.',
      color: 'pink',
    },
    {
      icon: <Wifi size={22} />,
      title: 'IoT Solutions',
      desc: 'Connected hardware systems that talk, sense, and respond in real time.',
      color: 'blue',
    },
    {
      icon: <Layers size={22} />,
      title: 'SaaS Products',
      desc: 'Scalable cloud platforms your clients can access from anywhere.',
      color: 'violet',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .ab-section {
          --pink:   #f020b8;
          --blue:   #3ab8f5;
          --violet: #7b2fff;
          --bg:     #08071a;
          --bg2:    #0d0b2e;
          --text:   #f0eeff;
          --muted:  rgba(210,200,255,0.55);

          position: relative;
          background: var(--bg);
          padding: 120px 24px;
          overflow: hidden;
        }

        /* Subtle top border beam */
        .ab-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(240,32,184,0.6) 30%,
            rgba(58,184,245,0.6) 70%,
            transparent 100%);
        }

        /* Bg radials */
        .ab-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 55% 45% at 0%   50%, rgba(240,32,184,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 100% 50%, rgba(58,184,245,0.07)  0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 50%  80%, rgba(123,47,255,0.05)  0%, transparent 60%);
        }

        /* Grid */
        .ab-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(240,32,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,184,245,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 90%);
        }

        .ab-inner {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }

        /* ── LEFT TEXT SIDE ── */
        .ab-left { display: flex; flex-direction: column; gap: 0; }

        /* Section label */
        .ab-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(240,120,210,0.8);
          margin-bottom: 20px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ab-label.on { opacity: 1; transform: translateY(0); }
        .ab-label-bar {
          width: 28px; height: 1px;
          background: linear-gradient(90deg, var(--pink), transparent);
        }

        /* Heading */
        .ab-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-bottom: 24px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s;
        }
        .ab-h2.on { opacity: 1; transform: translateY(0); }

        .ab-h2-accent {
          display: block;
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 200% 200%;
          animation: gradFlow 5s ease infinite;
        }
        @keyframes gradFlow { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        /* Body text */
        .ab-p {
          font-family: 'Manrope', sans-serif;
          font-size: 1.02rem; font-weight: 400; line-height: 1.82;
          color: var(--muted);
          margin-bottom: 14px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .ab-p.on { opacity: 1; transform: translateY(0); }
        .ab-p:last-of-type { margin-bottom: 40px; }
        .ab-hl-p { color: rgba(240,130,210,0.9); font-weight: 600; }
        .ab-hl-b { color: rgba(80,200,250,0.9);  font-weight: 600; }

        /* Feature cards */
        .ab-features {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 12px;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.75s ease 0.35s, transform 0.75s ease 0.35s;
        }
        .ab-features.on { opacity: 1; transform: translateY(0); }

        .ab-feat {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.025);
          border-radius: 16px; padding: 18px 14px;
          border: 1px solid rgba(255,255,255,0.06);
          cursor: default;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      border-color 0.3s ease,
                      background 0.3s ease;
        }
        .ab-feat:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.04);
        }
        .ab-feat.pink:hover  { border-color: rgba(240,32,184,0.35); box-shadow: 0 8px 30px rgba(240,32,184,0.1); }
        .ab-feat.blue:hover  { border-color: rgba(58,184,245,0.35);  box-shadow: 0 8px 30px rgba(58,184,245,0.1);  }
        .ab-feat.violet:hover{ border-color: rgba(123,47,255,0.35);  box-shadow: 0 8px 30px rgba(123,47,255,0.1);  }

        /* Top line on card */
        .ab-feat::before {
          content: '';
          position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
          border-radius: 0 0 2px 2px;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .ab-feat.pink::before   { background: linear-gradient(90deg, transparent, var(--pink), transparent); }
        .ab-feat.blue::before   { background: linear-gradient(90deg, transparent, var(--blue), transparent); }
        .ab-feat.violet::before { background: linear-gradient(90deg, transparent, var(--violet), transparent); }
        .ab-feat:hover::before  { opacity: 1; }

        .ab-feat-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }
        .ab-feat.pink   .ab-feat-icon { background: rgba(240,32,184,0.1);  color: var(--pink);   box-shadow: 0 0 16px rgba(240,32,184,0.15); }
        .ab-feat.blue   .ab-feat-icon { background: rgba(58,184,245,0.1);   color: var(--blue);   box-shadow: 0 0 16px rgba(58,184,245,0.15);  }
        .ab-feat.violet .ab-feat-icon { background: rgba(123,47,255,0.1);   color: #a78bfa;       box-shadow: 0 0 16px rgba(123,47,255,0.15);  }

        .ab-feat-title {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.01em; color: var(--text);
          margin-bottom: 5px;
        }
        .ab-feat-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem; font-weight: 400; line-height: 1.55;
          color: rgba(190,185,230,0.5);
        }

        /* ── RIGHT GRAPHIC SIDE ── */
        .ab-right {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative;
        }

        .ab-graphic-wrap {
          position: relative; width: 100%; max-width: 420px;
        }

        /* Glow behind canvas */
        .ab-glow {
          position: absolute; inset: 10%;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(240,32,184,0.12) 0%,
            rgba(123,47,255,0.1) 40%,
            rgba(58,184,245,0.08) 70%,
            transparent 100%);
          filter: blur(24px);
          animation: glowPulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes glowPulse { 0%,100%{opacity:0.8;transform:scale(1);}  50%{opacity:1.2;transform:scale(1.08);} }

        /* Floating info chips around graphic */
        .ab-chip {
          position: absolute; z-index: 5;
          display: flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          background: rgba(8,7,26,0.82);
          border-radius: 12px; padding: 9px 14px;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.4);
          pointer-events: none;
        }
        .ab-chip-1 {
          top: 8%; right: -8%;
          border: 1px solid rgba(58,184,245,0.25);
          box-shadow: 0 8px 28px rgba(0,0,0,0.4), 0 0 18px rgba(58,184,245,0.08);
          animation: chipFloat1 6s ease-in-out infinite;
        }
        .ab-chip-2 {
          bottom: 10%; left: -8%;
          border: 1px solid rgba(240,32,184,0.25);
          box-shadow: 0 8px 28px rgba(0,0,0,0.4), 0 0 18px rgba(240,32,184,0.08);
          animation: chipFloat2 8s ease-in-out infinite;
        }
        .ab-chip-3 {
          bottom: 28%; right: -10%;
          border: 1px solid rgba(123,47,255,0.25);
          box-shadow: 0 8px 28px rgba(0,0,0,0.4), 0 0 18px rgba(123,47,255,0.08);
          animation: chipFloat3 7s ease-in-out infinite;
        }
        @keyframes chipFloat1{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        @keyframes chipFloat2{0%,100%{transform:translateY(0);}50%{transform:translateY(9px);}}
        @keyframes chipFloat3{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}

        .ab-chip-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
        }
        .ab-chip-label {
          font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(190,185,230,0.6); display: block;
        }
        .ab-chip-val {
          font-size: 0.72rem; font-weight: 500;
          color: rgba(230,225,255,0.92); display: block;
        }

        /* Trust badge */
        .ab-trust {
          margin-top: 32px;
          display: flex; align-items: center; gap: 14px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 14px 20px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
          max-width: 320px;
          width: 100%;
        }
        .ab-trust.on { opacity: 1; transform: translateY(0); }

        .ab-trust-icon {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--pink), var(--violet));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 4px 16px rgba(240,32,184,0.3);
        }
        .ab-trust-title {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem; font-weight: 700; color: var(--text);
        }
        .ab-trust-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.05em; color: var(--muted);
          margin-top: 2px;
        }

        /* Avatars */
        .ab-avatars {
          display: flex; margin-top: 8px;
        }
        .ab-av {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1.5px solid var(--bg);
          margin-left: -6px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.55rem; font-weight: 700;
          font-family: 'Manrope', sans-serif;
        }
        .ab-av:first-child { margin-left: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ab-inner { grid-template-columns: 1fr; gap: 60px; }
          .ab-right  { order: -1; }
          .ab-chip   { display: none; }
          .ab-graphic-wrap { max-width: 300px; }
          .ab-trust  { max-width: 100%; }
        }
        @media (max-width: 560px) {
          .ab-features { grid-template-columns: 1fr; }
          .ab-section  { padding: 80px 20px; }
        }
      `}</style>

      <section id="about" className="ab-section" ref={sectionRef}>
        <div className="ab-bg" />
        <div className="ab-grid" />

        <div className="ab-inner">
          {/* ── LEFT ── */}
          <div className="ab-left">
            <div className={`ab-label ${visible ? 'on' : ''}`}>
              <span className="ab-label-bar" />
              About Us
            </div>

            <h2 className={`ab-h2 ${visible ? 'on' : ''}`}>
              Who We Are
              <span className="ab-h2-accent">& What We Build</span>
            </h2>

            <p className={`ab-p ${visible ? 'on' : ''}`}>
              We're a team of <span className="ab-hl-p">passionate engineers</span> and
              builders who believe great software changes everything. Based in Goa, we've
              spent 3+ years crafting solutions that actually work — not just look good.
            </p>
            <p className={`ab-p ${visible ? 'on' : ''}`} style={{ transitionDelay: '0.28s' }}>
              From connected <span className="ab-hl-b">IoT devices</span> to full-scale{' '}
              <span className="ab-hl-p">SaaS platforms</span>, our mission is simple: turn your
              most complex problems into elegant, scalable digital products.
            </p>

            <div className={`ab-features ${visible ? 'on' : ''}`}>
              {features.map((f, i) => (
                <div key={i} className={`ab-feat ${f.color}`}>
                  <div className="ab-feat-icon">{f.icon}</div>
                  <div className="ab-feat-title">{f.title}</div>
                  <div className="ab-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="ab-right">
            <div className="ab-graphic-wrap">
              <div className="ab-glow" />
              <CircuitGraphic visible={visible} />

              {/* Floating chips */}
              <div className="ab-chip ab-chip-1">
                <div className="ab-chip-dot" style={{ background:'#3ab8f5', boxShadow:'0 0 8px #3ab8f5' }} />
                <div>
                  <span className="ab-chip-label">IoT Devices</span>
                  <span className="ab-chip-val">1,204 connected</span>
                </div>
              </div>

              <div className="ab-chip ab-chip-2">
                <div className="ab-chip-dot" style={{ background:'#f020b8', boxShadow:'0 0 8px #f020b8' }} />
                <div>
                  <span className="ab-chip-label">Projects Shipped</span>
                  <span className="ab-chip-val">50+ delivered</span>
                </div>
              </div>

              <div className="ab-chip ab-chip-3">
                <div className="ab-chip-dot" style={{ background:'#a78bfa', boxShadow:'0 0 8px #a78bfa' }} />
                <div>
                  <span className="ab-chip-label">Satisfaction</span>
                  <span className="ab-chip-val">99% clients</span>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className={`ab-trust ${visible ? 'on' : ''}`}>
              <div className="ab-trust-icon">✦</div>
              <div>
                <div className="ab-trust-title">Trusted by 50+ clients across Goa</div>
                <div className="ab-avatars">
                  {[
                    ['#f020b8','#7b2fff','A'],
                    ['#3ab8f5','#2979ff','B'],
                    ['#7b2fff','#f020b8','C'],
                    ['#f020b8','#3ab8f5','D'],
                    ['#3ab8f5','#7b2fff','E'],
                  ].map(([c1,c2,l],i) => (
                    <div key={i} className="ab-av"
                      style={{ background:`linear-gradient(135deg,${c1},${c2})`, color:'#fff' }}>
                      {l}
                    </div>
                  ))}
                  <div className="ab-av" style={{ background:'rgba(255,255,255,0.08)', color:'rgba(200,195,240,0.7)', fontSize:'0.5rem', fontFamily:'Manrope' }}>+45</div>
                </div>
                <div className="ab-trust-sub">Goa · India · Remote</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
