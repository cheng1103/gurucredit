import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUser, UserRole } from './types/auth-request.interface';
import { PiiEncryptionService } from '../common/security/pii-encryption.service';

export type AuthUserRecord = {
  id: string;
  email: string | null;
  password: string;
  name: string | null;
  role: string;
  isActive: boolean;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
};

@Injectable()
export class AuthService {
  private static readonly MAX_FAILED_ATTEMPTS = 5;
  private static readonly LOCK_DURATION_MINUTES = 15;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly piiEncryption: PiiEncryptionService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    if (dto.icNumber) {
      await this.ensureUniqueIc(dto.icNumber);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const encryptedIcNumber = dto.icNumber
      ? this.piiEncryption.encrypt(dto.icNumber)
      : undefined;

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        phone: dto.phone,
        icNumber: encryptedIcNumber,
      },
    });

    const token = this.generateToken(user.id, user.role);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = (await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        isActive: true,
        failedLoginAttempts: true,
        lockedUntil: true,
      },
    })) as AuthUserRecord | null;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (this.isAccountLocked(user.lockedUntil)) {
      this.logger.warn(
        `Login blocked for ${user.email}: account locked until ${user.lockedUntil?.toISOString()}`,
      );
      throw new UnauthorizedException(
        'Account temporarily locked due to multiple failed attempts. Please try again later.',
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      await this.recordFailedLogin(user.id, user.failedLoginAttempts);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    await this.resetFailedLogin(user.id);

    const token = this.generateToken(user.id, user.role);

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async validateToken(token: string): Promise<AuthUser> {
    try {
      const decoded = await this.jwtService.verifyAsync<{
        sub: string;
      }>(token);
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
        },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException();
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email ?? undefined,
        name: user.name ?? undefined,
        role: user.role as UserRole,
        isActive: user.isActive,
      };
      return authUser;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private generateToken(userId: string, role: string): string {
    return this.jwtService.sign({ sub: userId, role });
  }

  private async ensureUniqueIc(icNumber: string) {
    const hashPrefix = this.piiEncryption.getHashPrefix(icNumber);
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            icNumber: {
              startsWith: `${hashPrefix}:`,
            },
          },
          { icNumber },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('IC number already registered');
    }
  }

  private isAccountLocked(lockedUntil: Date | null | undefined) {
    return !!lockedUntil && lockedUntil.getTime() > Date.now();
  }

  private async recordFailedLogin(userId: string, attempts: number) {
    const nextAttempts = attempts + 1;
    const updateData: {
      failedLoginAttempts: number;
      lastFailedLogin: Date;
      lockedUntil?: Date;
    } = {
      failedLoginAttempts: nextAttempts,
      lastFailedLogin: new Date(),
    };

    if (nextAttempts >= AuthService.MAX_FAILED_ATTEMPTS) {
      updateData.failedLoginAttempts = 0;
      updateData.lockedUntil = new Date(
        Date.now() + AuthService.LOCK_DURATION_MINUTES * 60 * 1000,
      );
      this.logger.warn(
        `Account ${userId} locked after ${AuthService.MAX_FAILED_ATTEMPTS} failed attempts`,
      );
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  private async resetFailedLogin(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lastFailedLogin: null,
        lockedUntil: null,
      },
    });
  }
}
