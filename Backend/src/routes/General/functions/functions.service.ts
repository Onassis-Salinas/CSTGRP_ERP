import { Injectable } from '@nestjs/common';

import sql from 'src/utils/db';
import dotenv from 'dotenv';
import { File } from '@nest-lab/fastify-multer';
import ExcelJS from 'exceljs';

dotenv.config();

@Injectable()
export class FunctionsService {
  async importInventory(file: File) {
    if (!file.buffer) return 'sin archivo';
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(file.buffer);

    const rows: any[] = wb
      .getWorksheet(1)
      .getRows(2, 10000)
      .map((row) => {
        return {
          code: row.getCell(1).value,
          description: row.getCell(2).value,
          amount: row.getCell(3).value,
          measurement: row.getCell(4).value,
          clientId: 3,
        };
      })
      .filter((item) => item.code)
      .map((e) => ({ ...e, code: 'CSI-' + e.code }));

    await sql.begin(async () => {
      await sql`delete from materialmovements`;
      await sql`delete from materials`;
      await sql`delete from materialie`;

      const [{ id }] =
        await sql`insert into materialie (import, due) values (1, '2024-01-01') returning id`;

      await sql`insert into materials ${sql(rows)}`;
      await sql`INSERT INTO materialmovements ("materialId", "movementId", amount, "realAmount", active)
        SELECT id, ${id}, amount, amount, true
        FROM materials;`;
    });

    return rows;
  }

  async checkAll() {
    const movements = await sql`
      SELECT materialmovements.id, active
      FROM materialmovements
      JOIN materialie ON materialie.id = materialmovements."movementId"
      WHERE materialie.jobpo IS NOT NULL`;

    console.log(movements);

    for (const body of movements) {
      const [movement] = await sql`
        SELECT active
        FROM materialmovements
        WHERE id = ${body.id}`;

      if (movement.active) continue;

      await sql.begin(async (sql) => {
        const [movement] = await sql`
          UPDATE materialmovements
          SET active = true, "activeDate" = ${new Date()}
          WHERE id = ${body.id}
          RETURNING amount, "realAmount", "materialId"`;

        await sql`
          UPDATE materials
          SET amount = amount + ${parseFloat(movement.realAmount)}
          WHERE id = ${movement.materialId}`;
      });
    }

    const newMovements = await sql`
      SELECT materialmovements.id, active
      FROM materialmovements
      JOIN materialie ON materialie.id = materialmovements."movementId"
      WHERE materialmovements.active <> true`;

    return newMovements;
  }
}
