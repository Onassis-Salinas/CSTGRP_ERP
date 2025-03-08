import { Sql } from 'postgres';
import { getTraducction } from 'src/utils/traduction';

interface Props {
  previous: Record<string, any>;
  current: Record<string, any>;
}

export async function createRecord({ previous, current }: Props, sql: Sql) {
  const differences: Record<string, any> = {};

  Object.keys(current).forEach((key) => {
    if (current[key] instanceof Date)
      current[key] = new Date(current[key]).toISOString();
    if (previous?.[key] instanceof Date)
      previous[key] = new Date(previous?.[key]).toISOString();

    if (
      current[key] !== previous?.[key] &&
      (current[key] || previous?.[key]) &&
      key !== 'photo' &&
      key !== 'active'
    ) {
      differences[key] = current[key];
    }
  });

  if (differences.areaId) {
    const [{ name: area }] =
      await sql`select name from areas where id = ${differences.areaId}`;
    differences.areaId = area;
  }

  if (differences.positionId) {
    const [{ name: position }] =
      await sql`select name from positions where id = ${differences.positionId}`;
    differences.positionId = position;
  }

  for (const key in differences) {
    const text = `${getTraducction(key)}: ${differences[key]}`;
    await sql`insert into employeeRecords ("employeeId", date, type, text) values (${current.id}, now(), 'cambio', ${text})`;
  }

  return;
}
