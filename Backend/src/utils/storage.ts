import { join } from 'path';
import { promises as fs } from 'fs';
import { createWriteStream } from 'fs';
import path from 'path';

type folderType = 'employees' | 'inventory';

export const getFile = async (
  folder: folderType,
  fileName?: string,
): null | Promise<any> => {
  const filePath = join(__dirname, '..', '..', 'public', folder, fileName);
  const file = await fs.readFile(filePath);
  return file;
};
export const saveFile = async (
  file: any,
  folder: folderType,
  fileName?: string,
): null | Promise<string> => {
  if (fileName) {
    await deleteFile(fileName);
  }

  if (!file.buffer) return null;

  fileName = `${Date.now()}${path.extname(file.originalname)}`;
  const filePath = join(__dirname, '..', '..', 'public', folder, fileName);

  await new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(filePath);

    stream.write(file.buffer);
    stream.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  return folder + '/' + fileName;
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
