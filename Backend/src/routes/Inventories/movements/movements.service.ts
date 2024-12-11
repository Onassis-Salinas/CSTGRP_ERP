import { HttpException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import sql from 'src/utils/db';
import {
  exportSchema,
  extraMovementSchema,
  idSchema,
  IEFilterSchema,
  importSchema,
  movementsFilterSchema,
  updateAmountSchema,
  updateExportSchema,
  updateImportSchema,
} from './movements.schema';
import { updateMaterialAmount } from 'src/utils/functions';

@Injectable()
export class MovementsService {
  async getMovements(body: z.infer<typeof movementsFilterSchema>) {
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

  async getIE(body: z.infer<typeof IEFilterSchema>) {
    const movements = await sql`
      SELECT * 
      FROM materialie
      WHERE 
        ${
          body.type === 'imports'
            ? sql`"import" IS NOT NULL`
            : body.type === 'exports'
              ? sql`"jobpo" IS NOT NULL`
              : sql`TRUE`
        }
        ${
          body.code
            ? sql`AND (
              "import" ILIKE ${'%' + body.code + '%'} OR 
              "jobpo" ILIKE ${'%' + body.code + '%'} OR 
              "programation" ILIKE ${'%' + body.code + '%'}
            )`
            : sql``
        }
      ORDER BY due DESC, jobpo DESC, import DESC`;
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
      await sql`select "materialId", active, id, amount from materialmovements where id = ${body.id}`;

    if (movement.active)
      throw new HttpException('Este movimiento ya se surtio', 400);

    await sql.begin(async (sql) => {
      await sql`update materialmovements set "realAmount" = ${movement.amount >= 0 ? Math.abs(parseFloat(body.newAmount)) : -Math.abs(parseFloat(body.newAmount))} where id = ${body.id}`;
      await updateMaterialAmount(movement.materialId, sql);
    });
    return;
  }

  async updateImport(body: z.infer<typeof updateImportSchema>) {
    await sql`update materialie set ${sql(body)} where id = ${body.id}`;

    const movements =
      await sql`select "materialId" from materialmovements where "movementId" = ${body.id}`;

    movements.forEach(
      async (movement) => await updateMaterialAmount(movement.materialId),
    );

    return;
  }

  async updateExport(body: z.infer<typeof updateExportSchema>) {
    await sql`update materialie set ${sql(body)} where id = ${body.id}`;
    return;
  }

  async activateMovement(body: z.infer<typeof idSchema>) {
    const [movement] =
      await sql`select active from materialmovements where id = ${body.id}`;

    await sql.begin(async (sql) => {
      const [result] =
        await sql`UPDATE materialmovements SET active = NOT active, "activeDate" = ${movement.active ? null : new Date()} WHERE id = ${body.id} returning "materialId"`;
      await updateMaterialAmount(result.materialId, sql);
    });

    const [updatedMovement] =
      await sql`select * from materialmovements where id = ${body.id}`;

    console.log(updatedMovement);
    await sql`update materials set
     "leftoverAmount" = "leftoverAmount" + ${updatedMovement.active ? parseFloat(updatedMovement.amount) - parseFloat(updatedMovement.realAmount) : -parseFloat(updatedMovement.amount) + parseFloat(updatedMovement.realAmount)}
     where id = ${updatedMovement.materialId}`;

    return movement.active;
  }

  async postInput(body: z.infer<typeof importSchema>) {
    const materials = [
      ...new Set(body.materials.map((item: any) => item.code)),
    ];
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

      await sql`insert into materialie (import, due, location) values (${body.import},${body.due}, 'At M&M, In transit')`;

      for (const material of body.materials) {
        const [movement] =
          await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate") values
         ((select id from materials where code = ${material.code}),(select id from materialie where import = ${body.import}), ${Math.abs(parseFloat(material.amount))},${Math.abs(parseFloat(material.amount))}, true, ${new Date()}) returning "materialId"`;

        await updateMaterialAmount(movement.materialId);
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
         ((select Id from materials where code = ${material.code}),(select id from materialie where jobpo = ${body.jobpo}),${-Math.abs(parseFloat(material.amount))},${-Math.abs(parseFloat(material.amount))}, ${material.active}, ${material.active ? new Date() : null}) returning "materialId"`;

        if (material.active)
          await updateMaterialAmount(movement.materialId, sql);
      }
    });

    return;
  }

  async postReposition(body: z.infer<typeof extraMovementSchema>) {
    try {
      await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate", extra) values
      ((select id from materials where code = ${body.code}),
      (select id from materialie where jobpo = ${body.job}),
      ${-Math.abs(parseFloat(body.amount))},
      ${-Math.abs(parseFloat(body.amount))},
      true,
      ${new Date()},
      true)`;
    } catch (err) {
      if (err.column_name === 'materialId')
        throw new HttpException(`El material ${body.code} no existe.`, 400);
      if (err.column_name === 'movementId')
        throw new HttpException(`El job ${body.job} no existe.`, 400);
    }

    return;
  }

  async postReturn(body: z.infer<typeof extraMovementSchema>) {
    try {
      await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate", extra) values
      ((select id from materials where code = ${body.code}),
      (select id from materialie where jobpo = ${body.job}),
      ${Math.abs(parseFloat(body.amount))},
      ${Math.abs(parseFloat(body.amount))},
      true,
      ${new Date()},
      true)`;
    } catch (err) {
      if (err.column_name === 'materialId')
        throw new HttpException(`El material ${body.code} no existe.`, 400);
      if (err.column_name === 'movementId')
        throw new HttpException(`El job ${body.job} no existe.`, 400);
    }

    return;
  }
}
