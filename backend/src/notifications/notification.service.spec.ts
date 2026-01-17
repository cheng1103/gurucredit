import { NotificationService } from './notification.service';
import type { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import type { AppLoggerService } from '../common/logger/app-logger.service';

type SendMailMock = jest.Mock<Promise<void>, [SendMailOptions]>;

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

const mockCreateTransport = nodemailer.createTransport as jest.Mock;

const createConfigMock = (
  overrides: Record<string, unknown>,
): Pick<ConfigService, 'get'> => ({
  get: jest.fn(
    <T = unknown>(key: string, defaultValue?: T) =>
      (overrides[key] as T | undefined) ?? defaultValue,
  ),
});

describe('NotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends application acknowledgement emails when SMTP is configured', async () => {
    const sendMail: SendMailMock = jest
      .fn<Promise<void>, [SendMailOptions]>()
      .mockResolvedValue(undefined);
    mockCreateTransport.mockReturnValue({ sendMail });

    const config = createConfigMock({
      SMTP_HOST: 'smtp.test',
      SMTP_PORT: 2525,
      SMTP_USER: 'user',
      SMTP_PASS: 'pass',
      SMTP_SECURE: 'false',
      SMTP_FROM: 'no-reply@test.com',
      COMPANY_WHATSAPP: '+601122233344',
    });

    const service = new NotificationService(config as ConfigService);

    await service.sendApplicationAcknowledgement({
      name: 'Ayu',
      email: 'ayu@example.com',
      referenceId: 'GC123',
      serviceName: 'Personal Loan',
      serviceArea: 'MY-14',
    });

    expect(sendMail).toHaveBeenCalledTimes(1);
    const payload = sendMail.mock.calls[0][0];
    expect(payload.to).toBe('ayu@example.com');
    expect(payload.subject).toContain('Application received');
    expect(payload.html).toContain('Kuala Lumpur');
    expect(payload.html).toContain('+601122233344');
  });

  it('skips sending when recipient email is missing', async () => {
    const sendMail: SendMailMock = jest.fn<Promise<void>, [SendMailOptions]>();
    mockCreateTransport.mockReturnValue({ sendMail });
    const config = createConfigMock({
      SMTP_HOST: 'smtp.test',
      SMTP_PORT: 2525,
      SMTP_USER: 'user',
      SMTP_PASS: 'pass',
    });
    const service = new NotificationService(config as ConfigService);

    await service.sendContactAcknowledgement({
      name: 'No Email',
      email: '',
      subject: 'Question',
      serviceArea: 'MY-10',
    });

    expect(sendMail).not.toHaveBeenCalled();
  });

  it('logs to console when SMTP config missing', async () => {
    mockCreateTransport.mockReset();
    const config = createConfigMock({});
    const service = new NotificationService(config as ConfigService);
    const loggerSpy = jest.spyOn(
      (service as unknown as { logger: AppLoggerService }).logger,
      'log',
    );

    await service.sendApplicationAcknowledgement({
      name: 'Test',
      email: 'test@example.com',
      referenceId: 'REF1',
    });

    expect(mockCreateTransport).not.toHaveBeenCalled();
    expect(loggerSpy).toHaveBeenCalled();
  });
});
