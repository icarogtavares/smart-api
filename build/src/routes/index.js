'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _places = require('./places');

var _places2 = _interopRequireDefault(_places);

var _responsibles = require('./responsibles');

var _responsibles2 = _interopRequireDefault(_responsibles);

var _equipments = require('./equipments');

var _equipments2 = _interopRequireDefault(_equipments);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

var _mobile = require('./mobile');

var _mobile2 = _interopRequireDefault(_mobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.use('/users', _users2.default);
router.use('/places', _places2.default);
router.use('/responsibles', _responsibles2.default);
router.use('/equipments', _equipments2.default);
router.use('/login', _login2.default);
router.use('/version', _version2.default);
router.use('/mobile', _mobile2.default);

router.get('/', (req, res, next) => {
  res.send({ index: 'index route' });
});

exports.default = router;