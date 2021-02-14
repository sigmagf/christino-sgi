import { IWork } from './IWork';

export interface IWorkHistory {
  id: string;
  workId: string;
  work: IWork;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}
