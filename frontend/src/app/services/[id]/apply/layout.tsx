import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WebPageJsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { COMPANY, SEO } from '@/lib/constants';

const SERVICE_META: Record<string, { name: string; title: string; description: string }> = {
  '1': {
    name: 'Personal Loan',
    title: `Apply for Personal Loan | ${COMPANY.name}`,
    description:
      'Start your personal loan consultation with RM30 eligibility analysis, CCRIS/CTOS review, and a curated shortlist of Malaysian banks.',
  },
  '4': {
    name: 'Business Loan',
    title: `Apply for Business Loan | ${COMPANY.name}`,
    description:
      'Secure SME financing with detailed cash flow assessment, professional documentation review, and introductions to suitable lenders.',
  },
};

const DEFAULT_META = {
  name: 'Loan Application',
  title: `Apply for Loan Consultation | ${COMPANY.name}`,
  description:
    'Submit your loan application to receive DSR evaluation, CCRIS/CTOS review, and a written loan offer — direct from a licensed lender. RM30 covers the CTOS report pull.',
};

function resolveMeta(id: string | undefined) {
  return (id && SERVICE_META[id]) || DEFAULT_META;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meta = resolveMeta(id);
  const base = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/services/${id ?? 'apply'}/apply`,
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
  const meta = resolveMeta(id);
  const url = `${SEO.url}/services/${id ?? 'apply'}/apply`;
  return (
    <>
      <WebPageJsonLd
        url={url}
        title={meta.title}
        description={meta.description}
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
