'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const up = exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('version', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    current: {
      type: Sequelize.INTEGER
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};
const down = exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('version');
};