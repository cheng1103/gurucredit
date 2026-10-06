import { LeadsService } from './leads.service';
import type { PrismaService } from '../prisma/prisma.service';
import type { AuditLogsService } from '../audit-logs/audit-logs.service';

type PrismaLeadMock = {
  lead: {
    create: jest.Mock;
    findMany: jest.Mock;
    count: jest.Mock;
  };
};

const createAuditLogsMock = () =>
  ({
    createLog: jest.fn().mockResolvedValue(undefined),
  }) as unknown as AuditLogsService;

const createPrismaMock = (): PrismaLeadMock => ({
  lead: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
});

describe('LeadsService', () => {
  let service: LeadsService;
  let prismaMock: PrismaLeadMock;

  beforeEach(() => {
    prismaMock = createPrismaMock();
    prismaMock.lead.create.mockResolvedValue({ id: 'lead-1' });
    prismaMock.lead.findMany.mockResolvedValue([]);
    prismaMock.lead.count.mockResolvedValue(0);
    service = new LeadsService(
      prismaMock as unknown as PrismaService,
      createAuditLogsMock(),
    );
  });

  it('creates a lead with defaults', async () => {
    const dto = {
      phone: '01123456789',
      serviceArea: 'MY-14',
      source: 'EXIT_INTENT',
      pageUrl: '/loan',
      language: 'en',
    };

    await service.create(dto);

    expect(prismaMock.lead.create).toHaveBeenCalledWith({
      data: {
        phone: dto.phone,
        serviceArea: dto.serviceArea,
        source: dto.source,
        pageUrl: dto.pageUrl,
        language: dto.language,
      },
    });
  });

  it('filters leads by status, source and area', async () => {
    // status 'NEW' takes the de-duplicate-by-phone branch, which reads every
    // match in one go and pages in memory — so no take/skip on the query.
    await service.findAll('NEW', 'POPUP', 'MY-10');

    expect(prismaMock.lead.findMany).toHaveBeenCalledWith({
      where: {
        status: 'NEW',
        source: 'POPUP',
        serviceArea: 'MY-10',
      },
      orderBy: { createdAt: 'desc' },
      include: {
        distributions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            teamMember: true,
            sentBy: { select: { id: true, name: true } },
          },
        },
      },
    });
  });

  it('pages in the database for any status other than NEW', async () => {
    await service.findAll('CONTACTED', undefined, 'MY-10', undefined, 2, 10);

    expect(prismaMock.lead.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { status: 'CONTACTED', serviceArea: 'MY-10' },
        orderBy: { createdAt: 'desc' },
        skip: 10,
        take: 10,
      }),
    );
  });
});
