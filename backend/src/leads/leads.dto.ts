import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SERVICE_AREA_CODES } from '@guru/shared-config';
import { Sanitize } from '../common/utils/sanitize.util';

export const LEAD_STATUSES = ['NEW', 'CONTACTED', 'CONVERTED', 'NOT_INTERESTED'] as const;
export const LEAD_SOURCES = ['EXIT_INTENT', 'FOOTER', 'POPUP'] as const;

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  @Sanitize(30, false)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(SERVICE_AREA_CODES, {
    message: 'We currently serve Kuala Lumpur & Selangor only',
  })
  serviceArea: string;

  @IsOptional()
  @IsString()
  @Sanitize(100)
  source?: string;

  @IsOptional()
  @IsString()
  @Sanitize(200)
  pageUrl?: string;

  @IsOptional()
  @IsString()
  @Sanitize(20)
  language?: string;
}

export class UpdateLeadStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(LEAD_STATUSES, {
    message: 'Status must be one of: NEW, CONTACTED, CONVERTED, NOT_INTERESTED',
  })
  status: string;

  @IsOptional()
  @IsString()
  @Sanitize(500)
  notes?: string;
}

export class DistributeLeadDto {
  @IsNotEmpty()
  @IsString()
  teamMemberId: string;

  @IsOptional()
  @IsString()
  @Sanitize(300)
  note?: string;
}
