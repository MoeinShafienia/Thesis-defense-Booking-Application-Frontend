import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) { }

  isLoginRoute(): boolean {
    
    return this.router.url === '/login';
  }

  sidebarItems = [
    { name: 'meeting', icon: 'home', route: '/meetings' },
    { name: 'professor', icon: 'info', route: '/professors' },
    { name: 'student', icon: 'mail', route: '/students' },
    { name: 'amoozesh', icon: 'mail', route: '/amoozesh' }
  ];
}
