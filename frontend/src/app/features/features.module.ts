import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'

@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent
    ],
    imports: [
        CommonModule
    ]
})
export class FeaturesModule { }
