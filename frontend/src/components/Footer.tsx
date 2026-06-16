'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo, slogans } from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  ArrowRight,
  Shield,
  Award,
  Clock,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { useTranslation, localeHref } from '@/lib/i18n';
import { COMPANY, SERVICE_AREA_LABEL } from '@/lib/constants';
import { newsletterAPI } from '@/lib/api';
import { toast } from 'sonner';

// Bilingual footer content
const footerContent = {
  en: {
    newsletter: {
      title: 'Stay Updated',
      subtitle: 'Get the latest tips on loan eligibility and financial planning.',
      paymentNotice: 'Reminder: any applicable review fee is explained only through our official WhatsApp after you submit your form.',
      placeholder: 'Enter your email',
      button: 'Subscribe',
    },
    slogan: slogans.en,
    sloganMs: slogans.ms,
    description: `Fast and clear loan guidance for ${SERVICE_AREA_LABEL}. Your trusted nationwide lending partner.`,
    quickLinks: {
      title: 'Quick Links',
      items: [
        { href: '/services', label: 'Our Services' },
        { href: '/contact', label: 'Contact' },
        { href: '/faq', label: 'FAQ' },
        { href: '/blog', label: 'Blog' },
        { href: '/loan-guides', label: 'Loan Guides' },
        { href: '/service-areas', label: 'Service Areas' },
        { href: '/partners', label: 'Bank Partners' },
        { href: '/verify-us', label: 'Verify Us' },
      ],
    },
    loanProducts: {
      title: 'Loan Products',
      items: [
        { href: '/loans/personal', label: 'Personal Loan' },
        { href: '/services/4/apply', label: 'Business Loan' },
        { href: '/loans/debt-consolidation', label: 'Debt Consolidation' },
        { href: '/loans/emergency', label: 'Emergency Loan' },
      ],
    },
    tools: {
      title: 'Free Tools',
      items: [
        { href: '/eligibility-test', label: 'Eligibility Test' },
        { href: '/eligibility-test', label: 'Eligibility Test' },
        { href: '/compare', label: 'Compare Loans' },
        { href: '/glossary', label: 'Loan Glossary' },
        { href: '/documents', label: 'Required Documents' },
      ],
    },
    contact: {
      title: 'Contact Us',
      phone: 'Phone',
      email: 'Email',
      location: 'Location',
    },
    trustBadges: [
      { label: 'Secure & Confidential' },
      { label: 'PDPA Compliant' },
      { label: '24hr Approval' },
    ],
    copyright: `© ${new Date().getFullYear()} GURU Credits. All rights reserved.`,
    legal: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer',
    },
    regulatoryDisclaimer: 'Interest rates displayed are indicative flat rates per annum. Actual rates and terms are subject to eligibility assessment and approval. All loans are subject to credit evaluation.',
  },
  ms: {
    newsletter: {
      title: 'Kekal Terkini',
      subtitle: 'Dapatkan tips terkini tentang kelayakan pinjaman dan perancangan kewangan.',
      paymentNotice: 'Peringatan: sebarang yuran semakan yang berkaitan hanya diterangkan melalui WhatsApp rasmi kami selepas borang dihantar.',
      placeholder: 'Masukkan e-mel anda',
      button: 'Langgan',
    },
    slogan: slogans.ms,
    sloganMs: slogans.en,
    description: `Panduan pinjaman yang pantas dan jelas untuk ${SERVICE_AREA_LABEL}. Rakan pinjaman dipercayai anda di seluruh negara.`,
    quickLinks: {
      title: 'Pautan Pantas',
      items: [
        { href: '/services', label: 'Perkhidmatan Kami' },
        { href: '/contact', label: 'Hubungi' },
        { href: '/faq', label: 'Soalan Lazim' },
        { href: '/blog', label: 'Blog' },
        { href: '/loan-guides', label: 'Panduan Pinjaman' },
        { href: '/service-areas', label: 'Kawasan Perkhidmatan' },
        { href: '/partners', label: 'Rakan Bank' },
        { href: '/verify-us', label: 'Sahkan Kami' },
      ],
    },
    loanProducts: {
      title: 'Produk Pinjaman',
      items: [
        { href: '/loans/personal', label: 'Pinjaman Peribadi' },
        { href: '/services/4/apply', label: 'Pinjaman Perniagaan' },
        { href: '/loans/debt-consolidation', label: 'Penyatuan Hutang' },
        { href: '/loans/emergency', label: 'Pinjaman Kecemasan' },
      ],
    },
    tools: {
      title: 'Alat Percuma',
      items: [
        { href: '/eligibility-test', label: 'Ujian Kelayakan' },
        { href: '/eligibility-test', label: 'Ujian Kelayakan' },
        { href: '/compare', label: 'Bandingkan Pinjaman' },
        { href: '/glossary', label: 'Glosari Pinjaman' },
        { href: '/documents', label: 'Dokumen Diperlukan' },
      ],
    },
    contact: {
      title: 'Hubungi Kami',
      phone: 'Telefon',
      email: 'E-mel',
      location: 'Lokasi',
    },
    trustBadges: [
      { label: 'Selamat & Sulit' },
      { label: 'Patuh PDPA' },
      { label: 'Kelulusan 24 Jam' },
    ],
    copyright: `© ${new Date().getFullYear()} GURU Credits. Hak cipta terpelihara.`,
    legal: {
      privacy: 'Dasar Privasi',
      terms: 'Syarat Perkhidmatan',
      disclaimer: 'Penafian',
    },
    regulatoryDisclaimer: 'Kadar faedah yang dipaparkan adalah kadar rata indikatif setahun. Kadar dan terma sebenar tertakluk kepada penilaian dan kelulusan kelayakan. Semua pinjaman tertakluk kepada penilaian kredit.',
  },
};

