import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@src/libs/api/paginated.response.base';
import { PaginatedResponseGqlDto } from '@src/libs/api/paginated.response.gql.base';
import { ProductResponseGqlDto } from './product.response.gql.dto';

@ObjectType()
export class ProductPaginatedResponseGqlDto extends PaginatedResponseGqlDto<ProductResponseGqlDto> {
  constructor(response: PaginatedResponseGqlDto<ProductResponseGqlDto>) {
    super(response);
    this.data = response.data;
    this.count = response.count;
    this.limit = response.limit;
    this.page = response.page;
  }
  @Field((type) => Int)
  count: number = 0;

  @Field((type) => Int)
  offset: number = 0;

  @Field((type) => Int)
  limit: number = 30;

  @Field((type) => Int)
  page: number = 0;

  @Field((type) => [ProductResponseGqlDto], { nullable: true })
  data: readonly ProductResponseGqlDto[];
}
