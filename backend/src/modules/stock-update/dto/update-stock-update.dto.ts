import { CreateStockUpdateDTO } from './create-stock-update.dto';

export class UpdateStockUpdateDTO extends CreateStockUpdateDTO {

  constructor(obj?: CreateStockUpdateDTO) {
    super();
    Object.assign(this, obj);
  }

}
