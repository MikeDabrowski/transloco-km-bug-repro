import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslocoRootModule } from 'src/app/utils/transloco/transloco-root.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslocoRootModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
