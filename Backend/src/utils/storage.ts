import { createWriteStream } from 'fs';
import path, { join } from 'path';

export const saveFile = (
  file: any,
  folder: 'hr' | 'inventory',
  fileName?: string,
) => {
  if (!fileName)
    fileName = `${folder}_${Date.now()}${path.extname(file.originalname)}`;
  const filePath = join(__dirname, '..', '..', 'public', fileName);

  return new Promise((resolve, reject) => {
    const stream = createWriteStream(filePath);

    stream.write(file.buffer);
    stream.end();

    stream.on('finish', () => resolve(fileName));
    stream.on('error', reject);
  });
};
