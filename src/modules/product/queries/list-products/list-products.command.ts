import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';
import { Paginated } from '@src/libs/ddd';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { ProductModel, productSchema } from '../../database/product.repository';
import { Resolver } from '@nestjs/graphql';
import { ExceptionInterceptor } from '@src/libs/application/interceptors/exception.interceptor';
import { Logger } from '@nestjs/common';
import { throws } from 'assert';

export class ListProductsQuery extends PaginatedQueryBase {

  constructor(props: PaginatedParams<ListProductsQuery>) {
    super(props);
  }
}

@CommandHandler(ListProductsQuery)
export class ListProductsQueryHandler implements IQueryHandler {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: ListProductsQuery,
  ): Promise<Result<Paginated<ProductModel>, Error>> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const sqlQuery = sql.type(productSchema)`
      SELECT ${sql.join(
        productSchema.keyof().options.map((column) => sql.identifier([column])),
        sql`, `,
      )}
      FROM products
      ORDER BY id
      OFFSET ${query.offset}
      LIMIT ${query.limit}
    `;
    this.logger.debug(`${JSON.stringify(sqlQuery)}`);



    const records = await this.pool.query(sqlQuery);

    return Ok(
      new Paginated({
        data: records.rows,
        count: records.rowCount,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
