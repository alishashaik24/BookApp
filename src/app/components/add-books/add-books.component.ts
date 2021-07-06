import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookStoreService } from 'src/app/services/book-store.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  allAuthors: any[] = [];
  bool: boolean = false
  isbn = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/[0-9]/)]);
  bookName = new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z]/)]);
  bookPublisher = new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z]/)]);
  bookRating = new FormControl('', [Validators.required, Validators.pattern('[0-5]')]);
  bookPrice = new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]);
  bookAuthor = new FormControl('', [Validators.required]);
  bookForm! :FormGroup

  constructor(private fb: FormBuilder, private bookService: BookStoreService) {
    this.bookForm = this.fb.group({
      isbn: this.isbn,
      bookName: this.bookName,
      bookPublisher: this.bookPublisher,
      bookRating: this.bookRating,
      bookPrice: this.bookPrice,
      bookAuthor: this.bookAuthor
    })
   }

  ngOnInit(): void {
    this.bookService.getAuthors().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.allAuthors[i] = data[i].authorName
      }
    }, err => console.log(err))
  }

  ngAfterViewInit(){

  }

  addBookDetails() {
    const newBookDetail = {
      isbn: this.bookForm.value.isbn,
      bookName: this.bookForm.value.bookName,
      bookPublisher: this.bookForm.value.bookPublisher,
      bookRating: this.bookForm.value.bookRating,
      bookPrice: this.bookForm.value.bookPrice,
      bookAuthor: this.bookForm.value.bookAuthor
    };
    console.log("details", newBookDetail)
    this.bookService.getBookByName(newBookDetail.bookName)
      .subscribe(res => {
        if (res.length==0) {
          this.bookService.postBook(newBookDetail).subscribe(data => {
            this.bool = true;
            setTimeout(() => {
              this.bookForm.reset();
              this.bool = false;
              window.location.reload()
            }, 3000);
          }, err => console.log(err))
        } else {
          alert("Enter a unique Book Name")
          this.bookForm.reset();
        }
      },
        (err => console.log(err))
      )
  }

}
