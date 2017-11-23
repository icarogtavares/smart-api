import { getModel } from '../models'
import db from '../models'

export const getAverageSoundLevel = () => {
  return db.sequelize.query('SELECT AVG(sound_level) as avg FROM noise', { type: db.sequelize.QueryTypes.SELECT });
}

export const findAll = () => {
  return getModel('noise')
    .then(Noise => Noise.findAll())
}

export const findById = (id) => {
  return getModel('noise')
    .then(Noise =>
      Noise.findById(id))
}

export const create = (data) => {
  return getModel('noise')
    .then(Noise =>
      Noise.create(data)
    )
}

export const update = (id, data) => {
  return getModel('noise')
    .then(Noise =>
      Noise.update(data, {
      where: {
        id: id
      }
    }))
}

export const remove = (id) => {
  return getModel('noise')
    .then(Noise =>
      Noise.destroy({
      where: {
        id: id
      }
    }))
}
