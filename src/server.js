/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import userRoute from './routes/user';

import apiRoute from './routes/api';

import viewsRoute from './routes/views';

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api/v1/auth', userRoute);

app.use('/api/v1', apiRoute);

app.use('/', viewsRoute);

// Not Found Handler
app.use((req, res) => { res.status(404).send('Not Found!'); });

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

export default app;