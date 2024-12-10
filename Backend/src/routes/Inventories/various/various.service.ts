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
    const rows = await sql`select id as value, name from clients`;
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

      const rows: any[] = wb
        .getWorksheet(1)
        .getRows(2, 100)
        .map((row) => {
          return {
            code: row.getCell(1).value,
            amount: row.getCell(2).value?.toString(),
          };
        })
        .filter((item) => item.code);

      return { materials: rows };
    } catch (err) {
      console.log(err);
      throw new HttpException('Excel invalido', 400);
    }
  }
}
