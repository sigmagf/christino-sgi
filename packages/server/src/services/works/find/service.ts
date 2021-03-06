import { IVehicle } from '@christino-sgi/common';

import { IWorksRepository } from '~/repositories/IWorksRepository';

export class WorksFindService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: Pick<IVehicle, 'id'>) {
    const work = await this.repository.findById(data.id);
    return work;
  }
}
