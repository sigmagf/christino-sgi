import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { ClientsListService } from './service';

export class ClientsListController {
  constructor(private service: ClientsListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const pagination = (req.query.noPagination as string || 'false').toLowerCase() !== 'true';
    const name = stringFix(req.query.name, undefined, 'UPPERCASE');
    const document = stringFix(req.query.document, undefined, 'UPPERCASE');
    const group = stringFix(req.query.group, undefined, 'UPPERCASE');

    try {
      const clients = await this.service.execute({ page, limit, filters: { pagination, name, document, group } });
      return res.status(200).json(clients);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
