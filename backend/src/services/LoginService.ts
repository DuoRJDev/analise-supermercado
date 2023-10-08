import bcrypt = require('bcryptjs');
import Users from '../database/models/Users';

export default class LoginService {
  private model = Users;

  async login(email: string, password: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
      return { type: 'UNAUTHORIZED' };
    }
    return { type: 'OK' };
  }
}
