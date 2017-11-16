'use strict';

var _models = require('../../../src/models');

var _models2 = _interopRequireDefault(_models);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { place: Place, equipment: Equipment } = _models2.default;

describe('Routes: Place', () => {

    const fakePlace = {
        name: "Departamento da Computação",
        latitude: "-3.747014",
        longitude: "-38.576372"
    };

    const fakePlaces = [{
        name: "Departamento de Física - Bloco 929",
        latitude: "-3.747014",
        longitude: "-38.576372"
    }, {
        name: "Departamento de Física - Bloco 929",
        latitude: "-3.747052",
        longitude: "-38.5766"
    }];

    before(done => {
        Equipment.drop().then(() => done()).catch(err => {
            done(err);
        });
    });

    beforeEach(done => {
        Place.sync({ force: true }).then(() => Place.bulkCreate(fakePlaces)).then(places => {
            done();
        }).catch(err => {
            done(err);
        });
    });

    describe('# GET /places', () => {
        it('should return a list of places', done => {
            request.get("/places").expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body).to.have.length(2);
                expect(res.body[0].name).to.eql(fakePlaces[0].name);
                expect(res.body[0].latitude).to.eql(fakePlaces[0].latitude);
                expect(res.body[0].longitude).to.eql(fakePlaces[0].longitude);
                expect(res.body[0]).to.not.have.property('created_at');
                expect(res.body[0]).to.not.have.property('updated_at');
                expect(res.body[0]).to.not.have.property('deleted_at');

                expect(res.body[1].name).to.eql(fakePlaces[1].name);
                expect(res.body[1].latitude).to.eql(fakePlaces[1].latitude);
                expect(res.body[1].longitude).to.include(fakePlaces[1].longitude);
                done(err);
            });
        });
    });

    describe('# GET /places/{id}', () => {
        it('should return a place', done => {
            request.get('/places/1').expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.name).to.eql(fakePlaces[0].name);
                expect(res.body.latitude).to.eql(fakePlaces[0].latitude);
                expect(res.body.longitude).to.eql(fakePlaces[0].longitude);
                expect(res.body).to.not.have.property('created_at');
                expect(res.body).to.not.have.property('updated_at');
                expect(res.body).to.not.have.property('deleted_at');
                done(err);
            });
        });

        describe('- contracts', () => {
            it("shouldn't return a place that does not exist", done => {
                request.get('/places/3').expect(404, done);
            });
        });
    });

    describe('# POST /places', () => {
        it('should create a new place', done => {
            request.post('/places').send(fakePlace).expect(201).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.name).to.eql(fakePlace.name);
                expect(res.body.latitude).to.eql(fakePlace.latitude);
                expect(res.body.longitude).to.eql(fakePlace.longitude);
                done(err);
            });
        });

        describe('- contracts', () => {
            it("shouldn't create a new place with empty name", done => {
                request.post('/places').send((0, _ramda.assoc)('name', (0, _ramda.empty)(fakePlace.name), fakePlace)).expect(400, done);
            });

            it("shouldn't create a new place with empty latitude", done => {
                request.post('/places').send((0, _ramda.assoc)('longitude', (0, _ramda.empty)(fakePlace.latitude), fakePlace)).expect(400, done);
            });

            it("shouldn't create a new place with empty longitude", done => {
                request.post('/places').send((0, _ramda.assoc)('longitude', (0, _ramda.empty)(fakePlace.longitude), fakePlace)).expect(400, done);
            });
        });
    });

    describe('# PUT /places/{id}', () => {
        it('should update a place', done => {
            request.put('/places/1').send(fakePlace).expect(200, done);
        });

        describe('- contracts', () => {
            it("shouldn't update with empty name", done => {
                request.put('/places/1').send((0, _ramda.assoc)('name', (0, _ramda.empty)(fakePlace.name), fakePlace)).expect(400, done);
            });

            it("shouldn't update with null latitude", done => {
                request.put('/places/1').send((0, _ramda.assoc)('longitude', null, fakePlace)).expect(400, done);
            });

            it("shouldn't update with null longitude", done => {
                request.put('/places/1').send((0, _ramda.assoc)('longitude', null, fakePlace)).expect(400, done);
            });

            it("shouldn't update a place that does not exist", done => {
                request.put('/places/999').expect(404, done);
            });
        });
    });

    describe('# DELETE /places/{id}', () => {
        it('should delete a place', done => {
            request.delete('/places/1').expect(204, done);
        });

        it("shouldn't delete a place that does not exist", done => {
            request.delete('/places/3').expect(404, done);
        });
    });
});