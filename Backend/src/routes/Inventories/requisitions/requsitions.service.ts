import { HttpException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import sql from 'src/utils/db';
import {
  idSchema,
  jobsSchema,
  movementsFilterSchema,
  requisitionSchema,
} from './requsitions.schema';
import { ContextProvider } from 'src/interceptors/context.provider';

@Injectable()
export class RequisitionsService {
  constructor(private readonly req: ContextProvider) {}

  async getMovements(body: z.infer<typeof movementsFilterSchema>) {
    const movements = await sql`SELECT
      materials.code, materials.description, materials.measurement, materials."clientId", materials."leftoverAmount", materials.amount as inventory, materialmovements.amount, materialmovements."realAmount", materialie.due, materialie.jobpo, materialie.programation
      FROM materialmovements
      JOIN materials on materials.id = materialmovements."materialId"
      JOIN materialie on materialie.id = materialmovements."movementId"
      WHERE
      NOT materialmovements.active AND
      NOT materialmovements.extra AND
      ${body.jobpo ? sql`materialie.jobpo = ${body.jobpo}` : sql`TRUE`} AND
      ${body.programation ? sql`materialie.programation = ${body.programation}` : sql`TRUE`} AND
      ${body.code ? sql`materials.code LIKE ${'%' + body.code + '%'}` : sql`TRUE`}
      ORDER BY materialie.due DESC, materialie.jobpo DESC, materials.code DESC, materialmovements.amount DESC, materialmovements.id DESC
      LIMIT 150`;
    return movements;
  }

  async getPendingJobs(body: z.infer<typeof jobsSchema>) {
    const movements = await sql`SELECT
      -materialmovements.amount as amount, materialie.due, materialie.jobpo, materialie.programation, materialmovements.id
      FROM materialmovements
      JOIN materials on materials.id = materialmovements."materialId"
      JOIN materialie on materialie.id = materialmovements."movementId"
      WHERE
      materials.code = ${body.code} AND  
      NOT materialmovements.active AND
      NOT materialmovements.extra
      ORDER BY materialie.due DESC, materialie.jobpo DESC LIMIT 20`;
    return movements;
  }

  async createRequisition(body: z.infer<typeof requisitionSchema>) {
    const [data] =
      await sql`SELECT STRING_AGG((select jobpo from materialie where id = "movementId"), ', ') as jobs, BOOL_OR(active) as active, SUM(amount) as necessary FROM materialmovements WHERE id IN ${sql(body.jobIds)} `;

    if (!data?.jobs) throw new HttpException('Selecciona al menos un job', 400);
    if (data?.active)
      throw new HttpException('Uno de los jobs ya fue expedido', 400);

    await sql.begin(async (sql) => {
      const [inserted] =
        await sql`insert into requisitions (folio, petitioner, "user", motive, area, "materialId", jobs, requested, necesary) values
        (
          (SELECT COALESCE(MAX(folio), 0) + 1 FROM requisitions),
          ${body.petitioner},
          (select username from users where id = ${this.req.userId}),
          ${body.motive},
          (select name from areas where id = ${body.areaId}),
          (select id from materials where code = ${body.code}),
          ${data.jobs},
          ${body.requested},
          ${data.necessary}
        ) returning folio`;

      await this.req.record(
        `Hizo una requisicion de folio: ${inserted.folio}`,
        sql,
      );
    });
  }

  async deleteRequisition(body: z.infer<typeof idSchema>) {
    let deletedObj;
    await sql.begin(async (sql) => {
      [deletedObj] =
        await sql`delete from materials where id = ${body.id} returning image, code`;

      await this.req.record(`Elimino el material ${deletedObj.code}`, sql);
    });
    return;
  }
}
