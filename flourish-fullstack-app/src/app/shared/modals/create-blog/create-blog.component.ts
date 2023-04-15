import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  categories: any = []

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe({
      next: (res:any)=> {
        console.log("CATEGORIES RESPONSE", res)
        this.categories = res.payload.categories 
      }
    })
  }

}
