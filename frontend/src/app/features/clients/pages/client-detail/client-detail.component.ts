import { ClientService } from './../../services/client.service';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./../../../style.scss', './client-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientDetailComponent implements OnInit {

  client: Client;
  
  loadingData: boolean;

  constructor(
    private readonly clientService: ClientService,
    public readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {
    try {
      this.client = this.router.getCurrentNavigation().extras.state.client;
    } catch (e) {
      console.log(e);
      this.router.navigate(['clients']);
    }
  }

  ngOnInit(): void {
  }

}
