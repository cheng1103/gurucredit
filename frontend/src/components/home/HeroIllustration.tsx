import { useId } from 'react';

type Labels = { fit: string; strong: string };

/**
 * Inline brand illustration for the hero: "your loan file, read the way a
 * credit officer reads it". Three overlapping cards (report + DSR gauge,
 * approval-fit summary, WhatsApp reply) over a soft aurora backdrop.
 * All copy is either language-neutral (DSR, 82%) or passed in via `labels`.
 *
 * Layout keeps generous margins in the top-left and bottom-right corners of
 * the 520x640 canvas: the two floating <Stat> cards in Hero.tsx sit there.
 */
export function HeroIllustration({
  title,
  labels,
  idPrefix,
}: {
  title: string;
  labels: Labels;
  /** Prefix for every internal SVG id (defs, title). Defaults to a
   * per-render-unique `gc<reactId>` (via `useId()`) so two instances of this
   * component on the same page never collide on duplicate SVG ids. */
  idPrefix?: string;
}) {
  // useId() wraps its output in colons (e.g. ":r0:"), which are invalid in an
  // unescaped CSS class/id selector — strip them before using it as one.
  const reactId = useId().replace(/:/g, '');
  const p = idPrefix ?? `gc${reactId}`;
  const titleId = `${p}-illustration-title`;

  // Back "report" card.
  const cardX = 64;
  const cardY = 120;
  const cardW = 352;
  const cardH = 366;
  const contentLeft = cardX + 32;
  const contentRight = cardX + cardW - 32;

  // DSR gauge geometry — semicircle from 180deg (left) to 0deg (right).
  const cx = (contentLeft + contentRight) / 2;
  const cy = 286;
  const r = 70;
  const arcLength = Math.PI * r;
  const dsrValue = 0.52;
  const dsrOffset = arcLength * (1 - dsrValue);
  const needleAngle = Math.PI * (1 - dsrValue);
  const needleX = cx + r * Math.cos(needleAngle);
  const needleY = cy - r * Math.sin(needleAngle);

  // Approval-fit progress bar (middle card).
  const fitCardX = 232;
  const fitCardY = 422;
  const barX = fitCardX + 24;
  const barY = fitCardY + 42;
  const barWidth = 104;
  const fitValue = 0.82;
  const fillWidth = barWidth * fitValue;

  const checklist = [
    { y: 360, width: 152 },
    { y: 394, width: 132 },
    { y: 428, width: 148 },
  ];

  return (
    <svg
      viewBox="0 0 520 640"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{title}</title>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .${p}-hero-illus .${p}-dsr-arc {
            animation: ${p}-hero-dsr 1.2s 0.15s ease-out both;
          }
          .${p}-hero-illus .${p}-dsr-dot {
            animation: ${p}-hero-dot 1.2s 0.15s ease-out both;
          }
          .${p}-hero-illus .${p}-fit-fill {
            animation: ${p}-hero-fit 0.9s 0.35s ease-out both;
          }
          @keyframes ${p}-hero-dsr {
            from { stroke-dashoffset: ${arcLength}; }
            to { stroke-dashoffset: ${dsrOffset}; }
          }
          @keyframes ${p}-hero-dot {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes ${p}-hero-fit {
            from { width: 0px; }
            to { width: ${fillWidth}px; }
          }
        }
      `}</style>

      <defs>
        <filter id={`${p}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={`${p}-shadow-lg`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#0a0a0a" floodOpacity="0.12" />
        </filter>
        <filter id={`${p}-shadow-sm`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0a0a0a" floodOpacity="0.10" />
        </filter>
        <linearGradient id={`${p}-brand`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <pattern id={`${p}-dots`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.4" fill="#2563eb" opacity="0.08" />
        </pattern>
        <radialGradient id={`${p}-dots-fade`} cx="86%" cy="10%" r="50%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`${p}-dots-mask`}>
          <rect x="0" y="0" width="520" height="640" fill={`url(#${p}-dots-fade)`} />
        </mask>
      </defs>

      <g className={`${p}-hero-illus`}>
        {/* Decor: blurred blobs + top-right dot grid. Each blob gets its own
            filter pass (rather than one filter around a <g>) so the browser
            only rasterizes a small region per blob instead of the full
            bounding box of all three combined. */}
        <circle cx="70" cy="90" r="72" fill="#bfdbfe" opacity="0.7" filter={`url(#${p}-blur)`} />
        <circle cx="440" cy="560" r="108" fill="#e9d5ff" opacity="0.7" filter={`url(#${p}-blur)`} />
        <circle cx="456" cy="140" r="72" fill="#ccfbf1" opacity="0.7" filter={`url(#${p}-blur)`} />
        <rect x="0" y="0" width="520" height="640" fill={`url(#${p}-dots)`} mask={`url(#${p}-dots-mask)`} />

        {/* Back layer: report card */}
        <rect x={cardX} y={cardY} width={cardW} height={cardH} rx="20" fill="#ffffff" filter={`url(#${p}-shadow-lg)`} />
        <rect x={cardX} y={cardY} width={cardW} height={cardH} rx="20" fill="none" stroke="#e5e5e5" />

        <rect x={contentLeft} y="150" width="140" height="10" rx="5" fill="#d4d4d4" />
        <rect x={contentLeft} y="170" width="100" height="8" rx="4" fill="#e5e5e5" />
        <rect x={contentLeft} y="186" width="70" height="8" rx="4" fill="#e5e5e5" />

        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          className={`${p}-dsr-arc`}
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={`url(#${p}-brand)`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={dsrOffset}
        />
        <circle className={`${p}-dsr-dot`} cx={needleX} cy={needleY} r="7" fill="#ffffff" stroke={`url(#${p}-brand)`} strokeWidth="4" />
        <text
          x={cx}
          y="322"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontWeight="600"
          fontSize="24"
          fill="#0a0a0a"
        >
          DSR 52%
        </text>

        {checklist.map((row) => (
          <g key={row.y}>
            <circle cx={contentLeft + 12} cy={row.y} r="12" fill="#f0fdf4" />
            <path
              d={`M ${contentLeft + 7} ${row.y} L ${contentLeft + 11} ${row.y + 4} L ${contentLeft + 18} ${row.y - 5}`}
              fill="none"
              stroke="#15803d"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x={contentLeft + 36} y={row.y - 4} width={row.width} height="8" rx="4" fill="#e5e5e5" />
          </g>
        ))}

        {/* Middle layer: approval fit card, offset down-right from the report card */}
        <rect x={fitCardX} y={fitCardY} width="216" height="104" rx="16" fill="#ffffff" filter={`url(#${p}-shadow-sm)`} />
        <rect x={fitCardX} y={fitCardY} width="216" height="104" rx="16" fill="none" stroke="#e5e5e5" />
        <text x={barX} y={fitCardY + 28} fontSize="13" fontWeight="500" fill="#737373">
          {labels.fit}
        </text>
        <rect x={barX} y={barY} width={barWidth} height="10" rx="5" fill="#e5e5e5" />
        <rect className={`${p}-fit-fill`} x={barX} y={barY} width={fillWidth} height="10" rx="5" fill={`url(#${p}-brand)`} />
        <text
          x={fitCardX + 216 - 24}
          y={barY + 9}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontWeight="600"
          fontSize="14"
          fill="#0a0a0a"
        >
          82%
        </text>
        <rect x={barX} y={barY + 24} width="68" height="22" rx="11" fill="#f0fdf4" />
        <text x={barX + 34} y={barY + 39} textAnchor="middle" fontSize="12" fontWeight="600" fill="#15803d">
          {labels.strong}
        </text>

        {/* Front layer: WhatsApp reply card, bottom-left */}
        <rect x="8" y="440" width="192" height="160" rx="22" fill="#ffffff" filter={`url(#${p}-shadow-sm)`} />
        <rect x="8" y="440" width="192" height="160" rx="22" fill="none" stroke="#e5e5e5" />
        <rect x="80" y="450" width="48" height="6" rx="3" fill="#e5e5e5" />

        <circle cx="36" cy="480" r="16" fill="#2563eb" />
        <text x="36" y="485" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">
          GC
        </text>

        <rect x="60" y="468" width="124" height="30" rx="12" fill="#f5f5f5" />
        <rect x="72" y="477" width="90" height="6" rx="3" fill="#d4d4d4" />
        <rect x="72" y="487" width="60" height="6" rx="3" fill="#e5e5e5" />

        <rect x="84" y="508" width="100" height="36" rx="12" fill="#dcfce7" />
        <rect x="96" y="518" width="52" height="6" rx="3" fill="#86efac" />
        <path
          d="M 156 530 L 160 534 L 168 524"
          fill="none"
          stroke="#15803d"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
