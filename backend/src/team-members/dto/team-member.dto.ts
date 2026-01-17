import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Sanitize } from '../../common/utils/sanitize.util';

export class CreateTeamMemberDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @Sanitize(80)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Sanitize(30, false)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Sanitize(80)
  role?: string;
}

export class UpdateTeamMemberDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Sanitize(80)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Sanitize(30, false)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Sanitize(80)
  role?: string;
}
