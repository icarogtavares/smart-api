import db from '../../../src/models'
import { assoc, concat } from 'ramda'
const {user: User} = db;

describe('Routes: Responsible', () => {

    const fakeUser = {
        username: "icaropinho",
        email: "icaropinhoe@gmail.com",
        password: "123456"
    }

    let token;

    before(done => {
        User.sync({force: true})
            .then(() => User.create(fakeUser))
            .then(users => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    describe('# POST /login', () => {
        it("should return user's token", done => {
            request.post("/login")
                .send(fakeUser)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body).to.have.property('token');
                    token = res.body
                    done(err);
                });
        });

        it("shouldn't return user's token", done => {
            request.post("/login")
                .send(assoc('password', 'WRONG PASSWORD', fakeUser))
                .expect(400)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body).to.not.have.property('token');
                    done(err);
                });
        });
    });

    describe('# GET /login', () => {
        it("should authorize with valid token", done => {
            request.get('/login')
                .set('Authorization', concat('JWT ', token.token))
                .expect(200, done)
        })

        it("shouldn't authorize with invalid token", done => {
            request.get('/login')
                .set('Authorization', "WRONG TOKEN")
                .expect(401, done)
        })
    })

});