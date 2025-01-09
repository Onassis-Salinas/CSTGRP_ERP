import { Injectable } from '@nestjs/common';

import sql from 'src/utils/db';
import dotenv from 'dotenv';
import ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import {
  processImport,
  processJob,
  processPDF,
} from 'src/routes/Inventories/various/various.utils';
import { File } from '@nest-lab/fastify-multer';
import { updateMaterialAmount } from 'src/utils/functions';

dotenv.config();

@Injectable()
export class FunctionsService {
  async adjustInventory() {
    // Ruta del archivo
    const filePath = path.resolve('/home/onassis/Inventario inicial.xlsx');

    // Leer el archivo desde el sistema
    const fileBuffer = fs.readFileSync(filePath);

    // Cargar el archivo en ExcelJS
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(fileBuffer);

    const rows: any[] = wb
      .getWorksheet(1)
      .getRows(2, 10000)
      .map((row) => {
        return {
          code: row.getCell(2).value,
          amount: row.getCell(4).value,
        };
      })
      .filter((item) => item.code);

    console.log(rows);

    let job: any;
    let importRows: any;
    // Ejecutar transacciones en SQL
    await sql.begin(async (sql) => {
      const [{ id: importId }] =
        await sql`insert into materialie (import, due) values (2, '2024-01-01') returning id`;

      for (const row of rows) {
        if (!(row.amount > 0)) continue;

        // try {
        console.log(row.code);
          await sql`INSERT INTO materialmovements ("materialId", "movementId", amount, "realAmount", active) values
          ((select id from materials where code = ${row.code}), ${importId}, ${row.amount}, ${row.amount}, true)`;
        // } catch (e) {
          // console.log(e);
          // console.log(row.code);
          // console.log('///////');
        // }
      }

      const [{ id: jobId }] =
        await sql`Insert into materialie (jobpo, programation, due) values (1, 1, '2024-01-01' ) returning id`;

      for (const row of rows) {
        if (!(row.amount < 0)) continue;

        // try {
          await sql`INSERT INTO materialmovements ("materialId", "movementId", amount, "realAmount", active) values
          ((select id from materials where code = ${row.code}), ${jobId}, ${row.amount}, ${row.amount}, true)`;
        // } catch (e) {
          // console.log(e);
          // console.log(row.code);
          // console.log('///////');
        // }
      }

      job =
        await sql`select (select code from materials where id = "materialId") as code, amount from materialmovements where "movementId" = ${jobId}`;
      importRows =
        await sql`select (select code from materials where id = "materialId") as code, amount from materialmovements where "movementId" = ${importId}`;
    });

    return [job, importRows];
  }

  async importInventory() {
    // Ruta del archivo
    const filePath = path.resolve(
      '/home/onassis/Downloads/CSI PROGRAMACIONES/CSTECH_CycleCount_May_2024 (inventario inicial del cliente).xlsx',
    );

    // Leer el archivo desde el sistema
    const fileBuffer = fs.readFileSync(filePath);

    // Cargar el archivo en ExcelJS
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(fileBuffer);

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

    // Ejecutar transacciones en SQL
    await sql.begin(async (sql) => {
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

  async update(){
    const materials = await sql`select id from materials`
    for (const material of materials){
      console.log(material.id)
      await updateMaterialAmount(material.id)
    }
  }

  async checkAll() {
    const movements = await sql`
      SELECT materialmovements.id, active
      FROM materialmovements
      JOIN materialie ON materialie.id = materialmovements."movementId"
      WHERE materialie.jobpo IS NOT NULL`;

    for (const body of movements) {
      await sql.begin(async (sql) => {
        const [movement] = await sql`
          UPDATE materialmovements
          SET active = true, "activeDate" = ${new Date()}
          WHERE id = ${body.id}
          RETURNING amount, "realAmount", "materialId"`;

        updateMaterialAmount(movement.materialId, sql);
      });
    }

    const newMovements = await sql`
      SELECT materialmovements.id, active
      FROM materialmovements
      JOIN materialie ON materialie.id = materialmovements."movementId"
      WHERE materialmovements.active <> true`;

    return newMovements;
  }

  async processAllJobs() {
    const directory =
      '/home/onassis/Downloads/CSI PROGRAMACIONES/Importaciones/exports/';
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const fileBuffer = fs.readFileSync(filePath);

      const pdfText = await processPDF({ buffer: fileBuffer } as File);

      const body = processJob(pdfText);

      ///
      const materials = body.materials.map((item: any) => item.code);

      const materialRows =
        await sql`SELECT code FROM materials WHERE code in ${sql(materials)}`;

      if (materialRows.length !== materials.length) {
        for (const material of body.materials) {
          const [materialExists] =
            await sql`select id from materials where code = ${material.code}`;
          if (!materialExists)
            await sql`insert into materials (code, description, measurement, amount, "minAmount", "clientId") values (${material.code}, '', 'PZ', 0, 0, 3)`;
        }
      }

      await sql.begin(async (sql) => {
        await sql`Select id from materials where code in (${materials})`;

        await sql`Insert into materialie (jobpo, programation, due) values (${body.jobpo}, ${1}, ${body.dueDate})`;

        for (const material of body.materials) {
          const [movement] =
            await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate") values
             ((select Id from materials where code = ${material.code}),(select id from materialie where jobpo = ${body.jobpo}),${-Math.abs(parseFloat(material.amount))},${-Math.abs(parseFloat(material.amount))}, false, ${material.active ? new Date() : null}) returning "materialId"`;

          if (material.active)
            await updateMaterialAmount(movement.materialId, sql);
        }
      });
    }
  }

  async processAllImports() {
    const directory =
      '/home/onassis/Downloads/CSI PROGRAMACIONES/Importaciones/rvimports/';
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const fileBuffer = fs.readFileSync(filePath);

      const pdfText = await processPDF({ buffer: fileBuffer } as File);

      let body: {
        dueDate: string;
        importNum: string;
        materials: any[];
      };
      try {
        body = processImport(pdfText);
      } catch (err) {
        console.log('error: ' + file);
        continue;
      }

      const materials = [
        ...new Set(body.materials.map((item: any) => item.code)),
      ];

      await sql.begin(async (sql) => {
        const materialRows =
          await sql`SELECT code FROM materials WHERE code in ${sql(materials)}`;
        if (materialRows.length !== materials.length) {
          for (const material of body.materials) {
            const [materialExists] =
              await sql`select id from materials where code = ${material.code}`;
            if (!materialExists)
              await sql`insert into materials (code, description, measurement, amount, "minAmount", "clientId") values (${material.code}, '', 'PZ', 0, 0, 3)`;
          }
        }

        await sql`insert into materialie (import, due, location) values (${body.importNum}, ${body.dueDate}, 'At CST, Qtys verified')`;

        for (const material of body.materials) {
          const [movement] =
            await sql`insert into materialmovements ("materialId", "movementId", amount, "realAmount", active, "activeDate") values
           ((select id from materials where code = ${material.code}),(select id from materialie where import = ${body.importNum}), ${Math.abs(parseFloat(material.amount))},${Math.abs(parseFloat(material.amount))}, true, ${new Date()}) returning "materialId"`;

          await updateMaterialAmount(movement.materialId, sql);
        }
      });
    }
  }

  async doAll() {
    await this.importInventory();
    await this.processAllJobs();
    await this.checkAll();
    await this.processAllImports();
  }
}
