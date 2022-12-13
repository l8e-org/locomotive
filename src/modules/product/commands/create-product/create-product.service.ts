import { ProductRepositoryPort } from '../../database/product.repository.port';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CreateProductCommand } from './create-product.command';
import { AggregateID } from '@libs/ddd';
import { ProductEntity } from '../../domain/product/product.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@libs/exceptions';
import { Inject, Logger } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../../product.di-tokens';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';

@CommandHandler(CreateProductCommand)
export class CreateProductService implements ICommandHandler {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    protected readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<
    Result<AggregateID, InternalServerErrorException>
  > {
    const product = ProductEntity.create({
      name: command.name,
      image: command.image,
      variant: command.variant,
      units: command.units,
      description: command.description,
      defaultLocation: command.defaultLocation,
      defaultSupplier: command.defaultSupplier,
      keywords: command.keywords,
      IPN: command.IPN,
      isActive: command.isActive || true,
      isAssemblable: command.isAssemblable || false,
      isComponent: command.isComponent || false,
      isPurchaseable: command.isPurchaseable || false,
      isSalable: command.isSalable || false,
      isTrackable: command.isTrackable || false,
      isVirtual: command.isVirtual || false,
      link: command.link,
      revision: command.revision,
      responsible: command.responsible || '',
      category: command.category || '',
      notes: command.notes || '',
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.productRepo.transaction(async () => this.productRepo.insert(product));
      this.logger.debug(`${JSON.stringify(product)} with id ${product.id}`);   
      return Ok(product.id);
    } catch (error: any) {
      this.logger.debug(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
