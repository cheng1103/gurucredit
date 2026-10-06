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
    },
    // createPublic resolves a catalog slug to a real service id via
    // `service.findFirst`; the mock drifted and never grew the delegate.
    service: {
      findFirst: jest.fn(),
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
});
