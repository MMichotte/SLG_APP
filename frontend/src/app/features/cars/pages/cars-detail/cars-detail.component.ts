import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '@features/cars/models/car.model';
import { CarService } from '@features/cars/services/car.service';

@Component({
  selector: 'app-cars-detail',
  templateUrl: './cars-detail.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './cars-detail.component.scss']
})
export class CarsDetailComponent implements OnInit {

  car: Car;

  constructor(
    private readonly carService: CarService,
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const carId = this.route.snapshot.params.id;
      this.car = await this.carService.getOne(carId).toPromise(); // TODO catch if error!       
      this.car.makeLabel = this.car.model.carMake.label;
      this.car.modelLabel = this.car.model.label;
      this.car.owner = (this.car.person) ? `${this.car.person.firstName} ${this.car.person.lastName}` : this.car.company?.name;
    } catch (e) {
      console.log(e);
      this.router.navigate(['cars']);
    }
  }

}
