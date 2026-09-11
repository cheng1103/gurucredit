import { PATHS } from '@/lib/i18n/routes';

export type BlogGuideLink = {
  href: string;
  title: string;
  description: string;
};

export const blogUi = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    eyebrow: 'Knowledge Center',
    title: 'Blog & Resources',
    lede: 'Expert insights, tips, and guides to help you navigate loans, credit, and financial planning in Malaysia.',
    searchPlaceholder: 'Search articles...',
    featuredBadge: 'Featured Article',
    featuredCta: 'Read Article',
    readMore: 'Read more',
    minRead: 'min read',
    noResults: {
      title: 'No articles found',
      description: "Try adjusting your search or filter to find what you're looking for.",
      action: 'Clear filters',
    },
    popularTopics: 'Popular Topics',
    loanGuides: {
      title: 'Loan Guides Hub',
      description: 'Short, actionable playbooks to improve approvals and compare options.',
      cta: 'Open guide',
      items: [
        { href: PATHS.loanGuide.creditScore, title: 'Credit Score Guide', description: 'Repair CCRIS/CTOS fast and boost approval odds.' },
        { href: PATHS.loanGuide.debtConsolidation, title: 'Debt Consolidation Plan', description: 'Combine debts and lower monthly payments.' },
      ] satisfies BlogGuideLink[],
    },
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbBlog: 'Blog',
    eyebrow: 'Pusat Pengetahuan',
    title: 'Blog & Sumber',
    lede: 'Pandangan pakar, petua, dan panduan untuk membantu anda mengemudi pinjaman, kredit, dan perancangan kewangan di Malaysia.',
    searchPlaceholder: 'Cari artikel...',
    featuredBadge: 'Artikel Pilihan',
    featuredCta: 'Baca Artikel',
    readMore: 'Baca lagi',
    minRead: 'min baca',
    noResults: {
      title: 'Tiada artikel dijumpai',
      description: 'Cuba laraskan carian atau penapis anda untuk mencari apa yang anda cari.',
      action: 'Kosongkan penapis',
    },
    popularTopics: 'Topik Popular',
    loanGuides: {
      title: 'Hab Panduan Pinjaman',
      description: 'Panduan ringkas untuk tingkatkan kelulusan dan banding pilihan.',
      cta: 'Buka panduan',
      items: [
        { href: PATHS.loanGuide.creditScore, title: 'Panduan Skor Kredit', description: 'Baiki CCRIS/CTOS dan tingkatkan peluang kelulusan.' },
        { href: PATHS.loanGuide.debtConsolidation, title: 'Pelan Penyatuan Hutang', description: 'Gabungkan hutang dan kurangkan ansuran.' },
      ] satisfies BlogGuideLink[],
    },
  },
} as const;
