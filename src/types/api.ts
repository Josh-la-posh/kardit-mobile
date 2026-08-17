export type ApiResult<T> = Promise<T>;

export type PagedResult<T> = {
  items: T[];
  total: number;
};
