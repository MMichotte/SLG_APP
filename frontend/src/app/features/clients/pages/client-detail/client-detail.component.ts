import { CompaniesService } from '@features/companies/services/companies.service';
import { PersonsService } from '@features/persons/services/persons.service';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ECompanyDisplayType } from '@features/companies/enums/company-type.enum';
import { Person } from '@features/persons/models/person.model';
import { Company } from '@features/companies/models/company.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './client-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientDetailComponent implements OnInit {

  public ECompanyDisplayType = ECompanyDisplayType;
  
  client: Client;  
  loadingData: boolean;

  constructor(
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private readonly personsService: PersonsService,
    private readonly companiesService: CompaniesService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const clientId = this.route.snapshot.params.id;
      if (this.router.url.includes('/person/')) { 
        this.client = new Client(new Person(await this.personsService.getOne(clientId).toPromise()));
      } else {
        this.client = new Client(new Company(await this.companiesService.getOne(clientId).toPromise()));
      }
    } catch (e) {
      console.log(e);
      this.router.navigate(['clients']);
    }
  }

}
