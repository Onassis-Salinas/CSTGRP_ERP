import { Injectable } from '@nestjs/common';
import { deleteSchema, editSchema, createSchema } from './directory.schema';
import { z } from 'zod';
import sql from 'src/utils/db';

@Injectable()
export class DirectoryService {
  async findAllDirectory() {
    const directory = await sql`Select * from directory`;
    return directory;
  }

  async createEmail(body: z.infer<typeof createSchema>) {
    await sql`insert into directory ${sql(body)}`;
    return;
  }

  async editEmail(body: z.infer<typeof editSchema>) {
    await sql`update directory set ${sql(body)} where id = ${body.id}`;
    return;
  }

  async deleteEmail(body: z.infer<typeof deleteSchema>) {
    await sql`delete from directory where id = ${body.id}`;

    return;
  }

  async getOptions() {
    const emails = await sql`select id as value, email as name from emails`;
    const employees = await sql`select id as value, name from employees`;

    return { emails, employees };
  }
}
