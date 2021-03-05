import { Product } from './../entities/product.entity';
import { ProductRepository } from './../repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOneById(id: number): Promise<Product> {
    return this.productRepository.findOne({where: {id}});
  }
  
  findOneByRef(reference: string): Promise<Product> {
    return this.productRepository.findOne({where: {reference}});
  }

  create(CreateProductDTO: CreateProductDTO): Promise<Product> {
    return this.productRepository.save(CreateProductDTO);
  }

  update(id: number, updateProductDto: UpdateProductDTO): Promise<any> {
    return this.productRepository.update(id,updateProductDto);  
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
