'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _middlewares = require('../../src/bin/middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _middlewares.configureExpress)();

global.app = app;
global.request = (0, _supertest2.default)(app);
global.expect = _chai2.default.expect;