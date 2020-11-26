import fs from 'fs';
import path from 'path';

export default (filePath: string, fileName: string, createdImage: Function) => {
  
  const validTypes = ['jpg', 'png', 'jpeg'];
  const ext = path.extname(filePath);
  const pathForImage = path.join(__dirname, '..', '..', 'assets', 'images', `${fileName}${ext}`);
  const testType = !!(validTypes.indexOf(ext.substring(1)) + 1);
  
  if(!testType) {
    const error = {
      message: 'Erro: Tipo inválido'
    }
    createdImage(error, null);
  } else {
    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(pathForImage))
      .on('finish', () => createdImage(null, pathForImage));
  }
}