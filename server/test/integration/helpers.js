import supertest from 'supertest'
import chai from 'chai'
import { configureExpress } from '../../src/bin/middlewares'
var app = configureExpress();

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;