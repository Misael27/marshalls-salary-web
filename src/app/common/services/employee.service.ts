import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Office } from '../entities/office'
import { Division } from '../entities/division'
import { Position } from '../entities/position'
import { Employee } from '../entities/employee'
import { EmployeeSalary } from '../entities/EmployeeSalary';

@Injectable()
export class EmployeeService {

  baseUrl: string;

  constructor(public http: HttpClient) {
    this.baseUrl = "https://localhost:44317/api";
  }

  getAllOffices(): Observable<Office[]> {
    const url = this.baseUrl + '/Office';
    return this.http.get<Office[]>(url)
  }

  getAllDivisions(): Observable<Division[]> {
    const url = this.baseUrl + '/Division';
    return this.http.get<Division[]>(url)
  }
  
  getAllPositions(): Observable<Position[]> {
    const url = this.baseUrl + '/Position';
    return this.http.get<Position[]>(url)
  }

  getEmployeeByName(employeeName: string, employeeSurname: string): Observable<Employee> {
    const headers = new HttpHeaders()
    const url = this.baseUrl + '/Employee/Name';
    return this.http.get<Employee>(url, {
      headers, params: {
        EmployeeName: employeeName,
        EmployeeSurname: employeeSurname
      } as any, responseType: 'json'
    })
  }

  postEmployeeSalary(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders()
    .set('accept', '*/*')
    .set('Content-Type', 'application/json');
    const url = this.baseUrl + '/Employee';
    return this.http.post<Employee>(url, employee, {headers});
  }

  getEmployeeList(id: number, filterOption: number): Observable<EmployeeSalary[]> {
    const headers = new HttpHeaders()
    const url = this.baseUrl + '/Employee';
    return this.http.get<EmployeeSalary[]>(url, {
      headers, params: {
        Id: id,
        FilterOption: filterOption
      } as any, responseType: 'json'
    });
  }

  getSalaryAverage(employeeCode: string): Observable<Employee> {
    const headers = new HttpHeaders()
    const url = this.baseUrl + '/Employee/Average';
    return this.http.get<Employee>(url, {
      headers, params: {
        EmployeeCode: employeeCode
      } as any, responseType: 'json'
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
