export interface Pagination {
  limit: number;
  offset: number;
}

export interface LoadMorePages extends Omit<Pagination, 'offset'>{
  limit: number
}
