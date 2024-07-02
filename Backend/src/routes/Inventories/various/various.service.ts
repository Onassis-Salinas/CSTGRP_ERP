import { File } from '@nest-lab/fastify-multer';
import { HttpException, Injectable } from '@nestjs/common';
// import * as pdfjsLib from 'pdfjs-dist';
import sql from 'src/utils/db';
import exceljs from 'exceljs';

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
      const pdfjsLib = await import('pdfjs-dist');

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

  async ConvertImportPdf(pdfFile: File) {
    try {
      const pdfjsLib = await import('pdfjs-dist');

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

//Functions ----------------------------------------------------------------------
function processJob(text: string) {
  let jobpo = '';
  let linesArray = text.split(/\s{3,}| {2}/);

  const index = linesArray.findIndex((line: any) =>
    line.includes('RAW MATERIAL COMPONENTS:'),
  );
  const endIndex = linesArray.findIndex((line: any) =>
    line.includes('OPERATIONS'),
  );
  jobpo =
    linesArray[linesArray.findIndex((line: any) => line.includes('Job:')) + 1];

  const dateStr =
    linesArray[
      linesArray.findIndex((line: any) => line.includes('Due Date:')) + 1
    ];

  const [month, day, year] = dateStr.split('/');
  let dueDate: any = new Date();
  dueDate.setFullYear(year);
  dueDate.setMonth(parseInt(month) - 1);
  dueDate.setDate(day);
  dueDate = dueDate.toISOString().split('T')[0];

  linesArray = linesArray.slice(index, endIndex);
  const materials: Array<any> = [];

  let materialNumber = 10;
  linesArray.forEach((element: any, i: number) => {
    // Materiales
    if (element === String(materialNumber)) {
      materialNumber += 10;
      const excludedValues = [
        'PATTERN',
        'IS2002WR',
        'ISMARMTRCV',
        'FREIGHTINMXTOTNPWC',
      ];
      const excludedValues2 = ['PATTERN', 'SAMPLE'];
      if (
        !excludedValues2.includes(linesArray[i + 1].split('-')[0]) &&
        !excludedValues.includes(linesArray[i + 1])
      ) {
        if (
          !isNaN(parseFloat(linesArray[i + 3])) &&
          linesArray[i + 3][0] != '0'
        ) {
          linesArray[i + 3] = linesArray[i + 3].replace(/,/g, '');
          materials.push({
            code: linesArray[i + 1],
            description: linesArray[i + 2],
            amount: linesArray[i + 3],
            measurement: linesArray[i + 4],
          });
        } else {
          linesArray[i + 4] = linesArray[i + 4].replace(/,/g, '');
          materials.push({
            code: linesArray[i + 1],
            description: linesArray[i + 2] + linesArray[i + 3],
            amount: linesArray[i + 4],
            measurement: linesArray[i + 5],
          });
        }
      }
    }
  });

  materials.forEach((material, i) => {
    materials[i].code =
      material.code[0] === 'P' ? 'CSI-' + material.code : material.code;
  });

  return { materials, jobpo, dueDate };
}

function processImport(text: string) {
  const linesArray: string[] = text.split(/\s{3,}| {2}/);

  const importNum =
    linesArray[
      linesArray.findIndex((line: string) => line.includes('Tracking :')) + 1
    ];
  const dateParts =
    linesArray[linesArray.findIndex((line: string) => line === ':') + 1].split(
      '/',
    );
  const dueDate = [dateParts[2], dateParts[0], dateParts[1]].join('-');

  const materials: Array<object> = [];
  linesArray.forEach((element: string, i: number) => {
    if (element.includes('•')) {
      const code = linesArray[i + 1].replaceAll(' ', '');

      let amount: string;
      for (let j = i; j < i + 20; j++) {
        if (!linesArray[j].includes('•') && !isNaN(parseFloat(linesArray[j]))) {
          amount = linesArray[j].split(' ')[0].replaceAll(',', '');
          materials.push({ code, amount });
          break;
        }
      }
    }
  });

  return { dueDate, importNum, materials };
}
