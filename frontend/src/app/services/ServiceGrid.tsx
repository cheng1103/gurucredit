import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Wallet, Clock, ArrowRight, Star } from 'lucide-react';
import {
  ServiceDefinition,
  serviceIcons,
  serviceGradients,
  serviceAccentColors,
  serviceImages,
  loanDetailLinks,
  highlightColors,
} from './data';

interface Props {
  services: ServiceDefinition[];
  applyLabel: string;
  learnMoreLabel: string;
  availabilityLabel: string;
}

export default function ServiceGrid({
  services,
  applyLabel,
  learnMoreLabel,
  availabilityLabel,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {services.map((service) => {
        const Icon = serviceIcons[service.type];
        const gradient = serviceGradients[service.type];
        const accentColor = serviceAccentColors[service.type];
        const serviceImage = serviceImages[service.type];
        const detailLink = loanDetailLinks[service.type];

        return (
          <div key={service.id} className="group relative">
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-[2rem] blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500`}
            />

            <Card
              className="relative overflow-hidden rounded-[1.75rem] border-0 bg-background transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2"
            >
              <div className="relative h-52">
                <div className="absolute inset-0 overflow-hidden rounded-t-[1.75rem]">
                  <Image
                    src={serviceImage}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 mix-blend-overlay`} />
                </div>

                <div className="absolute top-4 left-4 z-10">
                  <Badge className={`${highlightColors[service.highlight]} border-0 font-semibold px-3 py-1.5 text-xs uppercase tracking-wide shadow-lg`}>
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {service.highlight}
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <div className="px-4 py-2 rounded-xl bg-background/90 backdrop-blur-md shadow-lg">
                    <div className="flex items-baseline gap-0.5">
                      <span className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {service.rate}%
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">p.a.</p>
                  </div>
                </div>

                <div className="absolute -bottom-7 left-6 z-20">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl ring-4 ring-background transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>

              <CardContent className="pt-12 pb-6 px-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{service.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">RM {service.maxAmount}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{service.tenure}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 shrink-0 ${accentColor}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={detailLink}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    {learnMoreLabel}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                  <Badge variant="outline" className="py-1">
                    {availabilityLabel}
                  </Badge>
                </div>
                <div className="mt-4">
                  <Button className="w-full btn-gradient text-primary-foreground" asChild>
                    <Link href={`/services/${service.id}/apply`}>
                      {applyLabel}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
