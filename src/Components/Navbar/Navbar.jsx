import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Services', href: 'services' },
  { name: 'Products', href: 'products' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
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

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${isScrolled ? 'glass px-4 py-3' : 'px-2 py-2'}`}>
          
          {/* Logo */}
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group">
            <img src="/crelante.jpg" alt="Crelante" className="h-10 w-auto rounded-xl object-contain transition-transform duration-500 group-hover:scale-110" />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300">Crelante</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeSection === link.href ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
              >
                {activeSection === link.href && (
                  <span className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] -z-10" />
                )}
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button onClick={() => scrollToSection('contact')} className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold bg-orange-500 text-white rounded-full hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(255,78,37,0.4)] hover:scale-105 transition-all duration-300">
              Let's Talk
            </button>
            
            <button 
              className="md:hidden p-2 text-neutral-300 hover:text-white bg-white/5 rounded-xl border border-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-6 right-6 mt-2 transition-all duration-500 ease-out origin-top ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
          <div className="glass-card p-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button onClick={() => scrollToSection('contact')} className="mt-2 w-full px-4 py-3 text-sm font-bold bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;