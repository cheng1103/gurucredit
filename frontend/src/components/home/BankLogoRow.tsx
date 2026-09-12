import { Marquee } from '@/components/layout';

const BANKS = [
  { name: 'Maybank', file: 'maybank.svg' },
  { name: 'CIMB', file: 'cimb.svg' },
  { name: 'Public Bank', file: 'publicbank.svg' },
  { name: 'RHB', file: 'rhb.svg' },
  { name: 'Hong Leong', file: 'hongleong.svg' },
  { name: 'AmBank', file: 'ambank.svg' },
  { name: 'Bank Islam', file: 'bankislam.jpg' },
  { name: 'Alliance', file: 'alliance.png' },
];

export function BankLogoRow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">{label}</p>
      <Marquee
        ariaLabel={label}
        items={BANKS.map((bank) => (
          <img
            key={bank.name}
            src={`/images/banks/${bank.file}`}
            alt={bank.name}
            height={28}
            loading="lazy"
            decoding="async"
            className={
              bank.file === 'alliance.png'
                ? 'h-6 w-auto max-w-[140px] object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100'
                : 'h-7 w-auto max-w-[140px] object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100'
            }
          />
        ))}
      />
    </div>
  );
}
