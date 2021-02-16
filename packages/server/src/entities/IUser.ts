export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;

  despPermission: number;
  seguPermission: number;
  cliePermission: number;
  userPermission: number;
  workPermission: number;

  createdAt?: Date;
  updatedAt?: Date;
}
