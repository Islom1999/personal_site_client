export interface IBaseModel {
  id: string;
  version_id: bigint;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date; // <= SOFT DELETE
}

export class QueryDTO {
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
}
