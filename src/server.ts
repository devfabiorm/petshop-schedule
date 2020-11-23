import express from 'express';

const app = express();

app.get('/atendimento', (request, response) => response.send('VOcê está na rota de atendimento e usando o método GET.'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));