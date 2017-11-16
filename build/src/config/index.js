'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getConfig = exports.getEnv = undefined;

var _ramda = require('ramda');

const getEnv = exports.getEnv = env => {
    return env || process.env.NODE_ENV || 'test';
};

const getConfig = exports.getConfig = config => env => (0, _ramda.prop)(getEnv(env), config);