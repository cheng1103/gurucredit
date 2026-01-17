import { CreditAnalysisService } from './credit-analysis.service';

describe('CreditAnalysisService', () => {
  let service: CreditAnalysisService;

  beforeEach(() => {
    service = new CreditAnalysisService();
  });

  it('calculates DSR status buckets correctly', () => {
    const excellent = service.calculateDSR(8000, 2000);
    expect(excellent.status).toBe('excellent');
    expect(excellent.dsrPercentage).toBeCloseTo(25);
    expect(excellent.maxAdditionalDebt).toBeGreaterThan(0);

    const critical = service.calculateDSR(3500, 2800);
    expect(critical.status).toBe('critical');
    expect(critical.recommendation).toMatch(/critical/i);
    expect(critical.maxAdditionalDebt).toBe(0);
  });

  it('assesses loan eligibility with issues and recommendations', () => {
    const result = service.assessLoanEligibility(
      6000, // income
      1500, // existing debts
      80000, // requested loan
      7, // tenure
      620, // credit score
      1, // employment years
    );

    expect(result.isEligible).toBeTruthy();
    expect(result.approvalChance).toMatch(/high|medium|low|very_low/);
    expect(result.maxLoanAmount).toBeGreaterThan(0);
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(Array.isArray(result.suggestedBanks)).toBe(true);
  });
});
