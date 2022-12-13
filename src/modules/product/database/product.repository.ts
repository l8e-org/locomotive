import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { ProductRepositoryPort } from './product.repository.port';
import { z } from 'zod';
import { ProductMapper } from '../product.mapper';
import { ProductEntity } from '../domain/product/product.entity';
import { SqlRepositoryBase } from '@src/libs/db/sql-repository.base';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductCreatedDomainEvent } from '../domain/product/events/product-created.domain-event';
import { UnitOfMeasures } from '../domain/product/product.types';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */



export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  category: z.string().optional(),
  variant: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  keywords: z.string().optional(),
  notes: z.string().optional(),
  IPN: z.string().optional(),
  link: z.string().optional(),
  isSalable: z.boolean(),
  isAssemblable: z.boolean(),
  isComponent: z.boolean(),
  isTrackable: z.boolean(),
  isActive: z.boolean(),
  isVirtual: z.boolean(),
  revision: z.string().optional(),
  // minimumStock: z.string(),
  // creator: z.string(),
  responsible: z.string().optional(),
  defaultLocation: z.string().optional(),
  defaultSupplier: z.string().optional(),
  isPurchaseable: z.boolean(),
  units: z.nativeEnum(UnitOfMeasures),
  // defaultExpiry: z.number().positive(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type ProductModel = z.TypeOf<typeof productSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class ProductRepository
  extends SqlRepositoryBase<ProductEntity, ProductModel>
  implements ProductRepositoryPort
{
  protected tableName = 'products';

  protected schema = productSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: ProductMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(ProductRepository.name));
  }

  //inventory management system roadmap

  async list(): Promise<ProductEntity | null> {
    const query = sql`
      SELECT * FROM ${sql.identifier([this.tableName])}
    `;
    const result = await this.pool.query
    return this.mapper.toDomain(result);
  }
}
