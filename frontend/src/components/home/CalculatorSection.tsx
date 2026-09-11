'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { PreApprovalCalculator } from '@/components/PreApprovalCalculator';
import { PaymentReference } from './PaymentReference';
import type { HomeContent } from '@/lib/content/home';

export function CalculatorSection({ t }: { t: HomeContent }) {
  const c = t.calculator;
  return (
    <Section id="calculator">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={c.eyebrow} title={c.title} lede={c.lede} align="center" />
        </Reveal>
        <Tabs defaultValue="estimate">
          <TabsList className="mx-auto mb-8 h-11 rounded-full border border-border bg-surface p-1">
            <TabsTrigger value="estimate" className="rounded-full px-4 data-[state=active]:bg-inverse data-[state=active]:text-inverse-foreground">{c.tabs.estimate}</TabsTrigger>
            <TabsTrigger value="reference" className="rounded-full px-4 data-[state=active]:bg-inverse data-[state=active]:text-inverse-foreground">{c.tabs.reference}</TabsTrigger>
          </TabsList>
          <TabsContent value="estimate"><PreApprovalCalculator /></TabsContent>
          <TabsContent value="reference"><PaymentReference t={t} /></TabsContent>
        </Tabs>
      </Container>
    </Section>
  );
}
