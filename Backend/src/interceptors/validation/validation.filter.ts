import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { getTraducction } from 'src/utils/traduction';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ValidationFilter<T extends ZodError> {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    let message = '';

    const getError = (err) => {
      if (err.code === 'too_big')
        return `Es muy grande, (maximo: ${err.maximum})`;

      if (err.code === 'too_small')
        return `Es muy corto, (minimo: ${err.minimum})`;

      if (err.code === 'required') return 'Faltante';

      if (
        err.code === 'invalid_type' &&
        (err.received === 'null' || err.received === 'undefinded')
      )
        return 'Faltante';

      if (err.code === 'invalid_type')
        `Dato incorrecto, se espera ${err.expected}`;

      if (err.code === 'invalid_string') return `incorrecto`;

      if (err.code === 'custom') return `No cumple con el formato adecuado`;
    };

    const bodyExists = !!exception.errors[0].path[0];
    console.log(exception.errors[0]);
    message = `Dato (${getTraducction(exception.errors[0].path[0])}) ${getError(exception.errors[0])}`;

    response.status(HttpStatus.BAD_REQUEST).send({
      errors: bodyExists ? exception.errors : 'No se ah mandado ningun dato',
      message: bodyExists ? message : 'No se ah mandado ningun dato',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
