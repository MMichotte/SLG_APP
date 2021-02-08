import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule
    ]
})
export class FeaturesModule { }
