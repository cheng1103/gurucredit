import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
vi.mock('next/navigation', () => ({ usePathname: () => '/blog/x', useRouter: () => ({ push: vi.fn() }) }));
import { BlogArticle } from '../BlogArticle';
import type { BlogPost } from '@/lib/blog-data';

const post: BlogPost = {
  slug: 'x', title: 'Understanding DSR', titleMs: 'Memahami DSR', excerpt: 'E', excerptMs: 'E-ms',
  content: '## What is DSR?\n\nDebt service ratio.\n\n### Why it matters\n\nBecause.\n\n## Why **DSR** matters\n\nMore.', contentMs: '## Apa itu DSR?\n\nNisbah.',
  category: 'guide', author: 'GURU Credits Team', publishedAt: '2026-01-01', readTime: 4, image: '/images/blog/x.jpg', tags: ['dsr'],
};

describe('BlogArticle', () => {
  it('renders h1, markdown headings with ids, author card and related grid', () => {
    render(<LanguageProvider><BlogArticle post={post} relatedPosts={[{ ...post, slug: 'y', title: 'Second' }]} /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 1, name: 'Understanding DSR' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'What is DSR?' })).toHaveAttribute('id', 'what-is-dsr');
    expect(screen.getByRole('heading', { level: 2, name: 'Why DSR matters' })).toHaveAttribute('id', 'why-dsr-matters');
    expect(screen.getAllByText(/GURU Credits Team/).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Second/ })).toHaveAttribute('href', '/blog/y');
  });
});
