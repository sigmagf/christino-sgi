import { Client } from '~/entities/Client';
import { Vehicle } from '~/entities/Vehicle';

export interface IReceiptsCreateRequestDTO {
  client: Omit<Client, 'id'|'createdAt'|'updatedAt'>;
  vehicle: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
  details: string;
  status: 'ORIGINAL'|'XEROX'|'OUTRO'|'BAIXADO';
  issuedOn: Date;
}
