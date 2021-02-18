import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { WorksListService } from './service';

export class WorksListController {
  constructor(private service: WorksListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const pagination = (req.query.noPagination as string || 'false').toLowerCase() !== 'true';
    const clientId = stringFix(req.query.clientId, undefined);
    const group = stringFix(req.query.group, undefined, 'UPPERCASE');
    const identifier = stringFix(req.query.identifier, undefined, 'UPPERCASE');
    const value = stringFix(req.query.value, undefined, 'UPPERCASE');
    const serviceId = stringFix(req.query.serviceId, undefined);
    const sectorId = stringFix(req.query.sectorId, undefined);
    const status = stringFix(req.query.status, undefined, 'UPPERCASE');

    try {
      const works = await this.service.execute({ page, limit, filters: { pagination, clientId, serviceId, sectorId, group, identifier, value, status } });
      return res.json(works);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
