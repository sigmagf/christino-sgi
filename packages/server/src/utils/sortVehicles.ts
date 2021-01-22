import { Vehicle } from '~/entities/Vehicle';

export const sortVehicles = (data: Vehicle[]): Vehicle[] => {
  /* SORT BY VEHICLE PLATE */
  data.sort((a, b) => {
    if(a.plate < b.plate) {
      return -1;
    }

    if(a.plate > b.plate) {
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
    if(a.plate.substr(6) < b.plate.substr(6)) {
      return -1;
    }

    if(a.plate.substr(6) > b.plate.substr(6)) {
      return 1;
    }

    return 0;
  });
  /* END SORT BY END OF VEHICLE PLATE */

  /* SORT BY CLIENT group */
  data.sort((a, b) => {
    if(a.client.group < b.client.group) {
      return -1;
    }

    if(a.client.group > b.client.group) {
      return 1;
    }

    return 0;
  });
  /* END SORT BY CLIENT group */

  return data;
};
