import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));
import { GuideArticle } from '../GuideArticle';
import { guideFromTopic } from '@/lib/content/guides/from-topic';
import { getGuideTopic } from '@/lib/guide-topics';
import { editorialPolicyGuide } from '@/lib/content/guides/editorial-policy';

describe('GuideArticle', () => {
  it('renders a topic as an article with numbered steps, checklist, warnings and FAQ', () => {
    const doc = guideFromTopic(getGuideTopic('personal-loan-minimum-salary')!);
    render(<LanguageProvider><GuideArticle doc={doc} language="en" /></LanguageProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(doc.content.en.title);
    expect(screen.getByRole('list', { name: /steps/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole('button', { expanded: false }).length).toBeGreaterThan(0);
  });

  it('does not show a Loan Guides crumb on editorial pages', () => {
    render(<LanguageProvider><GuideArticle doc={editorialPolicyGuide} language="en" /></LanguageProvider>);
    expect(screen.queryByRole('link', { name: 'Loan Guides' })).toBeNull();
  });

  it('localizes the HowTo JSON-LD for a topic', () => {
    const topic = getGuideTopic('personal-loan-minimum-salary')!;
    const doc = guideFromTopic(topic);
    const { container } = render(<LanguageProvider><GuideArticle doc={doc} language="ms" /></LanguageProvider>);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script!.textContent).toContain(topic.stepsTitleMs);
  });
});
