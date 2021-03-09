import AWS from 'aws-sdk';

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

export async function sendEmail({ to, subject, body }: SendMailConfig) {
  const ses = new AWS.SES({ region: process.env.AWS_DEFAULT_REGION });

  if(!body || (!body.text && !body.html)) {
    throw new Error('O \'body\' é obrigatório ter o item \'text\' ou \'html\'');
  }

  await ses.sendEmail({
    Source: 'Christino | Sistema de Gestao Interno <sgi@christinoconsultoria.com.br>',
    Destination: {
      ToAddresses: to.map((el) => `${el.name} <${el.address}>`),
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Html: body.html ? { Data: body.html } : undefined,
        Text: body.text ? { Data: body.text } : undefined,
      },
    },
  }).promise();
}
