import { Op } from 'sequelize';

export type whereType = {
  [x: string]: {
    [Op.like]: string;
  };
}

export function sequelizeWhere(filters: Record<string, any>) {
  const where: whereType = {};

  Object.keys(filters).forEach((key) => {
    if(filters[key]) {
      where[key] = { [Op.like]: `%${filters[key]}%` };
    }
  });

  return where;
}
