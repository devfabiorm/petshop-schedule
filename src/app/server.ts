import customExprtess from '../config/customExpress';
import conection from './infra/conection';
import Tabelas from './infra/tables';

conection.connect(err => {
  if(err) console.log(err);
  else {
    Tabelas.init(conection);
    const app = customExprtess();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  }
});