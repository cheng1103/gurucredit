import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export enum ServiceType {
  ELIGIBILITY_ANALYSIS = 'ELIGIBILITY_ANALYSIS',
  CREDIT_REPAIR = 'CREDIT_REPAIR',
  LOAN_APPLICATION = 'LOAN_APPLICATION',
  DSR_CONSULTATION = 'DSR_CONSULTATION',
}

export class CreateServiceDto {
  @ApiProperty({ example: 'Eligibility Analysis Package' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Complete credit and loan eligibility analysis' })
  @IsString()
  description: string;

  @ApiProperty({ example: 30.0 })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType)
  type: ServiceType;

  @ApiProperty({ example: ['Credit report analysis', 'DSR calculation'] })
  @IsArray()
  @IsString({ each: true })
  features: string[];
}

export class UpdateServiceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
