'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _responsibles = require('../controllers/responsibles');

var _responsibles2 = _interopRequireDefault(_responsibles);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const responsiblesController = new _responsibles2.default(_models2.default.responsible);
const router = _express2.default.Router();

router.route('/').get((req, res, next) => responsiblesController.findAll(req, res, next)).post((req, res, next) => responsiblesController.save(req, res, next));

router.route('/:id').get((req, res, next) => responsiblesController.findOne(req, res, next)).put((req, res, next) => responsiblesController.update(req, res, next)).delete((req, res, next) => responsiblesController.delete(req, res, next));

exports.default = router;