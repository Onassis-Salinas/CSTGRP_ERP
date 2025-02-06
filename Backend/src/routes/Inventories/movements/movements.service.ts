import { HttpException, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import sql from 'src/utils/db';
import {
  exportSchema,
  idSchema,
  IEFilterSchema,
  importSchema,
  movementsFilterSchema,
  repositionSchema,
  returnSchema,
  updateAmountSchema,
  updateExportSchema,
  updateImportSchema,
} from './movements.schema';
import { updateMaterialAmount } from 'src/utils/functions';
import exceljs from 'exceljs';
import { ContextProvider } from 'src/interceptors/context.provider';

@Injectable()
export class MovementsService {
  constructor(private readonly req: ContextProvider) {}

  async getMovements(body: z.infer<typeof movementsFilterSchema>) {
    const movements = await sql`SELECT
      materials.code, materials.description, materials.measurement, materials."clientId", materials."leftoverAmount", materials.amount as inventory, materialmovements.active, materialmovements.amount, materialmovements."realAmount", materialmovements.id, materialie.due, materialie.jobpo, materialie.programation, materialie.import, materialmovements.extra
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
      LIMIT 150`;
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
        materialmovements."activeDate",
        materialie.programation,
        materialie.jobpo,
        materialie.import,
        materialmovements.amount,
        materialmovements.extra,
        materialmovements."realAmount",
        materialmovements.active,
        SUM(materialmovements."realAmount") OVER (ORDER BY materialmovements."activeDate" ASC, materialmovements.id ASC) AS balance
        FROM
            materialmovements
        JOIN
            materials ON materials.id = materialmovements."materialId"
        JOIN
            materialie ON materialie.id = materialmovements."movementId"
        WHERE
            materials.id = ${body.id} 
            AND  materialmovements.active is true
            AND (materialie.location IS NULL OR materialie.location = 'At CST, Qtys verified' or materialie.import = 'Retorno')
        ORDER BY
            materialmovements."activeDate" DESC,
            materialmovements.id DESC
        LIMIT 200`;
    return movements;
  }

  async getMaterialComparison(body: z.infer<typeof idSchema>) {
    const movements = await sql`SELECT
    materialmovements."activeDate" as due,
    materialie.programation,
    materialie.jobpo,
    materialmovements.amount,
    (
        SELECT SUM(amount) 
        FROM materialmovements AS m
        WHERE m."materialId" = materialmovements."materialId" AND m."movementId" = materialmovements."movementId"
    ) AS "realAmount"
        FROM
        materialmovements
    JOIN
        materials ON materials.id = materialmovements."materialId"
    JOIN
        materialie ON materialie.id = materialmovements."movementId"
    WHERE
        materials.id = ${body.id} 
        AND materialmovements.active IS true
        AND materialie.jobpo IS NOT NULL
        AND materialmovements.extra = false
    ORDER BY
        materialmovements."activeDate" DESC,
        materialmovements.id DESC
    LIMIT 300;`;

    return movements;
  }

  async getJobComparison(body: z.infer<typeof idSchema>) {
    const movements = await sql`SELECT
    materials.code,
    materials.measurement,
    materialmovements.amount,
    (
        SELECT SUM(amount) 
        FROM materialmovements AS m
        WHERE m."materialId" = materialmovements."materialId" AND m."movementId" = materialmovements."movementId"
    ) AS "realAmount"
        FROM
        materialmovements
    JOIN
        materials ON materials.id = materialmovements."materialId"
    JOIN
        materialie ON materialie.id = materialmovements."movementId"
    WHERE
        materialmovements."movementId" = ${body.id} AND materialmovements.active IS true
        AND materialmovements.extra = false
    ORDER BY
        materialmovements.id DESC;`;

    return movements;
  }

  async updateRealAmount(body: z.infer<typeof updateAmountSchema>) {
    const [movement] =
      await sql`select "materialId", active, id, amount from materialmovements where id = ${body.id}`;

    if (movement.active)
      throw new HttpException('Este movimiento ya se surtio', 400);

    await sql`update materialmovements set "realAmount" = ${movement.amount >= 0 ? Math.abs(parseFloat(body.newAmount)) : -Math.abs(parseFloat(body.newAmount))} where id = ${body.id}`;
    return;
  }

  async updateImport(body: z.infer<typeof updateImportSchema>) {
    await sql.begin(async (sql) => {
      const previousObj = (
        await sql`select import, location from materialie where id = ${body.id}`
      )[0];

      const newObj = (
        await sql`update materialie set ${sql(body)} where id = ${body.id} returning import, location`
      )[0];
      await this.req.record(
        `Actualizo la importacion: ${previousObj?.import} con status: ${previousObj?.location} a ${newObj?.import}, ${newObj?.location}`,
        sql,
      );

      const movements =
        await sql`select "materialId" from materialmovements where "movementId" = ${body.id}`;

      movements.forEach(
        async (movement) =>
          await updateMaterialAmount(movement.materialId, sql),
      );
    });

    return;
  }

  async updateExport(body: z.infer<typeof updateExportSchema>) {
    await sql.begin(async (sql) => {
      const previousObj = (
        await sql`select jobpo, programation from materialie where id = ${body.id}`
      )[0];

      const newObj = (
        await sql`update materialie set ${sql(body)} where id = ${body.id} returning jobpo, programation`
      )[0];

      await this.req.record(
        `Actualizo la exportacion: ${previousObj?.jobpo}, programacion: ${previousObj?.programation} a ${newObj?.jobpo}, ${newObj?.programation}`,
        sql,
      );
    });

    return;
  }

  async activateMovement(body: z.infer<typeof idSchema>) {
    const [movement] =
      await sql`select active, (select code from materials where id = "materialId"), (select jobpo from materialie where id = "movementId") from materialmovements where id = ${body.id}`;

    await sql.begin(async (sql) => {
      const [result] =
        await sql`UPDATE materialmovements SET active = NOT active, "activeDate" = ${movement.active ? null : new Date()} WHERE id = ${body.id} returning "materialId"`;

      await updateMaterialAmount(result.materialId, sql);

      await this.req.record(
        movement.active
          ? `Desactivo el movimiento del job ${movement.jobpo} y material ${movement.code}`
          : `Activo el movimiento del job ${movement.jobpo} y material ${movement.code}`,
        sql,
      );
    });

    return movement.active;
  }

  async postInput(body: z.infer<typeof importSchema>) {
    const materials = [
      ...new Set(body.materials.map((item: any) => item.code)),
    ];
    await sql.begin(async (sql) => {
      const materialRows =
        await sql`SELECT code FROM materials WHERE code in ${sql(materials)}`;

      if (materialRows.length !== materials.length)
        throw new HttpException(
          'Uno o varios de los materiales incorrectos',
          400,
        );

      await sql`insert into materialie (import, due, location) values (${body.import},${body.due}, 'At M&M, In transit')`;

      await this.req.record(`Registro la importación: ${body.import}`, sql);

      for (const material of body.materials) {
        const [movement] =
          await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate") values
         ((select id from materials where code = ${material.code}),(select id from materialie where import = ${body.import}), ${Math.abs(parseFloat(material.amount))},${Math.abs(parseFloat(material.amount))}, true, ${body.due}) returning "materialId"`;

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

      await this.req.record(`Registro el job: ${body.jobpo}`, sql);

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

  async postReposition(body: z.infer<typeof repositionSchema>) {
    try {
      const [material] =
        await sql`select id, "leftoverAmount" from materials where code = ${body.code}`;

      let materialFromInventory =
        -Math.abs(parseFloat(body.amount)) +
        parseFloat(material.leftoverAmount);
      if (materialFromInventory > 0) materialFromInventory = 0;

      await sql.begin(async (sql) => {
        await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate", extra) values
          ((select id from materials where code = ${body.code}),
          (select id from materialie where jobpo = ${body.job}),
          ${-Math.abs(parseFloat(body.amount))},
          ${materialFromInventory},
          true,
          ${new Date()},
          true) returning *`;

        await this.req.record(
          `Hizo una salida de ${body.amount} ${body.code} para el job ${body.job}`,
          sql,
        );

        await updateMaterialAmount(material.id, sql);
      });
    } catch (err) {
      if (err.column_name === 'materialId')
        throw new HttpException(`El material ${body.code} no existe.`, 400);
      if (err.column_name === 'movementId')
        throw new HttpException(`El job ${body.job} no existe.`, 400);
    }

    return;
  }

  async postReturn(body: z.infer<typeof returnSchema>) {
    try {
      const [material] =
        await sql`select id, "leftoverAmount" from materials where code = ${body.code}`;

      if (body.job) {
        await sql.begin(async (sql) => {
          await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate", extra) values
            ((select id from materials where code = ${body.code}),
            (select id from materialie where jobpo = ${body.job}),
            ${Math.abs(parseFloat(body.amount))},
            ${Math.abs(parseFloat(body.amount))},
            true,
            ${new Date()},
            true)`;

          await updateMaterialAmount(material.id, sql);

          await this.req.record(
            `Hizo un retorno de ${body.amount} ${body.code} para el job ${body.job}`,
            sql,
          );
        });
      } else {
        if (material.leftoverAmount < parseFloat(body.amount))
          throw new HttpException(
            `El material ${body.code} no tiene suficiente material sobrante`,
            400,
          );

        await sql.begin(async (sql) => {
          await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate", extra) values
          ((select id from materials where code = ${body.code}),
          (select id from materialie where import = 'Retorno'),
          ${Math.abs(parseFloat(body.amount))},
          ${Math.abs(parseFloat(body.amount))},
          true,
          ${new Date()},
          true)`;

          await updateMaterialAmount(material.id, sql);

          await this.req.record(
            `Hizo un retorno de ${body.amount} al material ${body.code}`,
            sql,
          );
        });
      }
    } catch (err) {
      console.log(err);
      if (err.column_name === 'materialId')
        throw new HttpException(`El material ${body.code} no existe.`, 400);
      if (err.column_name === 'movementId')
        throw new HttpException(`El job ${body.job} no existe.`, 400);
      throw err;
    }

    return;
  }

  async deleteIE(body: z.infer<typeof idSchema>, token: string) {
    const user: any = await jwt.verify(token, process.env.JWT_SECRET);
    if (user.username !== 'juan' && user.username !== 'admin')
      throw new HttpException(
        'No tienes permisos para eliminar movimientos',
        403,
      );

    const movements =
      await sql`select "materialId" from materialmovements where "movementId" = ${body.id}`;

    await sql.begin(async (sql) => {
      const deleted = (
        await sql`delete from materialie where id = ${body.id} returning jobpo, import`
      )[0];

      for (const movement of movements) {
        await updateMaterialAmount(movement.materialId, sql);
      }

      await this.req.record(
        `Elimino ${deleted?.jobpo ? 'el job' : 'la importacion'} ${deleted?.jobpo || deleted?.import}`,
        sql,
      );
    });

    return;
  }

  async exportPending() {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Inventario');

    const results = await sql`SELECT
      materials.code, materials.description, materials.measurement, materials."clientId", materials."leftoverAmount", materials.amount as inventory, materialmovements.amount, materialmovements."realAmount", materialmovements.id, materialie.due, materialie.jobpo, materialie.programation
      FROM materialmovements
      JOIN materials on materials.id = materialmovements."materialId"
      JOIN materialie on materialie.id = materialmovements."movementId"
      WHERE materialmovements.active = false
      ORDER BY materialie.due DESC, materialie.jobpo DESC, materials.code DESC, materialmovements.amount DESC, materialmovements.id DESC`;

    worksheet.columns = [
      { header: 'Programacion', key: 'programation', width: 16 },
      { header: 'Job', key: 'jobpo', width: 12 },
      { header: 'Material', key: 'code', width: 22 },
      { header: 'Descripcion', key: 'description', width: 22 },
      { header: 'Cantidad', key: 'amount', width: 15 },
      { header: 'Cantidad Real', key: 'realAmount', width: 15 },
      { header: 'Inventario', key: 'inventory', width: 20 },
      { header: 'Sobrante en area', key: 'leftoverAmount', width: 20 },
      { header: 'Medida', key: 'measurement', width: 14 },
    ];

    worksheet.addRows(results);

    worksheet.getRow(1).eachCell((cell) => {
      cell.style = { font: { bold: true } };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
