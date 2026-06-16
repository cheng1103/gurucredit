import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  FileSearch,
  Gauge,
  Building2,
  Wallet,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';
import { localeHref, PATHS } from '@/lib/i18n/routes';

const content: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
    footNote: string;
    cta: string;
  }
> = {
  en: {
    eyebrow: 'What you receive in the first 48 hours',
    title: 'A written review, a document plan, and a clear next step.',
    subtitle:
      'We do not leave borrowers guessing. After we review your profile, we explain the likely route, the friction points, and what to prepare before any formal submission.',
    items: [
      {
        title: 'Borrower profile snapshot',
        desc: 'A practical read on income strength, current commitments, and the main issues likely to affect approval.',
      },
      {
        title: 'CCRIS, CTOS, and DSR interpretation',
        desc: 'A written explanation of the file signals that matter most, with a clearer view of affordability and lender fit.',
      },
      {
        title: 'Priority document checklist',
        desc: 'You will know what to send first, what can wait, and which missing items are most likely to slow the case down.',
      },
      {
        title: 'Suggested route and amount range',
        desc: 'Instead of a vague promise, we outline the route that looks most workable for your profile and commitment level.',
      },
      {
        title: 'Official WhatsApp follow-up',
        desc: 'The consultant continues the review with written next steps, clarifications, and secure document handling through official channels.',
      },
      {
        title: 'Verified process and payment guidance',
        desc: 'If a report or review fee applies, we explain it only through our official WhatsApp after confirming your details.',
      },
    ],
    footNote:
      'No payment is collected on this website. Borrowers should verify the process, the official contact details, and the next step before sending documents or money.',
    cta: 'Start eligibility review',
  },
  ms: {
    eyebrow: 'Apa yang anda terima dalam 48 jam pertama',
    title: 'Semakan bertulis, pelan dokumen, dan langkah seterusnya yang jelas.',
    subtitle:
      'Kami tidak biarkan peminjam meneka. Selepas kami semak profil anda, kami terangkan laluan yang lebih sesuai, titik geseran utama, dan apa yang perlu disediakan sebelum penghantaran rasmi.',
    items: [
      {
        title: 'Ringkasan profil peminjam',
        desc: 'Bacaan praktikal tentang kekuatan pendapatan, komitmen semasa, dan isu utama yang mungkin menjejaskan kelulusan.',
      },
      {
        title: 'Tafsiran CCRIS, CTOS, dan DSR',
        desc: 'Penjelasan bertulis tentang isyarat fail yang paling penting, dengan gambaran yang lebih jelas tentang kemampuan dan kesesuaian lender.',
      },
      {
        title: 'Senarai semak dokumen ikut keutamaan',
        desc: 'Anda akan tahu dokumen mana perlu dihantar dahulu, mana boleh tunggu, dan item mana paling berpotensi melambatkan kes.',
      },
      {
        title: 'Cadangan laluan dan julat jumlah',
        desc: 'Daripada janji kabur, kami terangkan laluan yang kelihatan paling sesuai untuk profil dan tahap komitmen anda.',
      },
      {
        title: 'Susulan WhatsApp rasmi',
        desc: 'Perunding akan teruskan semakan dengan langkah bertulis, penjelasan lanjut, dan pengendalian dokumen yang selamat melalui saluran rasmi.',
      },
      {
        title: 'Panduan proses dan bayaran yang disahkan',
        desc: 'Jika ada yuran laporan atau semakan yang berkaitan, kami terangkan hanya melalui WhatsApp rasmi selepas butiran anda disahkan.',
      },
    ],
    footNote:
      'Tiada bayaran dikutip di laman web ini. Peminjam patut sahkan proses, maklumat hubungan rasmi, dan langkah seterusnya sebelum menghantar dokumen atau wang.',
    cta: 'Mulakan semakan kelayakan',
  },
};

const icons = [FileSearch, Gauge, Building2, Wallet, MessageCircle, ShieldCheck];

export function Rm30DeliverablesSection({ language }: { language: Language }) {
  const t = content[language];
  return (
    <section data-nosnippet className="py-24 lg:py-32 bg-background">
      <div className="container max-w-6xl">
        <div className="max-w-2xl mb-14 lg:mb-16">
          <p className="eyebrow text-muted-foreground mb-4">{t.eyebrow}</p>
          <h2 className="font-display text-3xl lg:text-5xl leading-[1.05] tracking-[-0.025em] text-foreground">
            {t.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t.subtitle}</p>
        </div>

        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? FileSearch;
            return (
              <li key={index} className="flex gap-5">
                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-t border-border/60 pt-8">
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed italic">
            {t.footNote}
          </p>
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-sm font-semibold tracking-wide uppercase rounded-full whitespace-nowrap"
          >
            <Link href={localeHref(language, PATHS.eligibilityTest)}>
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
