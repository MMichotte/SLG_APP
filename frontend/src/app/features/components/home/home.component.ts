import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    // constructor () { }

    connected=false

    ngOnInit (): void {
        console.log(localStorage.getItem('token'))
        if (localStorage.getItem('token')) { this.connected = true }
    }
}
