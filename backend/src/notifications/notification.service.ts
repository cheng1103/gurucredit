import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import { SERVICE_AREA_LABELS, ServiceAreaCode } from '@guru/shared-config';

interface ApplicationNotificationPayload {
  name: string;
  email: string;
  referenceId: string;
  serviceName?: string;
  serviceArea?: string | null;
}

interface ContactNotificationPayload {
  name: string;
  email: string;
  subject: string;
  serviceArea?: string | null;
}

const formatServiceArea = (area?: string | null) => {
  if (!area) return null;
  return SERVICE_AREA_LABELS[area as ServiceAreaCode] || area;
};

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly transporter?: Transporter;
  private readonly fromAddress: string;
  private readonly whatsapp: string;
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    this.isProduction =
      this.configService.get<string>('NODE_ENV', 'development') ===
      'production';
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT', 587);
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    const secure =
      this.configService.get<string>('SMTP_SECURE', 'false') === 'true';

    this.fromAddress =
      this.configService.get<string>('SMTP_FROM') || 'no-reply@gurucredits.my';
    this.whatsapp =
      this.configService.get<string>('COMPANY_WHATSAPP') || '+601127486389';

    if (host && port && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
      this.logger.log('SMTP transporter initialised for notification emails');
    } else {
      const message =
        'SMTP configuration missing. Notifications will not be sent.';
      if (this.isProduction) {
        throw new Error(
          `${message} Set SMTP_* environment variables in production.`,
        );
      }
      this.logger.warn(`${message} Running in fallback logging mode.`);
    }
  }

  private async sendMail(options: {
    to: string;
    subject: string;
    text: string;
    html: string;
    meta?: Record<string, string | number | null | undefined>;
  }) {
    if (!options.to) {
      this.logger.warn('Attempted to send notification without recipient');
      return;
    }

    if (!this.transporter) {
      const payload = {
        event: 'notification.fallback',
        to: this.maskRecipient(options.to),
        subject: options.subject,
        meta: options.meta ?? {},
      };
      this.logger.log(JSON.stringify(payload), 'NotificationFallback');
      return;
    }

    await this.transporter.sendMail({
      from: this.fromAddress,
      ...options,
    });
  }

  async sendApplicationAcknowledgement(
    payload: ApplicationNotificationPayload,
  ) {
    if (!payload.email) {
      return;
    }

    const areaLabel = formatServiceArea(payload.serviceArea);
    const subject = 'Application received – GURU Credits';
    const text = `Hi ${payload.name},\n\nThank you for submitting your ${areaLabel ? `${areaLabel} ` : ''}application. Your reference number is ${payload.referenceId}. Our consultant will review your details and follow up via WhatsApp (${this.whatsapp}) within 24 hours.\n\nThe RM30 analysis fee is collected only through our official WhatsApp chat once the consultant confirms your Kuala Lumpur/Selangor details. Please ignore any payment links that do not come from ${this.whatsapp}.\n\nIf you have urgent questions, simply reply to this email or drop us a message on WhatsApp.\n\n— GURU Credits`;
    const html = `<p>Hi ${payload.name},</p>
<p>Thank you for submitting your ${areaLabel ? `<strong>${areaLabel}</strong> ` : ''}application for <strong>${payload.serviceName || 'our service'}</strong>.</p>
<p><strong>Reference:</strong> ${payload.referenceId}</p>
${areaLabel ? `<p>We have recorded your service area as <strong>${areaLabel}</strong>. At the moment we only serve Kuala Lumpur & Selangor so this helps us route you to the right consultant.</p>` : ''}
<p>Our consultant will review your details and contact you via WhatsApp (<strong>${this.whatsapp}</strong>) within 24 hours.</p>
<p><strong>Payment reminder:</strong> The RM30 analysis fee is collected only through our official WhatsApp chat once the consultant confirms your local details. Please ignore any links that do not come from ${this.whatsapp}.</p>
<p>You can reply to this email or message us on WhatsApp if anything is urgent.</p>
<p>— GURU Credits</p>`;

    await this.sendMail({
      to: payload.email,
      subject,
      text,
      html,
      meta: {
        referenceId: payload.referenceId,
        serviceArea: payload.serviceArea ?? undefined,
      },
    });
  }

  async sendContactAcknowledgement(payload: ContactNotificationPayload) {
    if (!payload.email) {
      return;
    }

    const areaLabel = formatServiceArea(payload.serviceArea);
    const subject = 'Thanks for contacting GURU Credits';
    const text = `Hi ${payload.name},\n\nWe received your ${areaLabel ? `${areaLabel} ` : ''}message regarding "${payload.subject}". Our support team will respond on WhatsApp (${this.whatsapp}) or email within the next business day.\n\nTalk soon,\nGURU Credits`;
    const html = `<p>Hi ${payload.name},</p>
<p>We received your enquiry about <strong>${payload.subject}</strong>${areaLabel ? ` from <strong>${areaLabel}</strong>` : ''}. Our consultant will reply via WhatsApp (<strong>${this.whatsapp}</strong>) or email within the next business day.</p>
${areaLabel ? '<p>At this time we exclusively serve Kuala Lumpur & Selangor, so you’re already on the priority list.</p>' : ''}
<p>Talk soon,<br/>GURU Credits</p>`;

    await this.sendMail({
      to: payload.email,
      subject,
      text,
      html,
      meta: {
        serviceArea: payload.serviceArea ?? undefined,
      },
    });
  }

  private maskRecipient(address?: string) {
    if (!address) {
      return 'unknown-recipient';
    }
    const [local, domain] = address.split('@');
    if (!domain) {
      return 'redacted';
    }
    const safeLocal =
      local.length <= 2
        ? `${local[0] ?? '*'}***`
        : `${local[0]}***${local.slice(-1)}`;
    return `${safeLocal}@${domain}`;
  }
}
