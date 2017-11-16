'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

exports.default = (sequelize, DataTypes) => {
  let user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$", 'i'],
        len: [1, 40]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access_token: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: user => {
        const salt = (0, _bcrypt.genSaltSync)();
        user.password = (0, _bcrypt.hashSync)(user.password, salt);
      }
    }
  });

  user.isPassword = (encodedPassword, password) => {
    return (0, _bcrypt.compareSync)(password, encodedPassword);
  };

  return user;
};