/**
 * Bucketed monthly-income segment used for `apply_step_1_complete` and
 * `apply_submit_success` analytics events. Ported verbatim from the
 * pre-split apply page so segmentation stays comparable across the cutover.
 */
export function getIncomeBand(monthlyIncomeValue: number): string {
  if (!monthlyIncomeValue) return 'unknown';
  if (monthlyIncomeValue < 3000) return 'below-rm3000';
  if (monthlyIncomeValue < 5000) return 'rm3000-rm5000';
  if (monthlyIncomeValue < 8000) return 'rm5000-rm8000';
  return 'above-rm8000';
}
