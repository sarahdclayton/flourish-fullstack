import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user.service';
import { User } from '../shared/models/user.model';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileBlogs:any = null;
  profileUser:any = null;
  currentUser: User = null;

  constructor(
    private activatedRoute:ActivatedRoute,
    private http:HttpClient,
    private userService:UserService,
    private blogService:BlogService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{

      // get current user
      this.userService.currentUserSubject.subscribe((loggedIn:User)=>{
        this.currentUser = loggedIn;
      })
      // get user from params
      const username = params.username;
      // sent request to get profile user information
      this.http.get(`http://localhost:3000/api/v1/users/${username}`).subscribe
      ({
        next: (res: any)=> {
          console.log(params)
          console.log(res);
          this.profileUser = res.payload.user;
          this.profileBlogs = res.payload.user.blogs;

          // check to see if profileUser is equal to current user
          // allow current blog state to alter component
          if(this.profileUser && this.currentUser.id == this.profileUser.id){
            this.blogService.currentUserBlogsSubject.subscribe(
              (currentUserBlogs) => {
                this.profileBlogs = currentUserBlogs;
              }
            )
          }
        }
      })
    })
  }

}
