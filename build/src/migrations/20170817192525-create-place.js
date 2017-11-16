'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const up = exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('place', {
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
    latitude: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 6)
    },
    longitude: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 6)
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
  return queryInterface.dropTable('place');
};