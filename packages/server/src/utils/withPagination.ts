import { IPagination } from '~/interface';

export function withPagination<T>(data: Array<T>, page: number, limit: number): IPagination<T> {
  const startIndex = ((page - 1) * limit);
  const endIndex = page * limit;

  if(data.length < limit) {
    return {
      page: {
        total: 1,
        current: 1,
        limit,
      },
      data,
    };
  }

  return {
    page: {
      total: Math.ceil(data.length / limit),
      current: page,
      limit,
    },
    data: data.slice(startIndex, endIndex),
  };
}
