import { Work } from '~/entities/Work';

export interface IWorksUpdateRequestDTO extends Pick<Work, 'id'|'service_id'|'identifier'|'value'|'details'|'status'> {
  history: string;
  name: string;
  document: string;
  group: string;
}
