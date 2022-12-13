import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { UnitOfMeasures } from '../product.types';

export class ProductCreatedDomainEvent extends DomainEvent {
  readonly name: string;
  readonly category?: string;
  readonly variant?: string;
  readonly keywords?: string;
  readonly description?: Text;
  readonly revision?: string;
  readonly link?: string;
  readonly image?: string;
  readonly defaultLocation?: string;
  readonly defaultSupplier?: string;
  readonly units: UnitOfMeasures;
  readonly isSalable?: boolean;
  readonly isAssemblable?: boolean;
  readonly isComponent?: boolean;
  readonly isPurchaseable?: boolean;
  readonly isTrackable?: boolean;
  readonly isActive?: boolean;
  readonly isVirtual?: boolean;
  readonly notes?: Text;
  readonly responsible?: string;
  
  
  constructor(props: DomainEventProps<ProductCreatedDomainEvent>) {
    super(props);
    Object.assign(this, props);
  }
}
