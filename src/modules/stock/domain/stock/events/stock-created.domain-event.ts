import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class StockCreatedDomainEvent extends DomainEvent {
  readonly productId: string;
  readonly locationId: string;
  readonly supplierPartId: string;
  readonly quantity: number;
  readonly batch?: number;
  readonly serial?: string;
  readonly link?: string;
  readonly expiryDate?: Date;
  readonly stocktakeDate?: Date;
  readonly status?: string;
  readonly notes?: string;
  readonly build?: string;
  readonly isBuilding: boolean;
  readonly purchasePrice?: number;
  readonly packaging?: string;

  constructor(props: DomainEventProps<StockCreatedDomainEvent>) {
    super(props);
    Object.assign(this, props);
  }
}
