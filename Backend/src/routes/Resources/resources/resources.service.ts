import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import PromiseFTP from 'promise-ftp';
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
}
