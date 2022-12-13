import { PaginatedQueryParams, RepositoryPort } from '@libs/ddd';
import { ProductEntity } from '../domain/product/product.entity';

export interface FindUsersParams extends PaginatedQueryParams {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
}

export interface ProductRepositoryPort extends RepositoryPort<ProductEntity> {
  list(): Promise<ProductEntity | null>;
}
