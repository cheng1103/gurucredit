'use client';

import { Button } from '@/components/ui/button';
import { Compass, Home, ArrowLeft, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { COMPANY } from '@/lib/constants';

const content = {
  en: {
    eyebrow: '404 · Page not found',
    title: 'We could not find that page.',
    description:
      'The link may be broken, the page may have moved, or you may have mistyped the URL. Our site covers personal loans, business financing, debt consolidation, and eligibility analysis — one of these might be what you were looking for.',
    suggestedTitle: 'You might be looking for:',
    suggestions: [
      { label: 'Start my RM30 CTOS analysis', href: '/services/1/apply', primary: true },
      { label: 'Personal loan playbook', href: '/loans/personal' },
      { label: 'Debt consolidation guidance', href: '/loans/debt-consolidation' },
      { label: 'Eligibility test', href: '/eligibility-test' },
      { label: 'Frequently asked questions', href: '/faq' },
    ],
    goHome: 'Back to home',
    goBack: 'Go back',
    whatsapp: 'Talk to us on WhatsApp',
  },
  ms: {
    eyebrow: '404 · Halaman tidak dijumpai',
    title: 'Kami tidak menemui halaman itu.',
    description:
      'Pautan mungkin telah rosak, halaman telah dipindahkan, atau anda tersalah URL. Laman kami meliputi pinjaman peribadi, pembiayaan perniagaan, penyatuan hutang, dan analisis kelayakan — salah satu mungkin yang anda cari.',
    suggestedTitle: 'Mungkin anda mahu:',
    suggestions: [
      { label: 'Mulakan analisis CTOS RM30', href: '/services/1/apply', primary: true },
      { label: 'Panduan pinjaman peribadi', href: '/loans/personal' },
      { label: 'Panduan penyatuan hutang', href: '/loans/debt-consolidation' },
      { label: 'Ujian kelayakan', href: '/eligibility-test' },
      { label: 'Soalan lazim', href: '/faq' },
    ],
    goHome: 'Kembali ke utama',
    goBack: 'Undur',
    whatsapp: 'Hubungi kami di WhatsApp',
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 left-0 w-[25rem] h-[25rem] bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container relative py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-6">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            {t.eyebrow}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] text-foreground mb-6">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            {t.description}
          </p>

          <p className="eyebrow text-muted-foreground mb-4">{t.suggestedTitle}</p>
          <ul className="space-y-3 mb-12">
            {t.suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                    s.primary ? 'text-primary hover:text-primary/80' : 'text-foreground hover:text-primary'
                  }`}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 border-t border-border/60 pt-8">
            <Button asChild size="lg" className="h-12 px-8 rounded-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {t.goHome}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 rounded-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.goBack}
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 px-6 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 border-0"
            >
              <Link
                href={COMPANY.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t.whatsapp}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
