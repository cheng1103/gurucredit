# GURU Credits 前端整站重设计 — 设计规格

日期：2026-09-11
范围：`frontend/` 工作区（Next.js 16 + Tailwind v4 + shadcn）。`admin/` 与 `backend/` 不动。

## 1. 目标与非目标

### 目标
1. 首页从 15 个堆叠板块压缩到 8 个，信息层级清晰，滚动长度减半以上。
2. 视觉从「通用 SaaS 模板」升级为 2025 年主流 fintech 官网的极简现代风格（Mono + Electric：浅灰白底、近黑字、单一电光蓝强调色、悬浮产品 UI）。
3. 手机端体验：去掉层叠的浮动组件，加底部固定 CTA 条，所有触控目标 ≥ 44px。
4. 转化：每个页面在首屏和末尾都有清晰的「检查资格 / WhatsApp」路径。
5. 全站 35 个页面（约 100 个 URL）归入 7 套模板，视觉与节奏完全统一。

### 非目标
- 不改 URL、路由结构、后端 API、数据模型。
- 不改 SEO 骨架：每页 `metadata`（title / description / canonical / hreflang）、H1 中的目标关键词、所有 JSON-LD 组件、sitemap、robots 全部保留。
- 不新增功能。
- 不做深色模式。

## 2. 视觉系统

### 2.1 颜色令牌（`globals.css` `:root`，OKLCH 或 hex 均可，值以 hex 说明）

| 令牌 | 值 | 用途 |
|---|---|---|
| `--background` | #fafafa | 页面底 |
| `--surface` | #ffffff | 卡片、导航、输入框 |
| `--surface-alt` | #f5f5f5 | 交替板块底 |
| `--border` | #e5e5e5 | 所有边框 |
| `--border-strong` | #d4d4d4 | 输入框 hover / 表格线 |
| `--foreground` | #0a0a0a | 标题、主文字 |
| `--foreground-muted` | #525252 | 正文次要 |
| `--foreground-subtle` | #6b6b6b | 标签、辅助 |
| `--primary` | #2563eb | 主按钮、链接、强调 |
| `--primary-hover` | #1d4ed8 | |
| `--primary-soft` | #eff6ff | 强调底色（badge、选中态） |
| `--success` | #15803d | 「通过 / 强」状态 |
| `--success-soft` | #f0fdf4 | |
| `--warning` | #b45309 | 风险提示 |
| `--warning-soft` | #fffbeb | |
| `--destructive` | #dc2626 | 表单错误 |
| `--inverse` | #0a0a0a | 全站唯一深色块（Final CTA）底色 |
| `--inverse-foreground` | #fafafa | |

删除：`--accent`（古铜金）、`.dark` 整块、`--sidebar-*`、`--chart-*`、body 上的径向渐变与 `background-attachment: fixed`、`.gradient-text`、`.hero-grid`、`.hero-backdrop*`、`.mesh-bg`、`.grain`、`.glass`、`.surface-card`。

shadcn 令牌映射保留（`--card`、`--popover`、`--muted`、`--secondary`、`--ring`、`--input`）并指向上表对应值，这样 `components/ui/*` 无需大改。

### 2.2 字体

- 显示与正文：**Geist**（`next/font/google`，variable，weights 400–800），替换 Space Grotesk + Plus Jakarta Sans。
- 数字：**Geist Mono**，用于金额、百分比、DSR、参考编号。通过现有 `.tabular` / `[data-tabular]` / `.metric` / `.amount` 钩子加 `font-family: var(--font-mono)`。
- CJK 回退：不再加载 Noto Sans SC；由系统字体栈（PingFang SC / Microsoft YaHei）提供中文字形。
- 字阶（桌面 / 手机）：

| 级别 | 桌面 | 手机 | 字重 | 字距 |
|---|---|---|---|---|
| Display (首页 H1) | 64px / 1.0 | 40px / 1.05 | 700 | -0.045em |
| H1 | 48px / 1.05 | 34px / 1.1 | 700 | -0.04em |
| H2 | 36px / 1.1 | 28px / 1.15 | 700 | -0.03em |
| H3 | 22px / 1.25 | 20px | 600 | -0.02em |
| Lede | 18px / 1.55 | 17px | 400 | 0 |
| Body | 16px / 1.6 | 16px | 400 | 0 |
| Small | 14px / 1.5 | 14px | 400–500 | 0 |
| Eyebrow | 12px | 12px | 600 | 0.08em uppercase |

