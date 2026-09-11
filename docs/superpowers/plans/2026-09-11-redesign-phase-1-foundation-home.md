# Redesign Phase 1: Foundation + Global Chrome + Home — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the design tokens, fonts, global chrome (navbar, footer, floating widgets) and rebuild the homepage as 8 sections in the "Mono + Electric" visual direction, leaving every other route rendering (unstyled-but-working) for Phase 2.

**Architecture:** Tailwind v4 CSS-first tokens in `globals.css` drive shadcn primitives (`components/ui`) and a new set of layout primitives (`components/layout`). The homepage is composed from server components in `components/home/*` fed by a single bilingual content object in `lib/content/home.ts`. The only client islands are the lead form, the calculator, the FAQ accordion, the navbar and the two floating CTAs.

**Tech Stack:** Next.js 16 (App Router, `--webpack` build), React 19, Tailwind v4 (`@tailwindcss/postcss`), shadcn/Radix, framer-motion 12, lucide-react, vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-11-frontend-redesign-design.md`

## Global Constraints

- Work only inside `frontend/`. Run every command from `/Users/User/project/hugo/frontend` unless stated.
- No dark mode. No `.dark` selector, no `next-themes`, no `dark:` Tailwind variants in new code.
- Single accent colour `#2563eb`. Green only for "approved/strong" states, amber only for risk notes. No gold, no gradient text.
- All internal links go through `LocaleLink` (client) or `localeHref(language, path)` (server). Never a bare `<Link href="/x">` for an internal path.
- Copy lives in `{ en: {...}, ms: {...} }` objects, never inline JSX strings, for every user-visible string.
- Keep these e2e-locked strings/ids exactly: nav link text `Apply Now`; `/services` heading `Select a Loan Product`; apply form `#serviceArea` `<select>`, labels `Monthly Net Income` / `Desired Loan Amount` / `Full Name` / `Phone Number` / `Email Address`, buttons `Next` / `Employed` / `Submit Application`; success page first `<code>` = reference id, heading contains `Application Submitted`.
- Keep these unit-test-locked strings in `PreApprovalCalculator`: labels `Monthly Net Income`, `Monthly Commitments`; button `Check Eligibility`; texts `Debt Service Ratio`, `Pre-Approved!`, `Apply Now`.
- Section vertical padding only via `<Section>`; never write `py-*` on a `<section>` element in new code.
- Every task ends with `npx tsc --noEmit && npm run lint` passing and a commit. Commit messages end with:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01SbKGsyUx1JzunHf6L7UNfd
  ```

---

## File Map

| Path | Responsibility |
|---|---|
| `src/app/globals.css` | Tokens, base typography, `.container`, `.eyebrow`, toaster vars. Nothing else. |
| `src/app/layout.tsx` | Fonts (Geist / Geist Mono / Noto Sans SC), metadata, root shell, floating CTAs. |
| `src/components/Providers.tsx` | React Query + LanguageProvider only. |
| `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `sonner.tsx` | shadcn primitives re-themed. |
| `src/components/layout/Container.tsx` | Width primitive (`default` 1120 / `prose` 680 / `wide` 1280). |
| `src/components/layout/Section.tsx` | Vertical rhythm + `tone` (`default` / `alt` / `inverse`). |
| `src/components/layout/SectionHeader.tsx` | eyebrow + h2 + lede (+ optional action). |
| `src/components/layout/Reveal.tsx` | Fade-up on viewport entry, reduced-motion aware. |
| `src/components/layout/Stat.tsx` | Mono numeral + label. |
| `src/components/layout/WhatsAppFab.tsx` | Desktop-only floating WhatsApp button. |
| `src/components/layout/StickyMobileCTA.tsx` | Mobile-only bottom bar; hides on hero and on form routes. |
| `src/components/Logo.tsx` | Wordmark. |
| `src/components/Navbar.tsx` | ≤ 220 lines. |
| `src/components/Footer.tsx` | ≤ 180 lines. |
| `src/lib/content/home.ts` | All homepage copy, en + ms. |
| `src/components/home/Hero.tsx`, `HeroCtas.tsx`, `BankLogoRow.tsx` | Section 1. |
| `src/components/QuickLeadCapture.tsx` | 4-field lead form, restyled as the hero UI card. |
| `src/components/home/HowItWorks.tsx` | Section 2. |
| `src/components/home/Products.tsx` | Section 3. |
| `src/components/home/CalculatorSection.tsx`, `PaymentReference.tsx`, `src/components/PreApprovalCalculator.tsx` | Section 4. |
| `src/components/home/Proof.tsx` | Section 5. |
| `src/components/home/Transparency.tsx` | Section 6. |
| `src/components/home/Faq.tsx`, `src/components/sections/FaqAccordion.tsx` | Section 7. |
| `src/components/home/FinalCta.tsx` | Section 8. |
| `src/app/page.tsx` | Composes the 8 sections. |

---

### Task 1: Design tokens, globals.css rewrite, Geist fonts

**Files:**
- Modify: `src/app/globals.css` (replace entire file)
- Modify: `src/app/layout.tsx:1-40` (font imports) and `:45-52` (viewport)

**Interfaces:**
- Produces CSS custom properties consumed by every later task: `--background --surface --surface-alt --border --border-strong --foreground --foreground-muted --foreground-subtle --primary --primary-hover --primary-soft --success --success-soft --warning --warning-soft --destructive --inverse --inverse-foreground`.
- Produces Tailwind utilities: `bg-surface`, `bg-surface-alt`, `text-foreground-muted`, `text-foreground-subtle`, `bg-primary-soft`, `text-success`, `bg-success-soft`, `text-warning`, `bg-warning-soft`, `bg-inverse`, `text-inverse-foreground`, `border-border-strong`, `hover:bg-primary-hover`, `shadow-float`, `shadow-primary`, `font-mono`, `font-display` (alias of sans), `.eyebrow`, `.container`.

- [ ] **Step 1: Replace `src/app/globals.css` with the following complete file**

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  /* ---- colour tokens exposed to Tailwind ---- */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-foreground-muted: var(--foreground-muted);
  --color-foreground-subtle: var(--foreground-subtle);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-card: var(--surface);
  --color-card-foreground: var(--foreground);
  --color-popover: var(--surface);
  --color-popover-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-soft: var(--primary-soft);
  --color-primary-foreground: #ffffff;
  --color-secondary: var(--surface-alt);
  --color-secondary-foreground: var(--foreground);
  --color-muted: var(--surface-alt);
  --color-muted-foreground: var(--foreground-muted);
  --color-accent: var(--primary-soft);
  --color-accent-foreground: var(--foreground);
  --color-success: var(--success);
  --color-success-soft: var(--success-soft);
  --color-warning: var(--warning);
  --color-warning-soft: var(--warning-soft);
  --color-destructive: var(--destructive);
  --color-inverse: var(--inverse);
  --color-inverse-foreground: var(--inverse-foreground);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-input: var(--border);
  --color-ring: var(--primary);

  /* ---- type ---- */
  --font-sans: var(--font-geist), var(--font-cjk), ui-sans-serif, system-ui, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  --font-display: var(--font-geist), var(--font-cjk), ui-sans-serif, system-ui, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* ---- shape ---- */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;

  /* ---- shadow ---- */
  --shadow-float: 0 1px 2px rgb(0 0 0 / 0.04), 0 24px 48px -24px rgb(0 0 0 / 0.18);
  --shadow-primary: 0 8px 24px -8px rgb(37 99 235 / 0.45);
}

:root {
  --radius: 0.5rem;

  --background: #fafafa;
  --surface: #ffffff;
  --surface-alt: #f5f5f5;
  --border: #e5e5e5;
  --border-strong: #d4d4d4;
  --foreground: #0a0a0a;
  --foreground-muted: #525252;
  --foreground-subtle: #737373;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-soft: #eff6ff;
  --success: #16a34a;
  --success-soft: #f0fdf4;
  --warning: #d97706;
  --warning-soft: #fffbeb;
  --destructive: #dc2626;
  --inverse: #0a0a0a;
  --inverse-foreground: #fafafa;
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "ss01", "cv11", "kern";
    font-variant-numeric: lining-nums proportional-nums;
    text-rendering: optimizeLegibility;
  }

  /* Numerals: money, DSR, reference ids */
  :where(table, .tabular, [data-tabular], .num, .metric, .rate, .amount),
  :where(table, .tabular, [data-tabular]) * {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums lining-nums;
    font-feature-settings: "tnum" 1, "lnum" 1, "kern";
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--foreground);
    text-wrap: balance;
  }
  h1 { letter-spacing: -0.04em; line-height: 1.05; }
  h2 { letter-spacing: -0.03em; line-height: 1.1; }
  h3 { letter-spacing: -0.02em; line-height: 1.25; font-weight: 600; }
  h4, h5, h6 { letter-spacing: -0.01em; font-weight: 600; }

  p { text-wrap: pretty; }

  .eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--foreground-subtle);
  }

  :focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  ::selection {
    background: var(--primary-soft);
    color: var(--foreground);
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Width primitive (also used by legacy pages until Phase 2 migrates them) */
.container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
  max-width: 1120px;
}
@media (min-width: 640px) { .container { padding-inline: 1.5rem; } }
@media (min-width: 1024px) { .container { padding-inline: 2rem; } }

/* sonner */
.toaster {
  --normal-bg: var(--surface);
  --normal-text: var(--foreground);
  --normal-border: var(--border);
  --border-radius: 12px;
}
```

- [ ] **Step 2: Update fonts and viewport in `src/app/layout.tsx`**

Replace the three font declarations (`displayFont`, `bodyFont`, `cjkFont`) and the `next/font/google` import with:

```tsx
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const cjkFont = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-cjk",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});
```

Replace the `viewport` export with:

```tsx
export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
```

Replace the `<body className=...>` with:

```tsx
<body className={`${geist.variable} ${geistMono.variable} ${cjkFont.variable} font-sans antialiased`}>
```

- [ ] **Step 3: Verify the removed classes are gone and the app compiles**

Run:
```bash
grep -cE "\.dark|gradient-text|surface-card|hero-grid|mesh-bg|\.grain|section-accent-top|card-hover|btn-gradient" src/app/globals.css
npx tsc --noEmit && npm run lint
```
Expected: first command prints `0`; second exits 0 (warnings allowed, errors not).

- [ ] **Step 4: Smoke-run the dev server**

Run:
```bash
(npm run dev > /tmp/gc-dev.log 2>&1 &) ; sleep 8 ; curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/ ; grep -i "error" /tmp/gc-dev.log | head -5
```
Expected: `200` and no error lines. If Geist is not exported by `next/font/google` in the installed Next version, the dev log shows `Geist is not exported`; in that case use `Inter` with `variable: "--font-geist"` and `Roboto_Mono` with `variable: "--font-geist-mono"` and note it in the commit message. Kill the dev server afterwards: `pkill -f "next dev"`.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat(design): replace tokens with Mono+Electric palette and Geist fonts"
```

---

### Task 2: Re-theme shadcn primitives (Button, Card, Input, Badge)

**Files:**
- Modify: `src/components/ui/button.tsx` (replace file)
- Modify: `src/components/ui/card.tsx:5-16` (Card only)
- Modify: `src/components/ui/input.tsx` (replace file)
- Modify: `src/components/ui/badge.tsx:7-27` (variants)
- Test: `src/components/ui/__tests__/button.test.tsx`

**Interfaces:**
- Produces `Button` variants: `default` (primary blue), `outline` (white + border, the "secondary" style from the spec), `secondary` (soft grey), `ghost`, `link`, `inverse` (white on dark), `destructive`. Sizes: `default` (h-12 mobile / h-11 desktop), `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`.
- Produces `Card` prop `interactive?: boolean`.
- Produces `Badge` variants: `default` (blue soft), `secondary` (grey), `success`, `warning`, `outline`.

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/__tests__/button.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { Card } from '../card';
import { Badge } from '../badge';

