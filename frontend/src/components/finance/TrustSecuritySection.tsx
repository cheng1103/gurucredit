import { SecurityBadges } from './SecurityBadges';
import { TransparencyDisclosure } from './TransparencyDisclosure';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';

export function TrustSecuritySection({
  t,
  language,
}: {
  t: HomeContent;
  language: Language;
}) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
        <TransparencyDisclosure t={t} bare />
        <SecurityBadges language={language} bare />
      </div>
    </section>
  );
}
