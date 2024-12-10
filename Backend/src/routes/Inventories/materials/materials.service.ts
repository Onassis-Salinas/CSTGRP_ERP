import { Injectable } from '@nestjs/common';
import { deleteSchema, editSchema, createSchema } from './materials.schema';
import { z } from 'zod';
import sql from 'src/utils/db';
import { File } from '@nest-lab/fastify-multer';
import { deleteFile, saveFile } from 'src/utils/storage';

@Injectable()
export class MaterialsService {
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
    await sql`insert into materials ${sql({ ...body, image })} returning id`;
    return;
  }

  async editMaterial(body: z.infer<typeof editSchema>, file: File) {
    const [previousObj] =
      await sql`select image from materials where id = ${body.id}`;
    const image = await saveFile(file, 'inventory', previousObj.image);

    await sql`update materials set ${sql({ ...body, image })} where id = ${body.id}`;
    return;
  }

  async deleteMaterial(body: z.infer<typeof deleteSchema>) {
    const [deletedObj] =
      await sql`delete from materials where id = ${body.id} returning image`;
    deleteFile(deletedObj.image);

    return;
  }
}
