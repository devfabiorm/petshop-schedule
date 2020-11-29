import connection from './conection';

const runQuery = (query: string, params?: any) => {
  return new Promise((resolve, reject) => {
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