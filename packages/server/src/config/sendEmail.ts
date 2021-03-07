import nodemailer from 'nodemailer';

type Address = {
  name: string;
  address: string;
}

type EmailBody = {
  html?: string;
  text?: string;
}

type SendMailConfig = {
  to: Address;
  subject: string;
  body: EmailBody;
}

export async function sendEmail({ to, subject, body }: SendMailConfig) {
  const transport = nodemailer.createTransport({
    host: process.env.SENDINGBLUE_HOST,
    port: process.env.SENDINGBLUE_PORT,
    auth: {
      user: process.env.SENDINGBLUE_USER,
      pass: process.env.SENDINGBLUE_PASS,
    },
  });

  await transport.sendMail({
    from: {
      address: 'sgi@christinoconsultoria.com.br',
      name: 'Christino | Sistema de Gestao Interno',
    },
    to,
    subject,
    html: body.html || undefined,
    text: body.text || undefined,
  });
}
