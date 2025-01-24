import postgres from 'postgres';
import sql from './db';

export async function createRecord(
  text: string,
  props: {
    action: 'create' | 'delete' | 'update';
    user?: string;
    module: 'inventory' | 'users';
  },
  dbInstance?: postgres.Sql,
) {
  if (!dbInstance) dbInstance = sql;

  if (props.user) {
    await dbInstance`insert into records (text, action, module, "user") values
    (${text}, ${props.action}, ${props.module}, (select username from users where id = ${props.user}))`;
  } else {
    await dbInstance`insert into records (text, action, module, "user") values
      (${text}, ${props.action}, ${props.module}, 'Anonimo')`;
  }
}
