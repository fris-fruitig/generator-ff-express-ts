require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errors, celebrate, Joi } from 'celebrate';
import helmet from 'helmet';
import { errorHandler } from './middlewares';
import { errorCatcher } from './utils';

// Init Express
const app = express();

// Configure Express + Middleware
app.set('port', process.env.PORT || 3000);
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
);
app.use(helmet()); // See https://expressjs.com/en/advanced/best-practice-security.html
app.use(bodyParser.json());

app.get(
  '/',
  errorCatcher(async (req: Request, res: Response) => {
    res.status(200).send('Hello world!');
  })
);

app.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  errorCatcher(async (req: Request, res: Response) => {
    res.status(200).send('Hello world!');
  })
);

// https://github.com/arb/celebrate#errors
app.use(errors());
// Handle all remaining errors
app.use(errorHandler);

export default app;
