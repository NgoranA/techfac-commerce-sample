import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();

    return products;
  }

  async getFilteredProducts(
    filterProductDTO: FilterProductDTO,
  ): Promise<Product[]> {
    const { category, search } = filterProductDTO;
    let products = await this.getAllProducts();
    if (search) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(search),
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product had not been found');
    }
    return product;
  }

  async addProduct(
    createProductDTO: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<any> {
    const imageLink = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('invalid File type');
    });

    if (imageLink) {
      createProductDTO.img = imageLink.secure_url;
      const newProduct = await this.productModel.create(createProductDTO);
      return newProduct.save();
    }
  }

  async updateProduct(
    id: string,
    createProductDTO: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      createProductDTO,
      { new: true },
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product had not been found');
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);
    return deletedProduct;
  }
}
