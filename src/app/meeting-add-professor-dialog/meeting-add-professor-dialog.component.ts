import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import axios from 'axios';

@Component({
  selector: 'app-meeting-add-professor-dialog',
  templateUrl: './meeting-add-professor-dialog.component.html',
  styleUrls: ['./meeting-add-professor-dialog.component.css']
})
export class MeetingAddProfessorDialogComponent implements OnInit {
  apiUrl = 'professor';
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string  = '';

  constructor(public dialogRef: MatDialogRef<MeetingAddProfessorDialogComponent>){}

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance
      .get(this.apiUrl)
      .then((response) => {
        this.options = response.data.map((x: any) => x.name);
      })
      .catch((error) => {
        // Handle error
      });
  }

  onOptionSelected(event: MatSelectChange) {
    this.selectedOption = event.value;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveStudentData() {
    this.dialogRef.close(this.selectedOption);
  }
}
