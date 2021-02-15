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
    const name = stringFix(req.query.name, undefined, 'UPPERCASE');
    const document = stringFix(req.query.document, undefined, 'UPPERCASE');
    const group = stringFix(req.query.group, undefined, 'UPPERCASE');
    const service = stringFix(req.query.service, undefined);
    const sector = stringFix(req.query.sector, undefined);

    try {
      const Works = await this.service.execute({ page, limit, filters: { pagination, name, document, group, service, sector } });
      return res.json(Works);
    } catch(err) {
      console.log(err);
      return errorWork(res, err.message);
    }
  }
}
