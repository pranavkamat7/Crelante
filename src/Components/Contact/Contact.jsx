import React, { useState, useEffect, useRef } from "react";
import {
  Send, Mail, Phone, MapPin,
  CheckCircle, AlertCircle, ArrowRight, Zap, MessageSquare, Clock,
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
    accent: "pink",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 93599 48301",
    href: "tel:+919359948301",
    desc: "Mon–Fri, 9am – 6pm IST",
    accent: "blue",
  },
  {
    icon: Phone,
    title: "Alternate",
    value: "+91 92847 34606",
    href: "tel:+919284734606",
    desc: "Mon–Fri, 9am – 6pm IST",
    accent: "violet",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Canacona, Goa",
    href: "https://www.google.com/maps/place/Canacona,+Goa/",
    desc: "South Goa, India",
    accent: "pink",
  },
];

const ACCENT = {
  pink:   { color: '#f020b8', bg: 'rgba(240,32,184,0.1)',  border: 'rgba(240,32,184,0.22)', glow: 'rgba(240,32,184,0.2)',  text: 'rgba(240,130,210,0.9)' },
  blue:   { color: '#3ab8f5', bg: 'rgba(58,184,245,0.1)',  border: 'rgba(58,184,245,0.22)',  glow: 'rgba(58,184,245,0.2)',  text: 'rgba(100,210,250,0.9)' },
  violet: { color: '#7b2fff', bg: 'rgba(123,47,255,0.1)',  border: 'rgba(123,47,255,0.22)',  glow: 'rgba(123,47,255,0.2)',  text: 'rgba(180,140,255,0.9)' },
};

