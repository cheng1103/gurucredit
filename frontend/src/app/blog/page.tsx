'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Newspaper,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import { blogPosts, blogCategories, type BlogPost } from '@/lib/blog-data';
import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Knowledge Center',
      title: 'Blog &',
      titleHighlight: 'Resources',
      description: 'Expert insights, tips, and guides to help you navigate loans, credit, and financial planning in Malaysia.',
    },
    featured: {
      badge: 'Featured Article',
      button: 'Read Article',
    },
    search: {
      placeholder: 'Search articles...',
      results: (count: number) => `${count} article${count !== 1 ? 's' : ''} found`,
      noResults: {
        title: 'No articles found',
        description: 'Try adjusting your search or filter to find what you\'re looking for.',
        button: 'Clear filters',
      },
    },
    readMore: 'Read more',
    minRead: 'min read',
    min: 'min',
    popularTopics: 'Popular Topics',
    loanGuides: {
      title: 'Loan Guides Hub',
      description: 'Short, actionable playbooks to improve approvals and compare options.',
      cta: 'Open guide',
      items: [
        {
          title: 'Credit Score Guide',
          description: 'Repair CCRIS/CTOS fast and boost approval odds.',
          href: '/loan-guides/credit-score',
        },
        {
          title: 'Home Loan Checklist',
          description: 'Plan your mortgage, DSR, and documentation.',
          href: '/loan-guides/home-loan',
        },
        {
          title: 'Car Loan Playbook',
          description: 'Down payment strategy and dealer prep.',
          href: '/loan-guides/car-loan',
        },
        {
          title: 'Debt Consolidation Plan',
          description: 'Combine debts and lower monthly payments.',
          href: '/loan-guides/debt-consolidation',
        },
      ],
    },
    categories: {
      all: 'All',
      tips: 'Tips',
      guide: 'Guide',
      news: 'News',
      analysis: 'Analysis',
    },
    cta: {
      title: 'Need Personalized Advice?',
      description: 'Our expert consultants can help you with credit analysis, loan applications, and financial planning.',
      viewServices: 'View Our Services',
      contactUs: 'Contact Us',
    },
  },
  ms: {
    header: {
      badge: 'Pusat Pengetahuan',
      title: 'Blog &',
      titleHighlight: 'Sumber',
      description: 'Pandangan pakar, petua, dan panduan untuk membantu anda mengemudi pinjaman, kredit, dan perancangan kewangan di Malaysia.',
    },
    featured: {
      badge: 'Artikel Pilihan',
      button: 'Baca Artikel',
    },
    search: {
      placeholder: 'Cari artikel...',
      results: (count: number) => `${count} artikel dijumpai`,
      noResults: {
        title: 'Tiada artikel dijumpai',
        description: 'Cuba laraskan carian atau penapis anda untuk mencari apa yang anda cari.',
        button: 'Kosongkan penapis',
      },
    },
    readMore: 'Baca lagi',
    minRead: 'min baca',
    min: 'min',
    popularTopics: 'Topik Popular',
    loanGuides: {
      title: 'Hab Panduan Pinjaman',
      description: 'Panduan ringkas untuk tingkatkan kelulusan dan banding pilihan.',
      cta: 'Buka panduan',
      items: [
        {
          title: 'Panduan Skor Kredit',
          description: 'Baiki CCRIS/CTOS dan tingkatkan peluang kelulusan.',
          href: '/loan-guides/credit-score',
        },
        {
          title: 'Senarai Semak Pinjaman Rumah',
          description: 'Rancang gadai janji, DSR, dan dokumen.',
          href: '/loan-guides/home-loan',
        },
        {
          title: 'Panduan Pinjaman Kereta',
          description: 'Strategi deposit dan persediaan dealer.',
          href: '/loan-guides/car-loan',
        },
        {
          title: 'Pelan Penyatuan Hutang',
          description: 'Gabungkan hutang dan kurangkan ansuran.',
          href: '/loan-guides/debt-consolidation',
        },
      ],
    },
    categories: {
      all: 'Semua',
      tips: 'Petua',
      guide: 'Panduan',
      news: 'Berita',
      analysis: 'Analisis',
    },
    cta: {
      title: 'Perlukan Nasihat Peribadi?',
      description: 'Perunding pakar kami boleh membantu anda dengan analisis kredit, permohonan pinjaman, dan perancangan kewangan.',
      viewServices: 'Lihat Perkhidmatan Kami',
      contactUs: 'Hubungi Kami',
    },
  },
};

