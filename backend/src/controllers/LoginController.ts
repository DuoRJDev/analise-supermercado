import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import LoginService from '../services/LoginService';

configDotenv();

export default class LoginController {
  private secret = process.env.JWT_SECRET as string;
  private loginService = new LoginService();

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { type } = await this.loginService.login(email, password);
      // Melhorar o tipo de retorno para identificar qual das variáveis está errada
      if (type === 'USER_NOT_FOUND') return res.status(401)
        .json({ fail: 'email' });
      if (type === 'WRONG_PASS') return res.status(401).json({ fail: 'password' });
      const token = jwt.sign(email, this.secret);
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Login falhou com o erro:', error);
    }
  }
}
