import connection from '../infra/conection';

interface Appointment {
  id?: number;
  owner: string;
  pet?: string;
  service: string;
  status: string;
  notes: string;
}

class Schedule {
  create(appoitment: Appointment) {
    const sql = 'INSERT INTO Appointments set ?';

    connection.query(sql, appoitment, (err, rows) => {
      if(err) {
        console.log(err)
      } else {
        console.log(rows);
      }
    });
  }
}

export default new Schedule();