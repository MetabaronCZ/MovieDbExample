import express from 'express';

import { requestDelay } from 'utils/common';
import { parsePersonFilter } from 'utils/person';

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
      res.status(500).json({ error });
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
      res.status(500).json({ error });
    }
  });
});
