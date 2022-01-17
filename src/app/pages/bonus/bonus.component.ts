import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeSalary } from '../../common/entities/EmployeeSalary'
import { EmployeeService } from '../../common/services/employee.service'
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {

  displayedColumns: string[] = ['employeeCode', 'employeeFullName', 'division', 'position', 'beginDate', 'birthday', 'identificationNumber', 'totalSalary'];
  employeeSalaries : EmployeeSalary[] = [];
  dataSource = new MatTableDataSource(this.employeeSalaries);
  @ViewChild(MatTable) table: MatTable<EmployeeSalary>;

  formGroup: FormGroup;
  employeeBonus: number = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
    ) {
      this.createForm();
    }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'employeeCode': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  getEmployeeBonus(employeeCode : string) {
    this.employeeService.getSalaryAverage(employeeCode)
      .subscribe( data => {
        this.employeeSalaries = data.salaries;
        this.dataSource.data = this.employeeSalaries;
        this.table.renderRows();
        this.employeeBonus = data.bonus;
      }, err => {
    });
  }

  search() {
    if (!this.formGroup.valid) return;
    this.employeeBonus = null;
    this.dataSource.data = [];
    this.table.renderRows();
    this.getEmployeeBonus(this.formGroup.value.employeeCode as string);
  }

}
