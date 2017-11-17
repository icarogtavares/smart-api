import { getModel } from '../models'

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

export const increment = (code) => {
  return getModel('error')
    .then(Error => 
      Error.findById(code))
    .then(error => error.increment('code', {by: 1}))
}