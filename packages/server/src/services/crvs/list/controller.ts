import { Request, Response } from 'express';

import { CRVsListService } from './service';

export class CRVsListController {
  constructor(private service: CRVsListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);

    const name = req.query.name as string || undefined;
    const document = req.query.document as string || undefined;
    const group = req.query.group as string || undefined;

    const plate = req.query.plate as string || undefined;
    const renavam = req.query.renavam as string || undefined;
    const brandModel = req.query.brandModel as string || undefined;
    const type = req.query.type as string || undefined;

    const details = req.query.details as string || undefined;
    const issuedOn = req.query.issuedOn as string || undefined;
    const status = parseInt(req.query.status as string || '0', 10);

    try {
      const response = await this.service.execute({
        page,
        limit,
        filters: {
          client: { name, document, group },
          vehicle: { plate, renavam, brandModel, type },
          details,
          issuedOn: issuedOn ? new Date(issuedOn) : undefined,
          status,
        },
      });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
