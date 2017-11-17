import db from '../../../src/models'
import { empty, assoc } from 'ramda'
const {noise: Noise} = db;

describe('Routes: Noise', () => {

    const fakeNoise = {
        sound_level: "18.30"
    };

    const fakeNoises = [
        {
            sound_level: "53.94"
        },
        {
            sound_level: "56.90"
        }
    ]

    beforeEach(done => {
        Noise.sync({force: true})
            .then(() => Noise.bulkCreate(fakeNoises))
            .then(noises => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    describe('# GET /noises', () => {
        it('should return a list of noises', done => {
            request.get("/noises")
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].sound_level).to.eql(fakeNoises[0].sound_level);
                    expect(res.body[1].sound_level).to.eql(fakeNoises[1].sound_level);
                    done(err);
                });
        })
    });

    describe('# GET /noises/{id}', () => {
        it('should return a noise', done => {
            request.get('/noises/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body.sound_level).to.eql(fakeNoises[0].sound_level);
                    done(err);
                })      
        });

        describe('- contracts', () => {
            it("shouldn't return a noise that does not exist", done => {
                request.get('/noises/3')
                    .expect(404, done);
            })
        })
    })

    describe('# POST /noises', () => {
        it('should create a new noise', done => {
            request.post('/noises')
                .send(fakeNoise)
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body.sound_level).to.eql(fakeNoise.sound_level);
                    done(err);
                });
        });

        describe('- contracts', () => {
            it("shouldn't create a new noise with empty sound_level", done => {
                request.post('/noises')
                    .send(assoc('sound_level', empty(fakeNoise.sound_level), fakeNoise))
                    .expect(400, done);
            });
        })

    });

    describe('# PUT /noises/{id}', () => {
        it('should update a noise', done => {
            request.put('/noises/1')
                .send(fakeNoise)
                .expect(200, done);
        });

        describe('- contracts', () => {
            it("shouldn't update with empty sound_level", done => {
                request.put('/noises/1')
                    .send(assoc('sound_level', empty(fakeNoise.sound_level), fakeNoise))
                    .expect(400, done);
            });

            it("shouldn't update a noise that does not exist", done => {
                request.put('/noises/999')
                    .send(fakeNoise)
                    .expect(404, done);
            });
        })
    });

    describe('# DELETE /noises/{id}', () => {
        it('should delete a noise', done => {
            request.delete('/noises/1')
                .expect(204, done);
        });

        it("shouldn't delete a noise that does not exist", done => {
            request.delete('/noises/3')
                .expect(404, done);
        });
    });
});