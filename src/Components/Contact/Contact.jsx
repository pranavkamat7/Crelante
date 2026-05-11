import React, { useState, useEffect, useRef } from "react";
import {
  Send, Mail, Phone, MapPin,
  CheckCircle, AlertCircle, Zap, MessageSquare, Clock, ArrowRight
} from "lucide-react";
import emailjs from "emailjs-com";

/* ── Intersection observer hook ── */
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

/* ── Contact data ── */
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

/* ── Perks ── */
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

        /* ── Core Theme Colors ── */
        .ct-section {
          --crn-black: #0A0A0A;
          --crn-white: #FFFFFF;
          --crn-bg: #F9F8F6;
          --crn-orange: #FF4E25;
          --crn-gray: #E5E5E5;
          --crn-text-gray: #666666;

          position: relative;
          background: var(--crn-bg);
          padding: 140px 24px;
          overflow: hidden;
          border-top: 1px solid var(--crn-gray);
        }

        /* ── HEADER ── */
        .ct-header {
          position: relative; 
          z-index: 2;
          text-align: center; 
          max-width: 640px;
          margin: 0 auto 72px;
          opacity: 0; 
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .ct-header.ct-in { opacity: 1; transform: translateY(0); }

        .ct-label {
          display: inline-flex; 
          align-items: center; 
          gap: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 800;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 50px;
          margin-bottom: 24px;
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          color: var(--crn-black);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .ct-label-dot {
          width: 8px; height: 8px; 
          border-radius: 50%;
          background: var(--crn-orange); 
        }

        .ct-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4rem);
          font-weight: 800; 
          letter-spacing: -0.03em; 
          line-height: 1.05;
          color: var(--crn-black); 
          margin-bottom: 24px;
        }
        .ct-h2-accent { color: var(--crn-orange); }

        .ct-underline {
          width: 60px;
          height: 6px;
          background: var(--crn-black);
          margin: 0 auto 24px;
          border-radius: 4px;
        }

        .ct-sub {
          font-family: 'Manrope', sans-serif;
          font-size: 1.1rem; 
          line-height: 1.6; 
          color: var(--crn-text-gray);
        }

        /* ── LAYOUT ── */
        .ct-body {
          position: relative; 
          z-index: 2;
          max-width: 1200px; 
          margin: 0 auto;
          display: grid; 
          grid-template-columns: 1.2fr 1fr;
          gap: 32px; 
          align-items: start;
        }

        /* ── FORM CARD ── */
        .ct-form-card {
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 20px; 
          padding: 48px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.03);
          opacity: 0; 
          transform: translateY(24px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.1s;
        }
        .ct-form-card.ct-in { opacity: 1; transform: translateY(0); }

        .ct-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem; 
          font-weight: 800;
          letter-spacing: -0.02em; 
          color: var(--crn-black);
          margin-bottom: 32px; 
        }

        /* Form rows */
        .ct-row-2 {
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 20px; 
          margin-bottom: 20px;
        }
        .ct-field { margin-bottom: 20px; }
        .ct-field:last-of-type { margin-bottom: 0; }

        .ct-label-txt {
          display: block; 
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem; 
          font-weight: 800;
          letter-spacing: 0.05em; 
          text-transform: uppercase;
          color: var(--crn-black); 
          margin-bottom: 8px;
        }
        .ct-req { color: var(--crn-orange); }

        .ct-input, .ct-textarea {
          width: 100%; 
          box-sizing: border-box;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500;
          color: var(--crn-black);
          background: var(--crn-bg);
          border: 1px solid var(--crn-gray);
          border-radius: 8px; 
          padding: 16px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          -webkit-appearance: none;
        }
        .ct-input::placeholder, .ct-textarea::placeholder {
          color: #A0A0A0;
        }
        .ct-input:hover, .ct-textarea:hover {
          border-color: #B0B0B0;
        }
        .ct-input:focus, .ct-textarea:focus {
          background: var(--crn-white);
          border-color: var(--crn-orange);
          box-shadow: 0 0 0 3px rgba(255, 78, 37, 0.1);
        }
        
        .ct-input.has-error, .ct-textarea.has-error {
          border-color: #EF4444 !important;
          background: #FEF2F2;
        }

        .ct-textarea { resize: vertical; min-height: 140px; line-height: 1.6; }

        .ct-err {
          display: flex; 
          align-items: center; 
          gap: 6px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 700;
          color: #EF4444; 
          margin-top: 8px;
        }

        /* Submit button */
        .ct-submit {
          width: 100%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem; 
          font-weight: 800; 
          letter-spacing: 0.05em;
          color: var(--crn-white); 
          padding: 18px; 
          border-radius: 8px; 
          border: none;
          cursor: pointer; 
          margin-top: 32px;
          background: var(--crn-black);
          transition: transform 0.2s cubic-bezier(0.8, 0, 0.2, 1), background 0.3s ease;
        }
        .ct-submit:hover:not(:disabled) {
          background: var(--crn-orange);
          transform: translateY(-2px);
        }
        .ct-submit:active:not(:disabled) { transform: scale(0.98); }
        .ct-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .ct-spin {
          width: 18px; height: 18px; 
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: var(--crn-white);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Status banners */
        .ct-status {
          display: flex; 
          align-items: flex-start; 
          gap: 12px;
          padding: 16px; 
          border-radius: 8px; 
          margin-top: 24px;
          font-family: 'Manrope', sans-serif;
          animation: statusIn 0.4s cubic-bezier(0.8, 0, 0.2, 1);
        }
        @keyframes statusIn { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
        
        .ct-status.success {
          background: #ECFDF5; 
          border: 1px solid #10B981;
          color: #047857;
        }
        .ct-status.error {
          background: #FEF2F2; 
          border: 1px solid #EF4444;
          color: #B91C1C;
        }
        .ct-status-title { font-size: 0.9rem; font-weight: 800; margin-bottom: 2px; }
        .ct-status-sub   { font-size: 0.8rem; font-weight: 500; }

        /* ── RIGHT SIDE ── */
        .ct-right {
          display: flex; 
          flex-direction: column; 
          gap: 32px;
          opacity: 0; 
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.2s, transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.2s;
        }
        .ct-right.ct-in { opacity: 1; transform: translateY(0); }

        /* Contact info card */
        .ct-info-card {
          background: var(--crn-white);
          border: 1px solid var(--crn-gray);
          border-radius: 20px; 
          padding: 40px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.03);
        }
        
        .ct-info-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem; 
          font-weight: 800;
          letter-spacing: -0.02em; 
          color: var(--crn-black);
          margin-bottom: 32px;
        }

        .ct-info-item {
          display: flex; 
          align-items: flex-start; 
          gap: 16px;
          text-decoration: none; 
          margin-bottom: 24px;
          cursor: pointer;
        }
        .ct-info-item:last-child { margin-bottom: 0; }

        .ct-info-icon {
          width: 48px; height: 48px; 
          border-radius: 8px;
          display: flex; 
          align-items: center; 
          justify-content: center;
          flex-shrink: 0;
          background: var(--crn-bg);
          color: var(--crn-black);
          border: 1px solid var(--crn-gray);
          transition: transform 0.3s cubic-bezier(0.8, 0, 0.2, 1), background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .ct-info-item:hover .ct-info-icon { 
          transform: scale(1.1) rotate(-5deg); 
          background: var(--crn-black);
          color: var(--crn-white);
          border-color: var(--crn-black);
        }

        .ct-info-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 800;
          letter-spacing: 0.05em; 
          text-transform: uppercase;
          color: var(--crn-text-gray); 
          margin-bottom: 4px;
        }
        .ct-info-value {
          font-family: 'Manrope', sans-serif;
          font-size: 1rem; 
          font-weight: 800;
          color: var(--crn-black); 
          margin-bottom: 4px;
          transition: color 0.2s ease;
        }
        .ct-info-item:hover .ct-info-value { color: var(--crn-orange); }

        .ct-info-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.85rem; 
          font-weight: 500;
          color: var(--crn-text-gray);
        }

        /* CTA promo card - Dark contrast */
        .ct-promo {
          border-radius: 20px; 
          padding: 40px;
          background: var(--crn-black);
          color: var(--crn-white);
        }

        .ct-promo-tag {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem; 
          font-weight: 800;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          color: var(--crn-orange); 
          margin-bottom: 16px;
        }

        .ct-promo-h {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem; 
          font-weight: 800;
          letter-spacing: -0.02em; 
          color: var(--crn-white);
          margin-bottom: 12px;
        }
        .ct-promo-p {
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500;
          line-height: 1.6;
          color: #A0A0A0; 
          margin-bottom: 24px;
        }

        .ct-perks {
          display: flex; 
          flex-direction: column; 
          gap: 12px;
        }
        .ct-perk {
          display: flex; 
          align-items: center; 
          gap: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem; 
          font-weight: 700;
          color: var(--crn-white);
        }
        .ct-perk-icon { color: var(--crn-orange); flex-shrink: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .ct-body { grid-template-columns: 1fr; }
          .ct-form-card { padding: 32px 24px; }
          .ct-info-card { padding: 32px 24px; }
          .ct-promo { padding: 32px 24px; }
        }
        @media (max-width: 640px) {
          .ct-row-2 { grid-template-columns: 1fr; }
          .ct-section { padding: 100px 20px; }
        }
      `}</style>

      <section id="contact" className="ct-section" ref={sectionRef}>

        {/* Header */}
        <div className={`ct-header ${visible ? 'ct-in' : ''}`}>
          <div className="ct-label">
            <span className="ct-label-dot" />
            05 · Get in Touch
          </div>
          <h2 className="ct-h2">
            Let's <span className="ct-h2-accent">Build Together.</span>
          </h2>
          <div className="ct-underline" />
          <p className="ct-sub">
            Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you fast.
          </p>
        </div>

        <div className="ct-body">
          {/* ── FORM ── */}
          <div className={`ct-form-card ${visible ? 'ct-in' : ''}`}>
            <div className="ct-form-title">
              Send us a message
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name + Email row */}
              <div className="ct-row-2">
                <div>
                  <label className="ct-label-txt">
                    Name <span className="ct-req">*</span>
                  </label>
                  <input
                    type="text" name="name" id="name"
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    placeholder="John Doe"
                    className={`ct-input ${errors.name ? 'has-error' : ''}`}
                  />
                  {errors.name && <div className="ct-err"><AlertCircle size={14}/>{errors.name}</div>}
                </div>
                <div>
                  <label className="ct-label-txt">
                    Email <span className="ct-req">*</span>
                  </label>
                  <input
                    type="email" name="email" id="email"
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    placeholder="john@example.com"
                    className={`ct-input ${errors.email ? 'has-error' : ''}`}
                  />
                  {errors.email && <div className="ct-err"><AlertCircle size={14}/>{errors.email}</div>}
                </div>
              </div>

              {/* Subject */}
              <div className="ct-field">
                <label className="ct-label-txt">
                  Subject <span className="ct-req">*</span>
                </label>
                <input
                  type="text" name="subject" id="subject"
                  value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                  placeholder="e.g. Custom Software Project"
                  className={`ct-input ${errors.subject ? 'has-error' : ''}`}
                />
                {errors.subject && <div className="ct-err"><AlertCircle size={14}/>{errors.subject}</div>}
              </div>

              {/* Message */}
              <div className="ct-field">
                <label className="ct-label-txt">
                  Message <span className="ct-req">*</span>
                </label>
                <textarea
                  name="message" id="message" rows={5}
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                  placeholder="Tell us about your project, goals and timeline..."
                  className={`ct-textarea ${errors.message ? 'has-error' : ''}`}
                />
                {errors.message && <div className="ct-err"><AlertCircle size={14}/>{errors.message}</div>}
              </div>

              {/* Submit */}
              <button type="submit" className="ct-submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? (
                  <><div className="ct-spin" />Sending...</>
                ) : (
                  <>Send Message <ArrowRight size={18} /></>
                )}
              </button>

              {/* Status */}
              {formStatus === 'success' && (
                <div className="ct-status success">
                  <CheckCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="ct-status-title">Message sent successfully!</div>
                    <div className="ct-status-sub">We'll get back to you within 24 hours.</div>
                  </div>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="ct-status error">
                  <AlertCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="ct-status-title">Something went wrong</div>
                    <div className="ct-status-sub">Please try again or email us directly.</div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* ── RIGHT ── */}
          <div className={`ct-right ${visible ? 'ct-in' : ''}`}>
            
            {/* Contact info */}
            <div className="ct-info-card">
              <div className="ct-info-title">Contact Information</div>
              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon;
                return (
                  <a
                    key={i}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="ct-info-item"
                  >
                    <div className="ct-info-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="ct-info-label">{info.title}</div>
                      <div className="ct-info-value">{info.value}</div>
                      <div className="ct-info-desc">{info.desc}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Promo card */}
            <div className="ct-promo">
              <div className="ct-promo-tag">
                <Zap size={14} />
                Why Work With Us
              </div>
              <div className="ct-promo-h">Ready to build something great?</div>
              <p className="ct-promo-p">
                From the first conversation to the final deployment — we're with you every step of the way. No jargon, no surprises.
              </p>
              <div className="ct-perks">
                {PERKS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="ct-perk">
                      <Icon size={18} className="ct-perk-icon" />
                      {p.label}
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;