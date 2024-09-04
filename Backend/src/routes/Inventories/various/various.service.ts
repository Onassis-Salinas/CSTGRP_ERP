import { File } from '@nest-lab/fastify-multer';
import { HttpException, Injectable } from '@nestjs/common';
import * as pdfjsLib from 'pdfjs-dist';
import sql from 'src/utils/db';
import exceljs from 'exceljs';
import { processImport, processJob } from './various.utils';

@Injectable()
export class VariousService {
  async getMeasurement(query) {
    const rows =
      await sql`select measurement from materials where code = ${query.code}`;
    if (!rows[0]) return;
    return rows[0].measurement;
  }

  async getClients() {
    const rows = await sql`select id as value, name from clients`;
    return rows;
  }

  async convertJobPdf(pdfFile: File) {
    try {
      const pdfData = new Uint8Array(pdfFile.buffer);

      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      const pdfDocument = await loadingTask.promise;
      const numPages = pdfDocument.numPages;

      const pageTexts = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        pageTexts.push(pageText);
      }

      const pdfText = pageTexts.join('\n');
      return processJob(pdfText);
    } catch (err) {
      console.log(err);
      throw new HttpException('PDF invalido', 400);
    }
  }

  async convertImportPdf(pdfFile: File) {
    try {
      const pdfData = new Uint8Array(pdfFile.buffer);

      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      const pdfDocument = await loadingTask.promise;
      const numPages = pdfDocument.numPages;

      const pageTexts = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        pageTexts.push(pageText);
      }
      const pdfText = pageTexts.join('\n');
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
