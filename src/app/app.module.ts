import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule } from '@angular/material/list';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule } from '@angular/material/checkbox';
import {MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule } from '@angular/material/expansion';

import {MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import {MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule } from '@angular/material/tooltip';
import {MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

import { EmployeeSalariesComponent } from './pages/employee-salaries/employee-salaries.component';
import { TotalSalaryComponent } from './pages/total-salary/total-salary.component';
import { BonusComponent } from './pages/bonus/bonus.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
import { AddSalaryComponent } from './pages/employee-salaries/add-salary/add-salary.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './common/services/employee.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    EmployeeSalariesComponent,
    TotalSalaryComponent,
    BonusComponent,
    AddSalaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatNativeDateModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }