import { Module } from '@nestjs/common';
import { CreditAnalysisController } from './credit-analysis.controller';
import { CreditAnalysisService } from './credit-analysis.service';

@Module({
  controllers: [CreditAnalysisController],
  providers: [CreditAnalysisService],
  exports: [CreditAnalysisService],
})
export class CreditAnalysisModule {}
