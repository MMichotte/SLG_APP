import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { enumToObjArray } from '@core/helpers/enum-to-obj-array';
import { ECompanyDisplayType, ECompanyType } from '@features/companies/enums/company-type.enum';
import { Client } from '@features/clients/models/client.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./../../../styles/form.scss', './company-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyFormComponent implements OnInit {

  @Input() personsList?: Client[] = [];
  @Input() isSupplier: boolean;
  public companyForm: FormGroup;
  public ECompanyType = ECompanyType;

  companyType: any[] = [];
  personsListFiltered: Client[];

  constructor(
    private controlContainer: ControlContainer
  ) {
  }

  searchClient(input: string) {
    this.personsListFiltered = this.personsList.filter(
      (cl: any) => { return cl.displayName.toLowerCase().includes(input.toLowerCase()); }
    );
  }

  ngOnInit(): void {
    this.companyType = enumToObjArray(ECompanyType)
      .filter((cT: any) => {
        if (this.isSupplier) {
          return cT.value !== ECompanyType.CLIENT;
        }
        return cT.value !== ECompanyType.SUPPLIER;
      })
      .map(
        (cT: any) => {
          switch (cT.value) {
          case ECompanyType.CLIENT:
            cT.label = ECompanyDisplayType.C;
            break;
          case ECompanyType.SUPP_AND_CLI:
            cT.label = ECompanyDisplayType.SC;
            break;
          default:
            cT.label = ECompanyDisplayType.S;
            break;
          }
          return cT;
        }
      );

    // eslint-disable-next-line keyword-spacing
    this.companyForm = <FormGroup>this.controlContainer.control;
    this.personsListFiltered = this.personsList;
  }

}
