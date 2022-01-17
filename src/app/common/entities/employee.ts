import { Office  } from "./office";
import { Position } from "./position";
import { Division  } from "./division";
import { Salary  } from "./salary";

export interface Employee {
    employeeCode: string;
    employeeName: string;
    employeeSurname: string;
    office: Office;
    position: Position;
    division: Division;
    grade: number;
    beginDate: string;
    birthday: string;
    identificationNumber: string;
    bonus: number;
    salaries: Salary[];
}