import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @Input() blog = null;
  errors = [];

  categories = [];
  blogFormGroup;

  constructor(
    private categoryService: CategoryService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogFormGroup = new FormGroup({
      title: new FormControl(this.blog.title),
      content: new FormControl(this.blog.content),
      image_path: new FormControl(this.blog.image_path),
      sub_title: new FormControl(this.blog.sub_title),
      categories_ids: new FormControl(this.blog.categories_ids),
    });

    this.categoryService.fetchCategories().subscribe({
      next: (res: any) => {
        this.categories = res.payload.categories;
      },
    });
  }

  onSubmit() {
    const editedBlog = this.blogFormGroup.value;
    this.blogService.onUpdateBlog(editedBlog, this.blog.id).subscribe({
      next: (res: any) => {
        // this.closeBtn.nativeElement.click();
        console.log(res);
        // this.blogService.updateBlog(res.payload.blog);
      },
      error: (res: any) => {

      // res
      //   {
      //     "headers": {
      //         "normalizedNames": {},
      //         "lazyUpdate": null
      //     },
      //     "status": 400,
      //     "statusText": "Bad Request",
      //     "url": "http://localhost:3000/api/v1/blogs/31",
      //     "ok": false,
      //     "name": "HttpErrorResponse",
      //     "message": "Http failure response for http://localhost:3000/api/v1/blogs/31: 400 Bad Request",
      //     "error": {
      //         "success": false,
      //         "errors": [
      //             "Sub title can't be blank"
      //         ],
      //         "status": 400
      //     }
      // }
        // ----------------
        // response example -> res.error
        //   {
        //     "success": false,
        //     "errors": [
        //         "Title can't be blank,
        //     ],
        //     "status": 400
        // }

        //let error of errors
        console.log('ERROR', res.error.errors);
        this.errors = res.error.errors;
      },
    });
  }
}
