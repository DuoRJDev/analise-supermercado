export default interface IUsers {
  id?: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  roleId: number,
  stateId: number,
  regionId: number,
  createdAt: Date,
  updatedAt: Date,
}
