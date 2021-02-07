import { IWorksRepository } from '~/repositories/IWorksRepository';

import { IWorksFindRequestDTO } from './dto';

export class WorksFindService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: IWorksFindRequestDTO) {
    const work = await this.repository.findById(data.id);

    if(!work) {
      throw new Error(JSON.stringify({ code: 404, message: 'Work not found.' }));
    }

    return work;
  }
}
