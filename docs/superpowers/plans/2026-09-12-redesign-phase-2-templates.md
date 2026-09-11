# Redesign Phase 2: Page Templates T2–T7, Consolidation, Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate every non-home route onto six shared page templates built from the Phase 1 primitives, merge the duplicate comparison tool, delete all legacy CSS classes and orphaned code, and verify the whole site (unit, e2e, screenshots, Lighthouse).

**Architecture:** Phase 1 left tokens, `components/ui/*`, `components/layout/*` (Container, Section, SectionHeader, Reveal, Stat, WhatsAppFab, StickyMobileCTA), the chrome and the homepage. Phase 2 adds template primitives (`PageHeader`, `Breadcrumbs`, `Prose`, `TableOfContents`, `FilterBar`, `EmptyState`, `AsideCta`, `ClosingCta`, `ArticleLayout`) and then rewrites each route file to compose them, moving inline bilingual copy into `src/lib/content/**`. Legacy utility classes (`surface-card`, `hero-grid`, `btn-gradient`, `gradient-text`, `card-hover`, `section-accent-top`) are removed from source as each route migrates; the final cleanup task asserts zero occurrences.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4 CSS-first, shadcn/Radix, react-markdown, framer-motion 12, vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-11-frontend-redesign-design.md` (§4 primitives, §5 templates, §7 copy, §8 cleanup, §9 steps 5–8, §10 acceptance). Phase 1 plan for context: `docs/superpowers/plans/2026-09-11-redesign-phase-1-foundation-home.md`.

## Global Constraints

- Work only inside `frontend/` (plus `docs/` for spec edits). Run every command from `/Users/User/project/hugo/frontend`. Branch `redesign/phase-1` (Phase 2 continues on it).
- No dark mode: no `.dark`, no `dark:` variants in new or migrated code. (`@custom-variant dark (&:is(.dark *));` stays in `globals.css` until Task 11 removes the last `dark:`; Task 11 then deletes the line.)
- Single accent `#2563eb`; success green only for approved/positive states; amber only for warnings. No gold, no gradients on text or buttons, no `hero-grid`/`surface-card`/`btn-gradient`/`gradient-text`/`card-hover`/`section-accent-top` in any file you touch — replace them as described in each task.
- Vertical rhythm only via `<Section>`; never `py-*` on a raw `<section>`. Width via `<Container>` (`default` 1120 / `prose` 680 / `wide` 1280).
- Internal links via `LocaleLink` (client) or `localeHref(language, path)` (server). Paths from `PATHS` in `@/lib/i18n/routes`.
- Copy lives in `{ en, ms }` objects under `src/lib/content/**` (or the existing `lib/*-data.ts` modules), never inline JSX strings. Both languages always populated. Malay must be natural (no untranslated English, no imperative where past tense is meant).
- SEO skeleton untouched: every route's `metadata`/`generateMetadata`, canonical/hreflang, JSON-LD components and their props, URLs, sitemap entries (except `/compare`, removed in Task 8). H1 keeps the route's target keyword (e.g. "Personal Loan", "CCRIS", "DSR", region name).
- e2e-locked strings/ids: nav `Apply Now`; `/services` heading exactly `Select a Loan Product` and text `Personal Loan`; apply form `#serviceArea` `<select>`, labels `Monthly Net Income`, `Desired Loan Amount`, `Full Name`, `Phone Number`, `Email Address`, buttons `Next`, `Employed`, `Submit Application`; success page heading contains `Application Submitted`, first `<code>` = reference; status page keeps the reference hint `<code>`s.
- Unit-test-locked strings in `PreApprovalCalculator` unchanged.
- No `eslint-disable`. Lint forbids setState in effects (use the "adjust state during render" pattern or `requestAnimationFrame`) and unescaped `"`/`'` in JSX (use `&ldquo;`/`&rdquo;`/`&apos;`).
- Every task ends with `npx tsc --noEmit && npm run lint && npx vitest run` green and a commit whose message ends with:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01SbKGsyUx1JzunHf6L7UNfd
  ```
- Migration tasks additionally run the route smoke e2e for the routes they touched (`PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npx playwright test e2e/smoke.spec.ts --project=chromium -g "<route>"` against `npm run build && npm run start`) and capture 390/1280 screenshots of one representative route into the SDD workspace for the reviewer.

---

## File Map

| Path | Responsibility |
|---|---|
| `src/components/layout/Breadcrumbs.tsx` | Replaces `src/components/Breadcrumbs.tsx`; LocaleLink items + optional JSON-LD. |
| `src/components/layout/PageHeader.tsx` | Non-home page head: breadcrumbs, eyebrow, h1, lede, meta, actions. |
| `src/components/layout/Prose.tsx` + `.prose` rules in `globals.css` | Long-form typography. |
| `src/components/layout/TableOfContents.tsx` | Client; builds nested list from `h2/h3` inside a container; active highlight. |
| `src/components/layout/FilterBar.tsx` | Client; sticky search + category chips. |
| `src/components/layout/EmptyState.tsx` | List empty state. |
| `src/components/layout/AsideCta.tsx` | Small sticky CTA card (eligibility + WhatsApp), bilingual. |
| `src/components/layout/ClosingCta.tsx` | Inverse closing band for every non-home page, bilingual, overridable copy. |
| `src/components/layout/ArticleLayout.tsx` | T2 skeleton: PageHeader → 2-col (Prose + aside TOC/CTA) → footer slot → ClosingCta. |
| `src/components/layout/index.ts` | Re-exports everything above. |
| `src/lib/content/**` | New per-route copy modules (guides, legal, listings, loans, tools, forms, about). |
| `src/components/blog/BlogArticle.tsx` | T2 blog post (replaces `BlogPostClient.tsx`). |
| `src/components/guides/GuideArticle.tsx` | T2 structured guide renderer (topics + 5 static guides + 2 editorial pages). |
| `src/components/loans/LoanProductPage.tsx` | T1 product page renderer for 3 loans. |
| `src/components/legal/LegalPage.tsx` | T7 renderer. |
| `src/components/apply/*` | T6 apply wizard split. |
| `src/app/**/page.tsx` | Thin route files: metadata + data + render. |

---

### Task 1: Template primitives

**Files:**
- Create: `src/components/layout/Breadcrumbs.tsx`, `PageHeader.tsx`, `Prose.tsx`, `TableOfContents.tsx`, `FilterBar.tsx`, `EmptyState.tsx`, `AsideCta.tsx`, `ClosingCta.tsx`, `ArticleLayout.tsx`
- Modify: `src/components/layout/index.ts`, `src/app/globals.css` (append `.prose` rules)
- Delete: `src/components/Breadcrumbs.tsx` (unreferenced)
- Test: `src/components/layout/__tests__/templates.test.tsx`

**Interfaces (produces):**
```ts
Breadcrumbs({ items: { label: string; href?: string }[]; className?: string; jsonLd?: boolean })
PageHeader({ breadcrumbs?: BreadcrumbItem[]; eyebrow?: string; title: ReactNode; lede?: string; meta?: ReactNode; actions?: ReactNode; align?: 'left'|'center'; size?: 'default'|'prose'|'wide'; children?: ReactNode })
Prose({ children: ReactNode; className?: string; id?: string })          // renders <div class="prose">
TableOfContents({ containerId: string; title: string; className?: string })  // client
FilterBar({ query: string; onQueryChange(q: string): void; placeholder: string; categories: { id: string; label: string }[]; active: string; onSelect(id: string): void; className?: string })  // client
EmptyState({ title: string; description?: string; action?: ReactNode })
AsideCta({ language: Language; className?: string })
ClosingCta({ language: Language; title?: string; lede?: string; primaryHref?: string; primaryLabel?: string })
ArticleLayout({ language: Language; breadcrumbs: BreadcrumbItem[]; eyebrow?: string; title: ReactNode; lede?: string; meta?: ReactNode; children: ReactNode; aside?: ReactNode; footer?: ReactNode; closing?: boolean })
```
`BreadcrumbItem` is exported from `Breadcrumbs.tsx`. `slugifyHeading(text: string): string` is exported from `TableOfContents.tsx` for renderers that must assign heading ids.

- [ ] **Step 1: Write the failing test**

Create `src/components/layout/__tests__/templates.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));

