import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent {
  constructor(public dialogRef: MatDialogRef<AddNewUserComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveStudentData(username: string, password: string) {
    const newUserData = {
      username: username,
      password: password
    };

    this.dialogRef.close(newUserData);
  }
}
