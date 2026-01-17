import { Injectable } from '@nestjs/common';

export interface DSRCalculation {
  monthlyIncome: number;
  totalMonthlyDebts: number;
  dsrPercentage: number;
  status: 'excellent' | 'good' | 'moderate' | 'high' | 'critical';
  recommendation: string;
  maxAdditionalDebt: number;
}

export interface LoanEligibility {
  isEligible: boolean;
  maxLoanAmount: number;
  approvalChance: 'high' | 'medium' | 'low' | 'very_low';
  issues: string[];
  recommendations: string[];
  suggestedBanks: string[];
}

@Injectable()
export class CreditAnalysisService {
  calculateDSR(
    monthlyIncome: number,
    totalMonthlyDebts: number,
  ): DSRCalculation {
    const dsrPercentage = (totalMonthlyDebts / monthlyIncome) * 100;

    let status: DSRCalculation['status'];
    let recommendation: string;

    if (dsrPercentage <= 30) {
      status = 'excellent';
      recommendation =
        'Your DSR is excellent. You have strong borrowing capacity.';
    } else if (dsrPercentage <= 40) {
      status = 'good';
      recommendation =
        'Your DSR is good. Most banks will approve your loan application.';
    } else if (dsrPercentage <= 50) {
      status = 'moderate';
      recommendation =
        'Your DSR is moderate. Some banks may require additional documentation.';
    } else if (dsrPercentage <= 60) {
      status = 'high';
      recommendation =
        'Your DSR is high. Consider reducing existing debts before applying.';
    } else {
      status = 'critical';
      recommendation =
        'Your DSR is critical. Debt consolidation is recommended.';
    }

    // Calculate max additional debt to stay at 50% DSR
    const maxTotalDebt = monthlyIncome * 0.5;
    const maxAdditionalDebt = Math.max(0, maxTotalDebt - totalMonthlyDebts);

    return {
      monthlyIncome,
      totalMonthlyDebts,
      dsrPercentage: Math.round(dsrPercentage * 100) / 100,
      status,
      recommendation,
      maxAdditionalDebt: Math.round(maxAdditionalDebt),
    };
  }

  assessLoanEligibility(
    monthlyIncome: number,
    totalMonthlyDebts: number,
    requestedLoanAmount: number,
    loanTenureYears: number,
    creditScore: number = 650,
    employmentYears: number = 1,
  ): LoanEligibility {
    const issues: string[] = [];
    const recommendations: string[] = [];
    const suggestedBanks: string[] = [];

    // Calculate DSR
    const estimatedMonthlyPayment = this.calculateMonthlyPayment(
      requestedLoanAmount,
      loanTenureYears,
      5.5, // Average interest rate
    );
    const projectedDSR =
      ((totalMonthlyDebts + estimatedMonthlyPayment) / monthlyIncome) * 100;

    // Check DSR
    if (projectedDSR > 70) {
      issues.push('Projected DSR exceeds 70% - most banks will reject');
    } else if (projectedDSR > 60) {
      issues.push('Projected DSR is above 60% - limited bank options');
    }

    // Check credit score
    if (creditScore < 550) {
      issues.push('Credit score below 550 - high risk category');
    } else if (creditScore < 650) {
      issues.push('Credit score below 650 - may face higher interest rates');
    }

    // Check employment
    if (employmentYears < 1) {
      issues.push(
        'Less than 1 year employment - most banks require minimum 1 year',
      );
    } else if (employmentYears < 2) {
      issues.push(
        'Less than 2 years employment - some banks may require longer history',
      );
    }

    // Calculate max loan amount
    const maxMonthlyPayment = monthlyIncome * 0.5 - totalMonthlyDebts;
    const maxLoanAmount = this.calculateMaxLoanAmount(
      maxMonthlyPayment,
      loanTenureYears,
      5.5,
    );

    // Determine approval chance
    let approvalChance: LoanEligibility['approvalChance'];
    if (issues.length === 0 && projectedDSR <= 50) {
      approvalChance = 'high';
    } else if (issues.length <= 1 && projectedDSR <= 60) {
      approvalChance = 'medium';
    } else if (issues.length <= 2 && projectedDSR <= 70) {
      approvalChance = 'low';
    } else {
      approvalChance = 'very_low';
    }

    // Generate recommendations
    if (projectedDSR > 50) {
      recommendations.push('Consider reducing loan amount or extending tenure');
    }
    if (creditScore < 650) {
      recommendations.push('Work on improving credit score before applying');
    }
    if (employmentYears < 2) {
      recommendations.push(
        'Consider waiting until you have 2+ years employment',
      );
    }

    // Suggest banks based on profile
    if (projectedDSR <= 60 && creditScore >= 600) {
      suggestedBanks.push('Maybank', 'CIMB', 'Public Bank');
    }
    if (projectedDSR <= 50 && creditScore >= 650) {
      suggestedBanks.push('Hong Leong Bank', 'RHB Bank');
    }
    if (issues.length > 2) {
      suggestedBanks.push('AEON Credit', 'Credit Corp');
      recommendations.push('Consider alternative lenders or credit agencies');
    }

    return {
      isEligible: requestedLoanAmount <= maxLoanAmount && issues.length < 3,
      maxLoanAmount: Math.round(maxLoanAmount),
      approvalChance,
      issues,
      recommendations,
      suggestedBanks: [...new Set(suggestedBanks)],
    };
  }

  private calculateMonthlyPayment(
    principal: number,
    years: number,
    annualRate: number,
  ): number {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );
  }

  private calculateMaxLoanAmount(
    monthlyPayment: number,
    years: number,
    annualRate: number,
  ): number {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    return (
      (monthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
    );
  }
}
