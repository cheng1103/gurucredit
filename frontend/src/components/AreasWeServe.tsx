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
    title: 'Areas We Serve in Kuala Lumpur & Selangor',
    subtitle:
      'From Damansara Heights and Bangsar to Petaling Jaya, Shah Alam, and Klang, our consultants cover every major Klang Valley district with on-ground lender relationships.',
    neighborhoods: [
      {
        title: 'Kuala Lumpur Core',
        description: 'Damansara Heights, Bangsar South, Mont Kiara, Cheras, Setapak',
        stat: '24h eligibility report for city-centre applicants',
      },
      {
        title: 'Petaling Jaya & Damansara',
        description: 'PJ Old Town, Mutiara Damansara, Kota Damansara, Tropicana, Ara Damansara',
        stat: 'Bank partner walk-ins around PJ Utara + Selatan',
      },
      {
        title: 'Shah Alam, Subang & Klang',
        description: 'Shah Alam Seksyen 7-26, Subang Jaya, Bukit Jelutong, Klang South',
        stat: 'Dedicated slots for factory & SME owners',
      },
    ],
    note: 'Not in the list? As long as you reside in Kuala Lumpur or Selangor (Klang Valley), we can still process your case via WhatsApp.',
  },
  ms: {
    badge: 'Kepakaran Tempatan',
    title: 'Kawasan Liputan Kuala Lumpur & Selangor',
    subtitle:
      'Daripada Damansara Heights dan Bangsar hingga Petaling Jaya, Shah Alam dan Klang, perunding kami merangkumi setiap kawasan utama Lembah Klang dengan hubungan bank setempat.',
    neighborhoods: [
      {
        title: 'Teras Kuala Lumpur',
        description: 'Damansara Heights, Bangsar South, Mont Kiara, Cheras, Setapak',
        stat: 'Laporan kelayakan 24 jam untuk pemohon bandar',
      },
      {
        title: 'Petaling Jaya & Damansara',
        description: 'PJ Old Town, Mutiara Damansara, Kota Damansara, Tropicana, Ara Damansara',
        stat: 'Akses terus ke rakan bank sekitar PJ Utara & Selatan',
      },
      {
        title: 'Shah Alam, Subang & Klang',
        description: 'Shah Alam Seksyen 7-26, Subang Jaya, Bukit Jelutong, Klang Selatan',
        stat: 'Slot khas untuk pemilik kilang & PKS',
      },
    ],
    note: 'Tidak tersenarai? Jika anda menetap di Kuala Lumpur atau Selangor (Lembah Klang), kami masih boleh proses kes anda melalui WhatsApp.',
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
                            {SERVICE_AREAS[index]?.shortName || 'KL'}
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
                title="Klang Valley coverage map"
                src="https://maps.google.com/maps?q=Kuala%20Lumpur&z=11&output=embed"
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
                      {language === 'en' ? 'Klang Valley Focus' : 'Fokus Lembah Klang'}
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
                ? 'Map highlights our Klang Valley coverage. Pins are illustrative and not exact branch locations.'
                : 'Peta menunjukkan liputan Lembah Klang kami. Lokasi pin adalah ilustrasi dan bukan alamat cawangan.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
