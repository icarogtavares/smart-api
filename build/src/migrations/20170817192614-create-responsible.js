'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const up = exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('responsible', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    phone: {
      allowNull: false,
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
  return queryInterface.dropTable('responsible');
};