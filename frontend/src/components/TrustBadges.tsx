import type { Language } from '@/lib/i18n/translations';
import { Shield, Lock, FileCheck, Clock, Users, Award } from 'lucide-react';

const content = {
  en: {
    badges: [
      { icon: Shield, label: 'PDPA Compliant', description: 'Data Protection' },
      { icon: Lock, label: 'SSL Secured', description: '256-bit Encryption' },
      { icon: FileCheck, label: 'From 4.88%', description: 'Competitive Rates' },
      { icon: Clock, label: '24hr Approval', description: 'Fast Process' },
      { icon: Users, label: '1,000+ Clients', description: 'Trusted Service' },
      { icon: Award, label: 'No Hidden Fees', description: 'Transparent' },
    ],
  },
  ms: {
    badges: [
      { icon: Shield, label: 'Patuh PDPA', description: 'Perlindungan Data' },
      { icon: Lock, label: 'SSL Selamat', description: 'Penyulitan 256-bit' },
      { icon: FileCheck, label: 'Dari 4.88%', description: 'Kadar Kompetitif' },
      { icon: Clock, label: 'Kelulusan 24 Jam', description: 'Proses Pantas' },
      { icon: Users, label: '1,000+ Pelanggan', description: 'Perkhidmatan Dipercayai' },
      { icon: Award, label: 'Tiada Caj Tersembunyi', description: 'Telus' },
    ],
  },
};

type Props = {
  language?: Language;
};

const getCopy = (language?: Language) =>
  content[language ?? 'en'] ?? content.en;

export function TrustBadges({ language }: Props) {
  const t = getCopy(language);

  return (
    <div className="py-8 bg-gradient-to-r from-primary/5 via-background to-primary/5 border-y">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {t.badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold">{badge.label}</span>
                <span className="text-xs text-muted-foreground">{badge.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Compact version for footer or other sections
export function TrustBadgesCompact({ language }: Props) {
  const t = getCopy(language);

  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {t.badges.slice(0, 4).map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full text-sm"
          >
            <Icon className="h-4 w-4 text-primary" />
            <span className="font-medium">{badge.label}</span>
          </div>
        );
      })}
    </div>
  );
}
