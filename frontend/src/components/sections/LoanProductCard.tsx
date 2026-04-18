'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileSearch, Building2, Calculator } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type LoanIconKey = 'fileSearch' | 'building2' | 'calculator';

const ICONS: Record<LoanIconKey, LucideIcon> = {
  fileSearch: FileSearch,
  building2: Building2,
  calculator: Calculator,
};

type Props = {
  title: string;
  description: string;
  image: string;
  iconKey: LoanIconKey;
  gradient: string;
};

export function LoanProductCard({ title, description, image, iconKey, gradient }: Props) {
  const Icon = ICONS[iconKey];
  return (
    <motion.div
      whileHover={{ rotateY: 4, rotateX: -2, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group h-full"
    >
      <Card className="card-hover border-0 shadow-lg hover:shadow-2xl transition-shadow overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[4/3] min-h-[160px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div
            className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        <CardContent className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
