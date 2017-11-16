import fs        from 'fs'
import path      from 'path'
import Sequelize from 'sequelize'
import * as Promise from 'bluebird'
import getConfig from '../config/database'

const basename  = path.basename(module.filename);
const config = getConfig();

let db        = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  const defaults = {
    pool: {
      max: 10,
      min: 0,
      idle: 10000
   },
    define : { underscored: true, freezeTableName: true}
  }

  sequelize = new Sequelize(config.database, config.username, config.password, Object.assign({}, defaults, config));
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if(process.env.NODE_ENV !== 'test') {
  sequelize.sync();
}

export function getModel(modelName) {
  return Promise.resolve(db[modelName]);
}

export default db;