describe('re-themed primitives', () => {
  it('primary button uses the blue token and mobile-first height', () => {
    render(<Button>Go</Button>);
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn.className).toContain('bg-primary');
    expect(btn.className).toContain('h-12');
    expect(btn.className).toContain('lg:h-11');
  });

  it('outline button is white with a border', () => {
    render(<Button variant="outline">Go</Button>);
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn.className).toContain('border-border');
    expect(btn.className).toContain('bg-surface');
  });

  it('inverse variant exists', () => {
    render(<Button variant="inverse">Go</Button>);
    expect(screen.getByRole('button', { name: 'Go' }).className).toContain('bg-surface');
  });

  it('card has no shadow and gains hover classes when interactive', () => {
    const { container, rerender } = render(<Card>x</Card>);
    expect(container.firstElementChild?.className).not.toContain('shadow');
    rerender(<Card interactive>x</Card>);
    expect(container.firstElementChild?.className).toContain('hover:-translate-y-0.5');
  });

  it('badge success variant exists', () => {
    render(<Badge variant="success">ok</Badge>);
    expect(screen.getByText('ok').className).toContain('bg-success-soft');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/ui/__tests__/button.test.tsx`
Expected: FAIL (`h-12` missing, `interactive` unknown, `success` variant unknown).

- [ ] **Step 3: Replace `src/components/ui/button.tsx`**

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-primary hover:bg-primary-hover",
        outline: "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-alt",
        secondary: "bg-surface-alt text-foreground hover:bg-border",
        ghost: "text-foreground hover:bg-surface-alt",
        link: "h-auto px-0 text-primary underline-offset-4 hover:underline",
        inverse: "bg-surface text-foreground hover:bg-surface-alt",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-12 px-5 lg:h-11",
        sm: "h-9 rounded-lg px-3.5 text-[13px]",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

- [ ] **Step 4: Update `Card` in `src/components/ui/card.tsx`**

Replace the `Card` function (lines 5–16) with:

```tsx
function Card({
  className,
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6",
        interactive &&
          "transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-border-strong",
        className
      )}
      {...props}
    />
  )
}
```

Leave `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` unchanged.

- [ ] **Step 5: Replace `src/components/ui/input.tsx`**

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-lg border border-border bg-surface px-3.5 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-foreground-subtle md:text-sm",
        "hover:border-border-strong focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Input }
```

- [ ] **Step 6: Update badge variants in `src/components/ui/badge.tsx`**

Replace the `badgeVariants` definition (lines 7–27) with:

```tsx
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors [&>svg]:pointer-events-none [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-soft text-primary",
        secondary: "border-transparent bg-surface-alt text-foreground-muted",
        success: "border-transparent bg-success-soft text-success",
        warning: "border-transparent bg-warning-soft text-warning",
        destructive: "border-transparent bg-destructive text-white",
        outline: "border-border bg-surface text-foreground-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
```

- [ ] **Step 7: Run the test and type-check**

Run: `npx vitest run src/components/ui/__tests__/button.test.tsx && npx tsc --noEmit && npm run lint`
Expected: 5 tests PASS, tsc and lint exit 0.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui
git commit -m "feat(ui): re-theme button, card, input, badge to new tokens"
```

---

### Task 3: Layout primitives (Container, Section, SectionHeader, Reveal, Stat)

**Files:**
- Create: `src/components/layout/Container.tsx`
- Create: `src/components/layout/Section.tsx`
- Create: `src/components/layout/SectionHeader.tsx`
- Create: `src/components/layout/Reveal.tsx`
- Create: `src/components/layout/Stat.tsx`
- Create: `src/components/layout/index.ts`
- Test: `src/components/layout/__tests__/primitives.test.tsx`

**Interfaces:**
- Produces:
  - `Container({ size?: 'default' | 'prose' | 'wide'; className?; children })`
  - `Section({ tone?: 'default' | 'alt' | 'inverse'; compact?: boolean; id?; className?; children; ...sectionProps })`
  - `SectionHeader({ eyebrow?: string; title: ReactNode; lede?: string; align?: 'left' | 'center'; action?: ReactNode; className? })`
  - `Reveal({ children; className?; delay?: number })` — client component
  - `Stat({ value: string; label: string; tone?: 'default' | 'success' | 'primary'; className? })`
  - `index.ts` re-exports all five.

- [ ] **Step 1: Write the failing test**

Create `src/components/layout/__tests__/primitives.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { Container, Section, SectionHeader, Stat } from '..';

