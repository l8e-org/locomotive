// ProductModule is the main module for the product domain. It provides all of the necessary controllers, services, and mappers that are needed for the domain.
// This module is imported by the AppModule.

import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductRepository } from './database/product.repository';
import { ProductMapper } from './product.mapper';
import { PRODUCT_REPOSITORY } from './product.di-tokens';
import { CreateProductGraphqlResolver } from './commands/create-product/graphql/create-product.graphql-resolver';
import { CreateProductCommand } from './commands/create-product/create-product.command';
import { CreateProductService } from './commands/create-product/create-product.service';
import { ListProductsQueryHandler } from './queries/list-products/list-products.command';
import { ListProductGraphqlResolver } from './queries/list-products/list-products.resolver';

const httpControllers = [
];

const messageControllers = [];

const cliControllers: Provider[] = [];

const graphqlResolvers: Provider[] = [ ListProductGraphqlResolver, CreateProductGraphqlResolver ];

const commandHandlers: Provider[] = [ CreateProductService, ListProductsQueryHandler ];

const queryHandlers: Provider[] = [ ListProductsQueryHandler ];

const mappers: Provider[] = [ ProductMapper ];

const repositories: Provider[] = [
  { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
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
export class ProductModule {}
