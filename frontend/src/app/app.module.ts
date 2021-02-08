import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { FeaturesModule } from './features/features.module'

// import { HomeComponent } from './features/components/home/home.component'
// import { SpinnerComponent } from './shared/components/spinner/spinner.component'
// import { HttpClient, HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        FeaturesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
