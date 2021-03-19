import { CreatePersonDTO } from './create-person.dto';

export class UpdatePersonDTO extends CreatePersonDTO {
 
  constructor(obj?: UpdatePersonDTO) {
    super();
    Object.assign(this, obj);
  }

}
