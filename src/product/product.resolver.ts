import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  ProductService,
  DeleteProduct,
  getProductData,
} from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ObjectID } from 'mongodb';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProjectInput: CreateProductInput,
  ) {
    return this.productService.create(createProjectInput);
  }

  @Query(() => [Product], { name: 'AllProducts' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Query(() => getProductData, { name: 'getProduct' })
  async findOne(@Args('id') id: string) {
    if (ObjectID.isValid(id)) {
      const res = await this.productService.findOne(id);
      return {
        message: res ? '' : 'Product not found!',
        productName: res ? res?.productName : '',
        productPrice: res ? res?.productPrice : 0,
        _id: res ? res?._id : '',
      };
    } else {
      return {
        message: 'Product id not valid!',
        productName: '',
        productPrice: 0,
        _id: '',
      };
    }
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  updateProduct(@Args('product') project: UpdateProductInput) {
    return this.productService.update(project.id, project);
  }

  @Mutation(() => DeleteProduct, { name: 'deleteProduct' })
  removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }
}
