import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: any = null;
  categories: any = null;
  creator: any = null;
  category: any = null;


  constructor(private activatedRoute:ActivatedRoute, private blogService:BlogService) { }

  ngOnInit(): void {
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
          this.creator = blog.user;
        }
      })
    })
  }

}
