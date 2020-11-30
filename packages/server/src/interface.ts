export interface WithPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}
