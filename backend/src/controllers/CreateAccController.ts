import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import CreateService from '../services/CreateAccService';

export default class CreateAccController {
  private secret = process.env.JWT_SECRET || 'secret' as string;
  private createService = new CreateService();

  async createAccount(req: Request, res: Response) {
    try {
      const data = req.body;
      const createResponse = await this.createService.createAccount(data);
      if (createResponse === null) {
        return res.status(401).json({ message: 'Criação de conta inválida' });
      }
      // Executa o login direto, retornando o token para o frontend
      const token = jwt.sign({ email: data.email }, this.secret);
      return res.status(201).json({ token });
    } catch (error) {
      console.error('Criação de conta retornou erro: ', error);
      return res.status(400).json({ message: 'Erro ao criar conta, contate o suporte' });
    }
  }
}
