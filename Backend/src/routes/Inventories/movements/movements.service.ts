import { HttpException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import sql from 'src/utils/db';
import {
  exportSchema,
  idSchema,
  importSchema,
  movementsFilterSchema,
  updateAmountSchema,
} from './movements.schema';

@Injectable()
export class MovementsService {
  async getJobMovements(body: z.infer<typeof movementsFilterSchema>) {
    const movements = await sql`SELECT
      materials.code, materials.description, materials.measurement, materials."clientId", materials."leftoverAmount", materialmovements.active, materialmovements.amount, materialmovements."realAmount", materialmovements.id, materialie.due, materialie.jobpo, materialie.programation, materialie.import
      FROM materialmovements
      JOIN materials on materials.id = materialmovements."materialId"
      JOIN materialie on materialie.id = materialmovements."movementId"
      WHERE
      ${body.jobpo ? sql`materialie.jobpo = ${body.jobpo}` : sql`TRUE`} AND
      ${body.import ? sql`materialie.import = ${body.import}` : sql`TRUE`} AND
      ${body.programation ? sql`materialie.programation = ${body.programation}` : sql`TRUE`} AND
      ${body.code ? sql`materials.code LIKE ${'%' + body.code + '%'}` : sql`TRUE`} AND
      ${body.checked !== null ? sql`materialmovements.active = ${body.checked === 'true'}` : sql`TRUE`}
      ORDER BY materialie.due DESC, materialie.jobpo DESC, materials.code DESC, materialmovements.amount DESC, materialmovements.id DESC
      LIMIT 500`;
    return movements;
  }

  async getMaterialMovements(body: z.infer<typeof idSchema>) {
    const movements = await sql`SELECT
        materialie.Due,
        materialie.programation,
        materialie.jobpo,
        materialie.import,
        materialmovements.amount,
        materialmovements."realAmount",
        materialmovements.active,
        SUM(materialmovements."realAmount") OVER (ORDER BY materialie.due ASC, materialmovements.id ASC) AS balance
        FROM
            materialmovements
        JOIN
            materials ON materials.id = materialmovements."materialId"
        JOIN
            materialie ON materialie.id = materialmovements."movementId"
        WHERE
            materials.id = ${body.id} AND  materialmovements.active is true
        ORDER BY
            materialie.due DESC,
            materialmovements.id DESC
        LIMIT 500`;
    return movements;
  }

  async updateRealAmount(body: z.infer<typeof updateAmountSchema>) {
    const [movement] =
      await sql`select active, id, amount from materialmovements where id = ${body.id}`;

    if (movement.active)
      throw new HttpException('Este movimiento ya se surtio', 400);

    await sql`update materialmovements set "realAmount" = ${movement.amount >= 0 ? Math.abs(parseFloat(body.newAmount)) : -Math.abs(parseFloat(body.newAmount))} where id = ${body.id}`;

    return;
  }

  async activateMovement(body: z.infer<typeof idSchema>) {
    const [movement] =
      await sql`select active from materialmovements where id = ${body.id}`;

    if (movement.active) {
      await sql.begin(async (sql) => {
        const [movement] =
          await sql`UPDATE materialmovements SET active = false, "activeDate" = NULL WHERE id = ${body.id} returning amount, "realAmount", "materialId"`;

        await sql`update materials set amount = amount - ${parseFloat(movement.realAmount)} where id = ${movement.materialId}`;
      });
    } else {
      await sql.begin(async (sql) => {
        const [movement] =
          await sql`UPDATE materialmovements SET active = true, "activeDate" = ${new Date()} WHERE id = ${body.id} returning amount, "realAmount", "materialId"`;

        await sql`update materials set amount = amount + ${parseFloat(movement.realAmount)} where id = ${movement.materialId}`;
      });
    }

    return movement.active;
  }

  async postInput(body: z.infer<typeof importSchema>) {
    const materials = body.materials.map((item: any) => item.code);
    await sql.begin(async (sql) => {
      const materialRows =
        await sql`SELECT code FROM materials WHERE code in ${sql(materials)}`;
      console.log(materialRows);
      console.log(materials);
      if (materialRows.length !== materials.length)
        throw new HttpException(
          'Uno o varios de los materiales incorrectos',
          400,
        );

      await sql`insert into materialie (import, due) values (${body.import},${body.due})`;

      for (const material of body.materials) {
        const [movement] =
          await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate") values
         ((select id from materials where code = ${material.code}),(select id from materialie where import = ${body.import}), ${Math.abs(parseFloat(material.amount))},${Math.abs(parseFloat(material.amount))}, true, ${new Date()}) returning "realAmount", "materialId"`;

        await sql`update materials set amount = amount + ${movement.realAmount} where id = ${movement.materialId}`;
      }
    });
  }

  async postExport(body: z.infer<typeof exportSchema>) {
    const materials = body.materials.map((item: any) => item.code);

    const materialRows =
      await sql`SELECT code FROM materials WHERE code in ${sql(materials)}`;
    if (materialRows.length !== materials.length)
      throw new HttpException(
        'Uno o varios de los materiales incorrectos',
        400,
      );

    await sql.begin(async (sql) => {
      await sql`Select id from materials where code in (${materials})`;

      await sql`Insert into materialie (jobpo, programation, due) values (${body.jobpo}, ${body.programation}, ${body.due})`;

      for (const material of body.materials) {
        const [movement] =
          await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate") values
         ((select Id from materials where code = ${material.code}),(select id from materialie where jobpo = ${body.jobpo}),${-Math.abs(parseFloat(material.amount))},${-Math.abs(parseFloat(material.amount))}, ${material.active}, ${material.active ? new Date() : null}) returning "realAmount", "materialId"`;

        if (material.active)
          await sql`update materials set amount = amount + ${movement.realAmount} where id = ${movement.materialId}`;
      }
    });

    return;
  }
}
