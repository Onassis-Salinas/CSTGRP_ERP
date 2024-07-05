export function getWeekDays(dateString: any) {
  if (dateString instanceof Date) {
    dateString = dateString.toISOString().split('T')[0];
  } else if (dateString.includes('T')) {
    dateString = dateString.split('T')[0];
  }

  const date = new Date(dateString);
  const dayOfWeek = date.getDay();

  const monday = new Date(date);
  monday.setDate(date.getDate() - dayOfWeek - 1);

  const friday = new Date(date);
  friday.setDate(date.getDate() - (dayOfWeek - 5));

  return [
    monday.toISOString().split('T')[0],
    friday.toISOString().split('T')[0],
  ];
}

export function getDayNumber(date: any) {
  const dateObject = new Date(date);
  return dateObject.getDay();
}

export function separateAreas(rows: any) {
  let tableExists;
  const tables: Array<any> = [];

  rows.forEach((row: any) => {
    tableExists = false;
    tables.forEach((table, i) => {
      if (row.Area === table.Name) {
        tableExists = true;
        return tables[i].Rows.push(row);
      }
    });
    if (tableExists) return;
    tables.push({ Name: row.Area, Rows: [] });
    tables[tables.length - 1].Rows.push(row);
  });

  return tables;
}

export function formatDate(strDate?: string) {
  if (!strDate) return '';
  const partes = strDate.split('T');
  const fecha = partes[0].split('-');
  const fechaFormateada = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
  return fechaFormateada;
}
