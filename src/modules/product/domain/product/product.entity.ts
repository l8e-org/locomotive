import { AggregateRoot, AggregateID } from '@libs/ddd';
import { v4 } from 'uuid';
import { CreateProductPropsV1, ProductPropsV1 } from './product.types';
import { ProductCreatedDomainEvent } from './events/product-created.domain-event';

export class ProductEntity extends AggregateRoot<ProductPropsV1> {
  protected readonly _id: AggregateID;

  static create(create: CreateProductPropsV1): ProductEntity {
    const id = v4();
    /* Setting a default role since we are not accepting it during creation. */
    const props: ProductPropsV1 = { ...create};
    const product = new ProductEntity({ id, props });
    product.addEvent(
      new ProductCreatedDomainEvent({
        aggregateId: id,
        name: props.name,
        image: props.image,
        variant: props.variant,
        units: props.units
      })
    );
    return product;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
