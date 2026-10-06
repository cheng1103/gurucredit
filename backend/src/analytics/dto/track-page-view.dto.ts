import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export const SUPPORTED_LOCALES = ['en', 'ms'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/** Maximum stored `path` length, matching the comment on the Prisma model. */
export const MAX_PATH_LENGTH = 512;

/** 32 random hex characters minted in the browser — never derived from
 *  anything personal. The strict shape is what stops a caller from
 *  stuffing an email or an IP into the field. */
export const VISITOR_ID_PATTERN = /^[0-9a-f]{32}$/;

export class TrackPageViewDto {
  @ApiProperty({
    example: '/ms/faq',
    description:
      'Public URL path including any /ms prefix. Query string and hash are stripped server-side.',
  })
  @IsString()
  @MaxLength(MAX_PATH_LENGTH)
  path: string;

  @ApiProperty({ enum: SUPPORTED_LOCALES, example: 'ms' })
  @IsIn(SUPPORTED_LOCALES)
  locale: SupportedLocale;

  @ApiProperty({
    example: '0123456789abcdef0123456789abcdef',
    description: '32 random lowercase hex characters from the gc_vid cookie.',
  })
  @IsString()
  @Matches(VISITOR_ID_PATTERN)
  visitorId: string;

  @ApiPropertyOptional({
    example: 'www.google.com',
    description:
      'Referring host only, never the full referring URL. Dropped when it is this site.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  referrerHost?: string;
}
