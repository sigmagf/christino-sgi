import { IWorksRepository } from '~/repositories/IWorksRepository';

import { IWorksUpdateRequestDTO } from './dto';

export class WorksUpdateService {
  constructor(private repository: IWorksRepository) { }

  async execute(data: IWorksUpdateRequestDTO) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'User not found.' }));
    }

    const user = await this.repository.update(data.id, data);
    user.email_change_expires = undefined;
    user.email_change_token = undefined;
    user.pwd_reset_expires = undefined;
    user.pwd_reset_token = undefined;
    user.password = undefined;
    return user;
  }
}
