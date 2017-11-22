export default (sequelize, DataTypes) => {
    let error = sequelize.define('error', {
      code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {timestamps: false});
  
    return error;
};