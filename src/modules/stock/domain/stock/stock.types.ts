import { UUIDVersion } from 'class-validator';

// parent: Link to another StockItem from which this StockItem was created
// part: Link to the master abstract part that this StockItem is an instance of
// supplier_part: Link to a specific SupplierPart (optional)
// location: Where this StockItem is located
// quantity: Number of stocked units
// batch: Batch number for this StockItem
// serial: Unique serial number for this StockItem
// link: Optional URL to link to external resource
// updated: Date that this stock item was last updated (auto)
// expiry_date: Expiry date of the StockItem (optional)
// stocktake_date: Date of last stocktake for this item
// stocktake_user: User that performed the most recent stocktake
// review_needed: Flag if StockItem needs review
// delete_on_deplete: If True, StockItem will be deleted when the stock level gets to zero
// status: Status of this StockItem (ref: InvenTree.status_codes.StockStatus)
// notes: Extra notes field
// build: Link to a Build (if this stock item was created from a build)
// is_building: Boolean field indicating if this stock item is currently being built (or is "in production")
// purchase_order: Link to a PurchaseOrder (if this stock item was created from a PurchaseOrder)
// sales_order: Link to a SalesOrder object (if the StockItem has been assigned to a SalesOrder)
// purchase_price: The unit purchase price for this StockItem - this is the unit price at time of purchase (if this item was purchased from an external supplier)
// packaging: Description of how the StockItem is packaged (e.g. "reel", "loose", "tape" etc)

// All properties that a Property has
export interface StockPropsV1 {
  productId: string;
  locationId: string;
  supplierPartId: string;
  quantity: number;
  batch?: number;
  serial?: string;
  link?: string;
  expiryDate?: Date;
  stocktakeDate?: Date;
  status?: string;
  notes?: string;
  build?: string;
  isBuilding: boolean;
  purchasePrice?: number;
  packaging?: string;
  deleteOnDeplete?: boolean;
}

// Properties that are needed for a user creation
export interface CreateStockPropsV1 {
  productId: string;
  locationId: string;
  supplierPartId: string;
  quantity: number;
  batch?: number;
  serial?: string;
  link?: string;
  expiryDate?: Date;
  stocktakeDate?: Date;
  status?: string;
  notes?: string;
  build?: string;
  isBuilding: boolean;
  purchasePrice?: number;
  packaging?: string;
  deleteOnDeplete?: boolean;
}
