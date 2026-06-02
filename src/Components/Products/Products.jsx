import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Wand2, Crop, Image as ImageIcon, Sparkles, UserRound, FileText, Zap, Calculator, Download } from 'lucide-react';

const Products = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">Our Products</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Crelante</span>
          </h2>
          <p className="text-lg text-neutral-400 font-medium leading-relaxed">
            Discover our in-house suite of AI-powered tools designed to streamline your daily workflows.
          </p>
        </div>

        {/* Featured Product: Passportly */}
        <div className={`glass-card p-1 border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-12`}>
          <div className="bg-neutral-900/60 rounded-[1.9rem] overflow-hidden">
            <div className="flex flex-col items-center text-center p-10 lg:p-16 max-w-4xl mx-auto">
              
              {/* Product Info */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <UserRound size={32} />
                  </div>
                  <h3 className="text-4xl font-black text-white">Passportly</h3>
                </div>

                <p className="text-neutral-300 text-lg leading-relaxed font-medium mb-10 max-w-2xl">
                  The smartest way to create perfect passport photos. Passportly uses advanced AI to instantly remove messy backgrounds, auto-crop your face to exact standard dimensions, and generate print-ready passport-sized sheets in seconds.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full">
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Wand2 size={18} />
                    </div>
                    AI BG Removal
                  </div>
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Crop size={18} />
                    </div>
                    Face Detection
                  </div>
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Sparkles size={18} />
                    </div>
                    HD Enhance
                  </div>
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                      <ImageIcon size={18} />
                    </div>
                    Print-Ready
                  </div>
                </div>

                <a 
                  href="https://passportly.onrender.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 justify-center px-10 py-5 bg-white text-black text-lg font-bold rounded-xl hover:bg-neutral-200 transition-all duration-300 w-full sm:w-auto shadow-xl"
                >
                  Try Passportly for Free
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Product: InvoiceGen */}
        <div className={`glass-card p-1 border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-neutral-900/60 rounded-[1.9rem] overflow-hidden">
            <div className="flex flex-col items-center text-center p-10 lg:p-16 max-w-4xl mx-auto">
              
              {/* Product Info */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                    <FileText size={32} />
                  </div>
                  <h3 className="text-4xl font-black text-white">InvoiceGen</h3>
                </div>

                <p className="text-neutral-300 text-lg leading-relaxed font-medium mb-10 max-w-2xl">
                  Create professional invoices in seconds. InvoiceGen offers an intuitive, blazing-fast interface to generate, customize, and export stunning PDF invoices for your business, keeping your billing cycle seamless and professional.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full">
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Zap size={18} />
                    </div>
                    Instant Generation
                  </div>
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
                      <FileText size={18} />
                    </div>
                    Custom Templates
                  </div>
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                      <Calculator size={18} />
                    </div>
                    Auto Calculations
                  </div>
                  <div className="flex flex-col items-center gap-3 text-sm font-medium text-neutral-400">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                      <Download size={18} />
                    </div>
                    PDF Export
                  </div>
                </div>

                <a 
                  href="https://invoicegen-mfwq.onrender.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 justify-center px-10 py-5 bg-white text-black text-lg font-bold rounded-xl hover:bg-neutral-200 transition-all duration-300 w-full sm:w-auto shadow-xl"
                >
                  Try InvoiceGen for Free
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
