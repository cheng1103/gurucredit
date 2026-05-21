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
  CheckCircle2,
  FileText,
  ShieldCheck,
  ListChecks,
} from 'lucide-react';
import { blogCategories, type BlogPost } from '@/lib/blog-data';
import { COMPANY, SEO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import ReactMarkdown from 'react-markdown';
import { ArticleJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { getAuthorProfile } from '@/lib/authors';

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
    snapshot: {
      label: 'Article Snapshot',
      title: 'Before you read',
      keyPoints: 'Key points',
      actionList: 'Action checklist',
      trustBox: 'Why this is reliable',
      trustText:
        'Reviewed for Malaysian borrower context, with official sources and practical lending checks.',
      sources: 'Official references',
    },
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
    snapshot: {
      label: 'Ringkasan Artikel',
      title: 'Sebelum anda baca',
      keyPoints: 'Perkara penting',
      actionList: 'Senarai tindakan',
      trustBox: 'Mengapa ini boleh dipercayai',
      trustText:
        'Disemak untuk konteks peminjam Malaysia, dengan sumber rasmi dan semakan pinjaman praktikal.',
      sources: 'Rujukan rasmi',
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
  tips: 'bg-amber-100/80 text-amber-900 border-amber-200/60',
  guide: 'bg-sky-100/80 text-sky-900 border-sky-200/60',
  news: 'bg-emerald-100/80 text-emerald-900 border-emerald-200/60',
  analysis: 'bg-slate-100/90 text-slate-900 border-slate-200/70',
};

const defaultSnapshot = {
  en: {
    points: [
      'Written for Malaysian borrowers comparing loan and credit decisions.',
      'Includes practical checks you can use before contacting a lender.',
      'Reviewed with financial education and responsible borrowing in mind.',
    ],
    actions: ['Check your documents', 'Review your credit record', 'Compare the repayment impact'],
    sources: ['Bank Negara Malaysia', 'AKPK', 'Official lender documents'],
  },
  ms: {
    points: [
      'Ditulis untuk peminjam Malaysia yang membandingkan pinjaman dan keputusan kredit.',
      'Mengandungi semakan praktikal sebelum menghubungi lender.',
      'Disemak dengan fokus pendidikan kewangan dan pinjaman bertanggungjawab.',
    ],
    actions: ['Semak dokumen anda', 'Semak rekod kredit', 'Banding kesan ansuran'],
    sources: ['Bank Negara Malaysia', 'AKPK', 'Dokumen rasmi lender'],
  },
};

const postSnapshots: Record<
  string,
  {
    en: { points: string[]; actions: string[]; sources: string[] };
    ms: { points: string[]; actions: string[]; sources: string[] };
  }
> = {
  'personal-loan-malaysia-approval-checklist-2026': {
    en: {
      points: [
        'OPR was 2.75% as at 7 May 2026, but approval still depends on your profile.',
        'A complete CCRIS/CTOS and document review should happen before applying.',
        'Multiple applications in a short window can weaken an otherwise workable profile.',
      ],
      actions: [
        'Calculate commitments against net income',
        'Prepare 3 to 6 months bank statements',
        'Shortlist one or two suitable lenders first',
        'Pause if there is a fresh missed payment',
      ],
      sources: ['Google Search Central', 'Bank Negara Malaysia', 'data.gov.my', 'AKPK'],
    },
    ms: {
      points: [
        'OPR ialah 2.75% setakat 7 Mei 2026, tetapi kelulusan masih bergantung pada profil anda.',
        'Semakan CCRIS/CTOS dan dokumen lengkap patut dibuat sebelum memohon.',
        'Banyak permohonan dalam masa singkat boleh melemahkan profil yang sebenarnya masih boleh dipertimbang.',
      ],
      actions: [
        'Kira komitmen berbanding pendapatan bersih',
        'Sediakan penyata bank 3 hingga 6 bulan',
        'Pilih satu atau dua lender yang sesuai dahulu',
        'Tunggu jika baru ada lewat bayar',
      ],
      sources: ['Google Search Central', 'Bank Negara Malaysia', 'data.gov.my', 'AKPK'],
    },
  },
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
  const snapshot = postSnapshots[post.slug]?.[language] ?? defaultSnapshot[language];

  const authorProfile = getAuthorProfile(post.author);
  const authorRole = post.authorRole ?? authorProfile.role;
  const authorBio = post.authorBio ?? authorProfile.bio;
  const authorCredentials = post.authorCredentials ?? authorProfile.credentials;
  const authorPhoto = post.authorPhoto ?? authorProfile.photo;
  const reviewedBy = post.reviewedBy ?? `${COMPANY.name} Senior Consultant`;
  const reviewedAt = post.reviewedAt ?? post.updatedAt ?? post.publishedAt;
  const hasBeenUpdated = Boolean(post.updatedAt && post.updatedAt !== post.publishedAt);

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
        authorRole={post.authorRole}
        authorBio={post.authorBio}
        authorCredentials={post.authorCredentials}
        authorPhoto={post.authorPhoto}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        reviewedBy={post.reviewedBy}
        reviewedAt={post.reviewedAt}
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
                {language === 'ms' ? 'Diterbitkan' : 'Published'} {formatDate(post.publishedAt)}
              </span>
              {hasBeenUpdated && (
                <span className="text-sm text-primary flex items-center gap-1 font-medium">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {language === 'ms' ? 'Dikemaskini' : 'Updated'} {formatDate(post.updatedAt!)}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {getTitle(post)}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {getExcerpt(post)}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  {authorPhoto ? (
                    <Image src={authorPhoto} alt={post.author} fill sizes="44px" className="object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-primary" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{authorRole}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <span>
                  {t.reviewedBy}: <span className="font-medium text-foreground">{reviewedBy}</span>
                </span>
                <span>
                  {t.lastReviewed}: {formatDate(reviewedAt)}
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

          <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="surface-card rounded-3xl p-6 shadow-lg border border-primary/10">
              <div className="flex items-center gap-2 text-primary mb-3">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
                <span className="eyebrow">{t.snapshot.label}</span>
              </div>
              <h2 className="text-2xl font-bold mb-5">{t.snapshot.title}</h2>
              <div className="grid gap-3">
                {snapshot.points.map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl bg-muted/50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="surface-card rounded-3xl p-5 shadow-lg border border-border/70">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold">{t.snapshot.actionList}</h3>
                </div>
                <ul className="space-y-3">
                  {snapshot.actions.map((action) => (
                    <li key={action} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-emerald-200/70 bg-emerald-50/70 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-emerald-900">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  <h3 className="font-semibold">{t.snapshot.trustBox}</h3>
                </div>
                <p className="text-sm text-emerald-800 mb-4">{t.snapshot.trustText}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900 mb-2">
                  {t.snapshot.sources}
                </p>
                <div className="flex flex-wrap gap-2">
                  {snapshot.sources.map((source) => (
                    <Badge key={source} variant="outline" className="bg-white/70 text-emerald-900 border-emerald-200">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

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

          {/* About the Author — E-E-A-T signal for YMYL */}
          <div className="surface-card rounded-3xl p-6 md:p-8 shadow-lg border border-border/60">
            <p className="eyebrow text-muted-foreground mb-4">
              {language === 'ms' ? 'Tentang Penulis' : 'About the Author'}
            </p>
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                {authorPhoto ? (
                  <Image src={authorPhoto} alt={post.author} fill sizes="64px" className="object-cover" />
                ) : (
                  <User className="h-7 w-7 text-primary" aria-hidden="true" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base text-foreground">{post.author}</p>
                <p className="text-sm text-primary font-medium mb-2">{authorRole}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{authorBio}</p>
                {authorCredentials && (
                  <p className="text-xs text-muted-foreground italic">
                    {language === 'ms' ? 'Kepakaran' : 'Expertise'}: {authorCredentials}
                  </p>
                )}
                <div className="mt-4 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
                  <span>
                    {t.reviewedBy}: <span className="font-medium text-foreground">{reviewedBy}</span>
                  </span>
                  <span>
                    {hasBeenUpdated
                      ? (language === 'ms' ? 'Dikemaskini' : 'Updated')
                      : (language === 'ms' ? 'Diterbitkan' : 'Published')}{' '}
                    {formatDate(post.updatedAt ?? post.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

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
