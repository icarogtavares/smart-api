export default (sequelize, DataTypes) => {
  let noise = sequelize.define('noise', {
    sound_level: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: true,
    updatedAt: false,
    deletedAt: false
  });

  return noise;
};