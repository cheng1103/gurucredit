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
