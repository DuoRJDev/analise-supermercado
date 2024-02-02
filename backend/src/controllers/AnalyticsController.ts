import { Request, Response } from 'express';
import AnalyticService from '../services/AnalyticService';

export default class AnalyticsController {
  private analyticService = new AnalyticService();
  async getAll(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const sales = await this.analyticService.getAllProducts(email);
      return res.status(200).json({ sales });
    } catch (error) {
      console.error('Requisição ao banco falhou com erro: ', error);
      return res.status(401).json({ error });
    }
  }
}
