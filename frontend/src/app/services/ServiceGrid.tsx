import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Stat, IconTile, toneCycle } from '@/components/layout';
import { PATHS } from '@/lib/i18n/routes';
import type { ServiceDefinition } from './data';
import { serviceIcons } from './data';

interface Props {
  services: ServiceDefinition[];
  applyLabel: string;
  availabilityLabel: string;
}

export default function ServiceGrid({ services, applyLabel, availabilityLabel }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service, index) => {
        const Icon = serviceIcons[service.type];
        return (
          <div key={service.id} className="corner-glow flex flex-col rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-start justify-between gap-4">
              <IconTile tone={toneCycle[index % toneCycle.length]}>
                <Icon className="size-6" aria-hidden="true" />
              </IconTile>
              <Badge variant={service.highlight === 'Most Popular' || service.highlight === 'Paling Popular' ? 'default' : 'secondary'}>
                {service.highlight}
              </Badge>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-foreground">{service.name}</h3>
            <p className="mt-1 text-sm text-foreground-muted">{service.tagline}</p>

            <div className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4 sm:grid-cols-3">
              <Stat value={`${service.rate}%`} label="p.a." />
              <Stat value={`RM${service.maxAmount}`} label="Max" />
              <Stat className="col-span-2 sm:col-span-1" value={service.tenure} label="Tenure" />
            </div>

            <ul className="mt-5 flex-1 space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-foreground-muted">
                  <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-xs text-foreground-subtle">{availabilityLabel}</span>
              <Button asChild>
                <LocaleLink href={PATHS.servicesApply(service.id)}>
                  {applyLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </LocaleLink>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
