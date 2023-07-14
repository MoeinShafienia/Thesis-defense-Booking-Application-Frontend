import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentDialogComponent } from '../add-student-dialog/add-student-dialog.component';
import axios from 'axios';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';

@Component({
  selector: 'app-amoozesh',
  templateUrl: './amoozesh.component.html',
  styleUrls: ['./amoozesh.component.css']
})
export class AmoozeshComponent implements OnInit {
  apiUrl = 'http://localhost:3000/api/user/amoozesh';
  users: any[] = [];
  displayedColumns: any[] = ['username'];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchStudentData();
  }

  fetchStudentData() {
    axios
      .get(this.apiUrl)
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error as needed
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewUserComponent);

    dialogRef.afterClosed().subscribe((newUserData) => {
      if (newUserData) {
        axios
          .post(this.apiUrl, newUserData)
          .then((response) => {
            this.users = response.data;
            // Handle the response as needed
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error as needed
          });
      }
    });
  }

  
}
