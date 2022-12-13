import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { CreateProductGqlRequestDto } from './dtos/create-product.gql-request.dto';
import { IdGqlResponse } from './dtos/id.gql-response.dto';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { Logger } from '@nestjs/common';

// If you are Using GraphQL you'll need a Resolver instead of a Controller
@Resolver()
export class CreateProductGraphqlResolver {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => IdGqlResponse)
  async create(
    @Args('input') input: CreateProductGqlRequestDto,
  ): Promise<IdGqlResponse> {
    const command = new CreateProductCommand(input);

    const id = await this.commandBus.execute(command);
    this.logger.debug(`command created entity with ${JSON.stringify(id)}`);
    return new IdGqlResponse(id.unwrap());
  }
}
