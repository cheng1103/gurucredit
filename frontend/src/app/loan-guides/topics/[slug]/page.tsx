import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowRight, CheckCircle, ListChecks, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO } from '@/lib/constants';
import { guideTopics, getGuideTopic } from '@/lib/guide-topics';
import { WebPageJsonLd, HowToJsonLd } from '@/components/JsonLd';

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guideTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getGuideTopic(slug);

  if (!topic) {
    return { title: 'Guide Not Found' };
  }

  const canonicalUrl = `${SEO.url}/loan-guides/topics/${topic.slug}`;

  return {
    title: topic.title,
    description: topic.description,
    // canonical + hreflang inherited from the root layout (localeAlternates)
    openGraph: {
      title: `${topic.title} | ${SEO.siteName}`,
      description: topic.description,
      url: canonicalUrl,
      siteName: SEO.siteName,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.title} | ${SEO.siteName}`,
      description: topic.description,
    },
  };
}

export default async function GuideTopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getGuideTopic(slug);
  if (!topic) notFound();

  const language = await resolveRequestLanguage();
  const title = language === 'ms' ? topic.titleMs : topic.title;
  const description = language === 'ms' ? topic.descriptionMs : topic.description;
  const stepsTitle = language === 'ms' ? topic.stepsTitleMs : topic.stepsTitle;
  const checklistTitle = language === 'ms' ? topic.checklistTitleMs : topic.checklistTitle;
  const warningsTitle = language === 'ms' ? topic.warningsTitleMs : topic.warningsTitle;
  const checklist = language === 'ms' ? topic.checklistMs : topic.checklist;
  const warnings = language === 'ms' ? topic.warningsMs : topic.warnings;

  return (
    <main className="pb-20">
      <HowToJsonLd
        name={stepsTitle}
        description={description}
        steps={topic.steps.map((step) => ({
          name: language === 'ms' ? step.titleMs : step.title,
          text: language === 'ms' ? step.descriptionMs : step.description,
        }))}
      />
      <WebPageJsonLd
        url={`${SEO.url}/loan-guides/topics/${topic.slug}`}
        title={title}
        description={description}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loan Guides', url: `${SEO.url}/loan-guides` },
          { name: title, url: `${SEO.url}/loan-guides/topics/${topic.slug}` },
        ]}
        faqItems={topic.faqs.map((faq) => ({
          question: language === 'ms' ? faq.questionMs : faq.question,
          answer: language === 'ms' ? faq.answerMs : faq.answer,
        }))}
      />

      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="container relative py-16 lg:py-20">
          <div className="max-w-4xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {language === 'ms' ? 'Panduan Topik' : 'Topic Guide'}
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                <span className="gradient-text">{title}</span>
              </h1>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {topic.stats.map((stat) => (
                <Card key={stat.label} className="surface-card border-border/60">
                  <CardContent className="py-4 text-center">
                    <p className="text-lg font-semibold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{language === 'ms' ? stat.labelMs : stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-center gap-3 mb-8">
          <ListChecks className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">{stepsTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {topic.steps.map((step) => (
            <Card key={step.title} className="surface-card border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">{language === 'ms' ? step.titleMs : step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{language === 'ms' ? step.descriptionMs : step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="surface-card border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle className="h-5 w-5 text-primary" />
                {checklistTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-border/60 bg-white/70 p-4">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="surface-card border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-5 w-5 text-primary" />
                {warningsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {warnings.map((item) => (
                <div key={item} className="rounded-xl border border-border/60 bg-white/70 p-4 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <Card className="surface-card border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                {language === 'ms' ? 'Bacaan seterusnya' : 'Useful next reads'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topic.related.map((item) => (
                <LocaleLink
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-white/80 px-4 py-3 text-sm transition-colors hover:border-primary/40"
                >
                  <span className="font-medium text-foreground">{language === 'ms' ? item.titleMs : item.title}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </LocaleLink>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card border-primary/15 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-5 w-5 text-primary" />
                {language === 'ms' ? 'Perlukan semakan yang lebih tepat?' : 'Need a more precise review?'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {language === 'ms'
                  ? 'Kami semak fail, kemampuan, dan kesesuaian laluan supaya langkah seterusnya lebih realistik sebelum sebarang penghantaran rasmi.'
                  : 'We review file quality, affordability, and route fit so the next step is more realistic before any formal submission.'}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="btn-gradient text-white shadow-md">
                  <LocaleLink href="/eligibility-test">
                    {language === 'ms' ? 'Mulakan semakan kelayakan' : 'Start eligibility review'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LocaleLink>
                </Button>
                <Button asChild variant="outline">
                  <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {language === 'ms' ? 'Chat di WhatsApp' : 'Chat on WhatsApp'}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
