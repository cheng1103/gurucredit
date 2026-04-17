import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Award, Shield, Clock, Star, Building2 } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';

const whyUsIcons = [Award, Shield, Clock, Star, Building2];

export function WhyUsSection({ t }: { t: HomeContent }) {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36%200V4h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Badge className="bg-white/20 text-white border-0 mb-6">{t.whyUs.badge}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">{t.whyUs.title}</h2>
            <ul className="space-y-5">
              {t.whyUs.items.map((item, index) => {
                const Icon = whyUsIcons[index];
                return (
                  <li key={index} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/2]">
              <Image
                src="/images/team.jpg"
                alt="GURU Credits Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-4">
                  {t.whyUs.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3"
                    >
                      <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                      <div className="text-xs opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
