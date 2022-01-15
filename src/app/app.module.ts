import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule } from '@angular/material/list';
import { EmployeeSalariesComponent } from './pages/employee-salaries/employee-salaries.component';
import { TotalSalaryComponent } from './pages/total-salary/total-salary.component';
import { BonusComponent } from './pages/bonus/bonus.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    EmployeeSalariesComponent,
    TotalSalaryComponent,
    BonusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
