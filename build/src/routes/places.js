'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _places = require('../controllers/places');

var _places2 = _interopRequireDefault(_places);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const placesController = new _places2.default();

router.route('/').get(placesController.findAll).post(placesController.save);

router.route('/:id').get(placesController.findById).put(placesController.update).delete(placesController.delete);

exports.default = router;