import express, { type Express } from 'express';

const PORT = 3000;

const app: Express = express();

app.use(express.static('./dist'));

app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: './dist' });
});

app.listen(PORT, () => {
  console.log(`[server]: Сервер запущен на http://localhost:${PORT}`);
});
