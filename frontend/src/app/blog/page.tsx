'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { ListingShell, CardGrid, ListingCard } from '@/components/listings';
import { FilterBar, EmptyState } from '@/components/layout';
import { blogPosts, blogCategories, type BlogPost } from '@/lib/blog-data';
import { useLanguage } from '@/lib/i18n';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { blogUi } from '@/lib/content/listings/blog';

export default function BlogPage() {
  const { language } = useLanguage();
  const t = blogUi[language];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = [...blogPosts].sort((a, b) => {
    const aDate = new Date(a.updatedAt ?? a.publishedAt).getTime();
    const bDate = new Date(b.updatedAt ?? b.publishedAt).getTime();
    return bDate - aDate;
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTitle = (post: BlogPost) => (language === 'ms' ? post.titleMs : post.title);
  const getExcerpt = (post: BlogPost) => (language === 'ms' ? post.excerptMs : post.excerpt);

  const categories = blogCategories.map((category) => ({
    id: category.id,
    label: language === 'ms' ? category.labelMs : category.label,
  }));
  const getCategoryLabel = (categoryId: string) => categories.find((c) => c.id === categoryId)?.label ?? categoryId;

  const filteredPosts = sortedPosts.filter((post) => {
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

  const popularTags = Array.from(new Set(sortedPosts.flatMap((post) => post.tags))).slice(0, 15);

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/blog`}
        title={t.title}
        description={t.lede}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Blog', url: `${SEO.url}/blog` },
        ]}
      />
      <ListingShell
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: '/' }, { label: t.breadcrumbBlog }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      >
        <FilterBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          placeholder={t.searchPlaceholder}
          categories={categories}
          active={selectedCategory}
          onSelect={setSelectedCategory}
          className="-mt-16 mb-10 lg:-mt-24"
        />

        {filteredPosts.length === 0 ? (
          <EmptyState
            title={t.noResults.title}
            description={t.noResults.description}
            action={
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-sm font-semibold text-primary"
              >
                {t.noResults.action}
              </button>
            }
          />
        ) : (
          <CardGrid columns={3} className="mb-12">
            {filteredPosts.map((post, index) =>
              index === 0 ? (
                <article
                  key={post.slug}
                  className="grid overflow-hidden rounded-2xl border border-border bg-surface sm:col-span-2 md:grid-cols-[1.2fr_1fr] lg:col-span-3"
                >
                  <div className="flex flex-col justify-center gap-4 p-6 lg:p-10">
                    <p className="eyebrow">{t.featuredBadge}</p>
                    <h2 className="text-2xl lg:text-3xl">
                      <LocaleLink href={`/blog/${post.slug}`} className="hover:underline">
                        {getTitle(post)}
                      </LocaleLink>
                    </h2>
                    <p className="text-foreground-muted">{getExcerpt(post)}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-subtle">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-4" aria-hidden="true" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-4" aria-hidden="true" />
                        {post.readTime} {t.minRead}
                      </span>
                    </div>
                    <LocaleLink href={`/blog/${post.slug}`} className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary">
                      {t.featuredCta}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </LocaleLink>
                  </div>
                  <div className="relative min-h-[220px] md:min-h-full">
                    <Image
                      src={post.image}
                      alt={getTitle(post)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                </article>
              ) : (
                <ListingCard
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  eyebrow={getCategoryLabel(post.category)}
                  title={getTitle(post)}
                  description={getExcerpt(post)}
                  meta={`${post.readTime} ${t.minRead} · ${formatDate(post.publishedAt)}`}
                  cta={t.readMore}
                />
              ),
            )}
          </CardGrid>
        )}

        {popularTags.length > 0 ? (
          <section className="mb-12">
            <h2 className="mb-4 text-lg font-semibold">{t.popularTopics}</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">{t.loanGuides.title}</h2>
              <p className="text-sm text-foreground-muted">{t.loanGuides.description}</p>
            </div>
            <LocaleLink href="/loan-guides" className="text-sm font-semibold text-primary">
              {t.loanGuides.cta}
            </LocaleLink>
          </div>
          <CardGrid columns={2}>
            {t.loanGuides.items.map((item) => (
              <ListingCard key={item.href} href={item.href} title={item.title} description={item.description} cta={t.loanGuides.cta} />
            ))}
          </CardGrid>
        </section>
      </ListingShell>
    </>
  );
}
