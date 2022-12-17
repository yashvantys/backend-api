import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;
  @Field()
  @Column()
  productName: string;
  @Field()
  @Column()
  productPrice: string;
}
