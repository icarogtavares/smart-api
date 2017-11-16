'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class PlacesService {

  constructor(Place) {
    this.Place = Place;
  }

  findAll() {
    return this.Place.findAll({
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
    });
  }

  findById(id) {
    return this.Place.findById(id, {
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
    });
  }

  save(data) {
    return this.Place.create(data);
  }

  update(id, data) {
    return this.Place.update(data, {
      where: {
        id: id
      }
    });
  }

  delete(id) {
    return this.Place.destroy({
      where: {
        id: id
      }
    });
  }

}
exports.default = PlacesService;