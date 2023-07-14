import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { MeetingAddProfessorDialogComponent } from '../meeting-add-professor-dialog/meeting-add-professor-dialog.component';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {
  meetingId: number = 0;
  apiUrl = 'Meeting';
  meeting: any;
  displayedColumns = ['id', 'name', 'status']
  userType = localStorage.getItem("userType");
  editMode = false;
  checkedItems: string[] = []

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  btuh(){

  }

  onSave() {
    // Send HTTP request with the checked items using HttpClient
    const token = localStorage.getItem('jwtToken');
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/api/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      axiosInstance
        .post(`${this.apiUrl}/${this.meetingId}/professor/times`, this.checkedItems)
        .then((response) => {
          this.meeting = response.data;
          
        })
        .catch((error) => {
          // Handle error
        });
  }

  onCheckboxChange(item: any) {
    const index = this.checkedItems.indexOf(item);
    if (index > -1) {
      this.checkedItems.splice(index, 1);
    } else {
      this.checkedItems.push(item);
    }
  }

  onSave2(){
    this.editMode = !this.editMode;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.meetingId = +params['id'];
      const token = localStorage.getItem('jwtToken');
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/api/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      axiosInstance
        .get(`${this.apiUrl}/${this.meetingId}`)
        .then((response) => {
          this.meeting = response.data;
          if (token != null) {
            const decodedToken: any = jwt_decode(token);
            let username = decodedToken.username;
            this.checkedItems = this.meeting.times.filter((x: any) =>
              x.professors.some((p: any) => p == username)
            ).map((x: any) => x.name);
            
          }
        })
        .catch((error) => {
          // Handle error
        });

        
        

    });
  }

  showAddProfessorPopUp() {
    const dialogRef = this.dialog.open(MeetingAddProfessorDialogComponent);

    dialogRef.afterClosed().subscribe((professor) => {
      if (professor) {
        const token = localStorage.getItem('jwtToken');
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:3000/api/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        axiosInstance
          .post(`${this.apiUrl}/${this.meeting.age}/professor`, {name: professor})
          .then((response) => {
            this.meeting = response.data;
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

