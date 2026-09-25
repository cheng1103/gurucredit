'use client';

import { useState } from 'react';
import { Briefcase, Car, Check, Home, Info, User, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { LocaleLink } from '@/components/LocaleLink';
import { cn } from '@/lib/utils';
import { ToolLayout } from './ToolLayout';
import { compareUi, productApplyHref, productKeys, type ProductKey } from '@/lib/content/tools/compare';
import type { Language } from '@/lib/i18n/translations';

const productIcons: Record<ProductKey, typeof User> = {
  personal: User,
  car: Car,
  home: Home,
  business: Briefcase,
};

export function ProductCompare({ language }: { language: Language }) {
  const t = compareUi[language].product;
  const [selected, setSelected] = useState<ProductKey[]>(['personal', 'car']);

  const toggleProduct = (key: ProductKey) => {
    if (selected.includes(key)) {
      setSelected(selected.filter((p) => p !== key));
    } else if (selected.length < 4) {
      setSelected([...selected, key]);
    }
  };

  const getDocLabel = (doc: 'minimal' | 'standard' | 'extensive') =>
    doc === 'minimal' ? t.minimal : doc === 'extensive' ? t.extensive : t.standard;

  const rail = (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.selectToCompare}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {productKeys.map((key) => {
          const product = t.products[key];
          const Icon = productIcons[key];
          const isSelected = selected.includes(key);
          return (
            <label
              key={key}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleProduct(key)}
                disabled={!isSelected && selected.length >= 4}
                aria-label={product.name}
              />
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">{product.name}</span>
            </label>
          );
        })}
        <Button type="button" variant="ghost" size="sm" className="text-foreground-muted" onClick={() => setSelected(['personal', 'car'])}>
          {t.clearAll}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <ToolLayout rail={rail} language={language}>
      {selected.length >= 2 ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-surface-alt p-4 text-left font-semibold">{t.feature}</th>
                {selected.map((key) => {
                  const product = t.products[key];
                  const Icon = productIcons[key];
                  return (
                    <th key={key} className="bg-surface-alt p-4 text-center">
                      <span className="flex flex-col items-center gap-2">
                        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
                          <Icon className="size-5 text-primary" />
                        </span>
                        <span className="font-semibold">{product.name}</span>
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-4 font-medium">{t.interestRate}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center">
                    <Badge variant="secondary" className="font-mono text-sm">{t.products[key].rate}</Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border bg-surface-alt/50">
                <td className="p-4 font-medium">{t.loanAmount}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center font-medium">{t.products[key].amount}</td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-medium">{t.tenure}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center">{t.products[key].tenure}</td>
                ))}
              </tr>
              <tr className="border-t border-border bg-surface-alt/50">
                <td className="p-4 font-medium">{t.approval}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center">
                    <Badge variant="outline">{t.products[key].approval}</Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-medium">{t.collateral}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center">
                    {t.products[key].collateral ? (
                      <span className="inline-flex items-center justify-center gap-1 text-warning">
                        <Check className="size-4" aria-hidden="true" />
                        {t.yes}
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-1 text-success">
                        <X className="size-4" aria-hidden="true" />
                        {t.no}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border bg-surface-alt/50">
                <td className="p-4 font-medium">{t.minIncome}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center">{t.products[key].minIncome}</td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-medium">{t.documentation}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center">
                    <Badge
                      variant={
                        t.products[key].documentation === 'minimal'
                          ? 'default'
                          : t.products[key].documentation === 'extensive'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {getDocLabel(t.products[key].documentation)}
                    </Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border bg-surface-alt/50">
                <td className="p-4 font-medium">{t.bestFor}</td>
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center text-foreground-muted">{t.products[key].bestFor}</td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4" />
                {selected.map((key) => (
                  <td key={key} className="p-4 text-center">
                    <Button asChild size="sm" className="w-full">
                      <LocaleLink href={productApplyHref(key, language)}>{t.applyNow}</LocaleLink>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <Card className="p-8 text-center">
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <Info className="size-10 text-foreground-subtle" aria-hidden="true" />
            <p className="text-foreground-muted">{t.selectToCompare}</p>
          </CardContent>
        </Card>
      )}

      {selected.length >= 2 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {selected.map((key) => {
            const product = t.products[key];
            const Icon = productIcons[key];
            return (
              <Card key={key}>
                <CardHeader>
                  <div className="mb-1 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
                      <Icon className="size-5 text-primary" />
                    </span>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </div>
                  <Badge className="w-fit font-mono">{product.rate}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="size-5 text-primary" aria-hidden="true" />
            {t.tips.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.tips.items.map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <Check className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                <span className="text-foreground-muted">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
