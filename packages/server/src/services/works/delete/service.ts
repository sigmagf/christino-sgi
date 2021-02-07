import { IWorksRepository } from '~/repositories/IWorksRepository';

import { IWorksDeleteRequestDTO } from './dto';

export class WorksDeleteService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: IWorksDeleteRequestDTO) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Work not found.' }));
    }

    await this.repository.delete(data.id);
  }
}
