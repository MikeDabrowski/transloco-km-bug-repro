import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'transloco-km-bug-repro';
  vara = 'NEST_A';
  varb = 'NEST_B';
  get condition() {return true}
}
