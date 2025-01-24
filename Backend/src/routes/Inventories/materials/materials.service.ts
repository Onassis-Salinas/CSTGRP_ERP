import { Injectable } from '@nestjs/common';
import { deleteSchema, editSchema, createSchema } from './materials.schema';
import { z } from 'zod';
import sql from 'src/utils/db';
import { File } from '@nest-lab/fastify-multer';
import { deleteFile, saveFile } from 'src/utils/storage';
import { ContextProvider } from 'src/interceptors/context.provider';
import { createRecord } from 'src/utils/records';

@Injectable()
export class MaterialsService {
  constructor(private readonly req: ContextProvider) {}

  async findAllMaterials() {
    const materials =
      await sql`SELECT id, code, description, measurement, "clientId", "minAmount", location, image FROM materials order by code asc`;

    return materials;
  }

  async findMaterial() {
    const materials =
      await sql`SELECT * FROM materials where name = 1 order by name asc`;
    return materials;
  }

  async createMaterial(body: z.infer<typeof createSchema>, file: File) {
    const image = await saveFile(file, 'inventory');
    await sql.begin(async (sql) => {
      await sql`insert into materials ${sql({ ...body, image })} returning id`;
      await createRecord(
        `Creo el material ${body.code}`,
        {
          action: 'create',
          module: 'inventory',
          user: this.req.getUserId(),
        },
        sql,
      );
    });
    return;
  }

  async editMaterial(body: z.infer<typeof editSchema>, file: File) {
    const [previousObj] =
      await sql`select code, image from materials where id = ${body.id}`;
    const image = await saveFile(file, 'inventory', previousObj.image);

    await sql.begin(async (sql) => {
      await sql`update materials set ${sql({ ...body, image })} where id = ${body.id}`;
      await createRecord(
        `Actualizo el material ${previousObj.code}`,
        {
          action: 'update',
          module: 'inventory',
          user: this.req.getUserId(),
        },
        sql,
      );
    });
    return;
  }

  async deleteMaterial(body: z.infer<typeof deleteSchema>) {
    let deletedObj;
    await sql.begin(async (sql) => {
      [deletedObj] =
        await sql`delete from materials where id = ${body.id} returning image, code`;

      await createRecord(
        `Elimino el material ${deletedObj.code}`,
        {
          action: 'delete',
          module: 'inventory',
          user: this.req.getUserId(),
        },
        sql,
      );
    });
    if (deletedObj?.image) deleteFile(deletedObj?.image);

    return;
  }
}
