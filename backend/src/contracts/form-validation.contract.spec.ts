import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePublicApplicationDto } from '../applications/dto/application.dto';
import {
  SERVICE_AREA_CODES,
  SERVICE_AREA_LABELS,
  EMPLOYMENT_TYPES,
  REFERRAL_SOURCES,
  CONTACT_PREFERENCES,
} from '@guru/shared-config';
import {
  SERVICE_AREA_CODES as FRONT_SERVICE_AREAS,
  SERVICE_AREA_LABELS as FRONT_SERVICE_AREA_LABELS,
  EMPLOYMENT_TYPES as FRONT_EMPLOYMENT_TYPES,
  REFERRAL_SOURCES as FRONT_REFERRAL_SOURCES,
  CONTACT_PREFERENCES as FRONT_CONTACT_PREFERENCES,
} from '../../../frontend/src/lib/form-options';
import {
  SERVICE_AREA_FILTERS as ADMIN_SERVICE_AREA_FILTERS,
  formatServiceArea as adminFormatServiceArea,
} from '../../../admin/src/lib/serviceAreas';

/**
 * The admin keeps its own copy of the service-area list and exports only the
 * derived filter options, so the contract is checked through those: the "all
 * areas" sentinel aside, the filter list must be the shared list, in order,
 * with the shared labels.
 */
const adminServiceAreas = ADMIN_SERVICE_AREA_FILTERS.filter(
  (option) => option.value !== 'all',
);

describe('Form option contract', () => {
  it('keeps service area codes in sync with frontend schemas', () => {
    expect(SERVICE_AREA_CODES).toEqual(FRONT_SERVICE_AREAS);
  });

  it('keeps service area codes in sync with the admin filter list', () => {
    // Without this the admin's duplicate could drift unnoticed: a new or
    // corrected code would leave the admin offering a stale filter, or
    // `formatServiceArea` falling through to a raw code while triaging a
    // real lead.
    expect(adminServiceAreas.map((option) => option.value)).toEqual([
      ...SERVICE_AREA_CODES,
    ]);
  });

  it('keeps service area labels identical across all three lists', () => {
    expect(FRONT_SERVICE_AREA_LABELS).toEqual(SERVICE_AREA_LABELS);
    expect(
      Object.fromEntries(
        adminServiceAreas.map((option) => [option.value, option.label]),
      ),
    ).toEqual(SERVICE_AREA_LABELS);
  });

  it('formats every shared code to a state name in the admin, never a raw code', () => {
    for (const code of SERVICE_AREA_CODES) {
      expect(adminFormatServiceArea(code)).toBe(SERVICE_AREA_LABELS[code]);
    }
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
      'Please select a valid Malaysian state or federal territory',
    );
  });
});
