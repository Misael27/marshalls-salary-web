import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeSalariesComponent } from './pages/employee-salaries/employee-salaries.component';
import { TotalSalaryComponent } from './pages/total-salary/total-salary.component';
import { BonusComponent } from './pages/bonus/bonus.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-salaries',
    pathMatch: 'full',
  },
  { path: 'employee-salaries', component: EmployeeSalariesComponent, pathMatch: 'full'},
  { path: 'total-salary', component: TotalSalaryComponent, pathMatch: 'full'},
  { path: 'bonus', component: BonusComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
