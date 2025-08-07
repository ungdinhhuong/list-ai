export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export type PaginationMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export interface SingleTypeResponse<T> {
  data: T;
  meta: any;
}
