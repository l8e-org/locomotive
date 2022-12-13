import { PaginatedQueryParams, RepositoryPort } from '@libs/ddd';
import { StockEntity } from '../domain/stock/stock.entity';

export interface FindUsersParams extends PaginatedQueryParams {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
}

export interface StockRepositoryPort extends RepositoryPort<StockEntity> {
  list(): Promise<StockEntity[] | null>;
}
