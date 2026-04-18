import Link from 'next/link';
import { Building, ExternalLink, Scale, HandCoins } from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

const content: Record<Language, { badge: string; title: string; desc: string; resources: { label: string; url: string; note: string }[]; footNote: string }> = {
  en: {
    badge: 'Regulatory Resources',
    title: 'Know Your Rights as a Borrower',
    desc: 'We advocate responsible borrowing. Below are official Malaysian resources you can refer to before committing to any loan.',
    resources: [
      {
        label: 'Bank Negara Malaysia (BNM)',
        url: 'https://www.bnm.gov.my',
        note: 'Central bank regulator. Check lender licensing and borrower rights.',
      },
      {
        label: 'AKPK — Credit Counselling',
        url: 'https://www.akpk.org.my',
        note: 'Free credit counselling and debt management services.',
      },
      {
        label: 'BNMTELELINK',
        url: 'https://telelink.bnm.gov.my',
        note: 'Official BNM complaints and enquiries channel (1-300-88-5465).',
      },
    ],
    footNote:
      'GURU Credits operates under a Moneylenders Act 1951 license. License details available on request. We comply with the statutory interest rate caps and borrower protection rules set by KPKT.',
  },
  ms: {
    badge: 'Sumber Pengawalseliaan',
    title: 'Ketahui Hak Anda Sebagai Peminjam',
    desc: 'Kami menggalakkan peminjaman bertanggungjawab. Berikut adalah sumber rasmi Malaysia yang boleh anda rujuk sebelum komited kepada mana-mana pinjaman.',
    resources: [
      {
        label: 'Bank Negara Malaysia (BNM)',
        url: 'https://www.bnm.gov.my',
        note: 'Pengawal selia bank pusat. Semak lesen pemberi pinjaman dan hak peminjam.',
      },
      {
        label: 'AKPK — Kaunseling Kredit',
        url: 'https://www.akpk.org.my',
        note: 'Kaunseling kredit & pengurusan hutang secara percuma.',
      },
      {
        label: 'BNMTELELINK',
        url: 'https://telelink.bnm.gov.my',
        note: 'Saluran aduan dan pertanyaan rasmi BNM (1-300-88-5465).',
      },
    ],
    footNote:
      'GURU Credits dilesenkan di bawah Akta Pemberi Pinjam Wang 1951. Maklumat lesen boleh didapati atas permintaan. Kami mematuhi had kadar faedah berkanun dan peraturan perlindungan peminjam yang ditetapkan oleh KPKT.',
  },
};

const icons = [Building, HandCoins, Scale];

export function RegulatoryInfo({ language }: { language: Language }) {
  const t = content[language];
  return (
    <section className="py-14 lg:py-16">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">{t.badge}</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">{t.title}</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">{t.desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {t.resources.map((res, index) => {
              const Icon = icons[index];
              return (
                <Link
                  key={res.label}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="font-semibold text-sm text-foreground mb-1.5">{res.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{res.note}</p>
                </Link>
              );
            })}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground italic">{t.footNote}</p>
        </div>
      </div>
    </section>
  );
}
