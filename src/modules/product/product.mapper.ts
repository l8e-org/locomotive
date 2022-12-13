import { Mapper } from '@libs/ddd';
import { ProductModel, productSchema } from './database/product.repository';
import { ProductEntity } from './domain/product/product.entity';
import { ProductResponseGqlDto } from './queries/dtos/product.response.gql.dto';
import { Injectable } from '@nestjs/common';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class ProductMapper
  implements Mapper<ProductEntity, ProductModel, ProductResponseGqlDto>
{
    toPersistence(entity: ProductEntity): ProductModel {
      const props = entity.getPropsCopy();
      const record = {
        ...props,
      }
      return record;
    }

  toDomain(record: ProductModel): ProductEntity {
    const entity = new ProductEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        ...record,
      },
    });
    return entity;
  }

  toResponse(entity: ProductEntity): ProductResponseGqlDto {
    const props = entity.getPropsCopy();
    const response = new ProductResponseGqlDto(entity);
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
