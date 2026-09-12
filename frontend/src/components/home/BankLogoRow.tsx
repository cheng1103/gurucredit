import { Marquee } from '@/components/layout';

const BANKS = ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'Hong Leong', 'AmBank', 'Bank Islam', 'Alliance'];

export function BankLogoRow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">{label}</p>
      <Marquee
        ariaLabel={label}
        items={BANKS.map((name) => (
          <span key={name} className="text-sm font-semibold uppercase tracking-wide text-foreground-subtle">
            {name}
          </span>
        ))}
      />
    </div>
  );
}
