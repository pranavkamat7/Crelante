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
    <footer className="relative bg-neutral-950 text-white border-t border-white/5 overflow-hidden">
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(circle at top center, black 20%, transparent 80%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mb-16">
          
          {/* Brand Card */}
          <div className="glass-card p-10 border border-white/5 bg-neutral-900/40">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500">Innovation & Growth</span>
            </div>

              <div className="flex items-center gap-4 mb-6">
                <img src="/crelante.jpg" alt="Crelante Logo" className="h-12 w-auto rounded-xl shadow-lg object-contain bg-white" />
              <div className="text-3xl font-black tracking-tight text-white">Crelante</div>
            </div>

            <p className="text-neutral-400 font-medium leading-relaxed max-w-xl mb-10 text-base">
              Crelante builds custom software, intelligent IoT systems, and scalable platforms. We partner with ambitious brands to drive growth through technology and data-driven marketing.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-transparent border border-white/10 text-neutral-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="glass-card p-10 border border-white/5 bg-neutral-900/40">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 mb-8 bg-neutral-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-300">Stay Updated</span>
            </div>

            <h3 className="text-2xl font-black text-white leading-tight tracking-tight mb-3">Get updates on what we’re building</h3>
            <p className="text-neutral-400 font-medium leading-relaxed mb-8 text-sm">
              Subscribe for product updates, engineering insights, and growth strategies delivered directly to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-neutral-950 border border-white/10 text-white rounded-xl px-5 py-4 outline-none placeholder-neutral-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
              />
              <button type="submit" className="group inline-flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-white font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,78,37,0.3)]">
                Subscribe
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="px-4 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xl font-black text-white mb-6 tracking-tight">{category}</h3>
                <ul className="flex flex-col gap-4">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="group inline-flex items-center gap-2 text-neutral-400 font-medium hover:text-white hover:translate-x-1 transition-all duration-300">
                        <span className="w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-3" />
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
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-neutral-500 font-medium text-sm">
            © {currentYear} Crelante. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-medium text-sm">
            Made with <Heart size={14} className="text-orange-500 fill-orange-500" /> by Crelante Team
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
              <a key={policy} href="#" className="text-neutral-500 font-medium text-sm hover:text-orange-500 transition-colors">
                {policy}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;