import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import 'dotenv';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASS}@ecommercecluster.goqoebm.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    ),
    ProductModule,
    AuthModule,
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule {}
