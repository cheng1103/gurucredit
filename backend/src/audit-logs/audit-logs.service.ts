import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

interface AuditLogFilters {
  action?: string;
  targetType?: string;
  actorId?: string;
  targetId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(params: {
    action: string;
    targetType: string;
    targetId?: string | null;
    actorId?: string;
    actorName?: string;
    metadata?: Record<string, unknown>;
  }) {
    return this.prisma.auditLog.create({
      data: {
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId,
        actorId: params.actorId,
        actorName: params.actorName,
        metadata: (params.metadata ?? null) as Prisma.InputJsonValue | null,
      },
    });
  }

  async findAll(filters: AuditLogFilters) {
    const where: Record<string, unknown> = {};
    if (filters.action) {
      where.action = filters.action;
    }
    if (filters.targetType) {
      where.targetType = filters.targetType;
    }
    if (filters.targetId) {
      where.targetId = filters.targetId;
    }
    if (filters.actorId) {
      where.actorId = filters.actorId;
    }
    if (filters.search) {
      where.OR = [
        { action: { contains: filters.search, mode: 'insensitive' } },
        { actorName: { contains: filters.search, mode: 'insensitive' } },
        { targetId: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const pageSize =
      filters.pageSize && filters.pageSize > 0
        ? Math.min(filters.pageSize, 100)
        : 20;
    const skip = (page - 1) * pageSize;

    const [total, data] = await Promise.all([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.findMany({
        where,
        include: {
          actor: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    return { data, total };
  }
}