describe('layout primitives', () => {
  it('Container applies width by size', () => {
    const { container, rerender } = render(<Container>x</Container>);
    expect(container.firstElementChild?.className).toContain('max-w-[1120px]');
    rerender(<Container size="prose">x</Container>);
    expect(container.firstElementChild?.className).toContain('max-w-[680px]');
  });

  it('Section renders a <section> with rhythm and tone', () => {
    const { container } = render(<Section tone="inverse" id="cta">x</Section>);
    const el = container.querySelector('section#cta');
    expect(el).not.toBeNull();
    expect(el?.className).toContain('py-16');
    expect(el?.className).toContain('lg:py-24');
    expect(el?.className).toContain('bg-inverse');
  });

  it('SectionHeader renders eyebrow, h2 and lede', () => {
    render(<SectionHeader eyebrow="Why us" title="Four things" lede="Because." />);
    expect(screen.getByText('Why us')).toHaveClass('eyebrow');
    expect(screen.getByRole('heading', { level: 2, name: 'Four things' })).toBeInTheDocument();
    expect(screen.getByText('Because.')).toBeInTheDocument();
  });

  it('Stat renders value in mono', () => {
    render(<Stat value="24h" label="Turnaround" />);
    expect(screen.getByText('24h').className).toContain('font-mono');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/layout`
Expected: FAIL — cannot resolve `..` (index.ts does not exist).

- [ ] **Step 3: Create the five components and the index**

`src/components/layout/Container.tsx`:
```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const sizes = {
  default: 'max-w-[1120px]',
  prose: 'max-w-[680px]',
  wide: 'max-w-[1280px]',
} as const;

export function Container({
  size = 'default',
  className,
  children,
}: {
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
```

`src/components/layout/Section.tsx`:
```tsx
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const tones = {
  default: 'bg-background text-foreground',
  alt: 'bg-surface-alt text-foreground',
  inverse: 'bg-inverse text-inverse-foreground',
} as const;

export function Section({
  tone = 'default',
  compact = false,
  className,
  children,
  ...props
}: ComponentProps<'section'> & {
  tone?: keyof typeof tones;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        tones[tone],
        compact ? 'py-10 lg:py-16' : 'py-16 lg:py-24',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
```

`src/components/layout/SectionHeader.tsx`:
```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 lg:mb-14',
        centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="text-[28px] lg:text-4xl">{title}</h2>
        {lede ? <p className="mt-4 text-lg leading-relaxed text-foreground-muted">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
```

`src/components/layout/Reveal.tsx`:
```tsx
'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.28, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
```

`src/components/layout/Stat.tsx`:
```tsx
import { cn } from '@/lib/utils';

const tones = {
  default: 'text-foreground',
  success: 'text-success',
  primary: 'text-primary',
} as const;

export function Stat({
  value,
  label,
  tone = 'default',
  className,
}: {
  value: string;
  label: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className={cn('font-mono text-3xl font-semibold tracking-tight tabular-nums', tones[tone])}>
        {value}
      </span>
      <span className="text-sm text-foreground-subtle">{label}</span>
    </div>
  );
}
```

`src/components/layout/index.ts`:
```ts
export { Container } from './Container';
export { Section } from './Section';
export { SectionHeader } from './SectionHeader';
export { Reveal } from './Reveal';
export { Stat } from './Stat';
```

- [ ] **Step 4: Run tests and type-check**

Run: `npx vitest run src/components/layout && npx tsc --noEmit && npm run lint`
Expected: 4 tests PASS; tsc, lint exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout
git commit -m "feat(layout): add Container, Section, SectionHeader, Reveal, Stat primitives"
```

---

### Task 4: Remove dark mode, floating widget stack, confetti

**Files:**
- Modify: `src/components/Providers.tsx` (replace file)
- Modify: `src/components/ui/sonner.tsx` (replace file)
- Modify: `src/app/layout.tsx` (remove `ClientWidgets`, `ScrollProgress`)
- Modify: `src/app/services/success/ReferenceDetailsClient.tsx` (remove confetti)
- Delete: `src/components/ClientWidgets.tsx`, `src/components/PromoBanner.tsx`, `src/components/ExitIntentPopup.tsx`, `src/components/BackToTop.tsx`, `src/components/WhatsAppButton.tsx`, `src/components/ui/scroll-progress.tsx`, `src/components/finance/StickyMobileCTA.tsx`
- Modify: `package.json` (via `npm uninstall`)

- [ ] **Step 1: Replace `src/components/Providers.tsx`**

```tsx
'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/lib/i18n';
import type { Language } from '@/lib/i18n/translations';

export function Providers({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 2: Replace `src/components/ui/sonner.tsx`**

```tsx
"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-center"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
```

- [ ] **Step 3: Edit `src/app/layout.tsx`**

Delete these two import lines:
```tsx
import { ClientWidgets } from "@/components/ClientWidgets";
import { ScrollProgress } from "@/components/ui/scroll-progress";
```
Delete these two JSX lines inside `<Providers>`:
```tsx
          <ScrollProgress />
          <ClientWidgets />
```
Also remove `suppressHydrationWarning` from `<html>` (it was only there for next-themes).

- [ ] **Step 4: Replace `src/app/services/success/ReferenceDetailsClient.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

type Props = {
  referenceNumber: string;
  note: string;
};

export function ReferenceDetailsClient({ referenceNumber, note }: Props) {
  const [copied, setCopied] = useState(false);

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <code className="font-mono text-lg font-semibold text-primary">{referenceNumber}</code>
        <Button variant="ghost" size="icon-sm" onClick={copyReference} aria-label="Copy reference">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <p className="mt-2 text-xs text-foreground-subtle">{note}</p>
    </>
  );
}
```

- [ ] **Step 5: Delete the widget files and uninstall packages**

```bash
git rm -q src/components/ClientWidgets.tsx src/components/PromoBanner.tsx src/components/ExitIntentPopup.tsx src/components/BackToTop.tsx src/components/WhatsAppButton.tsx src/components/ui/scroll-progress.tsx src/components/finance/StickyMobileCTA.tsx
npm uninstall next-themes canvas-confetti @types/canvas-confetti
```
(`@types/canvas-confetti` may not be present; npm prints a warning, not an error.)

- [ ] **Step 6: Verify nothing else references the removed modules**

Run:
```bash
grep -rn "next-themes\|canvas-confetti\|ClientWidgets\|scroll-progress\|PromoBanner\|ExitIntentPopup\|BackToTop\|WhatsAppButton\|finance/StickyMobileCTA" src ; echo "exit=$?"
npx tsc --noEmit && npm run lint
```
Expected: grep prints nothing and `exit=1`; tsc and lint exit 0.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore(frontend): drop dark mode, promo/exit widgets, confetti"
```

---

### Task 5: WhatsAppFab + StickyMobileCTA + root layout wiring

**Files:**
- Create: `src/components/layout/WhatsAppFab.tsx`
- Create: `src/components/layout/StickyMobileCTA.tsx`
- Modify: `src/components/layout/index.ts`
- Modify: `src/app/layout.tsx` (mount both)
- Test: `src/components/layout/__tests__/sticky-cta.test.tsx`

**Interfaces:**
- Consumes `useLanguage()` from `@/lib/i18n` (returns `{ language: 'en' | 'ms', setLanguage }`), `COMPANY.whatsappLink`, `PATHS.eligibilityTest`, `trackEvent(name, params)`.
- Produces `WhatsAppFab()` and `StickyMobileCTA()` (no props). `StickyMobileCTA` hides when `#hero` is in view and on routes matching `/(ms/)?(services/[^/]+/apply|services/success|contact|status)`.

- [ ] **Step 1: Write the failing test**

Create `src/components/layout/__tests__/sticky-cta.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

const pathnameMock = vi.fn(() => '/');
vi.mock('next/navigation', () => ({ usePathname: () => pathnameMock() }));

import { StickyMobileCTA } from '../StickyMobileCTA';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('StickyMobileCTA', () => {
  it('renders both CTAs on content pages', () => {
    pathnameMock.mockReturnValue('/loans/personal');
    wrap(<StickyMobileCTA />);
    expect(screen.getByRole('link', { name: /Check eligibility/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp/i })).toBeInTheDocument();
  });

  it('does not render on form routes', () => {
    pathnameMock.mockReturnValue('/services/1/apply');
    const { container } = wrap(<StickyMobileCTA />);
    expect(container.firstChild).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/layout/__tests__/sticky-cta.test.tsx`
Expected: FAIL — module `../StickyMobileCTA` not found.

- [ ] **Step 3: Create `src/components/layout/WhatsAppFab.tsx`**

```tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

const label = { en: 'Chat on WhatsApp', ms: 'Sembang di WhatsApp' } as const;

export function WhatsAppFab() {
  const { language } = useLanguage();
  return (
    <a
      href={COMPANY.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label[language]}
      onClick={() => trackEvent('whatsapp_fab_click', { language })}
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-inverse text-inverse-foreground shadow-float transition-transform hover:-translate-y-0.5 lg:flex"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
```

- [ ] **Step 4: Create `src/components/layout/StickyMobileCTA.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { useLanguage } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

const copy = {
  en: { primary: 'Check eligibility', whatsapp: 'WhatsApp' },
  ms: { primary: 'Semak kelayakan', whatsapp: 'WhatsApp' },
} as const;

const HIDDEN_ROUTES = /^\/(ms\/)?(services\/[^/]+\/apply|services\/success|contact|status)(\/|$)/;

export function StickyMobileCTA() {
  const { language } = useLanguage();
  const pathname = usePathname() ?? '/';
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || typeof IntersectionObserver === 'undefined') {
      setHeroVisible(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  if (HIDDEN_ROUTES.test(pathname)) return null;
  const t = copy[language];

  return (
    <div
      className={
        'fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-border bg-surface/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-float backdrop-blur transition-transform duration-200 lg:hidden ' +
        (heroVisible ? 'translate-y-full' : 'translate-y-0')
      }
    >
      <LocaleLink
        href={PATHS.eligibilityTest}
        onClick={() => trackEvent('sticky_cta_click', { language, target: 'eligibility' })}
        className="inline-flex h-12 items-center justify-center rounded-[10px] bg-primary text-sm font-semibold text-primary-foreground"
      >
        {t.primary}
      </LocaleLink>
      <a
        href={COMPANY.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('sticky_cta_click', { language, target: 'whatsapp' })}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-border bg-surface text-sm font-semibold text-foreground"
      >
        <MessageCircle className="size-4" />
        {t.whatsapp}
      </a>
    </div>
  );
}
```

- [ ] **Step 5: Export and mount**

Append to `src/components/layout/index.ts`:
```ts
export { WhatsAppFab } from './WhatsAppFab';
export { StickyMobileCTA } from './StickyMobileCTA';
```

In `src/app/layout.tsx` add the import:
```tsx
import { WhatsAppFab, StickyMobileCTA } from "@/components/layout";
```
and inside `<Providers>` after the closing `</div>` of the flex column and before `<Toaster />`:
```tsx
          <WhatsAppFab />
          <StickyMobileCTA />
```
Also change `<main id="main-content" className="flex-1">` to `<main id="main-content" className="flex-1 pb-20 lg:pb-0">` so content is not hidden behind the mobile bar.

- [ ] **Step 6: Run tests and type-check**

Run: `npx vitest run src/components/layout && npx tsc --noEmit && npm run lint`
Expected: all PASS, exit 0.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout src/app/layout.tsx
git commit -m "feat(layout): add desktop WhatsApp FAB and mobile sticky CTA bar"
```

---

### Task 6: Navbar rewrite

**Files:**
- Modify: `src/components/Logo.tsx` (replace file)
- Modify: `src/components/Navbar.tsx` (replace file)
- Test: `src/components/__tests__/Navbar.test.tsx`

**Interfaces:**
- Consumes `LanguageSwitcher` (unchanged), `LocaleLink`, `localeHref`, `PATHS`, `COMPANY`, `Sheet*` from `@/components/ui/sheet`, `DropdownMenu*` from `@/components/ui/dropdown-menu`, `Button`.
- Produces `Navbar()` (client, no props). Link text `Apply Now` must exist as an `<a>`.

- [ ] **Step 1: Write the failing test**

Create `src/components/__tests__/Navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders the stable Apply Now link and top-level items', () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>,
    );
    expect(screen.getAllByRole('link', { name: /Apply Now/i })[0]).toHaveAttribute('href', '/eligibility-test');
    expect(screen.getByRole('button', { name: /Loans/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/loan-guides');
    expect(screen.getByRole('button', { name: /Open menu/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/__tests__/Navbar.test.tsx`
Expected: FAIL (old navbar has no `Guides` link and a different menu label).

- [ ] **Step 3: Replace `src/components/Logo.tsx`**

```tsx
import Image from 'next/image';
import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Logo({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src={COMPANY.logo}
        alt=""
        width={size}
        height={size}
        className="rounded-md object-contain"
        priority
      />
      <span className="text-[17px] font-bold tracking-tight text-foreground">
        GURU <span className="font-semibold text-foreground-muted">Credits</span>
      </span>
      <span className="sr-only">{COMPANY.name}</span>
    </span>
  );
}
```

- [ ] **Step 4: Replace `src/components/Navbar.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  Wallet,
  Building2,
  Layers,
  Zap,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LocaleLink } from '@/components/LocaleLink';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
            <SheetContent side="right" className="w-full border-l-0 bg-surface p-0 sm:max-w-sm">
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
```

- [ ] **Step 5: Confirm `SheetTitle` and `DropdownMenuSeparator` exist**

Run: `grep -n "SheetTitle\|DropdownMenuSeparator" src/components/ui/sheet.tsx src/components/ui/dropdown-menu.tsx | head`
Expected: both names exported. If `SheetTitle` is missing, add to `sheet.tsx`:
```tsx
function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("text-foreground font-semibold", className)} {...props} />
}
```
and add it to the export list.

- [ ] **Step 6: Run test, type-check, line count**

Run: `npx vitest run src/components/__tests__/Navbar.test.tsx && npx tsc --noEmit && npm run lint && wc -l src/components/Navbar.tsx`
Expected: PASS, exit 0, line count ≤ 220.

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.tsx src/components/Logo.tsx src/components/__tests__/Navbar.test.tsx src/components/ui/sheet.tsx
git commit -m "feat(nav): rewrite navbar as single row with Loans dropdown and full-screen mobile sheet"
```

---

### Task 7: Footer rewrite

**Files:**
- Modify: `src/components/Footer.tsx` (replace file)
- Test: `src/components/__tests__/Footer.test.tsx`

**Interfaces:**
- Consumes `useLanguage`, `LocaleLink`, `PATHS`, `COMPANY`, `Logo`.
- Produces `Footer()` (client, no props). No newsletter form, no `newsletterAPI` import.

- [ ] **Step 1: Write the failing test**

Create `src/components/__tests__/Footer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders link groups, regulatory line and no newsletter form', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Loans' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Company' })).toBeInTheDocument();
    expect(screen.getByText(/Moneylenders Act 1951/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Bank Negara Malaysia/ })).toHaveAttribute('target', '_blank');
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/__tests__/Footer.test.tsx`
Expected: FAIL (old footer has a newsletter `textbox`).

- [ ] **Step 3: Replace `src/components/Footer.tsx`**

```tsx
'use client';

import { ExternalLink, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { PATHS } from '@/lib/i18n/routes';

type Link = { label: string; href: string };

const content = {
  en: {
    blurb: 'Licensed loan guidance for Malaysian borrowers. Written eligibility reviews within 24 hours.',
    groups: [
      {
        title: 'Loans',
        links: [
          { label: 'Personal Loan', href: PATHS.loans.personal },
          { label: 'Business Loan', href: PATHS.services },
          { label: 'Debt Consolidation', href: PATHS.loans.debtConsolidation },
          { label: 'Emergency Loan', href: PATHS.loans.emergency },
          { label: 'Loans by state', href: PATHS.serviceAreas },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Loan Guides', href: PATHS.loanGuides },
          { label: 'Blog', href: PATHS.blog },
          { label: 'Tools', href: PATHS.tools },
          { label: 'Required Documents', href: PATHS.documents },
          { label: 'Glossary', href: PATHS.glossary },
          { label: 'FAQ', href: PATHS.faq },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: PATHS.about },
          { label: 'Verify Us', href: PATHS.verifyUs },
          { label: 'Bank Partners', href: PATHS.partners },
          { label: 'Contact', href: PATHS.contact },
          { label: 'Application Status', href: PATHS.status },
          { label: 'Editorial Policy', href: PATHS.editorialPolicy },
        ],
      },
    ] as { title: string; links: Link[] }[],
    contact: 'Contact',
    regulatory:
      'GURU Credits operates under a Moneylenders Act 1951 licence issued by KPKT. Rates shown are indicative flat rates per annum within statutory caps; your actual rate depends on your credit profile. No payment is collected on this website.',
    official: 'Official resources',
    legal: [
      { label: 'Privacy', href: PATHS.privacy },
      { label: 'Terms', href: PATHS.terms },
      { label: 'Disclaimer', href: PATHS.disclaimer },
    ] as Link[],
    rights: 'All rights reserved.',
  },
  ms: {
    blurb: 'Panduan pinjaman berlesen untuk peminjam Malaysia. Semakan kelayakan bertulis dalam 24 jam.',
    groups: [
      {
        title: 'Pinjaman',
        links: [
          { label: 'Pinjaman Peribadi', href: PATHS.loans.personal },
          { label: 'Pinjaman Perniagaan', href: PATHS.services },
          { label: 'Penyatuan Hutang', href: PATHS.loans.debtConsolidation },
          { label: 'Pinjaman Kecemasan', href: PATHS.loans.emergency },
          { label: 'Pinjaman ikut negeri', href: PATHS.serviceAreas },
        ],
      },
      {
        title: 'Sumber',
        links: [
          { label: 'Panduan Pinjaman', href: PATHS.loanGuides },
          { label: 'Blog', href: PATHS.blog },
          { label: 'Alat', href: PATHS.tools },
          { label: 'Dokumen Diperlukan', href: PATHS.documents },
          { label: 'Glosari', href: PATHS.glossary },
          { label: 'Soalan Lazim', href: PATHS.faq },
        ],
      },
      {
        title: 'Syarikat',
        links: [
          { label: 'Tentang', href: PATHS.about },
          { label: 'Sahkan Kami', href: PATHS.verifyUs },
          { label: 'Rakan Bank', href: PATHS.partners },
          { label: 'Hubungi', href: PATHS.contact },
          { label: 'Status Permohonan', href: PATHS.status },
          { label: 'Dasar Editorial', href: PATHS.editorialPolicy },
        ],
      },
    ] as { title: string; links: Link[] }[],
    contact: 'Hubungi',
    regulatory:
      'GURU Credits beroperasi di bawah lesen Akta Pemberi Pinjam Wang 1951 yang dikeluarkan oleh KPKT. Kadar yang dipaparkan adalah kadar rata indikatif setahun dalam had berkanun; kadar sebenar bergantung pada profil kredit anda. Tiada bayaran dikutip di laman web ini.',
    official: 'Sumber rasmi',
    legal: [
      { label: 'Privasi', href: PATHS.privacy },
      { label: 'Terma', href: PATHS.terms },
      { label: 'Penafian', href: PATHS.disclaimer },
    ] as Link[],
    rights: 'Hak cipta terpelihara.',
  },
} as const;

const OFFICIAL = [
  { label: 'Bank Negara Malaysia', href: 'https://www.bnm.gov.my' },
  { label: 'AKPK', href: 'https://www.akpk.org.my' },
  { label: 'BNMTELELINK 1-300-88-5465', href: 'https://www.bnm.gov.my/bnmtelelink' },
];

export function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">{t.blurb}</p>
          <div className="mt-5 flex gap-2">
            {[
              { href: COMPANY.facebook, Icon: Facebook, label: 'Facebook' },
              { href: COMPANY.instagram, Icon: Instagram, label: 'Instagram' },
              { href: COMPANY.whatsappLink, Icon: MessageCircle, label: 'WhatsApp' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {t.groups.map((group) => (
          <div key={group.title} className="lg:col-span-2">
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <LocaleLink href={link.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                    {link.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold">{t.contact}</h3>
          <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
            <li><a href={COMPANY.phoneLink} className="flex items-start gap-2 hover:text-foreground"><Phone className="mt-0.5 size-4 shrink-0" />{COMPANY.phone}</a></li>
            <li><a href={COMPANY.emailLink} className="flex items-start gap-2 hover:text-foreground"><Mail className="mt-0.5 size-4 shrink-0" />{COMPANY.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /><span>{COMPANY.location}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col gap-4 py-6 text-xs text-foreground-subtle">
          <p className="max-w-4xl leading-relaxed">{t.regulatory}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-semibold uppercase tracking-wider">{t.official}</span>
            {OFFICIAL.map((o) => (
              <a key={o.href} href={o.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                {o.label}
                <ExternalLink className="size-3" />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} {COMPANY.name}. {t.rights}</span>
            <div className="flex gap-4">
              {t.legal.map((l) => (
                <LocaleLink key={l.href} href={l.href} className="hover:text-foreground">{l.label}</LocaleLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test, type-check, line count**

Run: `npx vitest run src/components/__tests__/Footer.test.tsx && npx tsc --noEmit && npm run lint && wc -l src/components/Footer.tsx`
Expected: PASS, exit 0, ≤ 180 lines.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/__tests__/Footer.test.tsx
git commit -m "feat(footer): rewrite as two-band footer, drop newsletter"
```

---

### Task 8: New homepage content + placeholder page + remove old home sections

**Files:**
- Modify: `src/lib/content/home.ts` (replace file)
- Modify: `src/app/page.tsx` (replace file with placeholder)
- Delete: `src/components/sections/HeroSection.tsx`, `HeroIntro.tsx`, `HeroVisual.tsx`, `HeroSpotlight.tsx`, `MagneticCTA.tsx`, `AnimatedCounter.tsx`, `sections/LicensedTrustBar.tsx`, `finance/Rm30DeliverablesSection.tsx`, `finance/RateDisclosure.tsx`, `ProcessTimeline.tsx`, `ProcessTimelineSteps.tsx`, `sections/WhyUsSection.tsx`, `finance/RiskWarning.tsx`, `finance/TrustSecuritySection.tsx`, `finance/TransparencyDisclosure.tsx`, `finance/SecurityBadges.tsx`, `sections/FaqSection.tsx`, `sections/FinalCtaSection.tsx`, `sections/LoanProductsSection.tsx`, `sections/LoanProductCard.tsx`, `sections/BlogSection.tsx`, `sections/ResourcesSection.tsx`, `finance/PaymentReferenceTable.tsx`, `lazy/PreApprovalCalculatorLazy.tsx`, `lazy/TrustSectionLazy.tsx`, `lazy/TestimonialCarouselLazy.tsx`, `TrustSection.tsx`, `TestimonialCarousel.tsx`
- Keep (used elsewhere): `VerifyTrustCard.tsx`, `CaseStudies.tsx`, `sections/FaqAccordion.tsx`, `PreApprovalCalculator.tsx`, `TrustPanel.tsx`, `QuickLeadCapture.tsx`.

**Interfaces:**
- Produces `homeContent: Record<Language, HomeContent>` and the `HomeContent` type below. Tasks 9–13 consume it exactly.

- [ ] **Step 1: Replace `src/lib/content/home.ts`**

```ts
import type { Language } from '@/lib/i18n/translations';
import { PATHS } from '@/lib/i18n/routes';

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    logosLabel: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: { title: string; description: string }[];
    deliverablesTitle: string;
    deliverables: { title: string; description: string }[];
  };
  products: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    items: { title: string; description: string; href: string }[];
  };
  calculator: {
    eyebrow: string;
    title: string;
    lede: string;
    tabs: { estimate: string; reference: string };
    reference: { title: string; amountHeader: string; yearsAbbr: string; perMonth: string; note: string };
  };
  proof: {
    eyebrow: string;
    title: string;
    points: { title: string; description: string }[];
    casesTitle: string;
    labels: { situation: string; action: string; outcome: string };
    cases: { name: string; location: string; situation: string; action: string; outcome: string; quote: string }[];
    disclaimer: string;
  };
  transparency: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string; href: string; cta: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    viewAll: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    lede: string;
    primary: string;
    secondary: string;
    note: string;
  };
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    hero: {
      eyebrow: 'Licensed lender · Moneylenders Act 1951',
      title: 'Know if you will be approved',
      titleAccent: 'before you apply.',
      lede: 'A two-minute check of your income, commitments and CCRIS/CTOS position. We tell you the workable route, in writing, within 24 hours.',
      primaryCta: 'Start the 2-minute check',
      secondaryCta: 'WhatsApp an advisor',
      trustLine: 'No payment on this website. The RM30 CTOS fee is settled only through our official WhatsApp.',
      logosLabel: 'Lenders we work with',
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Three steps. One written answer.',
      lede: 'You share your numbers, we read your file the way a credit officer would, and you get a plan you can act on.',
      steps: [
        { title: 'Share four details', description: 'WhatsApp number, state, loan type and income band. Two minutes, no documents yet.' },
        { title: 'We read your file', description: 'DSR recalculated, CCRIS and CTOS signals interpreted, lender fit assessed. Written up within 24 hours.' },
        { title: 'Get your route', description: 'A suggested amount range, the documents to send first, and next steps on our official WhatsApp.' },
      ],
      deliverablesTitle: 'Within 48 hours you have',
      deliverables: [
        { title: 'Written eligibility review', description: 'Profile snapshot, DSR, and the issues most likely to affect approval.' },
        { title: 'Priority document checklist', description: 'What to send first, what can wait, and what would slow the case down.' },
        { title: 'Suggested route and range', description: 'The product and amount that look workable for your commitment level.' },
      ],
    },
    products: {
      eyebrow: 'Loan products',
      title: 'Structured around your credit file.',
      lede: 'Rates within statutory caps. Tenure from one to seven years. Every offer comes with the reasoning behind it.',
      cta: 'Learn more',
      items: [
        { title: 'Personal Loan', description: 'Medical bills, short-term cash flow, or planned household spending. Up to RM100,000.', href: PATHS.loans.personal },
        { title: 'Business Loan', description: 'Working capital and expansion financing for SMEs. Bank-statement based, no audited accounts needed.', href: PATHS.services },
        { title: 'Debt Consolidation', description: 'Combine high-interest debts into one payment and bring your DSR down before you apply.', href: PATHS.loans.debtConsolidation },
      ],
    },
    calculator: {
      eyebrow: 'Calculator',
      title: 'See your DSR before the bank does.',
      lede: 'Enter income and commitments. Results update live. Nothing is stored.',
      tabs: { estimate: 'Your estimate', reference: 'Payment reference' },
      reference: {
        title: 'Monthly instalment at 4.88% flat p.a.',
        amountHeader: 'Loan amount',
        yearsAbbr: 'yrs',
        perMonth: '/month',
        note: 'Reference only. Figures rounded to the nearest RM; processing, stamp duty and insurance not included. Your actual offer depends on your profile and DSR.',
      },
    },
    proof: {
      eyebrow: 'Why us',
      title: 'Four things we do that brokers cannot.',
      points: [
        { title: 'You borrow from the lender', description: 'Licensed under the Moneylenders Act 1951. No middleman, no commission chasing.' },
        { title: 'Every report comes with analysis', description: 'The RM30 CTOS pull is paired with a written CCRIS read, a DSR recalculation and a structured offer.' },
        { title: 'We say no upfront', description: 'If we cannot approve you, you hear it in writing within 24 hours, not after a silent two-week wait.' },
        { title: 'Tracked by reference number', description: 'Every case has a reference. If we miss the 24-hour mark, we flag it to you first.' },
      ],
      casesTitle: 'Anonymised cases from the past 12 months',
      labels: { situation: 'The problem', action: 'What we changed', outcome: 'Outcome' },
      cases: [
        {
          name: 'Rajesh K.',
          location: 'Shah Alam, Selangor',
          situation: 'Two late markers from 2023. Rejected by two banks for a home loan in the same month.',
          action: 'Matched the file to a lender that scores aged markers differently and rebuilt the submission pack.',
          outcome: 'RM420,000 approved in 11 business days',
          quote: 'I thought I had to wait another year for those markers to age off.',
        },
        {
          name: 'Tan W.M.',
          location: 'George Town, Penang',
          situation: 'Four-year F&B business needing working capital. Three banks asked for audited accounts she did not have.',
          action: 'Reworked the file around bank statements and tax records and dropped audit-heavy lenders.',
          outcome: 'RM180,000 approved in 9 business days',
          quote: 'Nobody had told me some banks do not need audited accounts at my stage.',
        },
        {
          name: 'Nurul H.',
          location: 'Johor Bahru, Johor',
          situation: 'DSR at 74% from three credit cards and a car loan. Personal loan declined twice.',
          action: 'Consolidated the cards into one facility first, bringing DSR to 52%, then applied.',
          outcome: 'RM45,000 approved, monthly commitments down RM610',
          quote: 'The consolidation step was the part I would never have figured out alone.',
        },
      ],
      disclaimer: 'Names changed, numbers kept. Outcomes depend on individual profiles and are not a guarantee.',
    },
    transparency: {
      eyebrow: 'Transparency',
      title: 'Check us before you send anything.',
      items: [
        { title: 'Rate disclosure', description: 'Personal loans from 4.88% flat p.a., business from 5.50% effective. Indicative; your rate depends on your profile.', href: PATHS.loans.personal, cta: 'See rates' },
        { title: 'Risk warning', description: 'Approval is subject to assessment. Late repayment affects your credit score and incurs fees. Borrow only what you can service.', href: PATHS.disclaimer, cta: 'Read disclaimer' },
        { title: 'Verify us', description: 'Registered address, official channels and licensing route. Check them before sharing documents or money.', href: PATHS.verifyUs, cta: 'Verify us' },
        { title: 'PDPA and documents', description: 'Documents are requested only through official WhatsApp, reviewed securely and never shared without consent.', href: PATHS.privacy, cta: 'Privacy policy' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions',
      viewAll: 'View all questions',
      items: [
        { question: 'What types of loans do you offer?', answer: 'We are a licensed money lender under the Moneylenders Act 1951 offering personal loans, business financing for SMEs, and debt consolidation. Approval depends on your credit profile and documentation.' },
        { question: 'How long does the review take?', answer: 'Your written eligibility review is usually ready within 24 hours. Bank timelines vary by lender and by how complete your documents are.' },
        { question: 'What documents do I need?', answer: 'IC copy, latest three months of salary slips, bank statements, and an employment letter. We send a checklist and flag anything extra for your loan type.' },
        { question: 'What is the RM30 fee for?', answer: 'It covers the CTOS credit report pull, a cost passed through to the agency. Our analysis and loan structuring are included. It is collected only through our official WhatsApp after we confirm your details, never on this website.' },
        { question: 'Does the check affect my credit score?', answer: 'No. The two-minute check uses only the details you type in and does not touch CCRIS or CTOS. A credit report is pulled later, only with your consent.' },
        { question: 'Do you serve Sabah and Sarawak?', answer: 'Yes. Applications are open across all 13 states and 3 federal territories, including Sabah, Sarawak and Labuan.' },
      ],
    },
    cta: {
      title: 'Get a written answer before you send documents.',
      lede: 'Start with four details. We reply on official WhatsApp with the likely route, the blockers, and what to prepare.',
      primary: 'Start the 2-minute check',
      secondary: 'WhatsApp us',
      note: 'No payment on this website. Next steps are explained on official WhatsApp.',
    },
  },
  ms: {
    hero: {
      eyebrow: 'Pemberi pinjaman berlesen · Akta Pemberi Pinjam Wang 1951',
      title: 'Tahu sama ada anda akan diluluskan',
      titleAccent: 'sebelum memohon.',
      lede: 'Semakan dua minit ke atas pendapatan, komitmen dan kedudukan CCRIS/CTOS anda. Kami beritahu laluan yang sesuai, secara bertulis, dalam 24 jam.',
      primaryCta: 'Mula semakan 2 minit',
      secondaryCta: 'WhatsApp perunding',
      trustLine: 'Tiada bayaran di laman web ini. Yuran CTOS RM30 diselesaikan hanya melalui WhatsApp rasmi kami.',
      logosLabel: 'Pemberi pinjaman yang kami kerjasama',
    },
    howItWorks: {
      eyebrow: 'Cara ia berfungsi',
      title: 'Tiga langkah. Satu jawapan bertulis.',
      lede: 'Anda kongsi angka, kami baca fail anda seperti pegawai kredit, dan anda dapat pelan yang boleh diambil tindakan.',
      steps: [
        { title: 'Kongsi empat butiran', description: 'Nombor WhatsApp, negeri, jenis pinjaman dan julat pendapatan. Dua minit, tiada dokumen lagi.' },
        { title: 'Kami baca fail anda', description: 'DSR dikira semula, isyarat CCRIS dan CTOS ditafsir, kesesuaian pemberi pinjaman dinilai. Bertulis dalam 24 jam.' },
        { title: 'Dapatkan laluan anda', description: 'Julat jumlah yang dicadangkan, dokumen untuk dihantar dahulu, dan langkah seterusnya di WhatsApp rasmi kami.' },
      ],
      deliverablesTitle: 'Dalam 48 jam anda ada',
      deliverables: [
        { title: 'Semakan kelayakan bertulis', description: 'Gambaran profil, DSR, dan isu yang paling mungkin menjejaskan kelulusan.' },
        { title: 'Senarai dokumen keutamaan', description: 'Apa yang perlu dihantar dahulu, apa yang boleh tunggu, dan apa yang akan melambatkan kes.' },
        { title: 'Laluan dan julat dicadangkan', description: 'Produk dan jumlah yang nampak sesuai untuk tahap komitmen anda.' },
      ],
    },
    products: {
      eyebrow: 'Produk pinjaman',
      title: 'Distrukturkan ikut fail kredit anda.',
      lede: 'Kadar dalam had berkanun. Tempoh satu hingga tujuh tahun. Setiap tawaran disertakan dengan alasannya.',
      cta: 'Ketahui lebih lanjut',
      items: [
        { title: 'Pinjaman Peribadi', description: 'Bil perubatan, aliran tunai jangka pendek, atau perbelanjaan rumah yang dirancang. Sehingga RM100,000.', href: PATHS.loans.personal },
        { title: 'Pinjaman Perniagaan', description: 'Modal kerja dan pembiayaan pengembangan untuk PKS. Berasaskan penyata bank, tiada akaun beraudit diperlukan.', href: PATHS.services },
        { title: 'Penyatuan Hutang', description: 'Gabungkan hutang faedah tinggi menjadi satu bayaran dan turunkan DSR sebelum memohon.', href: PATHS.loans.debtConsolidation },
      ],
    },
    calculator: {
      eyebrow: 'Kalkulator',
      title: 'Lihat DSR anda sebelum bank melihatnya.',
      lede: 'Masukkan pendapatan dan komitmen. Keputusan dikemas kini serta-merta. Tiada data disimpan.',
      tabs: { estimate: 'Anggaran anda', reference: 'Rujukan bayaran' },
      reference: {
        title: 'Ansuran bulanan pada kadar rata 4.88% setahun',
        amountHeader: 'Jumlah pinjaman',
        yearsAbbr: 'thn',
        perMonth: '/bulan',
        note: 'Rujukan sahaja. Angka dibundarkan ke RM terdekat; yuran pemprosesan, duti setem dan insurans tidak termasuk. Tawaran sebenar bergantung pada profil dan DSR anda.',
      },
    },
    proof: {
      eyebrow: 'Kenapa kami',
      title: 'Empat perkara yang broker tidak boleh buat.',
      points: [
        { title: 'Anda pinjam terus daripada pemberi pinjaman', description: 'Berlesen di bawah Akta Pemberi Pinjam Wang 1951. Tiada orang tengah, tiada kejar komisen.' },
        { title: 'Setiap laporan disertakan analisis', description: 'Tarikan CTOS RM30 digandingkan dengan bacaan CCRIS bertulis, pengiraan semula DSR dan tawaran berstruktur.' },
        { title: 'Kami kata tidak lebih awal', description: 'Jika kami tidak boleh luluskan, anda tahu secara bertulis dalam 24 jam, bukan selepas menunggu dua minggu tanpa jawapan.' },
        { title: 'Dijejak dengan nombor rujukan', description: 'Setiap kes ada rujukan. Jika kami terlepas tempoh 24 jam, kami maklumkan anda dahulu.' },
      ],
      casesTitle: 'Kes tanpa nama dari 12 bulan lepas',
      labels: { situation: 'Masalahnya', action: 'Apa yang kami ubah', outcome: 'Keputusan' },
      cases: [
        {
          name: 'Rajesh K.',
          location: 'Shah Alam, Selangor',
          situation: 'Dua penanda lewat dari 2023. Ditolak oleh dua bank untuk pinjaman rumah pada bulan yang sama.',
          action: 'Padankan fail dengan pemberi pinjaman yang menilai penanda lama secara berbeza dan bina semula pakej penyerahan.',
          outcome: 'RM420,000 diluluskan dalam 11 hari bekerja',
          quote: 'Saya sangka perlu tunggu setahun lagi untuk penanda itu hilang.',
        },
        {
          name: 'Tan W.M.',
          location: 'George Town, Pulau Pinang',
          situation: 'Perniagaan F&B empat tahun perlukan modal kerja. Tiga bank minta akaun beraudit yang beliau belum ada.',
          action: 'Susun semula fail berdasarkan penyata bank dan rekod cukai, gugurkan pemberi pinjaman yang mewajibkan audit.',
          outcome: 'RM180,000 diluluskan dalam 9 hari bekerja',
          quote: 'Tiada siapa beritahu saya sesetengah bank tidak perlukan akaun beraudit pada peringkat saya.',
        },
        {
          name: 'Nurul H.',
          location: 'Johor Bahru, Johor',
          situation: 'DSR pada 74% daripada tiga kad kredit dan pinjaman kereta. Pinjaman peribadi ditolak dua kali.',
          action: 'Satukan kad kredit ke dalam satu kemudahan dahulu, DSR turun ke 52%, kemudian mohon.',
          outcome: 'RM45,000 diluluskan, komitmen bulanan turun RM610',
          quote: 'Langkah penyatuan itu yang saya takkan fikirkan sendiri.',
        },
      ],
      disclaimer: 'Nama ditukar, angka dikekalkan. Keputusan bergantung pada profil individu dan bukan jaminan.',
    },
    transparency: {
      eyebrow: 'Ketelusan',
      title: 'Semak kami sebelum hantar apa-apa.',
      items: [
        { title: 'Pendedahan kadar', description: 'Pinjaman peribadi dari 4.88% rata setahun, perniagaan dari 5.50% efektif. Indikatif; kadar anda bergantung pada profil.', href: PATHS.loans.personal, cta: 'Lihat kadar' },
        { title: 'Amaran risiko', description: 'Kelulusan tertakluk kepada penilaian. Bayaran lewat menjejaskan skor kredit dan dikenakan caj. Pinjam hanya yang anda mampu bayar.', href: PATHS.disclaimer, cta: 'Baca penafian' },
        { title: 'Sahkan kami', description: 'Alamat berdaftar, saluran rasmi dan laluan pelesenan. Semak sebelum berkongsi dokumen atau wang.', href: PATHS.verifyUs, cta: 'Sahkan kami' },
        { title: 'PDPA dan dokumen', description: 'Dokumen diminta hanya melalui WhatsApp rasmi, disemak dengan selamat dan tidak dikongsi tanpa kebenaran.', href: PATHS.privacy, cta: 'Dasar privasi' },
      ],
    },
    faq: {
      eyebrow: 'Soalan lazim',
      title: 'Soalan yang kerap ditanya',
      viewAll: 'Lihat semua soalan',
      items: [
        { question: 'Apakah jenis pinjaman yang anda tawarkan?', answer: 'Kami pemberi pinjam wang berlesen di bawah Akta Pemberi Pinjam Wang 1951 yang menawarkan pinjaman peribadi, pembiayaan perniagaan untuk PKS, dan penyatuan hutang. Kelulusan bergantung pada profil kredit dan dokumen anda.' },
        { question: 'Berapa lama semakan mengambil masa?', answer: 'Semakan kelayakan bertulis anda biasanya siap dalam 24 jam. Tempoh bank berbeza mengikut pemberi pinjaman dan kelengkapan dokumen anda.' },
        { question: 'Apakah dokumen yang saya perlukan?', answer: 'Salinan IC, slip gaji tiga bulan terkini, penyata bank, dan surat pengesahan majikan. Kami hantar senarai semak dan maklumkan jika ada tambahan untuk jenis pinjaman anda.' },
        { question: 'Yuran RM30 itu untuk apa?', answer: 'Ia meliputi tarikan laporan kredit CTOS, kos yang disalurkan kepada agensi. Analisis dan penstrukturan pinjaman kami sudah termasuk. Ia dikutip hanya melalui WhatsApp rasmi selepas kami sahkan butiran anda, bukan di laman web ini.' },
        { question: 'Adakah semakan ini menjejaskan skor kredit saya?', answer: 'Tidak. Semakan dua minit hanya menggunakan butiran yang anda taip dan tidak menyentuh CCRIS atau CTOS. Laporan kredit ditarik kemudian, hanya dengan kebenaran anda.' },
        { question: 'Adakah anda berkhidmat di Sabah dan Sarawak?', answer: 'Ya. Permohonan dibuka di semua 13 negeri dan 3 wilayah persekutuan, termasuk Sabah, Sarawak dan Labuan.' },
      ],
    },
    cta: {
      title: 'Dapatkan jawapan bertulis sebelum hantar dokumen.',
      lede: 'Mula dengan empat butiran. Kami balas di WhatsApp rasmi dengan laluan yang mungkin, halangan, dan apa yang perlu disediakan.',
      primary: 'Mula semakan 2 minit',
      secondary: 'WhatsApp kami',
      note: 'Tiada bayaran di laman web ini. Langkah seterusnya diterangkan di WhatsApp rasmi.',
    },
  },
};
```

- [ ] **Step 2: Replace `src/app/page.tsx` with a placeholder that keeps e2e green**

```tsx
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { homeContent } from '@/lib/content/home';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { Container, Section } from '@/components/layout';

export const revalidate = 300;

export default async function HomePage() {
  const language = await resolveRequestLanguage();
  const t = homeContent[language] ?? homeContent.en;

  return (
    <div className="flex flex-col">
      <WebPageJsonLd
        url={SEO.url}
        title={SEO.defaultTitle}
        description={SEO.defaultDescription}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }]}
        faqItems={t.faq.items}
      />
      <Section id="hero">
        <Container>
          <h1 className="text-4xl lg:text-6xl">
            {t.hero.title} <span className="text-primary">{t.hero.titleAccent}</span>
          </h1>
        </Container>
      </Section>
    </div>
  );
}
```

- [ ] **Step 3: Delete the superseded components**

```bash
git rm -q src/components/sections/HeroSection.tsx src/components/HeroIntro.tsx src/components/HeroVisual.tsx src/components/HeroSpotlight.tsx src/components/MagneticCTA.tsx src/components/AnimatedCounter.tsx src/components/sections/LicensedTrustBar.tsx src/components/finance/Rm30DeliverablesSection.tsx src/components/finance/RateDisclosure.tsx src/components/ProcessTimeline.tsx src/components/ProcessTimelineSteps.tsx src/components/sections/WhyUsSection.tsx src/components/finance/RiskWarning.tsx src/components/finance/TrustSecuritySection.tsx src/components/finance/TransparencyDisclosure.tsx src/components/finance/SecurityBadges.tsx src/components/sections/FaqSection.tsx src/components/sections/FinalCtaSection.tsx src/components/sections/LoanProductsSection.tsx src/components/sections/LoanProductCard.tsx src/components/sections/BlogSection.tsx src/components/sections/ResourcesSection.tsx src/components/finance/PaymentReferenceTable.tsx src/components/lazy/PreApprovalCalculatorLazy.tsx src/components/lazy/TrustSectionLazy.tsx src/components/lazy/TestimonialCarouselLazy.tsx src/components/TrustSection.tsx src/components/TestimonialCarousel.tsx
```

- [ ] **Step 4: Verify no dangling imports and the type-check passes**

Run:
```bash
grep -rn "HeroSection\|HeroIntro\|HeroVisual\|HeroSpotlight\|MagneticCTA\|AnimatedCounter\|LicensedTrustBar\|Rm30Deliverables\|RateDisclosure\|ProcessTimeline\|WhyUsSection\|RiskWarning\|TrustSecuritySection\|TransparencyDisclosure\|SecurityBadges\|FaqSection\|FinalCtaSection\|LoanProductsSection\|LoanProductCard\|BlogSection\|ResourcesSection\|PaymentReferenceTable\|PreApprovalCalculatorLazy\|TrustSectionLazy\|TestimonialCarouselLazy\|TestimonialCarousel\b\|TrustSection\b" src ; echo "exit=$?"
npx tsc --noEmit && npm run lint && npx vitest run
```
Expected: grep prints nothing (`exit=1`); tsc, lint, vitest all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(home): new bilingual homepage content; remove superseded home sections"
```

---

### Task 9: Hero section (headline, CTAs, lead-form UI card, bank logo row)

**Files:**
- Modify: `src/components/QuickLeadCapture.tsx` (replace the two `return` blocks; keep everything above `if (isSubmitted)`)
- Create: `src/components/home/HeroCtas.tsx`
- Create: `src/components/home/BankLogoRow.tsx`
- Create: `src/components/home/Hero.tsx`
- Modify: `src/app/page.tsx` (mount `Hero`)
- Test: `src/components/home/__tests__/Hero.test.tsx`

**Interfaces:**
- Consumes `HomeContent['hero']`, `QuickLeadCapture({ language, source, variant, className, onSuccess })`.
- Produces `Hero({ t, language })` where `t: HomeContent`, `language: Language`. Renders `<section id="hero">` (StickyMobileCTA depends on this id) and the lead form container `#hero-quick-check` (HeroCtas scrolls to it).

- [ ] **Step 1: Write the failing test**

Create `src/components/home/__tests__/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { homeContent } from '@/lib/content/home';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders h1, both CTAs, the lead form and section id', () => {
    const { container } = render(
      <LanguageProvider>
        <Hero t={homeContent.en} language="en" />
      </LanguageProvider>,
    );
    expect(container.querySelector('section#hero')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Know if you will be approved/);
    expect(screen.getByRole('button', { name: /Start the 2-minute check/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp an advisor/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp number/i)).toBeInTheDocument();
    expect(container.querySelector('#hero-quick-check')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/home`
Expected: FAIL — `../Hero` not found.

- [ ] **Step 3: Restyle `QuickLeadCapture`'s render**

In `src/components/QuickLeadCapture.tsx` keep the imports, `copy`, option tables, `phonePattern`, the props type, and all hooks/handlers. Replace the import line for icons with:
```tsx
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
```
Remove the `MessageCircle` and `COMPANY` imports (the WhatsApp link moves out of the card). Then replace everything from `if (isSubmitted) {` to the end of the component with:

```tsx
  if (isSubmitted) {
    return (
      <div
        id={variant === 'hero' ? 'hero-quick-check' : undefined}
        className={cn('rounded-2xl border border-success/30 bg-success-soft p-5 text-sm text-foreground', className)}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
          <div className="space-y-1">
            <p className="font-semibold">{t.success}</p>
            <p className="text-foreground-muted">{t.helper}</p>
          </div>
        </div>
      </div>
    );
  }

  const selectClass =
    'h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] hover:border-border-strong focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20';

  return (
    <div
      id={variant === 'hero' ? 'hero-quick-check' : undefined}
      className={cn(
        variant === 'hero'
          ? 'rounded-2xl border border-border bg-surface p-5 shadow-float sm:p-6'
          : 'p-0',
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-foreground">{t.title}</p>
          <p className="text-sm text-foreground-muted">{t.helper}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
          <ShieldCheck className="size-3.5" />
          {t.badge}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={cn('grid gap-3', variant === 'hero' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1')}>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-phone`}>{t.phoneLabel}</Label>
            <Input
              id={`${source}-phone`}
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={t.phonePlaceholder}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-service-area`}>{t.stateLabel}</Label>
            <select id={`${source}-service-area`} value={serviceArea} onChange={(event) => setServiceArea(event.target.value as ServiceAreaCode)} className={selectClass}>
              {SERVICE_AREAS.map((area) => (
                <option key={area.regionCode} value={area.regionCode}>{area.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-loan-type`}>{t.loanTypeLabel}</Label>
            <select id={`${source}-loan-type`} value={loanType} onChange={(event) => setLoanType(event.target.value)} className={selectClass}>
              {loanTypeOptions[language].map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-income-band`}>{t.incomeLabel}</Label>
            <select id={`${source}-income-band`} value={incomeBand} onChange={(event) => setIncomeBand(event.target.value)} className={selectClass}>
              {incomeBandOptions[language].map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : (<>{t.submit}<ArrowRight className="size-4" /></>)}
        </Button>
      </form>
    </div>
  );
}
```

Also in the `copy` object change the two `title` values to `'Check your approval fit in 2 minutes'` (en) / `'Semak potensi kelulusan dalam 2 minit'` (ms) and the two `helper` values to `'No documents needed for this first review.'` / `'Tiada dokumen diperlukan untuk semakan awal ini.'` (unchanged). Delete the `benefits`, `whatsappButton` and `description` keys from both languages (they are no longer rendered).

- [ ] **Step 4: Create `src/components/home/HeroCtas.tsx`**

```tsx
'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import type { Language } from '@/lib/i18n/translations';

export function HeroCtas({ primary, secondary, language }: { primary: string; secondary: string; language: Language }) {
  const scrollToForm = () => {
    trackEvent('hero_primary_cta_click', { language, target: 'hero-quick-check' });
    const el = document.getElementById('hero-quick-check');
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Button size="lg" type="button" onClick={scrollToForm} className="w-full sm:w-auto">
        {primary}
        <ArrowRight className="size-4" />
      </Button>
      <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
        <a
          href={COMPANY.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('hero_whatsapp_click', { language, placement: 'hero' })}
        >
          <MessageCircle className="size-4" />
          {secondary}
        </a>
      </Button>
    </div>
  );
}
```

- [ ] **Step 5: Create `src/components/home/BankLogoRow.tsx`**

```tsx
import Image from 'next/image';

const BANKS = [
  { name: 'Maybank', file: 'maybank' },
  { name: 'CIMB', file: 'cimb' },
  { name: 'Public Bank', file: 'publicbank' },
  { name: 'RHB', file: 'rhb' },
  { name: 'Hong Leong Bank', file: 'hongleong' },
  { name: 'AmBank', file: 'ambank' },
  { name: 'Bank Islam', file: 'bankislam' },
  { name: 'Alliance Bank', file: 'alliance' },
];

export function BankLogoRow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">{label}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {BANKS.map((bank) => (
          <li key={bank.file} className="opacity-60 grayscale transition-opacity hover:opacity-100">
            <Image src={`/images/banks/${bank.file}.svg`} alt={bank.name} width={96} height={28} className="h-6 w-auto" />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 6: Create `src/components/home/Hero.tsx`**

```tsx
import { Container } from '@/components/layout';
import { QuickLeadCapture } from '@/components/QuickLeadCapture';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';
import { HeroCtas } from './HeroCtas';
import { BankLogoRow } from './BankLogoRow';

export function Hero({ t, language }: { t: HomeContent; language: Language }) {
  const h = t.hero;
  return (
    <section id="hero" className="relative overflow-hidden bg-background pb-16 pt-14 lg:pb-24 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(600px 300px at 80% 0%, rgb(37 99 235 / 0.10), transparent 70%)' }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-muted">
            {h.eyebrow}
          </span>
          <h1 className="mt-6 text-[40px] leading-[1.05] tracking-[-0.045em] lg:text-[64px] lg:leading-none">
            {h.title} <span className="text-primary">{h.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-foreground-muted">{h.lede}</p>
          <div className="mt-8">
            <HeroCtas primary={h.primaryCta} secondary={h.secondaryCta} language={language} />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl lg:mt-16">
          <QuickLeadCapture language={language} source="HERO_QUICK_CHECK" variant="hero" />
          <p data-nosnippet className="mt-3 text-center text-xs text-foreground-subtle">{h.trustLine}</p>
        </div>

        <div className="mt-12 lg:mt-16">
          <BankLogoRow label={h.logosLabel} />
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Mount in `src/app/page.tsx`**

Replace the placeholder `<Section id="hero">…</Section>` block with `<Hero t={t} language={language} />`, add `import { Hero } from '@/components/home/Hero';`, and remove the now-unused `Container, Section` import.

- [ ] **Step 8: Run tests and type-check**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(home): hero with inline eligibility card and lender logo row"
```

---

### Task 10: How-it-works + Products sections

**Files:**
- Create: `src/components/home/HowItWorks.tsx`
- Create: `src/components/home/Products.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/home/__tests__/HowItWorks.test.tsx`

**Interfaces:**
- Produces `HowItWorks({ t })` and `Products({ t, language })`, `t: HomeContent`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { homeContent } from '@/lib/content/home';
import { HowItWorks } from '../HowItWorks';
import { Products } from '../Products';

describe('HowItWorks + Products', () => {
  it('renders three numbered steps and three deliverables', () => {
    render(<HowItWorks t={homeContent.en} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Three steps/ })).toBeInTheDocument();
    expect(screen.getByText(/Priority document checklist/)).toBeInTheDocument();
  });

  it('renders three product cards linking to their pages', () => {
    render(
      <LanguageProvider>
        <Products t={homeContent.en} language="en" />
      </LanguageProvider>,
    );
    expect(screen.getAllByRole('link', { name: /Learn more/ })).toHaveLength(3);
    expect(screen.getByRole('link', { name: /Personal Loan/ })).toHaveAttribute('href', '/loans/personal');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/home/__tests__/HowItWorks.test.tsx` → FAIL (modules missing).

- [ ] **Step 3: Create `src/components/home/HowItWorks.tsx`**

```tsx
import { FileText, ListChecks, Route } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import type { HomeContent } from '@/lib/content/home';

const deliverableIcons = [FileText, ListChecks, Route];

export function HowItWorks({ t }: { t: HomeContent }) {
  const s = t.howItWorks;
  return (
    <Section id="how-it-works">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={s.eyebrow} title={s.title} lede={s.lede} />
        </Reveal>
        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {s.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <li className="flex flex-col gap-3 border-t border-border pt-5">
                <span className="font-mono text-sm font-semibold text-foreground-subtle">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl">{step.title}</h3>
                <p className="text-foreground-muted">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-12 lg:mt-16">
          <div className="rounded-2xl border border-border bg-surface-alt p-6 lg:p-8">
            <p className="eyebrow mb-5">{s.deliverablesTitle}</p>
            <div className="grid gap-6 md:grid-cols-3">
              {s.deliverables.map((d, i) => {
                const Icon = deliverableIcons[i] ?? FileText;
                return (
                  <div key={d.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="font-semibold">{d.title}</p>
                      <p className="mt-1 text-sm text-foreground-muted">{d.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Create `src/components/home/Products.tsx`**

```tsx
import { ArrowRight, Building2, Layers, Wallet } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { LocaleLink } from '@/components/LocaleLink';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';

const icons = [Wallet, Building2, Layers];

export function Products({ t }: { t: HomeContent; language: Language }) {
  const p = t.products;
  return (
    <Section id="products" tone="alt">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {p.items.map((item, i) => {
            const Icon = icons[i] ?? Wallet;
            return (
              <Reveal key={item.href} delay={i * 0.06} className="h-full">
                <Card interactive className="h-full gap-4 px-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-xl">
                    <LocaleLink href={item.href} className="after:absolute after:inset-0">
                      {item.title}
                    </LocaleLink>
                  </h3>
                  <p className="flex-1 text-foreground-muted">{item.description}</p>
                  <LocaleLink href={item.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary" tabIndex={-1} aria-hidden="true">
                    {p.cta}
                    <ArrowRight className="size-4" />
                  </LocaleLink>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
```
Note: the title link is the accessible link (stretched with `after:absolute after:inset-0`); add `relative` to the `Card` className so the stretch is scoped: change `className="h-full gap-4 px-6"` to `className="relative h-full gap-4 px-6"`. The test expects the "Learn more" links to exist (3) and the product-name link href; `aria-hidden` links are still counted by `getAllByRole` only when `hidden: true` — so remove `aria-hidden="true"` and `tabIndex={-1}` from the "Learn more" link and instead keep both links focusable. Final "Learn more" link line:
```tsx
<LocaleLink href={item.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
```

- [ ] **Step 5: Mount in `src/app/page.tsx`**

After `<Hero … />` add:
```tsx
      <HowItWorks t={t} />
      <Products t={t} language={language} />
```
with imports `import { HowItWorks } from '@/components/home/HowItWorks';` and `import { Products } from '@/components/home/Products';`.

- [ ] **Step 6: Run tests and type-check**

Run: `npx vitest run && npx tsc --noEmit && npm run lint` → all PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(home): how-it-works and products sections"
```

---

### Task 11: Calculator section (two-column calculator + payment reference tab)

**Files:**
- Modify: `src/components/PreApprovalCalculator.tsx` (replace from `return (` to end of component; keep `content`, hooks, helpers)
- Create: `src/components/home/PaymentReference.tsx`
- Create: `src/components/home/CalculatorSection.tsx`
- Modify: `src/app/page.tsx`
- Test: existing `src/components/__tests__/PreApprovalCalculator.test.tsx` must stay green; add `src/components/home/__tests__/PaymentReference.test.tsx`

**Interfaces:**
- `PreApprovalCalculator()` keeps its signature (no props) and its locked strings.
- Produces `PaymentReference({ t })` and `CalculatorSection({ t })`, `t: HomeContent`.

- [ ] **Step 1: Write the failing test**

Create `src/components/home/__tests__/PaymentReference.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { homeContent } from '@/lib/content/home';
import { PaymentReference } from '../PaymentReference';

describe('PaymentReference', () => {
  it('renders 7 amount rows and 7 tenure columns', () => {
    render(<PaymentReference t={homeContent.en} />);
    expect(screen.getAllByRole('row')).toHaveLength(8);
    expect(screen.getByText('RM 100,000')).toBeInTheDocument();
    expect(screen.getByText('RM 1,597')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/home/__tests__/PaymentReference.test.tsx` → FAIL.

- [ ] **Step 3: Create `src/components/home/PaymentReference.tsx`**

```tsx
import type { HomeContent } from '@/lib/content/home';

const TENURES = [1, 2, 3, 4, 5, 6, 7] as const;
const ROWS: { amount: number; payments: number[] }[] = [
  { amount: 5000, payments: [437, 229, 159, 125, 104, 90, 80] },
  { amount: 10000, payments: [874, 457, 318, 249, 207, 180, 160] },
  { amount: 20000, payments: [1748, 915, 637, 498, 415, 359, 319] },
  { amount: 30000, payments: [2622, 1372, 955, 747, 622, 539, 479] },
  { amount: 50000, payments: [4370, 2287, 1592, 1245, 1037, 898, 799] },
  { amount: 80000, payments: [6992, 3659, 2548, 1992, 1659, 1436, 1278] },
  { amount: 100000, payments: [8740, 4573, 3184, 2490, 2073, 1796, 1597] },
];

const rm = (n: number) => `RM ${n.toLocaleString('en-MY')}`;

export function PaymentReference({ t }: { t: HomeContent }) {
  const r = t.calculator.reference;
  return (
    <div data-nosnippet className="rounded-2xl border border-border bg-surface">
      <div className="border-b border-border px-5 py-4">
        <p className="font-semibold">{r.title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-foreground-subtle">
              <th scope="col" className="sticky left-0 bg-surface px-5 py-3 font-medium">{r.amountHeader}</th>
              {TENURES.map((yr) => (
                <th key={yr} scope="col" className="px-4 py-3 text-right font-medium">{yr} {r.yearsAbbr}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.amount} className="border-t border-border">
                <th scope="row" className="sticky left-0 bg-surface px-5 py-3 text-left font-semibold">{rm(row.amount)}</th>
                {row.payments.map((p, i) => (
                  <td key={i} className="px-4 py-3 text-right text-foreground-muted">
                    {rm(p)}<span className="text-foreground-subtle">{r.perMonth}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border px-5 py-4 text-xs text-foreground-subtle">{r.note}</p>
    </div>
  );
}
```

- [ ] **Step 4: Rewrite the render of `PreApprovalCalculator`**

In `src/components/PreApprovalCalculator.tsx`:
1. Change the imports to:
```tsx
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/lib/i18n';
import { calculateDsrOutcome } from '@/lib/dsr';
import { ArrowRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { LocaleLink } from '@/components/LocaleLink';
import { cn } from '@/lib/utils';
```
2. Keep the `content` object unchanged.
3. Inside the component keep `language`, `t`, the four `useState`s, `hasIncome`, `calculation`, `formatCurrency`. Delete `getStatusIcon`, `getStatusColor`, `getDsrColor` and replace with:
```tsx
  const status = calculation?.status;
  const statusTone = {
    approved: { icon: CheckCircle2, text: 'text-success', bg: 'bg-success-soft border-success/30', bar: 'bg-success' },
    conditional: { icon: AlertCircle, text: 'text-warning', bg: 'bg-warning-soft border-warning/30', bar: 'bg-warning' },
    declined: { icon: XCircle, text: 'text-destructive', bg: 'bg-destructive/5 border-destructive/30', bar: 'bg-destructive' },
  } as const;
  const tone = status ? statusTone[status] : null;
  const StatusIcon = tone?.icon ?? CheckCircle2;
  const dsr = calculation?.dsr ?? 0;
```
4. Replace the whole `return (…)` with:
```tsx
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
      <div className="rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24 lg:p-6">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="income">{t.income.label}</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-foreground-subtle">RM</span>
              <Input id="income" type="number" inputMode="numeric" placeholder={t.income.placeholder} value={income} onChange={(e) => setIncome(e.target.value)} className="pl-11 font-mono" />
            </div>
            <p className="text-xs text-foreground-subtle">{t.income.helper}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="commitments">{t.commitments.label}</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-foreground-subtle">RM</span>
              <Input id="commitments" type="number" inputMode="numeric" placeholder={t.commitments.placeholder} value={commitments} onChange={(e) => setCommitments(e.target.value)} className="pl-11 font-mono" />
            </div>
            <p className="text-xs text-foreground-subtle">{t.commitments.helper}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t.loanAmount.label}</Label>
              <span className="font-mono text-sm font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
            <Slider value={[loanAmount]} onValueChange={(v) => setLoanAmount(v[0])} min={5000} max={500000} step={5000} thumbLabels={[t.loanAmount.label]} />
            <div className="flex justify-between font-mono text-[11px] text-foreground-subtle"><span>RM 5,000</span><span>RM 500,000</span></div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t.tenure.label}</Label>
              <span className="font-mono text-sm font-semibold">{tenure} {t.tenure.years}</span>
            </div>
            <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={10} step={1} thumbLabels={[t.tenure.label]} />
            <div className="flex justify-between font-mono text-[11px] text-foreground-subtle"><span>1 {t.tenure.years}</span><span>10 {t.tenure.years}</span></div>
          </div>

          <Button type="button" className="w-full" onClick={() => document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>
            {t.calculate}
          </Button>
        </div>
      </div>

      <div id="calc-results" className="min-h-[320px]">
        {!hasIncome || !calculation || !tone ? (
          <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-border-strong p-8 text-center text-sm text-foreground-muted">
            {language === 'ms'
              ? 'Masukkan pendapatan bulanan untuk lihat kelayakan secara langsung.'
              : 'Enter your monthly income to see eligibility update live as you adjust the sliders.'}
          </div>
        ) : (
          <div className={cn('rounded-2xl border p-6 lg:p-8', tone.bg)}>
            <div className="flex items-start gap-3">
              <StatusIcon className={cn('mt-0.5 size-6 shrink-0', tone.text)} />
              <div>
                <h3 className="text-2xl">{t.results[calculation.status].title}</h3>
                <p className="mt-1 text-foreground-muted">{t.results[calculation.status].subtitle}</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: t.metrics.dsr, value: `${dsr.toFixed(1)}%`, cls: tone.text },
                { label: t.metrics.maxLoan, value: formatCurrency(calculation.maxLoanAmount), cls: 'text-primary' },
                { label: t.metrics.monthlyPayment, value: formatCurrency(calculation.monthlyPayment), cls: '' },
                { label: t.metrics.totalInterest, value: formatCurrency(calculation.totalInterest), cls: 'text-foreground-muted' },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-surface p-4">
                  <dt className="text-xs text-foreground-subtle">{m.label}</dt>
                  <dd className={cn('mt-1 font-mono text-xl font-semibold tabular-nums', m.cls)}>{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <div className="mb-1.5 flex justify-between text-xs text-foreground-subtle">
                <span>{t.metrics.dsr}</span>
                <span className={cn('font-mono', tone.text)}>{dsr.toFixed(1)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface">
                <div className={cn('h-full rounded-full transition-[width] duration-500', tone.bar)} style={{ width: `${Math.min(100, dsr)}%` }} />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[11px] text-foreground-subtle"><span>0%</span><span>60%</span><span>100%</span></div>
              <p className="mt-2 text-xs text-foreground-subtle">{t.dsrExplanation}</p>
            </div>

            {calculation.status !== 'approved' && (
              <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                <p className="font-semibold">{t.tips.title}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-foreground-muted">
                  {t.tips.items.map((tip) => (
                    <li key={tip} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {calculation.status !== 'declined' && (
              <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
                <LocaleLink href="/eligibility-test">
                  {t.applyNow}
                  <ArrowRight className="size-4" />
                </LocaleLink>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `src/components/home/CalculatorSection.tsx`**

```tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { PreApprovalCalculator } from '@/components/PreApprovalCalculator';
import { PaymentReference } from './PaymentReference';
import type { HomeContent } from '@/lib/content/home';

export function CalculatorSection({ t }: { t: HomeContent }) {
  const c = t.calculator;
  return (
    <Section id="calculator">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={c.eyebrow} title={c.title} lede={c.lede} align="center" />
        </Reveal>
        <Tabs defaultValue="estimate">
          <TabsList className="mx-auto mb-8 h-11 rounded-full border border-border bg-surface p-1">
            <TabsTrigger value="estimate" className="rounded-full px-4 data-[state=active]:bg-inverse data-[state=active]:text-inverse-foreground">{c.tabs.estimate}</TabsTrigger>
            <TabsTrigger value="reference" className="rounded-full px-4 data-[state=active]:bg-inverse data-[state=active]:text-inverse-foreground">{c.tabs.reference}</TabsTrigger>
          </TabsList>
          <TabsContent value="estimate"><PreApprovalCalculator /></TabsContent>
          <TabsContent value="reference"><PaymentReference t={t} /></TabsContent>
        </Tabs>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 6: Mount in `src/app/page.tsx`**

After `<Products … />` add `<CalculatorSection t={t} />` with `import { CalculatorSection } from '@/components/home/CalculatorSection';`.

- [ ] **Step 7: Run tests and type-check**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all PASS including the pre-existing `PreApprovalCalculator.test.tsx` (labels, `Check Eligibility` button, `Debt Service Ratio`, `Pre-Approved!`, `Apply Now`).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(home): two-column calculator with payment reference tab"
```

---

### Task 12: Proof section (four points + three case cards)

**Files:**
- Create: `src/components/home/Proof.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/home/__tests__/Proof.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { homeContent } from '@/lib/content/home';
import { Proof } from '../Proof';

describe('Proof', () => {
  it('renders four points and three cases', () => {
    render(<Proof t={homeContent.en} />);
    expect(screen.getByRole('heading', { name: /Four things/ })).toBeInTheDocument();
    expect(screen.getByText(/You borrow from the lender/)).toBeInTheDocument();
    expect(screen.getAllByText(/approved in/)).toHaveLength(2);
    expect(screen.getByText(/Rajesh K\./)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify it fails** → `npx vitest run src/components/home/__tests__/Proof.test.tsx` FAIL.

- [ ] **Step 3: Create `src/components/home/Proof.tsx`**

```tsx
import { BadgeCheck, FileSearch, Hash, MessageSquareWarning } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import type { HomeContent } from '@/lib/content/home';

const icons = [BadgeCheck, FileSearch, MessageSquareWarning, Hash];

export function Proof({ t }: { t: HomeContent }) {
  const p = t.proof;
  return (
    <Section id="proof">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={p.eyebrow} title={p.title} />
        </Reveal>

        <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
          {p.points.map((pt, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            return (
              <Reveal key={pt.title} delay={i * 0.05}>
                <div className="flex gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg">{pt.title}</h3>
                    <p className="mt-1 text-foreground-muted">{pt.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <p className="eyebrow mb-6">{p.casesTitle}</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {p.cases.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="eyebrow mb-1">{p.labels.situation}</dt>
                    <dd className="text-foreground-muted">{c.situation}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">{p.labels.action}</dt>
                    <dd className="text-foreground-muted">{c.action}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">{p.labels.outcome}</dt>
                    <dd className="font-semibold text-success">{c.outcome}</dd>
                  </div>
                </dl>
                <blockquote className="mt-6 border-t border-border pt-4 text-sm italic text-foreground-muted">
                  “{c.quote}”
                  <footer className="mt-2 not-italic text-xs text-foreground-subtle">{c.name} · {c.location}</footer>
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-foreground-subtle">{p.disclaimer}</p>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Mount** — after `<CalculatorSection … />` add `<Proof t={t} />` with its import.

- [ ] **Step 5: Run tests and type-check** → `npx vitest run && npx tsc --noEmit && npm run lint` PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(home): proof section with four points and case cards"
```

---

### Task 13: Transparency, FAQ, Final CTA sections

**Files:**
- Create: `src/components/home/Transparency.tsx`
- Modify: `src/components/sections/FaqAccordion.tsx` (replace file)
- Create: `src/components/home/Faq.tsx`
- Create: `src/components/home/FinalCta.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/home/__tests__/TailSections.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { homeContent } from '@/lib/content/home';
import { Transparency } from '../Transparency';
import { Faq } from '../Faq';
import { FinalCta } from '../FinalCta';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('tail sections', () => {
  it('Transparency renders four linked cards', () => {
    wrap(<Transparency t={homeContent.en} language="en" />);
    expect(screen.getByRole('link', { name: /Verify us/ })).toHaveAttribute('href', '/verify-us');
    expect(screen.getByRole('link', { name: /Privacy policy/ })).toHaveAttribute('href', '/privacy');
  });

  it('Faq renders six questions with the first open', () => {
    wrap(<Faq t={homeContent.en} language="en" />);
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(5);
    expect(screen.getByRole('button', { expanded: true })).toHaveTextContent(/What types of loans/);
    expect(screen.getByRole('link', { name: /View all questions/ })).toHaveAttribute('href', '/faq');
  });

  it('FinalCta renders on an inverse section', () => {
    const { container } = wrap(<FinalCta t={homeContent.en} language="en" />);
    expect(container.querySelector('section')?.className).toContain('bg-inverse');
    expect(screen.getByRole('link', { name: /Start the 2-minute check/ })).toHaveAttribute('href', '/eligibility-test');
  });
});
```

- [ ] **Step 2: Run to verify it fails** → FAIL (modules missing).

- [ ] **Step 3: Create `src/components/home/Transparency.tsx`**

```tsx
import { ArrowRight, BadgeCheck, Lock, Percent, TriangleAlert } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';

const icons = [Percent, TriangleAlert, BadgeCheck, Lock];

export function Transparency({ t }: { t: HomeContent; language: Language }) {
  const s = t.transparency;
  return (
    <Section id="transparency" tone="alt">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={s.eyebrow} title={s.title} />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {s.items.map((item, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            const warn = i === 1;
            return (
              <Reveal key={item.href} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                  <span className={warn ? 'inline-flex size-10 items-center justify-center rounded-lg bg-warning-soft text-warning' : 'inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary'}>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-foreground-muted">{item.description}</p>
                  <LocaleLink href={item.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {item.cta}
                    <ArrowRight className="size-4" />
                  </LocaleLink>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Replace `src/components/sections/FaqAccordion.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Item = { question: string; answer: string };

export function FaqAccordion({ items, className }: { items: Item[]; className?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-border rounded-2xl border border-border bg-surface', className)}>
      {items.map((faq, index) => {
        const isOpen = openIdx === index;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left lg:px-6 lg:py-5"
            >
              <span className="font-semibold">{faq.question}</span>
              <ChevronDown className={cn('size-5 shrink-0 text-foreground-subtle transition-transform duration-200', isOpen && 'rotate-180')} />
            </button>
            <div
              id={panelId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-foreground-muted lg:px-6"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 5: Create `src/components/home/Faq.tsx`**

```tsx
import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeader, Reveal } from '@/components/layout';
import { LocaleLink } from '@/components/LocaleLink';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { PATHS } from '@/lib/i18n/routes';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';

export function Faq({ t }: { t: HomeContent; language: Language }) {
  const f = t.faq;
  return (
    <Section id="faq">
      <Container size="prose" className="max-w-[760px]">
        <Reveal>
          <SectionHeader
            eyebrow={f.eyebrow}
            title={f.title}
            action={
              <LocaleLink href={PATHS.faq} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {f.viewAll}
                <ArrowRight className="size-4" />
              </LocaleLink>
            }
          />
        </Reveal>
        <FaqAccordion items={f.items} />
      </Container>
    </Section>
  );
}
```

- [ ] **Step 6: Create `src/components/home/FinalCta.tsx`**

```tsx
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/components/LocaleLink';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { HomeContent } from '@/lib/content/home';
import type { Language } from '@/lib/i18n/translations';

export function FinalCta({ t }: { t: HomeContent; language: Language }) {
  const c = t.cta;
  return (
    <Section id="final-cta" tone="inverse">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] text-inverse-foreground lg:text-4xl">{c.title}</h2>
          <p className="mt-4 text-lg text-inverse-foreground/70">{c.lede}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <LocaleLink href={PATHS.eligibilityTest}>
                {c.primary}
                <ArrowRight className="size-4" />
              </LocaleLink>
            </Button>
            <Button size="lg" variant="inverse" asChild>
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                {c.secondary}
              </a>
            </Button>
          </div>
          <p data-nosnippet className="mt-6 text-xs text-inverse-foreground/60">{c.note}</p>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 7: Mount** — after `<Proof … />` add:
```tsx
      <Transparency t={t} language={language} />
      <Faq t={t} language={language} />
      <FinalCta t={t} language={language} />
```
with the three imports. `src/app/page.tsx` now lists exactly eight sections: `Hero`, `HowItWorks`, `Products`, `CalculatorSection`, `Proof`, `Transparency`, `Faq`, `FinalCta`.

- [ ] **Step 8: Run tests and type-check** → `npx vitest run && npx tsc --noEmit && npm run lint` PASS. `services/ServicesContent.tsx` still imports `FaqAccordion` — it keeps compiling because the prop shape is unchanged.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(home): transparency, faq and final cta sections"
```

---

### Task 14: End-to-end verification, screenshots, cleanup

**Files:**
- Possibly modify: any file surfaced by the checks below.
- Create: `e2e/smoke.spec.ts`

- [ ] **Step 1: Add a route smoke test**

Create `e2e/smoke.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const ROUTES = [
  '/', '/about', '/contact', '/faq', '/services', '/eligibility-test', '/tools', '/tools/compare',
  '/loans/personal', '/loans/debt-consolidation', '/loans/emergency', '/loans/my/selangor',
  '/loan-guides', '/loan-guides/ccris-ctos', '/blog', '/glossary', '/documents', '/partners',
  '/service-areas', '/verify-us', '/privacy', '/terms', '/disclaimer', '/status',
];

for (const route of ROUTES) {
  test(`${route} renders with one h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

test('mobile sticky CTA appears below the hero on the homepage', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.mouse.wheel(0, 2000);
  await expect(page.getByRole('link', { name: /Check eligibility/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the full unit suite and static checks**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all green.

- [ ] **Step 3: Production build**

Run: `npm run build 2>&1 | tail -40`
Expected: build succeeds; no `Module not found`, no type errors. If any legacy page fails because a deleted component is imported, that page was missed in Task 8's grep — restore the smallest possible stub or fix the import, and note it in the commit.

- [ ] **Step 4: Run Playwright**

Run:
```bash
npx playwright install chromium --with-deps >/dev/null 2>&1 || true
npx playwright test --project=chromium 2>&1 | tail -30
```
Expected: `home.spec.ts`, `funnel.spec.ts`, `locale-routing.spec.ts`, `smoke.spec.ts` all pass. If a `/loans/my/*` route has two `h1`s (legacy markup), change the smoke assertion for that route only after confirming with `page.locator('h1').allTextContents()` and note it for Phase 2.

- [ ] **Step 5: Screenshot the homepage at two widths**

Run:
```bash
(npm run start > /tmp/gc-start.log 2>&1 &) ; sleep 6
npx playwright screenshot --viewport-size=390,844 --full-page http://127.0.0.1:3000/ /tmp/home-390.png
npx playwright screenshot --viewport-size=1280,900 --full-page http://127.0.0.1:3000/ /tmp/home-1280.png
pkill -f "next start"
```
Open both PNGs (Read tool) and check: hero H1 fits on two lines at 1280; the lead card sits fully within the first 900px at 1280; no horizontal scrollbar at 390; the mobile bar is hidden while the hero is in view; the Final CTA is the only dark band. Fix any spacing issue found, re-run `npx vitest run`, and include the fix in the commit.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test(e2e): route smoke spec; verify phase-1 redesign builds and passes"
```

---

## Self-review against the spec

- **§2 Visual system** → Tasks 1–2 (tokens, fonts, shapes, buttons); motion rules → Task 3 `Reveal` + Task 8 deletions. ✔
- **§3.1 Root layout** → Tasks 4–5. **§3.2 Navbar** → Task 6. **§3.3 Footer** → Task 7. **§3.4 StickyMobileCTA** → Task 5. ✔
- **§4 Primitives** → Task 3 covers Container/Section/SectionHeader/Reveal/Stat. `PageHeader`, `Breadcrumbs` restyle, `Prose`, `TableOfContents`, `EmptyState`, `FilterBar` are only needed by templates T2–T7 and are deferred to the Phase 2 plan. ✔ (deliberate)
- **§6 Homepage** → Tasks 8–13, eight sections in the specified order and layouts. ✔
- **§7 Copy** → Task 8 (en + ms; metadata and JSON-LD untouched; FAQ JSON-LD now uses six items). ✔
- **§8 Cleanup** → Task 4 + Task 8 delete everything on the list except `CaseStudies`, `VerifyTrustCard`, `TrustPanel` (still used by other routes) and `AmortizationSchedule`, `LoanPaymentTable`, `BankPartners`, `AreasWeServe`, `TrustBadges`, `LoadingSkeleton`, `finance/ComparisonTable`, `finance/RegulatoryInfo`, `finance/InsightsSection`, `finance/AdvisorsSection` which are unreferenced and deleted in Phase 2 alongside their would-be consumers. ✔
- **§10 Acceptance** → home has 8 sections (Task 13); Navbar ≤ 220 / Footer ≤ 180 checked in Tasks 6–7; no `.dark`, `next-themes`, `canvas-confetti` (Tasks 1, 4); tests green (Task 14). Lighthouse comparison deferred to Phase 2 final task.
- **Type consistency**: `HomeContent` shape in Task 8 matches every field read in Tasks 9–13 (`hero.*`, `howItWorks.*`, `products.*`, `calculator.tabs/reference`, `proof.points/labels/cases/disclaimer`, `transparency.items`, `faq.items/viewAll`, `cta.*`). `Section` props (`tone`, `compact`, `id`) and `SectionHeader` props (`eyebrow`, `title`, `lede`, `align`, `action`) are used exactly as defined in Task 3.
