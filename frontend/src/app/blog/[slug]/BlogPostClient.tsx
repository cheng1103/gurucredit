'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookOpen,
  Lightbulb,
  Newspaper,
  BarChart3,
  ArrowRight,
  MessageCircle,
  User,
  ChevronRight,
} from 'lucide-react';
import { blogCategories, type BlogPost } from '@/lib/blog-data';
import { COMPANY, SEO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import { ArticleJsonLd, WebPageJsonLd } from '@/components/JsonLd';

// Bilingual page content
const pageContent = {
  en: {
    backToBlog: 'Back to Blog',
    minRead: 'min read',
    min: 'min',
    share: 'Share',
    linkCopied: 'Link copied to clipboard!',
    reviewedBy: 'Reviewed by',
    lastReviewed: 'Last reviewed',
    disclaimerTitle: 'Financial Disclaimer',
    disclaimerText:
      'Content is for educational purposes only and does not constitute financial, legal, or tax advice. Loan approval depends on bank policy and your profile. Always verify rates and terms with the lender.',
    cta: {
      title: 'Need Expert Help?',
      description: 'Have questions about loans, credit, or financial planning? Our team is here to help.',
      viewServices: 'View Services',
      whatsapp: 'WhatsApp Us',
    },
    relatedArticles: 'Related Articles',
    read: 'Read',
  },
  ms: {
    backToBlog: 'Kembali ke Blog',
    minRead: 'min baca',
    min: 'min',
    share: 'Kongsi',
    linkCopied: 'Pautan disalin ke papan klip!',
    reviewedBy: 'Disemak oleh',
    lastReviewed: 'Semakan terakhir',
    disclaimerTitle: 'Penafian Kewangan',
    disclaimerText:
      'Kandungan ini untuk tujuan pendidikan sahaja dan bukan nasihat kewangan, undang-undang, atau cukai. Kelulusan pinjaman tertakluk kepada polisi bank dan profil anda. Sahkan kadar dan terma dengan bank.',
    cta: {
      title: 'Perlukan Bantuan Pakar?',
      description: 'Ada soalan tentang pinjaman, kredit, atau perancangan kewangan? Pasukan kami sedia membantu.',
      viewServices: 'Lihat Perkhidmatan',
      whatsapp: 'WhatsApp Kami',
    },
    relatedArticles: 'Artikel Berkaitan',
    read: 'Baca',
  },
};

const categoryIcons: Record<string, typeof BookOpen> = {
  tips: Lightbulb,
  guide: BookOpen,
  news: Newspaper,
  analysis: BarChart3,
};

const categoryColors: Record<string, string> = {
  tips: 'bg-amber-100/80 text-amber-900 border-amber-200/60',
  guide: 'bg-sky-100/80 text-sky-900 border-sky-200/60',
  news: 'bg-emerald-100/80 text-emerald-900 border-emerald-200/60',
  analysis: 'bg-slate-100/90 text-slate-900 border-slate-200/70',
};

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { language } = useLanguage();
  const t = pageContent[language];
  const [copied, setCopied] = useState(false);

  // Helper functions for localized content
  const getTitle = (p: BlogPost) => language === 'ms' ? p.titleMs : p.title;
  const getExcerpt = (p: BlogPost) => language === 'ms' ? p.excerptMs : p.excerpt;
  const getContent = (p: BlogPost) => language === 'ms' ? p.contentMs : p.content;
  const getCategoryLabel = (categoryId: string) => {
    const category = blogCategories.find((c) => c.id === categoryId);
    return language === 'ms' ? category?.labelMs : category?.label;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const CategoryIcon = categoryIcons[post.category] || BookOpen;
  const categoryLabel = getCategoryLabel(post.category);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getTitle(post),
          text: getExcerpt(post),
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 py-16 lg:py-24">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <ArticleJsonLd
        title={post.title}
        titleMs={post.titleMs}
        description={post.excerpt}
        descriptionMs={post.excerptMs}
        author={post.author}
        publishedAt={post.publishedAt}
        slug={post.slug}
        tags={post.tags}
        image={post.image}
      />
      <WebPageJsonLd
        url={`${SEO.url}/blog/${post.slug}`}
        title={getTitle(post)}
        description={getExcerpt(post)}
        image={post.image}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Blog', url: `${SEO.url}/blog` },
          { name: getTitle(post), url: `${SEO.url}/blog/${post.slug}` },
        ]}
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Back Button */}
          <Button asChild variant="ghost" className="pl-0 text-base">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              {t.backToBlog}
            </Link>
          </Button>

          {/* Article Header */}
          <div className="surface-card rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge className={categoryColors[post.category]}>
                <CategoryIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                {categoryLabel}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {post.readTime} {t.minRead}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {getTitle(post)}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {getExcerpt(post)}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-sm">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{COMPANY.name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <span>
                  {t.reviewedBy}: {COMPANY.name} Research
                </span>
                <span>
                  {t.lastReviewed}: {formatDate(post.publishedAt)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {copied && (
                  <span className="text-xs text-muted-foreground">{t.linkCopied}</span>
                )}
                <Button
                  size="sm"
                  onClick={handleShare}
                  aria-label={t.share}
                  className="btn-gradient text-white shadow-md"
                >
                <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
                {t.share}
              </Button>
              </div>
            </div>
          </div>

          <Card className="surface-card border-amber-200/70 bg-amber-50/60">
            <CardContent className="p-5 text-sm text-amber-900">
              <strong className="block mb-1">{t.disclaimerTitle}</strong>
              <span className="text-amber-800">{t.disclaimerText}</span>
            </CardContent>
          </Card>

          {/* Article Cover */}
          <div className="relative overflow-hidden rounded-3xl shadow-lg surface-card">
            <div className="relative h-64 md:h-80">
              <Image
                src={post.image}
                alt={getTitle(post)}
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          {/* Article Content */}
          <article className="surface-card rounded-3xl p-6 md:p-8 shadow-lg prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-muted-foreground">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <Link href={href || '#'} className="text-primary hover:underline">
                    {children}
                  </Link>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">{children}</pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="w-full border-collapse border border-border">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="border border-border px-4 py-2 text-left font-semibold">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="border border-border px-4 py-2">{children}</td>
                ),
              }}
            >
              {getContent(post)}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          <div className="surface-card rounded-2xl p-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white/70">
                {tag}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <Card className="surface-card border-primary/15 shadow-lg">
            <CardContent className="py-8 text-center">
              <h3 className="text-xl font-bold mb-2">{t.cta.title}</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="btn-gradient text-white shadow-md">
                  <Link href="/services">
                    {t.cta.viewServices}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/30">
                  <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t.cta.whatsapp}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.relatedArticles}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedPosts.map((relatedPost) => {
                  const RelatedCategoryIcon = categoryIcons[relatedPost.category] || BookOpen;
                  return (
                    <Card key={relatedPost.slug} className="group surface-card card-hover border-primary/10">
                      <CardHeader className="pb-2">
                        <Badge variant="outline" className={`w-fit text-xs ${categoryColors[relatedPost.category]}`}>
                          <RelatedCategoryIcon className="h-2 w-2 mr-1" aria-hidden="true" />
                          {getCategoryLabel(relatedPost.category)}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {getTitle(relatedPost)}
                          </CardTitle>
                        </Link>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {relatedPost.readTime} {t.min}
                          </span>
                          <Link
                            href={`/blog/${relatedPost.slug}`}
                            className="text-primary flex items-center gap-1 hover:underline"
                          >
                            {t.read}
                            <ChevronRight className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
