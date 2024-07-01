import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    id : number;

    @Column()
    @Field()
    name : string;

    @Column()
    @Field()
    code : string;

    @Column()
    @Field()
    emoji : string;

    @Column()
    @Field()
    continent : string;
}

@InputType()
export class NewCountryInput {
    @Field()
    name : string;

    @Field()
    code : string;

    @Field()
    emoji : string;

    @Field({nullable: true})
    continent : string;
}

@InputType()
export class UpdateContinentInput {
    @Field()
    continent : string;
}