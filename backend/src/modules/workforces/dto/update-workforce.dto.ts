import { CreateWorkforceDTO } from './create-workforce.dto';

export class UpdateWorkforceDTO extends CreateWorkforceDTO {

  constructor(obj?: CreateWorkforceDTO) {
    super();
    Object.assign(this, obj);
  }
}
