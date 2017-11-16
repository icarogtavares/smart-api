'use strict';

var _throng = require('throng');

var _throng2 = _interopRequireDefault(_throng);

var _boot = require('./bin/boot');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WORKERS = process.env.WEB_CONCURRENCY || 1;

(0, _throng2.default)({
  workers: WORKERS,
  lifetime: Infinity,
  start: _boot.startApp
});