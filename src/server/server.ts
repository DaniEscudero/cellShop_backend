import routes from '@routes/routes';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', routes());

export default app;
