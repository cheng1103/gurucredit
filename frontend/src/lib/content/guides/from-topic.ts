import type { GuideTopic } from '@/lib/guide-topics';
import { PATHS } from '@/lib/i18n/routes';
import type { GuideContent, GuideDoc } from './types';
import { guideUi } from './ui';

function build(topic: GuideTopic, ms: boolean): GuideContent {
  const pick = <T,>(en: T, m: T) => (ms ? m : en);
  return {
    eyebrow: pick(guideUi.en.eyebrow, guideUi.ms.eyebrow),
    title: pick(topic.title, topic.titleMs),
    lede: pick(topic.description, topic.descriptionMs),
    stats: topic.stats.map((s) => ({ label: pick(s.label, s.labelMs), value: s.value })),
    sections: [
      { kind: 'steps', id: 'steps', heading: pick(topic.stepsTitle, topic.stepsTitleMs), steps: topic.steps.map((s) => ({ title: pick(s.title, s.titleMs), description: pick(s.description, s.descriptionMs) })) },
      { kind: 'checklist', id: 'checklist', heading: pick(topic.checklistTitle, topic.checklistTitleMs), items: pick(topic.checklist, topic.checklistMs) },
      { kind: 'warnings', id: 'warnings', heading: pick(topic.warningsTitle, topic.warningsTitleMs), items: pick(topic.warnings, topic.warningsMs) },
    ],
    faqs: topic.faqs.map((f) => ({ question: pick(f.question, f.questionMs), answer: pick(f.answer, f.answerMs) })),
    related: topic.related.map((r) => ({ title: pick(r.title, r.titleMs), href: r.href })),
    howTo: { name: topic.stepsTitle, description: topic.description, steps: topic.steps.map((s) => ({ name: s.title, text: s.description })) },
  };
}

export function guideFromTopic(topic: GuideTopic): GuideDoc {
  return { slug: topic.slug, path: PATHS.loanGuide.topic(topic.slug), breadcrumbLabel: topic.title, content: { en: build(topic, false), ms: build(topic, true) } };
}
