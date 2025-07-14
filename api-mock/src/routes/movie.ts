import express from 'express';
import { MovieData } from '@project/api-types';

import { parseMovieFilter } from 'utils/movie';
import { handleError, requestDelay } from 'utils/common';

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
      handleError(res, error, 'Error getting movie list!');
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
      handleError(res, error, 'Error getting movie data!');
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
      handleError(res, error, 'Error updating movie data!');
    }
  });
});
