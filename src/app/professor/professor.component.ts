import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { AddProfessorDialogComponent } from '../add-professor-dialog/add-professor-dialog.component';

@Component({
  selector: 'app-Professor',
  templateUrl: './Professor.component.html',
  styleUrls: ['./Professor.component.css'],
})
export class ProfessorComponent implements OnInit {
  apiUrl = 'http://localhost:3000/api/Professor';
  professors: any[] = [];

  displayedColumns: any[] = ['name', 'email', 'phoneNumber'];
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchProfessorData();
  }

  fetchProfessorData() {
    axios
      .get(this.apiUrl)
      .then((response) => {
        this.professors = response.data;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error as needed
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProfessorDialogComponent);

    dialogRef.afterClosed().subscribe((newProfessorData) => {
      if (newProfessorData) {
        axios
          .post(this.apiUrl, newProfessorData)
          .then((response) => {
            this.professors = response.data;
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

interface Professor {
  name: string;
  id: string;
  email: string;
  phoneNumber: string;
}
