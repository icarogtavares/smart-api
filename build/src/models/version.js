'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  let version = sequelize.define('version', {
    current: DataTypes.INTEGER
  }, {
    timestamps: true,
    createdAt: false
  });
  return version;
};