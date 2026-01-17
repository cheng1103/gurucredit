import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SERVICE_AREA_CODES } from '@guru/shared-config';
import { Sanitize } from '../common/utils/sanitize.util';

export const CONTACT_STATUSES = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const;

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @Sanitize(120, false)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Sanitize(30)
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(SERVICE_AREA_CODES, {
    message: 'Service area must be Kuala Lumpur or Selangor',
  })
  serviceArea: string;

  @IsNotEmpty()
  @IsString()
  @Sanitize(200, false)
  subject: string;

  @IsNotEmpty()
  @IsString()
  @Sanitize(2000, false)
  message: string;
}

export class UpdateContactStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(CONTACT_STATUSES, {
    message: 'Status must be one of: NEW, READ, REPLIED, ARCHIVED',
  })
  status: string;

  @IsOptional()
  @IsString()
  @Sanitize(500)
  adminNote?: string;
}
