'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, FileText, Search, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type IconKey = 'fileText' | 'search' | 'checkCircle';

const ICONS: Record<IconKey, LucideIcon> = {
  fileText: FileText,
  search: Search,
  checkCircle: CheckCircle,
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  time: string;
  iconKey: IconKey;
};

export function ProcessTimelineSteps({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.18 } },
      }}
    >
      {steps.map((step, index) => {
        const Icon = ICONS[step.iconKey];
        return (
          <motion.div
            key={index}
            className="relative"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] },
              },
            }}
          >
            <Card className="h-full border-2 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mx-auto mb-6 mt-4 group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {step.time}
                </Badge>
              </CardContent>
            </Card>

            {index < steps.length - 1 && (
              <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                <div className="w-8 h-8 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
