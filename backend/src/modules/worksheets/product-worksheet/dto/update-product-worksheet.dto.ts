import { CreateProductWorksheetDTO } from './create-product-worksheet.dto';

export class UpdateProductWorksheetDTO extends CreateProductWorksheetDTO {

  constructor(obj?: CreateProductWorksheetDTO) {
    super();
    Object.assign(this, obj);
  }
}
