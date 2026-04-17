import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, HelpCircle } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { localeHref, PATHS } from '@/lib/i18n/routes';

export function FaqSection({ t, language }: { t: HomeContent; language: Language }) {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 py-1.5 px-4">
            <HelpCircle className="h-3 w-3 mr-1" />
            {t.faq.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.faq.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.faq.subtitle}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.items.map((faq, index) => (
            <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
