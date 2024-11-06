import * as dotenv from 'dotenv';
dotenv.config();

export const cookieConfig = {
  sameSite: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 31536000000,
  domain: process.env.COOKIES_DOMAIN,
  path: '/',
};

export const httpCookieConfig = {
  sameSite: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 31536000000,
  domain: process.env.COOKIES_DOMAIN,
  path: '/',
  httpOnly: true,
};
