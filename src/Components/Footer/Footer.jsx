import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  ArrowRight,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#contact' },
    ],
    Solutions: [
      { name: 'Custom Software', href: '#services' },
      { name: 'IoT Solutions', href: '#services' },
      { name: 'SaaS Platforms', href: '#services' },
      { name: 'Performance Ads', href: '#services' },
      { name: 'Google Services', href: '#services' },
    ],
    Resources: [
      { name: 'Portfolio', href: '#projects' },
      { name: 'Case Studies', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Support', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/crelante.service?igsh=MXYxZTBpcGplNXI0ZA%3D%3D&utm_source=qr', label: 'Instagram' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Github size={18} />, href: '#', label: 'Github' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ── Core Footer Theme ── */
        .crf-footer {
          --f-bg: #0A0A0A;
          --f-card: #141414;
          --f-border: #262626;
          --f-text: #FFFFFF;
          --f-muted: #888888;
          --f-orange: #FF4E25;

          position: relative;
          overflow: hidden;
          background: var(--f-bg);
          border-top: 1px solid var(--f-border);
          color: var(--f-text);
        }

        /* Subtle dark grid */
        .crf-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at center top, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center top, black 20%, transparent 80%);
          pointer-events: none;
        }

        .crf-container {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 24px 0;
        }

        .crf-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 32px;
          margin-bottom: 64px;
        }

        .crf-brand-card,
        .crf-news-card {
          background: var(--f-card);
          border: 1px solid var(--f-border);
          border-radius: 20px;
          padding: 40px;
        }

        .crf-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--f-orange);
          background: transparent;
          border: 1px solid var(--f-orange);
          border-radius: 50px;
          padding: 6px 14px;
          margin-bottom: 24px;
        }

        .crf-chip-dot {
          width: 6px;
          height: 6px;
          background: var(--f-orange);
          border-radius: 50%;
        }

        .crf-logo-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .crf-logo-box {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: var(--f-text);
          flex-shrink: 0;
        }

        .crf-logo-box img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .crf-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--f-text);
        }

        .crf-brand-text {
          font-family: 'Manrope', sans-serif;
          color: var(--f-muted);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 32px;
          font-size: 1rem;
          font-weight: 500;
        }

        .crf-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .crf-social {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: var(--f-muted);
          background: transparent;
          border: 1px solid var(--f-border);
          transition: all 0.3s ease;
        }

        .crf-social:hover {
          transform: translateY(-3px);
          color: var(--f-text);
          border-color: var(--f-orange);
          background: var(--f-orange);
        }

        .crf-news-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--f-text);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .crf-news-text {
          font-family: 'Manrope', sans-serif;
          color: var(--f-muted);
          line-height: 1.6;
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .crf-form {
          display: flex;
          gap: 12px;
        }

        .crf-input {
          flex: 1;
          min-width: 0;
          background: var(--f-bg);
          border: 1px solid var(--f-border);
          color: var(--f-text);
          border-radius: 10px;
          padding: 16px;
          outline: none;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }

        .crf-input::placeholder {
          color: var(--f-muted);
        }

        .crf-input:focus {
          border-color: var(--f-orange);
        }

        .crf-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          padding: 16px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          color: var(--f-text);
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          background: var(--f-orange);
          transition: transform 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }

        .crf-btn:hover {
          transform: translateY(-2px);
          background: #E03E15;
        }

        .crf-links-wrap {
          padding: 0 12px;
          margin-bottom: 40px;
        }

        .crf-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .crf-links-title {
          font-family: 'Syne', sans-serif;
          color: var(--f-text);
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 24px;
        }

        .crf-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .crf-links-list li + li {
          margin-top: 16px;
        }

        .crf-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--f-muted);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .crf-link-line {
          width: 0;
          height: 2px;
          background: var(--f-orange);
          transition: width 0.25s ease;
        }

        .crf-link:hover {
          color: var(--f-text);
          transform: translateX(4px);
        }

        .crf-link:hover .crf-link-line {
          width: 16px;
        }

        .crf-bottom {
          border-top: 1px solid var(--f-border);
          padding: 32px 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .crf-copy,
        .crf-made {
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--f-muted);
        }

        .crf-made {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .crf-heart { color: var(--f-orange); fill: var(--f-orange); }

        .crf-policy {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 24px;
        }

        .crf-policy a {
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--f-muted);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .crf-policy a:hover {
          color: var(--f-orange);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 992px) {
          .crf-top {
            grid-template-columns: 1fr;
          }
          .crf-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .crf-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .crf-container {
            padding: 64px 20px 0;
          }
          .crf-brand-card,
          .crf-news-card {
            padding: 32px 24px;
          }
          .crf-links-wrap {
            padding: 0;
          }
          .crf-links-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .crf-form {
            flex-direction: column;
          }
          .crf-btn {
            width: 100%;
          }
          .crf-policy {
            gap: 16px 20px;
          }
        }
      `}</style>

      <footer className="crf-footer">
        <div className="crf-grid" />

        <div className="crf-container">
          <div className="crf-top">
            {/* Brand Card */}
            <div className="crf-brand-card">
              <div className="crf-chip">
                <span className="crf-chip-dot" />
                Innovation & Growth
              </div>

              <div className="crf-logo-row">
                <div className="crf-logo-box">
                  {/* Assuming your logo can sit well on a white background, otherwise replace with raw text/svg */}
                  <img src="/crelante.png" alt="Crelante Logo" />
                </div>
                <div className="crf-brand-name">Crelante</div>
              </div>

              <p className="crf-brand-text">
                Crelante builds custom software, intelligent IoT systems, and scalable platforms. We partner with ambitious brands to drive growth through technology and data-driven marketing.
              </p>

              <div className="crf-socials">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="crf-social"
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="crf-news-card">
              <div className="crf-chip">
                <span className="crf-chip-dot" />
                Stay Updated
              </div>

              <h3 className="crf-news-title">Get updates on what we’re building</h3>
              <p className="crf-news-text">
                Subscribe for product updates, engineering insights, and growth strategies delivered directly to your inbox.
              </p>

              <form className="crf-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="crf-input"
                />
                <button type="submit" className="crf-btn">
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="crf-links-wrap">
            <div className="crf-links-grid">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="crf-links-title">{category}</h3>
                  <ul className="crf-links-list">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="crf-link">
                          <span className="crf-link-line" />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="crf-bottom">
            <div className="crf-copy">© {currentYear} Crelante. All rights reserved.</div>

            <div className="crf-made">
              Made with <Heart size={16} className="crf-heart" /> by Crelante Team
            </div>

            <div className="crf-policy">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;