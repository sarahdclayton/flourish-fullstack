import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileBlogs:any = null;
  profileUser:any = null;

  constructor(private activatedRoute:ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      const username = params.username;
      this.http.get(`http://localhost:3000/api/v1/users/${username}`).subscribe
      ({
        next: (res: any)=> {
          console.log(params)
          console.log(res);
          this.profileUser = res.payload.user;
          this.profileBlogs = res.payload.blogs;
        }
      })
    })
  }

}
