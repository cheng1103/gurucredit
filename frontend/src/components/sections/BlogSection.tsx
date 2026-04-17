import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';

type Props = { t: HomeContent; language: Language };

export function BlogSection({ t, language }: Props) {
  const latestPosts = blogPosts.slice(0, 3);
  const locale = language === 'ms' ? 'ms-MY' : 'en-MY';

  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
          <div>
            <Badge variant="outline" className="mb-3 px-4 py-1.5">
              {t.blog.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">{t.blog.title}</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog">
              {t.blog.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {latestPosts.map((post) => {
            const localizedTitle = language === 'ms' ? post.titleMs : post.title;
            const localizedExcerpt = language === 'ms' ? post.excerptMs : post.excerpt;
            const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
            return (
              <Card key={post.slug} className="h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-4">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formattedDate}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/60" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{localizedTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                    {localizedExcerpt}
                  </p>
                  <div className="mt-auto">
                    <Button variant="link" asChild className="px-0">
                      <Link href={`/blog/${post.slug}`}>
                        {t.blog.readArticle}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
