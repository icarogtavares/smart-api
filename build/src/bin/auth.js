'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _ramda = require('ramda');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { user: User } = _models2.default;

const params = {
	secretOrKey: _config2.default.security.jwtSecret,
	jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

const isNotNil = (0, _ramda.complement)(_ramda.isNil);

exports.default = () => {

	var strategy = new _passportJwt.Strategy(params, (payload, done) => {
		User.findById(payload.id).then(user => {
			if ((0, _ramda.isNil)(user)) return done(null, false);

			const userToken = _jsonwebtoken2.default.decode(user.access_token);

			if (isNotNil(userToken) && (0, _ramda.eqProps)('id', userToken, payload) && (0, _ramda.eqProps)('iat', userToken, payload) && (0, _ramda.eqProps)('exp', userToken, payload)) {
				return done(null, user);
			}

			return done(null, false);
		}).catch(err => done(err, null));
	});

	_passport2.default.use(strategy);

	return {
		initialize: () => {
			return _passport2.default.initialize();
		},
		authenticate: () => {
			return _passport2.default.authenticate("jwt", _config2.default.security.jwtSession);
		}
	};
};