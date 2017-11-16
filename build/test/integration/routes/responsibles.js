'use strict';

var _ramda = require('ramda');

var _models = require('../../../src/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { responsible: Responsible, equipment: Equipment } = _models2.default;

describe('Routes: Responsible', () => {

    const fakeResponsible = {
        name: "João de Sousa Neto",
        email: "joao@gmail.com",
        phone: "+55 85 9 9999-9999"
    };

    const fakeResponsibles = [{
        name: "Maria de Oliveira",
        email: "maria@hotmail.com",
        phone: "+55 85 999999999"
    }, {
        name: "Raimundo da Silva",
        email: "raimundo@yahoo.com.br",
        phone: "+55 85999999999"
    }];

    before(done => {
        Equipment.drop().then(() => done()).catch(err => {
            done(err);
        });
    });

    beforeEach(done => {
        Responsible.sync({ force: true }).then(() => Responsible.bulkCreate(fakeResponsibles)).then(responsibles => {
            done();
        }).catch(err => {
            done(err);
        });
    });

    describe('# GET /responsibles', () => {
        it('should return a list of responsibles', done => {
            request.get("/responsibles").expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body).to.have.length(2);
                expect(res.body[0].name).to.eql(fakeResponsibles[0].name);
                expect(res.body[0].email).to.eql(fakeResponsibles[0].email);
                expect(res.body[0].phone).to.eql(fakeResponsibles[0].phone);
                expect(res.body[0]).to.not.have.property('created_at');
                expect(res.body[0]).to.not.have.property('updated_at');
                expect(res.body[0]).to.not.have.property('deleted_at');

                expect(res.body[1].name).to.eql(fakeResponsibles[1].name);
                expect(res.body[1].email).to.eql(fakeResponsibles[1].email);
                expect(res.body[1].phone).to.eql(fakeResponsibles[1].phone);
                done(err);
            });
        });
    });

    describe('# GET /responsibles/{id}', () => {
        it('should return a responsible', done => {
            request.get('/responsibles/1').expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.name).to.eql(fakeResponsibles[0].name);
                expect(res.body.email).to.eql(fakeResponsibles[0].email);
                expect(res.body.phone).to.eql(fakeResponsibles[0].phone);
                expect(res.body).to.not.have.property('created_at');
                expect(res.body).to.not.have.property('updated_at');
                expect(res.body).to.not.have.property('deleted_at');
                done(err);
            });
        });

        describe('- contracts', () => {
            it("shouldn't return a responsible that does not exist", done => {
                request.get('/responsibles/3').expect(404, done);
            });
        });
    });

    describe('# POST /responsibles', () => {
        it('should create a new responsible', done => {
            request.post('/responsibles').send(fakeResponsible).expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.name).to.eql(fakeResponsible.name);
                expect(res.body.email).to.eql(fakeResponsible.email);
                expect(res.body.phone).to.eql(fakeResponsible.phone);
                done(err);
            });
        });

        describe('- contracts', () => {
            it("shouldn't create a new responsible with empty name", done => {
                request.post('/responsibles').send((0, _ramda.assoc)('name', (0, _ramda.empty)(fakeResponsible.name), fakeResponsible)).expect(400, done);
            });

            it("shouldn't create a new responsible with empty email", done => {
                request.post('/responsibles').send((0, _ramda.assoc)('email', (0, _ramda.empty)(fakeResponsible.email), fakeResponsible)).expect(400, done);
            });

            it("shouldn't create a new responsible with name null", done => {
                request.post('/responsibles').send((0, _ramda.assoc)('name', null, fakeResponsible)).expect(400, done);
            });

            it("shouldn't create a new responsible with email null", done => {
                request.post('/responsibles').send((0, _ramda.assoc)('email', null, fakeResponsible)).expect(400, done);
            });
        });
    });

    describe('# PUT /responsibles/{id}', () => {
        it('should update a responsible', done => {
            request.put('/responsibles/1').send(fakeResponsible).expect(200, done);
        });

        describe('- contracts', () => {
            it("shouldn't update with empty name", done => {
                request.put('/responsibles/1').send((0, _ramda.assoc)('name', (0, _ramda.empty)(fakeResponsible.name), fakeResponsible)).expect(400, done);
            });

            it("shouldn't update with empty email", done => {
                request.put('/responsibles/1').send((0, _ramda.assoc)('email', (0, _ramda.empty)(fakeResponsible.email), fakeResponsible)).expect(400, done);
            });

            it("shouldn't update with null name", done => {
                request.put('/responsibles/1').send((0, _ramda.assoc)('name', null, fakeResponsible)).expect(400, done);
            });

            it("shouldn't update with null email", done => {
                request.put('/responsibles/1').send((0, _ramda.assoc)('email', null, fakeResponsible)).expect(400, done);
            });

            it("shouldn't update a responsible that does not exist", done => {
                request.put('/responsibles/999').expect(404, done);
            });
        });
    });

    describe('# DELETE /responsibles/{id}', () => {
        it('should delete a responsible', done => {
            request.delete('/responsibles/1').expect(204, done);
        });

        it("shouldn't delete a responsible that does not exist", done => {
            request.delete('/responsibles/3').expect(404, done);
        });
    });
});