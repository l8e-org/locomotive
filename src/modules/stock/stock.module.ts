import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StockRepository } from './database/Stock.repository';
import { StockMapper } from './stock.mapper';
import { STOCK_REPOSITORY } from './stock.di-tokens';
import { CreateStockGraphqlResolver } from './commands/create-stock/graphql/create-stock.graphql-resolver';
import { CreateStockCommand } from './commands/create-stock/create-stock.command';
import { CreateStockService } from './commands/create-stock/create-stock.service';
import { ListStocksQueryHandler } from './queries/list-stocks.command';
import { ListStockGraphqlResolver } from './queries/list-stocks.resolver';

const httpControllers = [
];

const messageControllers = [];

const cliControllers: Provider[] = [];

const graphqlResolvers: Provider[] = [ ListStockGraphqlResolver, CreateStockGraphqlResolver ];

const commandHandlers: Provider[] = [ CreateStockService, ListStocksQueryHandler ];

const queryHandlers: Provider[] = [ ListStocksQueryHandler ];

const mappers: Provider[] = [ StockMapper ];

const repositories: Provider[] = [
  { provide: STOCK_REPOSITORY, useClass: StockRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    ...cliControllers,
    ...repositories,
    ...graphqlResolvers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class StockModule {}
