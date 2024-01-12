import { Request, Response, Router } from 'express';
import CreateAccController from '../controllers/CreateAccController';

const createAccController = new CreateAccController();
const createAccRouter = Router();

createAccRouter.post(
  '/',
  (req: Request, res: Response) => createAccController.createAccount(req, res),
);

export default createAccRouter;
