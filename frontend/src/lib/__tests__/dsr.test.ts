import { describe, it, expect } from 'vitest';
import { calculateDsrOutcome } from '../dsr';

describe('calculateDsrOutcome', () => {
  it('returns null when income is zero', () => {
    expect(
      calculateDsrOutcome({
        income: 0,
        commitments: 500,
        loanAmount: 20000,
        tenureYears: 5,
      }),
    ).toBeNull();
  });

  it('flags application as approved when DSR <= 50%', () => {
    const result = calculateDsrOutcome({
      income: 8000,
      commitments: 500,
      loanAmount: 20000,
      tenureYears: 5,
    });

    expect(result).not.toBeNull();
    expect(result?.status).toBe('approved');
    expect(result?.dsr).toBeGreaterThan(0);
  });

  it('flags application as conditional when DSR between 50% and 70%', () => {
    const result = calculateDsrOutcome({
      income: 5000,
      commitments: 1500,
      loanAmount: 60000,
      tenureYears: 5,
    });

    expect(result?.status).toBe('conditional');
  });

  it('flags application as declined when DSR exceeds 70%', () => {
    const result = calculateDsrOutcome({
      income: 4000,
      commitments: 2000,
      loanAmount: 80000,
      tenureYears: 3,
    });

    expect(result?.status).toBe('declined');
    expect(result?.maxLoanAmount).toBeGreaterThanOrEqual(0);
  });
});
