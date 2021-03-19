import { PersonsService } from './../../../persons/services/persons.service';
import { SupplierFormComponent } from './../../components/supplier-form/supplier-form.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../../../../core/services/auth.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { Company } from './../../../companies/models/company.model';
import { SuppliersController } from '../../controllers/suppliers-controller';
import { Client } from '../../../clients/models/client.model';
import { Person } from '../../../persons/models/person.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./../../../style.scss', './suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  public EUserRoles = EUserRoles;

  cols: any[];
  suppliers: Company[] = [];
  selectedSupplier: Company;
  personsList: Client[];
  loadingData: boolean;

  constructor (
    public readonly auth: AuthService,
    private readonly suppliersController: SuppliersController,
    private readonly personsService: PersonsService,
    public readonly dialogService: DialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    this.refreshSuppliers();
    this._getPersons();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone1', header: 'Phone' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'VAT', header: 'VAT' }
    ];
  }

  refreshSuppliers(): void {
    this.loadingData = true;
    this.suppliersController.getAll().subscribe(
      (suppliers: Company[]) => {
        this.suppliers = suppliers;
        this.selectedSupplier = null;
        this.cd.detectChanges();
        this.loadingData = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  showNewSupplierModal(): void {
    const ref = this.dialogService.open(SupplierFormComponent, {
      header: 'New Supplier',
      data: {
        personsList: this.personsList
      },
      width: '80%'
    });
    ref.onClose.subscribe((supplId?: boolean) => {
      if (supplId) this.refreshSuppliers();
    });

  }

  showSupplierDetailPage(supplier: Company): void {
    this.router.navigate([`suppliers/${supplier.id}/detail`]);
  }

  private _getPersons(): void {
    this.personsService.getAll().subscribe(
      (persons: Person[]) => {
        const personsClient: Client[] = persons.map(p => {
          return new Client(new Person(p));
        });
        this.personsList = personsClient;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
