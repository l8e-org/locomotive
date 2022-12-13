import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Paginated } from "../ddd";

@ArgsType()
export abstract class PaginatedResponseGqlDto<T> extends Paginated<T> {
    @Field((type) => Int)
    count: number = 0;

    @Field((type) => Int)
    offset: number = 0;

    @Field((type) => Int)
    limit: number = 10;

    @Field((type) => Int)
    page: number = 0;

    @Field((type) => [Object], { nullable: true})
    abstract readonly data: readonly T[];
}
