'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Check,
  X,
  ArrowRight,
  Scale,
  Clock,
  Percent,
  Banknote,
  Car,
  Home,
  Briefcase,
  User,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n/translations';

interface CompareContentProps {
  language: Language;
}

const content = {
  en: {
    title: 'Compare Loan Products',
    subtitle: 'Find the best loan for your needs by comparing our products side by side',
    selectToCompare: 'Select products to compare (2-4)',
    compareNow: 'Compare Selected',
    clearAll: 'Clear All',
    viewAll: 'View All Products',
    applyNow: 'Apply Now',
    learnMore: 'Learn More',
    comparisonTable: 'Comparison Table',
    feature: 'Feature',
    interestRate: 'Interest Rate',
    loanAmount: 'Loan Amount',
    tenure: 'Tenure',
    approval: 'Decision Time (est.)',
    collateral: 'Collateral Required',
    minIncome: 'Min. Income Required',
    documentation: 'Documentation',
    bestFor: 'Best For',
    yes: 'Yes',
    no: 'No',
    minimal: 'Minimal',
    standard: 'Standard',
    extensive: 'Extensive',
    products: {
      personal: {
        name: 'Personal Loan',
        icon: 'User',
        rate: 'From 4.88%',
        amount: 'Up to RM100,000',
        tenure: '1-7 years',
        approval: '24 hours',
        collateral: false,
        minIncome: 'RM2,000/month',
        documentation: 'minimal',
        bestFor: 'Emergency cash, debt consolidation, medical bills, personal needs',
        features: [
          'No collateral required',
          'Fixed monthly payments',
          'Fast 24-hour decision (est.)',
          'Flexible tenure options',
          'Competitive interest rates',
          'Easy online application',
        ],
      },
      car: {
        name: 'Car Loan',
        icon: 'Car',
        rate: 'From 3.5%',
        amount: 'Up to 90% of car value',
        tenure: 'Up to 9 years',
        approval: '24-48 hours',
        collateral: true,
        minIncome: 'RM2,500/month',
        documentation: 'standard',
        bestFor: 'New car purchase, used car financing, car refinancing',
        features: [
          'New & used car financing',
          'Up to 90% financing margin',
          'Competitive rates from 3.5%',
          'Long tenure up to 9 years',
          'Quick decision process',
          'Insurance bundling available',
        ],
      },
      home: {
        name: 'Home Loan',
        icon: 'Home',
        rate: 'From 4.0%',
        amount: 'Up to 90% of property value',
        tenure: 'Up to 35 years',
        approval: '1-2 weeks',
        collateral: true,
        minIncome: 'RM3,500/month',
        documentation: 'extensive',
        bestFor: 'Home purchase, property investment, home refinancing',
        features: [
          'Up to 90% financing margin',
          'Long tenure up to 35 years',
          'Competitive rates from 4.0%',
          'Flexible repayment options',
          'Free property valuation',
          'MRTA/MLTA options available',
        ],
      },
      business: {
        name: 'Business Loan',
        icon: 'Briefcase',
        rate: 'From 5.5%',
        amount: 'Up to RM500,000',
        tenure: '1-7 years',
        approval: '3-5 days',
        collateral: false,
        minIncome: 'RM50,000/year revenue',
        documentation: 'standard',
        bestFor: 'Working capital, equipment purchase, business expansion',
        features: [
          'Working capital financing',
          'Equipment purchase loans',
          'Business expansion funding',
          'Flexible collateral options',
          'Government grant assistance',
          'SME-friendly terms',
        ],
      },
    },
    tips: {
      title: 'Choosing the Right Loan',
      items: [
        'Consider your monthly income and existing commitments',
        'Compare total interest paid, not just the rate',
        'Check for hidden fees and early settlement penalties',
        'Ensure your DSR stays below 60% after the new loan',
        'Choose a tenure that balances monthly payments and total cost',
      ],
    },
    cta: {
      title: 'Not Sure Which Loan is Right for You?',
      description: 'Get a free consultation with our loan specialists',
      button: 'Get Free Consultation',
    },
  },
  ms: {
    title: 'Bandingkan Produk Pinjaman',
    subtitle: 'Cari pinjaman terbaik untuk keperluan anda dengan membandingkan produk kami',
    selectToCompare: 'Pilih produk untuk dibandingkan (2-4)',
    compareNow: 'Bandingkan Sekarang',
    clearAll: 'Kosongkan Semua',
    viewAll: 'Lihat Semua Produk',
    applyNow: 'Mohon Sekarang',
    learnMore: 'Ketahui Lebih',
    comparisonTable: 'Jadual Perbandingan',
    feature: 'Ciri',
    interestRate: 'Kadar Faedah',
    loanAmount: 'Jumlah Pinjaman',
    tenure: 'Tempoh',
    approval: 'Masa Keputusan (anggaran)',
    collateral: 'Cagaran Diperlukan',
    minIncome: 'Pendapatan Minimum',
    documentation: 'Dokumentasi',
    bestFor: 'Sesuai Untuk',
    yes: 'Ya',
    no: 'Tidak',
    minimal: 'Minimum',
    standard: 'Standard',
    extensive: 'Lengkap',
    products: {
      personal: {
        name: 'Pinjaman Peribadi',
        icon: 'User',
        rate: 'Dari 4.88%',
        amount: 'Sehingga RM100,000',
        tenure: '1-7 tahun',
        approval: '24 jam',
        collateral: false,
        minIncome: 'RM2,000/bulan',
        documentation: 'minimal',
        bestFor: 'Wang kecemasan, penggabungan hutang, bil perubatan, keperluan peribadi',
        features: [
          'Tiada cagaran diperlukan',
          'Bayaran bulanan tetap',
          'Keputusan cepat 24 jam (anggaran)',
          'Pilihan tempoh fleksibel',
          'Kadar faedah kompetitif',
          'Permohonan dalam talian mudah',
        ],
      },
      car: {
        name: 'Pinjaman Kereta',
        icon: 'Car',
        rate: 'Dari 3.5%',
        amount: 'Sehingga 90% nilai kereta',
        tenure: 'Sehingga 9 tahun',
        approval: '24-48 jam',
        collateral: true,
        minIncome: 'RM2,500/bulan',
        documentation: 'standard',
        bestFor: 'Pembelian kereta baru, pembiayaan kereta terpakai, pembiayaan semula kereta',
        features: [
          'Pembiayaan kereta baru & terpakai',
          'Margin pembiayaan sehingga 90%',
          'Kadar kompetitif dari 3.5%',
          'Tempoh panjang sehingga 9 tahun',
          'Proses keputusan cepat',
          'Pakej insurans tersedia',
        ],
      },
      home: {
        name: 'Pinjaman Rumah',
        icon: 'Home',
        rate: 'Dari 4.0%',
        amount: 'Sehingga 90% nilai hartanah',
        tenure: 'Sehingga 35 tahun',
        approval: '1-2 minggu',
        collateral: true,
        minIncome: 'RM3,500/bulan',
        documentation: 'extensive',
        bestFor: 'Pembelian rumah, pelaburan hartanah, pembiayaan semula rumah',
        features: [
          'Margin pembiayaan sehingga 90%',
          'Tempoh panjang sehingga 35 tahun',
          'Kadar kompetitif dari 4.0%',
          'Pilihan pembayaran fleksibel',
          'Penilaian hartanah percuma',
          'Pilihan MRTA/MLTA tersedia',
        ],
      },
      business: {
        name: 'Pinjaman Perniagaan',
        icon: 'Briefcase',
        rate: 'Dari 5.5%',
        amount: 'Sehingga RM500,000',
        tenure: '1-7 tahun',
        approval: '3-5 hari',
        collateral: false,
        minIncome: 'RM50,000/tahun pendapatan',
        documentation: 'standard',
        bestFor: 'Modal kerja, pembelian peralatan, pengembangan perniagaan',
        features: [
          'Pembiayaan modal kerja',
          'Pinjaman pembelian peralatan',
          'Pendanaan pengembangan perniagaan',
          'Pilihan cagaran fleksibel',
          'Bantuan geran kerajaan',
          'Terma mesra PKS',
        ],
      },
    },
    tips: {
      title: 'Memilih Pinjaman Yang Betul',
      items: [
        'Pertimbangkan pendapatan bulanan dan komitmen sedia ada',
        'Bandingkan jumlah faedah yang dibayar, bukan hanya kadar',
        'Semak caj tersembunyi dan penalti penyelesaian awal',
        'Pastikan DSR anda kekal di bawah 60% selepas pinjaman baru',
        'Pilih tempoh yang mengimbangi bayaran bulanan dan kos total',
      ],
    },
    cta: {
      title: 'Tidak Pasti Pinjaman Mana Yang Sesuai?',
      description: 'Dapatkan konsultasi percuma dengan pakar pinjaman kami',
      button: 'Dapatkan Konsultasi Percuma',
    },
  },
};

