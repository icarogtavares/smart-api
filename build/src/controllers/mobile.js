'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ramda = require('ramda');

var _bluebird = require('bluebird');

var Promise = _interopRequireWildcard(_bluebird);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class MobileController {

    constructor(Version, Equipment, Place, Responsible) {
        this.Version = Version;
        this.Equipment = Equipment;
        this.Place = Place;
        this.Responsible = Responsible;
    }

    findAll(req, res, next) {
        const equipments = this.Equipment.findAll({
            attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            where: { deleted_at: null }
        });
        const responsibles = this.Responsible.findAll({
            attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            where: { deleted_at: null }
        });
        const places = this.Place.findAll({
            attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            where: { deleted_at: null }
        });

        this.Version.findById(1).then(version => {
            if (version.current > req.get('VERSION')) {
                return Promise.all([equipments, responsibles, places]);
            }

            throw new Error('Already up to date.');
        }).then(([equipments, responsibles, places]) => res.send({
            equipments: equipments,
            responsibles: responsibles,
            places: places
        })).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

}
exports.default = MobileController;