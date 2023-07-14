import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import axios from 'axios';
import { AddMeetingDialogComponent } from '../add-meeting-dialog/add-meeting-dialog.component';

@Component({
  selector: 'app-Meeting',
  templateUrl: './Meeting.component.html',
  styleUrls: ['./Meeting.component.css'],
})
export class MeetingComponent implements OnInit {
  apiUrl = 'Meeting';

  constructor(private dialog: MatDialog, public http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchMeetingData();
  }

  navigateToMeetingDetail(id: number) {
    this.router.navigate(['/meeting-detail', id]);
  }

  fetchMeetingData() {
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
        this.meetings = response.data;
      })
      .catch((error) => {
        // Handle error
      });

    // axios
    //   .get(this.apiUrl)
    //   .then((response) => {
    //     this.meetings = response.data;
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     // Handle the error as needed
    //   });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMeetingDialogComponent);

    dialogRef.afterClosed().subscribe((newMeetingData) => {
      if (newMeetingData) {
        const token = localStorage.getItem('jwtToken');
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:3000/api/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        axiosInstance
          .post(this.apiUrl, newMeetingData)
          .then((response) => {
            this.meetings = response.data;
            // Handle the response as needed
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error as needed
          });
      }
    });
  }

  meetings: any[] = [];

  displayedColumns: any[] = ['student', 'description', 'actions'];
}

interface Meeting {
  name: string;
  age: number;
}
