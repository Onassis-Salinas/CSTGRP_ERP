import { HttpException, Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import {
  createEvaluationSchema,
  getEvaluationsSchema,
} from './evaluations.schema';
import { z } from 'zod';
import sql from 'src/utils/db';
import { saveFile, deleteFile } from 'src/utils/storage';

@Injectable()
export class EvaluationsService {
  async getEvaluations(body: z.infer<typeof getEvaluationsSchema>) {
    return await sql`select * from evaluations where "employeeId" = ${body.employeeId} order by date desc`;
  }

  async uploadEvaluation(
    body: z.infer<typeof createEvaluationSchema>,
    file: File,
  ) {
    if (!file) throw new HttpException('Falta el archivo', 400);

    const url = await saveFile(file, 'employees');
    await sql`insert into evaluations (url, score, date, "employeeId") values (${url}, ${body.score}, ${body.date}, ${body.employeeId})`;
    return;
  }

  async deleteEvaluation(body: { id: string }) {
    const [evaluation] =
      await sql`select url from evaluations where id = ${body.id}`;
    if (!evaluation) throw new HttpException('Evaluación no encontrada', 404);

    await deleteFile(evaluation.url);
    await sql`delete from evaluations where id = ${body.id}`;
    return;
  }
}
