'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

export function Logo({ size = 'md', variant = 'full' }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="url(#gradient)" />
        <path
          d="M50 20C33.4 20 20 33.4 20 50C20 66.6 33.4 80 50 80C58.8 80 66.7 76.3 72.3 70.3L72.3 55H52V62H64V67C60 71 55.3 73 50 73C37.3 73 27 62.7 27 50C27 37.3 37.3 27 50 27C57.5 27 64.2 30.5 68.5 36L74.5 31C68.8 23.8 60 20 50 20Z"
          fill="white"
        />
        <circle cx="68" cy="55" r="8" fill="#FFD700" />
        <path
          d="M68 51V59M64 55H72"
          stroke="#1e3a5f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#2d5a87" />
          </linearGradient>
        </defs>
      </svg>

      {variant === 'full' && (
        <div className="flex flex-col">
          <span className={`font-bold ${text} text-primary leading-none`}>
            GURU
          </span>
          <span className="text-xs text-muted-foreground tracking-widest">
            ADMIN
          </span>
        </div>
      )}
    </div>
  );
}
