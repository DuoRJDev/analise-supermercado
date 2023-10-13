import { Router } from 'express';
import loginRouter from './login.routes';

const router = Router();

router.use('/login', loginRouter);

export default router;
