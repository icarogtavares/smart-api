'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path2.default.basename(module.filename);
const config = (0, _database2.default)();

let db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new _sequelize2.default(process.env[config.use_env_variable]);
} else {
  const defaults = {
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    define: { underscored: true, freezeTableName: true }
  };

  sequelize = new _sequelize2.default(config.database, config.username, config.password, Object.assign({}, defaults, config));
}

_fs2.default.readdirSync(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(file => {
  const model = sequelize['import'](_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync();
}

exports.default = db;