'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startApp = undefined;

var _middlewares = require('./middlewares');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const startApp = exports.startApp = id => {
  const emufcDebug = (0, _debug2.default)(`emufc-api:server:${id}:`);

  var app = (0, _middlewares.configureExpress)();
  app.listen(app.get('port'), () => {
    emufcDebug(`Listening on port ${app.get('port')}`);
  });
};