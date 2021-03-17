import { Client } from './../../models/client.model';
import { ClientFormComponent } from './../../components/client-form/client-form.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { ClientsController } from '../../controllers/clients.controller';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./../../../style.scss', './clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public EUserRoles = EUserRoles;

  cols: any[];
  clients: Client[] = [];
  selectedClient: Client;
  personsList: Client[];
  loadingData: boolean;

  constructor (
    public readonly auth: AuthService,
    private readonly clientsController: ClientsController,
    public readonly dialogService: DialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    this.refreshClients();
    this.cols = [
      { field: 'displayName', header: 'Full name' },
      { field: 'email', header: 'Email' },
      { field: 'mainPhone', header: 'Phone' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'VAT', header: 'VAT' }
    ];
  }

  refreshClients(): void {
    this.loadingData = true;
    this.clientsController.getAll().then(
      (clients: Client[]) => {
        this.clients = clients;
        this.personsList = this.clients.filter((cL: Client) => { return !cL.isCompany; });        
        this.selectedClient = null;
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  showNewClientModal(): void {
    const ref = this.dialogService.open(ClientFormComponent, {
      header: 'New Client',
      width: '80%'
    });
    ref.onClose.subscribe((clientId?: boolean) => {
      if (clientId) this.refreshClients();
    });
  }

  showClientDetailPage(client: Client): void {
    if (!client.isCompany) {
      this.router.navigate([`clients/person/${client.id}/detail`]);
    } else {
      this.router.navigate([`clients/company/${client.id}/detail`]);
    }
  }

}
