import { Request, Response, Router } from 'express';
import AnalyticsController from '../controllers/AnalyticsController';

const analyticsController = new AnalyticsController();

const analyticsRoute = Router();

analyticsRoute.get(
  '/',
  (req: Request, res: Response) => analyticsController.getSalesByUser(req, res),
);
analyticsRoute.get(
  '/productsbyuser',
  (req: Request, res: Response) => analyticsController.getProductsByUser(req, res),
);

export default analyticsRoute;
