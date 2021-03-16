import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsController } from '../../controllers/clients.controller';
import { Client } from '../../models/client.model';

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
