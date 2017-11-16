'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _version = require('../controllers/version');

var _version2 = _interopRequireDefault(_version);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const versionController = new _version2.default(_models2.default.version);
const router = _express2.default.Router();

router.route('/').get((req, res, next) => versionController.currentVersion(req, res, next)).post((req, res, next) => versionController.incrementVersion(req, res, next));

exports.default = router;