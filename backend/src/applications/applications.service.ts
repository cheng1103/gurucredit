import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateApplicationDto,
  CreatePublicApplicationDto,
  UpdateApplicationStatusDto,
  SubmitAnalysisDto,
  ApplicationStatus,
  ReferenceLookupDto,
  UpdateFollowUpDto,
  LogContactDto,
} from './dto/application.dto';
import { Prisma } from '@prisma/client';
import { NotificationService } from '../notifications/notification.service';
import { PiiEncryptionService } from '../common/security/pii-encryption.service';
import type { AuthUser } from '../auth/types/auth-request.interface';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationService,
    private readonly piiEncryption: PiiEncryptionService,
  ) {}

  private parseJsonArray(value?: unknown): string[] {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === 'string');
    }

    if (typeof value === 'string') {
      try {
        const parsed: unknown = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is string => typeof item === 'string',
          );
        }
      } catch {
        // fall through to fallback parsing
      }

      return value
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }

  private serializeArray(value?: string[]) {
    const normalized = (value || []).map((item) => item.trim()).filter(Boolean);
    return JSON.stringify(normalized);
  }

  private sanitizeNote(value?: string | null, maxLength = 500) {
    if (!value) {
      return null;
    }
    return value
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maxLength);
  }

  private transformApplication<
    T extends {
      recommendations?: unknown;
      issues?: unknown;
      applicantIcNumber?: string | null;
      user?: Record<string, unknown> | null;
    },
  >(application: T): T & { recommendations: string[]; issues: string[] } {
    const normalized = this.decryptSensitiveFields(application);
    return {
      ...normalized,
      recommendations: this.parseJsonArray(normalized.recommendations),
      issues: this.parseJsonArray(normalized.issues),
    };
  }

  private decryptSensitiveFields<
    T extends {
      applicantIcNumber?: string | null;
      user?: Record<string, unknown> | null;
    },
  >(application: T): T {
    if (!application) {
      return application;
    }
    const decryptedUser = this.decryptUserIcNumber(application.user);

    return {
      ...application,
      applicantIcNumber: this.piiEncryption.decrypt(
        application.applicantIcNumber,
      ),
      user: decryptedUser,
    };
  }

  private decryptUserIcNumber(user?: Record<string, unknown> | null) {
    if (!user || typeof user !== 'object' || !('icNumber' in user)) {
      return user ?? null;
    }

    const icNumberValue =
      typeof user.icNumber === 'string' || user.icNumber === null
        ? user.icNumber
        : undefined;

    return {
      ...user,
      icNumber: this.piiEncryption.decrypt(icNumberValue),
    };
  }

  private extractServiceName(entity: unknown) {
    if (
      entity &&
      typeof entity === 'object' &&
      'service' in entity &&
      (entity as { service?: unknown }).service
    ) {
      const relation = (entity as { service?: unknown }).service;
      if (
        relation &&
        typeof relation === 'object' &&
        'name' in relation &&
        typeof (relation as { name?: unknown }).name === 'string'
      ) {
        return (relation as { name: string }).name;
      }
    }
    return undefined;
  }

  private extractServiceArea(entity: unknown) {
    if (
      entity &&
      typeof entity === 'object' &&
      'serviceArea' in entity &&
      typeof (entity as { serviceArea?: unknown }).serviceArea === 'string'
    ) {
      return (entity as { serviceArea: string }).serviceArea;
    }
    return undefined;
  }

  // Public application - anonymous submissions
  async createPublic(dto: CreatePublicApplicationDto) {
    // Calculate total existing debts
    const existingDebts =
      (dto.houseLoan || 0) +
      (dto.carLoan || 0) +
      (dto.personalLoan || 0) +
      (dto.creditCard || 0) +
      (dto.otherDebts || 0);

    // Create the application
    const application = await this.prisma.application.create({
      data: {
        serviceId: dto.serviceId,
        applicantName: dto.name,
        applicantEmail: dto.email,
        applicantPhone: dto.phone,
        serviceArea: dto.serviceArea,
        applicantIcNumber:
          this.piiEncryption.encrypt(dto.icNumber) ?? undefined,
        monthlyIncome: dto.monthlyIncome,
        existingDebts,
        loanAmount: dto.loanAmount,
        loanPurpose: dto.loanPurpose,
        notes: this.sanitizeNote(dto.additionalNotes),
        referralSource: dto.referralSource,
        contactPreference: dto.contactPreference,
      },
      include: {
        service: true,
      },
    });

    const serviceName = this.extractServiceName(application);
    const serviceArea = this.extractServiceArea(application);

    void this.notifications.sendApplicationAcknowledgement({
      email: application.applicantEmail,
      name: application.applicantName,
      referenceId: application.id,
      serviceName,
      serviceArea: serviceArea ?? dto.serviceArea,
    });

    return this.transformApplication(application);
  }

  async create(userId: string, dto: CreateApplicationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        icNumber: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const application = await this.prisma.application.create({
      data: {
        userId,
        serviceId: dto.serviceId,
        applicantName: user.name,
        applicantEmail: user.email,
        applicantPhone: user.phone,
        serviceArea: dto.serviceArea ?? 'MY-14',
        applicantIcNumber: user.icNumber ?? undefined,
        monthlyIncome: dto.monthlyIncome,
        existingDebts: dto.existingDebts,
        loanAmount: dto.loanAmount,
        loanPurpose: dto.loanPurpose,
        loanTenure: dto.loanTenure,
        notes: this.sanitizeNote(dto.notes),
        referralSource: dto.referralSource,
        contactPreference: dto.contactPreference,
      },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    const serviceName = service?.name ?? this.extractServiceName(application);
    const serviceArea =
      this.extractServiceArea(application) ?? dto.serviceArea ?? 'MY-14';

    void this.notifications.sendApplicationAcknowledgement({
      email: application.applicantEmail,
      name: application.applicantName,
      referenceId: application.id,
      serviceName,
      serviceArea,
    });

    return this.transformApplication(application);
  }

  async findAllByUser(userId: string) {
    const applications = await this.prisma.application.findMany({
      where: { userId },
      include: {
        service: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return applications.map((application) =>
      this.transformApplication(application),
    );
  }

  async findOne(id: string, userId?: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            icNumber: true,
          },
        },
        documents: true,
        payments: true,
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (userId && application.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.transformApplication(application);
  }

  async findByReference(dto: ReferenceLookupDto) {
    const application = await this.prisma.application.findUnique({
      where: { id: dto.referenceId },
      include: {
        service: true,
      },
    });

    if (
      !application ||
      application.applicantEmail.toLowerCase() !== dto.email.toLowerCase()
    ) {
      throw new NotFoundException('Application not found');
    }

    const serviceArea = this.extractServiceArea(application);
    const serviceName = this.extractServiceName(application);

    return {
      id: application.id,
      applicantName: application.applicantName,
      status: application.status,
      createdAt: application.createdAt,
      serviceArea: serviceArea ?? 'MY-14',
      contactPreference: application.contactPreference,
      referralSource: application.referralSource,
      serviceName,
      loanAmount: application.loanAmount,
    };
  }

  async findAllAdmin(filters?: {
    status?: string;
    search?: string;
    serviceArea?: string;
    page?: number;
    pageSize?: number;
  }) {
    const where: Prisma.ApplicationWhereInput = {};

    if (filters?.status && filters.status !== 'all') {
      where.status = filters.status;
    }

    if (filters?.serviceArea) {
      where.serviceArea = filters.serviceArea;
    }

    if (filters?.search) {
      where.OR = [
        {
          applicantName: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          applicantEmail: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          applicantPhone: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          user: {
            is: {
              name: { contains: filters.search, mode: 'insensitive' },
            },
          },
        },
        {
          user: {
            is: {
              email: { contains: filters.search, mode: 'insensitive' },
            },
          },
        },
      ];
    }

    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const pageSize =
      filters?.pageSize && filters.pageSize > 0
        ? Math.min(filters.pageSize, 100)
        : 20;
    const skip = (page - 1) * pageSize;

    const include = {
      service: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      payments: true,
    };

    if (filters?.status === 'PENDING') {
      const applications = await this.prisma.application.findMany({
        where,
        include,
        orderBy: { createdAt: 'desc' },
      });
      const deduped = this.dedupePendingByPhone(applications);
      const total = deduped.length;
      const paged = deduped.slice(skip, skip + pageSize);

      return {
        data: paged.map((application) =>
          this.transformApplication(application),
        ),
        total,
      };
    }

    const [total, applications] = await Promise.all([
      this.prisma.application.count({ where }),
      this.prisma.application.findMany({
        where,
        include,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    return {
      data: applications.map((application) =>
        this.transformApplication(application),
      ),
      total,
    };
  }

  private dedupePendingByPhone<
    T extends { applicantPhone?: string | null; createdAt: Date },
  >(applications: T[]) {
    const seen = new Set<string>();
    return applications.filter((application) => {
      const phone = this.normalizePhone(application.applicantPhone);
      if (!phone) return true;
      if (seen.has(phone)) return false;
      seen.add(phone);
      return true;
    });
  }

  private normalizePhone(phone?: string | null) {
    if (!phone) return '';
    return phone.replace(/[^0-9]/g, '');
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

  async updateStatus(id: string, dto: UpdateApplicationStatusDto, actor?: AuthUser) {
    const previous = await this.findOne(id);

    const application = await this.prisma.application.update({
      where: { id },
      data: {
        status: dto.status,
        adminNotes: dto.adminNotes,
        completedAt:
          dto.status === ApplicationStatus.COMPLETED ? new Date() : undefined,
      },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await this.createAuditLog('application.status_updated', 'Application', id, actor, {
      fromStatus: previous.status,
      toStatus: dto.status,
      adminNotesUpdated: dto.adminNotes !== undefined,
    });

    return this.transformApplication(application);
  }

  async submitAnalysis(id: string, dto: SubmitAnalysisDto, actor?: AuthUser) {
    await this.findOne(id);

    const application = await this.prisma.application.update({
      where: { id },
      data: {
        dsrPercentage: dto.dsrPercentage,
        creditScore: dto.creditScore,
        approvalChance: dto.approvalChance,
        maxLoanAmount: dto.maxLoanAmount,
        recommendations: this.serializeArray(dto.recommendations),
        issues: this.serializeArray(dto.issues),
        adminNotes: dto.adminNotes,
        status: 'COMPLETED',
        completedAt: new Date(),
      },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await this.createAuditLog('application.analysis_submitted', 'Application', id, actor, {
      approvalChance: dto.approvalChance,
      creditScore: dto.creditScore,
      maxLoanAmount: dto.maxLoanAmount,
    });

    return this.transformApplication(application);
  }

  async updateFollowUp(id: string, dto: UpdateFollowUpDto, actor?: AuthUser) {
    await this.findOne(id);

    const followUpAt =
      dto.followUpAt && dto.followUpAt.trim().length > 0
        ? new Date(dto.followUpAt)
        : dto.followUpAt === ''
          ? null
          : undefined;

    const application = await this.prisma.application.update({
      where: { id },
      data: {
        followUpAt,
        followUpNotes: dto.followUpNotes
          ? this.sanitizeNote(dto.followUpNotes, 500)
          : dto.followUpNotes === ''
            ? null
            : undefined,
        followUpStatus: dto.followUpStatus,
      },
      include: {
        service: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await this.createAuditLog('application.follow_up_updated', 'Application', id, actor, {
      followUpAt: followUpAt ? followUpAt.toISOString() : null,
      followUpStatus: dto.followUpStatus ?? application.followUpStatus,
    });

    return this.transformApplication(application);
  }

  async logContact(id: string, dto: LogContactDto, actor?: AuthUser) {
    await this.findOne(id);

    await this.createAuditLog('application.contact_logged', 'Application', id, actor, {
      channel: dto.channel,
      outcome: dto.outcome,
      notes: dto.notes,
    });

    return { success: true };
  }

  async getStats() {
    const [total, pending, inReview, completed, rejected] = await Promise.all([
      this.prisma.application.count(),
      this.prisma.application.count({ where: { status: 'PENDING' } }),
      this.prisma.application.count({ where: { status: 'IN_REVIEW' } }),
      this.prisma.application.count({ where: { status: 'COMPLETED' } }),
      this.prisma.application.count({ where: { status: 'REJECTED' } }),
    ]);

    const revenue = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'paid' },
    });

    return {
      total,
      pending,
      inReview,
      completed,
      rejected,
      revenue: revenue._sum.amount || 0,
    };
  }
}
