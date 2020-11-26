import { Connection as IConnection } from 'mysql';
import conection from './conection';

class Connection {
  private _conexao: IConnection = {} as IConnection;

  init(connection: IConnection) {
    this._conexao = conection;

    this.createAppoitment();
    this.createPet();
  }

  createAppoitment() {
    const sql = `CREATE TABLE IF NOT EXISTS Appointments
      (id int NOT NULL AUTO_INCREMENT,
        owner varchar(11) NOT NULL,
        pet varchar(20),
        service varchar(20) NOT NULL,
        date datetime,
        createdat datetime,
        status varchar(20) NOT NULL,
        notes text, PRIMARY KEY(id)
      )`;

    this._conexao.query(sql, err => {
      if(err) {
        console.log(err);
      } else {
        console.log('Tabela de atendimentos criada com sucesso.');
      }
    });
  }

  createPet() {
    const query = ` CREATE TABLE IF NOT EXISTS Pets
      (id int NOT NULL AUTO_INCREMENT,
        name varchar(50),
        photo varchar(200),
        PRIMARY KEY (id)
      )`;

    this._conexao.query(query, err => {
      if(err) console.log(err);
      else console.log('Tabela Pet foi criada com sucesso.');
    });
  }
}

export default new Connection;