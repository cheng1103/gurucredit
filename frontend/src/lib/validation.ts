import { z } from 'zod';
import {
  SERVICE_AREA_CODES,
  EMPLOYMENT_TYPES,
  REFERRAL_SOURCES,
  CONTACT_PREFERENCES,
} from './form-options';

// ===========================================
// Input Sanitization
// ===========================================

/**
 * Sanitize string input to prevent XSS attacks
 * Removes HTML tags and dangerous characters
 */
export function sanitizeString(input: string): string {
  if (!input) return '';

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script-related patterns
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    // Encode special characters
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Trim whitespace
    .trim();
}

/**
 * Sanitize and limit string length
 */
export function sanitizeAndLimit(input: string, maxLength: number): string {
  return sanitizeString(input).substring(0, maxLength);
}

/**
 * Sanitize phone number - only allow digits, +, -, and spaces
 */
export function sanitizePhone(input: string): string {
  if (!input) return '';
  return input.replace(/[^\d+\-\s]/g, '').trim();
}

/**
 * Sanitize email - basic cleanup
 */
export function sanitizeEmail(input: string): string {
  if (!input) return '';
  return input.toLowerCase().trim();
}

// ===========================================
// Validation Schemas
// ===========================================

// Malaysian phone regex (supports various formats)
const malaysianPhoneRegex = /^(\+?6?0)[0-9]{1,2}[-\s]?[0-9]{3,4}[-\s]?[0-9]{4}$/;

// Controlled vocab options (mirrors UI choices to keep API inputs predictable)
const referralSources = REFERRAL_SOURCES;
const contactPreferenceOptions = CONTACT_PREFERENCES;

// Email validation schema
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(100, 'Email is too long')
  .transform(sanitizeEmail);

// Phone validation schema (Malaysian format)
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(malaysianPhoneRegex, 'Please enter a valid Malaysian phone number')
  .transform(sanitizePhone);

// Name validation schema
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .transform((val) => sanitizeAndLimit(val, 100));

// Loan application form schema
export const loanApplicationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  serviceArea: z.enum(SERVICE_AREA_CODES, {
    error: () => ({ message: 'Please select Kuala Lumpur or Selangor' }),
  }),
  employmentType: z.enum(EMPLOYMENT_TYPES, {
    message: 'Please select an employment type',
  }),
  employerName: z
    .string()
    .max(100, 'Company name is too long')
    .transform((val) => sanitizeAndLimit(val, 100))
    .optional()
    .or(z.literal('')),
  jobTitle: z
    .string()
    .max(100, 'Job title is too long')
    .transform((val) => sanitizeAndLimit(val, 100))
    .optional()
    .or(z.literal('')),
  monthlyIncome: z
    .string()
    .min(1, 'Monthly income is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Please enter a valid income amount',
    })
    .refine((val) => parseFloat(val) <= 10000000, {
      message: 'Income amount seems too high',
    }),
  houseLoan: z
    .string()
    .refine((val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: 'Please enter a valid amount',
    })
    .optional()
    .or(z.literal('')),
  carLoan: z
    .string()
    .refine((val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: 'Please enter a valid amount',
    })
    .optional()
    .or(z.literal('')),
  personalLoan: z
    .string()
    .refine((val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: 'Please enter a valid amount',
    })
    .optional()
    .or(z.literal('')),
  creditCard: z
    .string()
    .refine((val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: 'Please enter a valid amount',
    })
    .optional()
    .or(z.literal('')),
  otherDebts: z
    .string()
    .refine((val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
      message: 'Please enter a valid amount',
    })
    .optional()
    .or(z.literal('')),
  loanPurpose: z
    .string()
    .max(50, 'Loan purpose is too long')
    .transform((val) => sanitizeAndLimit(val, 50))
    .optional()
    .or(z.literal('')),
  loanAmount: z
    .string()
    .refine((val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) > 0), {
      message: 'Please enter a valid loan amount',
    })
    .refine((val) => val === '' || parseFloat(val) <= 10000000, {
      message: 'Loan amount seems too high',
    })
    .optional()
    .or(z.literal('')),
  additionalNotes: z
    .string()
    .max(1000, 'Notes are too long')
    .transform((val) => sanitizeAndLimit(val, 1000))
    .optional()
    .or(z.literal('')),
  referralSource: z
    .enum(referralSources, { error: () => ({ message: 'Please select a source from the list' }) })
    .optional()
    .or(z.literal('')),
  contactPreference: z
    .enum(contactPreferenceOptions, {
      error: () => ({ message: 'Please pick one of the available WhatsApp slots' }),
    })
    .optional()
    .or(z.literal('')),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  serviceArea: z.enum(SERVICE_AREA_CODES, {
    error: () => ({ message: 'Please select a supported service area' }),
  }),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject is too long')
    .transform((val) => sanitizeAndLimit(val, 200)),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long')
    .transform((val) => sanitizeAndLimit(val, 2000)),
});

// Type exports
export type LoanApplicationData = z.infer<typeof loanApplicationSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

// ===========================================
// Validation Helper Functions
// ===========================================

/**
 * Validate form data and return errors
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  // Zod v4 uses result.error.issues instead of result.error.errors
  const issues = result.error.issues || [];
  for (const issue of issues) {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }

  return { success: false, errors };
}

/**
 * Get first validation error for a field
 */
export function getFieldError(
  errors: Record<string, string> | undefined,
  field: string
): string | undefined {
  return errors?.[field];
}
