import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Logo, slogans } from '@/components/Logo';
import { aboutContent } from './data';
import Link from 'next/link';
import {
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
  CheckCircle,
  Star,
  Quote,
  MapPin,
  Phone,
  Mail,
  Shield,
  Eye,
  Zap,
  Scale,
  FileText,
  Percent,
  Clock,
  RefreshCcw,
} from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';
import { COMPANY } from '@/lib/constants';

// Bilingual page content

type AboutContentProps = {
  language: Language;
};

export default function AboutContent({ language }: AboutContentProps) {
  const t = aboutContent[language] ?? aboutContent.en;
  const valueIcons = [Shield, Eye, Zap, Scale];
  const whyChooseUsIcons = [FileText, Percent, Clock, RefreshCcw];

  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container relative">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Target className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <div className="mb-6">
            <p className="text-xl font-medium text-foreground">{slogans.en}</p>
            <p className="text-lg italic text-muted-foreground">{slogans.ms}</p>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.header.description}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{t.mission.badge}</Badge>
              <h2 className="text-3xl font-bold mb-4">{t.mission.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.mission.description1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.mission.description2}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.mission.description3}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-gradient text-primary-foreground" asChild>
                <Link href="/services">
                  {t.mission.exploreServices}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">{t.mission.contactUs}</Link>
              </Button>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-2xl surface-card">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {t.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold mb-1">{stat.value}</div>
                    <div className="font-medium mb-1">{stat.label}</div>
                    <div className="text-xs opacity-70">{stat.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust & Coverage */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          <Card className="lg:col-span-2 surface-card">
            <CardContent className="p-8">
              <Badge variant="outline" className="mb-4 px-4 py-1.5">
                <Shield className="h-3 w-3 mr-1" />
                {t.trust.badge}
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.trust.title}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {t.trust.items.map((item, index) => (
                  <div key={index} className="rounded-xl border border-primary/10 bg-background/70 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <p className="font-semibold text-sm">{item.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="surface-card">
            <CardContent className="p-8">
              <Badge variant="outline" className="mb-4 px-4 py-1.5">
                <MapPin className="h-3 w-3 mr-1" />
                {t.coverage.badge}
              </Badge>
              <h3 className="text-xl font-bold mb-3">{t.coverage.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.coverage.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {t.coverage.areas.map((area) => (
                  <Badge key={area} variant="secondary">{area}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{t.coverage.note}</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Lightbulb className="h-3 w-3 mr-1" />
              {t.journey.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.journey.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.journey.description}
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            <div className="space-y-8">
              {t.timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="inline-block surface-card">
                      <CardContent className="p-6">
                        <Badge className="mb-2">{item.year}</Badge>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Heart className="h-3 w-3 mr-1" />
              {t.values.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.values.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.values.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <Card key={index} className="text-center card-hover border-2 hover:border-primary/20 surface-card">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20 bg-muted/30 rounded-3xl p-8 lg:p-12 surface-card">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Star className="h-3 w-3 mr-1" />
              {t.whyChooseUs.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.whyChooseUs.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.whyChooseUs.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {t.whyChooseUs.items.map((item, index) => {
              const Icon = whyChooseUsIcons[index % whyChooseUsIcons.length];
              return (
                <div key={index} className="flex gap-4 p-6 bg-background rounded-xl border surface-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">{t.services.badge}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.services.title}</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20 surface-card">
              <CardContent className="p-8">
                <Badge className="mb-4">{t.services.popular}</Badge>
                <h3 className="text-2xl font-bold mb-2">{t.services.mainService.title}</h3>
                <p className="text-3xl font-bold text-primary mb-4">
                  {t.services.mainService.price}{' '}
                  <span className="text-sm font-normal text-muted-foreground">{t.services.mainService.priceNote}</span>
                </p>
                <ul className="space-y-3">
                  {t.services.mainService.features.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 btn-gradient text-primary-foreground" asChild>
                  <Link href="/services/1/apply">{t.services.mainService.button}</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {t.services.otherServices.map((service, index) => (
                <Card key={index} className="surface-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services">{t.services.learnMore}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Quote className="h-3 w-3 mr-1" />
              {t.testimonials.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.testimonials.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="card-hover surface-card">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20 surface-card">
          <CardContent className="py-12 lg:py-16 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5">{t.cta.badge}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="btn-gradient text-primary-foreground shadow-lg shadow-primary/25" asChild>
                <Link href="/services">
                  {t.cta.viewServices}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">{t.cta.tryCalculator}</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href={COMPANY.phoneLink} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" />
                {COMPANY.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
