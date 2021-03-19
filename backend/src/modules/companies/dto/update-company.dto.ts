import { CreateCompanyDTO } from './create-company.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateCompanyDTO extends CreateCompanyDTO{

  constructor(obj?: UpdateCompanyDTO) {
    super();
    Object.assign(this, obj);
  }

}
