import express from 'express'
import * as noiseController from '../controllers/noises'

const router = express.Router();

router.route('/')
  .get(noiseController.findAll)
  .post(noiseController.save);

router.route('/:id')
  .get(noiseController.findById)
  .put(noiseController.update)
  .delete(noiseController.remove)
  
export default router;