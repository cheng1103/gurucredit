import { ApplicationsService } from './applications.service';
import type { PrismaService } from '../prisma/prisma.service';
import type { NotificationService } from '../notifications/notification.service';
import type { CreatePublicApplicationDto } from './dto/application.dto';
import type { PiiEncryptionService } from '../common/security/pii-encryption.service';

describe('ApplicationsService', () => {
  const prismaMock = {
    application: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    // createPublic resolves a catalog slug to a real service id via
    // `service.findFirst`; the mock drifted and never grew the delegate.
    service: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  const notificationsMock = {
    sendApplicationAcknowledgement: jest.fn(),
  };
  const piiMock = {
    encrypt: jest.fn((value?: string | null) =>
      value ? `enc-${value}` : (value ?? null),
    ),
    decrypt: jest.fn().mockReturnValue(null),
  };

  const service = () =>
    new ApplicationsService(
      prismaMock as unknown as PrismaService,
      notificationsMock as unknown as NotificationService,
      piiMock as unknown as PiiEncryptionService,
    );

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.application.create.mockResolvedValue({
      id: 'app-1',
      applicantName: 'Hafiz',
      applicantEmail: 'hafiz@example.com',
      applicantPhone: '0112345678',
      serviceArea: 'MY-14',
      service: { name: 'Personal Loan' },
    });
    prismaMock.service.findFirst.mockResolvedValue({ id: 'svc-db-1' });
    notificationsMock.sendApplicationAcknowledgement.mockResolvedValue(
      undefined,
    );
    jest
      .spyOn(piiMock, 'encrypt')
      .mockImplementation((value?: string | null) =>
        value ? `enc-${value}` : (value ?? null),
      );
  });

  it('creates a public application and sums debts', async () => {
    const dto: CreatePublicApplicationDto = {
      serviceId: '507f1f77bcf86cd799439011',
      name: 'Hafiz',
      email: 'hafiz@example.com',
      phone: '0112345678',
      serviceArea: 'MY-14',
      monthlyIncome: 6000,
      houseLoan: 500,
      carLoan: 300,
      personalLoan: 200,
      creditCard: 100,
      otherDebts: 50,
      loanAmount: 20000,
      additionalNotes: 'Need to consolidate debts',
      referralSource: 'Google Search',
      contactPreference: 'any',
      loanPurpose: 'Debt consolidation',
    };

    await service().createPublic(dto);

    const expectedData = expect.objectContaining({
      existingDebts: 1150,
      serviceId: dto.serviceId,
      applicantName: dto.name,
    }) as Record<string, unknown>;

    expect(prismaMock.application.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
        include: { service: true },
      }),
    );
    expect(
      notificationsMock.sendApplicationAcknowledgement,
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        email: dto.email,
        name: dto.name,
        serviceArea: dto.serviceArea,
        serviceName: 'Personal Loan',
      }),
    );
    // A 24-char hex id is trusted as-is, so no lookup is needed.
    expect(prismaMock.service.findFirst).not.toHaveBeenCalled();
  });

  it('resolves a catalog slug to the first active service', async () => {
    const dto = {
      serviceId: '1',
      name: 'Hafiz',
      email: 'hafiz@example.com',
      phone: '0112345678',
      serviceArea: 'MY-14',
      monthlyIncome: 6000,
    } as CreatePublicApplicationDto;

    await service().createPublic(dto);

    expect(prismaMock.service.findFirst).toHaveBeenCalledWith({
      where: { type: 'ELIGIBILITY_ANALYSIS', isActive: true },
      select: { id: true },
    });
    expect(prismaMock.application.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          serviceId: 'svc-db-1',
          existingDebts: 0,
        }) as Record<string, unknown>,
      }),
    );
  });

  describe('create (authenticated, serviceArea optional)', () => {
    const USER_ID = '507f1f77bcf86cd799439099';
    const SERVICE_ID = '507f1f77bcf86cd799439011';

    beforeEach(() => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: USER_ID,
        name: 'Siti',
        email: 'siti@example.com',
        phone: '0119998888',
        icNumber: null,
      });
      prismaMock.service.findUnique.mockResolvedValue({
        id: SERVICE_ID,
        name: 'Personal Loan',
      });
      prismaMock.application.create.mockResolvedValue({
        id: 'app-2',
        applicantName: 'Siti',
        applicantEmail: 'siti@example.com',
        serviceArea: null,
        service: { name: 'Personal Loan' },
      });
    });

    it('leaves serviceArea unset rather than stamping Kuala Lumpur', async () => {
      await service().create(USER_ID, {
        serviceId: SERVICE_ID,
        monthlyIncome: 4000,
      });

      const calls = prismaMock.application.create.mock
        .calls as unknown as Array<[{ data: Record<string, unknown> }]>;
      const call = calls[0][0];
      expect(call.data.serviceArea).toBeUndefined();
    });

    it('does not tell an applicant their service area is Kuala Lumpur', async () => {
      await service().create(USER_ID, {
        serviceId: SERVICE_ID,
        monthlyIncome: 4000,
      });

      expect(
        notificationsMock.sendApplicationAcknowledgement,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'siti@example.com',
          serviceArea: undefined,
        }),
      );
    });

    it('still records a service area the applicant did give', async () => {
      prismaMock.application.create.mockResolvedValue({
        id: 'app-3',
        applicantName: 'Siti',
        applicantEmail: 'siti@example.com',
        serviceArea: 'MY-12',
        service: { name: 'Personal Loan' },
      });

      await service().create(USER_ID, {
        serviceId: SERVICE_ID,
        monthlyIncome: 4000,
        serviceArea: 'MY-12',
      });

      const calls = prismaMock.application.create.mock
        .calls as unknown as Array<[{ data: Record<string, unknown> }]>;
      const call = calls[0][0];
      expect(call.data.serviceArea).toBe('MY-12');
      expect(
        notificationsMock.sendApplicationAcknowledgement,
      ).toHaveBeenCalledWith(expect.objectContaining({ serviceArea: 'MY-12' }));
    });
  });
});
