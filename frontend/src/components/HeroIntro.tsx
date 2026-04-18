'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.7, 0.2, 1] as const } },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export function HeroIntro({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroStep({
  children,
  variant = 'rise',
}: {
  children: ReactNode;
  variant?: 'rise' | 'fade';
}) {
  return <motion.div variants={variant === 'rise' ? rise : fade}>{children}</motion.div>;
}
