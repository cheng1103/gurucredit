'use client';

import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';
import { Building2 } from 'lucide-react';
import Image from 'next/image';

const content = {
  en: {
    badge: 'Trusted Partners',
    title: 'We Work With',
    titleHighlight: 'Leading Banks',
    subtitle: 'Our network includes major financial institutions in Malaysia',
  },
  ms: {
    badge: 'Rakan Dipercayai',
    title: 'Kami Bekerjasama Dengan',
    titleHighlight: 'Bank Terkemuka',
    subtitle: 'Rangkaian kami termasuk institusi kewangan utama di Malaysia',
  },
};

// Malaysian Banks
const banks = [
  { name: 'Maybank', short: 'MBB', logo: '/images/banks/maybank.svg' },
  { name: 'CIMB Bank', short: 'CIMB', logo: '/images/banks/cimb.svg' },
  { name: 'Public Bank', short: 'PBB', logo: '/images/banks/publicbank.svg' },
  { name: 'RHB Bank', short: 'RHB', logo: '/images/banks/rhb.svg' },
  { name: 'Hong Leong Bank', short: 'HLB', logo: '/images/banks/hongleong.svg' },
  { name: 'AmBank', short: 'AMB', logo: '/images/banks/ambank.svg' },
  { name: 'Bank Islam', short: 'BIMB', logo: '/images/banks/bankislam.svg' },
  { name: 'Alliance Bank', short: 'ABB', logo: '/images/banks/alliance.svg' },
];

export function BankPartners() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Building2 className="h-3 w-3 mr-1.5" />
            {t.badge}
          </Badge>
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Bank Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {banks.map((bank) => (
            <div
              key={bank.short}
              className="group flex flex-col items-center justify-center p-4 bg-background rounded-xl border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors overflow-hidden">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={56}
                  height={56}
                  className="object-contain w-10 h-10"
                  unoptimized
                />
              </div>
              <span className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors">
                {bank.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
