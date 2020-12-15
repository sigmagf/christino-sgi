import { Crv } from '~/entities/CRV';

export const sortCRVs = (data: Crv[]) => {
  /* SORT BY VEHICLE PLATE */
  data.sort((a, b) => {
    if(a.vehicle.plate < b.vehicle.plate) {
      return -1;
    }

    if(a.vehicle.plate > b.vehicle.plate) {
      return 1;
    }

    return 0;
  });
  /* END SORT BY VEHICLE PLATE */

  /* SORT BY CLIENT NAME */
  data.sort((a, b) => {
    if(a.client.name < b.client.name) {
      return -1;
    }

    if(a.client.name > b.client.name) {
      return 1;
    }

    return 0;
  });
  /* END SORT BY CLIENT NAME */

  /* SORT BY END OF VEHICLE PLATE */
  data.sort((a, b) => {
    if(a.vehicle.plate.substr(6) < b.vehicle.plate.substr(6)) {
      return -1;
    }

    if(a.vehicle.plate.substr(6) > b.vehicle.plate.substr(6)) {
      return 1;
    }

    return 0;
  });
  /* END SORT BY END OF VEHICLE PLATE */

  /* SORT BY CLIENT GROUP */
  data.sort((a, b) => {
    if(a.client.group < b.client.group) {
      return -1;
    }

    if(a.client.group > b.client.group) {
      return 1;
    }

    return 0;
  });
  /* END SORT BY CLIENT GROUP */

  return data;
};
