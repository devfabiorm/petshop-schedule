import { Response } from 'express';

import conection from '../infra/conection';
import fileUpload from '../files/uploadFiles';

interface IPet {
  id?: number;
  name: string;
  photo: string;
}

class Pet{
  create(pet: IPet, response: Response) {
    const query = 'INSERT INTO Pets SET ?';

    fileUpload(pet.photo, pet.name, (error: any, pathForImage: string) => {
      if(error) {
        response.status(400).json(error);
      } else {
        const petDatabase = {
          name: pet.name,
          photo: pathForImage
        };
  
        conection.query(query, petDatabase, (err, rows) => {
          if(err) {
            console.log(err);
            response.status(400).json(err);
          } else {
            response.status(200).json(petDatabase);
          }
        });
      }
    });  
  }
}

export default new Pet();