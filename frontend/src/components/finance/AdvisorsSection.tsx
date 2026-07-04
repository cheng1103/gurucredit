import Image from 'next/image';
import { LocaleLink } from '@/components/LocaleLink';
import { ArrowUpRight } from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

type Advisor = {
  name: string;
  title: { en: string; ms: string };
  bio: { en: string; ms: string };
  credentials: string[];
  yearsOfExperience: number;
};

const advisors: Advisor[] = [
  {
    name: 'Adrian Wong',
    title: {
      en: 'Head of Credit Advisory',
      ms: 'Ketua Perundingan Kredit',
    },
    bio: {
      en: 'Former credit officer at a Malaysian tier-1 bank with a decade of underwriting experience across personal, mortgage, and SME portfolios.',
      ms: 'Bekas pegawai kredit di bank utama Malaysia dengan satu dekad pengalaman dalam pinjaman peribadi, gadai janji dan PKS.',
    },
    credentials: ['CCRIS/CTOS Accredited', 'Certified Financial Planner (CFP)', '10+ yrs banking'],
    yearsOfExperience: 10,
  },
  {
    name: 'Siti Nurhaliza B.',
    title: {
      en: 'Senior Loan Consultant',
      ms: 'Perunding Pinjaman Kanan',
    },
    bio: {
      en: 'Specialist in refinancing and debt consolidation. Has guided over 500 applications, with deep expertise in DSR optimisation.',
      ms: 'Pakar dalam pembiayaan semula dan penyatuan hutang. Telah membimbing lebih 500 permohonan dengan kepakaran DSR.',
    },
    credentials: ['AKPK Certified Counsellor', 'DSR & Affordability Specialist', '500+ cases'],
    yearsOfExperience: 7,
  },
  {
    name: 'Tan Wei Sheng',
    title: {
      en: 'Research & Analytics Lead',
      ms: 'Ketua Analitik & Penyelidikan',
    },
    bio: {
      en: 'Maintains our lender data model and monthly rate benchmarks. Previously a quantitative analyst at a regional wealth firm.',
      ms: 'Menyelenggara model data pemberi pinjam dan penanda aras kadar bulanan. Sebelumnya penganalisis kuantitatif di firma kewangan serantau.',
    },
    credentials: ['CFA Level II Passed', 'BNM Data Model Lead', 'Quant Analytics'],
    yearsOfExperience: 6,
  },
];

const content: Record<Language, { kicker: string; title: string; subtitle: string; cta: string }> = {
  en: {
    kicker: 'Our Team',
    title: 'Advisors who have sat on both sides of the desk.',
    subtitle:
      'Every report is reviewed by a consultant with direct banking or counselling experience — not a chatbot and not a telesales script.',
    cta: 'Read the full team page',
  },
  ms: {
    kicker: 'Pasukan Kami',
    title: 'Perunding yang pernah duduk di kedua-dua belah meja.',
    subtitle:
      'Setiap laporan disemak oleh perunding dengan pengalaman perbankan atau kaunseling langsung — bukan chatbot, bukan telemarketer.',
    cta: 'Baca halaman pasukan penuh',
  },
};

export function AdvisorsSection({ language }: { language: Language }) {
  const t = content[language];
  return (
    <section className="py-24 lg:py-32 border-y border-border/60">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-14">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
              {t.kicker}
            </p>
            <h2 className="font-display text-3xl lg:text-[2.5rem] leading-[1.15] tracking-tight text-foreground">
              {t.title}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg text-muted-foreground leading-relaxed">{t.subtitle}</p>
            <LocaleLink
              href="/about#team"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              {t.cta}
              <ArrowUpRight className="h-4 w-4" />
            </LocaleLink>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {advisors.map((advisor) => (
            <article key={advisor.name} className="flex flex-col gap-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                <Image
                  src="/images/team.jpg"
                  alt={advisor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">{advisor.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{advisor.title[language]}</p>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">{advisor.bio[language]}</p>
              <ul className="flex flex-wrap gap-2 pt-1">
                {advisor.credentials.map((cred) => (
                  <li
                    key={cred}
                    className="text-[11px] font-medium tracking-wide uppercase text-muted-foreground border border-border/80 rounded-full px-3 py-1"
                  >
                    {cred}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
