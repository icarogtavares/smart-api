import express from 'express'
import * as usersController from '../controllers/users'

const router = express.Router();

router.route('/')
  .get(usersController.findAll)
  .post(usersController.save)

router.route('/:id')
  .get(usersController.findOne)
  .put(usersController.update)
  
export default router;