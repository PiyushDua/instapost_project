import fs from 'fs';
import { sync } from 'glob';

function getGlob(pattern: string): string[] {
  return sync(pattern);
}

function readFile(fileName: string): string {
  return fs.readFileSync(fileName, 'utf8');
}

function makeSchema(fileNames: string[]): string[] {
  return fileNames.map(readFile);
}

export default function(pattern: string): string[] {
  try {
    const files = getGlob(pattern);
    const schemaFile = makeSchema(files);
    return schemaFile;
  } catch (err) {
    return err;
  }
}
