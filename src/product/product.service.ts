import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ObjectID as ObjectIDType } from 'mongodb';
import { ObjectType, Field } from '@nestjs/graphql';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  create(createProductInput: CreateProductInput): Promise<Product> {
    const prod = this.productRepository.create(createProductInput);
    return this.productRepository.save(prod);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({});
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { _id: ObjectIDType(id) },
    });
  }
  async update(id: string, updateProductInput: UpdateProductInput) {
    const product: Product = this.productRepository.create(updateProductInput);
    product._id = ObjectIDType(id);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<DeleteProduct> {
    const deleteProduct = await this.productRepository.delete(id);
    console.log(deleteProduct?.affected);
    if (deleteProduct?.affected) {
      return {
        rowsAffected: deleteProduct?.affected,
        message: 'Product deleted successfully',
      };
    } else {
      return {
        rowsAffected: 0,
        message: 'Product not found!',
      };
    }
  }
}

@ObjectType()
export class DeleteProduct {
  @Field()
  rowsAffected: number;
  @Field()
  message: string;
}

@ObjectType()
export class getAllProduct {
  @Field()
  id: string;
  @Field()
  productName: string;
  @Field()
  productPrice: string;
}

@ObjectType()
export class getProductData {
  @Field()
  productName?: string;
  @Field()
  productPrice?: number;
  @Field()
  _id?: string;
  @Field()
  message?: string;
}
