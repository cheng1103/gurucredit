'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

const content = {
  en: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    goHome: 'Go Home',
    goBack: 'Go Back',
  },
  ms: {
    title: 'Halaman Tidak Dijumpai',
    description: 'Halaman yang anda cari tidak wujud atau telah dipindahkan.',
    goHome: 'Ke Utama',
    goBack: 'Kembali',
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="container max-w-lg">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <FileQuestion className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
            <p className="text-muted-foreground mb-6">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  {t.goHome}
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.goBack}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
