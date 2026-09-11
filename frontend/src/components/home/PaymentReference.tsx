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
