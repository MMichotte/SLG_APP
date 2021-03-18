import { CreateProductDTO } from './create-product.dto';

export class UpdateProductDTO extends CreateProductDTO {

  constructor(obj?: CreateProductDTO) {
    super();
    Object.assign(this, obj);
  }
  
}
