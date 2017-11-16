import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { eqProps, isNil, complement } from 'ramda'
import jwt from 'jsonwebtoken'

import db from '../models'
const { user : User } = db;

import cfg from '../config/config';


const params = {
	secretOrKey: cfg.security.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}

const isNotNil = complement(isNil);

export default () => {

	var strategy = new Strategy(params, (payload, done) => {
		User.findById(payload.id).then(user => {
            if(isNil(user))
                return done(null, false);

            const userToken = jwt.decode(user.access_token);

            if(isNotNil(userToken) && eqProps('id', userToken, payload) && eqProps('iat', userToken, payload) && eqProps('exp', userToken, payload)) {
                return done(null, user);
            }
            
            return done(null, false);
        }).catch(err => done(err, null));
	});

	passport.use(strategy);

	return {
		initialize : () => {
			return passport.initialize();
		},
		authenticate : () => {
			return passport.authenticate("jwt", cfg.security.jwtSession);
		}
	};

};