import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WebPageJsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import type { Language } from '@/lib/i18n/translations';

const SERVICE_META: Record<string, Record<Language, { name: string; title: string; description: string }>> = {
  '1': {
    en: {
      name: 'Personal Loan',
      title: 'Apply for Personal Loan',
      description:
        'Start your personal loan consultation with RM30 eligibility analysis, CCRIS/CTOS review, and a curated shortlist of Malaysian banks.',
    },
    ms: {
      name: 'Pinjaman Peribadi',
      title: 'Mohon Pinjaman Peribadi',
      description:
        'Mulakan konsultasi pinjaman peribadi anda dengan analisis kelayakan RM30, semakan CCRIS/CTOS, dan senarai pendek bank Malaysia yang sesuai.',
    },
  },
  '4': {
    en: {
      name: 'Business Loan',
      title: 'Apply for Business Loan',
      description:
        'Secure SME financing with detailed cash flow assessment, professional documentation review, and introductions to suitable lenders.',
    },
    ms: {
      name: 'Pinjaman Perniagaan',
      title: 'Mohon Pinjaman Perniagaan',
      description:
        'Dapatkan pembiayaan PKS dengan penilaian aliran tunai terperinci, semakan dokumentasi profesional, dan pengenalan kepada pemberi pinjam yang sesuai.',
    },
  },
};

const DEFAULT_META: Record<Language, { name: string; title: string; description: string }> = {
  en: {
    name: 'Loan Application',
    title: 'Apply for Loan Consultation',
    description:
      'Submit your loan application to receive DSR evaluation, CCRIS/CTOS review, and a written loan offer — direct from a licensed lender. RM30 covers the CTOS report pull.',
  },
  ms: {
    name: 'Permohonan Pinjaman',
    title: 'Mohon Konsultasi Pinjaman',
    description:
      'Hantar permohonan pinjaman anda untuk terima penilaian DSR, semakan CCRIS/CTOS, dan tawaran pinjaman bertulis — terus daripada pemberi pinjam berlesen. RM30 meliputi carian laporan CTOS.',
  },
};

function resolveMeta(id: string | undefined, language: Language) {
  return (id && SERVICE_META[id]?.[language]) || DEFAULT_META[language];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const language = await resolveRequestLanguage();
  const meta = resolveMeta(id, language);
  const base = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/services/${id ?? 'apply'}/apply`,
    locale: language,
  });
  return { ...base, robots: { index: false, follow: false } };
}

export default async function ApplyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  if (id && !SERVICE_META[id]) {
    notFound();
  }
  const language = await resolveRequestLanguage();
  const meta = resolveMeta(id, language);
  const url = `${SEO.url}/services/${id ?? 'apply'}/apply`;
  return (
    <>
      <WebPageJsonLd
        url={url}
        title={meta.title}
        description={meta.description}
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Services', url: `${SEO.url}/services` },
          { name: meta.name, url },
        ]}
      />
      {children}
    </>
  );
}
