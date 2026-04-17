import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { HomeContent } from '@/lib/content/home';

export function ResourcesSection({ t }: { t: HomeContent }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            {t.resources.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">{t.resources.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.resources.items.map((item, index) => (
            <Card key={index} className="flex flex-col shadow-lg border border-muted">
              <CardContent className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.tool}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{item.description}</p>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href={item.toolLink}>
                      {t.resources.openTool}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link href={item.guideLink}>
                      {item.guide}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
