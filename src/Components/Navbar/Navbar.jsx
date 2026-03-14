import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const linkRefs = useRef({});

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Products', href: 'products' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const element = document.getElementById(link.href);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
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
    const activeRef = linkRefs.current[activeSection];
    if (activeRef && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeRef.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');

        .cr-nav {
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 50;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', sans-serif;
        }

        .cr-nav-bg {
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .cr-nav-bg.scrolled {
          background: rgba(4, 6, 15, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99, 179, 237, 0.12);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }

        .cr-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .cr-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
        }

        .cr-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #e2e8f0 0%, #63b3ed 50%, #9f7aea 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .cr-logo-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #63b3ed;
          border-radius: 50%;
          margin-left: 1px;
          vertical-align: super;
          -webkit-text-fill-color: initial;
          background-clip: initial;
        }

        .cr-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          position: relative;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .cr-indicator {
          position: absolute;
          bottom: -4px;
          height: 2px;
          background: linear-gradient(90deg, #63b3ed, #9f7aea);
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .cr-link {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(160, 174, 192, 0.8);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0.85rem;
          border-radius: 6px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .cr-link:hover {
          color: #e2e8f0;
          background: rgba(99, 179, 237, 0.06);
        }

        .cr-link.active {
          color: #e2e8f0;
        }

        .cr-cta {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #04060f;
          background: linear-gradient(135deg, #63b3ed 0%, #9f7aea 100%);
          border: none;
          cursor: pointer;
          padding: 0.55rem 1.35rem;
          border-radius: 6px;
          transition: all 0.25s ease;
          white-space: nowrap;
          margin-left: 1rem;
        }

        .cr-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(99, 179, 237, 0.35);
        }

        .cr-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(99, 179, 237, 0.08);
          border: 1px solid rgba(99, 179, 237, 0.2);
          border-radius: 8px;
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .cr-hamburger:hover {
          background: rgba(99, 179, 237, 0.15);
          border-color: rgba(99, 179, 237, 0.4);
        }

        .cr-mobile-menu {
          display: none;
          flex-direction: column;
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid rgba(99, 179, 237, 0.1);
          gap: 0.25rem;
          animation: slideDown 0.25s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cr-mobile-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(160, 174, 192, 0.8);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-align: left;
          transition: all 0.2s ease;
          width: 100%;
        }

        .cr-mobile-link:hover,
        .cr-mobile-link.active {
          color: #e2e8f0;
          background: rgba(99, 179, 237, 0.08);
        }

        .cr-mobile-link.active {
          border-left: 2px solid #63b3ed;
          padding-left: calc(1rem - 2px);
        }

        .cr-mobile-cta {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #04060f;
          background: linear-gradient(135deg, #63b3ed 0%, #9f7aea 100%);
          border: none;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-align: center;
          margin-top: 0.5rem;
          width: 100%;
          transition: all 0.25s ease;
        }

        .cr-status-dot {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(72, 187, 120, 0.9);
          letter-spacing: 0.05em;
          padding: 3px 8px;
          background: rgba(72, 187, 120, 0.08);
          border: 1px solid rgba(72, 187, 120, 0.2);
          border-radius: 20px;
          margin-left: 0.75rem;
        }

        .cr-status-dot::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #48bb78;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 900px) {
          .cr-nav-links, .cr-cta, .cr-status-dot {
            display: none;
          }
          .cr-hamburger {
            display: flex;
          }
          .cr-mobile-menu.open {
            display: flex;
          }
          .cr-nav-bg.scrolled .cr-mobile-menu.open {
            background: rgba(4, 6, 15, 0.95);
          }
        }
      `}</style>

      <nav className={`cr-nav cr-nav-bg ${isScrolled ? 'scrolled' : ''}`}>
        <div className="cr-inner">
          {/* Logo — original preserved */}
          <button className="cr-logo" onClick={() => scrollToSection('home')}>
            <img src="/crelante.png" alt="Crelante Logo" className="w-8 h-8 inline-block" />
            <span className="cr-logo-text">Crelante</span>
          </button>

          {/* Status badge */}
          <span className="cr-status-dot">Available for Projects</span>

          {/* Desktop Nav */}
          <div ref={navRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ul className="cr-nav-links">
              {/* Sliding indicator */}
              <div className="cr-indicator" style={indicatorStyle} />
              {navLinks.map((item) => (
                <li key={item.href}>
                  <button
                    ref={(el) => (linkRefs.current[item.href] = el)}
                    onClick={() => scrollToSection(item.href)}
                    className={`cr-link ${activeSection === item.href ? 'active' : ''}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <button className="cr-cta" onClick={() => scrollToSection('contact')}>
              Get in Touch
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="cr-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`cr-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`cr-mobile-link ${activeSection === item.href ? 'active' : ''}`}
            >
              {item.name}
            </button>
          ))}
          <button className="cr-mobile-cta" onClick={() => scrollToSection('contact')}>
            Get in Touch
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
