import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { Logger } from '@nestjs/common';
import { ListStocksQuery } from './list-stocks.command';
import { StocksPaginatedResponseGqlDto } from './dtos/stock.paginated.gql.dto';
import { StockResponseGqlDto } from './dtos/stock.response.gql.dto';
import { ListStocksRequestDto } from './dtos/list-stock.request.dto';

@Resolver()
export class ListStockGraphqlResolver {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Query(returns => StocksPaginatedResponseGqlDto)
  async list(
     @Args('input') pagination: ListStocksRequestDto,
  ): Promise<StocksPaginatedResponseGqlDto> {
    const command = new ListStocksQuery({})
    const result = await this.commandBus.execute(command);
    this.logger.debug(`result of query ${JSON.stringify(result.unwrap())}`);
    const data: StockResponseGqlDto[] = result.unwrap().data.map((stock) => new StockResponseGqlDto(stock));
    return new StocksPaginatedResponseGqlDto({
      data: data,
      count: result.unwrap().count,
      limit: result.unwrap().limit,
      offset: result.unwrap().offset,
      page: result.unwrap().page,
    });
  }
}
