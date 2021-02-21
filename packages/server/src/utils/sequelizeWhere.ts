import { Op } from 'sequelize';

export type whereType = {
  [x: string]: {
    [Op.iLike]: string;
  };
}

export function sequelizeWhere(filters: Record<string, any>) {
  const where: whereType = {};

  Object.keys(filters).forEach((key) => {
    if(filters[key]) {
      where[key] = { [Op.iLike]: `%${filters[key]}%` };
    }
  });

  return where;
}