- 正文测量：`.prose` 最大宽 680px。

### 2.3 形状、阴影、边框
- 圆角：控件 8px、卡片 12px、大面板 / Hero UI 卡 16px、pill 999px。`--radius: 0.5rem` 保留作为 shadcn 基准。
- 卡片一律 `border: 1px solid var(--border)`，无阴影。
- 阴影只有一种 `--shadow-float: 0 1px 2px rgb(0 0 0 / .04), 0 24px 48px -24px rgb(0 0 0 / .18)`，仅用于 Hero UI 卡、下拉菜单、粘性底部条。
- 主按钮额外 `box-shadow: 0 8px 24px -8px rgb(37 99 235 / .45)`。

### 2.4 间距与网格
- 容器：`max-width: 1120px`，左右 padding 16 / 24 / 32px（手机 / ≥640 / ≥1024）。
- 板块节奏：`Section` 组件统一 `padding-block: 64px`（手机）/ `96px`（≥1024）。紧凑变体 `40px / 64px`。不允许页面自行写 `py-*`。
- 网格间距：卡片网格 gap 16px（手机）/ 24px（桌面）。

### 2.5 按钮
| 变体 | 样式 | 高度 |
|---|---|---|
| primary | 蓝底白字，圆角 10px，hover 加深 | 44px（手机 48px） |
| secondary | 白底 1px 边框，黑字，hover 边框变深 | 同上 |
| ghost | 无底无边，蓝字 + 箭头 `→`，hover 下划线 | 行高 |
| inverse | 深色块上的白底黑字 | 同 primary |

WhatsApp 按钮 = secondary + WhatsApp 图标，不使用绿色。

### 2.6 动效
- 仅保留：板块标题头进入视口时 `opacity 0→1, y 12→0`，280ms ease-out（framer-motion，`useReducedMotion` 时禁用）；卡片 hover `translateY(-2px)` + 边框变深 150ms。
- 删除：`MagneticCTA`、`HeroSpotlight`、`HeroIntro`/`HeroStep`、`HeroVisual`、`AnimatedCounter`（数字直接静态显示）、canvas-confetti、轮换 H1、`ScrollProgress`，以及 `globals.css` 中 `.card-hover` 之后的全部动效工具类和 keyframes。

## 3. 全局框架

### 3.1 根布局 `app/layout.tsx`
```
<html lang>
  <body class="bg-background text-foreground">
    <SkipLink/>
    <Navbar/>
    <main id="main-content">{children}</main>
    <Footer/>
    <WhatsAppFab/>          ← 仅桌面 ≥1024 显示
    <StickyMobileCTA/>      ← 仅 <1024 显示；表单类页面（T6）不渲染
    <Toaster/>
```
删除：`Providers` 里的 `ThemeProvider` 与 `next-themes` 依赖、`ClientWidgets`（PromoBanner、ExitIntentPopup、FloatingPromoWidget、BackToTop、ScrollProgress 一并删除）。`LanguageContext` 保留。`themeColor` 只留浅色一条。

### 3.2 Navbar（重写，目标 ≤ 220 行）
- 高 64px，`sticky top-0 z-50`。初始透明，`scrollY > 8` 后 `bg-white/85 backdrop-blur border-b`。
- 桌面结构：`[Logo] ··· [Loans ▾] [Guides] [Tools] [About] ··· [LanguageSwitcher] [WhatsApp 图标按钮 aria-label] [Apply Now]`。
  - Loans 下拉（Radix DropdownMenu 或 NavigationMenu）：Personal Loan、Business Loan、Debt Consolidation、Emergency Loan，分隔线，Loans by state → `/service-areas`。每项：图标 + 标题 + 一行描述。
  - Guides → `/loan-guides`，Tools → `/tools`，About → `/about`。
  - 「Apply Now」是 `<a>`，文字保持 `Apply Now`（e2e 依赖），指向 `/eligibility-test`。
- 手机（<1024）：`[Logo] ··· [LanguageSwitcher] [Menu 按钮]`。Sheet 全屏（`w-full`），内容：Loans 4 项平铺（不做手风琴）、Guides、Tools、About、FAQ、Contact、Verify Us；底部两颗按钮 Apply Now / WhatsApp；再下一行电话。
- 所有内部链接经 `LocaleLink` / `localeHref`。
- 内容对象 `navContent = { en, ms }` 保留形态，精简项目。

