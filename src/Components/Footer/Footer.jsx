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
      { name: 'SaaS Products', href: '#services' },
      { name: 'Web Platforms', href: '#services' },
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .crf-footer {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.14) 0%, transparent 70%),
            radial-gradient(ellipse 35% 30% at 10% 20%, rgba(59,130,246,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 30% 25% at 90% 30%, rgba(139,92,246,0.09) 0%, transparent 70%),
            #07080f;
          border-top: 1px solid rgba(255,255,255,0.07);
          color: #c7ccef;
        }

        .crf-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 100%);
          pointer-events: none;
        }

        .crf-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .crf-orb-1 {
          width: 280px;
          height: 280px;
          top: -80px;
          left: -60px;
          background: rgba(99,102,241,0.14);
        }

        .crf-orb-2 {
          width: 240px;
          height: 240px;
          right: -60px;
          bottom: -60px;
          background: rgba(139,92,246,0.12);
        }

        .crf-container {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 78px 24px 0;
        }

        .crf-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 28px;
          margin-bottom: 54px;
        }

        .crf-brand-card,
        .crf-news-card,
        .crf-links-wrap,
        .crf-bottom {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.18);
        }

        .crf-brand-card,
        .crf-news-card {
          border-radius: 24px;
          padding: 28px;
        }

        .crf-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(139,92,246,0.9);
          background: rgba(139,92,246,0.08);
          border: 1px solid rgba(139,92,246,0.22);
          border-radius: 999px;
          padding: 6px 14px;
          margin-bottom: 20px;
        }

        .crf-chip-dot {
          width: 6px;
          height: 6px;
          background: #8b5cf6;
          border-radius: 50%;
        }

        .crf-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .crf-logo-box {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18));
          border: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .crf-logo-box img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .crf-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.7rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #f0f2ff 0%, #b8bfff 45%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .crf-brand-text {
          font-family: 'Manrope', sans-serif;
          color: rgba(180,185,220,0.7);
          line-height: 1.8;
          max-width: 560px;
          margin-bottom: 24px;
          font-size: 0.98rem;
        }

        .crf-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .crf-social {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: rgba(214,219,255,0.82);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }

        .crf-social:hover {
          transform: translateY(-3px);
          color: #fff;
          border-color: rgba(139,92,246,0.35);
          background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18));
          box-shadow: 0 12px 30px rgba(99,102,241,0.18);
        }

        .crf-news-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.45rem;
          font-weight: 800;
          color: #edf0ff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .crf-news-text {
          font-family: 'Manrope', sans-serif;
          color: rgba(180,185,220,0.7);
          line-height: 1.75;
          font-size: 0.95rem;
          margin-bottom: 20px;
        }

        .crf-form {
          display: flex;
          gap: 10px;
        }

        .crf-input {
          flex: 1;
          min-width: 0;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.09);
          color: #f3f5ff;
          border-radius: 14px;
          padding: 14px 16px;
          outline: none;
          font-family: 'Manrope', sans-serif;
          transition: all 0.25s ease;
        }

        .crf-input::placeholder {
          color: rgba(160,166,208,0.5);
        }

        .crf-input:focus {
          border-color: rgba(129,140,248,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .crf-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          padding: 14px 20px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          color: #fff;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          white-space: nowrap;
        }

        .crf-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(99,102,241,0.28);
        }

        .crf-links-wrap {
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 22px;
        }

        .crf-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .crf-links-title {
          font-family: 'Syne', sans-serif;
          color: #edf0ff;
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .crf-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .crf-links-list li + li {
          margin-top: 12px;
        }

        .crf-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          color: rgba(180,185,220,0.72);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .crf-link-line {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #818cf8, #a78bfa);
          transition: width 0.25s ease;
        }

        .crf-link:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .crf-link:hover .crf-link-line {
          width: 16px;
        }

        .crf-bottom {
          border-radius: 22px 22px 0 0;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 22px;
        }

        .crf-copy,
        .crf-made {
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          color: rgba(165,170,210,0.68);
        }

        .crf-made {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .crf-policy {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 20px;
        }

        .crf-policy a {
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          color: rgba(165,170,210,0.68);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .crf-policy a:hover {
          color: #ffffff;
        }

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
            padding: 64px 18px 0;
          }

          .crf-brand-card,
          .crf-news-card,
          .crf-links-wrap {
            padding: 22px;
            border-radius: 20px;
          }

          .crf-links-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .crf-form {
            flex-direction: column;
          }

          .crf-btn {
            width: 100%;
          }

          .crf-policy {
            gap: 12px 18px;
          }
        }
      `}</style>

      <footer className="crf-footer">
        <div className="crf-grid" />
        <div className="crf-orb crf-orb-1" />
        <div className="crf-orb crf-orb-2" />

        <div className="crf-container">
          <div className="crf-top">
            <div className="crf-brand-card">
              <div className="crf-chip">
                <span className="crf-chip-dot" />
                Software · IoT · SaaS
              </div>

              <div className="crf-logo-row">
                <div className="crf-logo-box">
                  <img src="/crelante.png" alt="Crelante Logo" />
                </div>
                <div className="crf-brand-name">Crelante</div>
              </div>

              <p className="crf-brand-text">
                Crelante builds custom software, intelligent IoT systems, and scalable
                SaaS products that help businesses operate smarter and grow faster.
              </p>

              <div className="crf-socials">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="crf-social"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="crf-news-card">
              <div className="crf-chip">
                <span className="crf-chip-dot" />
                Stay Updated
              </div>

              <h3 className="crf-news-title">Get updates on what we’re building</h3>
              <p className="crf-news-text">
                Subscribe for product updates, insights, and company news delivered to your inbox.
              </p>

              <form className="crf-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="crf-input"
                />
                <button type="submit" className="crf-btn">
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

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

          <div className="crf-bottom">
            <div className="crf-copy">© {currentYear} Crelante. All rights reserved.</div>

            <div className="crf-made">
              Made with <Heart size={15} className="text-red-500 fill-red-500" /> by Crelante Team
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