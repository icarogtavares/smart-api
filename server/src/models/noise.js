export default (sequelize, DataTypes) => {
  let noise = sequelize.define('noise', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    sound_level: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: true,
    updatedAt: false,
    paranoid: true
  });

  return noise;
};