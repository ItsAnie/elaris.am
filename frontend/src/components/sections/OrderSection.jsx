import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import useTranslation from '../../hooks/useTranslation';
import { submitOrder } from '../../services/api';

export default function OrderSection({ preselectedInvitation, preselectedPackage }) {
  const { t, getLocalized } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    brideName: '',
    groomName: '',
    phone: '',
    email: '',
    eventType: 'wedding',
    preferredInvitation: '',
    package: 'elegant',
    eventDate: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const isWeddingOrEngagement = formData.eventType === 'wedding' || formData.eventType === 'engagement';

  // Sync pre-selected invitation or package if passed down
  useEffect(() => {
    if (preselectedInvitation) {
      const invTitle = typeof preselectedInvitation.title === 'object'
        ? getLocalized(preselectedInvitation.title)
        : preselectedInvitation.title;

      setFormData(prev => ({
        ...prev,
        preferredInvitation: invTitle,
        eventType: preselectedInvitation.category || prev.eventType
      }));
    }
  }, [preselectedInvitation, getLocalized]);

  useEffect(() => {
    if (preselectedPackage) {
      setFormData(prev => ({
        ...prev,
        package: preselectedPackage.key || prev.package
      }));
    }
  }, [preselectedPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (isWeddingOrEngagement) {
      if (!formData.brideName.trim()) {
        errors.brideName = t('order.messages.validationError');
      }
      if (!formData.groomName.trim()) {
        errors.groomName = t('order.messages.validationError');
      }
    } else {
      if (!formData.name.trim()) {
        errors.name = t('order.messages.validationError');
      }
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 5) {
      errors.phone = t('order.messages.validationError');
    }
    if (!formData.eventType) {
      errors.eventType = t('order.messages.validationError');
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Invalid email';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Prepare payload
    const submissionPayload = {
      ...formData,
      name: isWeddingOrEngagement
        ? `${formData.brideName.trim()} & ${formData.groomName.trim()}`
        : formData.name.trim(),
      brideName: isWeddingOrEngagement ? formData.brideName.trim() : null,
      groomName: isWeddingOrEngagement ? formData.groomName.trim() : null,
    };

    try {
      await submitOrder(submissionPayload);
      setStatus('success');

      // Gentle celebratory confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B8A79A', '#DDD4CA', '#C9B6A8', '#3F3A36']
      });

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          brideName: '',
          groomName: '',
          phone: '',
          email: '',
          eventType: 'wedding',
          preferredInvitation: '',
          package: 'elegant',
          eventDate: '',
          message: ''
        });
      }, 1200);
    } catch (err) {
      console.error('Order submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || t('order.messages.errorDesc'));
    }
  };

  return (
    <section id="order" className="py-20 md:py-28 bg-elaris-bg relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-elaris-text-muted mb-2 block">
            {t('order.badge')}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-elaris-dark tracking-tight">
            {t('order.title')}
          </h2>

          <p className="mt-3.5 text-sm text-elaris-text-muted leading-relaxed">
            {t('order.subtitle')}
          </p>
        </div>

        {/* Success Alert Banner */}
        {status === 'success' && (
          <div className="mb-8 p-6 bg-elaris-bg-card border border-elaris-border rounded-2xl text-center space-y-2 animate-fade-in shadow-elaris-soft">
            <CheckCircle2 className="w-10 h-10 text-elaris-accent mx-auto" />
            <h3 className="font-serif text-lg font-bold text-elaris-dark">
              {t('order.messages.successTitle')}
            </h3>
            <p className="text-xs text-elaris-text-muted">
              {t('order.messages.successDesc')}
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-3 inline-flex text-xs font-medium text-elaris-dark underline underline-offset-4"
            >
              Պատվիրել ևս մեկը / Оформить еще / Order another
            </button>
          </div>
        )}

        {/* Error Alert Banner */}
        {status === 'error' && (
          <div className="mb-8 p-4 bg-red-50/80 border border-red-200 rounded-xl flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-red-900">{t('order.messages.errorTitle')}</h4>
              <p className="text-xs text-red-700 mt-0.5">{errorMessage || t('order.messages.errorDesc')}</p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-elaris-bg-card rounded-3xl p-6 sm:p-9 border border-elaris-border shadow-elaris-soft"
        >
          <div className="space-y-5">
            {/* Event Type Dropdown - Top Priority to Determine Name Fields */}
            <div>
              <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                {t('order.fields.eventType')}
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm cursor-pointer"
              >
                <option value="wedding">{t('order.eventOptions.wedding')}</option>
                <option value="engagement">{t('order.eventOptions.engagement')}</option>
                <option value="birthday">{t('order.eventOptions.birthday')}</option>
                <option value="baptism">{t('order.eventOptions.baptism')}</option>
                <option value="corporate">{t('order.eventOptions.corporate')}</option>
              </select>
            </div>

            {/* Conditional Name Fields: Bride & Groom OR Single Name */}
            {isWeddingOrEngagement ? (
              /* Two separate name fields for Wedding / Engagement */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 animate-fade-in">
                {/* Bride's Name */}
                <div>
                  <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                    {t('order.fields.brideName')}
                  </label>
                  <input
                    type="text"
                    name="brideName"
                    value={formData.brideName}
                    onChange={handleChange}
                    placeholder={t('order.fields.brideNamePlaceholder')}
                    required
                    className={`w-full px-4 py-2.5 rounded-xl bg-elaris-bg border text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm ${
                      fieldErrors.brideName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-elaris-border focus:border-elaris-accent'
                    }`}
                  />
                  {fieldErrors.brideName && (
                    <span className="text-[11px] text-red-500 mt-1 block">{fieldErrors.brideName}</span>
                  )}
                </div>

                {/* Groom's Name */}
                <div>
                  <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                    {t('order.fields.groomName')}
                  </label>
                  <input
                    type="text"
                    name="groomName"
                    value={formData.groomName}
                    onChange={handleChange}
                    placeholder={t('order.fields.groomNamePlaceholder')}
                    required
                    className={`w-full px-4 py-2.5 rounded-xl bg-elaris-bg border text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm ${
                      fieldErrors.groomName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-elaris-border focus:border-elaris-accent'
                    }`}
                  />
                  {fieldErrors.groomName && (
                    <span className="text-[11px] text-red-500 mt-1 block">{fieldErrors.groomName}</span>
                  )}
                </div>
              </div>
            ) : (
              /* Single Name Field for other event types (Birthday, Baptism, Corporate) */
              <div className="animate-fade-in">
                <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                  {t('order.fields.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('order.fields.namePlaceholder')}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl bg-elaris-bg border text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm ${
                    fieldErrors.name ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-elaris-border focus:border-elaris-accent'
                  }`}
                />
                {fieldErrors.name && (
                  <span className="text-[11px] text-red-500 mt-1 block">{fieldErrors.name}</span>
                )}
              </div>
            )}

            {/* Contact Details: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                  {t('order.fields.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('order.fields.phonePlaceholder')}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl bg-elaris-bg border text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm ${
                    fieldErrors.phone ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-elaris-border focus:border-elaris-accent'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                  {t('order.fields.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('order.fields.emailPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Details: Preferred Invitation & Event Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                  {t('order.fields.preferredInvitation')}
                </label>
                <input
                  type="text"
                  name="preferredInvitation"
                  value={formData.preferredInvitation}
                  onChange={handleChange}
                  placeholder={t('order.fields.preferredInvitationPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                  {t('order.fields.eventDate')}
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Message / Wishes */}
            <div>
              <label className="block text-xs font-medium text-elaris-dark mb-1.5">
                {t('order.fields.message')}
              </label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('order.fields.messagePlaceholder')}
                className="w-full px-4 py-2.5 rounded-xl bg-elaris-bg border border-elaris-border focus:border-elaris-accent text-xs sm:text-sm text-elaris-text outline-none transition-all shadow-sm resize-y"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-7 text-center sm:text-right">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-elaris-dark hover:bg-black text-elaris-bg text-xs font-medium tracking-wide uppercase shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t('order.fields.submitting')}</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('order.fields.submit')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
