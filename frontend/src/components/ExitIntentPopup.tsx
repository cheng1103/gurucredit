'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Gift, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/i18n';
import { leadsAPI } from '@/lib/api';
import { SERVICE_AREAS } from '@/lib/constants';

const content = {
  en: {
    title: 'Wait! Before You Go...',
    subtitle: 'Get a FREE Loan Eligibility Check',
    description: 'Find out how much you can borrow in just 2 minutes. No commitment required.',
    benefits: [
      'Know your maximum loan amount',
      'Check your DSR instantly',
      'Get personalized bank recommendations',
    ],
    cta: 'Get Free Check',
    skipText: 'No thanks, I\'ll figure it out myself',
    placeholder: 'Enter your WhatsApp number',
    success: 'Thank you! We\'ll contact you shortly.',
    errorEmpty: 'Please enter your phone number',
    serviceAreaLabel: 'Where do you live?',
    serviceAreaHelper: 'We assist borrowers nationwide, including Sabah and Sarawak.',
  },
  ms: {
    title: 'Tunggu! Sebelum Anda Pergi...',
    subtitle: 'Dapatkan Semakan Kelayakan Pinjaman PERCUMA',
    description: 'Ketahui berapa banyak anda boleh pinjam dalam masa 2 minit. Tiada komitmen diperlukan.',
    benefits: [
      'Ketahui jumlah pinjaman maksimum anda',
      'Semak DSR anda dengan segera',
      'Dapatkan cadangan bank yang diperibadikan',
    ],
    cta: 'Dapatkan Semakan Percuma',
    skipText: 'Tidak terima kasih',
    placeholder: 'Masukkan nombor WhatsApp anda',
    success: 'Terima kasih! Kami akan menghubungi anda.',
    errorEmpty: 'Sila masukkan nombor telefon anda',
    serviceAreaLabel: 'Anda tinggal di mana?',
    serviceAreaHelper: 'Kami membantu peminjam di seluruh Malaysia termasuk Sabah dan Sarawak.',
  },
};

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [serviceArea, setServiceArea] = useState<
    (typeof SERVICE_AREAS)[number]['regionCode']
  >(SERVICE_AREAS[0].regionCode);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, t: translate } = useTranslation();
  const t = content[language];

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves from top of page
    if (e.clientY <= 0) {
      const hasSeenPopup = sessionStorage.getItem('exitPopupSeen');
      if (!hasSeenPopup) {
        setIsVisible(true);
        sessionStorage.setItem('exitPopupSeen', 'true');
      }
    }
  }, []);

  useEffect(() => {
    // Only add listener on desktop
    if (window.innerWidth >= 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseLeave]);

  // ESC key to close popup
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.trim()) {
      setError(t.errorEmpty);
      return;
    }

    setIsLoading(true);
    try {
      await leadsAPI.capture({
        phone: phone.trim(),
        serviceArea,
        source: 'EXIT_INTENT',
        pageUrl: typeof window !== 'undefined' ? window.location.pathname : undefined,
        language,
      });
      setIsSubmitted(true);

      // Close popup after 2 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (err) {
      console.error('Exit-intent lead capture failed', err);
      setError(translate('toast.genericError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-title"
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-300"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Gift icon header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <h2 id="exit-popup-title" className="text-2xl font-bold text-white">{t.title}</h2>
          <p className="text-white/90 mt-1">{t.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-medium text-gray-900">{t.success}</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-center mb-6">{t.description}</p>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {t.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 text-sm">
                  <label className="font-medium" htmlFor="exit-service-area">
                    {t.serviceAreaLabel}
                  </label>
                  <select
                    id="exit-service-area"
                    value={serviceArea}
                    onChange={(e) =>
                      setServiceArea(
                        e.target.value as (typeof SERVICE_AREAS)[number]['regionCode'],
                      )
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 text-sm"
                  >
                    {SERVICE_AREAS.map((area) => (
                      <option key={area.regionCode} value={area.regionCode}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">{t.serviceAreaHelper}</p>
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder={t.placeholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`h-12 text-base ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'phone-error' : undefined}
                  />
                  {error && <p id="phone-error" className="text-red-500 text-sm mt-1 flex items-center gap-1" role="alert">{error}</p>}
                </div>
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                    <>
                      {t.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Skip link */}
              <button
                onClick={handleClose}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4 py-2"
              >
                {t.skipText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
