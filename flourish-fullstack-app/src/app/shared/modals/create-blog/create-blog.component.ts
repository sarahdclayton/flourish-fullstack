import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogDetailComponent } from 'src/app/blog-detail/blog-detail.component';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef
  categories: any = [];
  errors = [];

  blogFormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    image_path: new FormControl(''),
    sub_title: new FormControl(''),
    categories_ids: new FormControl(''),
  })

  constructor(private categoryService:CategoryService, private blogService:BlogService) { }

  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe({
      next: (res:any)=> {
        console.log("CATEGORIES RESPONSE", res)
        this.categories = res.payload.categories
      }
    })
  }

  onSubmit() {
    const newBlog = this.blogFormGroup.value;

    this.blogService.createBlog(newBlog).subscribe({
      next: (res:any)=> {
        this.closeBtn.nativeElement.click();
        this.blogService.onAddBlog(res.payload.blog)
      },
      error: (errorRes) => {
        this.errors = errorRes.error.errors;
        console.log(errorRes);
      }
    })
  }

}
