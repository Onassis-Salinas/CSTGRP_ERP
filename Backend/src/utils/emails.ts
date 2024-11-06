import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.netfirms.com',
  port: 465,
  secure: true,
  auth: {
    user: 'alerts@cstgrp.com',
    pass: 'al2024$CST',
  },
});

export async function sendEmail(subject: string, body: string, to: string[]) {
  const info = await transporter.sendMail({
    from: '"Alerts CST" <alerts@cstgrp.com>', // sender address
    to: to,
    subject: subject,
    text: body,
  });

  console.log('Message sent: %s', info.messageId);
}
