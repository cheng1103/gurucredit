import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto } from './newsletter.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import type { AuthUser } from '../auth/types/auth-request.interface';

@Injectable()
export class NewsletterService {
  constructor(
    private prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async subscribe(dto: SubscribeDto) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      if (existing.isActive) {
        throw new ConflictException('Email already subscribed');
      }
      // Reactivate if previously unsubscribed
      return this.prisma.newsletterSubscriber.update({
        where: { id: existing.id },
        data: { isActive: true, unsubscribedAt: null },
      });
    }

    return this.prisma.newsletterSubscriber.create({
      data: { email: dto.email },
    });
  }

  async unsubscribe(email: string) {
    return this.prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false, unsubscribedAt: new Date() },
    });
  }

  async findAll(
    activeOnly?: boolean,
    search?: string,
    page?: number,
    pageSize?: number,
  ) {
    const where: Record<string, unknown> =
      activeOnly === true ? { isActive: true } : activeOnly === false ? { isActive: false } : {};
    if (search) {
      where.email = { contains: search, mode: 'insensitive' };
    }
    const pageNumber = page && page > 0 ? page : 1;
    const size = pageSize && pageSize > 0 ? Math.min(pageSize, 100) : 20;
    const skip = (pageNumber - 1) * size;

    const [total, data] = await Promise.all([
      this.prisma.newsletterSubscriber.count({ where }),
      this.prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { subscribedAt: 'desc' },
        skip,
        take: size,
      }),
    ]);

    return { data, total };
  }

  async getStats() {
    const [total, active] = await Promise.all([
      this.prisma.newsletterSubscriber.count(),
      this.prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    ]);
    return { total, active, unsubscribed: total - active };
  }

  async delete(id: string, actor?: AuthUser) {
    const deleted = await this.prisma.newsletterSubscriber.delete({ where: { id } });
    await this.auditLogs.createLog({
      action: 'newsletter.deleted',
      targetType: 'NewsletterSubscriber',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { email: deleted.email },
    });
    return deleted;
  }
}
