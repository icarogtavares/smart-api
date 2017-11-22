import { getModel } from '../models'
import { isNil } from 'ramda'
import * as Promise from 'bluebird'

export const findAll = () => {
  return getModel('error')
    .then(Error => Error.findAll())
}

export const findByCode = (code) => {
  return getModel('error')
    .then(Error => Error.findById(code))
}

export const create = (data) => {
  return getModel('error')
    .then(Error => Error.create(data))
}

export const increment = (errorObject) => {
  return findByCode(errorObject.code)
    .then(error => {
      if(isNil(error)) {
        return create(errorObject);
      }
      return error;
    })
    .then(error => error.increment('count', {by: 1}));
}