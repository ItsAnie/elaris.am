import React, { useState } from 'react';
import { Sparkles, Phone, Mail, Instagram, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import contactConfig from '../../data/contactConfig';
import useTranslation from '../../hooks/useTranslation';
import { submitContact } from '../../services/api';

export default function ContactSection() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || (!formData.phone.trim() && !formData.email.trim()) || !formData.message.trim()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Error sending message');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-elaris-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-elaris-text tracking-tight">
            {t('contact.title')}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-elaris-text-muted leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* 2-Column Layout: Direct Details + Quick Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          {/* Left Column: Configurable Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone */}
            <a
              href={`tel:${contactConfig.phoneRaw}`}
              className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-elaris-border shadow-sm hover:border-elaris-accent/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-elaris-bg flex items-center justify-center text-elaris-accent group-hover:bg-elaris-accent group-hover:text-white transition-all shadow-inner">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-elaris-text-muted block">
                  {t('contact.info.phoneTitle')}
                </span>
                <span className="text-sm sm:text-base font-semibold text-elaris-text group-hover:text-elaris-accent transition-colors">
                  {contactConfig.phoneDisplay}
                </span>
              </div>
            </a>
            
            {/* Instagram */}
            <a
              href={contactConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-elaris-border shadow-sm hover:border-elaris-accent/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-elaris-bg flex items-center justify-center text-elaris-accent group-hover:bg-elaris-accent group-hover:text-white transition-all shadow-inner">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-elaris-text-muted block">
                  {t('contact.info.instagramTitle')}
                </span>
                <span className="text-sm sm:text-base font-semibold text-elaris-text group-hover:text-elaris-accent transition-colors">
                  {contactConfig.instagramHandle}
                </span>
              </div>
            </a>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border border-elaris-border shadow-elaris-card">
            <h3 className="font-serif text-2xl font-bold text-elaris-text mb-6">
              {t('contact.form.title')}
            </h3>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 text-elaris-accent flex-shrink-0" />
                <span>{t('contact.form.success')}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-elaris-text mb-1.5">
                  {t('contact.form.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent focus:bg-white text-sm text-elaris-text outline-none transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-elaris-text mb-1.5">
                    {t('order.fields.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+374..."
                    className="w-full px-4 py-3 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent focus:bg-white text-sm text-elaris-text outline-none transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-elaris-text mb-1.5">
                    {t('order.fields.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent focus:bg-white text-sm text-elaris-text outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-elaris-text mb-1.5">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent focus:bg-white text-sm text-elaris-text outline-none transition-all shadow-inner resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-elaris-text text-white hover:bg-black font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('contact.form.submitting')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('contact.form.submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
