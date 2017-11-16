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

var _auth = require('../bin/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const usersController = new _users2.default(_models2.default.user);

router.route('/').post((req, res, next) => usersController.login(req, res, next));

router.route('/').get((0, _auth2.default)().authenticate(), (req, res, next) => res.send('Auth test OK!'));

exports.default = router;