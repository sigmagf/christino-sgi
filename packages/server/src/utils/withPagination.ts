import { IPagination } from '~/interface';

export function withPagination<T>(data: Array<T>, page: number, limit: number): IPagination<T> {
  const startIndex = ((page - 1) * limit);
  const endIndex = page * limit;

  return {
    page: {
      total: Math.ceil(data.length / limit),
      current: page,
      limit,
    },
    data: data.slice(startIndex, endIndex),
  };
}