const trustIcons = [Shield, Award, Clock];

export function Footer() {
  const { language, t: translate } = useTranslation();
  const t = footerContent[language];
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      await newsletterAPI.subscribe(email);
      setSubscribed(true);
      setEmail('');
      toast.success(translate('toast.subscribeSuccess'));
    } catch (err) {
      console.error('Newsletter subscription failed', err);
      toast.error(translate('toast.subscribeError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.newsletter.title}</h3>
              <p className="opacity-90">
                {t.newsletter.subtitle}
              </p>
              <p data-nosnippet className="mt-2 text-xs text-white/80">
                {t.newsletter.paymentNotice}
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              {subscribed ? (
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5" />
                  <span>{translate('toast.newsletterThanks')}</span>
                </div>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder={t.newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 placeholder:text-white/60 text-white"
                    required
                  />
                  <Button type="submit" variant="secondary" className="shrink-0" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                      <>
                        {t.newsletter.button}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-muted/50 border-t">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="space-y-6">
              <Logo size="sm" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{t.slogan}</p>
                <p className="text-sm italic text-muted-foreground">{t.sloganMs}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.description}
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={COMPANY.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={COMPANY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t.quickLinks.title}</h4>
              <ul className="space-y-3">
                {t.quickLinks.items.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={localeHref(language, link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all mr-0 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Loan Products */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t.loanProducts.title}</h4>
              <ul className="space-y-3">
                {t.loanProducts.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localeHref(language, link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all mr-0 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Free Tools */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t.tools.title}</h4>
              <ul className="space-y-3">
                {t.tools.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localeHref(language, link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all mr-0 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t.contact.title}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.contact.phone}</p>
                    <a href={COMPANY.phoneLink} className="text-sm text-muted-foreground hover:text-primary">
                      {COMPANY.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.contact.email}</p>
                    <a href={`mailto:${COMPANY.email}`} className="text-sm text-muted-foreground hover:text-primary">
                      {COMPANY.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.contact.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {COMPANY.location}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap justify-center gap-8">
              {t.trustBadges.map((badge, index) => {
                const Icon = trustIcons[index];
                return (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory Resources + Disclaimer */}
      <div className="bg-muted/30 border-t">
        <div className="container py-5 space-y-3">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-[0.18em] text-[10px]">
              {language === 'ms' ? 'Rujukan Rasmi' : 'Official Resources'}
            </span>
            <a href="https://www.bnm.gov.my" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Bank Negara Malaysia ↗
            </a>
            <a href="https://www.akpk.org.my" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              AKPK Credit Counselling ↗
            </a>
            <a href="https://telelink.bnm.gov.my" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              BNMTELELINK 1-300-88-5465 ↗
            </a>
          </div>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {t.regulatoryDisclaimer}
          </p>
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed italic">
            {language === 'ms'
              ? 'GURU Credits dilesenkan di bawah Akta Pemberi Pinjam Wang 1951. Maklumat lesen boleh didapati atas permintaan.'
              : 'GURU Credits operates under a Moneylenders Act 1951 license. License details available on request.'}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-muted/80 border-t">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t.copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href={localeHref(language, "/privacy")} className="hover:text-primary transition-colors">
                {t.legal.privacy}
              </Link>
              <Link href={localeHref(language, "/terms")} className="hover:text-primary transition-colors">
                {t.legal.terms}
              </Link>
              <Link href={localeHref(language, "/disclaimer")} className="hover:text-primary transition-colors">
                {t.legal.disclaimer}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
