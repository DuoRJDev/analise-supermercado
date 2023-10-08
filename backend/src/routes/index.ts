import { Router } from 'express';

const router = Router();

router.use('/login', loginRouter);

export default router;
