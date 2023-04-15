import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Subject, tap } from 'rxjs';

const URL = 'http://localhost:3000/api/v1'

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  currentUserBlogs = [];
  currentUserBlogsSubject: Subject<any> = new Subject
  // currentUserBlogsSubject: any;

  constructor(private http:HttpClient) { }

  fetchBlogs(){
    return this.http.get(`${URL}/blogs/home`)
  }

  fetchBlog(id:number){
    return this.http.get(`${URL}/blogs/${id}`)
  }

  createBlog(blog:any) {
    const token = JSON.parse(localStorage.getItem('token'))

    return this.http.post("http://localhost:3000/api/v1/blogs", blog, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }).pipe(
      tap((response: any) => {
      // subscribe((response: any) => {
      this.currentUserBlogs.push(response.payload.blog);
      this.currentUserBlogsSubject.next(this.currentUserBlogs);
    })
    );
  }

  onAddBlog(blog){
    this.setBlogs([ ...this.currentUserBlogs, blog])
  }

  setBlogs(blogs){
    this.currentUserBlogs = blogs;
    this.currentUserBlogsSubject.next(blogs);
  }
}
