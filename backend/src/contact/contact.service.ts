import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto, UpdateContactStatusDto } from './contact.dto';
import { NotificationService } from '../notifications/notification.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import type { AuthUser } from '../auth/types/auth-request.interface';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async create(dto: CreateContactDto) {
    const message = await this.prisma.contactMessage.create({
      data: dto,
    });

    void this.notifications.sendContactAcknowledgement({
      email: message.email,
      name: message.name,
      subject: message.subject,
      serviceArea: dto.serviceArea,
    });

    return message;
  }

  async findAll(
    status?: string,
    serviceArea?: string,
    search?: string,
    page?: number,
    pageSize?: number,
  ) {
    // Validate status against allowed values to prevent injection
    const allowedStatuses = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'];

    const where: Record<string, unknown> = {
      ...(status && allowedStatuses.includes(status) && { status }),
      ...(serviceArea && { serviceArea }),
    };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }

    const pageNumber = page && page > 0 ? page : 1;
    const size = pageSize && pageSize > 0 ? Math.min(pageSize, 100) : 20;
    const skip = (pageNumber - 1) * size;

    const [total, data] = await Promise.all([
      this.prisma.contactMessage.count({ where }),
      this.prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: size,
      }),
    ]);

    return { data, total };
  }

  async findOne(id: string) {
    return this.prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: string, dto: UpdateContactStatusDto, actor?: AuthUser) {
    const updated = await this.prisma.contactMessage.update({
      where: { id },
      data: {
        status: dto.status,
        adminNote: dto.adminNote,
        repliedAt: dto.status === 'REPLIED' ? new Date() : undefined,
      },
    });

    await this.auditLogs.createLog({
      action: 'message.status_updated',
      targetType: 'ContactMessage',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { status: dto.status },
    });

    return updated;
  }

  async delete(id: string, actor?: AuthUser) {
    const deleted = await this.prisma.contactMessage.delete({
      where: { id },
    });
    await this.auditLogs.createLog({
      action: 'message.deleted',
      targetType: 'ContactMessage',
      targetId: id,
      actorId: actor?.id,
      actorName: actor?.name,
      metadata: { email: deleted.email },
    });
    return deleted;
  }

  async getStats() {
    const [total, newCount, readCount, replied] = await Promise.all([
      this.prisma.contactMessage.count(),
      this.prisma.contactMessage.count({ where: { status: 'NEW' } }),
      this.prisma.contactMessage.count({ where: { status: 'READ' } }),
      this.prisma.contactMessage.count({ where: { status: 'REPLIED' } }),
    ]);
    return { total, new: newCount, read: readCount, replied };
  }
}
