import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));
import { GuideArticle } from '../GuideArticle';
import { guideFromTopic } from '@/lib/content/guides/from-topic';
import { getGuideTopic } from '@/lib/guide-topics';

describe('GuideArticle', () => {
  it('renders a topic as an article with numbered steps, checklist, warnings and FAQ', () => {
    const doc = guideFromTopic(getGuideTopic('personal-loan-minimum-salary')!);
    render(<LanguageProvider><GuideArticle doc={doc} language="en" /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(doc.content.en.title);
    expect(screen.getByRole('list', { name: /steps/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole('button', { expanded: false }).length).toBeGreaterThan(0);
  });
});