const productKeys = ['personal', 'car', 'home', 'business'] as const;
type ProductKey = (typeof productKeys)[number];

const iconMap = {
  User,
  Car,
  Home,
  Briefcase,
};

export default function CompareContent({ language }: CompareContentProps) {
  const t = content[language];
  const [selectedProducts, setSelectedProducts] = useState<ProductKey[]>(['personal', 'car']);

  const toggleProduct = (key: ProductKey) => {
    if (selectedProducts.includes(key)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== key));
    } else if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, key]);
    }
  };

  const getDocLabel = (doc: string) => {
    if (doc === 'minimal') return t.minimal;
    if (doc === 'extensive') return t.extensive;
    return t.standard;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Scale className="h-4 w-4" />
              {t.comparisonTable}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-8 border-y bg-background">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <p className="text-sm text-muted-foreground">{t.selectToCompare}</p>
            <div className="flex flex-wrap items-center gap-3">
              {selectedProducts.length >= 2 && (
                <Button asChild size="sm" className="btn-gradient text-primary-foreground">
                  <a href="#compare-table">
                    {t.compareNow}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProducts(['personal', 'car'])}
                className="text-muted-foreground"
              >
                {t.clearAll}
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {productKeys.map((key) => {
              const product = t.products[key];
              const Icon = iconMap[product.icon as keyof typeof iconMap];
              const isSelected = selectedProducts.includes(key);
              return (
                <label
                  key={key}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-muted hover:border-primary/50'
                  )}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleProduct(key)}
                    disabled={!isSelected && selectedProducts.length >= 4}
                  />
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{product.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-16" id="compare-table">
        <div className="container">
          {selectedProducts.length >= 2 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-muted/50 rounded-tl-lg font-semibold">
                      {t.feature}
                    </th>
                    {selectedProducts.map((key, index) => {
                      const product = t.products[key];
                      const Icon = iconMap[product.icon as keyof typeof iconMap];
                      const isLast = index === selectedProducts.length - 1;
                      return (
                        <th
                          key={key}
                          className={cn(
                            'p-4 bg-muted/50 text-center',
                            isLast && 'rounded-tr-lg'
                          )}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <span className="font-semibold">{product.name}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* Interest Rate */}
                  <tr className="border-b">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      {t.interestRate}
                    </td>
                    {selectedProducts.map((key) => (
                      <td key={key} className="p-4 text-center">
                        <Badge variant="secondary" className="text-lg font-semibold">
                          {t.products[key].rate}
                        </Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Loan Amount */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                      {t.loanAmount}
                    </td>
                    {selectedProducts.map((key) => (
                      <td key={key} className="p-4 text-center font-medium">
                        {t.products[key].amount}
                      </td>
                    ))}
                  </tr>

                  {/* Tenure */}
                  <tr className="border-b">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {t.tenure}
                    </td>
                    {selectedProducts.map((key) => (
                      <td key={key} className="p-4 text-center">
                        {t.products[key].tenure}
                      </td>
                    ))}
                  </tr>

                  {/* Approval Time */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {t.approval}
                    </td>
                    {selectedProducts.map((key) => (
                      <td key={key} className="p-4 text-center">
                        <Badge variant="outline">{t.products[key].approval}</Badge>
                      </td>
                    ))}
                  </tr>

                  {/* Collateral */}
                  <tr className="border-b">
                    <td className="p-4 font-medium">{t.collateral}</td>
                    {selectedProducts.map((key) => (
                      <td key={key} className="p-4 text-center">
                        {t.products[key].collateral ? (
                          <div className="flex items-center justify-center gap-1 text-amber-600">
                            <Check className="h-5 w-5" />
                            <span>{t.yes}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 text-green-600">
                            <X className="h-5 w-5" />
                            <span>{t.no}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Min Income */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium">{t.minIncome}</td>
                    {selectedProducts.map((key) => (
                      <td key={key} className="p-4 text-center">
                        {t.products[key].minIncome}
                      </td>
                    ))}
                  </tr>

                  {/* Documentation */}
                  <tr className="border-b">
                    <td className="p-4 font-medium">{t.documentation}</td>
                    {selectedProducts.map((key) => (
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

                  {/* Best For */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium">{t.bestFor}</td>
                    {selectedProducts.map((key) => (
                      <td key={key} className="p-4 text-center text-sm text-muted-foreground">
                        {t.products[key].bestFor}
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr>
                    <td className="p-4"></td>
                    {selectedProducts.map((key, index) => {
                      const productId = productKeys.indexOf(key) + 1;
                      return (
                        <td key={key} className={cn('p-4 text-center', index === 0 && 'rounded-bl-lg', index === selectedProducts.length - 1 && 'rounded-br-lg')}>
                          <Button asChild className="w-full btn-gradient text-primary-foreground">
                            <Link href={`/services/${productId}/apply`}>
                              {t.applyNow}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <Card className="text-center p-8 surface-card">
              <CardContent>
                <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t.selectToCompare}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      {selectedProducts.length >= 2 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {selectedProducts.map((key) => {
                const product = t.products[key];
                const Icon = iconMap[product.icon as keyof typeof iconMap];
                const productId = productKeys.indexOf(key) + 1;
                return (
                  <Card key={key} className="relative overflow-hidden surface-card">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                      </div>
                      <Badge className="w-fit">{product.rate}</Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full btn-gradient text-primary-foreground">
                        <Link href={`/services/${productId}/apply`}>
                          {t.applyNow}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tips Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <Card className="border-primary/20 surface-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                {t.tips.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {t.tips.items.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <Button size="lg" className="btn-gradient text-primary-foreground font-semibold" asChild>
            <Link href="/contact">
              {t.cta.button}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
