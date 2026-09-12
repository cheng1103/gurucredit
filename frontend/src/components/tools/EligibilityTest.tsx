'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  RefreshCw,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LocaleLink } from '@/components/LocaleLink';
import { CardGrid, ListingCard } from '@/components/listings';
import { Stat } from '@/components/layout';
import { cn } from '@/lib/utils';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import {
  eligibilityResourceLinks,
  eligibilityUi,
  getResultLevel,
  questionScores,
  type ResultLevel,
} from '@/lib/content/tools/eligibility';
import type { Language } from '@/lib/i18n/translations';

const resultIcons: Record<ResultLevel, typeof CheckCircle> = {
  excellent: CheckCircle,
  good: TrendingUp,
  fair: AlertTriangle,
  poor: XCircle,
};

const resultTone: Record<ResultLevel, { text: string; bg: string; border: string }> = {
  excellent: { text: 'text-success', bg: 'bg-success-soft', border: 'border-success/30' },
  good: { text: 'text-primary', bg: 'bg-primary-soft', border: 'border-primary/30' },
  fair: { text: 'text-warning', bg: 'bg-warning-soft', border: 'border-warning/30' },
  poor: { text: 'text-destructive', bg: 'bg-destructive/5', border: 'border-destructive/30' },
};

export function EligibilityTest({ language }: { language: Language }) {
  const t = eligibilityUi[language];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const score = questionScores[currentQuestion][optionIndex];
    setAnswers({ ...answers, [currentQuestion]: score });

    if (currentQuestion < t.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const averageScore = showResult ? Math.round(totalScore / t.questions.length) : 0;
  const resultLevel = showResult ? getResultLevel(averageScore) : 'excellent';
  const result = t.results[resultLevel];
  const tone = resultTone[resultLevel];
  const ResultIcon = resultIcons[resultLevel];
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / t.questions.length) * 100;

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-foreground-subtle" aria-live="polite">
          <span>
            {t.progress.question} {Math.min(currentQuestion + 1, t.questions.length)} {t.progress.of} {t.questions.length}
          </span>
          <span>{Math.round(progress)}% {t.progress.complete}</span>
        </div>
        {/* Decorative: the aria-live text above already announces progress. */}
        <Progress value={progress} aria-hidden="true" />
      </div>

      {!showResult ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl">{t.questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {t.questions[currentQuestion].options.map((option, index) => {
              const selected = answers[currentQuestion] === questionScores[currentQuestion][index];
              return (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleAnswer(index)}
                  className={cn(
                    'min-h-14 w-full rounded-lg border-2 p-4 text-left transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                    selected ? 'border-primary bg-primary/5' : 'border-border',
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-medium">{option.label}</span>
                    <ArrowRight className="size-4 shrink-0 text-foreground-subtle" aria-hidden="true" />
                  </span>
                  {option.feedback ? <span className="mt-1 block text-sm text-foreground-subtle">{option.feedback}</span> : null}
                </button>
              );
            })}

            {currentQuestion > 0 ? (
              <Button type="button" variant="ghost" onClick={handlePrevious} className="mt-2">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {t.navigation.previous}
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className={cn('border-2', tone.border, tone.bg)}>
            <CardContent className="pt-6 text-center">
              <div className={cn('mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-4', tone.border, tone.bg)}>
                <ResultIcon className={cn('size-8', tone.text)} aria-hidden="true" />
              </div>
              <div className="mb-4 flex justify-center">
                <Stat value={`${averageScore}/100`} label={t.result.yourScore} tone={resultLevel === 'poor' ? 'default' : 'primary'} />
              </div>
              <h2 className={cn('text-2xl font-bold lg:text-3xl', tone.text)}>{result.title}</h2>
              <p className="mx-auto mt-2 max-w-md text-foreground-muted">{result.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" aria-hidden="true" />
                {t.result.recommendations}
              </CardTitle>
              <CardDescription>{t.result.basedOn}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.map((rec) => (
                  <li key={rec} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{t.resources.title}</h3>
            <CardGrid columns={3}>
              {eligibilityResourceLinks.map((item) => (
                <ListingCard
                  key={item.key}
                  href={item.href}
                  title={t.resources.labels[item.key]}
                  description={t.resources.descriptions[item.key]}
                  cta={t.resources.button}
                />
              ))}
            </CardGrid>
          </div>

          <Card className="border-primary/20 bg-primary-soft">
            <CardContent className="py-8 text-center">
              <h3 className="mb-2 text-xl font-bold">{t.cta.title}</h3>
              <p className="mb-6 text-foreground-muted">{t.cta.description}</p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <LocaleLink href={PATHS.servicesApply('1')}>
                    {t.cta.getAnalysis}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </LocaleLink>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {t.cta.chat}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button type="button" variant="outline" onClick={handleRestart}>
              <RefreshCw className="size-4" aria-hidden="true" />
              {t.restart}
            </Button>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-foreground-subtle">{t.disclaimer}</p>
    </div>
  );
}