/* ── Perks ── */
const PERKS = [
  { icon: Zap,           label: 'Fast Response'       },
  { icon: MessageSquare, label: 'Free Consultation'   },
  { icon: Clock,         label: '24hr Turnaround'     },
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .ct-section {
          --pink:   #f020b8;
          --blue:   #3ab8f5;
          --violet: #7b2fff;
          --bg:     #0d0b2a;
          --bg2:    #08071a;
          --text:   #f0eeff;
          --muted:  rgba(210,200,255,0.52);

          position: relative;
          background: var(--bg);
          padding: 120px 24px 130px;
          overflow: hidden;
        }

        /* Top beam */
        .ct-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent,
            rgba(58,184,245,0.55) 30%, rgba(240,32,184,0.55) 70%, transparent);
        }

        /* BG ambience */
        .ct-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 50% at 0%   40%, rgba(240,32,184,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 100% 60%, rgba(58,184,245,0.07)  0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 50% 100%, rgba(123,47,255,0.05) 0%, transparent 55%);
        }
        .ct-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(240,32,184,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,184,245,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 90%);
        }

        /* ── HEADER ── */
        .ct-header {
          position: relative; z-index: 2;
          text-align: center; max-width: 640px;
          margin: 0 auto 72px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .ct-header.ct-in { opacity: 1; transform: translateY(0); }

        .ct-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(240,120,210,0.8); margin-bottom: 18px;
        }
        .ct-lb  { width:28px;height:1px;background:linear-gradient(90deg,var(--pink),transparent); }
        .ct-lbr { width:28px;height:1px;background:linear-gradient(90deg,transparent,var(--blue)); }

        .ct-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
          color: var(--text); margin-bottom: 16px;
        }
        .ct-h2-grad {
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 200% 200%;
          animation: ctGrad 5s ease infinite;
        }
        @keyframes ctGrad { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
        .ct-sub {
          font-family: 'Manrope', sans-serif;
          font-size: 1rem; line-height: 1.75; color: var(--muted);
        }

        /* ── LAYOUT ── */
        .ct-body {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 24px; align-items: start;
        }

        /* ── FORM CARD ── */
        .ct-form-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px; padding: 40px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s,
                      transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s;
        }
        .ct-form-card.ct-in { opacity: 1; transform: translateX(0); }

        /* Animated border beam on form */
        .ct-form-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 24px; padding: 1px;
          background: linear-gradient(135deg,
            rgba(240,32,184,0.35), rgba(123,47,255,0.35), rgba(58,184,245,0.35));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          background-size: 200% 200%; animation: formBorder 6s ease infinite;
          pointer-events: none;
        }
        @keyframes formBorder { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }

        .ct-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem; font-weight: 800;
          letter-spacing: -0.02em; color: var(--text);
          margin-bottom: 28px; display: flex; align-items: center; gap: 10px;
        }
        .ct-form-title-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--pink); box-shadow: 0 0 10px var(--pink);
          animation: titleDot 2s ease-in-out infinite;
        }
        @keyframes titleDot { 0%,100%{transform:scale(1);} 50%{transform:scale(1.3);opacity:0.7;} }

        /* Form rows */
        .ct-row-2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;
        }
        .ct-field { margin-bottom: 14px; }
        .ct-field:last-of-type { margin-bottom: 0; }

        .ct-label-txt {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.73rem; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: rgba(190,185,240,0.6); margin-bottom: 8px;
        }
        .ct-req { color: var(--pink); line-height: 1; }

        .ct-input, .ct-textarea {
          width: 100%; box-sizing: border-box;
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem; font-weight: 400;
          color: var(--text);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px; padding: 12px 16px;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          -webkit-appearance: none;
        }
        .ct-input::placeholder, .ct-textarea::placeholder {
          color: rgba(180,175,230,0.28);
        }
        .ct-input:focus, .ct-textarea:focus {
          background: rgba(255,255,255,0.05);
        }
        .ct-input.focused-name,   .ct-textarea.focused-message { border-color: rgba(240,32,184,0.45); box-shadow: 0 0 0 3px rgba(240,32,184,0.08); }
        .ct-input.focused-email   { border-color: rgba(58,184,245,0.45);  box-shadow: 0 0 0 3px rgba(58,184,245,0.08);  }
        .ct-input.focused-subject { border-color: rgba(123,47,255,0.45);  box-shadow: 0 0 0 3px rgba(123,47,255,0.08);  }
        .ct-input.has-error, .ct-textarea.has-error {
          border-color: rgba(248,113,113,0.5) !important;
          box-shadow: 0 0 0 3px rgba(248,113,113,0.08) !important;
        }

        .ct-textarea { resize: none; min-height: 120px; line-height: 1.65; }

        .ct-err {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          color: rgba(248,113,113,0.85); margin-top: 6px;
        }

        /* Submit button */
        .ct-submit {
          position: relative; overflow: hidden;
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem; font-weight: 700; letter-spacing: 0.06em;
          color: #fff; padding: 15px 28px; border-radius: 14px; border: none;
          cursor: pointer; margin-top: 20px;
          background: linear-gradient(135deg, var(--pink) 0%, var(--violet) 50%, var(--blue) 100%);
          background-size: 200% 200%; animation: ctGrad 4s ease infinite;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, opacity 0.3s ease;
        }
        .ct-submit:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 14px 42px rgba(240,32,184,0.4), 0 0 0 1px rgba(58,184,245,0.2);
        }
        .ct-submit:active:not(:disabled) { transform: scale(0.98); }
        .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; animation: none; background-position: 0% 50%; }

        .ct-submit-sheen {
          position: absolute; top:0; left:-120%; width:55%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-18deg); transition: left 0.5s ease; pointer-events: none;
        }
        .ct-submit:hover .ct-submit-sheen { left: 150%; }

        .ct-spin {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Status banners */
        .ct-status {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 16px; border-radius: 12px; margin-top: 16px;
          font-family: 'Manrope', sans-serif;
          animation: statusIn 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes statusIn { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
        .ct-status.success {
          background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.22);
          color: rgba(110,230,180,0.9);
        }
        .ct-status.error {
          background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.22);
          color: rgba(248,160,160,0.9);
        }
        .ct-status-title { font-size: 0.83rem; font-weight: 700; margin-bottom: 2px; }
        .ct-status-sub   { font-size: 0.75rem; opacity: 0.75; }

        /* ── RIGHT SIDE ── */
        .ct-right {
          display: flex; flex-direction: column; gap: 16px;
          opacity: 0; transform: translateX(24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s,
                      transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s;
        }
        .ct-right.ct-in { opacity: 1; transform: translateX(0); }

        /* Contact info card */
        .ct-info-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px; padding: 32px;
          position: relative; overflow: hidden;
        }
        .ct-info-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem; font-weight: 800;
          letter-spacing: -0.02em; color: var(--text);
          margin-bottom: 24px;
        }

        .ct-info-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px; border-radius: 14px;
          border: 1px solid transparent;
          text-decoration: none; cursor: pointer;
          transition: all 0.25s ease;
          margin-bottom: 8px;
        }
        .ct-info-item:last-child { margin-bottom: 0; }
        .ct-info-item:hover { background: rgba(255,255,255,0.03); }

        .ct-info-icon {
          width: 42px; height: 42px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .ct-info-item:hover .ct-info-icon { transform: scale(1.1) rotate(-4deg); }

        .ct-info-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(180,175,230,0.4); margin-bottom: 3px;
        }
        .ct-info-value {
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem; font-weight: 700;
          color: var(--text); margin-bottom: 2px;
        }
        .ct-info-desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.72rem; color: rgba(180,175,230,0.45);
        }

        /* CTA promo card */
        .ct-promo {
          position: relative; overflow: hidden;
          border-radius: 24px; padding: 32px;
          background: rgba(240,32,184,0.04);
          border: 1px solid rgba(240,32,184,0.15);
        }

        /* Animated gradient border */
        .ct-promo::before {
          content: '';
          position: absolute; inset: 0; border-radius: 24px; padding: 1px;
          background: linear-gradient(135deg,
            rgba(240,32,184,0.55), rgba(123,47,255,0.55), rgba(58,184,245,0.55));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          background-size: 200% 200%; animation: formBorder 4s ease infinite;
          pointer-events: none;
        }

        .ct-promo-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 0%   0%,   rgba(240,32,184,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 100% 100%, rgba(58,184,245,0.08) 0%, transparent 60%);
        }

        .ct-promo-tag {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(240,120,210,0.8); margin-bottom: 12px;
        }
        .ct-promo-tag-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--pink); box-shadow: 0 0 8px var(--pink);
          animation: titleDot 2s ease-in-out infinite;
        }

        .ct-promo-h {
          position: relative; z-index: 1;
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem; font-weight: 800;
          letter-spacing: -0.02em; color: var(--text);
          margin-bottom: 10px;
        }
        .ct-promo-p {
          position: relative; z-index: 1;
          font-family: 'Manrope', sans-serif;
          font-size: 0.83rem; line-height: 1.7;
          color: var(--muted); margin-bottom: 20px;
        }

        .ct-perks {
          position: relative; z-index: 1;
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .ct-perk {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.73rem; font-weight: 600;
          color: rgba(210,205,255,0.75);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          padding: 6px 12px; border-radius: 8px;
          backdrop-filter: blur(6px);
          transition: all 0.25s ease;
        }
        .ct-perk:hover {
          background: rgba(240,32,184,0.1);
          border-color: rgba(240,32,184,0.25);
          color: rgba(240,160,220,0.9);
        }
        .ct-perk-icon { color: var(--pink); flex-shrink: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ct-body { grid-template-columns: 1fr; }
          .ct-row-2 { grid-template-columns: 1fr; }
          .ct-section { padding: 80px 20px 90px; }
        }
      `}</style>

      <section id="contact" className="ct-section" ref={sectionRef}>
        <div className="ct-bg" />
        <div className="ct-grid" />

        {/* Header */}
        <div className={`ct-header ${visible ? 'ct-in' : ''}`}>
          <div className="ct-label">
            <span className="ct-lb" />
            Contact Us
            <span className="ct-lbr" />
          </div>
          <h2 className="ct-h2">
            Let's <span className="ct-h2-grad">Build Together</span>
          </h2>
          <p className="ct-sub">
            Have a project in mind? We'd love to hear about it — drop us a message and we'll get back to you fast.
          </p>
        </div>

        <div className="ct-body">
          {/* ── FORM ── */}
          <div className={`ct-form-card ${visible ? 'ct-in' : ''}`}>
            <div className="ct-form-title">
              <span className="ct-form-title-dot" />
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
                    className={`ct-input ${focused === 'name' ? 'focused-name' : ''} ${errors.name ? 'has-error' : ''}`}
                  />
                  {errors.name && <div className="ct-err"><AlertCircle size={12}/>{errors.name}</div>}
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
                    className={`ct-input ${focused === 'email' ? 'focused-email' : ''} ${errors.email ? 'has-error' : ''}`}
                  />
                  {errors.email && <div className="ct-err"><AlertCircle size={12}/>{errors.email}</div>}
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
                  placeholder="e.g. IoT Project Inquiry"
                  className={`ct-input ${focused === 'subject' ? 'focused-subject' : ''} ${errors.subject ? 'has-error' : ''}`}
                />
                {errors.subject && <div className="ct-err"><AlertCircle size={12}/>{errors.subject}</div>}
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
                  className={`ct-textarea ${focused === 'message' ? 'focused-message' : ''} ${errors.message ? 'has-error' : ''}`}
                />
                {errors.message && <div className="ct-err"><AlertCircle size={12}/>{errors.message}</div>}
              </div>

              {/* Submit */}
              <button type="submit" className="ct-submit" disabled={formStatus === 'sending'}>
                <span className="ct-submit-sheen" />
                {formStatus === 'sending' ? (
                  <><div className="ct-spin" />Sending...</>
                ) : (
                  <><Send size={16} />Send Message</>
                )}
              </button>

              {/* Status */}
              {formStatus === 'success' && (
                <div className="ct-status success">
                  <CheckCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div className="ct-status-title">Message sent!</div>
                    <div className="ct-status-sub">We'll get back to you within 24 hours.</div>
                  </div>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="ct-status error">
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
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
                const a = ACCENT[info.accent];
                return (
                  <a
                    key={i}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="ct-info-item"
                    style={{ '--hover-border': a.border }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = a.border;
                      e.currentTarget.style.background = a.bg;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      className="ct-info-icon"
                      style={{ background: a.bg, color: a.color, boxShadow: `0 0 18px ${a.glow}` }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 28px ${a.glow}`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="ct-info-label">{info.title}</div>
                      <div className="ct-info-value" style={{ color: a.text }}>{info.value}</div>
                      <div className="ct-info-desc">{info.desc}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Promo card */}
            <div className="ct-promo">
              <div className="ct-promo-bg" />
              <div className="ct-promo-tag">
                <span className="ct-promo-tag-dot" />
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
                      <Icon size={13} className="ct-perk-icon" />
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
