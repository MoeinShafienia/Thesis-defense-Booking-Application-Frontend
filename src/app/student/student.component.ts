import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentDialogComponent } from '../add-student-dialog/add-student-dialog.component';
import axios from 'axios';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  apiUrl = 'http://localhost:3000/api/student';
  students: any[] = [];

  displayedColumns: any[] = ['id', 'name', 'email', 'phoneNumber', 'nationalCode'];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchStudentData();
  }

  fetchStudentData() {
    axios
      .get(this.apiUrl)
      .then((response) => {
        this.students = response.data;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error as needed
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddStudentDialogComponent);

    dialogRef.afterClosed().subscribe((newStudentData) => {
      if (newStudentData) {
        axios
          .post(this.apiUrl, newStudentData)
          .then((response) => {
            this.students = response.data;
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

interface Student {
  name: string;
  age: number;
}
