import { Command, CommandProps } from '@libs/ddd';
import { UnitOfMeasures  } from '../../domain/product/product.types';

export class CreateProductCommand extends Command {
  readonly name: string;
  readonly category?: string;
  readonly variant?: string;
  readonly keywords?: string;
  readonly description?: string;
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
  readonly notes?: string;
  readonly responsible?: string;
  readonly IPN?: string;
  
  
  constructor(props: CommandProps<CreateProductCommand>) {
    super(props);
    // Object.assign(this, props);
    this.name = props.name;
    this.category = props.category;
    this.variant = props.variant;
    this.keywords = props.keywords;
    this.description = props.description;
    this.revision = props.revision;
    this.link = props.link;
    this.image = props.image;
    this.defaultLocation = props.defaultLocation;
    this.defaultSupplier = props.defaultSupplier;
    this.units = props.units;
    this.isSalable = props.isSalable;
    this.isAssemblable = props.isAssemblable;
    this.isComponent = props.isComponent;
    this.isPurchaseable = props.isPurchaseable;
    this.isTrackable = props.isTrackable;
    this.isActive = props.isActive;
    this.isVirtual = props.isVirtual;
    this.notes = props.notes;
    this.responsible = props.responsible;
    this.IPN = props.IPN;
  }
}
