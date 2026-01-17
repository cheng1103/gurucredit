import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  IsEmail,
  Length,
  MaxLength,
  Matches,
  IsIn,
  IsUUID,
} from 'class-validator';
import {
  CONTACT_PREFERENCES,
  EMPLOYMENT_TYPES,
  REFERRAL_SOURCES,
  SERVICE_AREA_CODES,
} from '@guru/shared-config';
import { Sanitize } from '../../common/utils/sanitize.util';

export enum ApplicationStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export enum FollowUpStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
  SNOOZED = 'SNOOZED',
}

export enum ContactChannel {
  PHONE = 'PHONE',
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
}

export enum ContactOutcome {
  CONNECTED = 'CONNECTED',
  NO_ANSWER = 'NO_ANSWER',
  LEFT_MESSAGE = 'LEFT_MESSAGE',
  FOLLOW_UP = 'FOLLOW_UP',
  NOT_INTERESTED = 'NOT_INTERESTED',
}

const MALAYSIAN_PHONE_REGEX =
  /^(\+?6?0)[0-9]{1,2}[-\s]?[0-9]{3,4}[-\s]?[0-9]{4}$/;

// Public application DTO - no login required
export class CreatePublicApplicationDto {
  @ApiProperty()
  @IsString()
  serviceId: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(2, 100)
  @Sanitize(100, false)
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+60123456789' })
  @IsString()
  @Matches(MALAYSIAN_PHONE_REGEX, {
    message: 'Please provide a valid Malaysian phone number',
  })
  @Sanitize(30, false)
  phone: string;

  @ApiProperty({ example: 'MY-14', enum: SERVICE_AREA_CODES })
  @IsString()
  @IsIn(SERVICE_AREA_CODES, {
    message: 'We currently serve Kuala Lumpur & Selangor only',
  })
  serviceArea: string;

  @ApiProperty({ example: '900101-01-1234', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Sanitize(20)
  icNumber?: string;

  @ApiProperty({ example: 'employed', required: false })
  @IsOptional()
  @IsString()
  @IsIn(EMPLOYMENT_TYPES, {
    message: 'Employment type must be one of the provided options',
  })
  employmentType?: string;

  @ApiProperty({ example: 'ABC Company', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Sanitize(100)
  employerName?: string;

  @ApiProperty({ example: 'Manager', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Sanitize(100)
  jobTitle?: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  monthlyIncome: number;

  @ApiProperty({ example: 1000, required: false })
  @IsOptional()
  @IsNumber()
  houseLoan?: number;

  @ApiProperty({ example: 500, required: false })
  @IsOptional()
  @IsNumber()
  carLoan?: number;

  @ApiProperty({ example: 300, required: false })
  @IsOptional()
  @IsNumber()
  personalLoan?: number;

  @ApiProperty({ example: 200, required: false })
  @IsOptional()
  @IsNumber()
  creditCard?: number;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  otherDebts?: number;

  @ApiProperty({ example: 'House', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Sanitize(50)
  loanPurpose?: string;

  @ApiProperty({ example: 100000, required: false })
  @IsOptional()
  @IsNumber()
  loanAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @Sanitize(1000)
  additionalNotes?: string;

  @ApiProperty({ example: 'Google', required: false })
  @IsOptional()
  @IsString()
  @IsIn(REFERRAL_SOURCES, {
    message: 'Referral source must match the available options',
  })
  @Sanitize(100)
  referralSource?: string;

  @ApiProperty({ example: 'Evening', required: false })
  @IsOptional()
  @IsString()
  @IsIn(CONTACT_PREFERENCES, {
    message: 'Contact preference must match the available slots',
  })
  contactPreference?: string;
}

export class CreateApplicationDto {
  @ApiProperty()
  @IsString()
  serviceId: string;

  @ApiProperty({ example: 5000, required: false })
  @IsOptional()
  @IsNumber()
  monthlyIncome?: number;

  @ApiProperty({ example: 1500, required: false })
  @IsOptional()
  @IsNumber()
  existingDebts?: number;

  @ApiProperty({ example: 'employed', required: false })
  @IsOptional()
  @IsString()
  @IsIn(EMPLOYMENT_TYPES, {
    message: 'Employment type must be one of the provided options',
  })
  employmentType?: string;

  @ApiProperty({ example: 'ABC Company', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Sanitize(100)
  employerName?: string;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsNumber()
  yearsEmployed?: number;

  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  @IsNumber()
  loanAmount?: number;

  @ApiProperty({ example: 'home purchase', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Sanitize(50)
  loanPurpose?: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  loanTenure?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @Sanitize(1000)
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(REFERRAL_SOURCES, {
    message: 'Referral source must match the available options',
  })
  @Sanitize(100)
  referralSource?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(CONTACT_PREFERENCES, {
    message: 'Contact preference must match the available slots',
  })
  contactPreference?: string;

  @ApiProperty({ required: false, enum: SERVICE_AREA_CODES })
  @IsOptional()
  @IsString()
  @IsIn(SERVICE_AREA_CODES, {
    message: 'Service area must be Kuala Lumpur or Selangor',
  })
  serviceArea?: string;
}

export class UpdateApplicationStatusDto {
  @ApiProperty({ enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Sanitize(500)
  adminNotes?: string;
}

export class SubmitAnalysisDto {
  @ApiProperty({ example: 45.5 })
  @IsNumber()
  dsrPercentage: number;

  @ApiProperty({ example: 750 })
  @IsNumber()
  creditScore: number;

  @ApiProperty({ example: 'High' })
  @IsString()
  approvalChance: string;

  @ApiProperty({ example: 150000 })
  @IsNumber()
  maxLoanAmount: number;

  @ApiProperty({
    example: ['Consider Maybank', 'RHB Bank offers better rates'],
  })
  @IsArray()
  @IsString({ each: true })
  recommendations: string[];

  @ApiProperty({
    example: ['High DSR ratio', 'Short employment history'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  issues?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Sanitize(500)
  adminNotes?: string;
}

export class UpdateFollowUpDto {
  @ApiProperty({ required: false, example: '2025-01-20T09:00:00.000Z' })
  @IsOptional()
  @IsString()
  followUpAt?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Sanitize(500)
  followUpNotes?: string;

  @ApiProperty({ required: false, enum: FollowUpStatus })
  @IsOptional()
  @IsEnum(FollowUpStatus)
  followUpStatus?: FollowUpStatus;
}

export class LogContactDto {
  @ApiProperty({ enum: ContactChannel })
  @IsEnum(ContactChannel)
  channel: ContactChannel;

  @ApiProperty({ enum: ContactOutcome })
  @IsEnum(ContactOutcome)
  outcome: ContactOutcome;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Sanitize(300)
  notes?: string;
}

export class ReferenceLookupDto {
  @ApiProperty({ example: 'b0c2a52e-1234-4dd9-92cc-ff9f41a1bcde' })
  @IsUUID()
  referenceId: string;

  @ApiProperty({ example: 'applicant@example.com' })
  @IsEmail()
  email: string;
}
