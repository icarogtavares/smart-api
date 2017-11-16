'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const usersController = new _users2.default(_models2.default.user);

router.route('/').get((req, res, next) => usersController.findAll(req, res, next)).post((req, res, next) => usersController.save(req, res, next));

router.route('/:id').get((req, res, next) => usersController.findOne(req, res, next)).put((req, res, next) => usersController.update(req, res, next));

exports.default = router;