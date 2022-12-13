import { LocationRepositoryPort } from '@src/modules/location/database/location.repository.port';
import { LocationEntity } from '../../domain/location.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { LOCATION_REPOSITORY } from '../../location.di-tokens';

export class LocationCreatedEvent {
  constructor(public readonly name: string) {}
}

@Injectable()
export class CreateLocationEventHandler {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepo: LocationRepositoryPort,
  ) {}

  async handle(event: LocationCreatedEvent): Promise<any> {
    const location = LocationEntity.create({
      name: event.name,
    });
    return this.locationRepo.insert(location);
  }
}
