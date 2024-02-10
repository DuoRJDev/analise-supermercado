import { Router } from 'express';
import loginRouter from './login.routes';
import createAccRouter from './createaccount.routes';
import analyticsRoute from './analytics.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/create-account', createAccRouter);
router.use('/analytics', analyticsRoute);

export default router;
