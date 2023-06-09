import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User = null;

  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((user:User)=>{
      this.currentUser = user;
    })
  }

  onLogout(){
    this.authService.logout()
  }

}
