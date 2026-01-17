import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { Prisma, Service as ServiceModel } from '@prisma/client';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import type { AuthUser } from '../auth/types/auth-request.interface';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  private parseFeatures(features?: string | string[] | null): string[] {
    if (!features) {
      return [];
    }

    if (Array.isArray(features)) {
      return features.filter((feature) => typeof feature === 'string');
    }

    if (typeof features === 'string') {
      try {
        const parsed: unknown = JSON.parse(features);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (feature): feature is string => typeof feature === 'string',
          );
        }
      } catch {
        // fall through to plain string parsing
      }

      return features
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }

  private serializeFeatures(features?: string[]): string {
    const normalized = (features || [])
      .map((feature) => feature.trim())
      .filter(Boolean);
    return JSON.stringify(normalized);
  }

  private transformService(service: ServiceModel) {
    return {
      ...service,
      features: this.parseFeatures(service.features),
    };
  }

  async findAll() {
    const services = await this.prisma.service.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' },
    });

    return services.map((service) => this.transformService(service));
  }

  async findAllAdmin(filters?: {
    search?: string;
    type?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }) {
    const where: Prisma.ServiceWhereInput = {};
    if (filters?.type && filters.type !== 'all') {
      where.type = filters.type;
    }
    if (filters?.status && filters.status !== 'all') {
      where.isActive = filters.status === 'active';
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const pageSize =
      filters?.pageSize && filters.pageSize > 0
        ? Math.min(filters.pageSize, 100)
        : 20;
    const skip = (page - 1) * pageSize;

    const [total, services] = await Promise.all([
      this.prisma.service.count({ where }),
      this.prisma.service.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    return {
      data: services.map((service) => this.transformService(service)),
      total,
    };
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return this.transformService(service);
  }

  async create(dto: CreateServiceDto, actor?: AuthUser) {
    const service = await this.prisma.service.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        type: dto.type,
        features: this.serializeFeatures(dto.features),
      },
    });

    await this.auditLogs.createLog({
      action: 'service.created',
      targetType: 'Service',
      targetId: service.id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { name: service.name, type: service.type },
    });

    return this.transformService(service);
  }

  async update(id: string, dto: UpdateServiceDto, actor?: AuthUser) {
    await this.findOne(id);

    const data: Prisma.ServiceUpdateInput = {};

    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.price !== undefined) data.price = dto.price;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.features !== undefined) {
      data.features = this.serializeFeatures(dto.features);
    }

    const service = await this.prisma.service.update({
      where: { id },
      data,
    });

    await this.auditLogs.createLog({
      action: 'service.updated',
      targetType: 'Service',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { name: service.name },
    });

    return this.transformService(service);
  }

  async remove(id: string, actor?: AuthUser) {
    await this.findOne(id);

    const service = await this.prisma.service.update({
      where: { id },
      data: { isActive: false },
    });

    await this.auditLogs.createLog({
      action: 'service.deactivated',
      targetType: 'Service',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { name: service.name },
    });

    return this.transformService(service);
  }

  async seedDefaultServices(actor?: AuthUser) {
    const services = [
      {
        name: 'Eligibility Analysis Package',
        description:
          'Complete credit and loan eligibility analysis with personalized recommendations',
        price: 30.0,
        type: 'ELIGIBILITY_ANALYSIS' as const,
        features: [
          'Credit report analysis',
          'DSR calculation',
          'Approval chances assessment',
          'Loan limit estimate',
          'Issue identification',
          'Bank/agency recommendation',
          'Full explanation & guidance',
        ],
      },
      {
        name: 'DSR Consultation',
        description: 'Debt Service Ratio calculation and optimization advice',
        price: 20.0,
        type: 'DSR_CONSULTATION' as const,
        features: [
          'DSR calculation',
          'Debt optimization tips',
          'Income-to-debt analysis',
          'Improvement recommendations',
        ],
      },
      {
        name: 'Loan Application Assistance',
        description: 'Full assistance with loan application process',
        price: 50.0,
        type: 'LOAN_APPLICATION' as const,
        features: [
          'Document preparation',
          'Application submission',
          'Bank liaison',
          'Status tracking',
          'Follow-up support',
        ],
      },
      {
        name: 'Credit Repair Consultation',
        description: 'Guidance on improving credit score and resolving issues',
        price: 40.0,
        type: 'CREDIT_REPAIR' as const,
        features: [
          'Credit report review',
          'Issue identification',
          'Dispute assistance',
          'Score improvement plan',
          'Follow-up consultation',
        ],
      },
    ];

    let createdCount = 0;
    for (const service of services) {
      const existing = await this.prisma.service.findFirst({
        where: { type: service.type },
      });

      if (!existing) {
        await this.prisma.service.create({
          data: {
            ...service,
            features: this.serializeFeatures(service.features),
          },
        });
        createdCount += 1;
      }
    }

    if (createdCount > 0) {
      await this.auditLogs.createLog({
        action: 'service.seeded',
        targetType: 'Service',
        targetId: null,
        actorId: actor?.id,
        actorName: actor?.name,
        metadata: { createdCount },
      });
    }

    return { message: 'Default services seeded' };
  }

  async getStats() {
    const [total, active, avgPrice] = await Promise.all([
      this.prisma.service.count(),
      this.prisma.service.count({ where: { isActive: true } }),
      this.prisma.service.aggregate({ _avg: { price: true } }),
    ]);

    return {
      total,
      active,
      avgPrice: avgPrice._avg.price ?? 0,
    };
  }
}
