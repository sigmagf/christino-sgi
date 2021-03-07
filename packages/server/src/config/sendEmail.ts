import AWS from 'aws-sdk';
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
  to: Address[];
  subject: string;
  body: EmailBody;
}

// export async function sendEmail({ to, subject, body }: SendMailConfig) {
//   const transport = nodemailer.createTransport({
//     host: process.env.SENDINGBLUE_HOST,
//     port: process.env.SENDINGBLUE_PORT,
//     auth: {
//       user: process.env.SENDINGBLUE_USER,
//       pass: process.env.SENDINGBLUE_PASS,
//     },
//   });

//   await transport.sendMail({
//     from: {
//       address: 'sgi@christinoconsultoria.com.br',
//       name: 'Christino | Sistema de Gestao Interno',
//     },
//     to,
//     subject,
//     html: body.html || undefined,
//     text: body.text || undefined,
//   });
// }

export async function sendEmail({ to, subject, body }: SendMailConfig) {
  const ses = new AWS.SES({ region: process.env.AWS_DEFAULT_REGION });

  let effectiveBody: any;

  if(body.html && !body.text) {
    effectiveBody = {
      Html: { Data: body.html },
    };
  } else if(body.text && !body.html) {
    effectiveBody = {
      Text: { Data: body.text },
    };
  } else {
    effectiveBody = {
      Html: { Data: body.html },
      Text: { Data: body.text },
    };
  }

  await ses.sendEmail({
    Source: 'Christino | Sistema de Gestao Interno <sgi@christinoconsultoria.com.br>',
    Destination: {
      ToAddresses: to.map((el) => `${el.name} <${el.address}>`),
    },
    Message: {
      Subject: { Data: subject },
      Body: effectiveBody,
    },
  }).promise();
}
