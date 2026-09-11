'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

type Entry = { id: string; text: string; level: 2 | 3 };

export function TableOfContents({ containerId, title, className }: { containerId: string; title: string; className?: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2, h3'));
    const next: Entry[] = headings.map((h) => {
      if (!h.id) h.id = slugifyHeading(h.textContent ?? '');
      return { id: h.id, text: h.textContent ?? '', level: h.tagName === 'H2' ? 2 : 3 };
    });
    const frame = requestAnimationFrame(() => setEntries(next));
    if (typeof IntersectionObserver === 'undefined') return () => cancelAnimationFrame(frame);
    const io = new IntersectionObserver(
      (records) => {
        const visible = records.filter((r) => r.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((h) => io.observe(h));
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [containerId]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label={title} className={cn('text-sm', className)}>
      <p className="eyebrow mb-3">{title}</p>
      <ol className="space-y-1.5 border-l border-border">
        {entries.map((e) => (
          <li key={e.id} className={cn(e.level === 3 && 'pl-3')}>
            <a
              href={`#${e.id}`}
              className={cn(
                '-ml-px block border-l-2 py-0.5 pl-3 transition-colors',
                active === e.id ? 'border-primary text-foreground' : 'border-transparent text-foreground-subtle hover:text-foreground',
              )}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
