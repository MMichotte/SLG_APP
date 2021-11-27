import { CreateWorkforceWorksheetDTO } from './create-workforce-worksheet.dto';

export class UpdateWorkforceWorksheetDTO extends CreateWorkforceWorksheetDTO {

  constructor(obj?: CreateWorkforceWorksheetDTO) {
    super();
    Object.assign(this, obj);
  }
}
