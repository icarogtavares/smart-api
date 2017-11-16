'use strict';

var _models = require('../../../src/models');

var _models2 = _interopRequireDefault(_models);

var _ramda = require('ramda');

var _bluebird = require('bluebird');

var Promise = _interopRequireWildcard(_bluebird);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { version: Version, responsible: Responsible, place: Place, equipment: Equipment } = _models2.default;

describe('Routes: Equipment', () => {

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

    const fakePlaces = [{
        name: "Departamento de Física - Bloco 929",
        latitude: "-3.747014",
        longitude: "-38.576372"
    }, {
        name: "Departamento de Física - Bloco 929",
        latitude: "-3.747052",
        longitude: "-38.5766"
    }];

    const fakeResponsibles = [{
        name: "Maria de Oliveira",
        email: "maria@hotmail.com",
        phone: "+55 85 999999999"
    }, {
        name: "Raimundo da Silva",
        email: "raimundo@yahoo.com.br",
        phone: "+55 85999999999"
    }];

    const fakeVersion = {
        current: 1
    };

    before(done => {

        Equipment.drop().then(() => Promise.all([Version.sync({ force: true }), Responsible.sync({ force: true }), Place.sync({ force: true })])).then(() => Promise.all([Version.create(fakeVersion), Place.bulkCreate(fakePlaces), Responsible.bulkCreate(fakeResponsibles)])).then(() => Equipment.sync({ force: true })).then(() => Equipment.bulkCreate(fakeEquipments)).then(() => done()).catch(err => done(err));
    });

    describe('# GET /mobile', () => {
        it('should return the database data', done => {
            request.get("/mobile").set('VERSION', '0').expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.equipments).to.have.length(2);
                expect(res.body.responsibles).to.have.length(2);
                expect(res.body.places).to.have.length(2);
                expect(res.body.equipments[0]).to.not.have.property('created_at');
                expect(res.body.equipments[0]).to.not.have.property('updated_at');
                expect(res.body.equipments[0]).to.not.have.property('deleted_at');
                expect(res.body.responsibles[0]).to.not.have.property('created_at');
                expect(res.body.responsibles[0]).to.not.have.property('updated_at');
                expect(res.body.responsibles[0]).to.not.have.property('deleted_at');
                expect(res.body.places[0]).to.not.have.property('created_at');
                expect(res.body.places[0]).to.not.have.property('updated_at');
                expect(res.body.places[0]).to.not.have.property('deleted_at');
                done(err);
            });
        });

        describe('- contracts', () => {
            it("shouldn't return the database data", done => {
                request.get("/mobile").set('VERSION', '999').expect(400, done);
            });
        });
    });
});