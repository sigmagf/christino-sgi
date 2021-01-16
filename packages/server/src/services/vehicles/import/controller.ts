import csvToJson from 'csvtojson';
import { Request, Response } from 'express';
import fs from 'fs';

import { errorType, IVehiclesImportRequestDTO } from './dto';
import { VehiclesImportService } from './service';

export class VehiclesImportController {
  constructor(private service: VehiclesImportService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    if(!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado!' });
    }

    try {
      const data: IVehiclesImportRequestDTO['data'] = await csvToJson().fromFile(req.file.path);
      fs.unlinkSync(req.file.path);

      await this.service.execute({ data });
      return res.status(201).send();
    } catch(err) {
      if(err.message !== null && err.message.includes('IMPORTERROR-')) {
        const error: errorType[] = JSON.parse(err.message.replace('IMPORTERROR-', ''));

        return res.status(400).json({
          message: 'One or more entries not saved',
          detail: error,
        });
      }

      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
