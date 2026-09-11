'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, MessageCircle, Phone, Wallet, Building2, Layers, Zap, MapPin, type LucideIcon } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LocaleLink } from '@/components/LocaleLink';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { localeHref, PATHS } from '@/lib/i18n/routes';
import { cn } from '@/lib/utils';

type Item = { label: string; desc?: string; href: string; icon?: LucideIcon };

const content = {
  en: {
    loans: 'Loans',
    loanItems: [
      { label: 'Personal Loan', desc: 'Up to RM100,000 · 1–7 years', href: PATHS.loans.personal, icon: Wallet },
      { label: 'Business Loan', desc: 'Working capital for SMEs', href: PATHS.services, icon: Building2 },
      { label: 'Debt Consolidation', desc: 'One payment, lower DSR', href: PATHS.loans.debtConsolidation, icon: Layers },
      { label: 'Emergency Loan', desc: 'Fast turnaround, documents ready', href: PATHS.loans.emergency, icon: Zap },
    ] as Item[],
    byState: { label: 'Loans by state', href: PATHS.serviceAreas, icon: MapPin } as Item,
    links: [
      { label: 'Guides', href: PATHS.loanGuides },
      { label: 'Tools', href: PATHS.tools },
      { label: 'About', href: PATHS.about },
    ] as Item[],
    more: [
      { label: 'FAQ', href: PATHS.faq },
      { label: 'Contact', href: PATHS.contact },
      { label: 'Verify us', href: PATHS.verifyUs },
    ] as Item[],
    apply: 'Apply Now',
    whatsapp: 'WhatsApp',
    openMenu: 'Open menu',
    menuTitle: 'Menu',
    callUs: 'Call us',
  },
  ms: {
    loans: 'Pinjaman',
    loanItems: [
      { label: 'Pinjaman Peribadi', desc: 'Sehingga RM100,000 · 1–7 tahun', href: PATHS.loans.personal, icon: Wallet },
      { label: 'Pinjaman Perniagaan', desc: 'Modal kerja untuk PKS', href: PATHS.services, icon: Building2 },
      { label: 'Penyatuan Hutang', desc: 'Satu bayaran, DSR lebih rendah', href: PATHS.loans.debtConsolidation, icon: Layers },
      { label: 'Pinjaman Kecemasan', desc: 'Pantas bila dokumen lengkap', href: PATHS.loans.emergency, icon: Zap },
    ] as Item[],
    byState: { label: 'Pinjaman ikut negeri', href: PATHS.serviceAreas, icon: MapPin } as Item,
    links: [
      { label: 'Panduan', href: PATHS.loanGuides },
      { label: 'Alat', href: PATHS.tools },
      { label: 'Tentang', href: PATHS.about },
    ] as Item[],
    more: [
      { label: 'Soalan Lazim', href: PATHS.faq },
      { label: 'Hubungi', href: PATHS.contact },
      { label: 'Sahkan kami', href: PATHS.verifyUs },
    ] as Item[],
    apply: 'Apply Now',
    whatsapp: 'WhatsApp',
    openMenu: 'Buka menu',
    menuTitle: 'Menu',
    callUs: 'Hubungi kami',
  },
} as const;

export function Navbar() {
  const { language } = useLanguage();
  const pathname = usePathname() ?? '/';
  const t = content[language];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === localeHref(language, href);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 transition-[background-color,box-shadow,border-color] duration-200',
        scrolled ? 'border-b border-border bg-surface/85 backdrop-blur' : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container flex h-full items-center justify-between gap-6">
        <LocaleLink href={PATHS.home} aria-label={COMPANY.name}>
          <Logo />
        </LocaleLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-sm font-medium text-foreground-muted hover:text-foreground">
                {t.loans}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 rounded-xl border-border p-2 shadow-float">
              {t.loanItems.map((item) => {
                const Icon = item.icon ?? Wallet;
                return (
                  <DropdownMenuItem key={item.href} asChild className="rounded-lg p-2.5">
                    <LocaleLink href={item.href} className="flex items-start gap-3">
                      <Icon className="mt-0.5 size-4 text-primary" />
                      <span className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <span className="text-xs text-foreground-subtle">{item.desc}</span>
                      </span>
                    </LocaleLink>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="rounded-lg p-2.5">
                <LocaleLink href={t.byState.href} className="flex items-center gap-3 text-sm font-medium">
                  <MapPin className="size-4 text-primary" />
                  {t.byState.label}
                </LocaleLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {t.links.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-alt hover:text-foreground',
                isActive(item.href) ? 'text-foreground' : 'text-foreground-muted',
              )}
            >
              {item.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="outline" size="icon-sm" asChild className="hidden lg:inline-flex">
            <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp}>
              <MessageCircle className="size-4" />
            </a>
          </Button>
          <Button size="sm" asChild className="hidden lg:inline-flex">
            <LocaleLink href={PATHS.eligibilityTest}>{t.apply}</LocaleLink>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label={t.openMenu}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l-0 bg-surface p-0" aria-describedby={undefined}>
              <SheetTitle className="sr-only">{t.menuTitle}</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-border px-6 py-4">
                  <Logo />
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                  <p className="eyebrow px-3 pb-2">{t.loans}</p>
                  {[...t.loanItems, t.byState].map((item) => (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-surface-alt"
                    >
                      {item.label}
                    </LocaleLink>
                  ))}
                  <div className="my-3 border-t border-border" />
                  {[...t.links, ...t.more].map((item) => (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      className="flex items-center rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-surface-alt"
                    >
                      {item.label}
                    </LocaleLink>
                  ))}
                </nav>
                <div className="grid gap-3 border-t border-border p-4">
                  <Button asChild size="lg">
                    <LocaleLink href={PATHS.eligibilityTest}>{t.apply}</LocaleLink>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" />
                      {t.whatsapp}
                    </a>
                  </Button>
                  <a href={COMPANY.phoneLink} className="inline-flex items-center justify-center gap-2 py-1 text-sm text-foreground-muted">
                    <Phone className="size-4" />
                    {t.callUs} {COMPANY.phone}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
