import { InjectPool } from 'nestjs-slonik';
import { DatabasePool } from 'slonik';
import { z } from 'zod';
import { SqlRepositoryBase } from '@src/libs/db/sql-repository.base';
import { LocationRepositoryPort } from './location.repository.port';
import { LocationEntity } from '../domain/location.entity';
import { LocationMapper } from '../location.mapper';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export const locationSchema = z.object({
  id: z.string().min(1).max(255),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string().min(1).max(255),
});

export type LocationModel = z.TypeOf<typeof locationSchema>;

@Injectable()
export class LocationRepository
  extends SqlRepositoryBase<LocationEntity, LocationModel>
  implements LocationRepositoryPort
{
  protected tableName = 'locations';

  protected schema = locationSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: LocationMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(LocationRepository.name));
  }
}
