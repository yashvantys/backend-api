import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductService],
})
export class ProductModule {}
