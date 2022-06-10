import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { HandlebarsTemplateDelegate } from 'handlebars/lib/handlebars/decorators';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { AppConfig } from 'src/config/config.service';
import mjml2html = require('mjml');

export enum EmailTemplates {
  VERIFY_MEMBER = 'verify-user.mjml',
  PASSWORD_RESET = 'password-reset.mjml',
  BOOKING_RESERVED = 'booking_reserved.mjml',
  PAYMENT_CONFIRMATION = 'booking_paid.mjml',
  PAYMENT_REQUIRED = 'payment_required.mjml',
}

export interface IEmailVariables {
  verifyLink?: string;
  passwordResetLink?: string;
}

@Injectable()
export class SmtpService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private templates: Map<string, HandlebarsTemplateDelegate> = new Map();

  constructor(private readonly appConfig: AppConfig) {
    for (const template in EmailTemplates) {
      const templateFile = EmailTemplates[template];

      const mjmlConvert = mjml2html(
        readFileSync(`email_templates/${templateFile}`).toString(),
      );

      if (mjmlConvert.errors.length !== 0) {
        console.log(
          `Could not parse mjml file ${templateFile} => ${mjmlConvert.errors}`,
        );
        process.exit(1);
      }

      const hbsTemplateFn = compile(mjmlConvert.html);
      this.templates.set(templateFile, hbsTemplateFn);
    }

    const smtpConn = appConfig.smtpConnection;

    this.transporter = nodemailer.createTransport({
      host: smtpConn.host,
      port: smtpConn.port,
      secure: true,
      auth: {
        user: smtpConn.user,
        pass: smtpConn.pass,
      },
      debug: true,
      logger: true,
    });
  }
  sendEmail(
    recipient: string,
    subject: string,
    template: EmailTemplates,
    variables?: IEmailVariables,
  ) {
    return this.transporter.sendMail({
      from: 'no-reply@codebio.dev',
      to: recipient,
      subject,
      html: this.templates.get(template)({
        ...variables,
        name: 'TEST',
        appName: this.appConfig.appName,
      }),
    });
  }
}
