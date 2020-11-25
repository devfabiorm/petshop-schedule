import fs from 'fs';
import path from 'path';

fs.createReadStream(path.join(__dirname, '..', '..', 'assets', 'salsicha.jpg'))
  .pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'assets', 'salsicha-stream.jpg')))
  .on('finish', () => console.log('Terminado'));