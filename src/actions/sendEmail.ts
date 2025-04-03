'use server';

import Mailgun from 'mailgun.js';

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}

const sendEmail = async ({ to, subject, text }: SendEmailProps) => {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY as string,
  });

  const messageData = {
    from: 'points.credit <noreply@points.credit>',
    to: [to],
    subject,
    text,
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN as string, messageData);
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;
