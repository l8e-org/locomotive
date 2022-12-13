import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { Logger } from '@nestjs/common';
import { ProductPaginatedResponseGqlDto } from '../dtos/product.paginated.gql.dto';
import { ProductResponseGqlDto } from '../dtos/product.response.gql.dto';
import { GetProductQuery } from './get-product.command';

@Resolver('Product')
export class GetProductGraphqlResolver {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Query(returns => ProductResponseGqlDto)
  async list(
     @Args('input') id: string,
  ): Promise<ProductResponseGqlDto> {
    const command = new GetProductQuery({ id: id })
    const result = await this.commandBus.execute(command);
    this.logger.debug(`result of query ${JSON.stringify(result.unwrap())}`);
    return new ProductResponseGqlDto(result);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    const command = new GetProductQuery({ id: reference.id })
    const result = await this.commandBus.execute(command);
    this.logger.debug(`result of query ${JSON.stringify(result.unwrap())}`);
    return new ProductResponseGqlDto(result);
  }
}
