import { HttpException } from '@nestjs/common';

export const sendError = (message: string, code: number, err?: any) => {
  throw new HttpException(message || err, code);
};
