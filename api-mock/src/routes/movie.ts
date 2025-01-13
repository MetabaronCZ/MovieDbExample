import express, { Router } from 'express';

import { Db } from 'db';
import { requestDelay } from 'utils';

export const movieRouter = (db: Db): Router => {
  const router = express.Router();

  // get movie list
  router.get('/', (req, res) => {
    requestDelay(() => {
      const movies = db.movies.get();
      res.json(movies);
    });
  });

  return router;
};
