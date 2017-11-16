'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _equipments = require('../controllers/equipments');

var _equipments2 = _interopRequireDefault(_equipments);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const equipmentsController = new _equipments2.default(_models2.default.equipment, _models2.default.place, _models2.default.responsible);

router.route('/').get((req, res, next) => equipmentsController.findAll(req, res, next)).post((req, res, next) => equipmentsController.save(req, res, next));

router.route('/:id').get((req, res, next) => equipmentsController.findOne(req, res, next)).put((req, res, next) => equipmentsController.update(req, res, next)).delete((req, res, next) => equipmentsController.delete(req, res, next));

exports.default = router;