### 3.3 Footer（重写，目标 ≤ 180 行）
两段：
1. 主区 `grid md:grid-cols-2 lg:grid-cols-12`：品牌列（logo、一句话、社交 3 个图标）占 4；三列链接各占 2：**Loans**（Personal、Business、Debt Consolidation、Emergency、By state）、**Resources**（Loan Guides、Blog、Tools、Documents、Glossary、FAQ）、**Company**（About、Verify Us、Partners、Contact、Application Status、Editorial Policy）；联系列占 2（电话、邮箱、地址）。
2. 底区：一行监管文字（牌照句 + 费率声明合并成两句）+ 官方资源三个外链（BNM、AKPK、BNMTELELINK）+ `© year` + Privacy / Terms / Disclaimer。
- 删除邮件订阅横幅与 `newsletterAPI` 调用、信任徽章行、`sloganMs`。

### 3.4 StickyMobileCTA（新）
- `fixed bottom-0 inset-x-0`，白底 `border-t`，`--shadow-float`，`safe-area-inset-bottom`。
- 两颗按钮各占一半：primary「Check eligibility」→ `/eligibility-test`，secondary「WhatsApp」。
- 首屏 Hero 可见时隐藏（IntersectionObserver 监听 `#hero`），避免与 Hero 按钮重复。
- 在 T6 页面不渲染（通过 layout 传 prop 或 pathname 判断）。

## 4. 基础组件（`components/layout/`）

| 组件 | 职责 | Props |
|---|---|---|
| `Container` | 1120px 容器 | `size?: 'default' \| 'prose' \| 'wide'` |
| `Section` | 统一节奏 + 交替底色 | `tone?: 'default' \| 'alt' \| 'inverse'`, `compact?`, `id?` |
| `SectionHeader` | eyebrow + H2 + lede，可左对齐或居中 | `eyebrow?`, `title`, `lede?`, `align?`, `action?: ReactNode` |
| `PageHeader` | 非首页页头：面包屑 + H1 + lede + 可选元信息行 | `breadcrumbs`, `title`, `lede?`, `meta?` |
| `Breadcrumbs` | 复用现有 `Breadcrumbs.tsx`，改样式，输出 BreadcrumbList JSON-LD | `items` |
| `Prose` | 文章正文排版（h2/h3/p/ul/table/blockquote/code） | `children` |
| `TableOfContents` | 从 `Prose` 内 h2/h3 生成，桌面粘性 `top-24`，手机折叠 | `containerId` |
| `Card` | 12px 圆角 + 边框，可 hover 上浮 | `interactive?` |
| `Stat` | 数字 + 标签（Geist Mono） | `value`, `label`, `tone?` |
| `EmptyState` | 列表无结果 | `title`, `description`, `action?` |
| `FilterBar` | 搜索框 + 分类 chips，`sticky top-16` | `query`, `onQuery`, `categories`, `active`, `onSelect` |

现有 `components/ui/*` shadcn 组件保留，只调令牌。

## 5. 页面模板

### T1 营销堆叠
路由：`/`、`/loans/personal`、`/loans/debt-consolidation`、`/loans/emergency`、`/about`、`/partners`、`/verify-us`、`/services`。
结构：`PageHeader`（首页除外）→ 若干 `Section`（tone 交替 default / alt）→ 末尾 `Section tone="inverse"` CTA。
贷款产品页三页共用一个 `LoanProductPage` 组件 + 各自的内容对象（内容对象移到 `lib/content/loans/*.ts`）。

### T2 文章
路由：`/loan-guides/*`（5 篇）、`/loan-guides/topics/[slug]`（15）、`/blog/[slug]`（31）、`/editorial-policy`、`/review-methodology`。
结构：
```
PageHeader(breadcrumbs, H1, lede, meta: 作者 · 更新日期 · 阅读时长)
Container
  grid lg:grid-cols-[680px_1fr] gap-16
    <Prose>正文</Prose>              ← 博客为 HTML 字符串渲染；指南为 JSX 段落
    <aside class="sticky top-24">   ← TableOfContents + 小型 CTA 卡（Check eligibility / WhatsApp）
  作者卡（E-E-A-T，复用 lib/authors.ts）
  相关文章 3 张
Section tone="inverse" CTA
```
指南页原有的「步骤卡网格」改为 `Prose` 内的有序列表 + 小节标题，保证目录可生成。

