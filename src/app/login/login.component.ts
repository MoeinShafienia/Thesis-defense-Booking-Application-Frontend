import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}
  apiUrl = 'http://localhost:3000/auth/login';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      axios
          .post(this.apiUrl, {username: username, password: password})
          .then((response) => {
            
            localStorage.setItem('jwtToken', response.data.access_token);
            localStorage.setItem('userType', response.data.user_type);
            this.router.navigate(['/meetings']);
            // Handle the response as needed
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error as needed
          });
    } else {
      // Handle form validation errors
      console.log('Invalid form');
    }
  }
  
}
