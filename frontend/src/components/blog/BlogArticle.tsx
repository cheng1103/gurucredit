'use client';

import { isValidElement, useState, type ReactNode } from 'react';
import Image from 'next/image';
import ReactMarkdown, { type Components } from 'react-markdown';
import { ArrowRight, Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LocaleLink } from '@/components/LocaleLink';
import { ArticleJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { ArticleLayout, slugifyHeading } from '@/components/layout';
import { VerifyTrustCard } from '@/components/VerifyTrustCard';
import { getAuthorProfile, DEFAULT_AUTHOR_PHOTO } from '@/lib/authors';
import type { BlogPost } from '@/lib/blog-data';
import { blogUi } from '@/lib/content/blog-ui';
import { SEO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { PATHS } from '@/lib/i18n/routes';

const textOf = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
};

const mdComponents: Components = {
  h1: ({ children }) => <h2 id={slugifyHeading(textOf(children))}>{children}</h2>,
  h2: ({ children }) => <h2 id={slugifyHeading(textOf(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugifyHeading(textOf(children))}>{children}</h3>,
  a: ({ href, children }) =>
    href?.startsWith('/') ? <LocaleLink href={href}>{children}</LocaleLink> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
};

function formatDate(iso: string, language: 'en' | 'ms') {
  return new Date(iso).toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-MY', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Kuala_Lumpur' });
}

export function BlogArticle({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const { language } = useLanguage();
  const t = blogUi[language];
  const [copied, setCopied] = useState(false);
  const title = language === 'ms' ? post.titleMs : post.title;
  const excerpt = language === 'ms' ? post.excerptMs : post.excerpt;
  const content = language === 'ms' ? post.contentMs : post.content;
  const author = getAuthorProfile(post.author);
  const authorRole = post.authorRole ?? author.role;
  const authorBio = post.authorBio ?? author.bio;
  const authorPhoto = post.authorPhoto ?? author.photo ?? DEFAULT_AUTHOR_PHOTO;
  const url = new URL(PATHS.blogPost(post.slug), SEO.url).toString();

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <>
      <ArticleJsonLd
        title={post.title} titleMs={post.titleMs} description={post.excerpt} descriptionMs={post.excerptMs}
        author={post.author} authorRole={authorRole} authorBio={authorBio} authorCredentials={post.authorCredentials ?? author.credentials} authorPhoto={authorPhoto}
        publishedAt={post.publishedAt} updatedAt={post.updatedAt} reviewedBy={post.reviewedBy} reviewedAt={post.reviewedAt}
        slug={post.slug} tags={post.tags} image={post.image} language={language}
      />
      <WebPageJsonLd url={url} title={title} description={excerpt} image={post.image} language={language} breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: 'Blog', url: new URL(PATHS.blog, SEO.url).toString() }, { name: title, url }]} />

      <ArticleLayout
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbBlog, href: PATHS.blog }, { label: title }]}
        eyebrow={t.categories[post.category]}
        title={title}
        lede={excerpt}
        meta={
          <>
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{t.published} {formatDate(post.publishedAt, language)}</span>
            {post.updatedAt ? (<><span aria-hidden="true">·</span><span>{t.updated} {formatDate(post.updatedAt, language)}</span></>) : null}
            <span aria-hidden="true">·</span>
            <span>{post.readTime} {t.minRead}</span>
            <Button variant="ghost" size="sm" type="button" onClick={share} className="ml-auto">
              {copied ? <Check className="size-4 text-success" /> : <Share2 className="size-4" />}
              {copied ? t.copied : t.share}
            </Button>
          </>
        }
        aside={
          post.reviewedBy ? (
            <p className="text-xs text-foreground-subtle">{t.reviewedBy} {post.reviewedBy}{post.reviewedAt ? ` · ${formatDate(post.reviewedAt, language)}` : ''}</p>
          ) : null
        }
        footer={
          <div className="space-y-12">
            <div className="flex gap-4 rounded-2xl border border-border bg-surface p-6">
              <Image src={authorPhoto} alt={post.author} width={56} height={56} className="size-14 shrink-0 rounded-full object-cover" />
              <div>
                <p className="eyebrow mb-1">{t.aboutAuthor}</p>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-foreground-subtle">{authorRole}</p>
                <p className="mt-2 text-sm text-foreground-muted">{authorBio}</p>
              </div>
            </div>
            <VerifyTrustCard language={language} compact />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (<Badge key={tag} variant="secondary">{tag}</Badge>))}
            </div>
            {relatedPosts.length > 0 ? (
              <div>
                <h2 className="text-2xl">{t.related}</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((rp) => (
                    <article key={rp.slug} className="relative flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                      <p className="eyebrow mb-2">{t.categories[rp.category]}</p>
                      <h3 className="text-lg">
                        <LocaleLink href={PATHS.blogPost(rp.slug)} className="after:absolute after:inset-0">{language === 'ms' ? rp.titleMs : rp.title}</LocaleLink>
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-foreground-muted">{language === 'ms' ? rp.excerptMs : rp.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{t.readMore}<ArrowRight className="size-4" /></span>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        }
      >
        <p className="rounded-xl border border-warning/30 bg-warning-soft p-4 text-sm text-foreground">{t.disclaimer}</p>
        <figure>
          <Image src={post.image} alt={title} width={1200} height={630} className="w-full" priority />
        </figure>
        <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
      </ArticleLayout>
    </>
  );
}
