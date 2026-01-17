import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PiiEncryptionService } from '../common/security/pii-encryption.service';
import type { AuthUser } from '../auth/types/auth-request.interface';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly piiEncryption: PiiEncryptionService,
  ) {}

  async findAll(filters?: {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }) {
    const where: Record<string, unknown> = {};
    if (filters?.role && filters.role !== 'all') {
      where.role = filters.role;
    }
    if (filters?.status && filters.status !== 'all') {
      where.isActive = filters.status === 'active';
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const pageSize =
      filters?.pageSize && filters.pageSize > 0
        ? Math.min(filters.pageSize, 100)
        : 20;
    const skip = (page - 1) * pageSize;

    const [total, data] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: { applications: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    return { data, total };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        icNumber: true,
        role: true,
        isActive: true,
        createdAt: true,
        applications: {
          include: { service: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.decryptUser(user);
  }

  async updateRole(
    id: string,
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN',
    actor?: AuthUser,
  ) {
    if (role === 'SUPER_ADMIN') {
      throw new BadRequestException('SUPER_ADMIN role cannot be assigned');
    }
    const existing = await this.findOne(id);
    if (existing.role === 'SUPER_ADMIN') {
      throw new BadRequestException('SUPER_ADMIN role cannot be modified');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    await this.createAuditLog('user.role_updated', 'User', id, actor, {
      role,
      previousRole: existing.role,
    });

    return updated;
  }

  async toggleActive(id: string, actor?: AuthUser) {
    const user = await this.findOne(id);

    const updated = await this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
      },
    });

    await this.createAuditLog('user.status_toggled', 'User', id, actor, {
      isActive: updated.isActive,
    });

    return updated;
  }

  async getStats() {
    const [total, active, admins] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({
        where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
      }),
    ]);

    return { total, active, admins };
  }

  async createAdmin(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async create(data: CreateUserDto, actor?: AuthUser) {
    if (data.role === 'SUPER_ADMIN') {
      throw new BadRequestException('SUPER_ADMIN role cannot be assigned');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const created = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        name: data.name,
        password: hashedPassword,
        phone: data.phone,
        role: data.role || 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        isActive: true,
        createdAt: true,
      },
    });

    await this.createAuditLog('user.created', 'User', created.id, actor, {
      role: created.role,
      email: created.email,
    });

    return created;
  }

  private decryptUser<
    T extends {
      icNumber?: string | null;
      applications?: Array<{ applicantIcNumber?: string | null }>;
    },
  >(user: T): T {
    if (!user) {
      return user;
    }

    const decryptedApplications = Array.isArray(user.applications)
      ? user.applications.map((application) =>
          application
            ? {
                ...application,
                applicantIcNumber: this.piiEncryption.decrypt(
                  application.applicantIcNumber,
                ),
              }
            : application,
        )
      : user.applications;

    return {
      ...user,
      icNumber: this.piiEncryption.decrypt(user.icNumber),
      applications: decryptedApplications,
    } as T;
  }

  private async createAuditLog(
    action: string,
    targetType: string,
    targetId: string,
    actor?: AuthUser,
    metadata?: Record<string, unknown>,
  ) {
    await this.prisma.auditLog.create({
      data: {
        action,
        targetType,
        targetId,
        actorId: actor?.id,
        actorName: actor?.name,
        metadata: (metadata ?? null) as Prisma.InputJsonValue | null,
      },
    });
  }
}
