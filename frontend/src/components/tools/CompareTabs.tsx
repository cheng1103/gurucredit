'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { compareUi } from '@/lib/content/tools/compare';
import type { Language } from '@/lib/i18n/translations';
import type { LocalizedFaq } from '@/lib/content/listings/faq';
import { BankRateCompare } from './BankRateCompare';
import { ProductCompare } from './ProductCompare';

export function CompareTabs({
  language,
  moreQuestions,
}: {
  language: Language;
  moreQuestions: LocalizedFaq[];
}) {
  const t = compareUi[language].tabs;

  return (
    <Tabs defaultValue="bank">
      <TabsList className="mx-auto mb-8 h-11 w-fit rounded-full border border-border bg-surface p-1">
        <TabsTrigger value="bank" className="rounded-full px-4 data-[state=active]:bg-inverse data-[state=active]:text-inverse-foreground">
          {t.bank}
        </TabsTrigger>
        <TabsTrigger value="product" className="rounded-full px-4 data-[state=active]:bg-inverse data-[state=active]:text-inverse-foreground">
          {t.product}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bank">
        <BankRateCompare language={language} moreQuestions={moreQuestions} />
      </TabsContent>
      <TabsContent value="product">
        <ProductCompare language={language} moreQuestions={moreQuestions} />
      </TabsContent>
    </Tabs>
  );
}
