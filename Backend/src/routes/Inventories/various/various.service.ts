import { File } from '@nest-lab/fastify-multer';
import { HttpException, Injectable } from '@nestjs/common';
import sql from 'src/utils/db';
import exceljs from 'exceljs';
import { processImport, processJob, processPDF } from './various.utils';

@Injectable()
export class VariousService {
  async getMeasurement(body) {
    const rows =
      await sql`select measurement from materials where code = ${body.code}`;
    if (!rows[0]) return;
    return rows[0].measurement;
  }

  async getClients() {
    const rows = await sql`select id as value, name, color from clients`;
    return rows;
  }

  async convertJobPdf(pdfFile: File) {
    try {
      const pdfText = await processPDF(pdfFile);

      return processJob(pdfText);
    } catch (err) {
      console.log(err);
      throw new HttpException('PDF invalido', 400);
    }
  }

  async convertImportPdf(pdfFile: File) {
    try {
      const pdfText = await processPDF(pdfFile);

      return processImport(pdfText);
    } catch (err) {
      console.log(err);
      throw new HttpException('PDF invalido', 400);
    }
  }

  async convertExcel(file: File) {
    if (!file.buffer) throw new HttpException('sin archivo', 400);
    try {
      const wb = new exceljs.Workbook();
      await wb.xlsx.load(file.buffer);

      const ws = wb.getWorksheet(1);

      const product = ws.getCell(4, 5);
      const jobpo = ws.getCell(6, 5).value;
      const amount = ws.getCell(7, 5).value;
      let dueDate = ws.getCell(5, 7).value;

      if (dueDate instanceof Date) {
        dueDate = dueDate.toISOString().split('T')[0];
      } else {
        throw new HttpException('Fecha incorrecta', 400);
      }

      const materials = ws
        .getRows(10, 100)
        .map((row) => {
          let amount = row.getCell(8).value;
          if (typeof amount === 'object') amount = (amount as any)?.result;
          if (typeof amount === 'number') amount = amount.toFixed(2);
          if (typeof amount === 'undefined' || isNaN(Number(amount)))
            amount = '0.00';

          return {
            code: row.getCell(4).value,
            amount,
            realAmount: amount,
          };
        })
        .filter((item) => item.code);
      console.log(dueDate);

      return { jobpo, dueDate, materials };
    } catch (err) {
      console.log(err);
      throw new HttpException('Excel invalido', 400);
    }
  }
}
