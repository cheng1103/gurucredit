import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  Post,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard, AdminGuard, SuperAdminGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import type { RequestWithUser } from '../auth/types/auth-request.interface';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, AdminGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(SuperAdminGuard)
  @ApiOperation({ summary: 'Create a new user' })
  create(@Req() req: RequestWithUser, @Body() body: CreateUserDto) {
    return this.usersService.create(body, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll(
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.usersService.findAll({
      search,
      role,
      status,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user statistics' })
  getStats() {
    return this.usersService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id/role')
  @ApiOperation({ summary: 'Update user role' })
  updateRole(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: { role: 'USER' | 'ADMIN' | 'SUPER_ADMIN' },
  ) {
    return this.usersService.updateRole(id, body.role, req.user);
  }

  @Put(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle user active status' })
  toggleActive(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.usersService.toggleActive(id, req.user);
  }
}
