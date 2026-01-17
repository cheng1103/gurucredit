import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreditAnalysisService } from './credit-analysis.service';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class DSRCalculationDto {
  @ApiProperty({ example: 5000 })
  @IsNumber()
  monthlyIncome: number;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  totalMonthlyDebts: number;
}

class LoanEligibilityDto {
  @ApiProperty({ example: 5000 })
  @IsNumber()
  monthlyIncome: number;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  totalMonthlyDebts: number;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  requestedLoanAmount: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  loanTenureYears: number;

  @ApiProperty({ example: 650, required: false })
  @IsOptional()
  @IsNumber()
  creditScore?: number;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsNumber()
  employmentYears?: number;
}

@ApiTags('Credit Analysis')
@Controller('credit-analysis')
export class CreditAnalysisController {
  constructor(private creditAnalysisService: CreditAnalysisService) {}

  @Post('dsr')
  @ApiOperation({ summary: 'Calculate Debt Service Ratio' })
  calculateDSR(@Body() dto: DSRCalculationDto) {
    return this.creditAnalysisService.calculateDSR(
      dto.monthlyIncome,
      dto.totalMonthlyDebts,
    );
  }

  @Post('eligibility')
  @ApiOperation({ summary: 'Assess loan eligibility' })
  assessEligibility(@Body() dto: LoanEligibilityDto) {
    return this.creditAnalysisService.assessLoanEligibility(
      dto.monthlyIncome,
      dto.totalMonthlyDebts,
      dto.requestedLoanAmount,
      dto.loanTenureYears,
      dto.creditScore,
      dto.employmentYears,
    );
  }
}
