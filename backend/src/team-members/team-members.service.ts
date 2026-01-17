import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team-member.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import type { AuthUser } from '../auth/types/auth-request.interface';

@Injectable()
export class TeamMembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async findAll(activeOnly = true, page?: number, pageSize?: number) {
    const pageNumber = page && page > 0 ? page : 1;
    const size = pageSize && pageSize > 0 ? Math.min(pageSize, 100) : 20;
    const skip = (pageNumber - 1) * size;
    const where = activeOnly ? { isActive: true } : undefined;

    const [total, data] = await Promise.all([
      this.prisma.teamMember.count({ where }),
      this.prisma.teamMember.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: size,
      }),
    ]);

    return { data, total };
  }

  async create(dto: CreateTeamMemberDto, actor?: AuthUser) {
    const member = await this.prisma.teamMember.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        role: dto.role,
      },
    });

    await this.auditLogs.createLog({
      action: 'team.created',
      targetType: 'TeamMember',
      targetId: member.id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { name: member.name },
    });

    return member;
  }

  async update(id: string, dto: UpdateTeamMemberDto, actor?: AuthUser) {
    const existing = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Team member not found');
    }

    const member = await this.prisma.teamMember.update({
      where: { id },
      data: {
        name: dto.name ?? existing.name,
        phone: dto.phone ?? existing.phone,
        role: dto.role ?? existing.role,
      },
    });

    await this.auditLogs.createLog({
      action: 'team.updated',
      targetType: 'TeamMember',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { name: member.name },
    });

    return member;
  }

  async toggleActive(id: string, actor?: AuthUser) {
    const existing = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Team member not found');
    }

    const member = await this.prisma.teamMember.update({
      where: { id },
      data: { isActive: !existing.isActive },
    });

    await this.auditLogs.createLog({
      action: 'team.status_toggled',
      targetType: 'TeamMember',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { isActive: member.isActive },
    });

    return member;
  }

  async remove(id: string, actor?: AuthUser) {
    const existing = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Team member not found');
    }

    const member = await this.prisma.teamMember.delete({ where: { id } });
    await this.auditLogs.createLog({
      action: 'team.deleted',
      targetType: 'TeamMember',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { name: member.name },
    });
    return member;
  }
}
