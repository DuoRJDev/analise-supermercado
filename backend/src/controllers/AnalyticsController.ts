import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import AnalyticService from '../services/AnalyticService';

configDotenv();

interface JsonResponse {
  email: string
}

export default class AnalyticsController {
  private secret = process.env.JWT_SECRET as string;
  private analyticService = new AnalyticService();

  async getSalesByUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ error: 'Token não encontrado' });

      const decoded = jwt.verify(authorization.split(' ')[1], this.secret) as JsonResponse;
      if (email !== decoded.email) {
        return res.status(401).json({ error: 'Token falhou na validação' });
      }
      const sales = await this.analyticService.getSalesByUser(email);
      return res.status(200).json({ sales });
    } catch (error) {
      console.error('Requisição ao banco falhou com erro: ', error);
      return res.status(401).json({ error });
    }
  }
}
