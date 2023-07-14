import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css']
})
export class AddStudentDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddStudentDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveStudentData(name: string, age: string) {
    const newStudentData = {
      name: name,
      age: age
    };

    this.dialogRef.close(newStudentData);
  }
}
