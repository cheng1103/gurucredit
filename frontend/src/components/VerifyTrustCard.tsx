import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Building2, FileSearch, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

type Props = {
  language: Language;
  compact?: boolean;
};

const content = {
  en: {
    badge: 'Verify Us',
    title: 'Check who you are dealing with before you submit anything',
    description:
      'We want borrowers to verify our office details, official channels, privacy practices, and licensing route before sharing documents or making payment.',
    items: [
      {
        icon: Building2,
        title: 'Office and company identity',
        description: 'Review our registered business address, service scope, and the channels we use for borrower communication.',
      },
      {
        icon: ShieldCheck,
        title: 'PDPA and document handling',
        description: 'Understand how we handle borrower data, when we ask for documents, and which channels are official.',
      },
      {
        icon: FileSearch,
        title: 'How to verify the process',
        description: 'Check the signs of a legitimate flow versus scam behaviour before making any decision.',
      },
    ],
    primary: 'Open Verification Page',
    secondary: 'Privacy Policy',
  },
  ms: {
    badge: 'Sahkan Kami',
    title: 'Semak dahulu siapa yang anda berurusan sebelum hantar apa-apa',
    description:
      'Kami galakkan peminjam menyemak alamat pejabat, saluran rasmi, amalan privasi, dan laluan pelesenan kami sebelum berkongsi dokumen atau membuat bayaran.',
    items: [
      {
        icon: Building2,
        title: 'Alamat pejabat dan identiti syarikat',
        description: 'Semak alamat perniagaan, skop perkhidmatan, dan saluran yang kami gunakan untuk berhubung dengan peminjam.',
      },
      {
        icon: ShieldCheck,
        title: 'PDPA dan pengendalian dokumen',
        description: 'Fahami cara kami mengendalikan data peminjam, bila dokumen diminta, dan saluran rasmi yang digunakan.',
      },
      {
        icon: FileSearch,
        title: 'Cara mengesahkan proses',
        description: 'Semak tanda proses yang sah berbanding tingkah laku scam sebelum membuat keputusan.',
      },
    ],
    primary: 'Buka Halaman Pengesahan',
    secondary: 'Dasar Privasi',
  },
} as const;

export function VerifyTrustCard({ language, compact = false }: Props) {
  const t = content[language];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <Badge variant="outline" className="mb-3 w-fit">
        <BadgeCheck className="size-3.5" aria-hidden="true" />
        {t.badge}
      </Badge>
      <h3 className={cn('font-semibold text-foreground', compact ? 'text-lg' : 'text-xl')}>{t.title}</h3>
      <p className="mt-1 text-sm text-foreground-muted">{t.description}</p>

      <div className={cn('mt-5', compact ? 'space-y-3' : 'grid gap-3 md:grid-cols-3')}>
        {t.items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-xl border border-border bg-surface-alt p-4">
              <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-foreground-muted">
          <span className="font-medium text-foreground">{COMPANY.name}</span>
          <span className="mx-2">•</span>
          <MapPin className="mr-1 inline size-4" aria-hidden="true" />
          {COMPANY.location}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild size={compact ? 'sm' : 'default'} variant="outline">
            <LocaleLink href={PATHS.verifyUs}>{t.primary}</LocaleLink>
          </Button>
          <Button asChild size={compact ? 'sm' : 'default'} variant="outline">
            <LocaleLink href={PATHS.privacy}>{t.secondary}</LocaleLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
