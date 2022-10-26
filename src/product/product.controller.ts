import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(
    @Query() filterProductDTO: FilterProductDTO,
  ): Promise<Product[]> {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(
        filterProductDTO,
      );
      if (!filteredProducts) {
        throw new NotFoundException('Product was not found!');
      }
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      if (!allProducts.length) {
        throw new NotFoundException('There are no products right now');
      }

      return allProducts;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    return product;
  }

  @Post('/products')
  @UseInterceptors(FileInterceptor('img'))
  async addProduct(
    @Body() createProductDTO: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product = await this.productService.addProduct(
      createProductDTO,
      file,
    );
    return product;
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDTO: CreateProductDto,
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    return product;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    return product;
  }
}
