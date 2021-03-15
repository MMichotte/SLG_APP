import { ClientFormComponent } from './../../components/client-form/client-form.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';

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
  loadingData: boolean;

  constructor (
    public readonly auth: AuthService,
    private readonly clientService: ClientService,
    public readonly dialogService: DialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    this.refreshClients();
    this.cols = [
      { field: 'id', header: 'Id', width: '10%' },
      { field: 'fullName', header: 'Full name' }, // civility - firstName - lastName -> see html
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'mobile', header: 'Mobile' }
    ];
  }

  refreshClients(): void {
    this.loadingData = true;
    this.clientService.getAll().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
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
    this.router.navigate([`clients/${client.id}/detail`], { state: { client: client } });
  }

}
