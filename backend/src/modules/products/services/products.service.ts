import { ProductDTO } from './../dto/product';
import { Product } from './../entities/product.entity';
import { ProductRepository } from './../repositories/products.repository';
import { Injectable, Patch } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { plainToClass } from 'class-transformer';
import { SimpleProductDTO } from '../dto/simple-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async findAll(): Promise<ProductDTO[]> {
    const products: Product[] = await this.productRepository.find();
    return plainToClass(ProductDTO,products);
  }

  async findOneById(id: number): Promise<ProductDTO> {
    const product: Product = await this.productRepository.findOne({where: {id}});
    return plainToClass(ProductDTO,product);
  }

  async create(CreateProductDTO: CreateProductDTO): Promise<SimpleProductDTO> {
    const createdProduct: Product = await this.productRepository.save(CreateProductDTO);
    return plainToClass(SimpleProductDTO,createdProduct);
  }

  async update(id: number, updateProductDto: UpdateProductDTO): Promise<SimpleProductDTO> {
    const updatedProduct: any = await this.productRepository.update(id,updateProductDto);
    console.log(updatedProduct);
    return plainToClass(SimpleProductDTO,updatedProduct);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
