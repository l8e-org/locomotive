import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { UnitOfMeasures } from '@src/modules/product/domain/product/product.types';
import {
  IsAlphanumeric,
  IsString,
  IsBoolean,
  Matches,
  MaxLength,
  MinLength,
  Max,
} from 'class-validator';

@ArgsType()
@InputType()
export class CreateProductGqlRequestDto {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'name must be alphanumeric',
  })
  name: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'category must be alphanumeric',
  })
  category: string;
  
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'variant must be alphanumeric',
  })
  variant: string;
  
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(350)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'keywords must be alphanumeric',
  })
  keywords: string;
  
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(350)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'description must be alphanumeric',
  })
  description: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'revision must be alphanumeric',
  })
  revision: string;
  
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'link must be alphanumeric',
  })
  link: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'image must be alphanumeric',
  })
  image: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'defaultLocation must be alphanumeric',
  })
  defaultLocation: string;
  
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'defaultSupplier must be alphanumeric',
  })
  defaultSupplier: string;
  
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'units must be alphanumeric',
  })
  units: UnitOfMeasures;

  @Field()
  @IsBoolean()
  isSalable: boolean;

  @Field()
  @IsBoolean()
  isAssemblable: boolean;

  @Field()
  @IsString()
  @MinLength(0)
  @MaxLength(100) 
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'notes must be alphanumeric',
  })
  notes: string;

  @Field()
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'IPN must be alphanumeric',
  })
  IPN: string;

  @Field()
  @IsBoolean()
  isDisassemblable: boolean;

  @Field()
  @IsBoolean()
  isPurchasable: boolean;
  
  @Field()
  @IsBoolean()
  isManufacturable: boolean;

  @Field()
  @IsBoolean()
  isService: boolean;
  
  @Field()
  @IsBoolean()
  isSubcontracted: boolean;
  
  @Field()
  @IsBoolean()
  isStockable: boolean;
  
  @Field()
  @IsBoolean()
  isShippable: boolean;

  @Field()
  @IsBoolean()
  isConsumable: boolean;

  @Field()
  @IsBoolean()
  isReturnable: boolean;

  @Field()
  @IsBoolean()
  isReplenishable: boolean;

  @Field()
  @IsBoolean()
  isRepairable: boolean;

}
