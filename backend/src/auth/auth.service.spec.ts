import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthUserRecord } from './auth.service';
import type { PrismaService } from '../prisma/prisma.service';
import type { JwtService } from '@nestjs/jwt';
import type { PiiEncryptionService } from '../common/security/pii-encryption.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

import * as bcrypt from 'bcrypt';

type PrismaMock = {
  user: {
    findUnique: jest.Mock<
      Promise<AuthUserRecord | null>,
      [Record<string, unknown>]
    >;
    update: jest.Mock<Promise<void>, [Record<string, unknown>]>;
    findFirst: jest.Mock;
  };
};

const createPrismaMock = (): PrismaMock => ({
  user: {
    findUnique: jest.fn<
      Promise<AuthUserRecord | null>,
      [Record<string, unknown>]
    >(),
    update: jest.fn<Promise<void>, [Record<string, unknown>]>(),
    findFirst: jest.fn(),
  },
});

const createJwtMock = (): JwtService =>
  ({
    sign: jest.fn().mockReturnValue('token'),
  }) as unknown as JwtService;

const createPiiMock = (): PiiEncryptionService =>
  ({
    encrypt: jest.fn(),
    decrypt: jest.fn(),
    getHashPrefix: jest.fn(),
  }) as unknown as PiiEncryptionService;

describe('AuthService security protections', () => {
  let service: AuthService;
  let prisma: PrismaMock;

  const dto = { email: 'user@example.com', password: 'Password123!' };

  const buildUser = (
    overrides: Partial<AuthUserRecord> = {},
  ): AuthUserRecord => ({
    id: 'user-1',
    email: dto.email,
    password: 'hash',
    name: 'User',
    role: 'USER',
    isActive: true,
    failedLoginAttempts: 0,
    lockedUntil: null,
    ...overrides,
  });

  beforeEach(() => {
    prisma = createPrismaMock();
    service = new AuthService(
      prisma as unknown as PrismaService,
      createJwtMock(),
      createPiiMock(),
    );
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('blocks login when lockedUntil is in the future', async () => {
    prisma.user.findUnique.mockResolvedValue(
      buildUser({ lockedUntil: new Date(Date.now() + 60_000) }),
    );

    await expect(service.login(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it('locks the account after fifth failed attempt', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    prisma.user.findUnique.mockResolvedValue(
      buildUser({ failedLoginAttempts: 4 }),
    );

    await expect(service.login(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    const lastCall =
      prisma.user.update.mock.calls[prisma.user.update.mock.calls.length - 1] ??
      [];
    const [updatePayload] = lastCall;
    const data = (updatePayload as { data?: Record<string, unknown> })?.data;
    expect(data).toMatchObject({ failedLoginAttempts: 0 });
    expect(data?.lockedUntil).toBeInstanceOf(Date);
  });

  it('resets counters after a successful login', async () => {
    prisma.user.findUnique.mockResolvedValue(
      buildUser({ failedLoginAttempts: 2 }),
    );

    await service.login(dto);

    const lastResetCall =
      prisma.user.update.mock.calls[prisma.user.update.mock.calls.length - 1] ??
      [];
    const [resetPayload] = lastResetCall;
    const reset = (resetPayload as { data?: Record<string, unknown> })?.data;
    expect(reset).toMatchObject({
      failedLoginAttempts: 0,
      lastFailedLogin: null,
      lockedUntil: null,
    });
  });
});
