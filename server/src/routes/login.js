import express from 'express'
import * as usersController from '../controllers/users'
import auth from '../bin/auth'

const router = express.Router();

router.route('/')
  .post(usersController.login)
  
router.route('/')
  .get(auth().authenticate(), (req, res, next) => res.send('Auth test OK!'))

export default router;