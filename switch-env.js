import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const envJs = path.join(__dirname, 'config/env.js');
  const switchEnvJS = path.join(__dirname, 'switch-env.js');
  const data = fs.readFileSync(envJs, {
    encoding: 'utf8',
  });
  const editData = data
    .split(';')
    .map((item) => {
      return item.replace('[NODE_ENV]', `['${process.env.NODE_ENV}']`);
    })
    .join(';');
  fs.writeFileSync(envJs, editData, { encoding: 'utf8' });
  fs.unlinkSync(switchEnvJS);
})();