'use strict';

var _ramda = require('ramda');

var _models = require('../../../src/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { version: Version } = _models2.default;

describe('Routes: Responsible', () => {

    const fakeVersion = {
        current: 0
    };

    beforeEach(done => {
        Version.sync({ force: true }).then(() => Version.create(fakeVersion)).then(version => {
            done();
        }).catch(err => {
            done(err);
        });
    });

    describe('# GET /version', () => {
        it('should return current db version', done => {
            request.get('/version').expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.current).to.eql(fakeVersion.current);
                expect(res.body).to.not.have.property('created_at');
                done(err);
            });
        });
    });

    describe('# POST /version', () => {
        it('should increment 1 in db version', done => {
            request.post('/version').expect(200, done);
        });
    });
});