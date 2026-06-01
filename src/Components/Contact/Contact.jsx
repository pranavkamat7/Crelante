import React, { useState, useEffect, useRef } from "react";
import {
  Send, Mail, Phone, MapPin,
  CheckCircle, AlertCircle, Zap, MessageSquare, Clock, ArrowRight
} from "lucide-react";
import emailjs from "emailjs-com";

const useInView = (threshold = 0.08) => {
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

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "crelanteservice@gmail.com",
    href: "mailto:crelanteservice@gmail.com",
    desc: "We reply within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 93599 48301",
    href: "tel:+919359948301",
    desc: "Mon–Fri, 9am – 6pm IST",
  },
  {
    icon: Phone,
    title: "Alternate",
    value: "+91 92847 34606",
    href: "tel:+919284734606",
    desc: "Mon–Fri, 9am – 6pm IST",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Canacona, Goa",
    href: "https://www.google.com/maps/place/Canacona,+Goa/",
    desc: "South Goa, India",
  },
];

const PERKS = [
  { icon: Zap,          label: 'Fast Response'   },
  { icon: MessageSquare, label: 'Free Consultation' },
  { icon: Clock,         label: '24hr Turnaround'   },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [errors, setErrors]         = useState({});
  const [focused, setFocused]       = useState('');
  const [sectionRef, visible]       = useInView(0.06);

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'Name is required';
    if (!formData.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Email is invalid';
    if (!formData.subject.trim()) e.subject = 'Subject is required';
    if (!formData.message.trim()) e.message = 'Message is required';
    else if (formData.message.trim().length < 10)   e.message = 'At least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setFormStatus('sending');
    try {
      await emailjs.send(
        'service_azs3tfs',
        'template_rwbzv1h',
        { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message },
        'QP9A65ppkGh9qqFDm'
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(''), 6000);
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 6000);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-neutral-950 border-t border-white/5" ref={sectionRef}>

      {/* Header */}
      <div className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs font-bold tracking-widest uppercase text-neutral-300">Get in Touch</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Build Together.</span>
        </h2>
        
        <div className="w-16 h-1.5 bg-orange-500 rounded-full mx-auto mb-6" />

        <p className="text-lg text-neutral-400 font-medium leading-relaxed">
          Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you fast.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 relative z-10">
        
        {/* FORM */}
        <div className={`glass-card p-8 md:p-12 border border-white/5 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-3xl font-black text-white mb-8">Send us a message</h3>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">
                  Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text" name="name" id="name"
                  value={formData.name} onChange={handleChange}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                  placeholder="John Doe"
                  className={`w-full bg-neutral-900 border ${errors.name ? 'border-red-500' : focused === 'name' ? 'border-orange-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-neutral-600 outline-none transition-colors duration-300 focus:ring-2 focus:ring-orange-500/20`}
                />
                {errors.name && <div className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"><AlertCircle size={14}/>{errors.name}</div>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">
                  Email <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email" name="email" id="email"
                  value={formData.email} onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  placeholder="john@example.com"
                  className={`w-full bg-neutral-900 border ${errors.email ? 'border-red-500' : focused === 'email' ? 'border-orange-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-neutral-600 outline-none transition-colors duration-300 focus:ring-2 focus:ring-orange-500/20`}
                />
                {errors.email && <div className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"><AlertCircle size={14}/>{errors.email}</div>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">
                Subject <span className="text-orange-500">*</span>
              </label>
              <input
                type="text" name="subject" id="subject"
                value={formData.subject} onChange={handleChange}
                onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                placeholder="e.g. Custom Software Project"
                className={`w-full bg-neutral-900 border ${errors.subject ? 'border-red-500' : focused === 'subject' ? 'border-orange-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-neutral-600 outline-none transition-colors duration-300 focus:ring-2 focus:ring-orange-500/20`}
              />
              {errors.subject && <div className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"><AlertCircle size={14}/>{errors.subject}</div>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">
                Message <span className="text-orange-500">*</span>
              </label>
              <textarea
                name="message" id="message" rows={5}
                value={formData.message} onChange={handleChange}
                onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                placeholder="Tell us about your project, goals and timeline..."
                className={`w-full bg-neutral-900 border ${errors.message ? 'border-red-500' : focused === 'message' ? 'border-orange-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-neutral-600 outline-none transition-colors duration-300 resize-y min-h-[140px] focus:ring-2 focus:ring-orange-500/20`}
              />
              {errors.message && <div className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"><AlertCircle size={14}/>{errors.message}</div>}
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={formStatus === 'sending'}
              className="group relative w-full flex items-center justify-center gap-2 bg-white text-black font-bold text-lg px-8 py-5 rounded-xl transition-all hover:bg-neutral-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {formStatus === 'sending' ? (
                <><Loader2 size={20} className="animate-spin" /> Sending...</>
              ) : (
                <>Send Message <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>

            {/* Status Messages */}
            {formStatus === 'success' && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 mt-4 animate-[fade-in_0.4s_ease-out]">
                <CheckCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-1">Message sent successfully!</div>
                  <div className="text-sm opacity-80">We'll get back to you within 24 hours.</div>
                </div>
              </div>
            )}
            {formStatus === 'error' && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mt-4 animate-[fade-in_0.4s_ease-out]">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-1">Something went wrong</div>
                  <div className="text-sm opacity-80">Please try again or email us directly.</div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className={`flex flex-col gap-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Contact Info Card */}
          <div className="glass-card p-8 md:p-12 border border-white/5">
            <h3 className="text-2xl font-black text-white mb-8">Contact Information</h3>
            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon;
                return (
                  <a
                    key={i}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center shrink-0 text-white border border-white/5 group-hover:bg-orange-500 group-hover:border-orange-400 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1">{info.title}</div>
                      <div className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors mb-1">{info.value}</div>
                      <div className="text-sm font-medium text-neutral-400">{info.desc}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Promo Card */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-8 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -z-0" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-orange-200 mb-4">
                <Zap size={14} /> Why Work With Us
              </div>
              <h3 className="text-3xl font-black leading-tight mb-4">Ready to build something great?</h3>
              <p className="font-medium text-orange-100 leading-relaxed mb-8">
                From the first conversation to the final deployment — we're with you every step of the way. No jargon, no surprises.
              </p>
              <div className="flex flex-col gap-3">
                {PERKS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 font-bold text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                      {p.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;