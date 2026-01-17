'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Route } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { SERVICE_AREAS } from '@/lib/constants';
import { useState } from 'react';

const content = {
  en: {
    badge: 'Local Expertise',
    title: 'Areas We Serve Across Malaysia',
    subtitle:
      'From Central Malaysia to Penang, Johor, Sabah, and Sarawak, our consultants support borrowers nationwide with bank-ready guidance and fast WhatsApp follow-up.',
    neighborhoods: [
      {
        title: 'Central Malaysia (KL & Selangor)',
        shortCode: 'KL',
        description: 'Damansara, Bangsar, Mont Kiara, PJ, Shah Alam, Subang, Klang',
        stat: 'Fast SLA with in-person partner coverage',
      },
      {
        title: 'Northern Corridor',
        shortCode: 'NORTH',
        description: 'Penang, Kedah, Perak, Perlis',
        stat: 'Regional bank partners for fast analysis',
      },
      {
        title: 'Southern Corridor',
        shortCode: 'SOUTH',
        description: 'Johor, Melaka, Negeri Sembilan',
        stat: 'Specialized guidance for SME and salaried profiles',
      },
      {
        title: 'East Malaysia',
        shortCode: 'EM',
        description: 'Sabah & Sarawak (Kota Kinabalu, Kuching, Miri, Sibu)',
        stat: 'Remote processing with WhatsApp-first support',
      },
    ],
    note: 'Not listed? We still accept applications from all Malaysian states via WhatsApp.',
  },
  ms: {
    badge: 'Kepakaran Tempatan',
    title: 'Kawasan Liputan Seluruh Malaysia',
    subtitle:
      'Daripada Wilayah Tengah ke Pulau Pinang, Johor, Sabah dan Sarawak, perunding kami menyokong pemohon di seluruh negara dengan panduan bank dan susulan pantas melalui WhatsApp.',
    neighborhoods: [
      {
        title: 'Wilayah Tengah (KL & Selangor)',
        shortCode: 'KL',
        description: 'Damansara, Bangsar, Mont Kiara, PJ, Shah Alam, Subang, Klang',
        stat: 'SLA pantas dengan liputan rakan bank',
      },
      {
        title: 'Koridor Utara',
        shortCode: 'UTARA',
        description: 'Pulau Pinang, Kedah, Perak, Perlis',
        stat: 'Rakan bank wilayah untuk analisis pantas',
      },
      {
        title: 'Koridor Selatan',
        shortCode: 'SEL',
        description: 'Johor, Melaka, Negeri Sembilan',
        stat: 'Panduan khusus untuk PKS dan pemohon bergaji',
      },
      {
        title: 'Malaysia Timur',
        shortCode: 'TIMUR',
        description: 'Sabah & Sarawak (Kota Kinabalu, Kuching, Miri, Sibu)',
        stat: 'Proses jarak jauh dengan sokongan WhatsApp',
      },
    ],
    note: 'Tidak tersenarai? Kami masih menerima permohonan dari semua negeri melalui WhatsApp.',
  },
};

export function AreasWeServe() {
  const { language } = useLanguage();
  const t = content[language];
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <Badge variant="outline" className="mb-4 px-4 py-1.5">{t.badge}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-muted-foreground mb-6">{t.subtitle}</p>

            <div className="space-y-4">
              {t.neighborhoods.map((area, index) => (
                <Card key={area.title} className="border-primary/15">
                  <CardContent className="py-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {area.title}
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">
                            {area.shortCode}
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground">{area.description}</p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-primary flex items-center gap-2">
                          <Route className="h-4 w-4" />
                          {area.stat}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">{t.note}</p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border bg-background relative">
            <div className="aspect-[4/3] bg-muted relative">
              <iframe
                title="Malaysia coverage map"
                src="https://maps.google.com/maps?q=Malaysia&z=5&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-primary/10 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      {language === 'en' ? 'Coverage preview' : 'Pratonton liputan'}
                    </p>
                    <h3 className="text-lg font-semibold">
                      {language === 'en' ? 'Malaysia Coverage' : 'Liputan Malaysia'}
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {t.neighborhoods.map((area) => (
                      <div key={area.title} className="flex items-start gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">{area.title}</div>
                          <div className="text-xs text-muted-foreground">{area.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 text-sm text-muted-foreground">
              {language === 'en'
                ? 'Map highlights our Malaysia-wide coverage. Pins are illustrative and not exact branch locations.'
                : 'Peta menunjukkan liputan seluruh Malaysia. Lokasi pin adalah ilustrasi dan bukan alamat cawangan.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
