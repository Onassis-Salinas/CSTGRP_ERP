import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.netfirms.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ALERTS_EMAIL,
    pass: process.env.EMAIL_PW,
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
