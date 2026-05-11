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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Core Theme Colors ── */
        :root {
          --crn-black: #0A0A0A;
          --crn-white: #FFFFFF;
          --crn-bg: #F9F8F6;
          --crn-orange: #FF4E25;
          --crn-gray: #E5E5E5;
          --crn-text-gray: #666666;
        }

        /* ── Root nav wrapper ── */
        .crn-wrap {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          padding: 16px 24px;
          transition: padding 0.4s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .crn-wrap.scrolled { padding: 12px 24px; }

        /* ── Solid Bar ── */
        .crn-bar {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          border-radius: 12px;
          position: relative;
          background: transparent;
          border: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Scrolled: Solid & Sharp */
        .crn-wrap.scrolled .crn-bar {
          background: var(--crn-white);
          border-color: var(--crn-gray);
          box-shadow: 0 12px 32px rgba(0,0,0,0.04);
        }

        /* ── Logo ── */
        .crn-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          opacity: 0;
          transform: translateX(-18px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          flex-shrink: 0;
        }
        .crn-logo.in { opacity: 1; transform: translateX(0); }

        .crn-logo-img {
          width: 60px; height: 60px;
          transition: transform 0.4s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .crn-logo:hover .crn-logo-img {
          transform: scale(1.1);
        }

        .crn-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--crn-black);
          line-height: 1;
          margin-left:-18px;
        }

        /* ── Center nav pill ── */
        .crn-center {
          display: flex;
          align-items: center;
        }

        .crn-links-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          padding: 6px;
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 12px;
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        /* Hover ghost - Solid light gray */
        .crn-ghost {
          position: absolute;
          top: 6px;
          height: calc(100% - 12px);
          background: #F2F2F2;
          border-radius: 8px;
          pointer-events: none;
          transition:
            left  0.3s cubic-bezier(0.8, 0, 0.2, 1),
            width 0.3s cubic-bezier(0.8, 0, 0.2, 1),
            opacity 0.2s ease;
        }

        /* Active pill - Stark Black */
        .crn-active {
          position: absolute;
          top: 6px;
          height: calc(100% - 12px);
          background: var(--crn-black);
          border-radius: 8px;
          pointer-events: none;
          transition:
            left  0.4s cubic-bezier(0.8, 0, 0.2, 1),
            width 0.4s cubic-bezier(0.8, 0, 0.2, 1),
            opacity 0.3s ease;
        }

        .crn-link {
          position: relative;
          z-index: 1;
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--crn-text-gray);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 8px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(-8px);
          transition: color 0.3s ease, opacity 0.5s ease, transform 0.5s ease;
        }
        .crn-link.in { opacity: 1; transform: translateY(0); }
        .crn-link:hover { color: var(--crn-black); }
        .crn-link.active { color: var(--crn-white); } /* White text on black pill */

        /* ── Right side ── */
        .crn-right {
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateX(18px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
          flex-shrink: 0;
        }
        .crn-right.in { opacity: 1; transform: translateX(0); }

        /* Solid Badge */
        .crn-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--crn-black);
          padding: 6px 14px;
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 50px;
          white-space: nowrap;
        }

        .crn-badge-dot {
          width: 6px; height: 6px;
          background: var(--crn-orange);
          border-radius: 50%;
          flex-shrink: 0;
          animation: solidPulse 2.5s infinite;
        }

        @keyframes solidPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Solid CTA button */
        .crn-cta {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--crn-white);
          background: var(--crn-black);
          border: none;
          cursor: pointer;
          padding: 12px 24px;
          border-radius: 8px;
          white-space: nowrap;
          transition: background 0.3s ease, transform 0.2s cubic-bezier(0.8, 0, 0.2, 1);
        }

        .crn-cta:hover {
          background: var(--crn-orange);
          transform: translateY(-2px);
        }
        .crn-cta:active { transform: scale(0.98); }

        /* ── Hamburger ── */
        .crn-ham {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 44px; height: 44px;
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 8px;
          cursor: pointer;
          gap: 6px;
          transition: border-color 0.2s ease;
          flex-shrink: 0;
        }
        .crn-ham:hover { border-color: var(--crn-black); }

        .crn-ham-line {
          display: block;
          width: 20px; height: 2px;
          background: var(--crn-black);
          border-radius: 2px;
          transition: all 0.4s cubic-bezier(0.8, 0, 0.2, 1);
          transform-origin: center;
        }
        .crn-ham.open .crn-ham-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .crn-ham.open .crn-ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .crn-ham.open .crn-ham-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* ── Mobile dropdown ── */
        .crn-mobile {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.5s cubic-bezier(0.8, 0, 0.2, 1), opacity 0.3s ease, padding 0.3s ease;
        }
        .crn-mobile.open {
          max-height: 540px;
          opacity: 1;
          padding: 0 24px 16px;
        }

        .crn-mobile-inner {
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.08);
        }

        .crn-mob-link {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--crn-text-gray);
          background: none;
          border: none;
          cursor: pointer;
          padding: 14px 16px;
          border-radius: 8px;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          transition: color 0.2s ease, background 0.2s ease;
        }
        
        .crn-mob-link::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--crn-gray);
          flex-shrink: 0;
          transition: background 0.3s ease, transform 0.3s cubic-bezier(0.8, 0, 0.2, 1);
        }
        
        .crn-mob-link:hover { color: var(--crn-black); background: #F2F2F2; }
        .crn-mob-link:hover::before { background: var(--crn-black); transform: scale(1.5); }
        
        .crn-mob-link.active {
          color: var(--crn-white);
          background: var(--crn-black);
        }
        .crn-mob-link.active::before {
          background: var(--crn-orange);
          transform: scale(1.5);
        }

        .crn-mob-divider {
          height: 1px;
          background: var(--crn-gray);
          margin: 8px;
        }

        .crn-mob-cta {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--crn-white);
          background: var(--crn-black);
          border: none;
          cursor: pointer;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          width: 100%;
          margin-top: 4px;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .crn-mob-cta:hover { background: var(--crn-orange); transform: scale(0.98); }

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
                      transitionDelay: mounted ? `${i * 0.05 + 0.1}s` : '0s',
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