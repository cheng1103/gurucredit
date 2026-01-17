export type DsrStatus = 'approved' | 'conditional' | 'declined';

export interface DsrInput {
  income: number;
  commitments: number;
  loanAmount: number;
  tenureYears: number;
  interestRate?: number;
  targetDsr?: number;
}

export interface DsrResult {
  monthlyPayment: number;
  dsr: number;
  maxLoanAmount: number;
  totalInterest: number;
  status: DsrStatus;
}

export const DEFAULT_INTEREST_RATE = 0.0488; // 4.88%
export const DEFAULT_TARGET_DSR = 0.6; // 60%

const toMonthlyRate = (interestRate: number) => interestRate / 12;

export const calculateMonthlyPayment = (
  loanAmount: number,
  tenureYears: number,
  interestRate = DEFAULT_INTEREST_RATE,
) => {
  const monthlyRate = toMonthlyRate(interestRate);
  const numPayments = tenureYears * 12;

  if (monthlyRate === 0) {
    return loanAmount / numPayments;
  }

  const numerator =
    loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments);
  const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;

  return numerator / denominator;
};

const calculateMaxLoan = (
  maxMonthlyPayment: number,
  tenureYears: number,
  interestRate = DEFAULT_INTEREST_RATE,
) => {
  if (maxMonthlyPayment <= 0) {
    return 0;
  }

  const monthlyRate = toMonthlyRate(interestRate);
  const numPayments = tenureYears * 12;

  if (monthlyRate === 0) {
    return maxMonthlyPayment * numPayments;
  }

  const numerator =
    maxMonthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1);
  const denominator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);

  return numerator / denominator;
};

const getStatusFromDsr = (dsr: number): DsrStatus => {
  if (dsr <= 50) return 'approved';
  if (dsr <= 70) return 'conditional';
  return 'declined';
};

export const calculateDsrOutcome = ({
  income,
  commitments,
  loanAmount,
  tenureYears,
  interestRate = DEFAULT_INTEREST_RATE,
  targetDsr = DEFAULT_TARGET_DSR,
}: DsrInput): DsrResult | null => {
  if (!income || income <= 0 || tenureYears <= 0 || loanAmount <= 0) {
    return null;
  }

  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    tenureYears,
    interestRate,
  );

  const totalCommitments = commitments + monthlyPayment;
  const dsr = (totalCommitments / income) * 100;
  const numPayments = tenureYears * 12;
  const totalInterest = monthlyPayment * numPayments - loanAmount;
  const maxMonthlyPayment = income * targetDsr - commitments;
  const maxLoanAmount = calculateMaxLoan(
    maxMonthlyPayment,
    tenureYears,
    interestRate,
  );

  return {
    monthlyPayment,
    dsr,
    maxLoanAmount: Math.max(0, maxLoanAmount),
    totalInterest,
    status: getStatusFromDsr(dsr),
  };
};
