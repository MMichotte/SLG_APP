import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { enumToObjArray } from '../../../../../../core/helpers/enum-to-obj-array';
import { ECompanyType } from '../../../../../companies/enums/company-type.enum';
import { Client } from '../../../../../clients/models/client.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./../../client-form.component.scss', './company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  @Input() personsList?: Client[];
  public companyForm: FormGroup;
  public ECompanyType = ECompanyType;

  companyType: any[];
  personsListFiltered: Client[];

  constructor(
    private controlContainer: ControlContainer
  ) {
    this.companyType = enumToObjArray(ECompanyType)
      .filter((cT: any) => { return cT.value !== ECompanyType.SUPPLIER; })
      .map(
        (cT: any) => {
          switch (cT.value) {
          case ECompanyType.CLIENT:
            cT.label = 'Client';
            break;
          case ECompanyType.SUPP_AND_CLI:
            cT.label = ' Client and Supplier';
            break;
          default:
            cT.label = 'Client';
            break;
          }
          return cT;
        }
      );
  }

  searchClient(input: string) {
    this.personsListFiltered = this.personsList.filter(
      (cl: any) => { return cl.displayName.toLowerCase().includes(input.toLowerCase()); }
    );
  }

  ngOnInit(): void {
    // eslint-disable-next-line keyword-spacing
    this.companyForm = <FormGroup>this.controlContainer.control;
    this.personsListFiltered = this.personsList;
  }

}
