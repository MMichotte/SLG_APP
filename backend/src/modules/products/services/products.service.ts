import { QueryRunner } from 'typeorm';
import { Product } from './../entities/product.entity';
import { ProductRepository } from './../repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { Like } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  findAll(search?: string): Promise<Product[]> {
    if (search) {
      return this.productRepository.find({
        where: [
          {reference: Like(`%${search}%`)},
          {label: Like(`%${search}%`)}
        ] 
      });
    }
    return this.productRepository.find();
  }

  findOneById(id: number): Promise<Product> {
    return this.productRepository.findOne({where: {id}});
  }
  
  findOneById_transactional(id: number, QR: QueryRunner): Promise<Product> {
    return QR.manager.findOne(Product ,{where: {id}});
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
  
  update_transactional(id: number, updateProductDto: UpdateProductDTO, QR: QueryRunner): Promise<any> {
    return QR.manager.update(Product, id,updateProductDto);  
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
