import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class LocationCreatedDomainEvent extends DomainEvent {
  readonly name: string;

  constructor(props: DomainEventProps<LocationCreatedDomainEvent>) {
    super(props);
  }
}
