import { Router } from 'express';
import loginRouter from './login.routes';
import createAccRouter from './createaccount.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/create-account', createAccRouter);

export default router;
