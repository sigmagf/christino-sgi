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
    const serviceId = stringFix(req.query.serviceId, undefined);
    const sectorId = stringFix(req.query.sectorId, undefined);
    const group = stringFix(req.query.group, undefined, 'UPPERCASE', 'STRING');
    const identifier = stringFix(req.query.identifier, undefined, 'NONE', 'STRING');
    const value = stringFix(req.query.value, undefined, 'NONE', 'MONEY');
    const status = stringFix(req.query.status, undefined);
    const timeCourseStart = stringFix(req.query.timeCourseStart, undefined);
    const timeCourseEnd = stringFix(req.query.timeCourseEnd, undefined);

    try {
      if(status && (parseInt(status, 10) < 1 || parseInt(status, 10) > 4)) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'status\' é inválido.', details: 'O status deve ser entre \'1\',\'2\',\'3\',\'4\'' }));
      }

      const works = await this.service.execute({
        page, limit, filters: { pagination, clientId, serviceId, sectorId, group, identifier, value, status, timeCourseStart, timeCourseEnd },
      });

      return res.json(works);
    } catch(err) {
      return errorWork(req, res, err);
    }
  }
}
