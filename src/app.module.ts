import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://NgoranA:JesusLeads442@ecommercecluster.goqoebm.mongodb.net/ecommerce?retryWrites=true&w=majority',
    ),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
