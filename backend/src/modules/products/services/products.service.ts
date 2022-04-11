import { QueryRunner } from 'typeorm';
import { Product } from './../entities/product.entity';
import { ProductRepository } from './../repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { Like } from 'typeorm';
import { RedisService } from '@core/services/redis.service';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly redisService: RedisService
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
    const products = this.redisService.getOrSetCache('products', () => {
      return this.productRepository.find();
    });
    this.redisService.set('products_have_been_updated', true);
    return products;
  }

  async getUpdatedStatus(): Promise<boolean> {
    return !(await this.redisService.get('products_have_been_updated'));
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
    this.resetCache();
    return this.productRepository.save(CreateProductDTO);
  }

  update(id: number, updateProductDto: UpdateProductDTO): Promise<any> {
    this.resetCache();
    return this.productRepository.update(id,updateProductDto);  
  }
  
  update_transactional(id: number, updateProductDto: UpdateProductDTO, QR: QueryRunner): Promise<any> {
    this.resetCache();
    return QR.manager.update(Product, id,updateProductDto);  
  }

  remove(id: number) {
    this.resetCache();
    return this.productRepository.delete(id);
  }

  private resetCache() {
    this.redisService.resetCache('products');
    this.redisService.resetCache('products_have_been_updated');
  }
}
