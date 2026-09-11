'use client';
import { ExternalLink, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { PATHS } from '@/lib/i18n/routes';
type Link = { label: string; href: string };
const content = {
  en: {
    blurb: 'Licensed loan guidance for Malaysian borrowers. Written eligibility reviews within 24 hours.',
    groups: [
      {
        title: 'Loans',
        links: [
          { label: 'Personal Loan', href: PATHS.loans.personal },
          { label: 'Business Loan', href: PATHS.services },
          { label: 'Debt Consolidation', href: PATHS.loans.debtConsolidation },
          { label: 'Emergency Loan', href: PATHS.loans.emergency },
          { label: 'Loans by state', href: PATHS.serviceAreas },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Loan Guides', href: PATHS.loanGuides },
          { label: 'Blog', href: PATHS.blog },
          { label: 'Tools', href: PATHS.tools },
          { label: 'Required Documents', href: PATHS.documents },
          { label: 'Glossary', href: PATHS.glossary },
          { label: 'FAQ', href: PATHS.faq },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: PATHS.about },
          { label: 'Verify Us', href: PATHS.verifyUs },
          { label: 'Bank Partners', href: PATHS.partners },
          { label: 'Contact', href: PATHS.contact },
          { label: 'Application Status', href: PATHS.status },
          { label: 'Editorial Policy', href: PATHS.editorialPolicy },
        ],
      },
    ] as { title: string; links: Link[] }[],
    contact: 'Contact',
    regulatory:
      'GURU Credits operates under a Moneylenders Act 1951 licence issued by KPKT. Rates shown are indicative flat rates per annum within statutory caps; your actual rate depends on your credit profile. No payment is collected on this website.',
    official: 'Official resources',
    legal: [
      { label: 'Privacy', href: PATHS.privacy },
      { label: 'Terms', href: PATHS.terms },
      { label: 'Disclaimer', href: PATHS.disclaimer },
    ] as Link[],
    rights: 'All rights reserved.',
  },
  ms: {
    blurb: 'Panduan pinjaman berlesen untuk peminjam Malaysia. Semakan kelayakan bertulis dalam 24 jam.',
    groups: [
      {
        title: 'Pinjaman',
        links: [
          { label: 'Pinjaman Peribadi', href: PATHS.loans.personal },
          { label: 'Pinjaman Perniagaan', href: PATHS.services },
          { label: 'Penyatuan Hutang', href: PATHS.loans.debtConsolidation },
          { label: 'Pinjaman Kecemasan', href: PATHS.loans.emergency },
          { label: 'Pinjaman ikut negeri', href: PATHS.serviceAreas },
        ],
      },
      {
        title: 'Sumber',
        links: [
          { label: 'Panduan Pinjaman', href: PATHS.loanGuides },
          { label: 'Blog', href: PATHS.blog },
          { label: 'Alat', href: PATHS.tools },
          { label: 'Dokumen Diperlukan', href: PATHS.documents },
          { label: 'Glosari', href: PATHS.glossary },
          { label: 'Soalan Lazim', href: PATHS.faq },
        ],
      },
      {
        title: 'Syarikat',
        links: [
          { label: 'Tentang', href: PATHS.about },
          { label: 'Sahkan Kami', href: PATHS.verifyUs },
          { label: 'Rakan Bank', href: PATHS.partners },
          { label: 'Hubungi', href: PATHS.contact },
          { label: 'Status Permohonan', href: PATHS.status },
          { label: 'Dasar Editorial', href: PATHS.editorialPolicy },
        ],
      },
    ] as { title: string; links: Link[] }[],
    contact: 'Hubungi',
    regulatory:
      'GURU Credits beroperasi di bawah lesen Akta Pemberi Pinjam Wang 1951 yang dikeluarkan oleh KPKT. Kadar yang dipaparkan adalah kadar rata indikatif setahun dalam had berkanun; kadar sebenar bergantung pada profil kredit anda. Tiada bayaran dikutip di laman web ini.',
    official: 'Sumber rasmi',
    legal: [
      { label: 'Privasi', href: PATHS.privacy },
      { label: 'Terma', href: PATHS.terms },
      { label: 'Penafian', href: PATHS.disclaimer },
    ] as Link[],
    rights: 'Hak cipta terpelihara.',
  },
} as const;
const OFFICIAL = [
  { label: 'Bank Negara Malaysia', href: 'https://www.bnm.gov.my' },
  { label: 'AKPK', href: 'https://www.akpk.org.my' },
  { label: 'BNMTELELINK 1-300-88-5465', href: 'https://www.bnm.gov.my/bnmtelelink' },
];
export function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">{t.blurb}</p>
          <div className="mt-5 flex gap-2">
            {[
              { href: COMPANY.facebook, Icon: Facebook, label: 'Facebook' },
              { href: COMPANY.instagram, Icon: Instagram, label: 'Instagram' },
              { href: COMPANY.whatsappLink, Icon: MessageCircle, label: 'WhatsApp' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        {t.groups.map((group) => (
          <div key={group.title} className="lg:col-span-2">
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <LocaleLink href={link.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                    {link.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold">{t.contact}</h3>
          <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
            <li><a href={COMPANY.phoneLink} className="flex items-start gap-2 hover:text-foreground"><Phone className="mt-0.5 size-4 shrink-0" />{COMPANY.phone}</a></li>
            <li><a href={COMPANY.emailLink} className="flex items-start gap-2 hover:text-foreground"><Mail className="mt-0.5 size-4 shrink-0" />{COMPANY.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /><span>{COMPANY.location}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col gap-4 py-6 text-xs text-foreground-subtle">
          <p className="max-w-4xl leading-relaxed">{t.regulatory}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-semibold uppercase tracking-wider">{t.official}</span>
            {OFFICIAL.map((o) => (
              <a key={o.href} href={o.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                {o.label}
                <ExternalLink className="size-3" />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} {COMPANY.name}. {t.rights}</span>
            <div className="flex gap-4">
              {t.legal.map((l) => (
                <LocaleLink key={l.href} href={l.href} className="hover:text-foreground">{l.label}</LocaleLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
