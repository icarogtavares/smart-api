'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _places = require('../services/places');

var _places2 = _interopRequireDefault(_places);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlacesController {

  findAll(req, res, next) {
    const placesService = new _places2.default(_models2.default.place);

    placesService.findAll().then(places => res.send(places)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  findById(req, res, next) {
    const placesService = new _places2.default(_models2.default.place);
    placesService.findById(req.params.id).then(place => {
      (0, _ramda.isNil)(place) ? next() : res.send(place);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  save(req, res, next) {
    const placesService = new _places2.default(_models2.default.place);
    placesService.save(req.body).then(place => res.status(201).send(place)).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  update(req, res, next) {
    const placesService = new _places2.default(_models2.default.place);
    placesService.update(req.params.id, req.body).then(rowsAffected => {
      (0, _ramda.equals)(rowsAffected[0], 0) ? next() : res.sendStatus(200);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

  delete(req, res, next) {
    const placesService = new _places2.default(_models2.default.place);
    placesService.delete(req.params.id).then(rowsAffected => {
      (0, _ramda.equals)(rowsAffected, 0) ? next() : res.sendStatus(204);
    }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
  }

}
exports.default = PlacesController;