import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from '../routes';
import { dbConnect } from '../db/db';

const app = express();
dbConnect();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

routes(app);

// app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get('/*', (_req, res) => {
  res.status(200).send('Welcome to Jamii');
});

export default app;
