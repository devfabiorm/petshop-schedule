import fs from 'fs';
import path from 'path';

fs.readFile(path.join(path.join(__dirname, '..', '..', 'assets', 'salsicha.jpg')), (err, buffer) => {
  console.log('A imagem foi bufferizada');

  fs.writeFile(path.join(__dirname, '..', '..', 'assets', 'salsicha2.jpg'), buffer, err => {
    console.log('A imagem foi escrita');
  })
})