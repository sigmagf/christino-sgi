import { Client } from '~/entities/Client';
import { Vehicle } from '~/entities/Vehicle';
import { ReceiptStatus } from '~/types';

export interface IReceiptsListRequestDTO {
  page: number;
  limit: number;
  filters: {
    client: Omit<Client, 'id'|'createdAt'|'updatedAt'>;
    vehicle: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
    details: string;
    issuedOn: Date;
    status: ReceiptStatus;
  };
}
