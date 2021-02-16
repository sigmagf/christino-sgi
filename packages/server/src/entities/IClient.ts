export interface IClient {
  id: string;
  name: string;
  document: string;
  group?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
