import { Mapper } from '@libs/ddd';
import { StockModel, stockSchema } from './database/stock.repository';
import { StockEntity } from './domain/stock/stock.entity';
import { StockResponseGqlDto } from './queries/dtos/stock.response.gql.dto';
import { Injectable } from '@nestjs/common';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class StockMapper
  implements Mapper<StockEntity, StockModel, StockResponseGqlDto>
{
    toPersistence(entity: StockEntity): StockModel {
      const props = entity.getPropsCopy();
      const record = {
        ...props,
      }
      return record;
    }

  toDomain(record: StockModel): StockEntity {
    const entity = new StockEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        ...record,
      },
    });
    return entity;
  }

  toResponse(entity: StockEntity): StockResponseGqlDto {
    const props = entity.getPropsCopy();
    const response = new StockResponseGqlDto(entity);
    return response;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
