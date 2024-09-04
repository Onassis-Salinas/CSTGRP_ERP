import { parseNumber } from 'src/utils/parseData';

export function processImport(text: string) {
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

      // const excludedValues = ['THS', 'TTF', 'ALS'];
      // if (excludedValues.some((substring) => code.includes(substring))) return;

      if (code.substring(0, 3) !== 'CSI') return;

      if (code.includes('ZEN')) return;
      if (code.includes('EAL-')) return;
      if (code.includes('ZP-')) return;

      let amount: string;
      for (let j = i; j < i + 20; j++) {
        if (
          !isNaN(parseNumber(linesArray[j].split(' ')[0])) &&
          !/\d/.test(linesArray[j].split(' ')[1]) &&
          linesArray[j].split(' ')[1] &&
          linesArray[j].split(' ')[1] !== '•'
        ) {
          console.log(linesArray[j]);
          amount = linesArray[j].split(' ')[0].replaceAll(',', '');
          materials.push({ code, amount });
          break;
        }
      }
    }
  });

  if (materials.length === 0) throw new Error('');

  return { dueDate, importNum, materials };
}

export function processJob(text: string) {
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
      const excludedValues = ['PATTERN', 'SAMPLE', 'IS', 'FREIGHT', 'SCRN'];
      if (
        !excludedValues.some((substring) =>
          linesArray[i + 1].includes(substring),
        )
      ) {
        const material = { code: linesArray[i + 1], amount: '' };

        for (let j = 2; j < 9; j++) {
          if (
            !isNaN(parseNumber(linesArray[i + j])) &&
            !/\d/.test(linesArray[i + j + 1])
          ) {
            console.log(linesArray[i + j], linesArray[i + j + 1]);
            material.amount = linesArray[i + j].replace(/,/g, '');
            break;
          }
        }

        materials.push(material);
      }
    }
  });

  materials.forEach((material, i) => {
    materials[i].code =
      material.code[0] === 'P' ? 'CSI-' + material.code : material.code;
  });

  return { materials, jobpo, dueDate };
}
