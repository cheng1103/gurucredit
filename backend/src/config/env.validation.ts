import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  HOST: Joi.string().default('0.0.0.0'),
  PORT: Joi.number().default(3001),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['mongodb', 'mongodb+srv'] })
    .required(),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  CORS_ORIGINS: Joi.string().allow('', null),
  ENABLE_SWAGGER: Joi.boolean()
    .truthy('true')
    .falsy('false')
    .default(process.env.NODE_ENV !== 'production'),
  LOG_FILE: Joi.string().allow('', null),
  SMTP_HOST: Joi.string().allow('', null),
  SMTP_PORT: Joi.number().default(587),
  SMTP_USER: Joi.string().allow('', null),
  SMTP_PASS: Joi.string().allow('', null),
  SMTP_SECURE: Joi.alternatives().try(
    Joi.boolean(),
    Joi.string().valid('true', 'false'),
  ),
  SMTP_FROM: Joi.string().allow('', null),
  COMPANY_WHATSAPP: Joi.string().allow('', null),
  PII_ENCRYPTION_KEY: Joi.string()
    .base64({ paddingRequired: true })
    .required()
    .messages({
      'string.base64':
        'PII_ENCRYPTION_KEY must be a base64-encoded 32-byte secret.',
      'any.required':
        'PII_ENCRYPTION_KEY is required to protect identity information.',
    }),
});
