import path from 'path';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import { createDb } from 'db';
import { movieRouter } from 'routes/movie';
import { peopleRouter } from 'routes/person';

export const port = 3001;
export const pathStatic = path.join(__dirname, 'public');

const init = async (): Promise<void> => {
  const app = express();

  console.log('Database: Creating...');
  const db = await createDb();
  console.log('Database: Created!');

  // middleware
  app.use(express.static(pathStatic));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  // database
  app.use((req, res, next) => {
    res.locals.db = db;
    next();
  });

  // routing
  app.use('/movie', movieRouter);
  app.use('/person', peopleRouter);

  // error 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.listen(port, () => {
    console.log(`\nAPI mock server running on http://localhost:${port}`);
  });
};

init().catch(console.error);
