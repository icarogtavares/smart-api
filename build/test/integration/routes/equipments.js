'use strict';

var _models = require('../../../src/models');

var _models2 = _interopRequireDefault(_models);

var _ramda = require('ramda');

var _bluebird = require('bluebird');

var Promise = _interopRequireWildcard(_bluebird);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { responsible: Responsible, place: Place, equipment: Equipment } = _models2.default;

describe('Routes: Equipment', () => {

    const fakePlace = {
        id: 1,
        name: "Departamento da Computação",
        latitude: "-3.747014",
        longitude: "-38.576372"
    };

    const fakeResponsible = {
        id: 1,
        name: "João de Sousa Neto",
        email: "joao@gmail.com",
        phone: "+55 85 9 9999-9999"
    };

    const fakeEquipment = {
        name: "Microscópio confocal - LM 710 Zeiss",
        description: "Possui 6 linhas de lasers. Gera imagens tridimensionais com alto contraste e\nespecificidade de sinal.",
        place_id: 1,
        responsible_id: 1
    };

    const fakeEquipments = [{
        id: 1,
        name: "Witec alpha300",
        description: "Imagens Raman confocal\nResolução nominal de 200-300nm\nResolução 3D excepcional\nImagens Raman ultra-rápidas (0.76ms)",
        place_id: 1,
        responsible_id: 1
    }, {
        id: 2,
        name: "MEV Inspect S50 - FEI",
        description: "Resolução nominal de 3nm\nAnálise de superfícies de materiais em alto e baixo vácuo\nEDS e Litografia de elétrons",
        place_id: 1,
        responsible_id: 1
    }];

    before(done => {

        Equipment.drop().then(() => Promise.all([Responsible.sync({ force: true }), Place.sync({ force: true })])).then(() => Promise.all([Place.create(fakePlace), Responsible.create(fakeResponsible)])).then(() => done()).catch(err => done(err));
    });

    beforeEach(done => {
        Equipment.sync({ force: true }).then(() => Equipment.bulkCreate(fakeEquipments)).then(equipments => {
            done();
        }).catch(err => {
            done(err);
        });
    });

    describe('# GET /equipments', () => {
        it('should return a list of equipments', done => {
            request.get("/equipments").expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body).to.have.length(2);
                expect(res.body[0].name).to.eql(fakeEquipments[0].name);
                expect(res.body[0].description).to.eql(fakeEquipments[0].description);
                expect(res.body[0].place).to.eql(fakePlace);
                expect(res.body[0].responsible).to.eql(fakeResponsible);
                expect(res.body[0]).to.not.have.property('created_at');
                expect(res.body[0]).to.not.have.property('updated_at');
                expect(res.body[0]).to.not.have.property('deleted_at');
                expect(res.body[1].name).to.eql(fakeEquipments[1].name);
                expect(res.body[1].description).to.eql(fakeEquipments[1].description);
                expect(res.body[1].place).to.eql(fakePlace);
                expect(res.body[1].responsible).to.eql(fakeResponsible);
                done(err);
            });
        });
    });

    describe('# GET /equipments/{id}', () => {
        it('should return an equipment', done => {
            request.get('/equipments/1').expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.name).to.eql(fakeEquipments[0].name);
                expect(res.body.description).to.eql(fakeEquipments[0].description);
                expect(res.body.place).to.eql(fakePlace);
                expect(res.body.responsible).to.eql(fakeResponsible);
                expect(res.body).to.not.have.property('created_at');
                expect(res.body).to.not.have.property('updated_at');
                expect(res.body).to.not.have.property('deleted_at');
                done(err);
            });
        });

        describe('- contracts', () => {
            it("shouldn't return an equipment that does not exist", done => {
                request.get('/equipments/3').expect(404, done);
            });
        });
    });

    describe('# POST /equipments', () => {
        it('should create a new equipment', done => {
            request.post('/equipments').send(fakeEquipment).expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.name).to.eql(fakeEquipment.name);
                expect(res.body.description).to.eql(fakeEquipment.description);
                expect(res.body.place_id).to.eql(fakeEquipment.place_id);
                expect(res.body.responsible_id).to.eql(fakeEquipment.responsible_id);
                done(err);
            });
        });

        describe('- contracts', () => {
            it("shouldn't create a new equipment with empty name", done => {
                request.post('/equipments').send((0, _ramda.assoc)('name', (0, _ramda.empty)(fakeEquipment.name), fakeEquipment)).expect(400, done);
            });

            it("shouldn't create a new equipment with empty description", done => {
                request.post('/equipments').send((0, _ramda.assoc)('description', (0, _ramda.empty)(fakeEquipment.description), fakeEquipment)).expect(400, done);
            });

            it("shouldn't create a new equipment with null name", done => {
                request.post('/equipments').send((0, _ramda.assoc)('name', null, fakeEquipment)).expect(400, done);
            });

            it("shouldn't create a new equipment with null description", done => {
                request.post('/equipments').send((0, _ramda.assoc)('description', null, fakeEquipment)).expect(400, done);
            });

            it("shouldn't create a new equipment with a null place", done => {
                request.post('/equipments').send((0, _ramda.assoc)('place_id', null, fakeEquipment)).expect(400, done);
            });

            it("shouldn't create a new equipment with a null responsible", done => {
                request.post('/equipments').send((0, _ramda.assoc)('responsible_id', null, fakeEquipment)).expect(400, done);
            });
        });
    });

    describe('# PUT /equipments/{id}', () => {
        it('should update an equipment', done => {
            request.put('/equipments/1').send(fakeEquipment).expect(200, done);
        });

        describe('- contracts', () => {
            it("shouldn't update with empty name", done => {
                request.put('/equipments/1').send((0, _ramda.assoc)('name', (0, _ramda.empty)(fakeEquipment.name), fakeEquipment)).expect(400, done);
            });

            it("shouldn't update with empty description", done => {
                request.put('/equipments/1').send((0, _ramda.assoc)('description', (0, _ramda.empty)(fakeEquipment.description), fakeEquipment)).expect(400, done);
            });

            it("shouldn't update with null name", done => {
                request.put('/equipments/1').send((0, _ramda.assoc)('name', null, fakeEquipment)).expect(400, done);
            });

            it("shouldn't update with null description", done => {
                request.put('/equipments/1').send((0, _ramda.assoc)('description', null, fakeEquipment)).expect(400, done);
            });

            it("shouldn't update with null place", done => {
                request.put('/equipments/1').send((0, _ramda.assoc)('place_id', null, fakeEquipment)).expect(400, done);
            });

            it("shouldn't update with null responsible", done => {
                request.put('/equipments/1').send((0, _ramda.assoc)('responsible_id', null, fakeEquipment)).expect(400, done);
            });

            it("shouldn't update an equipment that does not exist", done => {
                request.put('/equipments/999').expect(404, done);
            });
        });
    });

    describe('# DELETE /equipments/{id}', () => {
        it('should delete an equipment', done => {
            request.delete('/equipments/1').expect(204, done);
        });

        it("shouldn't delete an equipment that does not exist", done => {
            request.delete('/equipments/3').expect(404, done);
        });
    });
});