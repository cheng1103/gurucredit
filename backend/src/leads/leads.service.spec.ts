import { LeadsService } from './leads.service';
import type { PrismaService } from '../prisma/prisma.service';

type PrismaLeadMock = {
  lead: {
    create: jest.Mock;
    findMany: jest.Mock;
    count: jest.Mock;
  };
};

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
    service = new LeadsService(prismaMock as unknown as PrismaService);
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

  it('filters leads by status and area', async () => {
    await service.findAll('NEW', 'POPUP', 'MY-10');

    expect(prismaMock.lead.findMany).toHaveBeenCalledWith({
      where: {
        status: 'NEW',
        source: 'POPUP',
        serviceArea: 'MY-10',
      },
      orderBy: { createdAt: 'desc' },
    });
  });
});
