import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { Product } from './schemas/product.schema';

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
}
