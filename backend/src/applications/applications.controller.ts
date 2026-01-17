import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import {
  CreateApplicationDto,
  CreatePublicApplicationDto,
  UpdateApplicationStatusDto,
  SubmitAnalysisDto,
  ReferenceLookupDto,
  UpdateFollowUpDto,
  LogContactDto,
} from './dto/application.dto';
import { AuthGuard, AdminGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/types/auth-request.interface';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  private getAuthenticatedUser(req: RequestWithUser) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return req.user;
  }

  @Post('public')
  @ApiOperation({ summary: 'Create a public application (no login required)' })
  @Throttle({ default: { limit: 5, ttl: 60 } })
  createPublic(@Body() dto: CreatePublicApplicationDto) {
    return this.applicationsService.createPublic(dto);
  }

  @Post('reference/status')
  @ApiOperation({
    summary: 'Lookup application status by reference ID + email',
  })
  @Throttle({ default: { limit: 5, ttl: 60 } })
  lookupByReference(@Body() dto: ReferenceLookupDto) {
    return this.applicationsService.findByReference(dto);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new application' })
  create(@Req() req: RequestWithUser, @Body() dto: CreateApplicationDto) {
    const user = this.getAuthenticatedUser(req);
    return this.applicationsService.create(user.id, dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all applications for current user' })
  findAll(@Req() req: RequestWithUser) {
    const user = this.getAuthenticatedUser(req);
    return this.applicationsService.findAllByUser(user.id);
  }

  @Get('admin')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all applications (admin)' })
  findAllAdmin(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('serviceArea') serviceArea?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const allowedAreas = ['MY-14', 'MY-10'];
    const normalizedArea =
      serviceArea && allowedAreas.includes(serviceArea)
        ? serviceArea
        : undefined;
    return this.applicationsService.findAllAdmin({
      status,
      search,
      serviceArea: normalizedArea,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Get('stats')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get application statistics' })
  getStats() {
    return this.applicationsService.getStats();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get application by ID' })
  findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    const user = this.getAuthenticatedUser(req);
    const isAdmin = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';
    return this.applicationsService.findOne(id, isAdmin ? undefined : user.id);
  }

  @Put(':id/status')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status' })
  updateStatus(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    const user = this.getAuthenticatedUser(req);
    return this.applicationsService.updateStatus(id, dto, user);
  }

  @Put(':id/analysis')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit analysis results' })
  submitAnalysis(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: SubmitAnalysisDto,
  ) {
    const user = this.getAuthenticatedUser(req);
    return this.applicationsService.submitAnalysis(id, dto, user);
  }

  @Put(':id/follow-up')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update follow-up reminder' })
  updateFollowUp(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateFollowUpDto,
  ) {
    const user = this.getAuthenticatedUser(req);
    return this.applicationsService.updateFollowUp(id, dto, user);
  }

  @Post(':id/contact-log')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log contact outcome' })
  logContact(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: LogContactDto,
  ) {
    const user = this.getAuthenticatedUser(req);
    return this.applicationsService.logContact(id, dto, user);
  }
}
