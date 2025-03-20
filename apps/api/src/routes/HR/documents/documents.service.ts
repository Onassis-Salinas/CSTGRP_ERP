import { HttpException, Injectable } from '@nestjs/common';
import {
  createDocSchema,
  editDocSchema,
  getDocumentsSchema,
  idSchema,
} from './documents.schema';
import { z } from 'zod';
import sql from 'src/utils/db';
import { deleteFile, saveFile } from 'src/utils/storage';
import { File } from '@nest-lab/fastify-multer';

@Injectable()
export class DocumentsService {
  async getDocuments(body: z.infer<typeof getDocumentsSchema>) {
    return await sql`select * from documents where "employeeId" = ${body.employeeId}`;
  }

  async uploadDocument(body: z.infer<typeof createDocSchema>, file: File) {
    const [exists] =
      await sql`select 1 from documents where name = ${body.name} and "employeeId" = ${body.employeeId}`;
    if (exists)
      throw new HttpException('Ya se tiene un documento con ese nombre', 400);
    if (!file) throw new HttpException('Falta el archivo', 400);

    const url = await saveFile(file, 'employees');
    await sql`insert into documents (url, name, "employeeId") values (${url}, ${body.name}, ${body.employeeId}) `;
    return;
  }
  async editDocument(body: z.infer<typeof editDocSchema>, file: File) {
    const [exists] =
      await sql`select id from documents where name = ${body.name} and "employeeId" = (select "employeeId" from documents where id = ${body.id}) and id <> ${body.id}`;
    if (exists)
      throw new HttpException('Ya se tiene un documento con ese nombre', 400);

    const [prevDoc] = await sql`select * from documents where id = ${body.id}`;

    const url = await saveFile(file, 'employees', prevDoc.url);
    await sql`update documents set ${sql({ ...body, url })} where id = ${body.id}`;
    return;
  }

  async deleteDocument(body: z.infer<typeof idSchema>) {
    const [document] = await sql`select * from documents where id = ${body.id}`;
    await deleteFile(document.url);
    await sql`delete from documents where id = ${body.id}`;
    return;
  }
}
