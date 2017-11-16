import { getModel } from '../models'

export const findAll = () => {
    return getModel('user')
        .then(User => 
            User.findAll({
                attributes:{ exclude: ['password', 'created_at', 'updated_at', 'deleted_at']}
        }))
}

export const findById = (id) => {
    return getModel('user')
        .then(User => 
            User.findById(id, {
                attributes : { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] }
            }))
}

export const findByUsername = (username) => {
    return getModel('user')
        .then(User => 
            User.findOne({
                where: {
                  username: username
                }
            }))
}

export const create = (data) => {
    return getModel('user')
        .then(User => 
            User.create(data)
        )
}

export const update = (id, data) => {
    return getModel('user')
        .then(User => 
            User.update(data, {
                where: {
                    id: id
                }
            }))
}

export const updateToken = (id, token) => {
    return getModel('user')
        .then(User =>
            User.update({
                access_token: token
            }, {
                where : {
                    id : id
                }
            }))
}

export const remove = (id) => {
    return getModel('user')
        .then(User => 
            User.destroy({
                where: {
                    id: id
                }
            }))
}