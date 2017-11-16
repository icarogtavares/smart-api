import { assoc, equals, isNil } from 'ramda'
import * as noisesService from '../services/noises'

export const findAll = (req, res, next) => {

  noisesService.findAll()
    .then(noises => res.send(noises))
    .catch(err => next(assoc('status', 400, err)));
}

export const findById = (req, res, next) => {

  noisesService.findById(req.params.id)
    .then(noise => {
        isNil(noise) ? next() : res.send(noise);
    })
    .catch(err => next(assoc('status', 400, err)));
}

export const save = (req, res, next) => {
  noisesService.create(req.body)
    .then(noise => res.status(201).send(noise))
    .catch(err => next(assoc('status', 400, err)));
}

export const update = (req, res, next) => {
  noisesService.update(req.params.id, req.body)
    .then(rowsAffected => {
      equals(rowsAffected[0], 0) ? next() : res.sendStatus(200);
    })
    .catch(err => next(assoc('status', 400, err)))
}

export const remove = (req, res, next) => {
  noisesService.remove(req.params.id)
    .then(rowsAffected => {
      equals(rowsAffected, 0) ? next() : res.sendStatus(204);
    })
    .catch(err => next(assoc('status', 400, err)))
}