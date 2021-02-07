import { Work } from '~/entities/Work';

export interface IWorksCreateRequestDTO extends Pick<Work, 'service_id'|'identifier'|'value'|'details'|'status'> {
  name: string;
  document: string;
  group: string;
  history: string[];
}
