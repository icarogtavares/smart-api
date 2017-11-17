export const up = (queryInterface, Sequelize) => {
  return queryInterface.createTable('error', {
    code: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    }
  });
}

export const down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable('error');
}