import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { enumToObjArray } from '../../../../../../core/helpers/enum-to-obj-array';
import { ECivility } from './../../../../../persons/enums/ECivility.enum';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./../../../../../../shared/styles/form.scss', './../../client-form.component.scss', './person-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonFormComponent implements OnInit {

  public personForm: FormGroup;
  public ECivility = ECivility;

  civility: any[];

  constructor(
    private controlContainer: ControlContainer
  ) {
    this.civility = enumToObjArray(this.ECivility);
  }

  ngOnInit(): void {
    // eslint-disable-next-line keyword-spacing
    this.personForm = <FormGroup>this.controlContainer.control;
  }

}
