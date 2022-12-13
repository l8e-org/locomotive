import { Command, CommandProps } from '@libs/ddd';

export class CreateStockCommand extends Command {
  readonly productId: string;
  readonly quantity: number;
  readonly batch: number;
  readonly serial: string;
  readonly link: string;
  readonly expiryDate: Date;
  readonly reviewRequired: boolean;
  readonly deleteOnDeplete?: boolean;
  readonly status: string;
  readonly notes: string;
  readonly isBuilding: boolean;
  readonly purchasePrice: number;
  readonly packaging: string;
  readonly buildId: string;
  readonly locationId: string;
  readonly supplierPartId: string;
  

  constructor(props: CommandProps<CreateStockCommand>) {
    super(props);
    Object.assign(this, props);
  }
}
