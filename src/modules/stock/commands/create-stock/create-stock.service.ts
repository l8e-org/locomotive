import { StockRepositoryPort } from '../../database/stock.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CreateStockCommand } from './create-stock.command';
import { AggregateID } from '@libs/ddd';
import { StockEntity } from '../../domain/stock/stock.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@libs/exceptions';
import { Inject, Logger } from '@nestjs/common';
import { STOCK_REPOSITORY } from '../../stock.di-tokens';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';

@CommandHandler(CreateStockCommand)
export class CreateStockService implements ICommandHandler {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  constructor(
    @Inject(STOCK_REPOSITORY)
    protected readonly stockRepo: StockRepositoryPort,
  ) {}

  async execute(
    command: CreateStockCommand,
  ): Promise<
    Result<AggregateID, InternalServerErrorException>
  > {
    const stock = StockEntity.create({
      ...command,
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.stockRepo.transaction(async () => this.stockRepo.insert(stock));
      this.logger.debug(`${JSON.stringify(stock)} with id ${stock.id}`);   
      return Ok(stock.id);
    } catch (error: any) {
      this.logger.debug(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
