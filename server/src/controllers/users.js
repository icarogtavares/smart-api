import { assoc, equals, isNil } from 'ramda'
import jwt from 'jsonwebtoken'
import { compareSync } from 'bcrypt'
import * as usersService from '../services/users'
import cfg from '../config/config'

export const findAll = (req, res, next) => {
  usersService.findAll()
    .then(users => res.send(users))
    .catch(err => next(assoc('status', 400, err)));
}

export const findOne = (req, res, next) => {
  usersService.findById(req.params.id)
    .then(user => {
      isNil(user) ? next() : res.send(user);
    })
    .catch(err => next(assoc('status', 400, err)));
}

export const save = (req, res, next) => {
  usersService.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => next(assoc('status', 400, err)));
}

export const update = (req, res, next) => {
  usersService.update(req.params.id, req.body)
    .then(rowsAffected => {
      equals(rowsAffected[0], 0) ? next() : res.sendStatus(200);
    })
    .catch(err => next(assoc('status', 400, err)))
}

export const login = (req, res, next) => {

  usersService.findByUsername(req.body.username)
    .then(user => {
      if(isNil(user))
        throw new Error('User does not exist!');

      if(compareSync(req.body.password, user.password)) {
        const payload = { id : user.id };
        const token = jwt.sign(payload, cfg.security.jwtSecret, {expiresIn: '7d'});
        usersService.updateToken(user.id, token)
          .then(rowsAffected => {
            if(equals(rowsAffected[0], 0)) {
              throw new Error('Usuário não encontra-se mais no banco.')
            }
            res.send({token: token})
          })
      } else {
        throw new Error('Invalid password')
      }
    })
      .catch(err => next(assoc('status', 400, err)));
}
