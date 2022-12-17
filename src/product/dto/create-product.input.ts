import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  productName: string;
  @Field()
  productPrice: string;
}
