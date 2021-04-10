import { ProductService } from './../../services/product.service';
import { CreateStockUpdateDTO } from './../../dto/create-stock-update.dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { enumToObjArray } from '@core/helpers/enum-to-obj-array';
import { EStockUpdateType } from '../../enums/stock-update-type.enum';

@Component({
  selector: 'app-stock-update-form',
  templateUrl: './stock-update-form.component.html',
  styleUrls: ['./stock-update-form.component.scss']
})
export class StockUpdateFormComponent implements OnInit {

  public EStockUpdateType = EStockUpdateType;

  stockUpdateForm: FormGroup;
  type: any[];

  constructor(
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    public readonly productService: ProductService
  ) { 
    this.type = enumToObjArray(this.EStockUpdateType);
  }

  ngOnInit(): void {
    this.stockUpdateForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      quantity: new FormControl(this.config.data?.quantityDiff, Validators.required),
      note: new FormControl('')
    });
  }

  submitForm(): void {
    const formData: CreateStockUpdateDTO = this.stockUpdateForm.getRawValue();
    this.productService.createStockUpdate(this.config.data.prodId, formData).subscribe(
      (res: any) => {
        this.ref.close(res.id);
      },
      (error: any) => {
        console.log(error);
        this.ref.close(-1);
      }
    );
  }

}
