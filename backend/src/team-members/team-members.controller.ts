import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team-member.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { RequestWithUser } from '../auth/types/auth-request.interface';

@ApiTags('Team Members')
@Controller('team-members')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
@ApiBearerAuth()
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all team members' })
  findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.teamMembersService.findAll(
      activeOnly !== 'false',
      page ? Number(page) : undefined,
      pageSize ? Number(pageSize) : undefined,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a team member' })
  create(@Req() req: RequestWithUser, @Body() dto: CreateTeamMemberDto) {
    return this.teamMembersService.create(dto, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a team member' })
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberDto,
  ) {
    return this.teamMembersService.update(id, dto, req.user);
  }

  @Put(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle team member active status' })
  toggleActive(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.teamMembersService.toggleActive(id, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team member' })
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.teamMembersService.remove(id, req.user);
  }
}
