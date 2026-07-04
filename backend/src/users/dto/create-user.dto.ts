import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  // Kept in sync with RegisterDto (auth.dto.ts) so every account-creation path
  // enforces the same password policy.
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
