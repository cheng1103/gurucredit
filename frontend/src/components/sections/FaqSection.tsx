import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { localeHref, PATHS } from '@/lib/i18n/routes';
import { FaqAccordion } from './FaqAccordion';

export function FaqSection({ t, language }: { t: HomeContent; language: Language }) {
  return (
    <section className="relative py-24 lg:py-32 section-accent-top overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 py-1.5 px-4">
            <HelpCircle className="h-3 w-3 mr-1" />
            {t.faq.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.faq.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.faq.subtitle}</p>
        </div>
        <FaqAccordion items={t.faq.items.map((f) => ({ question: f.question, answer: f.answer }))} />
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href={localeHref(language, PATHS.faq)}>
              {t.faq.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
