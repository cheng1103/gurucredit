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
    eyebrow: 'What the RM30 covers',
    title: 'Your CTOS credit report — and the full analysis that sits on top.',
    subtitle:
      'The RM30 is a pass-through charge for pulling your CTOS credit report from the reporting agency. The CCRIS read, DSR recalculation, loan structuring, and written recommendation are all bundled into our licensed lending service at no extra cost.',
    items: [
      {
        title: 'Your full CTOS credit report (pass-through cost)',
        desc: 'The RM30 is the exact fee CTOS charges to pull your report. It is not our revenue — we pass it through to the credit reporting agency.',
      },
      {
        title: 'CCRIS + CTOS interpretation, written out line by line',
        desc: 'We explain every late marker, special attention code, and trade-line — not just a raw PDF dump. Bundled, no extra charge.',
      },
      {
        title: 'DSR recalculated against our lending criteria',
        desc: 'Your debt-service ratio reviewed against our licensed lending rules — with a clear view of the maximum facility we can extend to you.',
      },
      {
        title: 'Tailored loan structure — our offer to you',
        desc: 'Recommended tenure, rate band within statutory caps, repayment plan, and maximum approvable amount under our licensed facility.',
      },
      {
        title: 'Estimated monthly repayment + approvable amount',
        desc: 'Realistic figures you can plan around — rate range, tenure, and a back-of-envelope amortisation.',
      },
      {
        title: 'Delivered via email + WhatsApp within 24h',
        desc: 'The RM30 is collected only after we confirm your details on our official WhatsApp — never through this website.',
      },
    ],
    footNote:
      'The RM30 covers the CTOS report pull and is non-refundable once the report has been generated. Even if no product fits, you keep the report and the written analysis.',
    cta: 'Pull my CTOS report & start',
  },
  ms: {
    eyebrow: 'Apa yang RM30 meliputi',
    title: 'Laporan kredit CTOS anda — dan analisis penuh di atasnya.',
    subtitle:
      'RM30 adalah caj salur lalu untuk mengambil laporan kredit CTOS anda daripada agensi pelaporan. Pembacaan CCRIS, pengiraan semula DSR, penstrukturan pinjaman dan cadangan bertulis disertakan dalam perkhidmatan pemberian pinjaman berlesen kami tanpa kos tambahan.',
    items: [
      {
        title: 'Laporan CTOS penuh anda (kos salur lalu)',
        desc: 'RM30 adalah yuran tepat yang dikenakan CTOS untuk laporan tersebut — bukan pendapatan kami. Kami menyalurkannya kepada agensi.',
      },
      {
        title: 'Tafsiran CCRIS + CTOS, baris demi baris',
        desc: 'Kami jelaskan setiap rekod lewat, kod perhatian khas, dan akaun — bukan hanya PDF mentah. Disertakan tanpa caj tambahan.',
      },
      {
        title: 'DSR dikira semula ikut kriteria pinjaman kami',
        desc: 'DSR dinilai mengikut peraturan pemberian pinjaman berlesen kami — dengan pandangan jelas tentang had kemudahan yang boleh kami berikan kepada anda.',
      },
      {
        title: 'Struktur pinjaman disesuaikan — tawaran kami',
        desc: 'Tempoh yang disyorkan, jalur kadar dalam had berkanun, pelan bayaran, dan jumlah maksimum boleh diluluskan di bawah kemudahan berlesen kami.',
      },
      {
        title: 'Anggaran bayaran bulanan + jumlah boleh lulus',
        desc: 'Nombor yang realistik — julat kadar, tempoh, dan kiraan amortisasi ringkas.',
      },
      {
        title: 'Dihantar melalui e-mel + WhatsApp dalam 24 jam',
        desc: 'RM30 dikutip hanya selepas kami mengesahkan butiran anda di WhatsApp rasmi — tidak pernah melalui laman web.',
      },
    ],
    footNote:
      'RM30 meliputi pengambilan laporan CTOS dan tidak boleh dikembalikan setelah laporan dijana. Walaupun tiada produk sesuai, anda kekal dengan laporan dan analisis bertulis.',
    cta: 'Ambil laporan CTOS saya',
  },
};

const icons = [FileSearch, Gauge, Building2, Wallet, MessageCircle, ShieldCheck];

export function Rm30DeliverablesSection({ language }: { language: Language }) {
  const t = content[language];
  return (
    <section className="py-24 lg:py-32 bg-background">
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
            <Link href={localeHref(language, PATHS.servicesApply('1'))}>
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
