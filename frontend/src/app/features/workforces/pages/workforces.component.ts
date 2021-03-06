import { Workforce } from './../models/workforce.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WorkforceService } from '../services/workforce.service';
import { DialogService } from 'primeng/dynamicdialog';
import { WorkforceFormComponent } from '../components/workforce-form/workforce-form.component';

@Component({
  selector: 'app-workforces',
  templateUrl: './workforces.component.html',
  styleUrls: ['./workforces.component.scss']
})
export class WorkforcesComponent implements OnInit {

  cols: any[];
  workforces: Workforce[] = [];
  selectedWorkforce: Workforce;
  loadingData: boolean;

  constructor (
    private readonly workforceService: WorkforceService,
    public dialogService: DialogService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit (): void {
    this.refreshWorkforces();
    this.cols = [
      { field: 'label', header: 'Label', width: '25%' },
      { field: 'priceHT', header: 'Price HT' },
      { field: 'priceTTC', header: 'Price TTC' },
      { field: 'note', header: 'Note' }
    ];
  }

  refreshWorkforces(): void {
    this.loadingData = true;
    this.workforceService.getAll().subscribe(
      (workforces: Workforce[]) => {
        this.workforces = workforces;
        this.selectedWorkforce = null;
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  showNewWorkforceModal(): void {
    const ref = this.dialogService.open(WorkforceFormComponent, {
      header: 'New Workforce',
      width: '80%'
    });
    ref.onClose.subscribe((wfId?: boolean) => {
      if (wfId) this.refreshWorkforces();
    });
  }

}
