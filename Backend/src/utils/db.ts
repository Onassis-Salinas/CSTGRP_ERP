import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: object = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '4321',
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
};

const sql = postgres(dbConfig);

export default sql;
