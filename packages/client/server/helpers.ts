import fs from 'fs/promises';
import { logError } from '@waika_project/utils';

export async function saveToFile(path: string, content: string) {
  try {
    await fs.writeFile(path, content);
  } catch (error) {
    logError(error);
  }
}
