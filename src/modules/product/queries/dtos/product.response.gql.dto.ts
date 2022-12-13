import { ProductEntity } from '../../domain/product/product.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponseGqlDto } from '@src/libs/api/response.base.gql';

@ObjectType()
export class ProductResponseGqlDto {  
  constructor(product: any) {
    // super(product);
    this.id = product.id;
    this.name = product.name;
    this.category = product.category;
    this.variant = product.variant;
    this.keywords = product.keywords;
    this.description = product.description;
    this.units = product.units;  
  }

  @Field(type => String)
  id: string;
  
  @Field(type => String)
  name: string;

  @Field(type => String)
  category: string;

  @Field(type => String)
  variant: string;

  @Field(type => String)
  keywords: string;
  
  @Field(type => String)
  description: string;

  @Field(type => String)
  units: string;  

}
