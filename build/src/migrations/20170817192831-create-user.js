'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const up = exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    access_token: {
      type: Sequelize.STRING
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deleted_at: {
      type: Sequelize.DATE
    }
  });
};
const down = exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('user');
};