import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsString,
  IsAlphanumeric,
  Matches,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator';

@ArgsType()
@InputType()
export class ListProductsRequestDto {

  @Field(() => Int)
  @IsNumber()
  offset: number = 0;

  @Field(() => Int)
  @IsNumber()
  limit: number = 30;
}

