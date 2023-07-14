import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import axios from 'axios';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-meeting-dialog',
  templateUrl: './add-meeting-dialog.component.html',
  styleUrls: ['./add-meeting-dialog.component.css']
})
export class AddMeetingDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddMeetingDialogComponent>) {}
  studentApiUrl = 'student';
  options: string[] = [];
  selectedOption: string  = '';

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
      .get(this.studentApiUrl)
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

  saveMeetingData(description: string) {

    console.log(description);
    console.log(this.selectedOption);
    
    
    const newMeetingData = {
      student: this.selectedOption,
      description
      // startDate: this.dateValue.value,
      // endDate: this.dateValue2.value,
      // name: name,
      // age: age
    };

    this.dialogRef.close(newMeetingData);
  }
}
