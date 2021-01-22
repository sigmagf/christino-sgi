import { Like } from 'typeorm';

export function createWhere<T extends Record<string, any>>(obj: Partial<T>, like = true): Record<string, any> | string {
  const whereObj: Record<string, any> = obj;

  Object.keys(obj).forEach((key) => {
    if(typeof obj[key] !== 'object') {
      if(obj[key] && obj[key].toString().trim() !== '') {
        whereObj[key] = like ? Like(`%${obj[key]}%`) : obj[key];
      } else {
        delete whereObj[key];
      }
    } else {
      const newObj = createWhere(obj[key], like) as Record<string, any>;

      if(Object.keys(newObj).length === 0) {
        delete whereObj[key];
      } else {
        whereObj[key] = newObj;
      }
    }
  });

  return whereObj || '';
}
