import { AggregateID, AggregateRoot } from '@libs/ddd';
import { ArgumentOutOfRangeException } from '@libs/exceptions';
import { Err, Ok, Result } from 'oxide.ts';
import { v4 } from 'uuid';
import { LocationCreatedDomainEvent } from './events/location-created.domain-event';
import { LocationNotEnoughBalanceError } from './location.errors';

export interface CreateLocationProps {
  name: string;
}

export interface LocationProps extends CreateLocationProps {
  name: string;
}

export class LocationEntity extends AggregateRoot<LocationProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateLocationProps): LocationEntity {
    const id = v4();
    const props: LocationProps = { ...create, name: create.name };
    const location = new LocationEntity({ id, props });

    location.addEvent(
      new LocationCreatedDomainEvent({ aggregateId: id, name: create.name }),
    );

    return location;
  }


  /**
   * Protects location invariant.
   * This method is executed by a repository
   * before saving entity in a database.
   */
  public validate(): void {
  }
}
