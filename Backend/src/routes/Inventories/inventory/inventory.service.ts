import { Injectable } from '@nestjs/common';
import sql from 'src/utils/db';
import exceljs from 'exceljs';

@Injectable()
export class InventoryService {
  async getInventory() {
    const inventory = await sql`Select * from materials order by "code" asc`;

    return inventory;
  }

  async export() {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Inventario');

    const rows = await sql`select
      id, code, description, amount, measurement,
      (select name from clients where id = "clientId") as client
      from materials`;

    const results = await Promise.all(
      rows.map(async (row) => {
        const movements = await sql`SELECT jobpo FROM materialmovements
          JOIN materialie ON materialie.id = materialmovements."movementId"
          WHERE materialmovements.active = true
          AND materialie.jobpo IS NOT NULL
          AND materialmovements."materialId" = ${row.id}
          ORDER BY materialmovements."activeDate" DESC, materialie.id DESC
          LIMIT 25`;

        for (let i = 0; i < 25; i++) {
          row['job' + i] = movements[i]?.jobpo;
        }

        return row;
      }),
    );

    worksheet.columns = [
      { header: 'Material', key: 'code', width: 25 },
      { header: 'Descripcion', key: 'description', width: 120 },
      { header: 'Cantidad', key: 'amount', width: 15 },
      { header: 'Medida', key: 'measurement', width: 14 },
      { header: 'Cliente', key: 'client', width: 15 },
      { header: 'Job 1', key: 'job0', width: 12 },
      { header: 'Job 2', key: 'job1', width: 12 },
      { header: 'Job 3', key: 'job2', width: 12 },
      { header: 'Job 4', key: 'job3', width: 12 },
      { header: 'Job 5', key: 'job4', width: 12 },
      { header: 'Job 6', key: 'job5', width: 12 },
      { header: 'Job 7', key: 'job6', width: 12 },
      { header: 'Job 8', key: 'job7', width: 12 },
      { header: 'Job 9', key: 'job8', width: 12 },
      { header: 'Job 10', key: 'job9', width: 12 },
      { header: 'Job 11', key: 'job10', width: 12 },
      { header: 'Job 12', key: 'job11', width: 12 },
      { header: 'Job 13', key: 'job12', width: 12 },
      { header: 'Job 14', key: 'job13', width: 12 },
      { header: 'Job 15', key: 'job14', width: 12 },
      { header: 'Job 16', key: 'job15', width: 12 },
      { header: 'Job 17', key: 'job16', width: 12 },
      { header: 'Job 18', key: 'job17', width: 12 },
      { header: 'Job 19', key: 'job18', width: 12 },
      { header: 'Job 20', key: 'job19', width: 12 },
      { header: 'Job 21', key: 'job20', width: 12 },
      { header: 'Job 22', key: 'job21', width: 12 },
      { header: 'Job 23', key: 'job22', width: 12 },
      { header: 'Job 24', key: 'job23', width: 12 },
      { header: 'Job 25', key: 'job24', width: 12 },
    ];

    worksheet.addRows(results);

    worksheet.getRow(1).eachCell((cell) => {
      cell.style = { font: { bold: true } };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