const categoryIcons: Record<string, typeof BookOpen> = {
  tips: Lightbulb,
  guide: BookOpen,
  news: Newspaper,
  analysis: BarChart3,
};

const categoryColors: Record<string, string> = {
  tips: 'bg-amber-100 text-amber-800 border-amber-200',
  guide: 'bg-blue-100 text-blue-800 border-blue-200',
  news: 'bg-green-100 text-green-800 border-green-200',
  analysis: 'bg-purple-100 text-purple-800 border-purple-200',
};

export default function BlogPage() {
  const { language } = useLanguage();
  const t = pageContent[language];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (categoryId: string) => {
    const key = categoryId as keyof typeof t.categories;
    return t.categories[key] || categoryId;
  };

  // Helper to get localized content
  const getTitle = (post: BlogPost) => language === 'ms' ? post.titleMs : post.title;
  const getExcerpt = (post: BlogPost) => language === 'ms' ? post.excerptMs : post.excerpt;

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const title = getTitle(post);
    const excerpt = getExcerpt(post);
    const matchesSearch =
      searchQuery === '' ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <WebPageJsonLd
        url={`${SEO.url}/blog`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.description}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Blog', url: `${SEO.url}/blog` },
        ]}
      />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <BookOpen className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20 surface-card">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <Badge className={`w-fit mb-4 ${categoryColors[featuredPost.category]}`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {t.featured.badge}
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                {getTitle(featuredPost)}
              </h2>
              <p className="text-muted-foreground mb-6">
                {getExcerpt(featuredPost)}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(featuredPost.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime} {t.minRead}
                </span>
              </div>
              <Button asChild className="w-fit btn-gradient text-primary-foreground">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {t.featured.button}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative min-h-[220px] lg:min-h-full">
              <Image
                src={featuredPost.image}
                alt={getTitle(featuredPost)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {blogCategories.map((category) => {
              const Icon = categoryIcons[category.id] || BookOpen;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.id !== 'all' && <Icon className="h-3 w-3 mr-1" />}
                  {getCategoryLabel(category.id)}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {t.search.results(filteredPosts.length)}
        </p>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPosts.map((post) => {
              const CategoryIcon = categoryIcons[post.category] || BookOpen;
              return (
                <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 surface-card">
                  <div className="relative h-40 overflow-hidden rounded-t-xl">
                    <Image
                      src={post.image}
                      alt={getTitle(post)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className={categoryColors[post.category]}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {getCategoryLabel(post.category)}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} {t.min}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {getTitle(post)}
                      </h3>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {getExcerpt(post)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                      >
                        {t.readMore}
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center mb-12 surface-card">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t.search.noResults.title}</h3>
            <p className="text-muted-foreground mb-4">
              {t.search.noResults.description}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              {t.search.noResults.button}
            </Button>
          </Card>
        )}

        {/* Popular Tags */}
        <Card className="p-6 mb-12 surface-card">
          <h3 className="font-semibold mb-4">{t.popularTopics}</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(blogPosts.flatMap((post) => post.tags)))
              .slice(0, 15)
              .map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </Badge>
              ))}
          </div>
        </Card>

        <Card className="p-6 mb-12 surface-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <h3 className="font-semibold text-lg">{t.loanGuides.title}</h3>
              <p className="text-sm text-muted-foreground">{t.loanGuides.description}</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/loan-guides">{t.loanGuides.cta}</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {t.loanGuides.items.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border bg-white/70 p-4 text-sm transition hover:border-primary/40 hover:shadow-sm"
              >
                <p className="font-semibold text-foreground mb-1">{guide.title}</p>
                <p className="text-muted-foreground">{guide.description}</p>
              </Link>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20 p-8 text-center surface-card">
          <h3 className="text-2xl font-bold mb-2">{t.cta.title}</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="btn-gradient text-primary-foreground">
              <Link href="/services">
                {t.cta.viewServices}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                {t.cta.contactUs}
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
