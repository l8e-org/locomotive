import { Mapper } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { LocationEntity } from './domain/location.entity';
import { LocationModel, locationSchema } from './database/location.repository';

@Injectable()
export class LocationMapper implements Mapper<LocationEntity, LocationModel> {
  toPersistence(entity: LocationEntity): LocationModel {
    const copy = entity.getPropsCopy();
    const record: LocationModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      name: copy.name,
    };
    return locationSchema.parse(record);
  }

  toDomain(record: LocationModel): LocationEntity {
    const entity = new LocationEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        name: record.name,
      },
    });
    return entity;
  }

  toResponse(): any {
    throw new Error('Not implemented');
  }
}
