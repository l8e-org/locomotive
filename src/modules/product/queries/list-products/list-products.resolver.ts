import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { Logger } from '@nestjs/common';
import { ListProductsQuery } from './list-products.command';
import { ProductPaginatedResponseGqlDto } from '../dtos/product.paginated.gql.dto';
import { ProductResponseGqlDto } from '../dtos/product.response.gql.dto';
import { ListProductsRequestDto } from '../dtos/list-products.request.dto';

@Resolver()
export class ListProductGraphqlResolver {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Query(returns => ProductPaginatedResponseGqlDto)
  async list(
     @Args('input') pagination: ListProductsRequestDto,
  ): Promise<ProductPaginatedResponseGqlDto> {
    const command = new ListProductsQuery({})
    const result = await this.commandBus.execute(command);
    this.logger.debug(`result of query ${JSON.stringify(result.unwrap())}`);
    const data: ProductResponseGqlDto[] = result.unwrap().data.map((product) => new ProductResponseGqlDto(product));
    return new ProductPaginatedResponseGqlDto({
      data: data,
      count: result.unwrap().count,
      limit: result.unwrap().limit,
      offset: result.unwrap().offset,
      page: result.unwrap().page,
    });
  }

}

