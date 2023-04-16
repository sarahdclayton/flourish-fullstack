import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../shared/services/blog.service';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: any = null;
  categories: any = null;
  user: any = null;
  category: any = null;
  currentUser = null;


  constructor(
    private activatedRoute:ActivatedRoute,
    private blogService:BlogService,
    private userService:UserService,
    private route:Router
  ) { }

  ngOnInit(): void {

    this.blogService.detailBlogSubject.subscribe((updatedBlog: any)=> {
      this.blog = updatedBlog;
    })
    this.userService.currentUserSubject.subscribe((currentUser:any)=>{
      this.currentUser = currentUser;
    })

    this.activatedRoute.params.subscribe((params)=>{
      const blogId = params.id;
      this.blogService.fetchBlog(blogId).subscribe({
        next: (blog :any)=>{
          console.log(blog);
          this.blog = blog;
          if (this.blog.categories) {
            this.categories = this.blog.categories;
          }
          // this.categories = res.payload.blog.categories;
          this.user = blog.user;
        }
      })
    })
  }

  onDeleteBlog() {
    this.blogService.deleteBlog(this.blog.id).subscribe({
      next: (res)=> {
        this.route.navigate([`/profile/${this.currentUser.username}`])
      }
    })
  }

}
