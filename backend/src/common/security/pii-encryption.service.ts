import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'node:crypto';

const IV_LENGTH = 12; // AES-GCM recommended IV size
const AUTH_TAG_LENGTH = 16;

@Injectable()
export class PiiEncryptionService {
  private readonly logger = new Logger(PiiEncryptionService.name);
  private readonly key: Buffer;

  constructor(private readonly configService: ConfigService) {
    const rawKey = this.configService.get<string>('PII_ENCRYPTION_KEY');
    if (!rawKey) {
      throw new Error('PII_ENCRYPTION_KEY is not configured.');
    }

    const decoded = Buffer.from(rawKey, 'base64');
    if (decoded.length !== 32) {
      throw new Error(
        'PII_ENCRYPTION_KEY must decode to 32 bytes for AES-256-GCM.',
      );
    }

    this.key = decoded;
  }

  encrypt(value?: string | null): string | null {
    if (!value) {
      return value ?? null;
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(value, 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    const payload = Buffer.concat([iv, authTag, encrypted]).toString('base64');
    const hash = this.hashValue(value);

    return `${hash}:${payload}`;
  }

  decrypt(value?: string | null): string | null {
    if (!value) {
      return value ?? null;
    }

    const [storedHash, payload] = value.includes(':')
      ? value.split(':', 2)
      : [null, null];

    if (!payload) {
      // Backward compatibility for legacy plaintext values.
      return value;
    }

    try {
      const buffer = Buffer.from(payload, 'base64');
      if (buffer.length <= IV_LENGTH + AUTH_TAG_LENGTH) {
        throw new Error('Encrypted payload is too short.');
      }
      const iv = buffer.subarray(0, IV_LENGTH);
      const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
      const encrypted = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

      const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, iv);
      decipher.setAuthTag(authTag);
      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]).toString('utf8');

      if (storedHash && storedHash !== this.hashValue(decrypted)) {
        throw new Error('Hash mismatch detected for decrypted value.');
      }

      return decrypted;
    } catch (error) {
      this.logger.error('Failed to decrypt sensitive value', error as Error);
      return null;
    }
  }

  getHashPrefix(value: string) {
    return this.hashValue(value);
  }

  private hashValue(value: string) {
    return crypto.createHash('sha256').update(value).digest('hex');
  }
}
