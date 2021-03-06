import { UpdateStockUpdateDTO } from './../dto/update-stock-update.dto';
import { CreateStockUpdateDTO } from './../dto/create-stock-update.dto';
import { StockUpdate } from './../entities/stock-update.entity';
import { Injectable } from '@nestjs/common';
import { StockUpdateRepository } from '../repositories/stock-update.repository';

@Injectable()
export class StockUpdateService {
  
  constructor(
    private readonly stockUpdateRepository: StockUpdateRepository
  ) {}

  findAll(): Promise<StockUpdate[]> {
    return  this.stockUpdateRepository.find({relations: ['product']});
  }
  
  findAllByProdId(prodId: number): Promise<StockUpdate[]> {
    return this.stockUpdateRepository.find({where: {product: prodId}, relations: ['product']});
  }

  findOneById(id: number): Promise<StockUpdate> {
    return this.stockUpdateRepository.findOne({where: {id}, relations: ['product']});
  }
  
  create(createStockUpdate: CreateStockUpdateDTO): Promise<StockUpdate> {
    return this.stockUpdateRepository.save(createStockUpdate);
  }

  update(id: number, updateStockUpdate: UpdateStockUpdateDTO): Promise<any> {
    return this.stockUpdateRepository.update(id,updateStockUpdate);  
  }

  remove(id: number) {
    return this.stockUpdateRepository.delete(id);
  }
}
