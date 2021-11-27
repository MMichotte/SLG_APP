import { Injectable } from '@nestjs/common';
import { CreateProductWorksheetDTO } from '../dto/create-product-worksheet.dto';
import { UpdateProductWorksheetDTO } from '../dto/update-product-worksheet.dto';
import { ProductWorksheet } from '../entities/product-worksheet.entity';
import { ProductWorksheetRepository } from '../repositories/product-worksheet.repository';

@Injectable()
export class ProductWorksheetsService {

  constructor(
    private readonly productWorksheetRepository: ProductWorksheetRepository
  ) {}

    
  findAll(): Promise<ProductWorksheet[]> {
    return this.productWorksheetRepository.find({relations: ['product', 'worksheet']});
  }

  findOneById(id: number): Promise<ProductWorksheet> {
    return this.productWorksheetRepository.findOne({where: {id}, relations: ['product', 'worksheet']});
  }
  
  create(createProductWorksheetDTO: CreateProductWorksheetDTO): Promise<ProductWorksheet> {
    return this.productWorksheetRepository.save(createProductWorksheetDTO);
  }

  update(id: number, updateProductWorksheetDTO: UpdateProductWorksheetDTO): Promise<any> {
    return this.productWorksheetRepository.update(id,updateProductWorksheetDTO);  
  }

  remove(id: number) {
    return this.productWorksheetRepository.delete(id);
  }
}
