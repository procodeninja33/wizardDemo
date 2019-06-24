import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ArchwizardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
