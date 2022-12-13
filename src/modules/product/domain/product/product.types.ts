import { UUIDVersion } from 'class-validator';

// how this Product can be measured
export enum UnitOfMeasures {
    unit = 'unit',
    sqm = 'sqm',
    liters = 'liters'
}

// All properties that a Property has
export interface ProductPropsV1 {
  name: string;
  category?: string;
  variant?: string;
  keywords?: string;
  description?: string;
  revision?: string;
  link?: string;
  image?: string;
  defaultLocation?: string;
  defaultSupplier?: string;
  units: UnitOfMeasures;
  isSalable: boolean;
  isAssemblable: boolean;
  isComponent: boolean;
  isPurchaseable: boolean;
  isTrackable: boolean;
  isActive: boolean;
  isVirtual: boolean;
  notes?: string;
  responsible?: string;
  IPN?: string;

}

// Properties that are needed for a user creation
export interface CreateProductPropsV1 {
    name: string;
    category?: string;
    variant?: string;
    keywords?: string;
    description?: string;
    revision?: string;
    link?: string;
    image?: string;
    defaultLocation?: string;
    defaultSupplier?: string;
    units: UnitOfMeasures;
    isSalable: boolean;
    isAssemblable: boolean;
    isComponent: boolean;
    isPurchaseable: boolean;
    isTrackable: boolean;
    isActive: boolean;
    isVirtual: boolean;
    notes?: string;
    responsible?: string;
    IPN?: string;
}
