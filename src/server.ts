import express, { Request, Response } from 'express';
import { sessionConfig } from './session';

const app = express();
const port = 8080;

app.use(express.json());
app.use(sessionConfig);

app.post('/login', (req: Request, res: Response) => {

  const { username } = req.body;

  if (!username) {
    res.status(400).json({ message: "Username é obrigatório" });
  }

  req.session.user = { username };

  console.log(req.sessionID);
  res.status(200).json({ message: 'deu certo.' });
})


app.post('/dashboard', (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ message: "Faça login para continuar." });
  }

  console.log('acessou o dashboard, ', req.session);
  res.status(200).json({ message: 'Dashboard de compras.' });
});


app.listen(port, () => {
  console.log(`servidor: online`);
});