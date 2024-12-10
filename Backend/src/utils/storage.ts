import { join } from 'path';
import { promises as fs } from 'fs';
import { createWriteStream } from 'fs';
import path from 'path';

export const saveFile = async (
  file: any,
  folder: 'hr' | 'inventory',
  fileName?: string,
): null | Promise<string> => {
  if (fileName) {
    await deleteFile(fileName);
  }

  if (!file.buffer) return null;

  fileName = `${folder}_${Date.now()}${path.extname(file.originalname)}`;
  const filePath = join(__dirname, '..', '..', 'public', fileName);

  await new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(filePath);

    stream.write(file.buffer);
    stream.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  return fileName;
};

export const deleteFile = async (fileName: string): Promise<string | null> => {
  const filePath = join(__dirname, '..', '..', 'public', fileName);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    return fileName;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
};
