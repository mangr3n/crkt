import { Component } from '../../../src/Component';
import * as fs from 'fs';

export const FileReader = () => Component('FileReader', (filePath, next) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  next(content);
});
