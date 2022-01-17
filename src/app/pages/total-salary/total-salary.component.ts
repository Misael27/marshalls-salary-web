import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { EmployeeSalary } from '../../common/entities/EmployeeSalary'
import { EmployeeService } from '../../common/services/employee.service'

@Component({
  selector: 'app-total-salary',
  templateUrl: './total-salary.component.html',
  styleUrls: ['./total-salary.component.scss']
})
export class TotalSalaryComponent implements AfterViewInit {

  displayedColumns: string[] = ['employeeCode', 'employeeFullName', 'division', 'position', 'beginDate', 'birthday', 'identificationNumber', 'totalSalary'];
  employeeSalaries : EmployeeSalary[] = [];
  dataSource = new MatTableDataSource(this.employeeSalaries);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EmployeeSalary>;

  filterRowId : number = 0;
  filterOption : number = 0;

  constructor(private employeeService: EmployeeService) {
    this.getEmployeeSalaries();
  }

  getEmployeeSalaries() {
    this.employeeService.getEmployeeList(this.filterRowId, this.filterOption)
      .subscribe( data => {
        this.employeeSalaries = data;
        this.dataSource.data = this.employeeSalaries;
        this.table.renderRows();
      }, err => {
      });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterRow(id) {
    if (id == this.filterRowId) {
      this.filterRowId = 0;
      this.getEmployeeSalaries();
      return;
    }
    this.filterRowId = id;
    if (this.filterOption == 0) return;
    this.getEmployeeSalaries();
  }

  filter(op:number) {
    if (this.filterOption == op) {
      this.filterOption = 0;
      this.getEmployeeSalaries();
      return;
    }
    this.filterOption = op;
    if (this.filterRowId == 0) return;
    this.getEmployeeSalaries();
  }

}