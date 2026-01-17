import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadStatusDto, DistributeLeadDto } from './leads.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import type { AuthUser } from '../auth/types/auth-request.interface';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async create(dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        phone: dto.phone,
        serviceArea: dto.serviceArea,
        source: dto.source || 'EXIT_INTENT',
        pageUrl: dto.pageUrl,
        language: dto.language,
      },
    });
  }

  async findAll(
    status?: string,
    source?: string,
    serviceArea?: string,
    search?: string,
    page?: number,
    pageSize?: number,
  ) {
    // Validate status against allowed values to prevent injection
    const allowedStatuses = ['NEW', 'CONTACTED', 'CONVERTED', 'NOT_INTERESTED'];
    const allowedSources = ['EXIT_INTENT', 'FOOTER', 'POPUP'];

    const where: Record<string, unknown> = {
      ...(status && allowedStatuses.includes(status) && { status }),
      ...(source && allowedSources.includes(source) && { source }),
      ...(serviceArea && { serviceArea }),
    };
    if (search) {
      where.OR = [
        { phone: { contains: search, mode: 'insensitive' } },
        { pageUrl: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    const pageNumber = page && page > 0 ? page : 1;
    const size = pageSize && pageSize > 0 ? Math.min(pageSize, 100) : 20;
    const skip = (pageNumber - 1) * size;

    const includeLatestDistribution: Prisma.LeadInclude = {
      distributions: {
        orderBy: { createdAt: 'desc' as const },
        take: 1,
        include: {
          teamMember: true,
          sentBy: { select: { id: true, name: true } },
        },
      },
    };

    const shouldDedupeByPhone = status === 'NEW';

    if (shouldDedupeByPhone) {
      const allLeads = await this.prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: includeLatestDistribution,
      });
      const deduped = new Map<string, (typeof allLeads)[number]>();
      allLeads.forEach((lead) => {
        if (!deduped.has(lead.phone)) {
          deduped.set(lead.phone, lead);
        }
      });
      const uniqueLeads = Array.from(deduped.values());
      const paged = uniqueLeads.slice(skip, skip + size);
      return { data: paged, total: uniqueLeads.length };
    }

    const [total, data] = await Promise.all([
      this.prisma.lead.count({ where }),
      this.prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: includeLatestDistribution,
        skip,
        take: size,
      }),
    ]);

    return { data, total };
  }

  async findOne(id: string) {
    return this.prisma.lead.findUnique({ where: { id } });
  }

  async updateStatus(id: string, dto: UpdateLeadStatusDto, actor?: AuthUser) {
    const updated = await this.prisma.lead.update({
      where: { id },
      data: {
        status: dto.status,
        notes: dto.notes,
      },
    });

    await this.auditLogs.createLog({
      action: 'lead.status_updated',
      targetType: 'Lead',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { status: dto.status },
    });

    return updated;
  }

  async delete(id: string, actor?: AuthUser) {
    const deleted = await this.prisma.lead.delete({ where: { id } });
    await this.auditLogs.createLog({
      action: 'lead.deleted',
      targetType: 'Lead',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { phone: deleted.phone },
    });
    return deleted;
  }

  async distribute(id: string, dto: DistributeLeadDto, actor?: AuthUser) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    const teamMember = await this.prisma.teamMember.findUnique({
      where: { id: dto.teamMemberId },
    });
    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }
    if (!teamMember.isActive) {
      throw new BadRequestException('Team member is inactive');
    }

    const distribution = await this.prisma.leadDistribution.create({
      data: {
        leadId: id,
        teamMemberId: dto.teamMemberId,
        sentById: actor?.id,
        note: dto.note,
      },
      include: {
        teamMember: true,
      },
    });

    await this.auditLogs.createLog({
      action: 'lead.distributed',
      targetType: 'Lead',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: {
        teamMemberId: dto.teamMemberId,
        teamMemberName: teamMember.name,
      },
    });

    return distribution;
  }

  async getStats() {
    const [total, newLeads, contacted, converted] = await Promise.all([
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: 'NEW' } }),
      this.prisma.lead.count({ where: { status: 'CONTACTED' } }),
      this.prisma.lead.count({ where: { status: 'CONVERTED' } }),
    ]);
    return { total, new: newLeads, contacted, converted };
  }

  
}
