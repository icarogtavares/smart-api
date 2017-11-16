export default (sequelize, DataTypes) => {
  let noise = sequelize.define('noise', {
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
    deletedAt: false,
    paranoid: true
  });

  return noise;
};