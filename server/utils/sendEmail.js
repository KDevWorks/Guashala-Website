import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

export const sendEmail = async (options) => {
  if (!config.smtp.user) {
    console.log('SMTP credentials not configured. Skipping email send.');
    console.log(`Email content:\nTo: ${options.to}\nSubject: ${options.subject}\nHTML: ${options.html}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  const message = {
    from: `${config.smtp.user}`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(message);
};
