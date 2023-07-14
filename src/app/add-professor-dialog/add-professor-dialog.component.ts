import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-professor-dialog',
  templateUrl: './add-professor-dialog.component.html',
  styleUrls: ['./add-professor-dialog.component.css']
})
export class AddProfessorDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddProfessorDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveProfessorData(nationalCode: string, name: string, email: string, phoneNumber: string) {
    const newProfessorData = {
      nationalCode,
      name,
      email,
      phoneNumber
    };

    this.dialogRef.close(newProfessorData);
  }
}
