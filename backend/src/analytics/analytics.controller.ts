import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AdminGuard, AuthGuard } from '../auth/auth.guard';
import { AnalyticsOverview, AnalyticsService } from './analytics.service';
import { TrackPageViewDto } from './dto/track-page-view.dto';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * Public ingestion. Hit on every public page view, so it gets its own
   * throttle bucket well above the 60/60 s global default. Always answers
   * 204 — including on invalid input — so it reveals nothing and can never
   * break a page. The user agent is read here only so the service can derive
   * a device class and bot-ness; it is never stored or logged, and neither is
   * the caller's IP.
   */
  @Post('track')
  @Throttle({ default: { limit: 240, ttl: 60 } })
  @HttpCode(204)
  @ApiOperation({ summary: 'Record one anonymous page view' })
  @ApiBody({ type: TrackPageViewDto })
  @ApiResponse({
    status: 204,
    description: 'Always returned, including for input that was discarded.',
  })
  async track(
    @Body() body: unknown,
    @Headers('user-agent') userAgent?: string,
  ): Promise<void> {
    try {
      await this.analyticsService.track(body, userAgent);
    } catch {
      // The service already swallows its own failures; this is the last
      // backstop so the response is 204 on every path.
    }
  }

  @Get('overview')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Page-view and unique-visitor overview' })
  @ApiQuery({ name: 'days', required: false, enum: [7, 30, 90] })
  getOverview(@Query('days') days?: string): Promise<AnalyticsOverview> {
    return this.analyticsService.getOverview(days);
  }
}
