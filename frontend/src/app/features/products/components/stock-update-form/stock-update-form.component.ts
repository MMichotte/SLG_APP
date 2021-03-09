import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-stock-update-form',
  templateUrl: './stock-update-form.component.html',
  styleUrls: ['./stock-update-form.component.scss']
})
export class StockUpdateFormComponent implements OnInit {

  constructor(
    public ref2: DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }

}
