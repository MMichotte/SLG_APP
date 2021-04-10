import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ECompanyDisplayType } from '@features/companies/enums/company-type.enum';
import { Company } from '@features/companies/models/company.model';
import { CompaniesService } from '@features/companies/services/companies.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  public ECompanyDisplayType = ECompanyDisplayType;

  supplier: Company;
  loadingData: boolean;

  constructor(
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private readonly companiesService: CompaniesService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const supplId = this.route.snapshot.params.id;
      this.supplier = await this.companiesService.getOne(supplId).toPromise();
    } catch (e) {
      console.log(e);
      this.router.navigate(['clients']);
    }
  }

}
