import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { StockRepositoryPort } from './stock.repository.port';
import { z } from 'zod';
import { StockMapper } from '../stock.mapper';
import { StockEntity } from '../domain/stock/stock.entity';
import { SqlRepositoryBase } from '@src/libs/db/sql-repository.base';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StockCreatedDomainEvent } from '../domain/stock/events/stock-created.domain-event';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */


export const stockSchema = z.object({
  id: z.string(),
  productId: z.string(),
  locationId: z.string(),
  supplierPartId: z.string(),
  quantity: z.number(),
  batch: z.number().optional(),
  serial: z.string().optional(),
  link: z.string().optional(),
  expiryDate: z.date().optional(),
  stocktakeDate: z.date().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
  build: z.string().optional(),
  isBuilding: z.boolean(),
  purchasePrice: z.number().optional(),
  packaging: z.string().optional(),
  deleteOnDeplete: z.boolean().optional(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date())
});

export type StockModel = z.TypeOf<typeof stockSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class StockRepository
  extends SqlRepositoryBase<StockEntity, StockModel>
  implements StockRepositoryPort
{
  protected tableName = 'stocks';

  protected schema = stockSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: StockMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(StockRepository.name));
  }

  //inventory management system roadmap
  async list(): Promise<StockEntity[] | null> {
    // const query = sql`
    //   SELECT * FROM ${sql.identifier([this.tableName])}
    // `;
    // const result = await this.pool.query
    // return result.unwrap().map((stock) => this.mapper.toDomain(result));
    return []
  }
  

  // async list(): Promise<StockEntity[] | null> {
  //   const query = sql`
  //     SELECT * FROM ${sql.identifier([this.tableName])}
  //   `;
  //   const result = await this.pool.query
  //   return result.unwrap().map((stock) => this.mapper.toDomain(result));
  // }
}
