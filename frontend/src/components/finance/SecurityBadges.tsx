import { Lock, ShieldCheck, FileKey, Server } from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

const content: Record<Language, { title: string; items: { title: string; desc: string }[] }> = {
  en: {
    title: 'Your data is encrypted end-to-end',
    items: [
      { title: 'TLS 1.2+ in transit', desc: 'All data transfers use HTTPS with modern ciphers' },
      { title: 'AES-256-GCM at rest', desc: 'NRIC and sensitive fields encrypted in the database' },
      { title: 'PDPA 2010 aligned', desc: 'We follow Malaysia Personal Data Protection Act' },
      { title: 'Zero-payment on site', desc: 'No payment collected on website — WhatsApp only' },
    ],
  },
  ms: {
    title: 'Data anda disulitkan hujung-ke-hujung',
    items: [
      { title: 'TLS 1.2+ semasa transit', desc: 'Semua pemindahan data menggunakan HTTPS moden' },
      { title: 'AES-256-GCM semasa simpanan', desc: 'NRIC dan medan sensitif disulitkan dalam pangkalan data' },
      { title: 'Patuh PDPA 2010', desc: 'Kami ikut Akta Perlindungan Data Peribadi Malaysia' },
      { title: 'Tiada bayaran di laman', desc: 'Tiada bayaran dikutip di laman web — hanya WhatsApp' },
    ],
  },
};

const icons = [Lock, FileKey, ShieldCheck, Server];

export function SecurityBadges({ language, bare = false }: { language: Language; bare?: boolean }) {
  const t = content[language];
  const body = (
    <>
      <h2 className="text-xl lg:text-2xl font-bold mb-6">{t.title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {t.items.map((item, index) => {
          const Icon = icons[index];
          return (
            <div
              key={item.title}
              className="flex flex-col items-start gap-2 rounded-xl border border-border/70 bg-card p-4 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </>
  );
  if (bare) return <div>{body}</div>;
  return (
    <section className="py-14 bg-gradient-to-b from-background to-muted/40">
      <div className="container max-w-5xl mx-auto text-center">{body}</div>
    </section>
  );
}
