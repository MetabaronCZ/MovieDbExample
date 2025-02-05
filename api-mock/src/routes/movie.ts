import express from 'express';
import { MovieData } from '@project/api-types';

import { requestDelay } from 'utils/common';
import { parseMovieFilter } from 'utils/movie';

export const movieRouter = express.Router();

// get movie list
movieRouter.get('/', (req, res) => {
  requestDelay(() => {
    const { db } = res.locals;

    try {
      const filter = parseMovieFilter(req.query);
      const response = db.movie.getList(filter);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

// get movie data
movieRouter.get('/:id', (req, res) => {
  requestDelay(() => {
    const { id } = req.params;
    const { db } = res.locals;

    try {
      const movie = db.movie.getDetail(id);

      if (!movie) {
        res.status(404).json({ error: 'Movie not found!' });
      } else {
        res.json(movie);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

// update movie data
movieRouter.patch('/:id', (req, res) => {
  requestDelay(() => {
    const { id } = req.params;
    const { db } = res.locals;
    const data = req.body ?? {};

    try {
      const movie = db.movie.edit(id, data as MovieData);

      if (!movie) {
        res.status(404).json({ error: 'Movie not found!' });
      } else {
        res.json({ data: 'Movie data updated!' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});
