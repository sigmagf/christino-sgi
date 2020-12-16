import { Work } from '~/entities/Work';
import { RepoWorksFilters, RepoWorksSave, RepoWorksSaveEntry, RepoWorksUpdate } from '~/types';

export interface IWorksRepository {
  list(filters: RepoWorksFilters): Promise<Work[]>;
  find(id: string): Promise<Work>;
  findByDetranId(detranId: string): Promise<Work>;
  save(work: RepoWorksSave, firstEntry: RepoWorksSaveEntry): Promise<Work>;
  update(id: string, data: RepoWorksUpdate, entry?: RepoWorksSaveEntry): Promise<Work>;
  delete(id: string): Promise<Work>;
}
