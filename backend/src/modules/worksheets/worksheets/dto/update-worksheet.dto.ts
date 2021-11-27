import { CreateWorksheetDTO } from './create-worksheet.dto';

export class UpdateWorksheetDTO extends CreateWorksheetDTO {

  constructor(obj?: CreateWorksheetDTO) {
    super();
    Object.assign(this, obj);
  }
}
