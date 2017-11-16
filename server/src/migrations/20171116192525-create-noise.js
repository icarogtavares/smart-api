export const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('noise', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    sound_level: {
      allowNull: false,
      type: Sequelize.DECIMAL(10,6)
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}

export const down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('noise');
}