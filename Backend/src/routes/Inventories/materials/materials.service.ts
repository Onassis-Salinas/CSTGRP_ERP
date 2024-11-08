import { Injectable } from '@nestjs/common';
import { deleteSchema, editSchema, createSchema } from './materials.schema';
import { z } from 'zod';
import sql from 'src/utils/db';
import { File } from '@nest-lab/fastify-multer';
import { saveFile } from 'src/utils/storage';

@Injectable()
export class MaterialsService {
  async findAllMaterials() {
    const materials =
      await sql`SELECT id, code, description, measurement, "clientId", "minAmount", image FROM materials order by code asc`;
    return materials;
  }

  async findMaterial() {
    const materials =
      await sql`SELECT * FROM materials where name = 1 order by name asc`;
    return materials;
  }

  async createMaterial(body: any, file: File) {
    const image = await saveFile(file, 'inventory');
    await sql`insert into materials ${sql({ ...body, image })} returning id`;
    return;
  }

  async editMaterial(body: z.infer<typeof editSchema>) {
    await sql`update materials set ${sql(body)} where id = ${body.id}`;
    return;
  }

  async deleteMaterial(body: z.infer<typeof deleteSchema>) {
    await sql`delete from materials where id = ${body.id}`;

    return;
  }
}
