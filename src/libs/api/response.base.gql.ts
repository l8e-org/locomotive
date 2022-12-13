import { ArgsType, Field, Int } from "@nestjs/graphql";
import { T } from "oxide.ts/dist/common";
import { Paginated } from "../ddd";

export interface BaseResponseProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@ArgsType()
export class BaseResponseGqlDto {
    @Field((type) => Int)
    readonly id: string;

    @Field((type) => Date)
    readonly createdAt: string;

    @Field((type) => Date)
    readonly updatedAt: string;

    constructor(props: BaseResponseProps) {
        this.id = props.id;
        this.createdAt = new Date(props.createdAt).toISOString();
        this.updatedAt = new Date(props.updatedAt).toISOString();
    }
}
