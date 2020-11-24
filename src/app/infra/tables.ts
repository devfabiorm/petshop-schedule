import { Connection as IConnection } from 'mysql';
import conection from './conection';

class Connection {
  private _conexao: IConnection = {} as IConnection;

  init(connection: IConnection) {
    this._conexao = conection;

    this.createAppoitment();
  }

  createAppoitment() {
    const sql = 'CREATE TABLE IF NOT EXISTS Appointments (id int NOT NULL AUTO_INCREMENT, owner varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, status varchar(20) NOT NULL, notes text, PRIMARY KEY(id))';

    this._conexao.query(sql, err => {
      if(err) {
        console.log(err);
      } else {
        console.log('Tabela de atendimentos criada com sucesso.');
      }
    });
  }
}

export default new Connection;