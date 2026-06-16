'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import {
  Menu,
  Phone,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Sparkles,
  CreditCard,
  Car,
  Home,
  Briefcase,
  Wallet,
  AlertCircle,
  FileCheck,
  Scale,
  BookOpen,
  FileText,
  Building2,
  HelpCircle,
  Shield,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { COMPANY } from '@/lib/constants';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage, localeHref, PATHS } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Navigation structure with dropdowns
const navContent = {
  en: {
    topBar: 'Licensed loan guidance | Quick eligibility review | WhatsApp support',
    whatsapp: 'WhatsApp Us',
    getStarted: 'Apply Now',
    needHelp: 'Need help? Call us at',
    nav: {
      home: 'Home',
      loans: {
        title: 'Loans',
        description: 'Find the right loan for your needs',
        items: [
          { href: '/loans/personal', label: 'Personal Loan', desc: 'Quick cash for any purpose', icon: CreditCard },
          { href: '/services/4/apply', label: 'Business Loan', desc: 'Grow your business', icon: Briefcase },
          { href: '/loans/debt-consolidation', label: 'Debt Consolidation', desc: 'Combine multiple debts', icon: Wallet },
          { href: '/loans/emergency', label: 'Emergency Loan', desc: 'Fast cash when you need it', icon: AlertCircle },
        ],
        viewAll: 'View All Loans',
      },
      tools: {
        title: 'Tools',
        description: 'Free calculators and tools',
        items: [
          { href: '/eligibility-test', label: 'Eligibility Test', desc: 'Check if you qualify', icon: FileCheck },
          { href: '/compare', label: 'Compare Loans', desc: 'Find the best rates', icon: Scale },
        ],
        viewAll: 'View All Tools',
      },
      resources: {
        title: 'Resources',
        description: 'Learn about loans',
        items: [
          { href: '/blog', label: 'Blog', desc: 'Tips and guides', icon: BookOpen },
          { href: '/loan-guides', label: 'Loan Guides', desc: 'Checklists and strategy', icon: BookOpen },
          { href: '/documents', label: 'Required Documents', desc: 'What you need to apply', icon: FileText },
          { href: '/glossary', label: 'Loan Glossary', desc: 'Understand loan terms', icon: HelpCircle },
          { href: '/partners', label: 'Bank Partners', desc: 'Our trusted partners', icon: Building2 },
          { href: '/verify-us', label: 'Verify Us', desc: 'Check office, process, and trust signals', icon: Shield },
        ],
      },
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
    },
  },
  ms: {
    topBar: 'Panduan pinjaman berlesen | Semakan kelayakan pantas | Sokongan WhatsApp',
    whatsapp: 'WhatsApp Kami',
    getStarted: 'Mohon Sekarang',
    needHelp: 'Perlukan bantuan? Hubungi kami di',
    nav: {
      home: 'Utama',
      loans: {
        title: 'Pinjaman',
        description: 'Cari pinjaman yang sesuai',
        items: [
          { href: '/loans/personal', label: 'Pinjaman Peribadi', desc: 'Wang tunai cepat', icon: CreditCard },
          { href: '/services/4/apply', label: 'Pinjaman Perniagaan', desc: 'Kembangkan perniagaan', icon: Briefcase },
          { href: '/loans/debt-consolidation', label: 'Penyatuan Hutang', desc: 'Gabungkan hutang', icon: Wallet },
          { href: '/loans/emergency', label: 'Pinjaman Kecemasan', desc: 'Wang tunai segera', icon: AlertCircle },
        ],
        viewAll: 'Lihat Semua Pinjaman',
      },
      tools: {
        title: 'Alat',
        description: 'Kalkulator dan alat percuma',
        items: [
          { href: '/eligibility-test', label: 'Ujian Kelayakan', desc: 'Semak kelayakan anda', icon: FileCheck },
          { href: '/compare', label: 'Bandingkan Pinjaman', desc: 'Cari kadar terbaik', icon: Scale },
        ],
        viewAll: 'Lihat Semua Alat',
      },
      resources: {
        title: 'Sumber',
        description: 'Belajar tentang pinjaman',
        items: [
          { href: '/blog', label: 'Blog', desc: 'Tips dan panduan', icon: BookOpen },
          { href: '/loan-guides', label: 'Panduan Pinjaman', desc: 'Senarai semak dan strategi', icon: BookOpen },
          { href: '/documents', label: 'Dokumen Diperlukan', desc: 'Apa yang perlu', icon: FileText },
          { href: '/glossary', label: 'Glosari Pinjaman', desc: 'Fahami terma pinjaman', icon: HelpCircle },
          { href: '/partners', label: 'Rakan Bank', desc: 'Rakan dipercayai', icon: Building2 },
          { href: '/verify-us', label: 'Sahkan Kami', desc: 'Semak pejabat, proses, dan isyarat kepercayaan', icon: Shield },
        ],
      },
      about: 'Tentang',
      faq: 'Soalan Lazim',
      contact: 'Hubungi',
    },
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();
  const t = navContent[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;
  const isActiveSection = (items: { href: string }[]) => items.some((item) => pathname === item.href);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-lg shadow-sm border-b'
          : 'bg-background'
      }`}
    >
      {/* Main navbar */}
      <div className="container flex h-16 lg:h-18 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={localeHref(language, "/")} className="transition-transform hover:scale-105">
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav with dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href={localeHref(language, "/")} className={navigationMenuTriggerStyle()}>
              {t.nav.home}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDesktopOpen('loans')}
              onMouseLeave={() => setDesktopOpen(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setDesktopOpen(desktopOpen === 'loans' ? null : 'loans')
                }
                aria-expanded={desktopOpen === 'loans'}
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActiveSection(t.nav.loans.items) && 'text-primary'
                )}
              >
                {t.nav.loans.title}
                <ChevronDown
                  className={cn(
                    'ml-1 h-3 w-3 transition-transform',
                    desktopOpen === 'loans' && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'absolute left-0 top-full mt-2 w-[420px] transition-all',
                  desktopOpen === 'loans'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                )}
              >
                <div className="rounded-xl border bg-popover text-popover-foreground shadow-lg p-4">
                  <div className="space-y-1">
                    {t.nav.loans.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={localeHref(language, item.href)}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors',
                            isActive(item.href) && 'bg-primary/5 text-primary'
                          )}
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <Link
                      href={localeHref(language, "/services")}
                      className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                    >
                      {t.nav.loans.viewAll}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setDesktopOpen('tools')}
              onMouseLeave={() => setDesktopOpen(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setDesktopOpen(desktopOpen === 'tools' ? null : 'tools')
                }
                aria-expanded={desktopOpen === 'tools'}
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActiveSection(t.nav.tools.items) && 'text-primary'
                )}
              >
                {t.nav.tools.title}
                <ChevronDown
                  className={cn(
                    'ml-1 h-3 w-3 transition-transform',
                    desktopOpen === 'tools' && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'absolute left-0 top-full mt-2 w-[420px] transition-all',
                  desktopOpen === 'tools'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                )}
              >
                <div className="rounded-xl border bg-popover text-popover-foreground shadow-lg p-4">
                  <div className="space-y-1">
                    {t.nav.tools.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={localeHref(language, item.href)}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors',
                            isActive(item.href) && 'bg-primary/5 text-primary'
                          )}
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <Link
                      href={localeHref(language, "/tools")}
                      className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                    >
                      {t.nav.tools.viewAll}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setDesktopOpen('resources')}
              onMouseLeave={() => setDesktopOpen(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setDesktopOpen(
                    desktopOpen === 'resources' ? null : 'resources'
                  )
                }
                aria-expanded={desktopOpen === 'resources'}
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActiveSection(t.nav.resources.items) && 'text-primary'
                )}
              >
                {t.nav.resources.title}
                <ChevronDown
                  className={cn(
                    'ml-1 h-3 w-3 transition-transform',
                    desktopOpen === 'resources' && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'absolute left-0 top-full mt-2 w-[360px] transition-all',
                  desktopOpen === 'resources'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                )}
              >
                <div className="rounded-xl border bg-popover text-popover-foreground shadow-lg p-4">
                  <div className="space-y-1">
                    {t.nav.resources.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={localeHref(language, item.href)}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors',
                            isActive(item.href) && 'bg-primary/5 text-primary'
                          )}
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={localeHref(language, "/about")}
              className={cn(
                navigationMenuTriggerStyle(),
                isActive('/about') && 'text-primary'
              )}
            >
              {t.nav.about}
            </Link>
            <Link
              href={localeHref(language, "/faq")}
              className={cn(
                navigationMenuTriggerStyle(),
                isActive('/faq') && 'text-primary'
              )}
            >
              {t.nav.faq}
            </Link>
            <Link
              href={localeHref(language, "/contact")}
              className={cn(
                navigationMenuTriggerStyle(),
                isActive('/contact') && 'text-primary'
              )}
            >
              {t.nav.contact}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild className="font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all">
              <Link href={localeHref(language, "/eligibility-test")}>
                <Sparkles className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {t.getStarted}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10" aria-label={language === 'ms' ? 'Buka menu' : 'Open menu'}>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Logo size="sm" />
                </div>
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {/* Home */}
                    <Link
                      href={localeHref(language, "/")}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all',
                        isActive('/')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {t.nav.home}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>

                    {/* Loans Section */}
                    <div>
                      <button
                        onClick={() => toggleSection('loans')}
                        aria-expanded={expandedSection === 'loans'}
                        aria-label={`${t.nav.loans.title} menu`}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                          isActiveSection(t.nav.loans.items)
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                      >
                        {t.nav.loans.title}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSection === 'loans' && 'rotate-180'
                          )}
                        />
                      </button>
                      {expandedSection === 'loans' && (
                        <div className="ml-4 mt-1 space-y-1">
                          {t.nav.loans.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={localeHref(language, item.href)}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all',
                                  isActive(item.href)
                                    ? 'text-primary bg-primary/5'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Tools Section */}
                    <div>
                      <button
                        onClick={() => toggleSection('tools')}
                        aria-expanded={expandedSection === 'tools'}
                        aria-label={`${t.nav.tools.title} menu`}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                          isActiveSection(t.nav.tools.items)
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                      >
                        {t.nav.tools.title}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSection === 'tools' && 'rotate-180'
                          )}
                        />
                      </button>
                      {expandedSection === 'tools' && (
                        <div className="ml-4 mt-1 space-y-1">
                          <Link
                            href={localeHref(language, "/tools")}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all text-primary/90 hover:text-primary hover:bg-muted/50"
                          >
                            <FileCheck className="h-4 w-4" />
                            {t.nav.tools.viewAll}
                          </Link>
                          {t.nav.tools.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={localeHref(language, item.href)}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all',
                                  isActive(item.href)
                                    ? 'text-primary bg-primary/5'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Resources Section */}
                    <div>
                      <button
                        onClick={() => toggleSection('resources')}
                        aria-expanded={expandedSection === 'resources'}
                        aria-label={`${t.nav.resources.title} menu`}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                          isActiveSection(t.nav.resources.items)
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                      >
                        {t.nav.resources.title}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSection === 'resources' && 'rotate-180'
                          )}
                        />
                      </button>
                      {expandedSection === 'resources' && (
                        <div className="ml-4 mt-1 space-y-1">
                          {t.nav.resources.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={localeHref(language, item.href)}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                  'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all',
                                  isActive(item.href)
                                    ? 'text-primary bg-primary/5'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* About */}
                    <Link
                      href={localeHref(language, "/about")}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all',
                        isActive('/about')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {t.nav.about}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>

                    {/* FAQ */}
                    <Link
                      href={localeHref(language, "/faq")}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all',
                        isActive('/faq')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {t.nav.faq}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>

                    {/* Contact */}
                    <Link
                      href={localeHref(language, "/contact")}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all',
                        isActive('/contact')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {t.nav.contact}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>
                  </div>
                </nav>
                <div className="p-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => {
                      setMobileOpen(false);
                      if (typeof window === 'undefined') return;
                      const popup = window.open(
                        COMPANY.whatsappLink,
                        '_blank',
                        'noopener,noreferrer',
                      );
                      if (!popup) {
                        window.location.href = COMPANY.whatsappLink;
                      }
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button asChild className="w-full justify-center font-semibold">
                    <Link href={localeHref(language, "/eligibility-test")} onClick={() => setMobileOpen(false)}>
                      <Sparkles className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      {t.getStarted}
                    </Link>
                  </Button>
                </div>
                <div className="p-4 bg-muted/30 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    {t.needHelp}<br />
                    <a href={COMPANY.phoneLink} className="text-primary font-medium">
                      {COMPANY.phone}
                    </a>
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