### T3 州页面
路由：`/loans/my/[region]`（16）。保留现有 12 栏 hero + aside 结构与板块顺序，全部改用 `Section` / `SectionHeader` / `Card` / `Stat`，手写面包屑换成 `Breadcrumbs` 组件。

### T4 索引列表
路由：`/blog`、`/loan-guides`、`/tools`、`/service-areas`、`/glossary`、`/faq`、`/documents`。
结构：`PageHeader` → `FilterBar`（搜索框 + 分类 chips，`sticky top-16` 白底 `border-b`，只在有筛选的页面出现）→ 结果计数 → `grid sm:grid-cols-2 lg:grid-cols-3` 卡片 → `EmptyState` → CTA。
`/documents` 保留 Tabs + 清单进度条，套在同一 `PageHeader` 之下。

### T5 计算器
路由：`/tools/compare`、`/eligibility-test`，以及首页内嵌的 `PreApprovalCalculator`。
结构：桌面 `grid lg:grid-cols-[360px_1fr]`，左侧 `sticky top-24` 输入卡，右侧结果区（`Stat` 行 + 表格 / 卡片），底部假设与免责声明。手机端输入在上、结果在下。
合并：`/compare` 的页面内容并入 `/tools/compare`；删除 `app/compare/` 目录，在 `next.config` 的 `redirects()` 中加 `/compare → /tools/compare` 与 `/ms/compare → /ms/tools/compare` 两条 permanent 跳转，并从 sitemap 与导航/页脚链接中移除 `/compare`。
资格测试保持「一次一题」向导，进度条换 `Progress`，选项按钮 ≥ 56px 高。

### T6 表单流程
路由：`/services/[id]/apply`、`/contact`、`/status`、`/services/success`。
结构：`PageHeader`（无 lede）→ `Container size="wide"` → `grid lg:grid-cols-[1fr_360px]`：左表单卡（步骤条在卡顶）、右 `sticky top-24` 侧栏（申请页：实时 DSR 卡 + 一条评价；联系页：联系方式 + 营业时间）。
硬约束（e2e）：`#serviceArea` 保持 `<select>`；label 文字 `Monthly Net Income`、`Desired Loan Amount`、`Full Name`、`Phone Number`、`Email Address` 不变；按钮文字 `Next`、`Employed`、`Submit Application` 不变；成功页参考编号仍在页面第一个 `<code>` 内，标题含 `Application Submitted`。
申请页 1269 行需拆分：`ApplyWizard.tsx`（状态与提交）、`steps/Step1Eligibility.tsx`、`steps/Step2Contact.tsx`、`steps/Step3Review.tsx`、`ApplySidebar.tsx`、`lib/content/apply.ts`（文案）。
不渲染 `StickyMobileCTA`。

### T7 法律文本
路由：`/privacy`、`/terms`、`/disclaimer`。
结构：`PageHeader`（标题 + 「最后更新」）→ `grid lg:grid-cols-[240px_1fr]`：左粘性目录，右 `Prose` 编号条款（`h2` 带序号）。去掉一条一卡与图标。

### 系统页
`not-found.tsx`、`error.tsx`：居中，H1 + 一句话 + 两颗按钮（首页 / WhatsApp）。

## 6. 首页（T1 特例）

| # | 板块 | 布局 |
|---|---|---|
| 1 | Hero `id="hero"` | 居中：eyebrow pill（Licensed · Moneylenders Act 1951）→ Display H1（含一个蓝色词）→ lede（≤ 52ch）→ 两颗按钮（primary 滚到 UI 卡；secondary WhatsApp）→ 悬浮 UI 卡（`--shadow-float`，16px 圆角，内含现有 `QuickLeadCapture` 的 4 字段表单，桌面 4 列一行，手机竖排）→ 卡下一行灰色银行 logo（`/partners` 已有素材，`grayscale opacity-60`）。背景仅一处蓝色径向光晕（`radial-gradient(600px 300px at 80% 0%, rgb(37 99 235 / .10), transparent 70%)`）。 |
| 2 | How it works | `SectionHeader` 左对齐 → 三栏，每栏 `01/02/03`（Geist Mono，subtle 色）+ H3 + 两行；三栏之下一张横向 `alt` 卡：「48 小时内你拿到」三项并排（书面评估 / 文件清单 / 下一步）。合并原 ProcessTimeline + Rm30Deliverables。 |
| 3 | Loan products | 三张等高 `Card interactive`，图标 + H3 + 两行 + ghost 链接。 |
| 4 | Calculator | `SectionHeader` 居中 → T5 布局；结果区两个 Tabs：「Your estimate」/「Payment reference」（原 PaymentReferenceTable）。 |
| 5 | Proof | `SectionHeader` 左对齐（标题「Four things we do that brokers cannot」）→ 2×2 网格（图标 + H3 + 一行）→ 下方 3 张案例卡（原 CaseStudies 精简：情境 / 做了什么 / 结果三行 + 底部一句客户评价 + 姓名缩写）。 |
| 6 | Transparency | tone alt → 2×2 四格 `Card`：Rate disclosure / Risk warning / Verify us / PDPA & documents，每格图标 + H3 + 两行 + ghost 链接到对应页。 |
| 7 | FAQ | `SectionHeader` 带 `action`「View all →」→ 单栏手风琴 6 条（保留 FAQ JSON-LD 用完整列表）。 |
| 8 | Final CTA | `Section tone="inverse"`：H2 + 一句 + primary「Check eligibility」+ inverse「WhatsApp」。 |

