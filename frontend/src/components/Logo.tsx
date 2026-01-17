'use client';

import Image from 'next/image';
import { COMPANY } from '@/lib/constants';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  showSlogan?: boolean;
  sloganLang?: 'en' | 'ms' | 'both';
}

// Slogans
export const slogans = {
  en: 'Credit Made Simple',
  ms: 'Kredit Mudah, Hidup Lebih Tenang',
};

const sizes = {
  sm: { icon: 32, text: 'text-lg', slogan: 'text-[10px]' },
  md: { icon: 40, text: 'text-xl', slogan: 'text-xs' },
  lg: { icon: 56, text: 'text-3xl', slogan: 'text-sm' },
};

export function Logo({ size = 'md', variant = 'full', showSlogan = false, sloganLang = 'en' }: LogoProps) {
  const { icon, text, slogan } = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <Image
        src={COMPANY.logo}
        alt={`${COMPANY.name} logo`}
        width={icon}
        height={icon}
        className="rounded-lg object-contain"
        priority={size === 'lg'}
      />

      {variant === 'full' && (
        <div className="flex flex-col">
          <span className={`font-bold ${text} text-primary leading-none`}>
            GURU
          </span>
          <span className="text-xs text-muted-foreground tracking-widest">
            CREDITS
          </span>
          {showSlogan && (
            <div className={`${slogan} text-muted-foreground mt-1`}>
              {sloganLang === 'both' ? (
                <>
                  <span className="block">{slogans.en}</span>
                  <span className="block italic">{slogans.ms}</span>
                </>
              ) : (
                <span>{slogans[sloganLang]}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
