import { Marquee } from '@/components/layout';

// Intrinsic pixel dimensions (viewBox / natural size) for each logo file —
// used as the <img> width/height attributes so the browser can reserve the
// right box before the image loads and the marquee track never reflows.
// SVG dims read from each file's own viewBox/width/height; raster dims read
// with `sips -g pixelWidth -g pixelHeight`.
const BANKS = [
  { name: 'Maybank', file: 'maybank.svg', width: 1000, height: 210 },
  { name: 'CIMB', file: 'cimb.svg', width: 200, height: 31 },
  { name: 'Public Bank', file: 'publicbank.svg', width: 275, height: 119 },
  { name: 'RHB', file: 'rhb.svg', width: 144, height: 52 },
  { name: 'Hong Leong', file: 'hongleong.svg', width: 229, height: 56 },
  { name: 'AmBank', file: 'ambank.svg', width: 176, height: 75 },
  // Converted from bankislam.jpg (near-white pixels made transparent — see
  // I8) so it sits on the same white-plate-free row as the other logos.
  { name: 'Bank Islam', file: 'bankislam.png', width: 1130, height: 262 },
  { name: 'Alliance', file: 'alliance.png', width: 223, height: 35 },
];

export function BankLogoRow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">{label}</p>
      <Marquee
        className="logo-row group"
        ariaLabel={label}
        items={BANKS.map((bank) => (
          <img
            key={bank.name}
            src={`/images/banks/${bank.file}`}
            alt={bank.name}
            width={bank.width}
            height={bank.height}
            loading="lazy"
            decoding="async"
            className={
              bank.file === 'alliance.png'
                ? 'h-6 w-auto max-w-[140px] object-contain grayscale opacity-70 transition group-hover:grayscale-0 group-hover:opacity-100'
                : 'h-7 w-auto max-w-[140px] object-contain grayscale opacity-70 transition group-hover:grayscale-0 group-hover:opacity-100'
            }
          />
        ))}
      />
    </div>
  );
}
