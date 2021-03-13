import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./../../../style.scss', './clients.component.scss']
})
export class ClientsComponent implements OnInit {

  cols: any[];
  clients: Client[] = [];
  selectedClient: Client;
  loadingData: boolean;

  constructor (
    private readonly clientService: ClientService,
    public dialogService: DialogService,
    private readonly cd: ChangeDetectorRef
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

  }

  showClientDetailPage(client: Client): void {
    
  }

}
