import { ContactService } from './contact.service';
import type { PrismaService } from '../prisma/prisma.service';
import type { NotificationService } from '../notifications/notification.service';
import type { CreateContactDto } from './contact.dto';

describe('ContactService', () => {
  const prismaMock = {
    contactMessage: {
      create: jest.fn(),
    },
  };
  const notificationsMock = {
    sendContactAcknowledgement: jest.fn(),
  };

  const service = () =>
    new ContactService(
      prismaMock as unknown as PrismaService,
      notificationsMock as unknown as NotificationService,
    );

  beforeEach(() => {
    prismaMock.contactMessage.create.mockResolvedValue({
      id: 'msg-1',
      name: 'Aina',
      email: 'aina@example.com',
      subject: 'Loan question',
      serviceArea: 'MY-14',
    });
    notificationsMock.sendContactAcknowledgement.mockResolvedValue(undefined);
  });

  it('stores a contact message and triggers notification', async () => {
    const dto: CreateContactDto = {
      name: 'Aina',
      email: 'aina@example.com',
      phone: '+60110000000',
      serviceArea: 'MY-14',
      subject: 'Loan question',
      message: 'Need help with DSR',
    };

    const result = await service().create(dto);

    expect(prismaMock.contactMessage.create).toHaveBeenCalledWith({
      data: dto,
    });
    expect(notificationsMock.sendContactAcknowledgement).toHaveBeenCalledWith({
      email: dto.email,
      name: dto.name,
      subject: dto.subject,
      serviceArea: dto.serviceArea,
    });
    expect(result.id).toBe('msg-1');
  });
});