删除的首页组件：`LicensedTrustBar`、`VerifyTrustCard`（内容并入 6）、`Rm30DeliverablesSection`、`RateDisclosure`、`RiskWarning`、`TrustSecuritySection`、`WhyUsSection`（并入 5）、`ProcessTimeline`、`HeroIntro`、`HeroVisual`、`HeroSpotlight`、`MagneticCTA`、`AnimatedCounter`。

## 7. 文案与 i18n

- 英文与马来文全部重写，风格：短句、动词开头、去营销腔。每个板块标题 ≤ 8 词，lede ≤ 2 句。
- 保留：每页 `metadata` 对象、H1 中的核心关键词（如「Personal Loan Malaysia」「CCRIS」「DSR」）、所有 JSON-LD 的字段值（FAQ 问答文本可同步改写，但问答数量不减）。
- 文案统一从页面文件抽到 `lib/content/<page>.ts`，页面文件只剩布局。
- 马来文版由用户复核。

## 8. 清理

删除以下未引用组件：`AmortizationSchedule`、`LoanPaymentTable`、`BankPartners`、`AreasWeServe`、`TrustBadges`、`LoadingSkeleton`、`finance/StickyMobileCTA`（由新组件替代）、`finance/ComparisonTable`、`finance/RegulatoryInfo`、`finance/InsightsSection`、`finance/AdvisorsSection`、`sections/BlogSection`、`sections/ResourcesSection`、`lazy/TrustSectionLazy`、`lazy/TestimonialCarouselLazy`、`TrustSection`、`TestimonialCarousel`，以及第 2.6 / 3.1 / 6 节列出的组件。
依赖移除：`next-themes`、`canvas-confetti`。

## 9. 实施顺序

1. 令牌 + `globals.css` 重写 + Geist 字体接入。此时旧页面会变样但不崩。
2. `components/layout/*` 基础组件，配 vitest 渲染测试。
3. 根布局、Navbar、Footer、StickyMobileCTA、WhatsAppFab；删除 ClientWidgets 与 next-themes。
4. 首页。
5. T2 文章模板 + 迁移 53 个 URL。
6. T1 其余 7 页（贷款三页先抽 `LoanProductPage`）。
7. T4 → T5（含 `/compare` 合并）→ T6（含申请页拆分）→ T7 → 系统页。
8. 清理孤儿组件与依赖；`npm run lint`、`npm run test`、`npx playwright test`；新增 e2e smoke：遍历 sitemap 中所有路径，断言 200 + 恰好一个 `h1`；390px 与 1280px 两档全路由截图人工检查；Lighthouse 与 `lighthouse-report-prod.html` 对比，性能与可访问性不得下降。

每一步独立提交，可单独 review。

## 10. 验收标准

- 首页板块数 8，桌面首屏内可见 Hero 表单卡顶部。
- 全站无 `py-*` 直接写在 `<section>` 上；无 `.surface-card`、`.gradient-text`、`.hero-grid` 残留。
- Navbar ≤ 220 行，Footer ≤ 180 行，申请页主文件 ≤ 300 行。
- 现有 vitest 与 Playwright 全绿；新增 smoke e2e 全绿。
- Lighthouse 移动端：Performance ≥ 现状，Accessibility ≥ 95。
- 无深色模式残留；`next-themes`、`canvas-confetti` 已从 `package.json` 移除。
