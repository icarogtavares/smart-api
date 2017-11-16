import express from 'express'
import usersRoutes from './users'
import noisesRoutes from './noises'
import loginRoutes from './login'

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/noises', noisesRoutes);
router.use('/login', loginRoutes);

router.get('/', (req, res, next) => {
  res.send({index : 'index route'});
});

export default router;
