const BANKS = ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'Hong Leong', 'AmBank', 'Bank Islam', 'Alliance'];

export function BankLogoRow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">{label}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label={label}>
        {BANKS.map((name) => (
          <li key={name} className="text-sm font-semibold uppercase tracking-wide text-foreground-subtle">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
