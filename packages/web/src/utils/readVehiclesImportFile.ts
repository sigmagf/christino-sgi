import csv2json from 'csvtojson';

import { IVehiclesImportJSON, IVehiclesImportCSV } from '~/interfaces';

export async function readVehiclesImportFile(csv: string): Promise<IVehiclesImportJSON[]> {
  const csvConv: IVehiclesImportCSV[] = await csv2json().fromString(csv);
  const vehicles:IVehiclesImportJSON [] = csvConv.map((vehicle) => (
    {
      client: {
        name: vehicle.name,
        document: vehicle.document,
        group: vehicle.group,
      },
      plate: vehicle.plate,
      renavam: vehicle.renavam,
      crv: vehicle.crv,
      brand_model: vehicle.brand_model,
      type: vehicle.type,
      details: vehicle.details,
      status: vehicle.status,
      issued_on: vehicle.issued_on,
    }
  ));

  return vehicles;
}
