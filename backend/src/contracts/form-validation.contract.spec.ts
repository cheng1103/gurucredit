import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePublicApplicationDto } from '../applications/dto/application.dto';
import {
  SERVICE_AREA_CODES,
  EMPLOYMENT_TYPES,
  REFERRAL_SOURCES,
  CONTACT_PREFERENCES,
} from '@guru/shared-config';
import {
  SERVICE_AREA_CODES as FRONT_SERVICE_AREAS,
  EMPLOYMENT_TYPES as FRONT_EMPLOYMENT_TYPES,
  REFERRAL_SOURCES as FRONT_REFERRAL_SOURCES,
  CONTACT_PREFERENCES as FRONT_CONTACT_PREFERENCES,
} from '../../../frontend/src/lib/form-options';

describe('Form option contract', () => {
  it('keeps service area codes in sync with frontend schemas', () => {
    expect(SERVICE_AREA_CODES).toEqual(FRONT_SERVICE_AREAS);
  });

  it('keeps employment, referral, and contact options aligned', () => {
    expect(EMPLOYMENT_TYPES).toEqual(FRONT_EMPLOYMENT_TYPES);
    expect(REFERRAL_SOURCES).toEqual(FRONT_REFERRAL_SOURCES);
    expect(CONTACT_PREFERENCES).toEqual(FRONT_CONTACT_PREFERENCES);
  });
});

describe('CreatePublicApplicationDto validation', () => {
  const basePayload = {
    serviceId: '1',
    name: 'Valid Applicant',
    email: 'valid@example.com',
    phone: '+60123456789',
    serviceArea: SERVICE_AREA_CODES[0],
    monthlyIncome: 5000,
  };

  it('accepts payloads that match the frontend Zod schema', async () => {
    const dto = plainToInstance(CreatePublicApplicationDto, {
      ...basePayload,
      employmentType: EMPLOYMENT_TYPES[0],
      loanAmount: 100000,
      referralSource: REFERRAL_SOURCES[0],
      contactPreference: CONTACT_PREFERENCES[0],
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('rejects unsupported service areas to mirror frontend validation', async () => {
    const dto = plainToInstance(CreatePublicApplicationDto, {
      ...basePayload,
      serviceArea: 'MY-00',
    });

    const errors = await validate(dto);
    const serviceAreaError = errors.find(
      (err) => err.property === 'serviceArea',
    );
    expect(serviceAreaError).toBeDefined();
    expect(serviceAreaError?.constraints?.isIn).toContain(
      'Kuala Lumpur & Selangor only',
    );
  });
});
