import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field()
  id: string;
  @Field()
  productName: string;
  @Field()
  productPrice: string;
}
