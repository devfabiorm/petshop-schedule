import express from 'express';
import faker from 'faker';

const app = express();

app.use(express.json());

app.get('/:cpf', (req, res) => {
    const { cpf } = req.params

    res.status(200).json({
        cpf,
        name: faker.name.findName(),
        birthday: faker.date.past()
    });
});

app.listen(8082, () => console.log('Api rodando'));
