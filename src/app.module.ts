import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/graphqlschema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://yashvant_yadav:Yash123456@cluster0.fuq3i.gcp.mongodb.net/?retryWrites=true&w=majority',
      database: 'db_testing',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
      poolSize: 10,
      ssl: true,
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
