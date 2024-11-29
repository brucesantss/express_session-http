import express, { Request, Response } from 'express';
import { sessionConfig } from './session';
import userRouter from './routes/userRoutes';

const app = express();
const port = 8080;

app.use(express.json());
app.use(sessionConfig);

app.use(userRouter);

app.listen(port, () => {
  console.log(`servidor: online`);
});