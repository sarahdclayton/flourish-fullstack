import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService:AuthService, private userService:UserService, private route:Router) {}

  ngOnInit(): void {}

  onLogin(){
    this.authService.login(this.loginForm.value).subscribe((res:any)=>{
      if(res.success){
        this.userService.setCurrentUser(res.payload.user)
        this.route.navigate(['/home'])
        // localStorage.setItem('token', JSON.stringify(res.payload.token))
        this.authService.setToken(res.payload.token)
        console.log(res)
      }
    })
  }
}
