import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, Building2, FileSearch, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import type { Language } from '@/lib/i18n/translations';

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
    <Card className="surface-card border-primary/15 shadow-lg">
      <CardHeader className={compact ? 'pb-3' : undefined}>
        <Badge variant="outline" className="mb-3 w-fit bg-primary/5 text-primary border-primary/20">
          <BadgeCheck className="mr-1 h-3 w-3" />
          {t.badge}
        </Badge>
        <CardTitle className={compact ? 'text-lg' : 'text-xl'}>{t.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={compact ? 'space-y-3' : 'grid gap-3 md:grid-cols-3'}>
          {t.items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-primary/10 bg-white/70 p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{COMPANY.name}</span>
            <span className="mx-2">•</span>
            <MapPin className="mr-1 inline h-4 w-4" />
            {COMPANY.location}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size={compact ? 'sm' : 'default'} className="btn-gradient text-primary-foreground">
              <LocaleLink href="/verify-us">{t.primary}</LocaleLink>
            </Button>
            <Button asChild size={compact ? 'sm' : 'default'} variant="outline">
              <LocaleLink href="/privacy">{t.secondary}</LocaleLink>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
