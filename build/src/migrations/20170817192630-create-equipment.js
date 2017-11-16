'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const up = exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('equipment', {
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
    description: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    responsible_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'responsible',
        key: 'id'
      }
    },
    place_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'place',
        key: 'id'
      }
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
  return queryInterface.dropTable('equipment');
};