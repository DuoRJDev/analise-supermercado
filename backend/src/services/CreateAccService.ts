import Roles from '../database/models/Roles';
import Users from '../database/models/Users';
import States from '../database/models/States';
import Regions from '../database/models/Regions';
import INewUser from '../interfaces/User';

export default class CreateService {
  private mUsers = Users;
  private mRoles = Roles;
  private mStates = States;
  private mRegions = Regions;

  async createAccount({ name, surname, email, password, state, region }: INewUser) {
    try {
      const stateModel = await this.mStates.findOne({ where: { state } });
      const roleModel = await this.mRoles.findOne({ where: { role: 'User' } });
      const regionsModel = await this.mRegions.findOne({ where: { region } });

      const user = await this.mUsers.create({
        name,
        surname,
        email,
        password,
        stateId: stateModel?.dataValues.id,
        regionId: regionsModel?.dataValues.id,
        roleId: roleModel?.dataValues.id,
      });

      if (!user) return null;
      return true;
    } catch (error) {
      console.error('Ocorreu um erro na camada service: ', error);
    }
  }
}
