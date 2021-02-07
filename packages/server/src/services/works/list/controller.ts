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

    const identifier = stringFix(req.query.identifier, undefined);
    const value = stringFix(req.query.value, undefined, 'UPPERCASE');
    const details = stringFix(req.query.details, undefined, 'UPPERCASE');
    const status = stringFix(req.query.status, undefined, 'UPPERCASE');

    const name = stringFix(req.query.name, undefined, 'UPPERCASE');
    const document = stringFix(req.query.document, undefined, 'UPPERCASE');
    const group = stringFix(req.query.group, undefined, 'UPPERCASE');

    const service = stringFix(req.query.service, undefined, 'UPPERCASE');
    const sector = stringFix(req.query.sector, undefined, 'UPPERCASE');

    try {
      const works = await this.service.execute({ page, limit, filters: { pagination, identifier, value, details, status, name, document, group, sector, service } });
      return res.status(200).json(works);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
