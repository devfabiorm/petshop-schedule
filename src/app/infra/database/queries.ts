import connection from './conection';

import { IAppointment } from '../../repositories/appointment';

const runQuery = (query: string, params?: any) => {
  return new Promise<IAppointment[]>((resolve, reject) => {
    connection.query(query, params, (errors, rows, fields) => {
      if(errors) {
        reject(errors);
      } else {
        resolve(rows);
      }
    });
  });
}

export default runQuery;