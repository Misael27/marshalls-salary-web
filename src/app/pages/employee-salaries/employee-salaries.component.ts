import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { AddSalaryComponent } from './add-salary/add-salary.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Salary } from '../../common/entities/salary';
import { Office } from '../../common/entities/Office';
import { Position } from '../../common/entities/Position';
import { Division } from '../../common/entities/Division';
import { EmployeeService } from '../../common/services/employee.service'
import { Employee } from 'src/app/common/entities/employee';

@Component({
  selector: 'app-employee-salaries',
  templateUrl: './employee-salaries.component.html',
  styleUrls: ['./employee-salaries.component.scss']
})
export class EmployeeSalariesComponent implements OnInit {

    formGroup: FormGroup;
    DATE_FORMAT = "YYYY-MM-DD hh:mm:ss";

    offices: Office[] = [];
    positions: Position[] = [];
    divisions: Division[] = [];
    salaries: Salary[] = [];
    missingSearch : Boolean = true; 

    displayedColumns: string[] = ['year', 'month', 'baseSalary', 'productionBonus', 'compensatioBonus', 'commission', 'contributions', 'actions'];
    dataSource = new MatTableDataSource(this.salaries);
    @ViewChild(MatTable) table: MatTable<Salary>;

    constructor(
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
      private employeeService: EmployeeService
    ) {}

    ngOnInit() {
      this.createForm();
      this.employeeService.getAllOffices().subscribe( data => {
        this.offices = data
      });
      this.employeeService.getAllPositions().subscribe( data => {
        this.positions = data
      });
      this.employeeService.getAllDivisions().subscribe( data => {
        this.divisions = data
      });
    }

    ngAfterViewInit() {
    }

    createForm() {
      this.formGroup = this.formBuilder.group({
        'employeeCode': [{value:null, disabled:true}, Validators.required],
        'employeeName': [{value:null, disabled:false}, Validators.required],
        'employeeSurname': [{value:null, disabled:false}, Validators.required],
        'officeId': [{value:null, disabled:true}, Validators.required],
        'positionId': [{value:null, disabled:true}, Validators.required],
        'divisionId': [{value:null, disabled:true}, Validators.required],
        'grade': [{value:null, disabled:true}, [Validators.required, Validators.min(1)]],
        'beginDate': [{value:null, disabled:true}, Validators.required],
        'birthday': [{value:null, disabled:true}, Validators.required],
        'identificationNumber': [{value:null, disabled:true}, Validators.required]
      });
    }

    resetForm() {
      debugger;
      this.formGroup.reset();
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key).setErrors(null) ;
      });
    }

    search() {
      this.enableForm();
      this.employeeService.getEmployeeByName(this.formGroup.controls.employeeName.value, this.formGroup.controls.employeeSurname.value)
      .subscribe( data => {
        if (!data) {
          return
        }
        this.formGroup.patchValue({
          employeeCode : data.employeeCode,
          employeeName : data.employeeName,
          employeeSurname : data.employeeSurname,
          officeId : data.office.officeId,
          positionId : data.position.positionId,
          divisionId : data.division.divisionId,
          grade : data.grade,
          beginDate : data.beginDate,
          birthday : data.birthday,
          identificationNumber : data.identificationNumber
        });
        this.salaries = data.salaries;
        this.dataSource.data = this.getSortedSalaries(this.salaries);
        this.table.renderRows();
      }, err => {
        console.log("NEW EMPLOYEE");
      });
    }

    save() {
      if (!this.formGroup.valid) {
        return;
      }
      const salaries = this.dataSource.data;
      if (salaries.length == 0) {
        this.openSnackBar('must create at least 1 salary for the employee');
        return;
      }

      this.formGroup.controls['employeeName'].enable();
      this.formGroup.controls['employeeSurname'].enable();

      const values = this.getDataForSending();

      values.office = this.offices.find(x => x.officeId == values.officeId);
      values.position = this.positions.find(x => x.positionId == values.positionId);
      values.division = this.divisions.find(x => x.divisionId == values.divisionId);

      delete values.officeId;
      delete values.positionId;
      delete values.divisionId;

      const employeeDTO = this.getDataForSending() as Employee;
      employeeDTO.salaries = salaries;
      
      this.employeeService.postEmployeeSalary(employeeDTO)
      .subscribe( data => {
        this.disableForm();
        this.resetForm();
        this.salaries = []
        this.dataSource.data = this.salaries;
        this.table.renderRows();
        this.openSnackBar('Created with Success');
      }, err => {
        this.openSnackBar('An error has occurred');
      });
    }

    openSnackBar(message: string) {
      this._snackBar.open(message, 'Ok', {
        duration: 2000
      });
    }

    getDataForSending(): any {
      const nuevo = this.formGroup.value;
      return nuevo;
    }

    addSalary(salary): void {
      const dialogRef = this.dialog.open(AddSalaryComponent, {data:salary});
      dialogRef.afterClosed().subscribe( (result:Salary) => {
        if(result) {
          const data = this.dataSource.data;
          const idx = data.findIndex(x => x.id == salary.Id && x.year == salary.year && x.month == salary.month);
          if (idx == -1) { //new element
            this.dataSource.data = this.getSortedSalaries([...this.dataSource.data, result]);
          }
          else {
            data[idx] = result;
            this.dataSource.data = data;
          }
          this.table.renderRows();
        }
      });
    }

    removeSalary(salary) {
      this.dataSource.data = this.dataSource.data.filter(x => x.id != salary.Id && x.year != salary.year && x.month != salary.month);
      this.table.renderRows();
    }

    getSortedSalaries(salaries : Array<Salary>) : Array<Salary> {
      const result = salaries.sort((a, b) => {
        return ( (a.year == b.year && a.month < b.month) || (a.year < b.year) ? -1 : 1)
      });  
      return result;
    }

    enableForm() {
      this.missingSearch = false;
      this.formGroup.controls['employeeName'].disable();
      this.formGroup.controls['employeeSurname'].disable();
      this.formGroup.controls['employeeCode'].enable();
      this.formGroup.controls['officeId'].enable();
      this.formGroup.controls['positionId'].enable();
      this.formGroup.controls['divisionId'].enable();
      this.formGroup.controls['grade'].enable();
      this.formGroup.controls['beginDate'].enable();
      this.formGroup.controls['birthday'].enable();
      this.formGroup.controls['identificationNumber'].enable();
    }

    disableForm() {
      this.missingSearch = true;
      this.formGroup.controls['employeeName'].enable();
      this.formGroup.controls['employeeSurname'].enable();
      this.formGroup.controls['employeeCode'].disable();
      this.formGroup.controls['officeId'].disable();
      this.formGroup.controls['positionId'].disable();
      this.formGroup.controls['divisionId'].disable();
      this.formGroup.controls['grade'].disable();
      this.formGroup.controls['beginDate'].disable();
      this.formGroup.controls['birthday'].disable();
      this.formGroup.controls['identificationNumber'].disable();

      this.formGroup.controls['employeeCode'].setValue(null);
      this.formGroup.controls['officeId'].setValue(null);
      this.formGroup.controls['positionId'].setValue(null);
      this.formGroup.controls['divisionId'].setValue(null);
      this.formGroup.controls['grade'].setValue(null);
      this.formGroup.controls['identificationNumber'].setValue(null);

      this.dataSource.data = [];
      this.table.renderRows();

      this.formGroup.controls['beginDate'].setValue(null);
      this.formGroup.controls['birthday'].setValue(null);
    }

  }
