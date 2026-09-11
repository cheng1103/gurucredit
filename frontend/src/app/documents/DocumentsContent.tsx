'use client';

import { useState } from 'react';
import { AlertCircle, ArrowRight, Briefcase, Car, Check, FileText, Home, Info, User } from 'lucide-react';
import { ListingShell } from '@/components/listings';
import { LocaleLink } from '@/components/LocaleLink';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { documentsUi, documentsData, documentsTips, documentsMistakes, type LoanType, type DocumentCategory } from '@/lib/content/listings/documents';

interface DocumentsContentProps {
  language: Language;
}

const iconMap: Record<LoanType, typeof User> = { personal: User, car: Car, home: Home, business: Briefcase };
const categoryIconMap: Record<DocumentCategory, typeof User> = {
  identity: User,
  income: FileText,
  employment: Briefcase,
  financial: FileText,
  property: Home,
  vehicle: Car,
  registration: Briefcase,
};

export default function DocumentsContent({ language }: DocumentsContentProps) {
  const t = documentsUi[language];
  const [activeTab, setActiveTab] = useState<LoanType>('personal');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const loanTypes = Object.keys(t.loanTypes) as LoanType[];

  const getCategories = (loanType: LoanType): DocumentCategory[] =>
    Object.keys(documentsData[loanType][language]) as DocumentCategory[];

  const toggleItem = (category: string, index: number) => {
    const key = `${activeTab}-${category}-${index}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isChecked = (category: string, index: number) => checkedItems[`${activeTab}-${category}-${index}`] ?? false;

  const getProgress = (loanType: LoanType) => {
    const docs = documentsData[loanType][language];
    let total = 0;
    let checked = 0;
    Object.entries(docs).forEach(([category, items]) => {
      (items ?? []).forEach((_, index) => {
        total += 1;
        if (checkedItems[`${loanType}-${category}-${index}`]) checked += 1;
      });
    });
    return { total, checked, percentage: total > 0 ? Math.round((checked / total) * 100) : 0 };
  };

  return (
    <ListingShell
      language={language}
      breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbDocuments, href: PATHS.documents }]}
      title={t.title}
      lede={t.lede}
    >
      <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as LoanType)} className="space-y-8">
        <TabsList className="grid h-auto w-full max-w-2xl grid-cols-2 rounded-2xl border border-border md:grid-cols-4">
          {loanTypes.map((type) => {
            const Icon = iconMap[type];
            const progress = getProgress(type);
            return (
              <TabsTrigger
                key={type}
                value={type}
                className="flex flex-col items-center gap-2 rounded-xl py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="text-xs md:text-sm">{t.loanTypes[type]}</span>
                {progress.checked > 0 ? <span className="text-xs">{progress.percentage}%</span> : null}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {loanTypes.map((loanType) => {
          const progress = getProgress(loanType);
          const productId = loanTypes.indexOf(loanType) + 1;
          const categories = getCategories(loanType);

          return (
            <TabsContent key={loanType} value={loanType} className="space-y-8">
              <div className="rounded-2xl border border-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium">
                    {progress.checked} / {progress.total} {t.required}
                  </span>
                  <span className="text-sm font-semibold">{progress.percentage}%</span>
                </div>
                <Progress value={progress.percentage} className="text-primary" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {categories.map((category) => {
                  const CategoryIcon = categoryIconMap[category];
                  const items = documentsData[loanType][language][category] ?? [];
                  return (
                    <div key={category} className="rounded-2xl border border-border bg-surface p-5">
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                        <CategoryIcon className="size-5 text-primary" aria-hidden="true" />
                        {t.categories[category]}
                      </h3>
                      <ul className="divide-y divide-border">
                        {items.map((item, index) => (
                          <li key={item.name}>
                            <label className="flex items-start gap-3 py-3">
                              <Checkbox
                                checked={isChecked(category, index)}
                                onCheckedChange={() => toggleItem(category, index)}
                                className="mt-0.5"
                              />
                              <span className="flex-1">
                                <span className="flex flex-wrap items-center gap-2">
                                  <span className={cn('font-medium', isChecked(category, index) && 'text-foreground-subtle line-through')}>
                                    {item.name}
                                  </span>
                                  <span
                                    className={cn(
                                      'rounded-full border px-2 py-0.5 text-xs',
                                      item.required ? 'border-primary text-primary' : 'border-border text-foreground-subtle',
                                    )}
                                  >
                                    {item.required ? t.required : t.optional}
                                  </span>
                                </span>
                                <span className="mt-1 block text-sm text-foreground-muted">{item.note}</span>
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-border p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <Info className="size-5 text-primary" aria-hidden="true" />
                    {t.tipsLabel}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {documentsTips[loanType][language].map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <AlertCircle className="size-5 text-primary" aria-hidden="true" />
                    {t.commonMistakes}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {documentsMistakes[loanType][language].map((mistake) => (
                      <li key={mistake} className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-foreground-subtle" aria-hidden="true" />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <LocaleLink
                  href={PATHS.servicesApply(String(productId))}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  {t.applyNow}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </LocaleLink>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6 lg:p-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Briefcase className="size-5 text-primary" aria-hidden="true" />
          {t.selfEmployed.title}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">{t.selfEmployed.description}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {t.selfEmployed.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </ListingShell>
  );
}
