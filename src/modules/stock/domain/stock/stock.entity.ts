import { AggregateRoot, AggregateID } from '@libs/ddd';
import { v4 } from 'uuid';
import { CreateStockPropsV1, StockPropsV1 } from './stock.types';
import { StockCreatedDomainEvent } from './events/stock-created.domain-event';

export class StockEntity extends AggregateRoot<StockPropsV1> {
  protected readonly _id: AggregateID;

  static create(create: CreateStockPropsV1): StockEntity {
    const id = v4();
    /* Setting a default role since we are not accepting it during creation. */
    const props: StockPropsV1 = { ...create};
    const stock = new StockEntity({ id, props });
    stock.addEvent(
      new StockCreatedDomainEvent({
        aggregateId: id, 
        ...props,
      }),
    );
    return stock;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
