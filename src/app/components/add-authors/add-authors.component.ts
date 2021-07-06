import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookStoreService } from 'src/app/services/book-store.service';

@Component({
  selector: 'app-add-authors',
  templateUrl: './add-authors.component.html',
  styleUrls: ['./add-authors.component.css']
})
export class AddAuthorsComponent implements OnInit {

  bool: boolean = false
  authorName = new FormControl('', [Validators.required]);
  authorAge = new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]);
  authorGender = new FormControl('', [Validators.required]);
  authorAwards = new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]);
  authorForm! :FormGroup

  constructor(private fb: FormBuilder, private bookService: BookStoreService) {
    this.authorForm = this.fb.group({
      authorName: this.authorName,
      authorAge: this.authorAge,
      authorGender: this.authorGender,
      authorAwards: this.authorAwards
    })
   }

  ngOnInit(): void {
  }

  addDirectorDetails() {
    const newdirectorDetail = {
      authorName: this.authorForm.value.authorName,
      authorAge: this.authorForm.value.authorAge,
      authorGender: this.authorForm.value.authorGender,
      authorAwards: this.authorForm.value.authorAwards
    };
    console.log(newdirectorDetail,"RWWW");

    this.bookService.getAuthorByName(newdirectorDetail.authorName)
      .subscribe(res => {
        if (res === null) {
          this.bookService.postAuthor(newdirectorDetail).subscribe(data => {
            this.bool = true;
            setTimeout(() => {
              this.authorForm.reset();
              this.bool = false;
              window.location.reload()
            }, 3000);
          }, err => console.log(err))
        } else {
          alert("Enter a unique Author Name")
          this.authorForm.reset();
        }
      },
        (err => console.log(err))
      )
  }

}
