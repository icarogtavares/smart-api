'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mobile = require('../controllers/mobile');

var _mobile2 = _interopRequireDefault(_mobile);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mobileController = new _mobile2.default(_models2.default.version, _models2.default.equipment, _models2.default.place, _models2.default.responsible);
const router = _express2.default.Router();

router.route('/').get((req, res, next) => mobileController.findAll(req, res, next));

exports.default = router;