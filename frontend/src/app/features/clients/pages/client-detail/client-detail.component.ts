import { CompaniesService } from '@features/companies/services/companies.service';
import { PersonsService } from '@features/persons/services/persons.service';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ECompanyDisplayType } from '@features/companies/enums/company-type.enum';
import { Person } from '@features/persons/models/person.model';
import { Company } from '@features/companies/models/company.model';
import { Car } from '@features/cars/models/car.model';
import { CarService } from '@features/cars/services/car.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './client-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientDetailComponent implements OnInit {

  public ECompanyDisplayType = ECompanyDisplayType;
  
  client: Client;  
  cars: Car[];
  loadingData: boolean;

  carCols: any[];

  constructor(
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private readonly personsService: PersonsService,
    private readonly companiesService: CompaniesService,
    private readonly carService: CarService
  ) {}

  async ngOnInit(): Promise<void> {
    this.carCols = [
      { field: 'makeLabel', header: 'Make' },
      { field: 'modelLabel', header: 'Model' },
      { field: 'version', header: 'Version' },
      { field: 'registrationNumber', header: 'Registration' },
      { field: 'chassisNumber', header: 'Chassis n°' },
      { field: 'firstRegistration', header: 'First Reg.' }
    ];

    try {
      this.loadingData = true;
      const clientId = this.route.snapshot.params.id;
      if (this.router.url.includes('/person/')) { 
        this.client = new Client(new Person(await this.personsService.getOne(clientId).toPromise()));
        this.cars = await this.carService.getAllByOwner(clientId, 'p').toPromise();
      } else {
        this.client = new Client(new Company(await this.companiesService.getOne(clientId).toPromise()));
        this.cars = await this.carService.getAllByOwner(clientId, 'c').toPromise();
      }
      this.cars.map((car: Car) => {
        car.makeLabel = car.model.carMake.label;
        car.modelLabel = car.model.label;
        return car;
      });
      this.cd.detectChanges();
      this.loadingData = false;
    } catch (e) {
      console.log(e);
      this.router.navigate(['clients']);
    }
  }

  showCarInfoPage(car: Car): void {
    this.router.navigate([`cars/${car.id}/detail`]);
  }

}
