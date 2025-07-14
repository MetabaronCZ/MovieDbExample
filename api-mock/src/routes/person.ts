import express from 'express';

import { parsePersonFilter } from 'utils/person';
import { handleError, requestDelay } from 'utils/common';

export const peopleRouter = express.Router();

// get people list
peopleRouter.get('/', (req, res) => {
  requestDelay(() => {
    const { db } = res.locals;

    try {
      const filter = parsePersonFilter(req.query);
      const response = db.person.getList(filter);
      res.json(response);
    } catch (error) {
      handleError(res, error, 'Error getting people list!');
    }
  });
});

// get person data
peopleRouter.get('/:id', (req, res) => {
  requestDelay(() => {
    const { id } = req.params;
    const { db } = res.locals;

    try {
      const person = db.person.getDetail(id);

      if (!person) {
        res.status(404).json({ error: 'Person not found!' });
      } else {
        res.json(person);
      }
    } catch (error) {
      handleError(res, error, 'Error getting preson data!');
    }
  });
});
