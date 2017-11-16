'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ramda = require('ramda');

class EquipmentsController {

    constructor(Equipment, Place, Responsible) {
        this.Equipment = Equipment;
        this.Place = Place;
        this.Responsible = Responsible;
    }

    findAll(req, res, next) {
        this.Equipment.findAll({
            attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            include: [{ all: true, nested: true, attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] } }]
        }).then(equipments => res.send(equipments)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

    findOne(req, res, next) {
        this.Equipment.findById(req.params.id, {
            attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            include: [{ all: true, nested: true, attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] } }]
        }).then(equipment => {
            (0, _ramda.isNil)(equipment) ? next() : res.send(equipment);
        }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

    save(req, res, next) {
        this.Equipment.create(req.body).then(equipment => res.send(equipment)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

    update(req, res, next) {
        this.Equipment.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(rowsAffected => {
            (0, _ramda.equals)(rowsAffected[0], 0) ? next() : res.sendStatus(200);
        }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

    delete(req, res, next) {
        this.Equipment.destroy({
            where: {
                id: req.params.id
            }
        }).then(rowsAffected => {
            (0, _ramda.equals)(rowsAffected, 0) ? next() : res.sendStatus(204);
        }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

}
exports.default = EquipmentsController;