import type { Language } from '@/lib/i18n/translations';
import { AnimatedCounter } from '@/components/AnimatedCounter';

type Props = { language: Language };

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

function RmCounter({ value }: { value: number }) {
  return <AnimatedCounter end={value} prefix="RM " duration={1800} />;
}

export function PaymentReferenceTable({ language }: Props) {
  const kicker = language === 'ms' ? 'Rujukan Bayaran Bulanan' : 'Monthly Payment Reference';
  const title = language === 'ms'
    ? 'Anggaran bayaran bulanan pinjaman peribadi'
    : 'Monthly installment quick reference';
  const subtitle = language === 'ms'
    ? 'Kadar tetap (flat rate) 4.88% setahun. Jadual ini hanya untuk rujukan — tawaran sebenar anda akan bergantung kepada profil kredit dan DSR.'
    : 'At 4.88% per annum flat rate. Reference only — your actual offer depends on your credit profile and DSR.';
  const rateLabel = language === 'ms' ? 'Kadar Faedah' : 'Interest Rate';
  const amountHeader = language === 'ms' ? 'JUMLAH PINJAMAN' : 'LOAN AMOUNT';
  const perMonthLabel = language === 'ms' ? '/bulan' : '/month';
  const yearsAbbr = language === 'ms' ? 'thn' : 'yrs';
  const disclaimer = language === 'ms'
    ? 'Angka dibundarkan ke RM terdekat. Bayaran pemprosesan, yuran setem dan insurans tidak termasuk.'
    : 'Figures rounded to nearest RM. Processing, stamp duty and insurance fees not included.';

  return (
    <section className="relative py-20 lg:py-28 mesh-bg section-accent-top overflow-hidden">
      {/* Decorative orbs */}
      <div aria-hidden="true" className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-20 w-[24rem] h-[24rem] bg-accent/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="container relative">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6">
            <span className="h-px w-10 bg-foreground/30" />
            <span className="font-medium">{kicker}</span>
          </div>
          <h2
            className="font-display leading-[1.1] tracking-[-0.02em] text-foreground mb-5"
            style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)' }}
          >
            {title}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="inline-flex items-baseline gap-3 mb-8 rounded-full border border-border/60 bg-background px-5 py-2.5">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {rateLabel}
          </span>
          <span className="font-display text-xl font-semibold text-foreground tabular-nums">
            4.88%
          </span>
          <span className="text-xs text-muted-foreground">p.a.</span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-foreground/[0.03] border-b border-border/60">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-foreground/[0.03] text-left px-5 py-4 font-semibold text-[11px] uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap"
                  >
                    {amountHeader}
                  </th>
                  {TENURES.map((yr) => (
                    <th
                      key={yr}
                      scope="col"
                      className="text-center px-4 py-4 font-semibold text-[11px] uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap"
                    >
                      {yr} {yearsAbbr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, rowIdx) => (
                  <tr
                    key={row.amount}
                    className={`border-b border-border/40 last:border-0 transition-all duration-300 hover:bg-primary/[0.05] hover:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2),0_8px_24px_-8px_rgba(15,23,42,0.15)] hover:scale-[1.01] hover:relative hover:z-10 ${rowIdx % 2 === 1 ? 'bg-foreground/[0.015]' : ''}`}
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-[1] bg-inherit text-left px-5 py-5 font-display text-base font-semibold text-foreground tabular-nums whitespace-nowrap"
                    >
                      <RmCounter value={row.amount} />
                    </th>
                    {row.payments.map((p, idx) => (
                      <td key={idx} className="text-center px-4 py-5 whitespace-nowrap">
                        <div className="font-display text-base font-semibold text-foreground tabular-nums leading-tight">
                          <RmCounter value={p} />
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {perMonthLabel}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground max-w-3xl leading-relaxed">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
