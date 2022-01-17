import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Salary } from '../../../common/entities/salary';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss']
})
export class AddSalaryComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Salary
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: [this.data ? this.data.id : 0, Validators.required],
      year: [this.data ? this.data.year : '', Validators.required],
      month: [this.data ? this.data.month : '', Validators.required],
      baseSalary: [this.data ? this.data.baseSalary : '', Validators.required],
      productionBonus: [this.data ? this.data.productionBonus : '', Validators.required],
      compensatioBonus: [this.data ? this.data.compensatioBonus : '', Validators.required],
      commission: [this.data ? this.data.commission : '', Validators.required],
      contributions: [this.data ? this.data.contributions : '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd() {
    this.dialogRef.close(this.formGroup.value);
  }

  isValid() {
    return this.formGroup.controls.year.value &&
      this.formGroup.controls.month.value &&
      this.formGroup.controls.baseSalary.value &&
      this.formGroup.controls.productionBonus.value &&
      this.formGroup.controls.compensatioBonus.value &&
      this.formGroup.controls.commission.value &&
      this.formGroup.controls.contributions.value;
  }


}
