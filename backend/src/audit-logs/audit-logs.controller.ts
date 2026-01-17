import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditLogsService } from './audit-logs.service';
import { AuthGuard, AdminGuard } from '../auth/auth.guard';

@ApiTags('Audit Logs')
@Controller('audit-logs')
@UseGuards(AuthGuard, AdminGuard)
@ApiBearerAuth()
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get audit logs' })
  findAll(
    @Query('action') action?: string,
    @Query('targetType') targetType?: string,
    @Query('actorId') actorId?: string,
    @Query('targetId') targetId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.auditLogsService.findAll({
      action,
      targetType,
      actorId,
      targetId,
      search,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }
}
