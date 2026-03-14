import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [activePillStyle, setActivePillStyle] = useState({ left: 0, width: 0, ready: false });
  const linkRefs = useRef({});
  const navLinksRef = useRef(null);

  const navLinks = [
    { name: 'Home',     href: 'home'     },
    { name: 'About',    href: 'about'    },
    { name: 'Services', href: 'services' },
    { name: 'Products', href: 'products' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact',  href: 'contact'  },
  ];

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const el = document.getElementById(link.href);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = linkRefs.current[activeSection];
    const container = navLinksRef.current;
    if (el && container) {
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      setActivePillStyle({ left: eRect.left - cRect.left, width: eRect.width, ready: true });
    }
  }, [activeSection, mounted]);

  const handleLinkMouseEnter = (href) => {
    const el = linkRefs.current[href];
    const container = navLinksRef.current;
    if (el && container) {
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      setPillStyle({ left: eRect.left - cRect.left, width: eRect.width, opacity: 1 });
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root nav wrapper ── */
        .crn-wrap {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          padding: 16px 24px;
          transition: padding 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .crn-wrap.scrolled { padding: 10px 24px; }

        /* ── Floating pill bar ── */
        .crn-bar {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 58px;
          border-radius: 16px;
          position: relative;

          /* Default: fully transparent, works on any bg */
          background: transparent;
          border: 1px solid transparent;
          transition: background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease, border-radius 0.45s ease;
        }

        /* Scrolled: frosted glass — works on light AND dark */
        .crn-wrap.scrolled .crn-bar {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow:
            0 2px 0 rgba(255,255,255,0.06) inset,
            0 20px 60px rgba(0,0,0,0.18),
            0 4px 16px rgba(0,0,0,0.1);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
        }

        /* Beam border animation on scroll */
        .crn-wrap.scrolled .crn-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(99,179,237,0.55) 35%,
            rgba(167,139,250,0.55) 65%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
                        linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 220% 100%;
          animation: beamRun 3.5s linear infinite;
          pointer-events: none;
        }

        @keyframes beamRun {
          0%   { background-position: -100% 0; }
          100% { background-position: 200%  0; }
        }

        /* ── Logo ── */
        .crn-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px 8px;
          border-radius: 10px;
          opacity: 0;
          transform: translateX(-18px);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            background 0.2s ease;
          flex-shrink: 0;
        }
        .crn-logo.in { opacity: 1; transform: translateX(0); }
        .crn-logo:hover { background: rgba(255,255,255,0.07); }

        .crn-logo-img {
          width: 30px; height: 30px;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease;
        }
        .crn-logo:hover .crn-logo-img {
          transform: rotate(-8deg) scale(1.12);
          filter: drop-shadow(0 0 8px rgba(139,92,246,0.65));
        }

        .crn-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          /* Gradient text that pops on both light & dark */
          background: linear-gradient(130deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: shimmerLogo 5s ease infinite;
          line-height: 1;
        }

        @keyframes shimmerLogo {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        /* ── Center nav pill ── */
        .crn-center {
          display: flex;
          align-items: center;
        }

        .crn-links-pill {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          padding: 5px;
          /* Soft neutral pill — visible on light & dark */
          background: rgba(120,120,140,0.1);
          border: 1px solid rgba(120,120,140,0.18);
          border-radius: 13px;
          position: relative;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        /* Hover ghost */
        .crn-ghost {
          position: absolute;
          top: 5px;
          height: calc(100% - 10px);
          background: rgba(120,120,140,0.12);
          border-radius: 9px;
          pointer-events: none;
          transition:
            left  0.22s cubic-bezier(0.4,0,0.2,1),
            width 0.22s cubic-bezier(0.4,0,0.2,1),
            opacity 0.18s ease;
        }

        /* Active pill — indigo/violet works on light & dark */
        .crn-active {
          position: absolute;
          top: 5px;
          height: calc(100% - 10px);
          background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18));
          border: 1px solid rgba(139,92,246,0.28);
          border-radius: 9px;
          pointer-events: none;
          box-shadow: 0 0 14px rgba(139,92,246,0.14);
          transition:
            left  0.38s cubic-bezier(0.4,0,0.2,1),
            width 0.38s cubic-bezier(0.4,0,0.2,1),
            opacity 0.3s ease;
        }

        .crn-link {
          position: relative;
          z-index: 1;
          font-family: 'Manrope', sans-serif;
          font-size: 0.77rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          /* Neutral color readable on both themes */
          color: rgba(100, 100, 120, 0.85);
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 13px;
          border-radius: 9px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(-8px);
          transition:
            color 0.2s ease,
            opacity 0.5s ease,
            transform 0.5s ease;
        }
        .crn-link.in { opacity: 1; transform: translateY(0); }
        .crn-link:hover { color: #6366f1; }
        .crn-link.active { color: #6366f1; }

        /* ── Right side ── */
        .crn-right {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateX(18px);
          transition: opacity 0.55s ease 0.3s, transform 0.55s ease 0.3s;
          flex-shrink: 0;
        }
        .crn-right.in { opacity: 1; transform: translateX(0); }

        /* Badge */
        .crn-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.63rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #16a34a;
          padding: 4px 10px;
          background: rgba(22,163,74,0.08);
          border: 1px solid rgba(22,163,74,0.2);
          border-radius: 20px;
          white-space: nowrap;
        }

        .crn-badge-dot {
          width: 5px; height: 5px;
          background: #22c55e;
          border-radius: 50%;
          flex-shrink: 0;
          animation: dotPulse 2.2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%,100% { transform: scale(1);    box-shadow: 0 0 0 0   rgba(34,197,94,0.5); }
          50%      { transform: scale(1.25); box-shadow: 0 0 0 5px rgba(34,197,94,0);   }
        }

        /* CTA button */
        .crn-cta {
          position: relative;
          font-family: 'Manrope', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          cursor: pointer;
          padding: 9px 20px;
          border-radius: 10px;
          overflow: hidden;
          white-space: nowrap;
          transition:
            transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.3s ease;
        }

        .crn-cta-shine {
          position: absolute;
          top: 0; left: -100%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-18deg);
          transition: left 0.52s ease;
          pointer-events: none;
        }

        .crn-cta:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 28px rgba(99,102,241,0.42);
        }
        .crn-cta:hover .crn-cta-shine { left: 140%; }
        .crn-cta:active { transform: scale(0.97); }

        /* ── Hamburger ── */
        .crn-ham {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px; height: 40px;
          background: rgba(120,120,140,0.1);
          border: 1px solid rgba(120,120,140,0.2);
          border-radius: 10px;
          cursor: pointer;
          gap: 5px;
          transition: background 0.2s ease, border-color 0.2s ease;
          flex-shrink: 0;
        }
        .crn-ham:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.28);
        }

        .crn-ham-line {
          display: block;
          width: 18px; height: 1.5px;
          background: #6366f1;
          border-radius: 2px;
          transition: all 0.36s cubic-bezier(0.4,0,0.2,1);
          transform-origin: center;
        }
        .crn-ham.open .crn-ham-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .crn-ham.open .crn-ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .crn-ham.open .crn-ham-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile dropdown ── */
        .crn-mobile {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition:
            max-height 0.45s cubic-bezier(0.4,0,0.2,1),
            opacity    0.3s  ease,
            padding    0.35s ease;
        }
        .crn-mobile.open {
          max-height: 540px;
          opacity: 1;
          padding: 0 24px 16px;
        }

        .crn-mobile-inner {
          /* Frosted glass — neutral, works on any bg below */
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(120,120,140,0.18);
          border-radius: 16px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }

        .crn-mob-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(80,80,100,0.75);
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px 16px;
          border-radius: 10px;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .crn-mob-link::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(99,102,241,0.3);
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .crn-mob-link:hover {
          color: #6366f1;
          background: rgba(99,102,241,0.07);
        }
        .crn-mob-link:hover::before { background: #6366f1; transform: scale(1.8); }
        .crn-mob-link.active {
          color: #6366f1;
          background: rgba(99,102,241,0.09);
        }
        .crn-mob-link.active::before {
          background: #8b5cf6;
          transform: scale(1.5);
          box-shadow: 0 0 6px rgba(139,92,246,0.6);
        }

        .crn-mob-divider {
          height: 1px;
          background: rgba(120,120,140,0.14);
          margin: 4px 8px;
        }

        .crn-mob-cta {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          cursor: pointer;
          padding: 13px 16px;
          border-radius: 11px;
          text-align: center;
          width: 100%;
          margin-top: 4px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .crn-mob-cta:hover { opacity: 0.88; transform: scale(0.99); }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .crn-center, .crn-right { display: none !important; }
          .crn-ham { display: flex; }
        }
        @media (min-width: 981px) {
          .crn-mobile, .crn-mobile.open { display: none !important; }
        }
      `}</style>

      <nav className={`crn-wrap ${isScrolled ? 'scrolled' : ''}`}>
        <div className="crn-bar">

          {/* Logo */}
          <button
            className={`crn-logo ${mounted ? 'in' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            <img src="/crelante.png" alt="Crelante Logo" className="crn-logo-img" />
            <span className="crn-logo-text">Crelante</span>
          </button>

          {/* Desktop Center Nav */}
          <div className="crn-center">
            <ul
              className="crn-links-pill"
              ref={navLinksRef}
              onMouseLeave={() => setPillStyle(p => ({ ...p, opacity: 0 }))}
            >
              {/* Hover ghost */}
              <div
                className="crn-ghost"
                style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
              />
              {/* Active pill */}
              <div
                className="crn-active"
                style={{
                  left: activePillStyle.left,
                  width: activePillStyle.width,
                  opacity: activePillStyle.ready ? 1 : 0,
                }}
              />
              {navLinks.map((item, i) => (
                <li key={item.href} style={{ listStyle: 'none' }}>
                  <button
                    ref={(el) => (linkRefs.current[item.href] = el)}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => handleLinkMouseEnter(item.href)}
                    className={`crn-link ${activeSection === item.href ? 'active' : ''} ${mounted ? 'in' : ''}`}
                    style={{
                      transitionDelay: mounted ? `${i * 0.055 + 0.08}s` : '0s',
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: badge + CTA */}
          <div className={`crn-right ${mounted ? 'in' : ''}`}>
            <span className="crn-badge">
              <span className="crn-badge-dot" />
              Available
            </span>
            <button className="crn-cta" onClick={() => scrollToSection('contact')}>
              <span className="crn-cta-shine" />
              Get in Touch
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`crn-ham ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="crn-ham-line" />
            <span className="crn-ham-line" />
            <span className="crn-ham-line" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`crn-mobile ${isMenuOpen ? 'open' : ''}`}>
          <div className="crn-mobile-inner">
            {navLinks.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`crn-mob-link ${activeSection === item.href ? 'active' : ''}`}
              >
                {item.name}
              </button>
            ))}
            <div className="crn-mob-divider" />
            <button className="crn-mob-cta" onClick={() => scrollToSection('contact')}>
              Get in Touch
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
