import { genSaltSync, hashSync } from 'bcrypt'

export default (sequelize, DataTypes) => {
  let user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$",'i'],
        len: [1,40]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      validate: {
        isEmail : true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access_token: DataTypes.STRING
  }, 
  {
    timestamps: true,
    paranoid: true,
    hooks: {
       beforeCreate: user => {
        const salt = genSaltSync();
        user.password = hashSync(user.password, salt);
      }
    }
  });

  return user;
};