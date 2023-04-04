import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  fetchBlogs(){
    return this.http.get('http://localhost:3000/api/v1/blogs/home')
  }
}
