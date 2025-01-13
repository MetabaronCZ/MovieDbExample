import path from 'path';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import { initDb } from 'db';
import { movieRouter } from 'routes/movie';

export const port = 3001;
export const pathStatic = path.join(__dirname, 'public');

initDb()
  .then((db) => {
    const app = express();

    // middleware
    app.use(express.static(pathStatic));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    // routing
    app.use('/movie', movieRouter(db));

    // error 404 handler
    app.use((req, res) => {
      res.status(404).json({ error: 'Not found' });
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(console.error);