import { Breadcrumbs, PageHeader, Prose, EmptyState, FilterBar, AsideCta, ClosingCta, ArticleLayout } from '..';
import { slugifyHeading } from '../TableOfContents';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('template primitives', () => {
  it('Breadcrumbs renders links for all but the last item', () => {
    wrap(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Post' }]} />);
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
    expect(screen.queryByRole('link', { name: 'Post' })).toBeNull();
    expect(screen.getByText('Post')).toHaveAttribute('aria-current', 'page');
  });

  it('PageHeader renders eyebrow, h1, lede and breadcrumbs', () => {
    wrap(<PageHeader breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} eyebrow="Help" title="Common questions" lede="Answers." />);
    expect(screen.getByRole('heading', { level: 1, name: 'Common questions' })).toBeInTheDocument();
    expect(screen.getByText('Help')).toHaveClass('eyebrow');
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('Prose applies the prose class', () => {
    const { container } = render(<Prose id="body"><p>x</p></Prose>);
    expect(container.querySelector('#body')).toHaveClass('prose');
  });

  it('EmptyState renders title and action', () => {
    render(<EmptyState title="Nothing" description="Try again" action={<button>Reset</button>} />);
    expect(screen.getByText('Nothing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('FilterBar wires search and chips', () => {
    const onQuery = vi.fn();
    const onSelect = vi.fn();
    render(
      <FilterBar query="" onQueryChange={onQuery} placeholder="Search" categories={[{ id: 'all', label: 'All' }, { id: 'tips', label: 'Tips' }]} active="all" onSelect={onSelect} />,
    );
    screen.getByRole('button', { name: 'Tips' }).click();
    expect(onSelect).toHaveBeenCalledWith('tips');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('AsideCta and ClosingCta link to the eligibility test', () => {
    wrap(<><AsideCta language="en" /><ClosingCta language="en" /></>);
    const links = screen.getAllByRole('link', { name: /Check eligibility|Start the 2-minute check/i });
    expect(links.length).toBeGreaterThanOrEqual(2);
    expect(links[0]).toHaveAttribute('href', '/eligibility-test');
  });

  it('ArticleLayout renders header, body, aside and closing band', () => {
    const { container } = wrap(
      <ArticleLayout language="en" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Guide' }]} title="Guide title" lede="Lede">
        <h2>Section one</h2>
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Guide title' })).toBeInTheDocument();
    expect(container.querySelector('#article-body.prose')).not.toBeNull();
    expect(container.querySelector('aside')).not.toBeNull();
    expect(container.querySelector('section#closing-cta')).not.toBeNull();
  });

  it('slugifyHeading produces stable ids', () => {
    expect(slugifyHeading('What is DSR? (Debt Service Ratio)')).toBe('what-is-dsr-debt-service-ratio');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/layout/__tests__/templates.test.tsx`
Expected: FAIL — modules not exported from `..`.

- [ ] **Step 3: Create the components**

`src/components/layout/Breadcrumbs.tsx`:
```tsx
import { ChevronRight } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';
import { cn } from '@/lib/utils';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items, className, jsonLd = false }: { items: BreadcrumbItem[]; className?: string; jsonLd?: boolean }) {
  return (
    <>
      {jsonLd ? (
        <BreadcrumbJsonLd items={items.map((item) => ({ name: item.label, url: new URL(item.href ?? '/', SEO.url).toString() }))} />
      ) : null}
      <nav aria-label="Breadcrumb" className={cn('text-xs text-foreground-subtle', className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? <ChevronRight className="size-3" aria-hidden="true" /> : null}
                {item.href && !isLast ? (
                  <LocaleLink href={item.href} className="transition-colors hover:text-foreground">{item.label}</LocaleLink>
                ) : (
                  <span className={cn(isLast && 'font-medium text-foreground')} aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
```

`src/components/layout/PageHeader.tsx`:
```tsx
import type { ReactNode } from 'react';
import { Container } from './Container';
import { Section } from './Section';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { cn } from '@/lib/utils';

export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  lede,
  meta,
  actions,
  align = 'left',
  size = 'default',
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  align?: 'left' | 'center';
  size?: 'default' | 'prose' | 'wide';
  children?: ReactNode;
}) {
  const centered = align === 'center';
  return (
    <Section compact className="border-b border-border bg-background">
      <Container size={size} className={cn(centered && 'text-center')}>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} jsonLd className={cn('mb-6', centered && 'justify-center [&_ol]:justify-center')} /> : null}
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className={cn('text-[34px] lg:text-5xl', centered && 'mx-auto max-w-3xl')}>{title}</h1>
        {lede ? <p className={cn('mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted', centered && 'mx-auto')}>{lede}</p> : null}
        {meta ? <div className={cn('mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-subtle', centered && 'justify-center')}>{meta}</div> : null}
        {actions ? <div className={cn('mt-6 flex flex-col gap-3 sm:flex-row', centered && 'sm:justify-center')}>{actions}</div> : null}
        {children}
      </Container>
    </Section>
  );
}
```

`src/components/layout/Prose.tsx`:
```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Prose({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={cn('prose', className)}>
      {children}
    </div>
  );
}
```

Append to `src/app/globals.css` (after the `.container` block):
```css
/* Long-form typography (T2/T7) */
.prose { max-width: 680px; color: var(--foreground-muted); font-size: 1.0625rem; line-height: 1.7; }
.prose > * + * { margin-top: 1.25em; }
.prose h2 { margin-top: 2.5em; margin-bottom: 0.6em; font-size: 1.625rem; color: var(--foreground); scroll-margin-top: 6rem; }
.prose h3 { margin-top: 1.8em; margin-bottom: 0.4em; font-size: 1.25rem; color: var(--foreground); scroll-margin-top: 6rem; }
.prose h2:first-child, .prose h3:first-child { margin-top: 0; }
.prose p { margin: 0; }
.prose strong { color: var(--foreground); font-weight: 600; }
.prose a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
.prose a:hover { color: var(--primary-hover); }
.prose ul, .prose ol { padding-left: 1.4em; }
.prose ul { list-style: disc; }
.prose ol { list-style: decimal; }
.prose li { margin-top: 0.5em; }
.prose li::marker { color: var(--foreground-subtle); }
.prose blockquote { border-left: 3px solid var(--primary); padding-left: 1.25rem; color: var(--foreground); font-style: italic; }
.prose hr { border: 0; border-top: 1px solid var(--border); margin-block: 2.5em; }
.prose img { border-radius: 12px; border: 1px solid var(--border); }
.prose code { font-family: var(--font-mono); font-size: 0.9em; background: var(--surface-alt); padding: 0.15em 0.4em; border-radius: 6px; color: var(--foreground); }
.prose pre { background: var(--inverse); color: var(--inverse-foreground); padding: 1rem 1.25rem; border-radius: 12px; overflow-x: auto; font-size: 0.9rem; }
.prose pre code { background: transparent; padding: 0; color: inherit; }
.prose table { width: 100%; border-collapse: collapse; font-size: 0.95rem; display: block; overflow-x: auto; }
.prose th, .prose td { border-bottom: 1px solid var(--border); padding: 0.6rem 0.75rem; text-align: left; vertical-align: top; }
.prose th { color: var(--foreground); font-weight: 600; background: var(--surface-alt); }
.prose figure { margin-block: 2em; }
.prose figcaption { font-size: 0.85rem; color: var(--foreground-subtle); margin-top: 0.5rem; }
```

`src/components/layout/TableOfContents.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

type Entry = { id: string; text: string; level: 2 | 3 };

export function TableOfContents({ containerId, title, className }: { containerId: string; title: string; className?: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2, h3'));
    const next: Entry[] = headings.map((h) => {
      if (!h.id) h.id = slugifyHeading(h.textContent ?? '');
      return { id: h.id, text: h.textContent ?? '', level: h.tagName === 'H2' ? 2 : 3 };
    });
    const frame = requestAnimationFrame(() => setEntries(next));
    if (typeof IntersectionObserver === 'undefined') return () => cancelAnimationFrame(frame);
    const io = new IntersectionObserver(
      (records) => {
        const visible = records.filter((r) => r.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((h) => io.observe(h));
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [containerId]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label={title} className={cn('text-sm', className)}>
      <p className="eyebrow mb-3">{title}</p>
      <ol className="space-y-1.5 border-l border-border">
        {entries.map((e) => (
          <li key={e.id} className={cn(e.level === 3 && 'pl-3')}>
            <a
              href={`#${e.id}`}
              className={cn(
                '-ml-px block border-l-2 py-0.5 pl-3 transition-colors',
                active === e.id ? 'border-primary text-foreground' : 'border-transparent text-foreground-subtle hover:text-foreground',
              )}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

`src/components/layout/FilterBar.tsx`:
```tsx
'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function FilterBar({
  query,
  onQueryChange,
  placeholder,
  categories,
  active,
  onSelect,
  className,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  placeholder: string;
  categories: { id: string; label: string }[];
  active: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('sticky top-16 z-30 border-b border-border bg-surface/95 backdrop-blur', className)}>
      <div className="container flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-6">
        <div className="relative lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle" aria-hidden="true" />
          <Input type="search" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} className="h-10 pl-9" />
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filter">
          {categories.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(c.id)}
                className={cn(
                  'h-9 shrink-0 rounded-full border px-3.5 text-sm font-medium transition-colors',
                  isActive ? 'border-inverse bg-inverse text-inverse-foreground' : 'border-border bg-surface text-foreground-muted hover:border-border-strong hover:text-foreground',
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

`src/components/layout/EmptyState.tsx`:
```tsx
import type { ReactNode } from 'react';

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong p-10 text-center">
      <p className="text-lg font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm text-foreground-muted">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
```

`src/components/layout/AsideCta.tsx`:
```tsx
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

const copy = {
  en: { title: 'Not sure you qualify?', body: 'Two-minute check. Written answer within 24 hours.', primary: 'Check eligibility', whatsapp: 'WhatsApp us' },
  ms: { title: 'Tidak pasti anda layak?', body: 'Semakan dua minit. Jawapan bertulis dalam 24 jam.', primary: 'Semak kelayakan', whatsapp: 'WhatsApp kami' },
} as const;

export function AsideCta({ language, className }: { language: Language; className?: string }) {
  const t = copy[language];
  return (
    <div className={cn('rounded-2xl border border-border bg-surface p-5', className)}>
      <p className="font-semibold">{t.title}</p>
      <p className="mt-1 text-sm text-foreground-muted">{t.body}</p>
      <div className="mt-4 flex flex-col gap-2">
        <Button asChild size="sm">
          <LocaleLink href={PATHS.eligibilityTest}>{t.primary}<ArrowRight className="size-4" /></LocaleLink>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" />{t.whatsapp}</a>
        </Button>
      </div>
    </div>
  );
}
```

`src/components/layout/ClosingCta.tsx`:
```tsx
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { Container } from './Container';
import { Section } from './Section';

const copy = {
  en: { title: 'Get a written answer before you send documents.', lede: 'Start with four details. We reply on official WhatsApp with the likely route and what to prepare.', primary: 'Start the 2-minute check', secondary: 'WhatsApp us', note: 'No payment on this website. Next steps are explained on official WhatsApp.' },
  ms: { title: 'Dapatkan jawapan bertulis sebelum hantar dokumen.', lede: 'Mula dengan empat butiran. Kami balas di WhatsApp rasmi dengan laluan yang mungkin dan apa yang perlu disediakan.', primary: 'Mula semakan 2 minit', secondary: 'WhatsApp kami', note: 'Tiada bayaran di laman web ini. Langkah seterusnya diterangkan di WhatsApp rasmi.' },
} as const;

export function ClosingCta({ language, title, lede, primaryHref, primaryLabel }: { language: Language; title?: string; lede?: string; primaryHref?: string; primaryLabel?: string }) {
  const t = copy[language];
  return (
    <Section id="closing-cta" tone="inverse">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] text-inverse-foreground lg:text-4xl">{title ?? t.title}</h2>
          <p className="mt-4 text-lg text-inverse-foreground/70">{lede ?? t.lede}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <LocaleLink href={primaryHref ?? PATHS.eligibilityTest}>{primaryLabel ?? t.primary}<ArrowRight className="size-4" /></LocaleLink>
            </Button>
            <Button size="lg" variant="inverse" asChild>
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" />{t.secondary}</a>
            </Button>
          </div>
          <p data-nosnippet className="mt-6 text-xs text-inverse-foreground/60">{t.note}</p>
        </div>
      </Container>
    </Section>
  );
}
```

`src/components/layout/ArticleLayout.tsx`:
```tsx
import type { ReactNode } from 'react';
import type { Language } from '@/lib/i18n/translations';
import { Container } from './Container';
import { Section } from './Section';
import { PageHeader } from './PageHeader';
import { Prose } from './Prose';
import { TableOfContents } from './TableOfContents';
import { AsideCta } from './AsideCta';
import { ClosingCta } from './ClosingCta';
import type { BreadcrumbItem } from './Breadcrumbs';

const tocTitle = { en: 'On this page', ms: 'Dalam halaman ini' } as const;

export function ArticleLayout({
  language,
  breadcrumbs,
  eyebrow,
  title,
  lede,
  meta,
  children,
  aside,
  footer,
  closing = true,
}: {
  language: Language;
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  meta?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  closing?: boolean;
}) {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} lede={lede} meta={meta} size="wide" />
      <Section>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,680px)_1fr] lg:gap-16">
            <Prose id="article-body">{children}</Prose>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-col gap-6">
                <TableOfContents containerId="article-body" title={tocTitle[language]} className="hidden lg:block" />
                {aside}
                <AsideCta language={language} />
              </div>
            </aside>
          </div>
          {footer ? <div className="mt-16 border-t border-border pt-12">{footer}</div> : null}
        </Container>
      </Section>
      {closing ? <ClosingCta language={language} /> : null}
    </>
  );
}
```

Append to `src/components/layout/index.ts`:
```ts
export { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
export { PageHeader } from './PageHeader';
export { Prose } from './Prose';
export { TableOfContents, slugifyHeading } from './TableOfContents';
export { FilterBar } from './FilterBar';
export { EmptyState } from './EmptyState';
export { AsideCta } from './AsideCta';
export { ClosingCta } from './ClosingCta';
export { ArticleLayout } from './ArticleLayout';
```

Delete `src/components/Breadcrumbs.tsx` (`git rm`); confirm with `grep -rn "components/Breadcrumbs" src` → nothing.

- [ ] **Step 4: Run tests, type-check, lint**

Run: `npx vitest run src/components/layout && npx tsc --noEmit && npm run lint`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(layout): page templates — PageHeader, Breadcrumbs, Prose, TOC, FilterBar, EmptyState, ArticleLayout"
```

---

### Task 2: T2 — Blog post

**Files:**
- Create: `src/components/blog/BlogArticle.tsx` (replaces `src/app/blog/[slug]/BlogPostClient.tsx`)
- Create: `src/lib/content/blog-ui.ts` (bilingual UI strings for the article chrome)
- Modify: `src/app/blog/[slug]/page.tsx` (import path only)
- Delete: `src/app/blog/[slug]/BlogPostClient.tsx`
- Test: `src/components/blog/__tests__/BlogArticle.test.tsx`

**Interfaces:**
- Consumes `BlogPost`, `getRelatedPosts` (`@/lib/blog-data`), `getAuthorProfile` (`@/lib/authors`), `ArticleJsonLd`, `WebPageJsonLd`, `ArticleLayout`, `slugifyHeading`, `VerifyTrustCard` (restyled in Task 6; use as-is now).
- Produces `BlogArticle({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] })` — client component (uses `useLanguage`, share button).

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
vi.mock('next/navigation', () => ({ usePathname: () => '/blog/x', useRouter: () => ({ push: vi.fn() }) }));
import { BlogArticle } from '../BlogArticle';
import type { BlogPost } from '@/lib/blog-data';

const post: BlogPost = {
  slug: 'x', title: 'Understanding DSR', titleMs: 'Memahami DSR', excerpt: 'E', excerptMs: 'E-ms',
  content: '## What is DSR?\n\nDebt service ratio.\n\n### Why it matters\n\nBecause.', contentMs: '## Apa itu DSR?\n\nNisbah.',
  category: 'guide', author: 'GURU Credits Team', publishedAt: '2026-01-01', readTime: 4, image: '/images/blog/x.jpg', tags: ['dsr'],
};

describe('BlogArticle', () => {
  it('renders h1, markdown headings with ids, author card and related grid', () => {
    render(<LanguageProvider><BlogArticle post={post} relatedPosts={[{ ...post, slug: 'y', title: 'Second' }]} /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 1, name: 'Understanding DSR' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'What is DSR?' })).toHaveAttribute('id', 'what-is-dsr');
    expect(screen.getByText(/GURU Credits Team/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Second/ })).toHaveAttribute('href', '/blog/y');
  });
});
```

- [ ] **Step 2: Run to verify it fails** → module missing.

- [ ] **Step 3: Create `src/lib/content/blog-ui.ts`**

```ts
export const blogUi = {
  en: {
    breadcrumbHome: 'Home', breadcrumbBlog: 'Blog', minRead: 'min read', published: 'Published', updated: 'Updated', reviewedBy: 'Reviewed by',
    share: 'Share', copied: 'Link copied', aboutAuthor: 'About the author', tags: 'Tags', related: 'Related articles', readMore: 'Read article',
    disclaimer: 'This article is general information, not financial advice. Loan approval depends on your profile and the lender.',
    categories: { tips: 'Tips', guide: 'Guide', news: 'News', analysis: 'Analysis' },
  },
  ms: {
    breadcrumbHome: 'Utama', breadcrumbBlog: 'Blog', minRead: 'minit bacaan', published: 'Diterbitkan', updated: 'Dikemas kini', reviewedBy: 'Disemak oleh',
    share: 'Kongsi', copied: 'Pautan disalin', aboutAuthor: 'Tentang penulis', tags: 'Tag', related: 'Artikel berkaitan', readMore: 'Baca artikel',
    disclaimer: 'Artikel ini maklumat umum, bukan nasihat kewangan. Kelulusan pinjaman bergantung pada profil anda dan pemberi pinjaman.',
    categories: { tips: 'Tip', guide: 'Panduan', news: 'Berita', analysis: 'Analisis' },
  },
} as const;
```

- [ ] **Step 4: Create `src/components/blog/BlogArticle.tsx`**

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown, { type Components } from 'react-markdown';
import { ArrowRight, Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LocaleLink } from '@/components/LocaleLink';
import { ArticleJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { ArticleLayout, slugifyHeading } from '@/components/layout';
import { VerifyTrustCard } from '@/components/VerifyTrustCard';
import { getAuthorProfile, DEFAULT_AUTHOR_PHOTO } from '@/lib/authors';
import type { BlogPost } from '@/lib/blog-data';
import { blogUi } from '@/lib/content/blog-ui';
import { SEO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { PATHS } from '@/lib/i18n/routes';

const textOf = (node: React.ReactNode): string =>
  Array.isArray(node) ? node.map(textOf).join('') : typeof node === 'string' || typeof node === 'number' ? String(node) : '';

const mdComponents: Components = {
  h1: ({ children }) => <h2 id={slugifyHeading(textOf(children))}>{children}</h2>,
  h2: ({ children }) => <h2 id={slugifyHeading(textOf(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugifyHeading(textOf(children))}>{children}</h3>,
  a: ({ href, children }) =>
    href?.startsWith('/') ? <LocaleLink href={href}>{children}</LocaleLink> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
};

function formatDate(iso: string, language: 'en' | 'ms') {
  return new Date(iso).toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-MY', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function BlogArticle({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const { language } = useLanguage();
  const t = blogUi[language];
  const [copied, setCopied] = useState(false);
  const title = language === 'ms' ? post.titleMs : post.title;
  const excerpt = language === 'ms' ? post.excerptMs : post.excerpt;
  const content = language === 'ms' ? post.contentMs : post.content;
  const author = getAuthorProfile(post.author);
  const authorRole = post.authorRole ?? author.role;
  const authorBio = post.authorBio ?? author.bio;
  const authorPhoto = post.authorPhoto ?? author.photo ?? DEFAULT_AUTHOR_PHOTO;
  const url = new URL(PATHS.blogPost(post.slug), SEO.url).toString();

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <>
      <ArticleJsonLd
        title={post.title} titleMs={post.titleMs} description={post.excerpt} descriptionMs={post.excerptMs}
        author={post.author} authorRole={authorRole} authorBio={authorBio} authorCredentials={post.authorCredentials ?? author.credentials} authorPhoto={authorPhoto}
        publishedAt={post.publishedAt} updatedAt={post.updatedAt} reviewedBy={post.reviewedBy} reviewedAt={post.reviewedAt}
        slug={post.slug} tags={post.tags} image={post.image}
      />
      <WebPageJsonLd url={url} title={title} description={excerpt} image={post.image} breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: 'Blog', url: new URL(PATHS.blog, SEO.url).toString() }, { name: title, url }]} />

      <ArticleLayout
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbBlog, href: PATHS.blog }, { label: title }]}
        eyebrow={t.categories[post.category]}
        title={title}
        lede={excerpt}
        meta={
          <>
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{t.published} {formatDate(post.publishedAt, language)}</span>
            {post.updatedAt ? (<><span aria-hidden="true">·</span><span>{t.updated} {formatDate(post.updatedAt, language)}</span></>) : null}
            <span aria-hidden="true">·</span>
            <span>{post.readTime} {t.minRead}</span>
            <Button variant="ghost" size="sm" type="button" onClick={share} className="ml-auto">
              {copied ? <Check className="size-4 text-success" /> : <Share2 className="size-4" />}
              {copied ? t.copied : t.share}
            </Button>
          </>
        }
        aside={
          post.reviewedBy ? (
            <p className="text-xs text-foreground-subtle">{t.reviewedBy} {post.reviewedBy}{post.reviewedAt ? ` · ${formatDate(post.reviewedAt, language)}` : ''}</p>
          ) : null
        }
        footer={
          <div className="space-y-12">
            <div className="flex gap-4 rounded-2xl border border-border bg-surface p-6">
              <Image src={authorPhoto} alt="" width={56} height={56} className="size-14 shrink-0 rounded-full object-cover" />
              <div>
                <p className="eyebrow mb-1">{t.aboutAuthor}</p>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-foreground-subtle">{authorRole}</p>
                <p className="mt-2 text-sm text-foreground-muted">{authorBio}</p>
              </div>
            </div>
            <VerifyTrustCard language={language} compact />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (<Badge key={tag} variant="secondary">{tag}</Badge>))}
            </div>
            {relatedPosts.length > 0 ? (
              <div>
                <h2 className="text-2xl">{t.related}</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((rp) => (
                    <article key={rp.slug} className="relative flex flex-col rounded-2xl border border-border bg-surface p-5 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-border-strong">
                      <p className="eyebrow mb-2">{t.categories[rp.category]}</p>
                      <h3 className="text-lg">
                        <LocaleLink href={PATHS.blogPost(rp.slug)} className="after:absolute after:inset-0">{language === 'ms' ? rp.titleMs : rp.title}</LocaleLink>
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-foreground-muted">{language === 'ms' ? rp.excerptMs : rp.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{t.readMore}<ArrowRight className="size-4" /></span>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        }
      >
        <p className="rounded-xl border border-warning/30 bg-warning-soft p-4 text-sm text-foreground">{t.disclaimer}</p>
        <figure>
          <Image src={post.image} alt={title} width={1200} height={630} className="w-full" priority />
        </figure>
        <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
      </ArticleLayout>
    </>
  );
}
```

- [ ] **Step 5: Wire the route**

In `src/app/blog/[slug]/page.tsx` replace `import { BlogPostClient } from './BlogPostClient';` with `import { BlogArticle } from '@/components/blog/BlogArticle';` and `<BlogPostClient post={post} relatedPosts={relatedPosts} />` with `<BlogArticle post={post} relatedPosts={relatedPosts} />`. Leave `generateStaticParams`/`generateMetadata` untouched. `git rm src/app/blog/[slug]/BlogPostClient.tsx`.

- [ ] **Step 6: Verify**

Run: `npx vitest run src/components/blog && npx tsc --noEmit && npm run lint`, then build + start and `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npx playwright test e2e/smoke.spec.ts --project=chromium`; screenshot `/blog/personal-loan-malaysia-complete-guide-2026` at 390 and 1280 into the SDD workspace and check: TOC visible on desktop, prose measure ≈680px, aside sticky, no horizontal scroll on mobile. Kill the server.

- [ ] **Step 7: Commit** — `feat(blog): article template with TOC, author card and related posts`

---

### Task 3: T2 — Guides, topics, editorial pages

**Files:**
- Create: `src/lib/content/guides/types.ts`, `src/lib/content/guides/ui.ts`, `src/lib/content/guides/credit-score.ts`, `debt-consolidation.ts`, `ccris-ctos.ts`, `loan-rejection-recovery.ts`, `self-employed-income-proof.ts`, `editorial-policy.ts`, `review-methodology.ts`, `src/lib/content/guides/from-topic.ts`
- Create: `src/components/guides/GuideArticle.tsx`
- Modify: the 7 static route files + `src/app/loan-guides/topics/[slug]/page.tsx` to thin renderers
- Test: `src/components/guides/__tests__/GuideArticle.test.tsx`

**Interfaces (produces):**
```ts
// src/lib/content/guides/types.ts
export type GuideSection =
  | { kind: 'paragraphs'; id: string; heading: string; paragraphs: string[] }
  | { kind: 'steps'; id: string; heading: string; intro?: string; steps: { title: string; description: string }[] }
  | { kind: 'checklist'; id: string; heading: string; items: string[] }
  | { kind: 'warnings'; id: string; heading: string; items: string[] };
export type GuideContent = {
  eyebrow: string; title: string; lede: string;
  stats?: { label: string; value: string }[];
  sections: GuideSection[];
  faqs?: { question: string; answer: string }[];
  related?: { title: string; href: string }[];
  howTo?: { name: string; description?: string; steps: { name: string; text: string }[] };
};
export type GuideDoc = { slug: string; path: string; breadcrumbLabel: string; content: Record<Language, GuideContent> };
```
`GuideArticle({ doc, language }: { doc: GuideDoc; language: Language })` — server component. `guideFromTopic(topic: GuideTopic): GuideDoc` in `from-topic.ts`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));
import { GuideArticle } from '../GuideArticle';
import { guideFromTopic } from '@/lib/content/guides/from-topic';
import { getGuideTopic } from '@/lib/guide-topics';

describe('GuideArticle', () => {
  it('renders a topic as an article with numbered steps, checklist, warnings and FAQ', () => {
    const doc = guideFromTopic(getGuideTopic('personal-loan-minimum-salary')!);
    render(<LanguageProvider><GuideArticle doc={doc} language="en" /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(doc.content.en.title);
    expect(screen.getByRole('list', { name: /steps/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole('button', { expanded: false }).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run to verify it fails.**

- [ ] **Step 3: Create types, UI strings and the topic adapter**

`src/lib/content/guides/types.ts` — exactly the block in Interfaces (add `import type { Language } from '@/lib/i18n/translations';`).

`src/lib/content/guides/ui.ts`:
```ts
export const guideUi = {
  en: { home: 'Home', guides: 'Loan Guides', steps: 'Steps', checklist: 'Checklist', warnings: 'Watch out for', faq: 'Questions', related: 'Useful next reads', eyebrow: 'Loan guide' },
  ms: { home: 'Utama', guides: 'Panduan Pinjaman', steps: 'Langkah', checklist: 'Senarai semak', warnings: 'Perkara yang perlu diawasi', faq: 'Soalan', related: 'Bacaan seterusnya', eyebrow: 'Panduan pinjaman' },
} as const;
```

`src/lib/content/guides/from-topic.ts`:
```ts
import type { GuideTopic } from '@/lib/guide-topics';
import { PATHS } from '@/lib/i18n/routes';
import type { GuideContent, GuideDoc } from './types';
import { guideUi } from './ui';

function build(topic: GuideTopic, ms: boolean): GuideContent {
  const pick = <T,>(en: T, m: T) => (ms ? m : en);
  return {
    eyebrow: pick(guideUi.en.eyebrow, guideUi.ms.eyebrow),
    title: pick(topic.title, topic.titleMs),
    lede: pick(topic.description, topic.descriptionMs),
    stats: topic.stats.map((s) => ({ label: pick(s.label, s.labelMs), value: s.value })),
    sections: [
      { kind: 'steps', id: 'steps', heading: pick(topic.stepsTitle, topic.stepsTitleMs), steps: topic.steps.map((s) => ({ title: pick(s.title, s.titleMs), description: pick(s.description, s.descriptionMs) })) },
      { kind: 'checklist', id: 'checklist', heading: pick(topic.checklistTitle, topic.checklistTitleMs), items: pick(topic.checklist, topic.checklistMs) },
      { kind: 'warnings', id: 'warnings', heading: pick(topic.warningsTitle, topic.warningsTitleMs), items: pick(topic.warnings, topic.warningsMs) },
    ],
    faqs: topic.faqs.map((f) => ({ question: pick(f.question, f.questionMs), answer: pick(f.answer, f.answerMs) })),
    related: topic.related.map((r) => ({ title: pick(r.title, r.titleMs), href: r.href })),
    howTo: { name: topic.stepsTitle, description: topic.description, steps: topic.steps.map((s) => ({ name: s.title, text: s.description })) },
  };
}

export function guideFromTopic(topic: GuideTopic): GuideDoc {
  return { slug: topic.slug, path: PATHS.loanGuide.topic(topic.slug), breadcrumbLabel: topic.title, content: { en: build(topic, false), ms: build(topic, true) } };
}
```

- [ ] **Step 4: Create `src/components/guides/GuideArticle.tsx`**

```tsx
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ArticleLayout, Stat } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { HowToJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import type { GuideDoc, GuideSection } from '@/lib/content/guides/types';
import { guideUi } from '@/lib/content/guides/ui';

function Section({ s, labels }: { s: GuideSection; labels: (typeof guideUi)['en'] }) {
  switch (s.kind) {
    case 'paragraphs':
      return (<><h2 id={s.id}>{s.heading}</h2>{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</>);
    case 'steps':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          {s.intro ? <p>{s.intro}</p> : null}
          <ol aria-label={labels.steps} className="not-prose grid gap-4 !pl-0">
            {s.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                <span className="font-mono text-sm font-semibold text-foreground-subtle">{String(i + 1).padStart(2, '0')}</span>
                <div><h3 className="!mt-0 text-lg">{step.title}</h3><p className="mt-1 text-sm text-foreground-muted">{step.description}</p></div>
              </li>
            ))}
          </ol>
        </>
      );
    case 'checklist':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          <ul className="not-prose grid gap-2 !pl-0">
            {s.items.map((item) => (<li key={item} className="flex gap-2 text-foreground-muted"><CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />{item}</li>))}
          </ul>
        </>
      );
    case 'warnings':
      return (
        <>
          <h2 id={s.id}>{s.heading}</h2>
          <ul className="not-prose grid gap-2 rounded-2xl border border-warning/30 bg-warning-soft p-5 !pl-0">
            {s.items.map((item) => (<li key={item} className="flex gap-2 text-foreground"><AlertTriangle className="mt-1 size-4 shrink-0 text-warning" />{item}</li>))}
          </ul>
        </>
      );
  }
}

export function GuideArticle({ doc, language }: { doc: GuideDoc; language: Language }) {
  const c = doc.content[language];
  const labels = guideUi[language];
  const url = new URL(doc.path, SEO.url).toString();
  return (
    <>
      {c.howTo ? <HowToJsonLd name={c.howTo.name} description={c.howTo.description} steps={c.howTo.steps} /> : null}
      <WebPageJsonLd url={url} title={c.title} description={c.lede} faqItems={c.faqs} breadcrumbItems={[{ name: 'Home', url: SEO.url }, { name: 'Loan Guides', url: new URL(PATHS.loanGuides, SEO.url).toString() }, { name: c.title, url }]} />
      <ArticleLayout
        language={language}
        breadcrumbs={[{ label: labels.home, href: PATHS.home }, { label: labels.guides, href: PATHS.loanGuides }, { label: doc.breadcrumbLabel }]}
        eyebrow={c.eyebrow}
        title={c.title}
        lede={c.lede}
        footer={
          c.related?.length ? (
            <div>
              <h2 className="text-2xl">{labels.related}</h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {c.related.map((r) => (
                  <li key={r.href}>
                    <LocaleLink href={r.href} className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 font-medium transition-colors hover:border-border-strong">
                      {r.title}<ArrowRight className="size-4 text-primary" />
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        }
      >
        {c.stats?.length ? (
          <div className="not-prose grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface-alt p-5 sm:grid-cols-4">
            {c.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} />)}
          </div>
        ) : null}
        {c.sections.map((s) => <Section key={s.id} s={s} labels={labels} />)}
        {c.faqs?.length ? (<><h2 id="faq">{labels.faq}</h2><div className="not-prose"><FaqAccordion items={c.faqs} /></div></>) : null}
      </ArticleLayout>
    </>
  );
}
```
Add to `globals.css` after the `.prose` rules: `.prose .not-prose, .prose .not-prose * { color: inherit; }` and `.prose .not-prose > * + * { margin-top: 0; }` so cards inside prose keep their own spacing.

- [ ] **Step 5: Convert the 15 topics route**

`src/app/loan-guides/topics/[slug]/page.tsx` — keep `generateStaticParams` and `generateMetadata`; replace the body with:
```tsx
export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getGuideTopic(slug);
  if (!topic) notFound();
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={guideFromTopic(topic)} language={language} />;
}
```
(imports: `notFound` from `next/navigation`, `resolveRequestLanguage` from `@/lib/i18n/server`, `getGuideTopic`, `guideFromTopic`, `GuideArticle`.)

- [ ] **Step 6: Convert the 5 static guides + 2 editorial pages**

For each of `credit-score`, `debt-consolidation`, `ccris-ctos`, `loan-rejection-recovery`, `self-employed-income-proof`, `editorial-policy`, `review-methodology`: create `src/lib/content/guides/<slug>.ts` exporting `const <camelSlug>Guide: GuideDoc` with `slug`, `path` (from `PATHS`), `breadcrumbLabel` (English title) and `content.en`/`content.ms`. Move every string from the page's inline copy object into `GuideContent` fields: hero → `eyebrow/title/lede/stats`; steps → `{ kind: 'steps' }`; checklist/tips → `checklist`; pitfalls/warnings → `warnings`; free text → `paragraphs`; FAQ → `faqs`; related/tools → `related`; HowTo → `howTo` (same `name/steps` the page passed to `HowToJsonLd`). Keep the page's H1 keyword (e.g. "Credit Score", "CCRIS/CTOS", "Debt Consolidation"). Rewrite lede/section copy for tightness where the old copy was padded, in both languages. For `editorial-policy` and `review-methodology` use `paragraphs` sections only, `eyebrow: 'Editorial'`/`'Editorial'`, no `howTo`, `related` → the other editorial page + `/verify-us`.

Each route file becomes:
```tsx
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { creditScoreGuide } from '@/lib/content/guides/credit-score';
export { metadata } from './metadata';   // only if the page had a metadata export in a sibling file; otherwise keep the existing `export const metadata` block verbatim at the top
export default async function Page() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={creditScoreGuide} language={language} />;
}
```
The existing `metadata` export of each page stays byte-identical.

- [ ] **Step 7: Verify**

`npx vitest run src/components/guides && npx tsc --noEmit && npm run lint`; grep the eight route files for `surface-card|hero-grid|btn-gradient|gradient-text` → 0. Build, start, run `e2e/smoke.spec.ts`; screenshot `/loan-guides/ccris-ctos` and `/loan-guides/topics/bad-credit-loan-options` at 390/1280 into the workspace. Kill the server.

- [ ] **Step 8: Commit** — `feat(guides): structured GuideArticle template for topics, static guides and editorial pages`

---

### Task 4: T4 — Index / listing pages

**Files:**
- Create: `src/lib/content/listings/blog.ts`, `loan-guides.ts`, `tools.ts`, `service-areas.ts`, `glossary.ts`, `faq.ts`, `documents.ts` (UI strings + any inline datasets moved out of components: glossary terms, FAQ items+categories, documents checklist, tools list)
- Create: `src/components/listings/CardGrid.tsx`, `ListingShell.tsx`
- Rewrite: `src/app/blog/page.tsx`, `src/app/loan-guides/page.tsx`, `src/app/tools/page.tsx`, `src/app/service-areas/page.tsx`, `src/app/glossary/GlossaryContent.tsx`, `src/app/faq/FaqContent.tsx`, `src/app/documents/DocumentsContent.tsx`
- Test: `src/components/listings/__tests__/listings.test.tsx`

**Interfaces (produces):**
```ts
ListingShell({ language, breadcrumbs, eyebrow?, title, lede, children, closing?: boolean })   // PageHeader + Section/Container(wide) + ClosingCta
CardGrid({ children, columns?: 2|3 })                                                         // grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-{columns}
ListingCard({ href, eyebrow?, title, description, meta?: ReactNode, cta })                    // stretched-link card (title link + trailing cta text)
```

- [ ] **Step 1: Failing test** — `listings.test.tsx` renders `ListingShell` with two `ListingCard`s inside `CardGrid` and asserts one `h1`, two links with the given hrefs, and a `section#closing-cta`.

```tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));
import { ListingShell, CardGrid, ListingCard } from '..';

describe('listing primitives', () => {
  it('renders shell, grid and cards', () => {
    const { container } = render(
      <LanguageProvider>
        <ListingShell language="en" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tools' }]} title="Free tools" lede="Pick one.">
          <CardGrid columns={2}>
            <ListingCard href="/tools/compare" title="Compare" description="Rates" cta="Open" />
            <ListingCard href="/eligibility-test" title="Test" description="Quiz" cta="Open" />
          </CardGrid>
        </ListingShell>
      </LanguageProvider>,
    );
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Compare' })).toHaveAttribute('href', '/tools/compare');
    expect(container.querySelector('section#closing-cta')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run → fails.**

- [ ] **Step 3: Create the listing primitives**

`src/components/listings/ListingShell.tsx`:
```tsx
import type { ReactNode } from 'react';
import { Container, Section, PageHeader, ClosingCta, type BreadcrumbItem } from '@/components/layout';
import type { Language } from '@/lib/i18n/translations';

export function ListingShell({ language, breadcrumbs, eyebrow, title, lede, children, closing = true }: { language: Language; breadcrumbs: BreadcrumbItem[]; eyebrow?: string; title: ReactNode; lede: string; children: ReactNode; closing?: boolean }) {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} lede={lede} size="wide" />
      <Section>
        <Container size="wide">{children}</Container>
      </Section>
      {closing ? <ClosingCta language={language} /> : null}
    </>
  );
}
```
`src/components/listings/CardGrid.tsx`:
```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function CardGrid({ children, columns = 3, className }: { children: ReactNode; columns?: 2 | 3; className?: string }) {
  return <div className={cn('grid gap-4 sm:grid-cols-2 md:gap-6', columns === 3 && 'lg:grid-cols-3', className)}>{children}</div>;
}
```
`src/components/listings/ListingCard.tsx`:
```tsx
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
export function ListingCard({ href, eyebrow, title, description, meta, cta }: { href: string; eyebrow?: string; title: string; description: string; meta?: ReactNode; cta: string }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-border-strong">
      {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
      <h3 className="text-lg"><LocaleLink href={href} className="after:absolute after:inset-0">{title}</LocaleLink></h3>
      <p className="mt-2 flex-1 text-sm text-foreground-muted">{description}</p>
      {meta ? <div className="mt-3 text-xs text-foreground-subtle">{meta}</div> : null}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{cta}<ArrowRight className="size-4" /></span>
    </article>
  );
}
```
`src/components/listings/index.ts` exports the three.

- [ ] **Step 4: Migrate each listing route** (one at a time; run tsc after each)

Common recipe: move the page's inline `content`/datasets into `src/lib/content/listings/<name>.ts` (typed, `{ en, ms }` for UI strings; datasets bilingual per field); render `ListingShell` with breadcrumbs `[Home, <Page>]`; replace hero markup with the shell's `PageHeader`; replace card markup with `ListingCard` inside `CardGrid`; client pages keep their `useState` filters but render `FilterBar` (from `@/components/layout`) directly under the shell header (place it as the first child of `ListingShell`'s `children`, with `className="-mt-16 mb-10 lg:-mt-24"` so it sits flush under the header) and `EmptyState` when the filtered list is empty; delete every `surface-card|hero-grid|btn-gradient|gradient-text|card-hover` class; end with the shell's `ClosingCta`. Keep every `metadata` export and JSON-LD.

Route specifics:
- `/blog` (client): categories from `blogCategories`; `ListingCard` `eyebrow` = category label, `meta` = `{readTime} min read · {date}`; featured post = first card spanning `sm:col-span-2 lg:col-span-3` with the cover image on the left (`grid md:grid-cols-[1.2fr_1fr]`).
- `/loan-guides` (server): topics grid from `guideTopics` (title/description per language, cta `Read guide`); a second `CardGrid` of the five static guides + `credit-score`/`debt-consolidation`; drop `TrustPanel` (ClosingCta replaces it).
- `/tools` (server): 2 cards (Compare, Eligibility test) as `columns={2}`; drop `TrustPanel`.
- `/service-areas` (server): 16 region cards, `meta` = median income via `formatMYR`.
- `/glossary` (client): terms moved to `src/lib/content/listings/glossary.ts` as `GlossaryTerm[]` (same interface); `FilterBar` categories from the distinct `category` values + `all`; each term rendered as a `<dl>` row inside a bordered list (not cards); keep the alphabet quick links as a simple row of `<a href="#letter-x">`.
- `/faq` (client): FAQ items + categories to `listings/faq.ts`; render `FilterBar`, then `FaqAccordion items={filtered}`; `EmptyState` when none.
- `/documents` (client): keep `Tabs`; move copy to `listings/documents.ts`; each tab's checklist renders as a bordered list with a `Checkbox` per item and the `Progress` bar; drop `card-hover`.

- [ ] **Step 5: Verify**

`npx vitest run src/components/listings && npx tsc --noEmit && npm run lint`; grep the seven route files + their content modules for legacy classes → 0. Build/start; smoke e2e; screenshots of `/blog` and `/glossary` at 390/1280. Kill server.

- [ ] **Step 6: Commit** — `feat(listings): ListingShell/CardGrid/FilterBar template for blog, guides, tools, areas, glossary, faq, documents`

---

### Task 5: T1 — Loan product pages

**Files:**
- Create: `src/lib/content/loans/types.ts`, `personal.ts`, `debt-consolidation.ts`, `emergency.ts`
- Create: `src/components/loans/LoanProductPage.tsx`
- Rewrite: `src/app/loans/personal/page.tsx`, `debt-consolidation/page.tsx`, `emergency/page.tsx` (keep `metadata` + JSON-LD props)
- Modify: `src/components/TrustPanel.tsx` (restyle to `Section tone="alt"` + `SectionHeader` + 2×2 cards)
- Test: `src/components/loans/__tests__/LoanProductPage.test.tsx`

**Interfaces (produces):**
```ts
export type LoanProductContent = {
  eyebrow: string; title: string; lede: string;
  stats: { value: string; label: string }[];
  urgentBanner?: { title: string; body: string };                       // emergency only
  situations?: { title: string; items: { title: string; description: string }[] };   // emergency only
  benefits?: { title: string; items: { title: string; description: string }[] };
  comparison?: { title: string; before: { title: string; items: { name: string; rate: string; payment: string }[]; totalLabel: string; total: string }; after: { title: string; rate: string; payment: string; savingsLabel: string; savings: string } };
  eligibility?: { title: string; items: string[] };
  requirements?: { title: string; items: string[] };
  documents?: { title: string; items: string[] };
  process: { title: string; subtitle?: string; steps: { title: string; description: string }[] };
  tips?: { title: string; items: string[] };
  warning?: { title: string; items: string[] };
  faq: { title: string; items: { question: string; answer: string }[] };
  trust: { title: string; description: string; items: { title: string; description: string }[] };
  cta: { title: string; description: string; primary: string; secondary: string };
};
export type LoanProductDoc = { slug: 'personal' | 'debt-consolidation' | 'emergency'; path: string; content: Record<Language, LoanProductContent> };
LoanProductPage({ doc, language }: { doc: LoanProductDoc; language: Language })
```

- [ ] **Step 1: Failing test** — renders `LoanProductPage` with the `personal` doc and asserts: one `h1` containing "Personal Loan"; a heading for `process.title`; the FAQ accordion has ≥3 buttons; `section#closing-cta` present. Then with the `emergency` doc asserts the `urgentBanner.title` text renders and the `situations` grid has 6 headings (`getAllByRole('heading', { level: 3 })` length ≥ 6).

- [ ] **Step 2: Run → fails.**

- [ ] **Step 3: Content modules** — for each loan, move the page's inline `pageContent` into `src/lib/content/loans/<slug>.ts` as `LoanProductDoc`, mapping old keys to the type above (`header` → `eyebrow/title/lede`; the personal page's `stats` stay; `trust` = the props the page currently passes to `TrustPanel`; `cta` as-is). Tighten copy; keep H1 keywords ("Personal Loan Malaysia", "Debt Consolidation Loan", "Emergency Loan").

- [ ] **Step 4: `LoanProductPage.tsx`** (server component). Skeleton, every block conditional on its field:
```tsx
<PageHeader breadcrumbs=[Home, Loans (→ PATHS.services), title] eyebrow title lede
  actions={<><Button asChild size="lg"><LocaleLink href={PATHS.eligibilityTest}>{cta.primary}</LocaleLink></Button><Button asChild size="lg" variant="outline"><a href={COMPANY.whatsappLink}…>{cta.secondary}</a></Button></>}>
  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">{stats.map(<Stat/>)}</div>
</PageHeader>
{urgentBanner && <Section compact tone="alt"><Container><div className="flex gap-3 rounded-2xl border border-warning/30 bg-warning-soft p-5"><AlertTriangle/> <div><p className="font-semibold">{title}</p><p className="text-sm">{body}</p></div></div></Container></Section>}
{situations && <Section><Container><SectionHeader title/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items → Card with h3 + p}</div></Container></Section>}
{benefits && <Section tone="alt"><Container><SectionHeader title/><div className="grid gap-4 md:grid-cols-2">{items → icon tile + h3 + p}</div></Container></Section>}
{comparison && <Section><Container><SectionHeader title/><div className="grid gap-6 lg:grid-cols-2">{before: bordered table of items + total row; after: success-soft card with rate/payment/savings Stat}</div></Container></Section>}
{(eligibility||requirements||documents) && <Section tone="alt"><Container><div className="grid gap-6 lg:grid-cols-3">{each present list → Card with h3 + checklist ul}</div></Container></Section>}
<Section><Container><SectionHeader title subtitle/><ol className="grid gap-6 md:grid-cols-3">{steps → li with 01/02/03 mono + h3 + p}</ol></Container></Section>
{tips && <Section compact><Container><Card>h3 + ul</Card></Container></Section>}
{warning && <Section compact><Container><div className="rounded-2xl border border-warning/30 bg-warning-soft p-6"><h3/><ul/></div></Container></Section>}
<Section tone="alt"><Container size="prose" className="max-w-[760px]"><SectionHeader title/><FaqAccordion items/></Container></Section>
<TrustPanel {...trust} />
<ClosingCta language title={cta.title} lede={cta.description} primaryLabel={cta.primary}/>
```
Restyle `TrustPanel` to `Section` + `SectionHeader` + `grid sm:grid-cols-2` of bordered cards (no `surface-card`), signature unchanged.

- [ ] **Step 5: Route files** become: `export const metadata = …` (unchanged) + the three JSON-LD components with their existing props + `<LoanProductPage doc={personalLoan} language={language} />`.

- [ ] **Step 6: Verify** — vitest/tsc/lint; legacy-class grep on the three routes, content modules, `TrustPanel.tsx` → 0; build/start; smoke e2e; screenshots of `/loans/emergency` 390/1280. Commit — `feat(loans): LoanProductPage template for personal, debt-consolidation, emergency`

---

### Task 6: T1 — About, Partners, Verify-us, Services

**Files:**
- Create: `src/lib/content/about.ts` (move `src/app/about/data.ts` here; keep `team-data.ts` in place), `src/lib/content/partners.ts`, `src/lib/content/verify-us.ts`
- Rewrite: `src/app/about/AboutContent.tsx`, `src/app/partners/page.tsx`, `src/app/verify-us/page.tsx`, `src/app/services/ServicesContent.tsx`, `src/app/services/ServiceGrid.tsx`
- Modify: `src/components/VerifyTrustCard.tsx` (restyle; signature unchanged)
- Delete: `src/app/services/FaqAccordion.tsx` (use the shared one), `src/app/about/data.ts`
- Test: `src/app/services/__tests__/ServicesContent.test.tsx` — asserts heading `Select a Loan Product` and text `Personal Loan` (mirrors the e2e lock).

Recipe per page: `PageHeader` (breadcrumbs `[Home, Page]`) → `Section`s alternating `default`/`alt`, each with `SectionHeader` → `ClosingCta`. Cards = bordered `Card`, no images with gradient overlays. Specifics:
- **About**: mission (prose column + 3 `Stat`s), trust (2×2), coverage (state chips), story timeline (vertical `ol` with mono years), team (3 cards with photo/role/credentials/bio), values (grid), services overview (3 `ListingCard`s), no testimonials section (removed).
- **Partners**: intro + `grid sm:grid-cols-2 lg:grid-cols-3` of bank cards showing name (text), min rate `Stat`, product chips (`Badge secondary`), description — no logo images (assets are placeholders; keep the `logo` field in data for later). Keep the "how it works" 3-step block.
- **Verify-us**: `ArticleLayout` with `paragraphs`/`checklist` sections (who we are, verification steps, red flags, privacy), team cards in `footer`, `ContactPageJsonLd` + `WebPageJsonLd` kept.
- **Services**: `PageHeader` with `title` exactly `Select a Loan Product` (e2e), RM30 banner as a compact warning-soft card, `ServiceGrid` restyled to `ListingCard`-like cards (rate/max/tenure as `Stat` row + features list + "Apply" primary button → `PATHS.servicesApply(id)`), loan-journey steps, shared `FaqAccordion`, `TrustPanel`, `VerifyTrustCard`, `ClosingCta`.
- **VerifyTrustCard**: bordered card, icon list, two buttons (`outline`), `compact` = single column.

- [ ] Steps: write the failing services test → run → migrate the four pages + two components → `npx vitest run src/app/services && npx tsc --noEmit && npm run lint` → legacy grep on touched files = 0 → build/start → smoke e2e (`/about`, `/partners`, `/verify-us`, `/services`) → screenshots of `/services` 390/1280 → commit `feat(marketing): about, partners, verify-us, services on Section/PageHeader template`.

---

### Task 7: T3 — Region landing

**Files:**
- Rewrite: `src/app/loans/my/[region]/page.tsx` (keep `generateStaticParams`, `generateMetadata`, `revalidate`, `BreadcrumbJsonLd`)
- Create: `src/lib/content/regions-ui.ts` (bilingual section labels currently inline in the page)

Recipe: `PageHeader` (breadcrumbs `[Home, Loans, region.name]`, `title` keeps `{region name} Personal Loan` keyword, `lede` = `localContext`, actions = eligibility + WhatsApp) with a `children` grid of three `Stat`s (income / property / DSR via `formatMYR`) → `Section` affordability (`Prose` note + product `Badge`s) → conditional `Section`s in the existing order (market trends list, bank specialisation cards, lenders grid of text chips, neighbourhood notes, local cases as the Proof-style case cards `situation/action/outcome`, FAQ via `FaqAccordion`, sources list + reviewed line) → `ClosingCta`. Delete both `dark:` occurrences and all legacy classes.

- [ ] Steps: migrate → `npx tsc --noEmit && npm run lint && npx vitest run` → build/start → smoke e2e for `/loans/my/selangor` and `/loans/my/sabah` (add `/loans/my/sabah` to the smoke route list) → screenshots 390/1280 → commit `feat(regions): region landing on shared template`.

---

### Task 8: T5 — Tools: merge /compare into /tools/compare, restyle eligibility test

**Files:**
- Create: `src/lib/content/tools/compare.ts` (bank dataset from `tools/compare/page.tsx` + product dataset from `compare/CompareContent.tsx` + UI strings), `src/lib/content/tools/eligibility.ts` (questions, scores, results, UI strings)
- Create: `src/components/tools/BankRateCompare.tsx` (client; the existing bank comparator logic), `src/components/tools/ProductCompare.tsx` (client; the existing product-type comparator), `src/components/tools/ToolLayout.tsx` (`PageHeader` + `grid lg:grid-cols-[360px_1fr]` with sticky input rail slot + results slot + disclaimer)
- Rewrite: `src/app/tools/compare/page.tsx` (server: metadata + JSON-LD + `Tabs` with the two comparators), `src/app/eligibility-test/page.tsx`
- Delete: `src/app/compare/` (whole directory)
- Modify: `next.config.ts` redirects (add `{ source: '/compare', destination: '/tools/compare', permanent: true }`, `{ source: '/ms/compare', destination: '/ms/tools/compare', permanent: true }`), `src/app/sitemap.ts` (remove `/compare` entry), `src/lib/i18n/routes.ts` (remove `compare` key; fix any importer via `grep -rn "PATHS.compare" src`)
- Test: `src/components/tools/__tests__/BankRateCompare.test.tsx` — select loan type `personal`, set amount, assert monthly payment cells render for the 3 default banks and toggling a 4th bank adds a column; `eligibility` test — answer 5 questions with the best options and assert the `excellent` result title renders.

Recipe: `ToolLayout` input rail = `Card` `lg:sticky lg:top-24` with the existing controls restyled (`Input`, `Slider`, chip buttons); results = table (mono numerals) or cards; disclaimer under results. `/tools/compare` page: `PageHeader` + `Tabs` (`Compare bank rates` / `Compare loan types`) styled like the homepage pill tabs. Eligibility test: `PageHeader` (centered) → `Container size="prose"` → `Progress` → question `Card` with 4 option buttons (`min-h-14`, full width, `aria-pressed`) → result screen (score `Stat`, title, recommendations checklist, resources `ListingCard`s, CTA buttons, restart `outline` button) → `ClosingCta`. `WebApplicationJsonLd`, `CalculatorJsonLd`, `WebPageJsonLd` kept.

- [ ] Steps: failing tests → run → build modules/components → wire routes → delete `/compare` + redirects/sitemap/PATHS → `npx vitest run src/components/tools && npx tsc --noEmit && npm run lint` → build/start → smoke e2e (update the smoke list: remove nothing; add a test that `/compare` responds 308 → `/tools/compare`: `const res = await page.request.get('/compare', { maxRedirects: 0 }); expect(res.status()).toBe(308);`) → screenshots `/tools/compare` 390/1280 → commit `feat(tools): merge /compare into /tools/compare tabs; ToolLayout; eligibility test restyle`.

---

### Task 9: T6 — Apply wizard split, contact, status, success

**Files:**
- Create: `src/lib/content/apply.ts` (all copy from `services/[id]/apply/page.tsx`), `src/components/apply/ApplyWizard.tsx` (state, validation, submit, stepper), `src/components/apply/steps/Step1Eligibility.tsx`, `Step2Contact.tsx`, `Step3Review.tsx`, `src/components/apply/ApplySidebar.tsx` (live DSR card + one testimonial), `src/components/apply/Stepper.tsx`
- Create: `src/components/layout/FormLayout.tsx` (`PageHeader` (no lede) + `Container size="wide"` + `grid lg:grid-cols-[1fr_360px]` + sidebar slot) and export from layout index
- Rewrite: `src/app/services/[id]/apply/page.tsx` (≤ 60 lines: params, service lookup, `<ApplyWizard serviceId … />`), `src/app/contact/ContactContent.tsx`, `src/app/status/StatusContent.tsx`, `src/app/services/success/page.tsx`
- Create: `src/lib/content/contact.ts`, `status.ts`, `success.ts`
- Test: `src/components/apply/__tests__/ApplyWizard.test.tsx` — renders step 1 with `#serviceArea` select and labels `Monthly Net Income`, `Desired Loan Amount`; clicking `Next` with empty income shows the `fillRequired` toast text; after filling step 1 and clicking `Next`, step 2 shows `Full Name`, `Phone Number`, `Email Address` and an `Employed` button; mock `applicationsAPI.createPublic` to resolve `{ data: { id: 'GC1' } }` and assert `router.push` is called with `/services/success?service=1&ref=GC1` after `Submit Application`.

**Hard constraints:** field ids/labels/button texts from Global Constraints; `ApplyWizard` keeps `loanApplicationSchema`/`validateForm`/`getFieldError` from `@/lib/validation`; POST body unchanged; `router.push` target unchanged; success page keeps `Application Submitted!` heading and `ReferenceDetailsClient`'s `<code>` as the first `<code>`; the status page keeps its `<code>GC…</code>` hint. `ReferenceDetailsClient` `aria-label` moves into `success.ts` (`copyReference: 'Copy reference' / 'Salin rujukan'`) and is passed as a prop.

Recipe: `FormLayout` for apply/contact/status; the wizard `Card` holds `Stepper` (3 steps, current in primary, done with check icon, mobile shows `Step N of 3`) then the active step then the `Back`/`Next`/`Submit Application` row; sidebar = `ApplySidebar` (apply), contact info + hours card (contact), "how to find your reference" card (status). Success page: `PageHeader` centered with a success icon, reference `Card`, next-steps `ol`, documents checklist, WhatsApp block, two buttons, `ClosingCta` omitted (page is terminal) — instead a plain `Section` with home / eligibility buttons.

- [ ] Steps: failing wizard test → run → split + migrate → `npx vitest run src/components/apply && npx tsc --noEmit && npm run lint` → `wc -l src/app/services/[id]/apply/page.tsx` ≤ 60 and `ApplyWizard.tsx` ≤ 300 → build/start → run **all** Playwright specs (funnel spec exercises the wizard) → screenshots `/services/1/apply` 390/1280 → commit `feat(forms): FormLayout; apply wizard split into steps; contact, status, success restyled`.

---

### Task 10: T7 — Legal pages + system pages

**Files:**
- Create: `src/lib/content/legal/types.ts` (`LegalClause = { id: string; title: string; paragraphs?: string[]; list?: string[] }`, `LegalDoc = { path: string; content: Record<Language, { title: string; lede: string; lastUpdated: string; clauses: LegalClause[]; contact: { title: string; body: string } }> }`), `privacy.ts`, `terms.ts`, `disclaimer.ts` (disclaimer's keyed sections normalised into the clause array in their current order)
- Create: `src/components/legal/LegalPage.tsx` — `PageHeader` (breadcrumbs `[Home, title]`, meta = `Last updated · {lastUpdated}`) → `Section` → `Container size="wide"` → `grid lg:grid-cols-[240px_minmax(0,680px)]` with `TableOfContents containerId="legal-body"` in a sticky left `aside` and `Prose id="legal-body"` on the right rendering `<h2 id={clause.id}>{index+1}. {title}</h2>` + paragraphs + list, then the contact block; no `ClosingCta` (legal pages end quietly with a bordered contact card).
- Rewrite: `src/app/privacy/page.tsx`, `terms/page.tsx`, `disclaimer/page.tsx` (metadata + `WebPageJsonLd` kept), `src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/global-error.tsx`
- Test: `src/components/legal/__tests__/LegalPage.test.tsx` — renders privacy doc, asserts one `h1`, six numbered `h2`s (`1. …`…`6. …`), and the `lastUpdated` text.

System pages: centered `Section` with `Container size="prose"`: eyebrow (`404` / `Error`), `h1`, one sentence, two buttons (home `default`, WhatsApp `outline`); `error.tsx` keeps the cookie-based language detection and `reset`; `global-error.tsx` keeps its own `<html><body>` and inlines minimal styles (no Tailwind guarantee) — plain centered text + two links.

- [ ] Steps: failing test → run → build → `npx vitest run src/components/legal && npx tsc --noEmit && npm run lint` → legacy grep on the six files = 0 → build/start → smoke e2e (`/privacy`, `/terms`, `/disclaimer`, and `/this-page-does-not-exist` returns 404 with one `h1`: add this route to the smoke spec with `expect(res?.status()).toBe(404)`) → screenshots `/terms` 390/1280 → commit `feat(legal): LegalPage with TOC and numbered clauses; system pages restyled`.

---

### Task 11: Cleanup — orphans, dependencies, dark variants, deferred Phase-1 minors

**Files:**
- Delete: `src/components/AmortizationSchedule.tsx`, `LoanPaymentTable.tsx`, `BankPartners.tsx`, `AreasWeServe.tsx`, `TrustBadges.tsx`, `LoadingSkeleton.tsx`, `CaseStudies.tsx`, `finance/ComparisonTable.tsx`, `finance/RegulatoryInfo.tsx`, `finance/InsightsSection.tsx`, `finance/AdvisorsSection.tsx`, `ui/avatar.tsx`, `ui/navigation-menu.tsx`, `ui/collapsible.tsx`; remove the `finance/` directory if empty.
- Modify: `package.json` via `npm uninstall zustand @radix-ui/react-avatar @radix-ui/react-navigation-menu @radix-ui/react-collapsible @radix-ui/react-progress @tanstack/react-query`; `src/components/Providers.tsx` (drop `QueryClientProvider`; keep `LanguageProvider`).
- Modify: every remaining `dark:` occurrence (`grep -rn "dark:" src` must print nothing): `services/data.ts` (16 — the gradient/colour maps: replace with token classes `bg-primary-soft text-primary` etc.), `ui/tabs.tsx`, `ui/checkbox.tsx`, `ui/textarea.tsx`, `ui/dropdown-menu.tsx`, `faq/FaqContent.tsx`, `contact/ContactContent.tsx` (the last two should already be clean after Tasks 4/9 — verify). Then delete the `@custom-variant dark (&:is(.dark *));` line from `globals.css`.
- Modify (Phase-1 deferred minors): `src/app/layout.tsx` remove `pb-20 lg:pb-0` from `<main>` and instead render a spacer inside `StickyMobileCTA` (`<div aria-hidden className="h-20 lg:hidden" />` returned as a fragment sibling before the fixed bar, only when the bar is rendered); `src/components/home/CalculatorSection.tsx` split so that only a new `CalculatorTabs.tsx` (client) holds `Tabs` and the section/header stay server; `src/components/ui/button.tsx` add size `inline: 'h-auto px-0'` and remove `h-auto px-0` from the `link` variant; `src/components/QuickLeadCapture.tsx` drop the dead `variant='sheet'` branch and the `variant` prop (keep `className`, `onSuccess`); `src/components/home/Faq.tsx` use `Container className="max-w-[760px]"` without `size="prose"`; `HowItWorks.tsx` remove the duplicated `flex flex-col gap-3` from the inner `Reveal`.
- Test: extend `src/components/layout/__tests__/sticky-cta.test.tsx` with a case that the spacer is absent on `/contact`.

- [ ] Steps: delete orphans (`git rm`), uninstall deps, edit Providers, strip `dark:` file by file, remove the custom-variant line, apply the minors, then:
```bash
grep -rnE "dark:|surface-card|hero-grid|btn-gradient|gradient-text|card-hover|section-accent-top|mesh-bg|hero-backdrop|\bgrain\b|animated-underline|fade-in-up|stagger-" src ; echo "legacy exit=$?"   # expect 1 (no matches)
grep -rn "AmortizationSchedule\|LoanPaymentTable\|BankPartners\|AreasWeServe\|TrustBadges\|LoadingSkeleton\|CaseStudies\|ComparisonTable\|RegulatoryInfo\|InsightsSection\|AdvisorsSection\|react-query\|zustand" src ; echo "orphan exit=$?"   # expect 1
npx vitest run && npx tsc --noEmit && npm run lint
```
→ commit `chore(frontend): remove orphaned components, unused deps and all dark:/legacy classes; close Phase-1 minors`.

---

### Task 12: Final verification — full e2e, screenshots, Lighthouse

**Files:**
- Modify: `e2e/smoke.spec.ts` — derive the route list from `src/app/sitemap.ts`'s static entries plus one sample of each dynamic family (`/blog/personal-loan-malaysia-complete-guide-2026`, `/loan-guides/topics/bad-credit-loan-options`, `/loans/my/selangor`, `/services/1/apply`), and add the `ms` variants of `/`, `/loans/personal`, `/blog`, `/faq` (they resolve by cookie today: set `context.addCookies([{ name: 'gc_lang', value: 'ms', url: baseURL }])` for a second `describe` block and assert the `<html lang="ms">`). Every route: 200 + exactly one `h1` + no console errors (`page.on('console', …)` collecting `error` messages; expect `[]`).
- Create: `scripts/screenshot-routes.mjs` — Playwright script that visits every smoke route at 390×844 and 1280×900, scrolls to bottom to trigger reveals, then captures full-page PNGs to `.superpowers/screens/<route>-<w>.png`.
- Create: `scripts/lighthouse.sh` — runs `npx lighthouse <url> --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=…` for `/`, `/loans/personal`, `/blog/personal-loan-malaysia-complete-guide-2026`, `/services/1/apply` (mobile preset too), prints the four scores per URL.

- [ ] Steps:
  1. `npx vitest run && npx tsc --noEmit && npm run lint`.
  2. `npm run build` (must succeed; note bundle sizes from the output for `/` and `/blog/[slug]`).
  3. Start `npm run start`; `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npx playwright test --project=chromium` — all specs green.
  4. `node scripts/screenshot-routes.mjs`; open every 390 PNG and every 1280 PNG (Read tool) and list any route with: horizontal overflow, an unstyled block, two dark bands, a missing `h1`, text overlapping the sticky bar. Fix each finding in place (minimal), re-run the affected smoke test, and list fixes in the report.
  5. `bash scripts/lighthouse.sh`; compare against the scores in `../lighthouse-report-prod.html` (search the file for `"performance"` and `"accessibility"` category scores in its embedded JSON). Acceptance: Accessibility ≥ 95 on all four; Performance ≥ the prod report's value for `/`. If accessibility < 95, fix the reported audits (contrast, names, landmarks) and re-run.
  6. Kill the server. Commit `test: sitemap-driven smoke e2e, route screenshots, lighthouse script; phase-2 verification`.

---

## Self-review against the spec

- **§4 primitives**: PageHeader, Breadcrumbs, Prose, TableOfContents, EmptyState, FilterBar → Task 1. ✔
- **§5 T1** → Tasks 5–6 (`LoanProductPage`, about/partners/verify-us/services). **T2** → Tasks 2–3 (blog, guides, topics, editorial). **T3** → Task 7. **T4** → Task 4. **T5** (incl. `/compare` merge + redirects) → Task 8. **T6** (incl. apply split, locked ids) → Task 9. **T7** → Task 10. System pages → Task 10. ✔
- **§7 copy**: every migration moves copy to `lib/content/**`, both languages, metadata/JSON-LD untouched. ✔
- **§8 cleanup** (orphans, `next-themes`/`confetti` already gone, unused deps) → Task 11; `dark:` removal + custom-variant deletion → Task 11. ✔
- **§9 step 8 / §10 acceptance** (lint, vitest, Playwright, smoke over sitemap, 390/1280 screenshots, Lighthouse ≥ 95 a11y) → Task 12. Navbar/Footer/apply line caps → Tasks 9 (apply) and already met (nav/footer). ✔
- **Type consistency**: `BreadcrumbItem { label; href? }` used by PageHeader/ArticleLayout/ListingShell; `GuideDoc/GuideContent/GuideSection` as defined in Task 3; `LoanProductDoc/LoanProductContent` in Task 5; `LegalDoc/LegalClause` in Task 10; `ClosingCta` props (`title?`, `lede?`, `primaryHref?`, `primaryLabel?`) used identically in Tasks 5–9. `ListingShell/CardGrid/ListingCard` exported from `@/components/listings` and reused in Task 6 (about services overview) and Task 8 (eligibility resources). ✔
- **Placeholders**: none — every task names files, code or an exact recipe, a test, a verification command and a commit message.
