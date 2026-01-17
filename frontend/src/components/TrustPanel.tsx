import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

interface TrustItem {
  title: string;
  description: string;
}

interface TrustPanelProps {
  title: string;
  description: string;
  items: TrustItem[];
}

export function TrustPanel({ title, description, items }: TrustPanelProps) {
  return (
    <Card className="surface-card border-primary/15">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl border border-primary/10 bg-white/70 p-4">
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
