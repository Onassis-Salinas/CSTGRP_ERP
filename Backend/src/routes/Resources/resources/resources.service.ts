import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import PromiseFTP from 'promise-ftp';
import sql from 'src/utils/db';
dotenv.config();

const ftpConfig = {
  host: '192.168.0.38',
  user: 'Ingenieria',
  password: 'ServIng1929!',
};

@Injectable()
export class ResourcesService {
  async getFolders() {
    const ftp = new PromiseFTP();

    await ftp.connect(ftpConfig);
    const list = await ftp.list(
      '/Servidor_Ingenieria/INGENIERIA Y CALIDAD/SGC ISO 9001-2015/4. FORMATOS (F)/',
    );
    await ftp.end();
    return list;
  }

  async getFormats(params) {
    const ftp = new PromiseFTP();

    await ftp.connect(ftpConfig);
    const list = await ftp.list(
      `/Servidor_Ingenieria/INGENIERIA Y CALIDAD/SGC ISO 9001-2015/4. FORMATOS (F)/${params.folder}`,
    );
    await ftp.end();
    return list;
  }

  async getDirectory() {
    return (await sql`select directory.id, employees.name, positions.name as position, emails.email, extension
      from directory
      join employees on employees.id = directory."employeeId"
      join emails on emails.id = directory."emailId"
      join positions on positions.id = employees."positionId"`);
  }
}
