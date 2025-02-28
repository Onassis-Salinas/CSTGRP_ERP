import { Injectable } from '@nestjs/common';
import sql from 'src/utils/db';
import Jimp from 'jimp';
import path from 'path';
import { formatDate } from 'src/utils/functions';

@Injectable()
export class VariousService {
  async getAreas() {
    const rows = await sql`select id as value, name, color from areas`;
    return rows;
  }

  async getPositions() {
    const rows = await sql`select id as value, name, color from positions`;
    return rows;
  }

  async getIncidences() {
    const rows = await sql`select id as value, name from incidences`;
    return rows;
  }

  async generateImage(query) {
    const [employee] =
      await sql`select "bornDate", "noEmpleado", name from employees where "noEmpleado" = ${query.noEmpleado}`;

    const baseImage = await Jimp.read(
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'static',
        'templates',
        'birthday.png',
      ),
    );

    const overlayImage = await Jimp.read(
      `http://192.168.0.38/Servidor_Recursos_Humanos/RECURSOS%20HUMANOS%202024/CREDENCIALES/FOTOS%20PARA%20CREDENCIALES/Foto%20Sin%20fondo/${employee.noEmpleado}.png`,
    );

    overlayImage.cover(700, 850);

    baseImage.composite(overlayImage, (baseImage.bitmap.width - 700) / 2, 370);

    const font1 = await Jimp.loadFont(
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'static',
        'templates',
        'coustard80',
        'font.fnt',
      ),
    );

    const font2 = await Jimp.loadFont(
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'static',
        'templates',
        'coustard40',
        'font.fnt',
      ),
    );

    const text = employee.name.split(' ').slice(0, 3).join(' ');
    const textWidth = Jimp.measureText(font1, text);
    const textX = (baseImage.bitmap.width - textWidth) / 2;

    const text2 = employee.name.split(' ').slice(3).join(' ');
    const textWidth2 = Jimp.measureText(font1, text2);
    const textX2 = (baseImage.bitmap.width - textWidth2) / 2;

    const text1 =
      formatDate(employee.bornDate.toISOString()).slice(0, -4) +
      new Date().getFullYear();
    const textWidth1 = Jimp.measureText(font2, text1);
    const textX1 = (baseImage.bitmap.width - textWidth1) / 2;

    baseImage.print(font1, textX, 1260, text);
    baseImage.print(font1, textX2, 1340, text2);
    baseImage.print(font2, textX1, 1450, text1);

    const buffer = await baseImage.getBufferAsync(Jimp.MIME_JPEG);

    return buffer;
  }
}
