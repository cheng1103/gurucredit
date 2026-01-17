import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '../validation';

describe('contactFormSchema', () => {
  it('accepts a valid payload', () => {
    const valid = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+60123456789',
      serviceArea: 'MY-14',
      subject: 'Help',
      message: 'Need assistance with my loan application.',
    };
    expect(() => contactFormSchema.parse(valid)).not.toThrow();
  });

  it('rejects invalid email', () => {
    const invalid = {
      name: 'John',
      email: 'invalid-email',
      phone: '+60123456789',
      serviceArea: 'MY-13',
      subject: 'Hi',
      message: 'text',
    };
    expect(() => contactFormSchema.parse(invalid)).toThrow();
  });
});
