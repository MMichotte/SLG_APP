import { DataLastUpdatedAtDTO } from './../../../core/dtos/data-last-updated-at.dto';
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
    return products;
  }

  async getLastUpdatedAtDate(): Promise<DataLastUpdatedAtDTO> {
    const lastUpdatedAt: string|null|undefined = await this.redisService.get('products_last_updated_at');
    if (lastUpdatedAt == null || lastUpdatedAt == undefined) {
      return new DataLastUpdatedAtDTO({lastUpdatedAt: new Date('1900-01-01').toJSON()});
    }
    return new DataLastUpdatedAtDTO({lastUpdatedAt: lastUpdatedAt});
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
    this.redisService.set('products_last_updated_at', new Date().toJSON());
  }
}
